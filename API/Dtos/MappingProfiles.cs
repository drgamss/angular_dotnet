using AutoMapper;
using Core.Entities;

namespace API.Dtos
{
    public class MappingProfiles: Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>();
        }
    }
}