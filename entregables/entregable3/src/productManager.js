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
            jsonProduct.push({ ...product, id: await this.getNewId() })
            await fs.promises.writeFile(this.file, JSON.stringify(jsonProduct, null, 2))
        } catch {
            await fs.promises.writeFile(this.file, JSON.stringify([{ ...product, id: 1 }]))
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
            return jsonProduct.find((item) => item.id === id) || null
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async updateProduct(id, product) {
        try {
            const jsonProduct = await this.getProducts()
            const position = jsonProduct.findIndex((productId) => productId.id === id)
            console.log(position)
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
            const filterProducts = jsonProduct.filter(product => product.id !== id) || null
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