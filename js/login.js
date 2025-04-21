document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  
  // Check if user is already logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in, redirect to index page
      window.location.href = 'index.html';
    }
  });
  
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
      // Show loading state
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Signing in...';
      submitBtn.disabled = true;
      
      // Sign in with Firebase
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in successfully
          const user = userCredential.user;
          
          // Handle "remember me" option
          if (remember) {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          } else {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
          }
          
          // Redirect to home page
          window.location.href = 'index.html';
        })
        .catch((error) => {
          // Handle errors
          const errorCode = error.code;
          const errorMessage = error.message;
          
          if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
            showError('email', 'Invalid email or password');
          } else {
            showError('email', errorMessage);
          }
          
          // Reset button
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        });
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
  
  // Handle forgot password link
  const forgotPasswordLink = document.querySelector('.forgot-password');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      
      if (!email || !validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return;
      }
      
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          alert('Password reset email sent. Please check your inbox.');
        })
        .catch((error) => {
          showError('email', error.message);
        });
    });
  }
});
