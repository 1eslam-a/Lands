// متغيرات المودال (النافذة المنبثقة)
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");

// وظيفة لعرض البيانات
function renderCrops(crops) {
    const gridContainer = document.querySelector(".grid-container");

    // إنشاء كارت لكل محصول
    crops.forEach((crop) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-title", crop.title);
        card.setAttribute("data-desc", crop.description);

        const img = document.createElement("img");
        img.src = crop.image_url;
        img.alt = crop.title;

        card.appendChild(img);
        gridContainer.appendChild(card);

        // إضافة حدث "click" لكل كارت
        card.addEventListener("click", () => {
            modalImg.src = img.src;
            modalTitle.textContent = card.getAttribute("data-title");
            modalDesc.textContent = card.getAttribute("data-desc");
            modal.style.display = "flex";
        });
    });
}

// جلب البيانات من الخادم
fetch("http://localhost:3000/api/crops")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        renderCrops(data);
    })
    .catch((error) => console.error("Error fetching data:", error));

// إضافة أحداث إغلاق المودال
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});