using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class Role
    {
        public Role(int Id, string Name)
        {
            this.Id = Id;
            this.Name = Name;
        }

        public Role()
        {

        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
