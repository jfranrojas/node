const fs = require('fs')

class productManager {
    constructor(file) {
        this.file = file
    }
    async getNewId() {
        let idMax = 0
        this.products.forEach(product => {
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
    async getProductsById() {
        try {
            const jsonProduct = await this.getProducts()
            return jsonProduct.find((item) => item.id === id) || null
        }
        catch (err) {
            throw new Error(err)
        }
    }
    async uptadeProduct() {
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
    async deleteProductById() {
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

const product1 = {
    title: "Teclado ",
    description: "Mecánico y retroiluminado",
    price: 5000,
    thumbnail: 'http://',
    code: "ABC143",
    stock: 5,
}
const product2 = {
    title: "Mouse Gamer",
    description: "Boton auxiliar y gamepad de regalo",
    price: 6000,
    thumbnail: 'http://',
    code: "ABC153",
    stock: 10,
}
const Reemplazo = {
    title: "producto Remplazo",
    description: "A definir",
    price: 2000,
    thumbnail: 'http://',
    code: "ABC89",
    stock: 10,
}

const run = async () => {
    try{
    const products = new productManager("products.json")
    await products.addProduct(product1)
    await products.addProduct(product2)
    console.log("primera consulta", await products.getProducts())
    console.log("byId", await products.getById(2))
    await products.updateProduct(2, Reemplazo)
    console.log("segunda consulta", await products.getProducts())
    console.log("byId", await products.getById(2))
    // await products.deleteById(2)
    // await products.deleteAll()    
    }
    catch{
        console.log("Algo no esta andando")
    }
}
run()