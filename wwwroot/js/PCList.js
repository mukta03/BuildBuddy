import { gamingPC, businessPC, budgetPC } from "../Data/pcData.js";

// Function to render PC cards based on the type
function renderPCCards(pcType) {
    const pcListElement = document.getElementById('gaming-pc-list');
    pcListElement.innerHTML = ''; // Clear previous cards

    // Define banner images, titles, and PC data based on the type
    const bannerDetails = {
        gaming: {
            image: '/wwwroot/images/PCLaptop/gamingbanner.jpg',
            title: 'Top Gaming PCs',
        },
        business: {
            image: '/wwwroot/images/PCLaptop/apple_imac_banner.png', // Replace with your business banner path
            title: 'Top Business PCs',
        },
        budget: {
            image: '/wwwroot/images/PCLaptop/budgetbanner.png', // Replace with your budget banner path
            title: 'Top Budget PCs',
        }
    };

    const pcData = {
        gaming: gamingPC,
        business: businessPC,
        budget: budgetPC,
    };

    // Check if the pcType is valid and available
    if (!bannerDetails[pcType] || !pcData[pcType]) {
        console.error('Invalid PC type');
        return;
    }

    // Set banner image and title according to PC type
    const bannerElement = document.getElementById('banner');
    const bannerTitleElement = document.getElementById('banner-title');
    const selectedBanner = bannerDetails[pcType];

    bannerElement.style.backgroundImage = `url(${selectedBanner.image})`; // Set banner image
    console.log(`Setting banner image: ${selectedBanner.image}`);
    bannerTitleElement.textContent = selectedBanner.title; // Set banner title

    // Retrieve the appropriate PC array based on type
    const selectedPCs = pcData[pcType];

    // Create cards for the selected PC type
    selectedPCs.forEach(pc => {
        const pcCard = document.createElement('div');
        pcCard.className = 'card bg-[#c0c0c0] rounded-lg shadow-lg p-6 transition duration-300 hover:bg-[#999999] hover:shadow-xl cursor-pointer transform hover:scale-105';

        // Set an onclick event for the card to redirect to the details page
        pcCard.onclick = () => {
            window.location.href = `/PCLaptop/PCDetail?name=${encodeURIComponent(pc.name)}&type=${encodeURIComponent(pcType)}`;
        };

        pcCard.innerHTML = `
            <img src="${pc.image}" alt="${pc.name}" class="w-full h-48 object-cover rounded-t-lg mb-4">
            <h3 class="text-xl font-bold mt-2">${pc.name}</h3>
            <p class="mt-2 text-gray-700 font-regular">${pc.price}</p>
            <p class="mt-2 text-gray-700 line-clamp-2">${pc.description || 'No description available'}</p> <!-- Added Description with line clamp -->
        `;

        pcListElement.appendChild(pcCard);
    });
}

// Function to get the PC type from the URL
function getPCTypeFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('type'); // Expecting the URL to have ?type=gaming|business|budget
}

// Call the function to render the cards on page load
const pcType = getPCTypeFromURL();
if (pcType) {
    renderPCCards(pcType);
} else {
    console.error('PC type not specified in URL');
}
