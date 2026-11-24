const cart = [];

function addToCart(productName, price) 
{
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem)
    {
        existingItem.quantity++;
    } 
    else 
    {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    alert(productName + " has been added to your cart!");
    displayCart();
    calculateTotalPrice();
}

function calculateTotalPrice() 
{
    let total = 0;
    for (const item of cart) 
    {
        total += item.price * item.quantity;
    }
    document.getElementById("cart-total").textContent = "৳" + total.toFixed(2);
    return total;
}
function displayCart() 
{
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    if (cart.length === 0) 
        {
        cartItems.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
        return;
    }
    for (const item of cart) 
    {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        const priceCell = document.createElement("td");
        priceCell.textContent = "৳" + item.price;

        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;

        const subtotalCell = document.createElement("td");
        subtotalCell.textContent = "৳" + (item.price * item.quantity);

        row.append(
            nameCell,
            priceCell,
            quantityCell,
            subtotalCell
        );
        cartItems.appendChild(row);
    }
}
function validateCheckout() 
{
    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
   
    if (name === "" && phone === "") 
    {
        return "Please enter your name and phone number.";
    }
    else if (name === "") 
    {
        return "Please enter your name.";
    }
    else if (phone === "") 
    {
        return "Please enter your phone number.";
    }
    else 
    {
        return "Checkout information is valid!";
    }
}
function handleCheckout(event) 
{
    event.preventDefault();
    const message = validateCheckout();
    const messageElement = document.getElementById("checkout-message");
    messageElement.textContent = message;

    if (message === "Checkout information is valid!") 
    {
        messageElement.style.color = "green";
    } 
    else 
    {
        messageElement.style.color = "red";
    }
}
function getDiscountedPrice(price, percent)
{
    const discount = (price * percent) / 100;
    const finalPrice = price - discount;
    return finalPrice;
}
const discountedPrice = getDiscountedPrice(2000, 15);

document.getElementById("discounted-price").textContent = "৳" + discountedPrice.toFixed(2);