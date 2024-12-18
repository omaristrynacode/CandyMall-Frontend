document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            console.log("Hamburger menu toggled");
        });
    } else {
        console.log("Error: Hamburger or nav-links not found");
    }
});



const images = ["assets/image_d18fffa9.png", "assets/image_746a17d6.png", "assets/image_b72a206d.png"];
let points = 0;

document.addEventListener("DOMContentLoaded", () => {
  // Add event listener to the play button
  const playButton = document.querySelector(".play-button");
  playButton.addEventListener("click", playGame);
});

function playGame() {
  console.log("Play button pressed"); // Debugging log
  const playButton = document.querySelector(".play-button");
  playButton.disabled = true; // Disable button to prevent multiple spins

  // Start spinning each slot with smooth slowdown
  smoothSpin("slot1", 1000);
  smoothSpin("slot2", 1500);
  smoothSpin("slot3", 2000, () => {
    checkWin(); // Check for a winning combination after the spinning stops
    playButton.disabled = false; // Re-enable button after spin completes
  });
}

function smoothSpin(slotId, duration, callback) {
  const slot = document.getElementById(slotId);
  let intervalTime = 100; // Start with a fast spin
  const maxInterval = 250; // Maximum interval to slow down
  let timeElapsed = 0;

  slot.classList.add("spin-animation"); // Add spin animation

  const spinInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    slot.src = images[randomIndex]; // Dynamically set the image source
    console.log(`Setting ${slotId} to image: ${images[randomIndex]}`); // Debugging log

    timeElapsed += intervalTime;

    // Gradually slow down the spinning
    if (timeElapsed >= duration) {
      clearInterval(spinInterval); // Stop spinning
      slot.classList.remove("spin-animation"); // Remove spin animation
      if (callback) callback(); // Execute callback when spin stops
    } else {
      intervalTime = Math.min(intervalTime + 10, maxInterval); // Smooth slowdown effect
    }
  }, intervalTime);
}



function checkWin() {
  const slot1 = document.getElementById("slot1").src;
  const slot2 = document.getElementById("slot2").src;
  const slot3 = document.getElementById("slot3").src;

  if (slot1 === slot2 && slot2 === slot3) {
    points += 50;
    updatePoints();
  }
}

// function updatePoints() {
//   const pointsDisplay = document.getElementById("points-value");
//   pointsDisplay.textContent = points;
//   animatePoints();
// }
function updatePoints() {
  const pointsDisplays = document.querySelectorAll("#points-value"); // Get all points-value elements
  pointsDisplays.forEach((pointsDisplay) => {
    pointsDisplay.textContent = points; // Update all instances of points-value
  });
  animatePoints();
}


function animatePoints() {
  const pointsDisplay = document.querySelector(".points-display");
  pointsDisplay.classList.add("increase"); // Apply animation class
  setTimeout(() => pointsDisplay.classList.remove("increase"), 500); // Remove class after animation
}

/* Mobile Layout Functions */
function playGameMobile() {
  console.log("Mobile Play button pressed");
  const playButtonMobile = document.querySelector(".play-button-mobile");
  playButtonMobile.disabled = true; // Disable the mobile play button during the spin

  smoothSpinMobile("slot1-mobile", 1000);
  smoothSpinMobile("slot2-mobile", 1500);
  smoothSpinMobile("slot3-mobile", 2000, () => {
    checkWinMobile(); // Use the same checkWin function for both layouts
    playButtonMobile.disabled = false; // Re-enable button after spin completes
  });
}


function smoothSpinMobile(slotId, duration, callback) {
  const slot = document.getElementById(slotId);
  let intervalTime = 100;
  const maxInterval = 250;
  let timeElapsed = 0;

  slot.classList.add("spin-animation");

  const spinInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    slot.src = images[randomIndex];
    console.log(`Setting ${slotId} to image: ${images[randomIndex]}`);

    timeElapsed += intervalTime;

    if (timeElapsed >= duration) {
      clearInterval(spinInterval);
      slot.classList.remove("spin-animation");
      if (callback) callback();
    } else {
      intervalTime = Math.min(intervalTime + 10, maxInterval);
    }
  }, intervalTime);
}

function checkWinMobile() {
  const slot1 = document.getElementById("slot1-mobile").src;
  const slot2 = document.getElementById("slot2-mobile").src;
  const slot3 = document.getElementById("slot3-mobile").src;

  if (slot1 === slot2 && slot2 === slot3) {
    points += 10;
    updatePointsMobile();
  }
}

function updatePointsMobile() {
  updatePoints(); // Use the same updatePoints function
}
function animatePointsMobile() {
  animatePoints(); // Use the same animatePoints function
}









