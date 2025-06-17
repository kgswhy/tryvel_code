/**
 * Notification system for Tryvels app
 * Shows elegant, temporary notifications
 */

// Initialize notification container when document is ready
document.addEventListener('DOMContentLoaded', function() {
  if (!document.querySelector('.notification-container')) {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
  }
});

/**
 * Show notification with message and optional icon
 * @param {string} message - The notification message
 * @param {string} type - Type of notification ('success', 'error', etc)
 * @param {number} duration - Duration in milliseconds
 */
function showNotification(message, type = 'success', duration = 2000) {
  // Get or create notification container
  let container = document.querySelector('.notification-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  
  // Add icon based on type
  let iconSvg = '';
  
  if (type === 'success') {
    iconSvg = '<svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>';
  } else if (type === 'error') {
    iconSvg = '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>';
  } else if (type === 'info') {
    iconSvg = '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>';
  } else if (type === 'bookmark-add') {
    iconSvg = '<svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>';
  } else if (type === 'bookmark-remove') {
    iconSvg = '<svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm-5 10.41l-2.12-2.12-1.42 1.42L10.59 15l-2.13 2.12 1.42 1.42L12 16.41l2.12 2.13 1.42-1.42L13.41 15l2.12-2.12-1.42-1.42L12 13.41z"/></svg>';
  }
  
  const iconElement = document.createElement('div');
  iconElement.className = 'notification-icon';
  iconElement.innerHTML = iconSvg;
  notification.appendChild(iconElement);
  
  // Add message
  const messageElement = document.createElement('div');
  messageElement.className = 'notification-message';
  messageElement.textContent = message;
  notification.appendChild(messageElement);
  
  // Add to container
  container.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Hide and remove notification after duration
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, duration);
} 