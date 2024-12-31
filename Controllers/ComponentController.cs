using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Web;
using System.Web.Mvc;
using BuildBuddy.Models;

namespace BuildBuddy.Controllers
{
    public class ComponentController : Controller
    {
        PCBuildEntities1 entity = new PCBuildEntities1();

        public ActionResult Motherboard(string[] companies, string[] sockets)
        {
            var motherboards = entity.Motherboards.AsQueryable();

            // Create a list to store selected sockets
            List<string> selectedCompanies = companies?.ToList() ?? new List<string>();
            List<string> selectedSockets = sockets?.ToList() ?? new List<string>();

            if (selectedSockets.Any())
            {
                motherboards = motherboards.Where(m => selectedSockets.Contains(m.socket)); // Assuming Socket is a string property in your model
            }
            if (selectedCompanies.Any())
            {
                motherboards = motherboards.Where(m => selectedCompanies.Contains(m.company)); // Assuming Company is a string property in your model
            }

            // Store the selected socket values in ViewBag for retaining checkbox states
            ViewBag.SelectedSockets = selectedSockets;
            ViewBag.SelectedCompany = selectedCompanies;

            return View(motherboards.ToList());
        }

        public ActionResult Component(string type)
        {
            return View();
        }

        public ActionResult ComponentDetail(string type, string name)
        {
            return View();
        }

    }
}