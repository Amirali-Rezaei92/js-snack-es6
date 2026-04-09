// ======================== GLOBAL STATE ========================
// Array to store items: each item = { nome: string, peso: number }
let items = [];

// DOM element references (initialized after DOM is ready)
let nomeInput = document.getElementById('nomeInput');
pesoInput = document.getElementById('pesoInput');
addButton = document.getElementById('addItemBtn');
itemsContainer = document.getElementById('itemsContainer');
findLightestBtn = document.getElementById('findLightestBtn');
lightestResultArea = document.getElementById('lightestResultArea');
itemCounterBadge = document.getElementById('itemCounterBadge');

// ======================== HELPER FUNCTIONS ========================

/** Update the "X / 5" badge and enable/disable ADD button based on items length */
function updateAddButtonState() {
    const currentCount = items.length;
    addButton.disabled = (currentCount >= 5);
    itemCounterBadge.textContent = `${currentCount} / 5`;

    if (currentCount === 5) {
        itemCounterBadge.classList.remove('bg-secondary');
        itemCounterBadge.classList.add('bg-danger');
    } else {
        itemCounterBadge.classList.remove('bg-danger');
        itemCounterBadge.classList.add('bg-secondary');
    }
}

/** Clear the lightest result area (called after every add/remove to avoid stale info) */
function resetLightestDisplay() {
    lightestResultArea.innerHTML = '📌 Click the button to see the lightest item';
    lightestResultArea.classList.remove('alert-success', 'alert-warning');
    lightestResultArea.classList.add('alert-info');
}

/** Display message in the lightest result area */
function setLightestMessage(message, isError = false) {
    lightestResultArea.innerHTML = message;
    if (isError) {
        lightestResultArea.classList.remove('alert-info', 'alert-success');
        lightestResultArea.classList.add('alert-warning');
    } else {
        lightestResultArea.classList.remove('alert-warning', 'alert-info');
        lightestResultArea.classList.add('alert-success');
    }
}

/** Render the entire right-side list using the global `items` array.
 *  Each item appears as a flex row with justify-content-between (space-between)
 *  and includes a REMOVE button that deletes only that specific item.
 */
function renderItemList() {
    itemsContainer.innerHTML = '';

    if (items.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'text-muted text-center p-4';
        emptyDiv.textContent = '📭 No items added. Use the form on the left.';
        itemsContainer.appendChild(emptyDiv);
        updateAddButtonState();
        return;
    }

    items.forEach((item, index) => {
        // Main row: d-flex, justify-content-between, align-items-center (flex utilities)
        const rowDiv = document.createElement('div');
        rowDiv.className = 'd-flex justify-content-between align-items-center p-3 border-bottom item-row';

        // Left side: display Nome and Peso
        const infoSpan = document.createElement('span');
        const pesoDisplay = typeof item.peso === 'number' ? item.peso.toFixed(2) : item.peso;
        infoSpan.textContent = `${item.nome}  |  ⚖️ Peso: ${pesoDisplay} kg`;
        infoSpan.style.fontWeight = '500';

        // REMOVE button (Bootstrap danger small)
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'REMOVE';
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.setAttribute('aria-label', `Remove ${item.nome}`);

        // Attach click event to remove this specific item (by index)
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeItemByIndex(index);
        });

        rowDiv.appendChild(infoSpan);
        rowDiv.appendChild(removeBtn);
        itemsContainer.appendChild(rowDiv);
    });

    updateAddButtonState();
}

/** Remove item from array, re-render list, reset lightest display */
function removeItemByIndex(indexToRemove) {
    items.splice(indexToRemove, 1);
    renderItemList();
    resetLightestDisplay();
    updateAddButtonState();
}

/** Validate inputs: NOME not empty (trim), PESO > 0 (number) */
function validateInputs(nome, pesoRaw) {
    const trimmedNome = nome.trim();
    if (trimmedNome === '') {
        alert('❌ NOME cannot be empty. Please enter a valid name.');
        return false;
    }
    if (pesoRaw === '' || pesoRaw === null || isNaN(pesoRaw)) {
        alert('❌ PESO must be a valid number (e.g., 2.5).');
        return false;
    }
    const pesoNum = parseFloat(pesoRaw);
    if (isNaN(pesoNum) || pesoNum <= 0) {
        alert('❌ PESO must be a positive number (> 0).');
        return false;
    }
    return true;
}

/** Add new item to the list (push to items array, re-render, reset inputs & lightest display) */
function addNewItem() {
    if (items.length >= 5) {
        alert('⚠️ Maximum 5 items allowed. Remove an item before adding a new one.');
        return;
    }

    const nomeValue = nomeInput.value;
    const pesoValueRaw = pesoInput.value;

    if (!validateInputs(nomeValue, pesoValueRaw)) return;

    const pesoNumber = parseFloat(pesoValueRaw);
    const newItem = { nome: nomeValue.trim(), peso: pesoNumber };

    items.push(newItem);
    renderItemList();

    // clear input fields
    nomeInput.value = '';
    pesoInput.value = '';

    resetLightestDisplay();
    nomeInput.focus();
    updateAddButtonState();
}

/** Find and display the lightest item (lowest PESO) inside bottom card */
function findAndDisplayLightest() {
    if (items.length === 0) {
        setLightestMessage('⚠️ No items to compare. Please add at least one item.', true);
        return;
    }

    let lightestItem = items[0];
    for (let i = 1; i < items.length; i++) {
        if (items[i].peso < lightestItem.peso) {
            lightestItem = items[i];
        }
    }

    const formattedPeso = lightestItem.peso % 1 === 0 ? lightestItem.peso : lightestItem.peso.toFixed(2);
    const message = `🏆 LIGHTEST ITEM: ${lightestItem.nome}  |  Peso: ${formattedPeso} kg`;
    setLightestMessage(message, false);
}

/** Initialize DOM references and event listeners after the page loads */
function initApp() {
    // get DOM elements
    nomeInput = document.getElementById('nomeInput');
    pesoInput = document.getElementById('pesoInput');
    addButton = document.getElementById('addItemBtn');
    itemsContainer = document.getElementById('itemsContainer');
    findLightestBtn = document.getElementById('findLightestBtn');
    lightestResultArea = document.getElementById('lightestResultArea');
    itemCounterBadge = document.getElementById('itemCounterBadge');

    // initial state: empty list
    items = [];
    renderItemList();
    resetLightestDisplay();
    updateAddButtonState();

    // clear any leftover input values
    nomeInput.value = '';
    pesoInput.value = '';

    // attach event listeners
    addButton.addEventListener('click', addNewItem);
    findLightestBtn.addEventListener('click', findAndDisplayLightest);

    // optional: press Enter key to add item
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewItem();
        }
    };
    nomeInput.addEventListener('keypress', handleEnter);
    pesoInput.addEventListener('keypress', handleEnter);
}

// Start the application when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', initApp);