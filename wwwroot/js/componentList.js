// Importing necessary data
import { filterOptions } from '../Data/filterOptions.js';
import { componentData } from '../Data/cmpData.js';

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const componentType = urlParams.get("type") || "default";



    const backgroundImages = {
        cpu: '/wwwroot/images/ComponentBanners/Processor (4).png',
        gpu: '/wwwroot/images/ComponentBanners/Processor (29).png',
        ram: '/wwwroot/images/ComponentBanners/Processor (27).png',
        motherboard: '/wwwroot/images/ComponentBanners/Processor (15).png',
        storage: '/wwwroot/images/ComponentBanners/Processor (33).png',
        power_supply: '/wwwroot/images/ComponentBanners/Processor (37).png',
        cabinet: '/wwwroot/images/ComponentBanners/Processor (39).png',
        cooler: '/wwwroot/images/ComponentBanners/Processor (44).png',
    };

    // Set dynamic background image for header
    const headerElement = document.querySelector('.header');
    if (backgroundImages[componentType]) {
        headerElement.style.backgroundImage = `url('${backgroundImages[componentType]}')`;
    } else {
        headerElement.style.backgroundImage = `url('/images/DefaultComponent.png')`; // Fallback image if component type not found
    }

    let componentList = componentData[componentType] || [];
    const componentListElement = document.getElementById("component-list");

    // Function to create and append cards
    const createCard = ({ name, image, price }) => {
        return `
        <div class="component-card group flex flex-col items-center gap-4 rounded-lg bg-white p-6 border shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-custom-primary duration-300 cursor-pointer relative">
            <img src="${image}" alt="${name}" class="h-28 w-28 rounded-lg mb-4">
            <h3 class="text-xl font-semibold text-custom-dark">${name}</h3>
            <p class="text-lg text-gray-600">₹${price}</p>
            <a href="/Component/ComponentDetail?type=${componentType}&name=${encodeURIComponent(name)}"
               class="bg-custom-dark text-white rounded-full py-2 px-4 mt-4 text-center font-semibold hover:bg-blue-700 transition-colors duration-300">
               Show More
            </a>
        </div>
        `;
    };

    // Function to render components
    const renderComponentList = (filteredComponentList) => {
        componentListElement.innerHTML = filteredComponentList.map(createCard).join("");
    };

    // Initial render of component list
    renderComponentList(componentList);

    // Price range input
    const priceRangeInput = document.getElementById("price-range");
    const minPriceDisplay = document.getElementById("min-price");
    const maxPriceDisplay = document.getElementById("max-price");

    // Display initial price range values
    minPriceDisplay.textContent = priceRangeInput.min;
    maxPriceDisplay.textContent = priceRangeInput.max;

    // Function to filter components based on selected price range
    const filterByPrice = () => {
        const maxPrice = parseInt(priceRangeInput.value);
        const filteredByPrice = componentList.filter(component => parseInt(component.price.replace(/,/g, '')) <= maxPrice);
        renderComponentList(filteredByPrice);
    };

    // Event listener for price range input
    priceRangeInput.addEventListener("input", () => {
        maxPriceDisplay.textContent = priceRangeInput.value;
        filterByPrice();
    });

    // Get the filter options
    const categoryListElement = document.getElementById("category-list");
    const selectedOptions = filterOptions[componentType] || {};

    // Populate the filter section with dynamic dropdown options
    for (const [category, options] of Object.entries(selectedOptions)) {
        // Create the dropdown container
        const dropdownContainer = document.createElement('div');
        dropdownContainer.classList.add('dropdown-container', 'mb-4');

        // Create the dropdown header with arrow
        const categoryHeader = document.createElement('h4');
        categoryHeader.classList.add('font-bold', 'mt-4', 'cursor-pointer', 'flex', 'items-center', 'justify-between');
        categoryHeader.textContent = category;

        // Add angular arrow icon (SVG-based)
        const arrowIcon = document.createElement('span');
        arrowIcon.classList.add('arrow-icon', 'ml-2', 'transition-transform', 'transform');
        arrowIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        `; // Angular down arrow (caret style)
        categoryHeader.appendChild(arrowIcon);


        // Create the collapsible content (checkboxes)
        const checkboxList = document.createElement('ul');
        checkboxList.classList.add('filter-options', 'pl-4', 'mt-2', 'hidden'); // Initially hidden

        // Add checkboxes inside the dropdown
        options.forEach(option => {
            const li = document.createElement('li');
            li.classList.add('my-2');
            li.innerHTML = `<input type="checkbox" id="${option}" data-category="${category}" class="filter-checkbox"/> <label for="${option}">${option}</label>`;
            checkboxList.appendChild(li);
        });

        // Append header and checkbox list to the dropdown container
        dropdownContainer.appendChild(categoryHeader);
        dropdownContainer.appendChild(checkboxList);
        categoryListElement.appendChild(dropdownContainer);

        // Add toggle functionality for the dropdown
        categoryHeader.addEventListener('click', () => {
            const isOpen = !checkboxList.classList.contains('hidden');
            arrowIcon.style.transform = isOpen ? 'rotate(0)' : 'rotate(180deg)';
            checkboxList.classList.toggle('hidden');
        });
    }

    // Function to filter components based on selected options
    const filterComponents = () => {
        const selectedFilters = {};
        const checkboxes = document.querySelectorAll(".filter-checkbox:checked");

        checkboxes.forEach((checkbox) => {
            const category = checkbox.getAttribute("data-category");
            const option = checkbox.id;

            if (!selectedFilters[category]) {
                selectedFilters[category] = [];
            }
            selectedFilters[category].push(option);
        });

        // Filter the component list based on selected filters
        const filteredList = componentList.filter((component) => {
            // Check if component meets all selected filters
            return Object.keys(selectedFilters).every(category => {
                return selectedFilters[category].includes(component.specifications[category]);
            });
        });

        renderComponentList(filteredList);
    };

    // Attach event listeners to filter checkboxes
    const filterCheckboxes = document.querySelectorAll(".filter-checkbox");
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", filterComponents);
    });
});
