document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  
  // Check if user is already logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in, redirect to index page
      window.location.href = 'index.html';
    }
  });
  
  registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    // Basic validation
    let isValid = true;
    
    // Name validation
    if (name.trim().length < 2) {
      showError('name', 'Please enter your full name');
      isValid = false;
    } else {
      clearError('name');
    }
    
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
    
    // Confirm password validation
    if (password !== confirmPassword) {
      showError('confirmPassword', 'Passwords do not match');
      isValid = false;
    } else {
      clearError('confirmPassword');
    }
    
    // Terms validation
    if (!terms) {
      showError('terms', 'You must agree to the terms and conditions');
      isValid = false;
    } else {
      clearError('terms');
    }
    
    // If form is valid, proceed with registration
    if (isValid) {
      // Show loading state
      const submitBtn = registerForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Creating Account...';
      submitBtn.disabled = true;
      
      // Create user with Firebase
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed up successfully
          const user = userCredential.user;
          
          // Update user profile with name
          return user.updateProfile({
            displayName: name
          });
        })
        .then(() => {
          // Send email verification
          return firebase.auth().currentUser.sendEmailVerification();
        })
        .then(() => {
          // Create user document in Firestore (we'll implement this later)
          // For now, just redirect to home page
          alert('Account created successfully! Please verify your email.');
          window.location.href = 'index.html';
        })
        .catch((error) => {
          // Handle errors
          const errorCode = error.code;
          const errorMessage = error.message;
          
          if (errorCode === 'auth/email-already-in-use') {
            showError('email', 'This email is already registered');
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
});
