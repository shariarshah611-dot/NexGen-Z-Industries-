// 1. Smooth Scrolling for Navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });

        // Update active class
        document.querySelectorAll('.nav-links a').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
 
        // Mobile Scroll View centering
        this.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
});

// 2. Active Link Highlight on Scroll
window.addEventListener('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll("section, header");
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    document.querySelectorAll(".nav-links a").forEach((li) => {
        li.classList.remove("active");
        if (li.getAttribute("href").includes(current)) {
            li.classList.add("active");
        }
    });
});

// 3. Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
        nav.style.height = "60px";
    } else {
        nav.style.boxShadow = "none";
        nav.style.height = "70px";
    }
});



let currentProduct = { title: "", price: "", img: "" };

// ১. Product Card-e click korle Popup dekhabe
function showDetails(title, price, img) {
    currentProduct = { title, price, img };
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-price').innerText = price;
    document.getElementById('modal-img-src').src = img;
    
    document.getElementById('product-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// ২. Buy Now click korle Form dekhabe
function showForm() {
    document.getElementById('product-modal').style.display = 'none';
    document.getElementById('order-form').style.display = 'block';
    document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' });
}

function closeForm() {
    document.getElementById('order-form').style.display = 'none';
}

// ৩. WhatsApp-e Order Submit kora
document.getElementById('whatsapp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('cust-name').value;
    const address = document.getElementById('cust-address').value;
    const phone = document.getElementById('cust-phone').value;
    const qty = parseInt(document.getElementById('prod-qty').value); // সংখ্যায় রূপান্তর
    const price = parseFloat(currentProduct.price); // সংখ্যায় রূপান্তর
    const payment = document.querySelector('input[name="payment"]:checked').value;
    
    // মোট দাম হিসাব করা
    const totalPrice = qty * price;
    
    const whatsappNumber = "8801302133194";
    
    const text = `*--- NEW ORDER: NEXGEN-Z ---*%0A` +
                 `*Product:* ${currentProduct.title}%0A` +
                 `*Quantity:* ${qty}%0A` +
                 `*Unit Price:* $${price}%0A` +
                 `*Total Price:* $${totalPrice}%0A` + // এখানে মোট দাম দেখানো হচ্ছে
                 `---------------------------%0A` +
                 `*Customer:* ${name}%0A` +
                 `*Address:* ${address}%0A` +
                 `*Phone:* ${phone}%0A` +
                 `*Payment:* ${payment}`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
});


function toggleSearch() {
    const input = document.getElementById('searchInput');
    input.classList.toggle('active-input');
    if(input.classList.contains('active-input')) {
        input.focus();
    }
}

