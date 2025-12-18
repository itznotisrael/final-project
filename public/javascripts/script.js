console.log("NEW SCRIPT LOADED — ANIME MEMORY VAULT");

let memoryItems = [];

/* ================= DOM ================= */

const addItemButton = document.getElementById("add-item-button");
const list = document.getElementById("list");
const sortBtn = document.getElementById("sort");

const animeTitleInput = document.getElementById("animeTitle");
const emotionInput = document.getElementById("emotion");
const memoryTextInput = document.getElementById("memoryText");

/* ================= RENDER ================= */

function updateList() {
  list.innerHTML = "";

  memoryItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "memory-item";

    li.innerHTML = `
      <div class="memory-card slide-in-elliptic-top-fwd">
        <div class="memory-orb"></div>
        <strong class="memory-anime">${item.animeTitle}</strong>
        <em class="memory-emotion">${item.emotion}</em>
        <p class="memory-text">${item.memoryText}</p>
        <button class="delete-btn">✕</button>
      </div>
    `;

    li.querySelector(".delete-btn").addEventListener("click", () => {
      deleteItem(item._id);
    });

    list.appendChild(li);
  });
}

/* ================= ADD MEMORY ================= */

addItemButton.addEventListener("click", async () => {
  const animeTitle = animeTitleInput.value.trim();
  const emotion = emotionInput.value.trim();
  const memoryText = memoryTextInput.value.trim();

  if (!animeTitle || !emotion || !memoryText) return;

  await addItem({ animeTitle, emotion, memoryText });

  animeTitleInput.value = "";
  emotionInput.value = "";
  memoryTextInput.value = "";
});

/* ================= SORT ================= */

sortBtn.addEventListener("click", () => {
  memoryItems.sort((a, b) =>
    a.animeTitle.localeCompare(b.animeTitle)
  );
  updateList();
});

/* ================= API ================= */

async function getItems() {
  const res = await fetch("/api/users");
  const data = await res.json();
  memoryItems = data;
  updateList();
}

async function addItem(entry) {
  await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry)
  });
  getItems();
}

async function deleteItem(id) {
  await fetch(`/api/users/${id}`, { method: "DELETE" });
  getItems();
}

getItems();