$(document).ready(function () {
  const $track = $('.carousel-track');
  const $slides = $('.carousel-slide');
  const $prevButton = $('.prev');
  const $nextButton = $('.next');
  const $productName = $('.product-details h1');
  const $mgSpan = $('#mg');
  const $ozSpan = $('#oz');
  const $mlSpan = $('#ml');
  const slideWidth = $slides.outerWidth(true);
  const containerWidth = $('.carousel-container').width();

  let currentIndex = 4;

  const moveToSlide = (targetIndex) => {
    const amountToMove = -((slideWidth * targetIndex) - (containerWidth - slideWidth) / 2);
    $track.css('transform', `translateX(${amountToMove}px)`);
    $slides.removeClass('active');
    $($slides[targetIndex]).addClass('active');

   
    const $currentSlide = $($slides[targetIndex]);
    const name = $currentSlide.data('name');
    const cbd = $currentSlide.data('cbd');
    const oz = $currentSlide.data('oz');
    const ml = $currentSlide.data('ml');


    $productName.text(name);
    $mgSpan.text(cbd);
    $ozSpan.text(oz);
    $mlSpan.text(ml);
  };
    const quantityValue = document.querySelector(".quantity-value");

  $prevButton.click(() => {
    currentIndex = (currentIndex - 1 + $slides.length) % $slides.length;
    moveToSlide(currentIndex);
    quantityValue.textContent = 1;

  });

  $nextButton.click(() => {
    currentIndex = (currentIndex + 1) % $slides.length;
    moveToSlide(currentIndex);
    quantityValue.textContent = 1;

  });

  moveToSlide(currentIndex); 
});

  document.addEventListener("DOMContentLoaded", () => {
    const brandsContainer = document.querySelector(".brands-container");
    const leftBtn = document.querySelector(".left-btn i");
    const rightBtn = document.querySelector(".right-btn i");
  
    const scrollStep = brandsContainer.clientWidth / 2; 
  
    leftBtn.addEventListener("click", () => {
      brandsContainer.scrollBy({
        left: -scrollStep,
        behavior: "smooth",
      });
    });
  
    rightBtn.addEventListener("click", () => {
      brandsContainer.scrollBy({
        left: scrollStep,
        behavior: "smooth",
      });
    });
   
  });
  document.addEventListener("DOMContentLoaded", () => {
    const decrementBtn = document.querySelector(".decrement");
    const incrementBtn = document.querySelector(".increment");
    const quantityValue = document.querySelector(".quantity-value");
    const mgSpan = document.getElementById("mg");
    const ozSpan = document.getElementById("oz");
    const mlSpan = document.getElementById("ml");
  
    const updateWeights = (quantity) => {
      // Get the data from the currently active carousel slide
      const activeSlide = document.querySelector('.carousel-slide.active');
      const baseMg = activeSlide.getAttribute('data-cbd'); // CBD content from the active slide
      const baseOz = activeSlide.getAttribute('data-oz');   // FL OZ from the active slide
      const baseMl = activeSlide.getAttribute('data-ml');   // ML from the active slide
  
      // Update the displayed values
      mgSpan.textContent = baseMg * quantity;
      ozSpan.textContent = baseOz * quantity;
      mlSpan.textContent = baseMl * quantity;
    };
  
    // Increment and Decrement button functionality
    decrementBtn.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityValue.textContent, 10);
      if (currentQuantity > 1) {
        currentQuantity--;
        quantityValue.textContent = currentQuantity;
        updateWeights(currentQuantity);
      }
    });
  
    incrementBtn.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityValue.textContent, 10);
      currentQuantity++;
      quantityValue.textContent = currentQuantity;
      updateWeights(currentQuantity);
    });
  
    // Initialize the weights based on the initial quantity (1)
    updateWeights(parseInt(quantityValue.textContent, 10));
  });
    
  



  $(document).ready(function () {
    let itemsData = {}; // Stores JSON data
    let currentCategory = "chocolate"; // Default to chocolate
    let currentIndex = 0;
    let currentCount = 0;
    let maxLimit = 5;
    let totalPrice = 0;

    // Load items data from JSON file
    $.getJSON("items.json", function (data) {
        itemsData = data.products;
        
        // Check if chocolate category exists and display the first item by default
        if (itemsData[currentCategory]) {
            displayItem(currentCategory, currentIndex);
            $(".gift-button-list button").each(function () {
                if ($(this).find(".white-box-heading-g").text().toLowerCase() === "chocolate") {
                    $(this).css("background", "#87e432");
                }
            });
        }
    });

    // Size selection functionality
    $(".purple-box-g").click(function () {
        maxLimit = $(this).data("max");
        updateCartSummary();
    });

    // Display current item based on category and index
    function displayItem(category, index) {
        const item = itemsData[category][index];
        if (item) {
            $("#product-image").attr("src", item.picture);
            $(".pricing-container .price-tag-text").text(`${item.price} $`);
        }
    }

    // Handle category selection without auto-adding first item
    $(".gift-button-list button").click(function () {
        const category = $(this).find(".white-box-heading-g").text().toLowerCase();
        $(".gift-button-list .btn").css("background", "#B6BBB1");
        $(this).css("background", "#87e432");

        if (itemsData[category]) {
            currentCategory = category;
            currentIndex = 0;
            displayItem(currentCategory, currentIndex);
        }
    });

    // Navigate through items within a selected category
    $("#prev-item").click(function () {
        if (currentCategory && currentIndex > 0) {
            currentIndex--;
            displayItem(currentCategory, currentIndex);
        }
    });

    $("#next-item").click(function () {
        if (currentCategory && currentIndex < itemsData[currentCategory].length - 1) {
            currentIndex++;
            displayItem(currentCategory, currentIndex);
        }
    });
    $(".purple-box-g").click(function () {
        $(".purple-box-g").removeClass("active"); 
        $(this).addClass("active"); 
    });
    $(".pricing-container .button-add-container button").click(function () {
      
      if (currentCount < maxLimit && currentCategory && itemsData[currentCategory][currentIndex]) {
          const item = itemsData[currentCategory][currentIndex];
         
          
          totalPrice += item.price;
  
          if (currentCategory === "box") {
              // Change the image inside .inside-box to the box image
              $(".inside-box").css("background", `url(${item.picture}) center / cover no-repeat`);
              // Hide the .outside-box image
              $(".outside-box").css("display", "none");
          } else {
            currentCount++;
            
              // Generate random top and left values within the box
              const randomTop = Math.floor(Math.random() * 45) + 5; // Random top position (5% to 50%)
              const randomLeft = Math.floor(Math.random() * 80) + 10; // Random left position (10% to 90%)
  
              // Append the image with random position
              $(".inside-box .images").append(`
                  <img src="${item.picture}" class="gifting-item-image" style="top: ${randomTop}%; left: ${randomLeft}%;"/>
              `);
          }
  
          updateCartSummary();
          updateTotalPrice(); 
      } else if (currentCount >= maxLimit) {
          if (currentCategory === "box"){
            const item = itemsData[currentCategory][currentIndex];
            $(".inside-box").css("background", `url(${item.picture}) center / cover no-repeat`);
            $(".outside-box").css("display", "none");
          }
          else{
          showPopupMessage(`The maximum number of items for this box is ${maxLimit}.`);

          }
      }
  });

    // Update the cart summary display
    function updateCartSummary() {
        $(".warp-text-css").text(`${currentCount}/${maxLimit}`);
    }

    // Update the total price display
    function updateTotalPrice() {
        $("#total-price-text").text(`${totalPrice.toFixed(2)} $`);
    }

    $("#add-to-cart-btn").click(function () {
        console.log("Add to Cart clicked, currentCount:", currentCount); // Debugging log
        if (currentCount === 0) {
            showPopupMessage(`Please fill your gift first`);
        } else {
            showPopupMessage(`Added to cart! `);
            currentCount = 0;
            totalPrice = 0;
            $(".inside-box .images").empty();
            updateCartSummary();
            updateTotalPrice();
        }
    });

    function showPopupMessage(message) {
        $("#popup-text").text(message); // Set the message text
         // Show the popup
         $("#popup-message").addClass('show');

        // Automatically hide the popup after 3 seconds
        setTimeout(() => {
            $("#popup-message").removeClass('show');
        }, 1000); // 3000ms = 3 seconds

    }

    $("#submit-product-button").click(function()
    {
      
        showPopupMessage("Letter submitted");
        $('#popup').fadeOut(); // Use fadeOut for a smooth disappearance
    });

   
    $('#openPopupButton').click(function () {
        $('#popup').fadeIn(); // Use fadeIn for a smooth appearance
      });
    
      // Close popup when the close button is clicked
      $('#closePopupButton').click(function () {
        $('#popup').fadeOut(); // Use fadeOut for a smooth disappearance
      });
    
      // Optional: Close the popup if the user clicks outside the popup content
      $(document).click(function (event) {
        if (!$(event.target).closest('.popup-content, #openPopupButton').length) {
          $('#popup').fadeOut();
        }
      });
      
      
});




