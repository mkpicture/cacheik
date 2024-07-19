const product = [
    {
        id: 0,
        image: 'image/plat1.jpg',
        title: 'Menu Burger Cheval',
        price: 12.00,
    },
    {
        id: 1,
        image: 'image/Plat2.jpg',
        title: 'Viande Impériale',
        price: 19.00,
    },
    {
        id: 2,
        image: 'image/Plat3.jpg',
        title: 'Spaghetti Bolognaise',
        price: 23.00,
    },
    {
        id: 3,
        image: 'image/plat4.jpg',
        title: 'Le 1000 couleurs',
        price: 15.00,
    },
    {
        id: 4,
        image: 'image/plat5.jpg',
        title: 'Plateau à Partager',
        price: 45.00,
    },
    {
        id: 5,
        image: 'image/plat6.jpg',
        title: 'Boules Festives',
        price: 18.00,
    }
];

const categories = [...new Set(product.map((item) => item))];
let i = 0;

document.getElementById('root').innerHTML = categories.map((item) => {
    const { image, title, price } = item;
    return (
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <h2>$${price}.00</h2>
                <button onclick='addToCart(${i++})'>Add to cart</button>
            </div>
        </div>`
    );
}).join('');

var cart = [];

function addToCart(a) {
    const found = cart.find(item => item.id === categories[a].id);
    if (found) {
        found.quantity += 1;
    } else {
        cart.push({ ...categories[a], quantity: 1 });
    }
    displayCart();
}

function delElement(a) {
    cart.splice(a, 1);
    displayCart();
}

function displayCart() {
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length == 0) {
        document.getElementById('cartItem').innerHTML = "Votre panier est vide";
        document.getElementById("total").innerHTML = "$ " + 0 + ".00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((items) => {
            var { image, title, price, quantity } = items;
            total += price * quantity;
            document.getElementById("total").innerHTML = "$ " + total.toFixed(2);
            return (
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price.toFixed(2)}</h2>
                <p>Quantité: ${quantity}</p>` +
                "<i class='fa-solid fa-trash' onclick='delElement(" + (j++) + ")'></i></div>"
            );
        }).join('');
    }
}

function saveToLocalStorage() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (name && phone && cart.length > 0) {
        const order = {
            name,
            phone,
            items: cart,
            total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        };
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        cart = [];
        displayCart();
        openPopup();
    } else {
        alert("Veuillez remplir tous les champs et ajouter des articles au panier.");
    }
}

function openPopup() {
    document.getElementById("popup").classList.add("open-popup");
    document.querySelector(".popup-overlay").classList.add("open-popup");
}

function closePopup() {
    document.getElementById("popup").classList.remove("open-popup");
    document.querySelector(".popup-overlay").classList.remove("open-popup");
}

document.getElementById('orderForm').addEventListener('submit', (event) => {
    event.preventDefault();
    saveToLocalStorage();
});
