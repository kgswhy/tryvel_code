// Greeting card animation
window.addEventListener('DOMContentLoaded', () => {
  const greeting = document.querySelector('.greeting-card');
  if (greeting) {
    greeting.style.opacity = 0;
    greeting.style.transform = 'translateY(-16px)';
    setTimeout(() => {
      greeting.style.transition = 'opacity 0.7s, transform 0.7s';
      greeting.style.opacity = 1;
      greeting.style.transform = 'translateY(0)';
    }, 300);
  }

  // Bookmark toggle
  document.querySelectorAll('.pick-bookmark').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
    });
  });

  // Set initial active state for bottom nav
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.bottom-nav .nav-btn').forEach(btn => {
    const ariaLabel = btn.getAttribute('aria-label');
    let targetPage = '';

    if (ariaLabel === 'Home') {
      targetPage = 'home.html';
    } else if (ariaLabel === 'Search') {
      targetPage = 'search.html';
    } else if (ariaLabel === 'Bookmark') {
      targetPage = 'home.html'; // Placeholder
    } else if (ariaLabel === 'Chat') {
      targetPage = 'home.html'; // Placeholder
    } else if (ariaLabel === 'Profile') {
      targetPage = 'home.html'; // Placeholder
    }

    if (currentPage === targetPage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Bottom nav active state and page navigation
  document.querySelectorAll('.bottom-nav .nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons before navigating
      document.querySelectorAll('.bottom-nav .nav-btn').forEach(b => b.classList.remove('active'));
      // Add active class to the clicked button (this will be short-lived as page navigates)
      this.classList.add('active');

      const ariaLabel = this.getAttribute('aria-label');
      let targetPage = 'home.html'; // Default to home page

      if (ariaLabel === 'Home') {
        targetPage = 'home.html';
      } else if (ariaLabel === 'Search') {
        targetPage = 'search.html';
      } else if (ariaLabel === 'Bookmark') {
        targetPage = 'home.html'; // Placeholder, change when bookmark page is created
      } else if (ariaLabel === 'Chat') {
        targetPage = 'home.html'; // Placeholder, change when chat page is created
      } else if (ariaLabel === 'Profile') {
        targetPage = 'home.html'; // Placeholder, change when profile page is created
      }

      // Navigate to the target page
      window.location.href = targetPage;
    });
  });
}); 