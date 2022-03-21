const cartForm = document.querySelectorAll('.cart-item-management');
const cartTotalPriceElement = document.getElementById('cart-total-price');
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');

async function updateCartItem(event) {
    event.preventDefault();

    const form = event.target;
    const productId = form.dataset.productid;
    const csrf = form.dataset.csrf;
    const quantity = form.firstElementChild.value;

    let response;
    try {
        response = await fetch('/cart/items', {
            method: 'PATCH',
            body: JSON.stringify({
                productId,
                quantity,
                _csrf: csrf
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        alert('Failed to update cart item');
        return;
    }

    if (!response.ok) {
        alert('Failed to update cart item');
        return;
    }

    const responseData = await response.json();
    if (responseData.updatedCartData.updatedItemPrice === 0) {
        form.parentElement.parentElement.remove();
    }else {
        const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price');
        cartItemTotalPriceElement.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);
    }
    cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

    for (const cartBadgeElement of cartBadgeElements) {
        cartBadgeElement.textContent = responseData.updatedCartData.newTotalQuantity;
    }
}

for (const formElement of cartForm) {
    formElement.addEventListener('submit', updateCartItem);
}