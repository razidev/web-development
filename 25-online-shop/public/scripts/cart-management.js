const addToCartButtonElement = document.querySelector('#product-details button');
const cartBadgeElement = document.querySelector('.nav-items .badge');

async function addToCart(){
    const productId = addToCartButtonElement.dataset.productid;
    const csrf = addToCartButtonElement.dataset.csrf;

    let response;

    try {
        response = await fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({
                productId,
                _csrf: csrf
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        alert('Failed to add item to cart');
        return;
    }
    
    if(!response.ok){
        alert('Failed to add item to cart');
        return;
    }

    const responseData = await response.json();
    cartBadgeElement.textContent = responseData.newTotalItems;
}

addToCartButtonElement.addEventListener('click', addToCart);