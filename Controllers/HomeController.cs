using BuildBuddy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BuildBuddy.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        PCBuildEntities entity = new PCBuildEntities();
        PCBuildEntities2 entity2 = new PCBuildEntities2();

        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        [AllowAnonymous]
        public ActionResult Contact()
        {
            return View();
        }

        
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Contact(Feedback info)
        {
            if (ModelState.IsValid)
            {
                entity.Feedbacks.Add(info);
                entity.SaveChanges();
                ViewBag.feedbacksubmit = "Form submitted successfully!";
                return View();
            }
            return View(info);
        }

        public ActionResult Compare()
        {
            var comparelist = entity2.CompareLists.ToList();
            return View(comparelist);
        }

        public ActionResult ComparePage(string type)
        {
            return View();
        }

        public ActionResult BuildGuide()
        {
            return View();
        }
    }
}