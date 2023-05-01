const productsContainer = document.getElementById('products')
const form = document.getElementById('formProduct')
let url = window.location.href;
const pageLink = document.querySelector('.pageLink');

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    submitForm();
})

const submitForm = async () =>{
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const img = document.getElementById('img').value;

    await fetch (`${window.location.href}`, {
        method: 'POST',
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            description: description,
            code: code,
            price: price,
            stock: stock,
            category: category,
            thumbnail: img,
        }),
    });
    location.reload(); 
};

const deleteProduct = async (id) =>{
    await fetch (`${window.location.href}/${id}`,{
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        header: {
            "Content-Type" : "application/json",
        },
    });
    location.reload();
}
