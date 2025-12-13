// Front end JavaScript code goes here

// START WITH AN EMPTY ARRAY
let todoItems = [];

// DOM ELEMENTS
const addItemButton = document.getElementById('add-item-button');
const list = document.getElementById('list');
const sortBtn = document.getElementById('sort');
const clearBtn = document.getElementById('clear');
const inputField = document.getElementById('text');

// RENDER THE LIST
function updateList() {
    list.innerHTML = '';

    for (let i = 0; i < todoItems.length; i++) {
        const item = todoItems[i];

        const liElement = document.createElement('li');
        liElement.innerText = item.name;
        liElement.id = item._id;

        if (item.completed) {
            liElement.classList.add('completed');
        }

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'x';
        deleteButton.addEventListener('click', function(e) {
            e.stopPropagation();
            deleteItem(item._id);
        });

        // Toggle completed
        liElement.addEventListener('click', function () {
            updateItem(item._id, { completed: !item.completed });
        });

        liElement.appendChild(deleteButton);
        list.appendChild(liElement);
    }
}

// ADD ITEM
addItemButton.addEventListener('click', async function () {
    const value = inputField.value.trim();
    if (value.length === 0) return;

    await addItem(value);
    inputField.value = '';
});

// SORT ITEMS
sortBtn.addEventListener("click", () => {
    todoItems.sort((a, b) => a.name.localeCompare(b.name));
    updateList();
});

// CLEAR ALL
clearBtn.addEventListener("click", async () => {
    for (let i = 0; i < todoItems.length; i++) {
        await deleteItem(todoItems[i]._id);
    }
});

// GET LIST FROM SERVER
async function getItems() {
    const response = await fetch('/api/users');
    const data = await response.json();

    todoItems = data;
    updateList();
}

getItems();

// ADD ITEM TO DATABASE
async function addItem(value) {
    const postData = {
        name: value,
        completed: false
    };

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    });

    await response.json();
    getItems();
}

// UPDATE ITEM (TOGGLE COMPLETED)
async function updateItem(id, updatedValues) {
    const response = await fetch('/api/users/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedValues)
    });

    await response.json();
    getItems();
}

// DELETE ITEM
async function deleteItem(id) {
    const response = await fetch('/api/users/' + id, {
        method: 'DELETE'
    });

    await response.json();
    getItems();
}
