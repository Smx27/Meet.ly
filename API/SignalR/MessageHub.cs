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
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IHubContext<PresenceHub> _presenceHub;

        public MessageHub(IMessageRepository messageRepository, IUserRepository userRepository, IMapper mapper, IHubContext<PresenceHub> presenceHub)
        {
            this._userRepository = userRepository;
            this._mapper = mapper;
            this._presenceHub = presenceHub;
            this._messageRepository = messageRepository;
        }

        public override async Task OnConnectedAsync()
        {
            var httpcontext = Context.GetHttpContext();

            var otherUser = httpcontext.Request.Query["user"];

            var groupName = GetGroupName(Context.User.getUserName(), otherUser);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await AddToGroup(groupName);

            var messages = await _messageRepository.GetMessageThread(Context.User.getUserName(), otherUser);

            await Clients.Group(groupName).SendAsync("ReceiveMessageThread", messages);
        }

        public async Task SendMessage(CreateMessageDto createMessageDto)
        {
            var username = Context.User.getUserName();

            if(username == createMessageDto.RecipientUsername.ToLower())
                throw new HubException("You cant send yourself a message");
            
            var sender = await _userRepository.GetUserByUsernameAsync(username);

            var recipient = await _userRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

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
            var group = await _messageRepository.GetMessageGroup(groupName);

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

            _messageRepository.AddMessage(message);

            if(await _messageRepository.SaveAllAsync()) 
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
            await RemoveFromMessageGroup();
            await base.OnDisconnectedAsync(exception);
        }


        private async Task RemoveFromMessageGroup()
        {
            var connection = await _messageRepository.GetConnection(Context.ConnectionId);
            _messageRepository.RemoveConnection(connection);
            await _messageRepository.SaveAllAsync();
        }
        private async Task<bool> AddToGroup(string groupName)
        {
            var group = await _messageRepository.GetMessageGroup(groupName);
            var connection = new Connection(Context.ConnectionId, Context.User.getUserName());

            if(group == null)
            {
                group = new Group(groupName);
                _messageRepository.AddGroup(group);
            }

            group.Connections.Add(connection);

            return await _messageRepository.SaveAllAsync();
        }
    }
}