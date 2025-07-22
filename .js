let entries = JSON.parse(localStorage.getItem('michangoEntries')) || [];
let editingIndex = -1;

function saveEntries() {
  localStorage.setItem('michangoEntries', JSON.stringify(entries));
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  editingIndex = -1;
  document.getElementById("submitBtn").innerText = "Add Entry";
}

function renderTable() {
  const table = document.getElementById("entriesTable");
  table.innerHTML = "";

  entries.forEach((entry, index) => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.amount}</td>
      <td>${entry.description}</td>
      <td>
        <button onclick="editEntry(${index})" class="edit-btn">✏️</button>
        <button onclick="deleteEntry(${index})" class="delete-btn">🗑️</button>
      </td>
    `;
  });

  updateSummary();
}

function updateSummary() {
  const total = entries.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const contributors = entries.length;

  document.getElementById("summary").innerText = 
    `Total Collected: ${total} TZS | Contributors: ${contributors}`;
}

function addOrEditEntry() {
  const name = document.getElementById("name").value.trim();
  const amount = parseFloat(document.getElementById("amount").value.trim());
  const description = document.getElementById("description").value.trim();

  if (!name || isNaN(amount)) {
    alert("Please fill in all required fields correctly.");
    return;
  }

  const entry = { name, amount, description };

  if (editingIndex === -1) {
    entries.push(entry);
  } else {
    entries[editingIndex] = entry;
  }

  saveEntries();
  renderTable();
  resetForm();
}

function deleteEntry(index) {
  if (confirm("Delete this entry?")) {
    entries.splice(index, 1);
    saveEntries();
    renderTable();
  }
}

function editEntry(index) {
  const entry = entries[index];
  document.getElementById("name").value = entry.name;
  document.getElementById("amount").value = entry.amount;
  document.getElementById("description").value = entry.description;
  editingIndex = index;
  document.getElementById("submitBtn").innerText = "Update Entry";
}

// Initial load
renderTable();

document.getElementById("michangoForm").addEventListener("submit", function(e) {
  e.preventDefault();
  addOrEditEntry();
});
