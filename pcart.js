 // 1. Image Swap Logic
        const mainImg = document.querySelector('.proimg');
        const thumbnailLinks = document.querySelectorAll('.col-auto a');
        thumbnailLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); 
                const clickedImg = this.querySelector('img');
                mainImg.src = clickedImg.src;
            });
        });

        // 2. Add to Cart Logic
        const addToCartBtn = document.querySelector('.A2cart');
        if(addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                const productImage = document.querySelector('.proimg').src;
                const productName = document.querySelector('h2').innerText; 
                const productPriceStr = document.querySelector('h3').innerText; 
                const productPrice = parseFloat(productPriceStr.replace('$', '')); 
                const quantity = document.querySelector('input[type="number"]').value;
                
                let selectedSize = 'M'; 
                const sizeInput = document.querySelector('input[name="size"]:checked');
                if(sizeInput) selectedSize = sizeInput.parentElement.innerText.trim();

                const product = {
                    id: Date.now(),
                    name: productName,
                    image: productImage,
                    price: productPrice,
                    size: selectedSize,
                    quantity: parseInt(quantity)
                };

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));

                alert('Product added to cart!');
                updateCartCount(); // Update badge immediately
            });
        }

        // 3. GLOBAL: Update Badge Count
        function updateCartCount() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const badges = document.querySelectorAll('.cart-badge');
            badges.forEach(badge => {
                badge.innerText = cart.length;
            });
        }
        
        // Run on page load
        updateCartCount();