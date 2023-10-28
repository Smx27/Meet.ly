using API.Controllers.DTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int Id);
        Task<PagedList<MessageDto>> GetMessageForUser();
        Task<IEnumerable<MessageDto>> GetMessageThread(int currentUserID, int recipientID);
        Task<bool> SaveAllAsync();   
    }
}