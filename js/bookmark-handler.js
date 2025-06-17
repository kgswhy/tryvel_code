/**
 * Bookmark handler for the Tryvels app
 * Manages bookmark toggling and notifications
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize bookmark buttons
  setupBookmarkHandler();
});

function setupBookmarkHandler() {
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