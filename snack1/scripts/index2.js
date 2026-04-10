

const nameInput = document.querySelector('#nomeInput');
const weightInput = document.querySelector('#pesoInput');
const addButton = document.querySelector('#addItemBtn');
const itemsContainer = document.querySelector('#itemsContainer');
const findLightestBtn = document.querySelector('#findLightestBtn');
const lightestResultArea = document.querySelector('#lightestResultArea');
const itemCounterBadge = document.querySelector('#itemCounterBadge');

let items = [];


function updateAddButtonState() {
    let counter = 0;
    if (items.length >= 5) {
        addButton.disabled = true;
        counter = 5;
    } else {
        addButton.disabled = false;
        counter = items.length;
    }
    itemCounterBadge.textContent = `${counter} / 5`;
    if (counter === 5) {
        itemCounterBadge.classList.remove('bg-secondary');
        itemCounterBadge.classList.add('bg-danger');
    } else {
        itemCounterBadge.classList.remove('bg-danger');
        itemCounterBadge.classList.add('bg-secondary');
    }
}
function addNewItem() {
    const name = nameInput.value.trim();
    const weight = parseFloat(weightInput.value.trim());
    if (name === '' || isNaN(weight) || weight <= 0) {
        alert('Inserisci un nome valido e un peso positivo.');
        return;
    } else if (items.length >= 5) {
        alert('Hai già aggiunto 5 elementi. Rimuovi un elemento esistente per aggiungerne uno nuovo.');
        return;
    } else {
        items.push({ nome: name, peso: weight }); // ogetto con nome e peso
        updateItemList();
        updateAddButtonState();
        nameInput.value = '';
        weightInput.value = '';
    }

}

function updateItemList() {
    itemsContainer.innerHTML = '';
    if (items.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'text-muted text-center p-4';
        emptyDiv.textContent = '📭 Nessun elemento aggiunto. Usa il form a sinistra.';
        itemsContainer.appendChild(emptyDiv);
        return;
    } else {
        for ( let item of items) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'd-flex justify-content-between align-items-center mb-2 p-2 border rounded';
            itemDiv.innerHTML = `
            <div>
                <strong>${item.nome}</strong><br>
                <small class="text-muted">${item.peso} kg</small>
            </div>
            <button class="btn btn-sm btn-outline-danger" id="removeBtn">Rimuovi</button>
        `;
            const removeBtn = itemDiv.querySelector('#removeBtn');
            removeBtn.addEventListener('click', () => {
                items = items.filter(i => i !== item);
                updateItemList();
                updateAddButtonState();


            });
            itemsContainer.appendChild(itemDiv);
        }
    }
}
addButton.addEventListener('click', addNewItem);

function findLightestItem() {
    if (items.length === 0) {
        lightestResultArea.textContent = '⛔️ Nessun elemento da valutare.';
        return;
    }
    let lightest = items[0];
    for (let item of items) {
        if (item.peso < lightest.peso) {
            lightest = item;
        }
    }
    lightestResultArea.textContent = `✅  L'elemento più leggero è: ${lightest.nome} (${lightest.peso} kg)`;
}
findLightestBtn.addEventListener('click', findLightestItem);


