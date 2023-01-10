class productManager{
    constructor(){
        this.products = []
    }
    getNewId(){
        return this.products.length + 1; 
    }
    getProducts(){
        return(console.log(this.products))  
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(this.products.find (elem => elem.code == code)){
            console.log("El producto ya esta registrado")
        }
        else{
            let newProduct = {
                id: this.getNewId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            }
            this.products.push(newProduct)
        }
    }
    

    getProductById(id){
        let product = this.products.find( elem => elem.id == id)
        return product;
    }
}

const manager = new productManager();

manager.addProduct("Teclado", "Mecánico y retroiluminado", 2500, "imagen", "ABC12", 30)
manager.addProduct("Teclado", "Mecánico y retroiluminado", 2500, "imagen", "ABC12", 30)
manager.getProducts()