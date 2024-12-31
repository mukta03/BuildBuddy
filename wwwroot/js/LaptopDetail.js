import { gamingLaptops, businessLaptops, budgetLaptops } from "../Data/laptopData.js"; // Import laptop data

// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to display laptop details
function displayLaptopDetails() {
    const laptopName = getQueryParam('name'); // Get the laptop name from the URL
    const laptopType = getQueryParam('type'); // Get the laptop type from the URL

    let selectedLaptop;

    // Find the laptop based on the type
    switch (laptopType) {
        case 'gaming':
            selectedLaptop = gamingLaptops.find(laptop => laptop.name === laptopName); // Find gaming laptop by name
            break;
        case 'business':
            selectedLaptop = businessLaptops.find(laptop => laptop.name === laptopName); // Find business laptop by name
            break;
        case 'budget':
            selectedLaptop = budgetLaptops.find(laptop => laptop.name === laptopName); // Find budget laptop by name
            break;
        default:
            document.getElementById('laptop-detail').innerHTML = '<p class="text-red-500">Invalid laptop type.</p>';
            return; // Exit if laptop type is invalid
    }

    // Update the DOM elements with the selected laptop's details
    if (selectedLaptop) {
        document.getElementById('laptop-image').src = selectedLaptop.img; // Set the image source
        document.getElementById('laptop-name').innerText = selectedLaptop.name; // Set the laptop name
        document.getElementById('laptop-price').innerText = `₹${selectedLaptop.price}`; // Set the price
        document.getElementById('laptop-description').innerText = selectedLaptop.description || "Description not available"; // Set description

        // Populate specifications if available
        const specsList = document.getElementById('laptop-specs');
        specsList.innerHTML = ''; // Clear existing items
        if (selectedLaptop.specifications && Object.keys(selectedLaptop.specifications).length > 0) {
            // Loop through each specification
            for (const [key, value] of Object.entries(selectedLaptop.specifications)) {
                const li = document.createElement('li');
                li.innerText = `${key}: ${value}`; // Set the text to "Specification: Value"
                specsList.appendChild(li);
            }
        } else {
            specsList.innerHTML = '<li>No specifications available.</li>';
        }

        // Dynamically set the Amazon link
        const amazonLink = document.getElementById('amazonLink');
        if (selectedLaptop.amazonLink) {
            amazonLink.href = selectedLaptop.amazonLink; // Set the Amazon link
            amazonLink.style.display = 'inline-block'; // Show the button if the link is available
        } else {
            amazonLink.style.display = 'none'; // Hide the button if the link is not available
        }
    } else {
        // Handle case where the laptop is not found
        document.getElementById('laptop-detail').innerHTML = '<p class="text-red-500">Laptop not found.</p>';
    }
}

// Call the function to display laptop details on page load
document.addEventListener('DOMContentLoaded', displayLaptopDetails);
