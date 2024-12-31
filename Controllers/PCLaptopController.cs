using System.Web.Mvc;

namespace BuildBuddy.Controllers
{
    public class PCLaptopController : Controller
    {
        // GET: PCLaptop
        public ActionResult PC()
        {
            return View();
        }

        public ActionResult PCList(string type)
        {
            return View();
        }

        public ActionResult PCDetail(string name, string type)
        {
            return View();
        }

        public ActionResult Laptop()
        {
            return View();
        }

        public ActionResult LaptopList(string type)
        {
            return View();
        }

        public ActionResult LaptopDetail(string name, string type)
        {
            return View();
        }
    }
}