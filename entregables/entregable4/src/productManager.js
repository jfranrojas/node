const fs = require('fs');
const pathFile = ('entregables/products.json');

const getNewId = async () => {
    let idMax = 0
    const jsonProduct = await this.getProducts()
    jsonProduct.forEach(product => {
        if (product.id > idMax) {
            idMax = product.id
        }
    });
    return idMax + 1;
}

const addProduct = async (product) => {
    try {
        const jsonProduct = await this.getProducts()
        if(!product.title || !product.stock || !product.price || !product.description || !product.thumbnail || !product.code || !product.status || !product.category){
            return  "Error"
        }else{
            const newProduct = {
                id: await this.getNewId(),
                title: product.title,
                stock: product.stock,
                price: product.price,
                description: product.description,
                thumbnail: product.thumbnail,
                code: product.code,
                status: true,
                category: product.category,
            }
            jsonProduct.push({...newProduct})
            await fs.promises.writeFile(pathFile, JSON.stringify(jsonProduct, null, 2))
        }
    } catch (error) {
        return {error: error.message}
    }
}

const getProducts = async () => {
    try {
        const product = await fs.promises.readFile(pathFile, "utf-8")
        return JSON.parse(product)
    }
    catch (err) {
        throw new Error(err)
    }
}

const getProductsById = async (id) => {
    try {
        const jsonProduct = await this.getProducts()
        return jsonProduct.find((item) => item.id === id)
    }
    catch (err) {
        throw new Error(err)
    }
}

const deleteProductById= async(id)=> {
    try {
        const jsonProduct = await this.getProducts()
        const productFind = await this.getProductsById(id)
        if(!productFind){
            return "Error"
        }
        const filterProducts = jsonProduct.filter(product => product.id !== id)
        await fs.promises.writeFile(this.file, JSON.stringify(filterProducts, null, 2))
    }
    catch (err) {
        throw new Error(err)
    }
}

module.exports = {addProduct, getProducts,getProductsById,deleteProductById}