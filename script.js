const shoppingIcon = document.getElementById("shoppingIcon");
const shoppingCard = document.querySelector(".shoppingCard")
const sideBar = document.getElementById("sideBar");
const close = document.getElementById("close-btn")

const cartContentsDiv = document.getElementById('cartContents')

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

const openSideBar = () => {

    document.getElementById("sideBar").style.right = "0"


    const cartContents = getData('cart');
    const cartTotal = cartContents.reduce((a, item) => a + item.product.price * item.quantity, 0);

    document.getElementById('cartTotal').textContent = cartTotal;

    cartContentsDiv.innerHTML = '';
    cartContents.forEach(item => {
        const card = document.createElement("div");

        card.innerHTML = `
        <div class="cardImage"> 
        ${item.quantity}   //bu
        <img src=${item.product.image}>    
        <button class="btnView">Quick View</button>
        </div>
        <div class="cardBody">
        <a class="cardTitle">${item.product.title}</a>    
        <div class="heart">
        <i class="fa-regular fa-heart"></i>
        <i class="fa-solid fa-heart"></i>
        </div>
        </div>
        <span>$ ${item.product.price}</span>   
        `;

        card.classList.add('card');

        cartContentsDiv.appendChild(card);
    });
}

const closeSideBar = () => {
    document.getElementById("sideBar").style.right = "-450px"
}

close.addEventListener("click", closeSideBar)
shoppingIcon.addEventListener("click", openSideBar)


document.getElementById('shoppingIcon').addEventListener('click', function () {
    document.getElementById('sideBar').classList.toggle('active');
});
document.getElementById('close-btn').addEventListener('click', function () {
    document.getElementById('sideBar').classList.remove('active');
});




const cards = document.getElementById("cards");
const box = document.querySelector(".box");


let products = [];


function addToCard(id) {
    const product = products.find(p => p.id == id);

    const cartContents = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cartContents.find(p => p.product.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cartContents.push({
            product: product,
            quantity: 1,
        });
    }

    setData('cart', cartContents);
}


fetch('http://localhost:3005/product')
    .then(res => res.json())
    .then(data => {
        products = data; 
        data.forEach(item => {
            const card = document.createElement("div");

            card.innerHTML = `
            <div class="cardImage"> 
            <img src=${item.image}>
            <button class="btnView">Quick View</button>
            </div>
            <div class="cardBody">
            <a class="cardTitle">${item.title}</a>
            <div class="heart">
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-heart"></i>
            </div>
            </div>
            <span>$ ${item.price}</span>
            `;

            card.classList.add('card');
            cards.appendChild(card);

            card.addEventListener('click', () => {
                box.innerHTML = ''; 
                box.style.display = "block"; 

                const detailDiv = document.createElement("div");
                detailDiv.innerHTML = `
                <h2>${item.title}</h2>
                <p>$ ${item.price}</p>
                `;



                const selectedCard = document.createElement("div");

                selectedCard.innerHTML = `
                <button class="closeMark"><i class="fa-solid fa-xmark"></i></button>
                <!-- ---- add to cart -->
                <button class="add-to-cart" onclick="addToCard(${item.id})">Add to cart</button>
                
                <img style ="width:400px; height:460px "src=${item.image}>
                
                
        
                
                `;


                selectedCard.appendChild(detailDiv);
                detailDiv.classList.add("detailDiv")
                selectedCard.classList.add("selectedCard");
                box.appendChild(selectedCard);



                const closeMark = selectedCard.querySelector(".closeMark");
                closeMark.addEventListener('click', () => {
                    box.style.display = "none";
                });
            });
        });

    })
    .catch(error => console.error('ERROR!!!:', error));



const closeModal = document.querySelector('.closeMark');


function openModal(item) {
    box.innerHTML = `
            <button class="closeMark"><i class="fa-solid fa-xmark"></i></button>
            <img src=${item.image} alt="Product Image">
            <h2>${item.title}</h2>
            <p>$ ${item.price}</p>
        `;
    box.style.display = 'block';


    box.querySelector('.closeMark').addEventListener('click', function () {
        box.style.display = 'none';
    });
}


cards.forEach(card => {
    card.addEventListener('click', function () {
        const item = {
            image: card.querySelector('img').src,
            title: card.querySelector('.cardTitle').textContent,
            HTML,
            price: card.querySelector('span').textContent
        };

        openModal(item);
    });
});


window.addEventListener('click', function (event) {
    if (event.target === box) {
        box.style.display = 'none';
    }
});




//--------------------------------loadmore--------------

$(document).ready(function () {
    $("item.image").slice(0, 4).show();
    $("#loadMore").on("click", function (e) {
        e.preventDefault();
        $("item.image:hidden").slice(0, 4).slideDown();
        if ($("item.image:hidden").length == 0) {
            $("#loadMore").text("No Content").addClass("noContent");
        }
    });

})




















//slide

const sliderContainer = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
const nextIcon = document.querySelector(".next");
const prevIcon = document.querySelector(".prev");


let currentIndex = 0;

sliderContainer.addEventListener("mouseover", stopPlay)
sliderContainer.addEventListener("mouseout", startPlay);


slides.forEach((slide, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    if (index === currentIndex) {
        dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
        updateDot();
    });

    dotContainer.appendChild(dot);
});

function updateDot() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
    
}

function updateSlider() {
    const newTransform = -currentIndex * 100 + "%";
    sliderContainer.style.transform = `translateX(${newTransform})`;
}

nextIcon.addEventListener("click", nextSlide);
prevIcon.addEventListener("click", prevSlide);

let interval;

function startPlay() {
    interval = setInterval(nextSlide, 5000);
}

function stopPlay() {
    clearInterval(interval);
}

startPlay();











