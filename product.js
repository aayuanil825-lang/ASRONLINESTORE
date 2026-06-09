document.addEventListener("DOMContentLoaded", () => {
    // 1. Elements ko select karna
    const productNameElement = document.querySelector(".product-order-spec h1") || document.querySelector("h1");
    const finalBuyBtn = document.querySelector(".buy-now-page-btn");

    const orderModal = document.getElementById("order-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const orderProductInput = document.getElementById("order-product");
    const orderForm = document.getElementById("order-form");

    // 2. "Buy Now ⚡" Click karne par popup kholna
    if (finalBuyBtn) {
        finalBuyBtn.addEventListener("click", () => {
            const productName = productNameElement ? productNameElement.textContent.trim() : "Selected Product";
            if (orderProductInput) {
                orderProductInput.value = productName;
            }
            if (orderModal) {
                orderModal.style.display = "flex";
            }
        });
    } else {
        console.log("⚠️ Error: HTML me '.buy-now-page-btn' class nahi mili. Please button par yeh class lagayein.");
    }

    // 3. Popup band karna
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            orderModal.style.display = "none";
        });
    }

    // 4. EmailJS Order Submit Logic
    if (orderForm) {
        orderForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Page ko reload hone se rokne ke liye

            const serviceID = "service_6zm3x14"; // Aapki verified service ID
            const templateID = "template_vp8dd6a"; // ⚠️ APNI REAL TEMPLATE ID YAHAN DAALEIN

            console.log("Email bhejna start ho raha hai...");

            emailjs.sendForm(serviceID, templateID, orderForm)
                .then(() => {
                    alert('🚀 Order Successful! Details aapke email par bhej di gayi hain.');
                    orderForm.reset();
                    if (orderModal) {
                        orderModal.style.display = "none"; // Popup band ho jayega
                    }
                }, (error) => {
                    alert('❌ Order failed... Meharbani karke console check karein.');
                    console.error("EmailJS Error Details:", error);
                });
        });
    } else {
        console.log("⚠️ Error: HTML me id='order-form' nahi mila.");
    }
});