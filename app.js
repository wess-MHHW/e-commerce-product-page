// CLASSES
class Cart {
  constructor(products = []) {
    this.products = products;
  }

  addProduct(product) {
    if (this.products.length === 0) {
      this.products.push(product);
    } else {
      let item = this.products.find((element) => element.id === product.id);
      if (index !== -1) {
        item.setQuantity(product.quantity);
      } else {
        this.products.push(product);
      }
    }
  }

  removeProduct(id) {
    this.products.forEach((item) => {
      let index = this.products.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
    });
  }

  getProductsQuantity() {
    return this.products.reduce((acc, value) => acc + value.quantity, 0);
  }
}

class CartItem {
  constructor(product, quantity) {
    this.id = product.id;
    this.product = product;
    this.quantity = quantity;
  }

  setQuantity(value) {
    this.quantity = value;
  }
}

class Product {
  constructor(name, images, price, discount) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.images = images;
    this.price = price;
    this.discount = discount;
  }
}

// FUNCTIONS
function modify(index) {
  reset();
  set(index);
}

function reset() {
  Array.from({ length: photos[0].children.length }).forEach((_, index) => {
    sliderPhotos[0].children[index].classList.remove("selected-product");
    sliderPhotos[1].children[index].classList.remove("selected-product");
    photos[0].children[index].classList.remove("selected-photo");
    photos[1].children[index].classList.remove("selected-photo");
  });
}

function set(index) {
  sliderPhotos[0].children[index].classList.add("selected-product");
  sliderPhotos[1].children[index].classList.add("selected-product");
  photos[0].children[index].classList.add("selected-photo");
  photos[1].children[index].classList.add("selected-photo");
}

function createCart(purchases) {
  const cartContent = document.querySelector(".cart-content");
  if (purchases.products.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartContent.innerHTML = "";
    purchases.products.forEach((p) => {
      let div = buildCartItem(p);
      cartContent.appendChild(div);
    });
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.className = "Checkout-button";
    button.innerHTML = "Checkout";
    cartContent.appendChild(button);
  }
}

function buildCartItem(item) {
  let temp = document.getElementsByTagName("template")[0];
  let div = temp.content.cloneNode(true).children[0];
  div.id = item.id;
  div.querySelector("img").setAttribute("src", item.product.images[0]);
  div.querySelector(".product-name").innerHTML = item.product.name;
  div.querySelector(
    ".product-quantity-price"
  ).innerHTML = ` $${item.product.price.toFixed(2)} x ${
    item.quantity
  } <span class="total">$${(
    item.product.price * item.quantity -
    item.product.price * item.quantity * item.product.discount
  ).toFixed(2)}</span>`;
  div.querySelector(".remove").addEventListener("click", () => {
    const productName = document.querySelector(".right .product-name");
    const value = document.querySelector(".right .value");
    if (item.product.name === productName.innerHTML) {
      value.innerHTML = 0;
    }
    purchases.removeProduct(div.id);
    const cartContent = document.querySelector(".cart-content");
    if (cartContent.children.length === 2) {
      cartContent.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      div.remove();
    }
    if (purchases.products.length) {
      localStorage.setItem("purchases", purchases);
    } else {
      localStorage.removeItem("purchases");
    }
    const cartNumber = document.querySelector(".cart-number");
    cartNumber.innerHTML = parseInt(purchases.getProductsQuantity());
    if (!purchases.getProductsQuantity()) {
      cartNumber.classList.remove("show");
    }
  });
  return div;
}

// PRODUCTS
let items = [
  new Product(
    "Fall Limited Edition Sneakers",
    ["./images/image-product-1.jpg"],
    250.0,
    0.5
  ),
];

// SET INTIAL CART VALUE
let purchases = new Cart([]);
(() => {
  if (localStorage.getItem("purchases")) {
    let data = JSON.parse(localStorage.getItem("purchases"));
    data["products"].forEach((item) => {
      purchases.addProduct(
        new CartItem(
          items.find((element) => {
            return element.name === item["product"]["name"];
          }),
          item["quantity"]
        )
      );
    });
  }
})();

