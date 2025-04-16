document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Basic validation
    let isValid = true;
    
    // Email validation
    if (!validateEmail(email)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError('email');
    }
    
    // Password validation
    if (password.length < 6) {
      showError('password', 'Password must be at least 6 characters');
      isValid = false;
    } else {
      clearError('password');
    }
    
    // If form is valid, proceed with login
    if (isValid) {
      // In a real application, you would send this data to your server
      console.log('Login attempt:', { email, password, remember });
      
      // For demo purposes, simulate successful login
      alert('Login successful! (This is just a demo)');
      
      // In a real app, you would redirect after successful authentication
      // window.location.href = 'index.html';
    }
  });
  
  // Helper functions
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.parentElement;
    
    // Add error class to form group
    formGroup.classList.add('error');
    
    // Check if error message element exists
    let errorElement = formGroup.querySelector('.error-message');
    
    // If not, create it
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      formGroup.appendChild(errorElement);
    }
    
    // Set error message
    errorElement.textContent = message;
  }
  
  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.parentElement;
    
    // Remove error class
    formGroup.classList.remove('error');
    
    // Remove error message if it exists
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = '';
    }
  }
});
