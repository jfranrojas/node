const fs = require('fs')

class cartManager{
    constructor(file){
        this.file = file;
    }
    async getNewId(){
        let idMax = 0
        const jsonCart = await this.getCart()
        jsonCart.forEach(product => {
            if (cart.id > idMax) {
                idMax = cart.id
            }
        });
        return idMax + 1;
    }
    async getCart(){
        try {
            const data = await fs.promises.readFile(this.file, "utf-8")
            return JSON.parse(data)
        } catch (error) {
            return {error: error.message}
        }
    }
    async getProductsInCart(id){
        try {
            const data = await this.getCart()
            const dataFind = data.find((cart) => cart.id === id)
            return dataFind.products
        } catch (error) {
            return {error: error.message}
        }
    }
    async createCart(){
        try {
            const jsonData = await this.getCart()
            jsonData.push({id: await this.getNewId(), products:[] })
            await fs.promises.writeFile(this.file, JSON.stringify(jsonData, null, 2))
            return id
        } catch (error) {
            return {error: error.message}
        }
    }
    async cartProducts(idCart, product){
        try {
            let quantity = 1
            const data = await this.getCart()
            const indexData = data.findindex((cart) => cart.id === idCart)
            const dataProducts = data[indexData].products
            const findProducts = dataProducts.find((existeProd) => existeProd.id === product.id)
            if(findProducts){
                findProducts.quantity += 1
                fs.writeFileSync(this.file, JSON.stringify(data, null, 2))
            }
            else {
                dataProducts.push({id: product.id, quantity: quantity})
                fs.writeFileSync(this.file, JSON.stringify(data, null, 2))
            }
        } catch (error) {
            return {error: error.message}
        }
    }
}



module.exports = cartManager;