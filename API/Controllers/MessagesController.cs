using API.Controllers.DTO;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class MessagesController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public MessagesController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
    {
        var username = User.GetUserName();

        if(username == createMessageDto.RecipientUsername.ToLower())
            return BadRequest("You can't send yourself a message");
            
        var sender = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);

        var recipient = await _unitOfWork.UserRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

        if(recipient == null)
            return NotFound();
           
        var message = new Message{
            Sender = sender,
            Recipient = recipient,
            SenderUsername = sender.UserName,
            RecipientUsername = recipient.UserName,
            Content = createMessageDto.Content
        };

        _unitOfWork.MessageRepository.AddMessage(message);

        if(await _unitOfWork.Complete()) return Ok(_mapper.Map<MessageDto>(message));

        return BadRequest("fails to send message");
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<MessageDto>>> GetMessageForUser([FromQuery] MessageParams messageParams)
    {
        messageParams.Username = User.GetUserName();

        var messages = await _unitOfWork.MessageRepository.GetMessageForUser(messageParams);

        Response.AddPaginationHeader(new PaginationHeader
            (messages.CurrentPage, messages.PageSize, messages.TotalCount,messages.TotalPages));

        return messages;
    }

    [HttpGet("thread/{username}")]
    public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
    {
        var currentUsername = User.GetUserName();
        var message = await _unitOfWork.MessageRepository.GetMessageThread(currentUsername,username);
        if(_unitOfWork.HasChanges()) await _unitOfWork.Complete();
        return Ok(message);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMessage(int id)
    {
        var username = User.GetUserName();

        var message = await _unitOfWork.MessageRepository.GetMessage(id);

        if(message.SenderUsername != username && message.RecipientUsername != username) 
            return Unauthorized();

        if(message.SenderUsername == username) message.SenderDeleted = true;

        if(message.RecipientUsername == username) message.RecipientDeleted = true;

        if(message.SenderDeleted && message.RecipientDeleted)
        {
            _unitOfWork.MessageRepository.DeleteMessage(message);
        }

        if(await _unitOfWork.Complete()) return Ok();

        return BadRequest("Problem deleting the message"); 
    }

}