// INITIAL STATE AND VALUES
window.addEventListener("DOMContentLoaded", () => {
  const cartNumber = document.querySelector(".cart-number");
  cartNumber.innerHTML = parseInt(purchases.getProductsQuantity());
  if (purchases.getProductsQuantity()) {
    cartNumber.classList.add("show");
  } else {
    cartNumber.classList.remove("show");
  }
  const productName = document.querySelector(".right .product-name");
  const value = document.querySelector(".right .value");
  purchases.products.forEach((item) => {
    if (item.product.name === productName.innerHTML) {
      value.innerHTML = item.quantity;
    }
  });
});

// HAMBURGER MENU
const menu = document.querySelector(".hamburger-menu");
const nav = document.querySelector("header > nav");

menu.addEventListener("click", () => {
  if (nav.classList.contains("show")) {
    menu.innerHTML = `<path d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z" fill="#69707D" fill-rule="evenodd"/>
    `;
    nav.classList.remove("show");
  } else {
    menu.innerHTML = `<path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/>
    `;
    nav.classList.add("show");
  }
});

// QUANTITY CONTROLLER
let quantity = 0;
const plus = document.querySelector(".plus-button");
const minus = document.querySelector(".minus-button");
const value = document.querySelector(".value");

plus.addEventListener("click", () => {
  if (cart.classList.contains("show")) {
    cart.classList.remove("show");
  }
  value.innerHTML++;
});

minus.addEventListener("click", () => {
  if (cart.classList.contains("show")) {
    cart.classList.remove("show");
  }
  if (value.innerHTML > 0) {
    value.innerHTML--;
  }
});

// SLIDER
let index = 0;
const slider = document.querySelectorAll(".slider");
const sliderPhotos = document.querySelectorAll(".slider-photos");
const photos = document.querySelectorAll(".photos");
const close = document.querySelector(".close-button");
const previous = document.querySelectorAll(".previous-button");
const next = document.querySelectorAll(".next-button");
const lightboxGallery = document.querySelector(".lightbox-gallery-container");

slider[0].addEventListener("click", () => {
  if (window.screen.width > 880) {
    window.scroll({
      top: 0,
      left: 0,
    });
    modify(index);
    lightboxGallery.classList.add("show");
  }
});

close.addEventListener("click", () => {
  lightboxGallery.classList.remove("show");
});

previous.forEach((button, i) => {
  button.addEventListener("click", () => {
    if (index > 0) {
      index--;
      modify(index);
    }
  });
});

next.forEach((button, i) => {
  button.addEventListener("click", () => {
    if (index < sliderPhotos[1].children.length - 1) {
      index++;
      modify(index);
    }
  });
});

photos.forEach((photo, i) => {
  photo.addEventListener("click", (event) => {
    if (event.target.classList.contains("photo-container")) {
      index = Array.from(photo.children).indexOf(event.target);
      modify(index);
    }
  });
});

// CART
const cartButton = document.querySelector(".cart-button");
const cart = document.querySelector(".cart");

cartButton.addEventListener("click", () => {
  if (cart.classList.contains("show")) {
    cart.classList.remove("show");
  } else {
    createCart(purchases);
    cart.classList.add("show");
  }
});

// ADD TO CART
const addToCart = document.querySelector(".add-button");
addToCart.addEventListener("click", () => {
  if (cart.classList.contains("show")) {
    cart.classList.remove("show");
  }
  const productName = document.querySelector(".right .product-name");
  quantity = value.innerHTML;
  if (quantity > 0) {
    purchases.addProduct(
      new CartItem(
        items.find((element) => element.name === productName.innerHTML),
        quantity
      )
    );
    localStorage.setItem("purchases", JSON.stringify(purchases));
  }
  const cartNumber = document.querySelector(".cart-number");

  cartNumber.innerHTML = parseInt(purchases.getProductsQuantity());
  if (purchases.getProductsQuantity()) {
    cartNumber.classList.add("show");
  }
});
