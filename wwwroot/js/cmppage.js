import { componentData } from "../Data/cmpData.js";

function getComponentTypeFromURL() {
    return new URLSearchParams(window.location.search).get('type');
}

function populateDropdowns() {
    const dropdowns = document.querySelectorAll('.product-dropdown');
    const componentType = getComponentTypeFromURL();

    const selectedValues = Array.from(dropdowns)
        .map(dropdown => dropdown.value)
        .filter(Boolean);

    dropdowns.forEach(dropdown => {
        const previousSelection = dropdown.value;
        dropdown.innerHTML = '<option value="" disabled selected>Select Product</option>';

        if (componentType && componentData[componentType]) {
            componentData[componentType].forEach(component => {
                if (!selectedValues.includes(component.name) || component.name === previousSelection) {
                    const optionElement = new Option(component.name, component.name);
                    if (component.name === previousSelection) {
                        optionElement.selected = true;
                    }
                    dropdown.add(optionElement);
                }
            });
        } else {
            dropdown.add(new Option('No components available', ''));
        }
    });
}

function addComparisonColumn() {
    const comparisonSection = document.getElementById('comparison-section');

    if (comparisonSection.children.length < 5) { // Limit to 4 components (3 + 1 button)
        const newColumn = document.createElement('div');
        newColumn.className = 'comparison-column relative flex flex-col items-center p-4 bg-white shadow-lg rounded-lg w-full md:w-1/2 lg:w-1/4';
        newColumn.innerHTML = `
        <button class="remove-column absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white text-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <select class="product-dropdown p-2 border border-gray-300 rounded w-full mt-10">
            <option value="" disabled selected>Select Product</option>
        </select>
        <div class="component-details mt-4 p-2 border border-gray-300 rounded w-full hidden">
            <div class="flex justify-center mb-2">
                <img src="" alt="Product Image" class="w-48 h-48 object-cover" id="component-image">
            </div>
            <h1 id="component-name" class="text-xl font-bold mb-2"></h1>
            <h2 id="component-price" class="text-lg font-semibold mt-2"></h2>
            <table class="w-full border-collapse border mt-2">
                <tbody id="component-specifications" class="w-full">
                    <!-- Dynamic rows will be added here -->
                </tbody>
            </table>
        </div>
        `;

        comparisonSection.insertBefore(newColumn, document.getElementById('add-comparison-container'));
        populateDropdowns();

        newColumn.querySelector('.product-dropdown').addEventListener('change', (event) => updateComponentDetails(event.target));
        updateAddButtonState();
    }
}

function updateComponentDetails(dropdown) {
    const componentType = getComponentTypeFromURL();
    const componentDetailsDiv = dropdown.closest('.comparison-column').querySelector('.component-details');
    const selectedComponent = componentData[componentType]?.find(c => c.name === dropdown.value);

    if (selectedComponent) {
        componentDetailsDiv.querySelector('#component-image').src = selectedComponent.image || '';
        componentDetailsDiv.querySelector('#component-name').textContent = selectedComponent.name || 'No name available';

        // Set component price
        componentDetailsDiv.querySelector('#component-price').textContent = selectedComponent.price
            ? `${selectedComponent.price}`
            : 'Price not available';

        // Clear previous table content if any
        const specTable = componentDetailsDiv.querySelector('#component-specifications');
        specTable.innerHTML = '';

        // Check if there are specifications to display
        const specifications = selectedComponent.specifications;

        if (specifications && Object.keys(specifications).length > 0) {
            // Create table rows dynamically from the specifications object
            for (const specName in specifications) {
                const row = document.createElement('tr');
                row.innerHTML = `<td class="p-2 border">${specName}</td><td class="p-2 border">${specifications[specName]}</td>`;
                specTable.appendChild(row);
            }
        } else {
            specTable.innerHTML = '<tr><td colspan="2" class="p-2 text-center">No specifications available</td></tr>';
        }

        componentDetailsDiv.classList.remove('hidden');
    } else {
        componentDetailsDiv.classList.add('hidden');
    }

    populateDropdowns();
}

function updateAddButtonState() {
    const comparisonSection = document.getElementById('comparison-section');
    const addButton = document.getElementById('add-comparison');
    const removeButtons = document.querySelectorAll('.remove-column');

    const maxColumnsReached = comparisonSection.children.length >= 4; // 3 components + 1 "+" button
    addButton.disabled = maxColumnsReached;
    addButton.classList.toggle('opacity-50', maxColumnsReached); // Adjust opacity when disabled

    // Enable/disable remove buttons based on the number of columns
    removeButtons.forEach(button => {
        button.disabled = !maxColumnsReached;
        button.classList.toggle('opacity-50', !maxColumnsReached);
    });
}

function removeComparisonColumn(event) {
    if (event.target.closest('.remove-column')) {
        const columns = document.querySelectorAll('.comparison-column');

        if (columns.length > 2) {
            event.target.closest('.comparison-column').remove();
            populateDropdowns();
            updateAddButtonState();
        } else {
            showNotification("At least 2 comparison columns are required.");
        }
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('hidden');
    setTimeout(hideNotification, 3000); // Hide notification after 3 seconds
}

function hideNotification() {
    document.getElementById('notification').classList.add('hidden');
}

function closeNotification() {
    hideNotification();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();

    document.getElementById('add-comparison').addEventListener('click', addComparisonColumn);
    document.getElementById('comparison-section').addEventListener('click', removeComparisonColumn);
    document.getElementById('close-notification').addEventListener('click', closeNotification);

    document.querySelectorAll('.product-dropdown').forEach(dropdown => {
        dropdown.addEventListener('change', (event) => updateComponentDetails(event.target));
    });

    updateAddButtonState();
});
