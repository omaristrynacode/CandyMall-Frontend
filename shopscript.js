$(document).ready(function () {
    const $listContainer = $('.list_cards');
    let productsData = {};

    // Fetch and display products
    $.getJSON('items.json', function (data) {
        productsData = data.products; // Store data for filtering
        displayProducts('ALL'); // Display all products by default
        $('.button-list .btn:first-child').css('background', '#87e432');
    }).fail(function () {
        console.error('Error loading JSON file.');
    });

    // Function to display products based on category and search term
    function displayProducts(category, searchTerm = '') {
        $listContainer.empty(); // Clear existing products
        let productsToShow = [];

        if (category === 'ALL') {
            Object.keys(productsData).forEach(cat => {
                if (cat.toLowerCase() !== 'box') { // Exclude 'box' category
                    productsToShow = productsToShow.concat(productsData[cat]);
                }
            });
            productsToShow.sort(() => 0.5 - Math.random()); // Randomize order
        } else {
            productsToShow = productsData[category.toLowerCase()];
        }

        // Filter products based on the search term
        if (searchTerm) {
            productsToShow = productsToShow.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Generate HTML for each product and append to the container
        productsToShow.forEach(product => {
            const cardHTML = `
                <div class="full-card">
    <div class="candy-product-card">
        <!-- Star Icon -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="favorite-icon"
            viewBox="0 0 24 24"
            fill="#F1E4FF"
        
        >
            <path
                d="M12 .587l3.668 7.431 8.2 1.191-5.93 5.788 1.4 8.184L12 18.897l-7.338 3.852 1.4-8.184L.132 9.209l8.2-1.191L12 .587z"
            />
        </svg>
        <img src="${product.picture}" alt="${product.name}" class="product-image-container" />
        <div class="mms-price-container">
            <p class="candy-title-text-style">${product.name}</p>
            <p class="mm-price-label">${product.price}$</p>
        </div>
    </div>
    <div class="quantity-container">
        <div class="quantity-controls">
            <div class="control-increment"><p class="control-text">+</p></div>
            <div class="control-count">
                <p class="control-quantity">1</p>
                <div class="control-decrement"><p class="control-text">-</p></div>
            </div>
        </div>
        <div class="add-to-cart-container">
            <button class="add-to-cart-button btn btn--action" style="display: flex; justify-content: center; align-items: center; padding-top: 30px;">
                <p class="white-box-heading add-to-cart-title">ADD TO CART</p>
            </button>
        </div>
    </div>
</div>

            `;
            $listContainer.append(cardHTML);
        });

        // Initialize quantity counter functionality for newly added products
        initializeQuantityCounters();
        $(".favorite-icon").on("click", function () {
            console.log("hello")
            // Toggle the color between #F1E4FF and #87E432
            const currentFill = $(this).attr("fill");
            const newFill = currentFill === "#87E432" ? "#F1E4FF" : "#87E432";
            $(this).attr("fill", newFill);
        });
        
    }

    // Initialize quantity counters
    function initializeQuantityCounters() {
        $('.control-increment').off('click').on('click', function () {
            const $quantityElement = $(this).siblings('.control-count').find('.control-quantity');
            let currentQuantity = parseInt($quantityElement.text());
            $quantityElement.text(currentQuantity + 1); // Increase count
        });

        $('.control-decrement').off('click').on('click', function () {
            const $quantityElement = $(this).closest('.quantity-controls').find('.control-quantity');
            let currentQuantity = parseInt($quantityElement.text());
            if (currentQuantity > 1) { // Prevent negative or zero quantity
                $quantityElement.text(currentQuantity - 1); // Decrease count
            }
        });
    }

  
    // Category button click event
    $('.button-list .btn').on('click', function () {
        const selectedCategory = $(this).find('.white-box-heading').text();
        $('.button-list .btn').css('background', ''); // Reset background of all buttons
        $(this).css('background', '#87e432'); // Highlight selected button
        displayProducts(selectedCategory); // Display products in the selected category
    });

    // Search input event
    $('.search').on('input', function () {
        const searchTerm = $(this).val();
        displayProducts('ALL', searchTerm); // Display filtered products based on search term
    });
});
