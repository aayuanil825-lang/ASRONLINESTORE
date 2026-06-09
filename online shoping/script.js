document.addEventListener("DOMContentLoaded", () => {
    const cartCountElement = document.querySelector(".cart-count");
    const homeBuyButtons = document.querySelectorAll(".btn-cart");
    const orderProductInput = document.getElementById("order-product");
    const orderForm = document.getElementById("order-form");
    
    // Popup Modal Elements
    const orderModal = document.getElementById("order-modal");
    const closeModalBtn = document.getElementById("close-modal");

    let currentCartCount = 0;

    // Function: Jab koi Buy Now dabaye toh popup khule
    function openOrderPopup(productName) {
        currentCartCount++;
        cartCountElement.textContent = currentCartCount;
        
        // Form field me automatic product name bharna
        if (orderProductInput) {
            orderProductInput.value = productName;
        }

        // Popup ko screen par show karna
        if (orderModal) {
            orderModal.style.display = "flex";
        }
    }

    // Har product ke button par click listener lagana
    homeBuyButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productCard = event.target.closest(".product-card");
            const productName = productCard.querySelector("h3").textContent;
            openOrderPopup(productName);
        });
    });

    // Popup ko band karne ka tarika (X button daba kar)
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            orderModal.style.display = "none";
        });
    }

    // EmailJS Order Submission Logic
    if (orderForm) {
        orderForm.addEventListener("submit", (event) => {
            event.preventDefault(); 

            const serviceID = "service_6zm3x14"; // Aapki verified service id
            const templateID = "template_vp8dd6a"; // ⚠️ YAHAN APNI TEMPLATE ID DAALEIN

            emailjs.sendForm(serviceID, templateID, orderForm)
                .then(() => {
                    alert('🚀 Order Successful! Details aapke email par bhej di gayi hain.');
                    orderForm.reset();
                    if (orderModal) {
                        orderModal.style.display = "none"; // Order hote hi popup automatic band
                    }
                    cartCountElement.textContent = 0;
                    currentCartCount = 0;
                }, (error) => {
                    alert('❌ Order failed... Meharbani karke console check karein.');
                    console.log("EmailJS Error details:", error);
                });
        });
    }

    // Search and Filter Logic (Aapka purana code)
    const searchInput = document.getElementById("product-search");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productCards = document.querySelectorAll(".product-card");

    if(searchInput) {
        searchInput.addEventListener("input", (e) => {
            const searchText = e.target.value.toLowerCase();
            productCards.forEach(card => {
                const productName = card.querySelector("h3").textContent.toLowerCase();
                card.style.display = productName.includes(searchText) ? "block" : "none";
            });
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            const filterValue = e.target.getAttribute("data-filter");
            productCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                card.style.display = (filterValue === "all" || filterValue === cardCategory) ? "block" : "none";
            });
        });
    });
});