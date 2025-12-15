console.log(" NEW SCRIPT LOADED — ANIME MEMORY VAULT ");

let memoryItems = [];

// DOM ELEMENTS

const addItemButton = document.getElementById("add-item-button");
const list = document.getElementById("list");
const sortBtn = document.getElementById("sort");
const clearBtn = document.getElementById("clear");

const animeTitleInput = document.getElementById("animeTitle");
const emotionSelect = document.getElementById("emotion");
const memoryTextInput = document.getElementById("memoryText");

// RENDER LIST

function updateList() {
  list.innerHTML = "";

  memoryItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "memory-item";
    li.style.borderLeft = `6px solid ${item.moodColor}`;

    li.innerHTML = `
      <strong class="orb">${item.animeTitle}</strong>
      <br>
      <em class="orb">${item.emotion}</em>
      <br>
      <p class="orb">${item.memoryText}</p>
      <br>
      <button class="delete-btn">✕</button>
    `;

    li.querySelector(".delete-btn").addEventListener("click", () => {
      deleteItem(item._id);
    });

    list.appendChild(li);
  });
}

// ADD MEMORY

addItemButton.addEventListener("click", async () => {
  const animeTitle = animeTitleInput.value.trim();
  const emotion = emotionSelect.value;
  const memoryText = memoryTextInput.value.trim();

  if (!animeTitle || !emotion || !memoryText) return;

  await addItem({ animeTitle, emotion, memoryText});

  animeTitleInput.value = "";
  emotionSelect.value = "";
  memoryTextInput.value = "";
});

// SORT A–Z

sortBtn.addEventListener("click", () => {
  memoryItems.sort((a, b) =>
    a.animeTitle.localeCompare(b.animeTitle)
  );
  updateList();
});

// CLEAR ALL

clearBtn.addEventListener("click", async () => {
  for (const item of memoryItems) {
    await deleteItem(item._id);
  }
});

// FETCH ENTRIES

async function getItems() {
  const res = await fetch("/api/users");
  const data = await res.json();

  console.log("FETCHED ENTRIES:", data);

  memoryItems = data;
  updateList();
}

getItems();

// ADD ENTRY

async function addItem(entry) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry)
  });

  const data = await res.json();
  console.log("ADDED: ", data);

  getItems();
}

// DELETE ENTRY

async function deleteItem(id) {
  await fetch(`/api/users/${id}`, { method: "DELETE" });
  getItems();
}
