using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.DTO
{
    public class MemberUpdateDTO
    {
        public string KnownAs { get; set; }
        public string Gender { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Introduction { get; set; }
    }
}