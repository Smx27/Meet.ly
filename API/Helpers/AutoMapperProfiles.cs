using API.Controllers.DTO;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //Creating a map between the source and destination repository object and domin objects
            //To map a specific property, use the ForMember() method. This method takes two parameters: destination property and source property.
            //we have to specify the option for the photo url because it is not in the memberdto
            //Changing the approch to calculate the age using automapper
            // Findout the mapping is working for one at a time 
            CreateMap<Entities.AppUser, MemberDTO>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src=> src.DateOfBirth.CalculateAge()));
                
            

            CreateMap<Entities.Photo, PhotoDTO>();

            CreateMap<MemberUpdateDTO, AppUser>();

            CreateMap<RegisterDTO, AppUser>();
            CreateMap<AppUser, MessageUserListDTO>()
                .ForMember(dest=> dest.Username, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest=> dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x=> x.IsMain).Url))
                // .ForMember(dest => dest.DateRead, opt => opt.MapFrom<LastMessageDateResolver>())
                .ForMember(dest => dest.LastMessage, opt => opt.MapFrom<LastMessageResolver>());
            CreateMap<Message, MessageDto> ()
                .ForMember(dest=> dest.SenderPhotoUrl, opt => opt.MapFrom(src=> src.Sender.Photos
                .FirstOrDefault(p=> p.IsMain).Url))
                .ForMember(dest=> dest.RecipientPhotoUrl, opt => opt.MapFrom(src=> src.Recipient.Photos
                .FirstOrDefault(p=> p.IsMain).Url));

            // CreateMap<DateTime,DateTime>().ConstructUsing(d=> DateTime.SpecifyKind(d,DateTimeKind.Utc));
            // CreateMap<DateTime?,DateTime?>().ConstructUsing(d=> (d.HasValue) ? DateTime.SpecifyKind(d.Value,DateTimeKind.Utc) : null);
        }
    }
    public class LastMessageResolver : IValueResolver<AppUser, MessageUserListDTO, string>
    {
        public string Resolve(AppUser source, MessageUserListDTO destination, string value, ResolutionContext context)
        {
            string firstContent = source.MessagesSent.FirstOrDefault()?.Content;
            string secondContent = source.MessagesReceived.FirstOrDefault()?.Content;
            // Combine or format content as needed
            return firstContent + " " + secondContent;
        }
    }
    public class LastMessageDateResolver : IValueResolver<AppUser, MessageUserListDTO, DateTime>
    {
        public DateTime Resolve(AppUser source, MessageUserListDTO destination, DateTime value, ResolutionContext context)
        {
            DateTime firstContent = (DateTime)source.MessagesSent.FirstOrDefault().DateRead;
            DateTime secondContent = (DateTime)source.MessagesReceived.FirstOrDefault().DateRead;
            // Combine or format content as needed
            return firstContent;
        }
    }

}