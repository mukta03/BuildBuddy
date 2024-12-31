using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BuildBuddy.Models
{
    public class UserProfileViewModel
    {
        public User User { get; set; } // Assuming you have a User model defined
        public List<SavedBuild> SavedBuilds { get; set; }
    }
}