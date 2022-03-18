const cartForm = document.querySelectorAll('.cart-item-management');

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
}

for (const formElement of cartForm) {
    formElement.addEventListener('submit', updateCartItem);
}