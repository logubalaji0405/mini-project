// --- 1. CART COUNT LOGIC ---
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.innerText = cart.length;
    });
}
updateCartCount();

// --- 2. SEARCH & FILTER LOGIC ---
const searchInput = document.getElementById('navSearchInput');
const searchBtn = document.getElementById('navSearchBtn');
const noResultsDiv = document.getElementById('noResults');

// This function acts as the "Engine"
function performFiltering(filter) {
    const isShopPage = window.location.pathname.includes('shop.html');
    const cleanFilter = filter.trim().toLowerCase();
    const isSearching = cleanFilter.length > 0;

    // A. If we are NOT on the shop page, redirect to the shop page with the query
    if (!isShopPage && isSearching) {
        window.location.href = `shop.html?search=${encodeURIComponent(cleanFilter)}`;
        return;
    }

    // B. If we ARE on the shop page, filter items live
    if (isShopPage) {
        const productColumns = document.querySelectorAll('section .col-12, .section-p1 .row > div');
        const distractions = document.querySelectorAll('#demo, .smensbaner, .swomensbaner, .skidsbaner, .homebaner, .dimg, .bgad, .h1');
        
        let foundMatch = false;

        // Toggle banners/carousel
        distractions.forEach(el => el.style.display = isSearching ? 'none' : 'block');

        // Filter products
        productColumns.forEach(column => {
            const titleElement = column.querySelector('.card-title, h4');
            if (titleElement) {
                const titleText = titleElement.innerText.toLowerCase();
                if (!isSearching || titleText.includes(cleanFilter)) {
                    column.style.display = ""; 
                    foundMatch = true;
                    
                } else {
                    column.style.display = "none";
                }
            }
        });

        // Toggle "No Results" message
        if (noResultsDiv) {
            noResultsDiv.style.display = (isSearching && !foundMatch) ? "block" : "none";
        }
    }
}

// --- 3. EVENT LISTENERS ---

// Click Search Icon
searchBtn.addEventListener('click', () => performFiltering(searchInput.value));

// Press Enter Key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performFiltering(searchInput.value);
});

// Live Search (Filters as you type)
searchInput.addEventListener('keyup', () => {
    // Only do live search if already on the shop page
    if (window.location.pathname.includes('shop.html')) {
        performFiltering(searchInput.value);
    }
});

// Handle URL parameters when page loads
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (searchQuery) {
        searchInput.value = searchQuery;
        performFiltering(searchQuery);
    }
});

// Helper to reset search
function clearSearch() {
    searchInput.value = "";
    performFiltering("");
    // If we want to clean the URL too:
    window.history.replaceState({}, document.title, window.location.pathname);
}