import { gamingPC, businessPC, budgetPC } from "../Data/pcData.js";
// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to display pc details
function displaypcDetails() {
    const pcName = getQueryParam('name'); // Get the pc name from the URL
    const pcType = getQueryParam('type'); // Get the pc type from the URL

    let selectedpc;

    // Find the pc based on the type
    switch (pcType) {
        case 'gaming':
            selectedpc = gamingPC.find(pc => pc.name === pcName); // Find gaming pc by name
            break;
        case 'business':
            selectedpc = businessPC.find(pc => pc.name === pcName); // Find business pc by name
            break;
        case 'budget':
            selectedpc = budgetPC.find(pc => pc.name === pcName); // Find budget pc by name
            break;
        default:
            document.getElementById('pc-detail').innerHTML = '<p class="text-red-500">Invalid pc type.</p>';
            return; // Exit if pc type is invalid
    }

    // Update the DOM elements with the selected pc's details
    if (selectedpc) {
        document.getElementById('pc-image').src = selectedpc.image; // Set the image source
        document.getElementById('pc-name').innerText = selectedpc.name; // Set the pc name
        document.getElementById('pc-price').innerText = `${selectedpc.price}`; // Set the price
        document.getElementById('pc-description').innerText = selectedpc.description || "Description not available"; // Set description

        // Populate specifications if available
        const specsList = document.getElementById('pc-specs');
        specsList.innerHTML = ''; // Clear existing items
        if (selectedpc.specifications && Object.keys(selectedpc.specifications).length > 0) {
            // Loop through each specification
            for (const [key, value] of Object.entries(selectedpc.specifications)) {
                const li = document.createElement('li');
                li.innerText = `${key}: ${value}`; // Set the text to "Specification: Value"
                specsList.appendChild(li);
            }
        } else {
            specsList.innerHTML = '<li>No specifications available.</li>';
        }
    } else {
        // Handle case where the pc is not found
        document.getElementById('pc-detail').innerHTML = '<p class="text-red-500">pc not found.</p>';
    }
}

// Call the function to display pc details on page load
document.addEventListener('DOMContentLoaded', displaypcDetails);
