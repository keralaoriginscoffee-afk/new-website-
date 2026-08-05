const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Generic filter-tab handling: any .filter-tabs with buttons carrying
// data-filter, paired with a grid whose cards carry data-category.
document.querySelectorAll('.filter-tabs').forEach(tabGroup => {
  const gridId = tabGroup.dataset.targetGrid;
  const grid = gridId ? document.getElementById(gridId) : null;
  if (!grid) return;
  const cards = grid.children;
  tabGroup.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabGroup.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      Array.from(cards).forEach(card => {
        const cat = card.dataset.category || '';
        card.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
      });
    });
  });
});
