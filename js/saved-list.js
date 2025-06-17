// Saved list page functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get toggle buttons
  const gridToggleBtn = document.querySelector('.toggle-btn[data-view="grid"]');
  const listToggleBtn = document.querySelector('.toggle-btn[data-view="list"]');
  const savedList = document.querySelector('.saved-list');
  
  // Check if we need to create grid view
  if (!document.querySelector('.saved-grid')) {
    createGridView();
  }
  
  const savedGrid = document.querySelector('.saved-grid');
  
  // Add event listeners to toggle buttons
  if (gridToggleBtn && listToggleBtn) {
    gridToggleBtn.addEventListener('click', function() {
      setActiveView('grid');
    });
    
    listToggleBtn.addEventListener('click', function() {
      setActiveView('list');
    });
  }
  
  // Function to set active view
  function setActiveView(viewType) {
    if (viewType === 'grid') {
      gridToggleBtn.classList.add('active');
      listToggleBtn.classList.remove('active');
      savedGrid.style.display = 'grid';
      savedList.style.display = 'none';
      
      // Redirect to grid view page
      window.location.href = 'saved.html';
    } else if (viewType === 'list') {
      gridToggleBtn.classList.remove('active');
      listToggleBtn.classList.add('active');
      savedGrid.style.display = 'none';
      savedList.style.display = 'flex';
    }
  }
  
  // Function to create grid view based on list items
  function createGridView() {
    const savedListItems = document.querySelectorAll('.saved-list-item');
    const savedGridContainer = document.createElement('div');
    savedGridContainer.className = 'saved-grid';
    savedGridContainer.style.display = 'none';
    
    // For each item in list, create a grid card
    savedListItems.forEach(item => {
      const image = item.querySelector('.saved-list-image img').src;
      const title = item.querySelector('.saved-list-info h3').textContent;
      const location = item.querySelector('.saved-list-info p').textContent;
      const rating = item.querySelector('.rating-value').textContent;
      
      // Create grid card
      const gridCard = document.createElement('div');
      gridCard.className = 'saved-card';
      gridCard.innerHTML = `
        <div class="saved-image">
          <img src="${image}" alt="${title}">
          <button class="bookmark-btn active">
            <svg width="24" height="24" fill="#9CA4A9" viewBox="0 0 24 24">
              <path d="M6 4a2 2 0 0 0-2 2v14l8-5.333L20 20V6a2 2 0 0 0-2-2H6z"/>
            </svg>
          </button>
        </div>
        <div class="saved-info">
          <h3>${title}</h3>
          <p>${location}</p>
          <div class="saved-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-value">${rating}</span>
          </div>
        </div>
      `;
      
      savedGridContainer.appendChild(gridCard);
    });
    
    // Add grid container before list
    savedList.parentNode.insertBefore(savedGridContainer, savedList);
  }
}); 