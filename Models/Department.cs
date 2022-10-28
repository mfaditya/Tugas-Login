using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class Department
    {
        public Department(int Id, string Name, int DivisionId)
        {
            this.Id = Id;
            this.Name = Name;
            this.DivisionId = DivisionId;
        }

        public Department()
        {

        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [ForeignKey("Division")]
        public int DivisionId { get; set; }
        public Division Division { get; set; }
    }
}
