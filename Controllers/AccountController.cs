using BuildBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace BuildBuddy.Controllers
{
    public class AccountController : Controller
    {
        PCBuildEntities entity = new PCBuildEntities();
        PCBuildEntities3 entity3 = new PCBuildEntities3();
        // GET: Account
        public ActionResult Login()
        {
            return View("Register");
        }

        public ActionResult Signup()
        {
            return View("Register");
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(UserSignup credentials)
        {
            bool userExist = entity.Users.Any(x => x.email == credentials.loginemail && x.password == credentials.loginpassword);
            User u = entity.Users.FirstOrDefault(x => x.email == credentials.loginemail && x.password == credentials.loginpassword);

            if (userExist)
            {
                FormsAuthentication.SetAuthCookie("Hello " + u.name, false);

                var ticket = new FormsAuthenticationTicket(
                    1, // ticket version
                    u.name, // user name
                    DateTime.Now, // issue date
                    DateTime.Now.AddMinutes(30), // expiration
                    false, // persistent
                    u.id.ToString() // user ID as a string
                );

                string encTicket = FormsAuthentication.Encrypt(ticket);
                var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
                HttpContext.Response.Cookies.Add(cookie);

                return RedirectToAction("Index", "Home");
            }

            ModelState.Remove(nameof(credentials.name));
            ModelState.Remove(nameof(credentials.email));
            ModelState.Remove(nameof(credentials.password));
            ModelState.Remove(nameof(credentials.confirmpassword));

            if (ModelState.IsValid)
            {
                ViewBag.loginerror = "Username or password is incorrect.";
                //ModelState.AddModelError("", "Username or password is incorrect.");
            }

            return View("Register", credentials);
        }

        [HttpPost]
        public ActionResult Signup(UserSignup userinfo)
        {
            bool signuppanel = false;
            ModelState.Remove(nameof(userinfo.loginemail));
            ModelState.Remove(nameof(userinfo.loginpassword));
            if (!ModelState.IsValid)
            {
                signuppanel = true;
                ViewBag.signupview = signuppanel;
                return View("Register", userinfo);
            }
            bool userExist = entity.Users.Any(x => x.email == userinfo.email);
            if(userExist)
            {
                ViewBag.signuperror = "Email already exist.";
                //ModelState.AddModelError("", "Email already exist.");
                signuppanel = true;
                ViewBag.signupview = signuppanel;
                return View("Register", userinfo);

            }
            if (ModelState.IsValid)
            {
                User u = new User();
                u.name = userinfo.name;
                u.email = userinfo.email;
                u.password = userinfo.password;
                entity.Users.Add(u);
                entity.SaveChanges();
                FormsAuthentication.SetAuthCookie(userinfo.name, false);

                var ticket = new FormsAuthenticationTicket(
                    1, // ticket version
                    u.name, // user name
                    DateTime.Now, // issue date
                    DateTime.Now.AddMinutes(30), // expiration
                    false, // persistent
                    u.id.ToString() // user ID as a string
                );

                string encTicket = FormsAuthentication.Encrypt(ticket);
                var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
                HttpContext.Response.Cookies.Add(cookie);

                return RedirectToAction("Index", "Home");
            }
            signuppanel = true;
            ViewBag.signupview = signuppanel;
            return View("Register", userinfo);
        }

        public ActionResult Signout()
        {   
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }

        [Authorize]
        public ActionResult Profile()
        {
            string email = User.Identity.Name;

            // Get the user ID from the authentication ticket
            if (User.Identity is FormsIdentity identity)
            {
                var userId = identity.Ticket.UserData; // This contains the user ID as a string
                                                       // Now you can use userId to fetch user details or perform other actions
                int parsedUserId;
                if (int.TryParse(userId, out parsedUserId))
                {
                    // Use parsedUserId to fetch user data from the database
                    var userProfile = entity.Users.Find(parsedUserId);

                    var userBuilds = entity3.SavedBuilds
                .Where(b => b.UserId == parsedUserId)
                .ToList(); // Fetch builds for the user

                    var viewModel = new UserProfileViewModel
                    {
                        User = userProfile,
                        SavedBuilds = userBuilds
                    };

                    return View(viewModel);
                }
            } // Pass user data to the view
            return RedirectToAction("Login", "Account");
        }


        
        [HttpPost]
        [Authorize]
        public ActionResult SaveBuild(SavedBuild model)
        {
            string email = User.Identity.Name;

            if (User.Identity is FormsIdentity identity)
            {
                var userId = identity.Ticket.UserData;
                int parsedUserId;
                if (int.TryParse(userId, out parsedUserId))
                {
                    model.UserId = parsedUserId; // Set the UserId
                    entity3.SavedBuilds.Add(model); // Assuming SavedBuilds is your DbSet for SavedBuild
                    entity3.SaveChanges();
                    return Json(new { message = "Build saved successfully!" });
                }
            }

            return Json(new { message = "Failed to save the build." });
        }

        [HttpPost]
        public ActionResult DeleteBuild(int id)
        {
            var build = entity3.SavedBuilds.Find(id);
            if (build != null)
            {
                // Remove the build from the DbSet
                entity3.SavedBuilds.Remove(build);
                // Save changes to the database
                entity3.SaveChanges();
            }
            return RedirectToAction("Profile", "Account");
        }


    }
}