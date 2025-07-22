const form = document.getElementById('entryForm');
const totalProducedEl = document.getElementById('totalProduced');
const totalSoldEl = document.getElementById('totalSold');
const totalRemainingEl = document.getElementById('totalRemaining');
const totalRevenueEl = document.getElementById('totalRevenue');
const entriesList = document.getElementById('entriesList');

let entries = JSON.parse(localStorage.getItem('bakeryEntries') || '[]');

function updateDashboard() {
  let totalProduced = 0, totalSold = 0, totalRevenue = 0;

  entriesList.innerHTML = '';
  entries.forEach(entry => {
    const remaining = entry.produced - entry.sold;
    totalProduced += entry.produced;
    totalSold += entry.sold;
    totalRevenue += entry.sold * entry.price;

    const div = document.createElement('div');
    div.innerHTML = `<b>${entry.product}</b> — Produced: ${entry.produced}, Sold: ${entry.sold}, Remaining: ${remaining}, Revenue: ${entry.sold * entry.price} TZS`;
    entriesList.appendChild(div);
  });

  totalProducedEl.textContent = totalProduced;
  totalSoldEl.textContent = totalSold;
  totalRemainingEl.textContent = totalProduced - totalSold;
  totalRevenueEl.textContent = totalRevenue;
}

form.onsubmit = (e) => {
  e.preventDefault();
  const product = document.getElementById('product').value.trim();
  const produced = parseInt(document.getElementById('produced').value);
  const sold = parseInt(document.getElementById('sold').value);
  const price = parseFloat(document.getElementById('price').value);

  if (!product || isNaN(produced) || isNaN(sold) || isNaN(price)) return;

  entries.push({ product, produced, sold, price });
  localStorage.setItem('bakeryEntries', JSON.stringify(entries));

  form.reset();
  updateDashboard();
};

updateDashboard();