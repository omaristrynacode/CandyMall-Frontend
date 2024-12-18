document.addEventListener('DOMContentLoaded', () => {
  const loginPopup = document.getElementById('loginPopup'); // Login popup element
  const signupPopup = document.getElementById('popup'); // Signup popup element
  const openSignupButton = document.getElementById('openPopupButton'); // Button to open signup popup
  const closeSignupButton = document.getElementById('closePopup'); // Button to close signup popup
  const closeLoginButton = document.getElementById('closeLoginPopup'); // Button to close login popup
  const openSignupFromLoginButton = document.getElementById('openSignupFromLogin'); // Button to open signup from login popup

  // Shared Functions
  const openPopup = (popupElement) => {
    if (popupElement) {
      popupElement.style.display = 'flex'; // Show the popup
      popupElement.classList.add('active');
    }
  };

  const closePopup = (popupElement) => {
    if (popupElement) {
      popupElement.style.display = 'none'; // Hide the popup
      popupElement.classList.remove('active');
    }
  };

  // Add event listeners for opening and closing the signup popup
  if (openSignupButton) {
    openSignupButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      openPopup(signupPopup);
    });
  }

  if (closeSignupButton) {
    closeSignupButton.addEventListener('click', () => closePopup(signupPopup));
  }

  // Close signup popup when clicking outside the popup content
  if (signupPopup) {
    signupPopup.addEventListener('click', (event) => {
      if (event.target === signupPopup) {
        closePopup(signupPopup); // Close the popup only when clicking on the overlay
      }
    });
  }

  // Prevent closing the signup popup when clicking inside the popup content
  const popupBox = document.querySelector('.popup-box');
  if (popupBox) {
    popupBox.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the event from bubbling up
    });
  }

  // Handle the signup form submission
  const signupForm = document.getElementById('createAccountForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission

      // Extract form values
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const birthdate = document.getElementById('birthdate').value;
      const password = document.getElementById('password').value;
      const termsChecked = document.getElementById('terms').checked;

      // Validation
      if (!firstName || !lastName) {
        alert('Please enter your first and last name.');
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some((user) => user.email === email)) {
        alert('This email is already registered. Please use a different email or log in.');
        return;
      }

      if (!birthdate) {
        alert('Please enter your birthdate.');
        return;
      }

      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
      }

      if (!termsChecked) {
        alert('You must accept the terms and conditions.');
        return;
      }

      // Save user data
      const newUser = { firstName, lastName, phone, email, birthdate, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      alert('Account created successfully!');
      signupForm.reset(); // Reset form
      closePopup(signupPopup); // Close signup popup
      openPopup(loginPopup); // Open login popup
    });
  }

  // Redirect to login popup if "Log in" link is clicked
  const goToLoginLink = document.querySelector('.go-to-login');
  if (goToLoginLink) {
    goToLoginLink.addEventListener('click', (event) => {
      event.preventDefault();
      closePopup(signupPopup); // Close the signup popup
      openPopup(loginPopup); // Open the login popup
    });
  }

  // Add event listeners for closing the login popup
  if (closeLoginButton) {
    closeLoginButton.addEventListener('click', () => {
      closePopup(loginPopup); // Close the login popup
    });
  }

  // Close login popup when clicking outside
  if (loginPopup) {
    loginPopup.addEventListener('click', (event) => {
      if (event.target === loginPopup) {
        closePopup(loginPopup);
      }
    });
  }

  // Prevent closing the login popup when clicking inside the popup content
  const loginBox = document.querySelector('.login-box');
  if (loginBox) {
    loginBox.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the event from bubbling up
    });
  }

  // Switch from login popup to signup popup
  if (openSignupFromLoginButton) {
    openSignupFromLoginButton.addEventListener('click', (event) => {
      event.preventDefault();
      closePopup(loginPopup); // Close login popup
      openPopup(signupPopup); // Open signup popup
    });
  }
});
