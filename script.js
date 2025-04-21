// Main JavaScript file for the Digital Marketplace

document.addEventListener('DOMContentLoaded', function() {
  console.log('Digital Marketplace initialized');
  
  // Add event listeners to buy buttons
  const buyButtons = document.querySelectorAll('.course-card button');
  buyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Check if user is logged in before allowing purchase
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in, proceed with purchase
          const courseName = e.target.closest('.course-card').querySelector('h2').textContent;
          alert(`You are purchasing: ${courseName}. This feature will be implemented soon!`);
        } else {
          // User is not signed in, redirect to login
          alert('Please log in to purchase this course');
          window.location.href = 'login.html';
        }
      });
    });
  });
});
