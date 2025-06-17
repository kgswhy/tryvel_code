// Saved page functionality
document.addEventListener('DOMContentLoaded', () => {
  const viewToggle = document.querySelector('.view-toggle');
  const savedGrid = document.querySelector('.saved-grid');
  const toggleButtons = document.querySelectorAll('.toggle-btn');

  // Handle view toggle
  viewToggle.addEventListener('click', (e) => {
    const button = e.target.closest('.toggle-btn');
    if (!button) return;
    toggleButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const view = button.dataset.view;
    savedGrid.className = 'saved-grid';
    if (view === 'list') {
      savedGrid.classList.add('list-view');
    }
  });

  // Bookmark persistent logic
  const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
  // Gunakan nama tempat sebagai key
  bookmarkButtons.forEach(button => {
    const card = button.closest('.saved-card');
    const title = card.querySelector('h3').textContent.trim();
    // Set initial state from localStorage
    const saved = JSON.parse(localStorage.getItem('savedPlaces') || '{}');
    if (saved[title]) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
    // Toggle logic
    button.addEventListener('click', (e) => {
      e.preventDefault();
      button.classList.toggle('active');
      const saved = JSON.parse(localStorage.getItem('savedPlaces') || '{}');
      if (button.classList.contains('active')) {
        saved[title] = true;
      } else {
        delete saved[title];
      }
      localStorage.setItem('savedPlaces', JSON.stringify(saved));
    });
  });
}); 