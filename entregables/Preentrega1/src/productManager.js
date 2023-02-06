const fs = require('fs');

class productManager {
    constructor(file) {
        this.file = file
    }
    async getNewId() {
        let idMax = 0
        const jsonProduct = await this.getProducts()
        jsonProduct.forEach(product => {
            if (product.id > idMax) {
                idMax = product.id
            }
        });
        return idMax + 1;
    }
    async addProduct(product) {
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
                await fs.promises.writeFile(this.file, JSON.stringify(jsonProduct, null, 2))
            }
        } catch (error) {
            return {error: error.message}
        }
    }
    async getProducts() {
        try {
            const product = await fs.promises.readFile(this.file, "utf-8")
            return JSON.parse(product)
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async getProductsById(id) {
        try {
            const jsonProduct = await this.getProducts()
            return jsonProduct.find((item) => item.id === id)
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async updateProduct(id, product) {
        try {
            const jsonProduct = await this.getProducts()
            const position = jsonProduct.findIndex((productId) => productId.id === id)
            product.id = id
            jsonProduct.splice(position, 1, product)
            await fs.promises.writeFile(this.file, JSON.stringify(jsonProduct, null, 2))
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async deleteProductById(id) {
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
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, "[]");
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = productManager;