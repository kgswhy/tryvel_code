/**
 * Navigation handler for the travel website
 * Controls consistent navigation behavior across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get current page name from URL
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  
  // Set active navigation button based on current page
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    // Remove all active classes first
    btn.classList.remove('active');
    
    // Get the button's target page
    let targetPage;
    if (btn.hasAttribute('data-href')) {
      targetPage = btn.getAttribute('data-href');
    } else {
      // For the home button which might not have data-href
      if (btn.getAttribute('aria-label') === 'Home') {
        targetPage = 'home.html';
      }
    }
    
    // Set the correct button to active
    if ((currentPage === targetPage) || 
        (currentPage === '' && targetPage === 'home.html') || 
        (currentPage === 'index.html' && targetPage === 'home.html')) {
      btn.classList.add('active');
    }
  });
  
  // Add click handlers to navigation buttons if they don't already have them
  navButtons.forEach(btn => {
    if (!btn.hasAttribute('data-listener-added')) {
      btn.addEventListener('click', function() {
        const href = this.getAttribute('data-href');
        if (href) {
          window.location.href = href;
        } else if (this.getAttribute('aria-label') === 'Home') {
          window.location.href = 'home.html';
        }
      });
      btn.setAttribute('data-listener-added', 'true');
    }
  });
});

// Universal Bookmark Toggle
function setupUniversalBookmark() {
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent event bubbling to parent card
      
      // Toggle active class
      const wasActive = this.classList.contains('active');
      this.classList.toggle('active');
      
      // Add animation class
      this.classList.add('animating');
      setTimeout(() => {
        this.classList.remove('animating');
      }, 300);
      
      // Save bookmark status in localStorage if there's a data-id
      const id = this.dataset.id;
      if (id) {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
        const isBookmarked = this.classList.contains('active');
        bookmarks[id] = isBookmarked;
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        
        // Show notification
        if (typeof showNotification === 'function') {
          if (isBookmarked) {
            showNotification('Successfully saved to bookmarks', 'bookmark-add');
          } else {
            showNotification('Removed from bookmarks', 'bookmark-remove');
          }
        }
      }
    });
    
    // Set initial state from localStorage
    const id = btn.dataset.id;
    if (id) {
      let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
      if (bookmarks[id]) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', setupUniversalBookmark); 