const deleteProductButtonElements = document.querySelectorAll('.product-item button');

async function deleteProduct(event) {
    const buttonElement = event.target;
    const productId = buttonElement.dataset.productid;
    const csrfToken = buttonElement.dataset.csrf;

    const response = await fetch(`/admin/products/${productId}?_csrf=${csrfToken}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        alert('Could not delete product');
        return;
    }
    
    buttonElement.parentElement.parentElement.parentElement.parentElement.remove(); //accessing the parent element/<li> of the button
}

for (const deleteProductButtonElement of deleteProductButtonElements) {
    deleteProductButtonElement.addEventListener('click', deleteProduct);
}