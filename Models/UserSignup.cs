using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BuildBuddy.Models
{
    public class UserSignup
    {
        public int id { get; set; }

        [Required]
        [RegularExpression("^[a-zA-Z ]*$", ErrorMessage = "Enter Valid Name.")]
        public string name { get; set; }

        [Required(ErrorMessage = "The email field is required.")]
        [RegularExpression(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", ErrorMessage = "Enter Valid Email.")]
        public string email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$", ErrorMessage = "Enter Strong Password (length of 8-16 characters long).")]
        public string password { get; set; }

        [Required(ErrorMessage = "The confirm password field is required.")]
        [Compare("password", ErrorMessage = "Password and Confirm Password does not match.")]
        [DataType(DataType.Password)]
        public string confirmpassword { get; set; }

        [Required(ErrorMessage = "The email field is required.")]
        public string loginemail { get; set; }

        [Required(ErrorMessage = "The password field is required.")]
        [DataType(DataType.Password)]
        public string loginpassword { get; set; }
    }
}