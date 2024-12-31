using BuildBuddy.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace BuildBuddy.Controllers
{
    [Authorize]
    public class PCBuildController : Controller
    {
        PCBuildEntities1 entity = new PCBuildEntities1();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetComponents(string type, string motherboardSocket = null, string memoryType = null, string motherboardInterface = null, string cpuSocket = null, string storageInterface = null, string coolingsystemSocket = null, string coolingSystemSize = null, string cabinetSize = null, string formFactor = null, string cabinetType = null)
        {
            IEnumerable<dynamic> components = null;
            IEnumerable<dynamic> remainingComponents = null;

            switch (type)
            {
                case "motherboard":
                    components = entity.Motherboards.ToList();

                    // Filter by CPU socket if provided
                    if (!string.IsNullOrEmpty(cpuSocket))
                    {
                        components = components.Where(motherboard => motherboard.socket == cpuSocket).ToList();
                    }

                    // Filter by Memory type if provided
                    if (!string.IsNullOrEmpty(memoryType))
                    {
                        components = components.Where(motherboard => motherboard.supported_memory_type == memoryType).ToList();
                    }

                    if (!string.IsNullOrEmpty(storageInterface))
                    {
                        components = components.Where(motherboard =>
                        {
                            var interfaceList = motherboard.interface_field as string;
                            return interfaceList != null &&
                                (storageInterface != null && interfaceList.Split(',').Any(interface_field => interface_field.Trim() == storageInterface));
                        }).ToList();
                    }

                    if (!string.IsNullOrEmpty(coolingsystemSocket))
                    {
                        components = components.Where(motherboard => coolingsystemSocket.Split(',').Any(iface => iface.Trim() == motherboard.socket)).ToList();
                    }

                    if (!string.IsNullOrEmpty(cabinetType))
                    {
                        List<string> acceptableFormFactors;

                        switch (cabinetType)
                        {
                            case "Micro ATX":
                                acceptableFormFactors = new List<string> { "Micro ATX", "Mini ITX" };
                                break;
                            // Add more cases for other cabinet types if needed
                            default:
                                acceptableFormFactors = new List<string> { cabinetType };
                                break;
                        }

                        // Filter components based on the acceptable form factors
                        components = components
                            .Where(motherboard => acceptableFormFactors.Contains(motherboard.form_factor))
                            .ToList();
                    }

                    remainingComponents = entity.Motherboards.ToList().Except(components).ToList();
                    ViewData["RemainingComponents"] = remainingComponents;
                    ViewData["ComponentType"] = "motherboard";
                    break;
                case "cpu":
                    components = entity.Processors.ToList();
                    if (!string.IsNullOrEmpty(motherboardSocket))
                    {
                        components = components.Where(cpu => cpu.socket == motherboardSocket).ToList();
                    }
                    if (!string.IsNullOrEmpty(coolingsystemSocket))
                    {
                        components = components.Where(cpu => coolingsystemSocket.Split(',').Any(iface => iface.Trim() == cpu.socket)).ToList();
                    }
                    remainingComponents = entity.Processors.ToList().Except(components).ToList();
                    ViewData["RemainingComponents"] = remainingComponents; // Store remaining components here
                    ViewData["ComponentType"] = "cpu";
                    break;
                case "memory":
                    components = entity.Memories.ToList();
                    if (!string.IsNullOrEmpty(memoryType))
                    {
                        var compatibleMemories = components.Where(memory => memory.supported_memory_type == memoryType).ToList();
                        remainingComponents = components.Where(memory => memory.supported_memory_type != memoryType).ToList();
                        components = compatibleMemories;
                    }
                    ViewData["RemainingComponents"] = remainingComponents;
                    ViewData["ComponentType"] = "memory";
                    break;
                case "storage":
                    components = entity.Storages.ToList();
                    if (!string.IsNullOrEmpty(motherboardInterface))
                    {
                        var compatibleStorages = components.Where(storage => motherboardInterface.Split(',').Any(iface => iface.Trim() == storage.interface_field)).ToList();
                        remainingComponents = components.Where(storage => !motherboardInterface.Split(',').Any(iface => iface.Trim() == storage.interface_field)).ToList();
                        components = compatibleStorages;
                    }
                    ViewData["ComponentType"] = "storage";
                    ViewData["RemainingComponents"] = remainingComponents;
                    break;
                case "graphicsCard":
                    components = entity.GraphicCards.ToList();
                    ViewData["ComponentType"] = "graphicsCard";
                    break;
                case "coolingSystem":
                    components = entity.CoolingSystems.ToList();
                    if (!string.IsNullOrEmpty(motherboardSocket) || !string.IsNullOrEmpty(cpuSocket))
                    {
                        var compatibleCoolingSystems = components.Where(coolingSystem =>
                        {
                            var socketList = coolingSystem.socket as string;
                            return socketList != null && (
                                (motherboardSocket != null && socketList.Split(',').Any(socket => socket.Trim() == motherboardSocket)) ||
                                (cpuSocket != null && socketList.Split(',').Any(socket => socket.Trim() == cpuSocket))
                            );
                        }).ToList();

                        remainingComponents = components.Where(coolingSystem =>
                        {
                            var socketList = coolingSystem.socket as string;
                            return socketList != null && !(
                                (motherboardSocket != null && socketList.Split(',').Any(socket => socket.Trim() == motherboardSocket)) ||
                                (cpuSocket != null && socketList.Split(',').Any(socket => socket.Trim() == cpuSocket))
                            );
                        }).ToList();

                        components = compatibleCoolingSystems;
                    }
                    if (!string.IsNullOrEmpty(cabinetSize))
                    {
                        // Parse the cooling system size
                        if (int.TryParse(cabinetSize, out int size))
                        {
                            components = components.Where(coolingSystem =>
                                int.TryParse(coolingSystem.size, out int coolersize) && coolersize <= size).ToList();
                        }
                    }
                    remainingComponents = entity.CoolingSystems.ToList().Except(components).ToList();
                    ViewData["RemainingComponents"] = remainingComponents;
                    ViewData["ComponentType"] = "coolingSystem";
                    break;
                case "powerSupply":
                    components = entity.PowerSupplies.ToList();
                    ViewData["ComponentType"] = "powerSupply";
                    break;
                case "cabinet":
                    components = entity.Cabinets.ToList();
                    if (!string.IsNullOrEmpty(coolingSystemSize))
                    {
                        // Parse the cooling system size
                        if (int.TryParse(coolingSystemSize, out int size))
                        {
                            components = components.Where(cabinet =>
                                int.TryParse(cabinet.size, out int cabinetsize) && cabinetsize >= size).ToList();
                        }
                    }
                    if (!string.IsNullOrEmpty(formFactor)) // Check for the form factor
                    {
                        List<string> acceptabletype;

                        switch (formFactor)
                        {
                            case "Mini ITX":
                                acceptabletype = new List<string> { "Micro ATX", "Mini ITX" };
                                break;
                            default:
                                acceptabletype = new List<string> { formFactor };
                                break;
                        }

                        components = components
                            .Where(cabinet => acceptabletype.Contains(cabinet.type))
                            .ToList();
                    }
                    remainingComponents = entity.Cabinets.ToList().Except(components).ToList();
                    ViewData["RemainingComponents"] = remainingComponents;
                    ViewData["ComponentType"] = "cabinet";
                    break;
            }

            return PartialView("_ComponentsPartial", components);
        }

    }
}