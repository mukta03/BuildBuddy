import { gamingLaptops, businessLaptops, budgetLaptops } from "../Data/laptopData.js"; // Import all laptop types

const banner = document.getElementById('banner');
const bannerTitle = document.getElementById('banner-title');

// Define banner images based on laptop types
const bannerImages = {
    gaming: {
        image: '/wwwroot/images/PCLaptop/Gaming_banner.jpg',
        title: 'Top Gaming Laptops'
    },
    business: {
        image: '/wwwroot/images/PCLaptop/Business_Banner.png',
        title: 'Top Business Laptops'
    },
    budget: {
        image: '/wwwroot/images/PCLaptop/Budget_Banner.png',
        title: 'Top Budget Laptops'
    }
};

// Function to get the laptop type from the URL
function getLaptopTypeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('type'); // Return the type from the URL
}

// Function to set the banner image and title
function setBanner() {
    const laptopType = getLaptopTypeFromURL(); // Get the laptop type
    const selectedBanner = bannerImages[laptopType]; // Select the banner based on type

    if (selectedBanner) {
        banner.style.backgroundImage = `url(${selectedBanner.image})`; // Set the banner image
        bannerTitle.textContent = selectedBanner.title; // Set the banner title
    }
}

// Function to render laptops dynamically
function renderLaptops() {
    const laptopList = document.getElementById('laptop-list');
    const laptopType = getLaptopTypeFromURL(); // Get the laptop type

    let laptopsToRender = [];

    // Filter laptops based on the laptop type
    if (laptopType === 'gaming') {
        laptopsToRender = gamingLaptops;
    } else if (laptopType === 'business') {
        laptopsToRender = businessLaptops;
    } else if (laptopType === 'budget') {
        laptopsToRender = budgetLaptops;
    }

    // Render laptops
    laptopsToRender.forEach(laptop => {
        const laptopItem = document.createElement('div');

        // Change the class name to include custom color and hover effect
        laptopItem.className = "product-card transition-transform duration-300 transform hover:scale-105 hover:shadow-xl";

        // Set the click event to redirect to the laptop detail page
        laptopItem.onclick = () => {
            window.location.href = `/PCLaptop/LaptopDetail?name=${encodeURIComponent(laptop.name)}&type=${encodeURIComponent(laptopType)}`; // Use encodeURIComponent for safe URL
        };

        laptopItem.innerHTML = `
            <img src="${laptop.img}" alt="${laptop.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-bold text-lg text-black">${laptop.name}</h3>
                <p class="text-gray-600">₹${laptop.price}</p>
            </div>
        `;
        laptopList.appendChild(laptopItem);
    });
}

// Call the functions to set the banner and render laptops on page load
document.addEventListener('DOMContentLoaded', () => {
    setBanner();
    renderLaptops();
});
