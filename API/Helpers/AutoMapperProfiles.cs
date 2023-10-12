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
        }
    }
}