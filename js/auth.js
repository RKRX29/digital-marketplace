document.addEventListener('DOMContentLoaded', function() {
  // Check authentication state
  firebase.auth().onAuthStateChanged(function(user) {
    const loginLink = document.querySelector('.login-link');
    
    if (user) {
      // User is signed in
      if (loginLink) {
        loginLink.textContent = 'My Account';
        loginLink.href = '#'; // We'll create a user dashboard later
        
        // Add logout option
        const nav = document.querySelector('.site-nav');
        if (nav) {
          // Check if logout link already exists
          let logoutLink = document.querySelector('.logout-link');
          if (!logoutLink) {
            logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.textContent = 'Logout';
            logoutLink.classList.add('logout-link');
            logoutLink.addEventListener('click', function(e) {
              e.preventDefault();
              firebase.auth().signOut().then(() => {
                window.location.reload();
              });
            });
            nav.appendChild(logoutLink);
          }
        }
      }
      
      // You can also update other elements to show user-specific content
      console.log('User is signed in:', user.displayName || user.email);
    } else {
      // User is signed out
      if (loginLink) {
        loginLink.textContent = 'Login';
        loginLink.href = 'login.html';
      }
      
      // Remove logout link if it exists
      const logoutLink = document.querySelector('.logout-link');
      if (logoutLink) {
        logoutLink.remove();
      }
      
      console.log('User is signed out');
    }
  });
});
