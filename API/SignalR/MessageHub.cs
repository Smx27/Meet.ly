using API.Controllers.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class MessageHub : Hub
    {
        private readonly IMapper _mapper;
        private readonly IHubContext<PresenceHub> _presenceHub;
        private readonly IUnitOfWork _uow;

        public MessageHub(IUnitOfWork uow, IMapper mapper, IHubContext<PresenceHub> presenceHub)
        {
            this._uow = uow;
            this._mapper = mapper;
            this._presenceHub = presenceHub;
        }

        public override async Task OnConnectedAsync()
        {
            var httpcontext = Context.GetHttpContext();

            var otherUser = httpcontext.Request.Query["user"];

            var groupName = GetGroupName(Context.User.getUserName(), otherUser);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            var group = await AddToGroup(groupName);

            await Clients.Group(groupName).SendAsync("UpdatedGroup", group);
            var messages = await _uow.MessageRepository.GetMessageThread(Context.User.getUserName(), otherUser);
            if(_uow.HasChanges()) await _uow.Complete();
            await Clients.Caller.SendAsync("ReceiveMessageThread", messages);
        }

        public async Task SendMessage(CreateMessageDto createMessageDto)
        {
            var username = Context.User.getUserName();

            if(username == createMessageDto.RecipientUsername.ToLower())
                throw new HubException("You cant send yourself a message");
            
            var sender = await _uow.UserRepository.GetUserByUsernameAsync(username);

            var recipient = await _uow.UserRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

            if(recipient == null)
                throw new HubException("Not found");
           
            var message = new Message{
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content
            };

            var groupName = GetGroupName(sender.UserName, recipient.UserName);
            var group = await _uow.MessageRepository.GetMessageGroup(groupName);

            if (group.Connections.Any(x=> x.Username == recipient.UserName))
            {
                message.DateRead = DateTime.UtcNow;
            }
            else
            {
                var connections = await PresenceTracker.GetConnectionsForUser(recipient.UserName);
                if(connections != null)
                {
                    await _presenceHub.Clients.Clients(connections).SendAsync("NewMessageReceived", new {username = sender.UserName, knownAs = sender.KnownAs});
                }
            }

            _uow.MessageRepository.AddMessage(message);

            if(await _uow.Complete()) 
            {
                await Clients.Group(groupName).SendAsync("NewMessage", _mapper.Map<MessageDto>(message));
            }
        }
        private string GetGroupName( string caller, string other)
        {
            var stringCompare = string.CompareOrdinal(caller,other) < 0;
            
            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var group = await RemoveFromMessageGroup();
            await Clients.Group(group.Name).SendAsync("UpdatedGroup");
            await base.OnDisconnectedAsync(exception);
        }


        private async Task<Group> RemoveFromMessageGroup()
        {
            var group = await _uow.MessageRepository.GetGroupForConnection(Context.ConnectionId);
            var  connection = group.Connections.FirstOrDefault(x=> x.ConnectionId == Context.ConnectionId);
            _uow.MessageRepository.RemoveConnection(connection);
            if(await _uow.Complete()) return group;
            throw new HubException("Failed to remove from group");

        }
        private async Task<Group> AddToGroup(string groupName)
        {
            var group = await _uow.MessageRepository.GetMessageGroup(groupName);
            var connection = new Connection(Context.ConnectionId, Context.User.getUserName());

            if(group == null)
            {
                group = new Group(groupName);
                _uow.MessageRepository.AddGroup(group);
            }

            group.Connections.Add(connection);

            if(await _uow.Complete()) return group;
            throw new HubException("failed to add into group");
        }
    }
}