document.addEventListener('DOMContentLoaded', () => {
  const reviewContainer = document.querySelector('.review-container');

  let isDragging = false;
  let startX;
  let scrollLeft;

  // Prevent default behavior of text selection
  const preventScrollHighlight = (e) => e.preventDefault();

  // Mouse down event
  reviewContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    reviewContainer.classList.add('dragging');
    startX = e.pageX - reviewContainer.offsetLeft;
    scrollLeft = reviewContainer.scrollLeft;

    // Prevent text selection while dragging
    reviewContainer.addEventListener('selectstart', preventScrollHighlight);
  });

  // Mouse up event
  const stopDragging = () => {
    if (isDragging) {
      isDragging = false;
      reviewContainer.classList.remove('dragging');
      reviewContainer.removeEventListener('selectstart', preventScrollHighlight);
    }
  };

  reviewContainer.addEventListener('mouseup', stopDragging);
  reviewContainer.addEventListener('mouseleave', stopDragging);

  // Mouse move event
  reviewContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - reviewContainer.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust the multiplier for smoother scrolling
    reviewContainer.scrollLeft = scrollLeft - walk;
  });
});





















document.addEventListener('DOMContentLoaded', () => {
  const isSignupPage = document.getElementById('popup') !== null; // Check if "Create Account" popup exists
  const isLoginPage = document.getElementById('loginPopup') !== null; // Check if "Log In" popup exists
  const loginPopup = document.getElementById('loginPopup'); // Login popup element
  const signupPopup = document.getElementById('popup'); // "Create Account" popup

  // Shared Functions
  const openPopup = (popupElement) => {
    if (popupElement) {
      popupElement.classList.add('active');
    }
  };

  const closePopup = (popupElement) => {
    if (popupElement) {
      popupElement.classList.remove('active');
    }
  };

  // Logic for Signup Page
  if (isSignupPage) {
    const openSignupBtn = document.getElementById('openPopupBtn'); // Button to open "Create Account" popup
    const closeSignupBtn = document.getElementById('closePopup'); // Button to close "Create Account" popup
    const signupForm = document.getElementById('createAccountForm'); // "Create Account" form
    const phoneInput = document.getElementById('phone'); // Phone input field
    const goToLoginBtn = document.querySelector('.go-to-login'); // "Log in" link

    // Automatically format phone number
    phoneInput.addEventListener('input', () => {
      let value = phoneInput.value.replace(/\D/g, ''); // Remove all non-digit characters
      if (value.length > 2) value = value.slice(0, 2) + ' ' + value.slice(2);
      if (value.length > 6) value = value.slice(0, 6) + ' ' + value.slice(6);
      phoneInput.value = value.slice(0, 10); // Limit to 10 characters
    });

    // Open "Create Account" popup
    openSignupBtn.addEventListener('click', () => openPopup(signupPopup));

    // Close "Create Account" popup
    closeSignupBtn.addEventListener('click', () => closePopup(signupPopup));

    // Close popup when clicking outside
    signupPopup.addEventListener('click', (event) => {
      if (event.target === signupPopup) {
        closePopup(signupPopup);
      }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && signupPopup.classList.contains('active')) {
        closePopup(signupPopup);
      }
    });

    // Redirect to `login.html` when clicking "Log in" link
    if (goToLoginBtn) {
      goToLoginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        closePopup(signupPopup); // Close the signup popup
        loginPopup ? openPopup(loginPopup) : (window.location.href = 'login.html?openLoginPopup=true'); // Open login popup or redirect
      });
    }

    // Handle Signup Form Submission
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent form submission for validation

      // Get form values
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const birthdate = document.getElementById('birthdate').value;
      const password = document.getElementById('password').value;
      const termsChecked = document.getElementById('terms').checked;

      // Validation checks
      if (!firstName || !lastName) {
        alert('Please enter your first and last name.');
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Check if email already exists
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

      // Save form data
      const formData = { firstName, lastName, phone, email, birthdate, password };
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Account created successfully!');
      signupForm.reset(); // Reset the form fields
      closePopup(signupPopup); // Close "Create Account" popup
      window.location.href = 'login.html?openLoginPopup=true'; // Redirect to login.html with query parameter
    });
  }

  // Logic for Login Page
  if (isLoginPage) {
    const closeLoginPopupBtn = document.getElementById('closePopup'); // Button to close the login popup
    const loginForm = document.getElementById('loginForm'); // Login form

    // Parse query parameters
    const params = new URLSearchParams(window.location.search);
    if (params.get('openLoginPopup') === 'true') {
      openPopup(loginPopup); // Open the login popup
    }

    // Close login popup
    closeLoginPopupBtn.addEventListener('click', () => closePopup(loginPopup));

    // Close popup when clicking outside the popup box
    loginPopup.addEventListener('click', (event) => {
      if (event.target === loginPopup) {
        closePopup(loginPopup);
      }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && loginPopup.classList.contains('active')) {
        closePopup(loginPopup);
      }
    });

    // Handle Login Form Submission
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      const users = JSON.parse(localStorage.getItem('users')) || [];

      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect to homepage
      } else {
        alert('Invalid email or password.');
      }
    });
  }
});
