class productManager{
    constructor(){
        this.products = []
    }
    getNewId(){
        let idMax = 0
        this.products.forEach(product => {
            if (product.id > idMax) {
                idMax = product.id
            }
        });
        return idMax + 1;

        // return this.products.length + 1; SE ROMPE SI UNO BORRA CON ESTA
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
        let ans = this.findProduct(id)
        if (!this.findProduct(id)) {
            ans = "Not Found"
        }
        return ans ;
    }
}

const manager = new productManager();

manager.addProduct("Teclado", "Mecánico y retroiluminado", 2500, "imagen", "ABC12", 30)
manager.addProduct("Teclado", "Mecánico y retroiluminado", 2500, "imagen", "ABC123", 30)
manager.addProduct("Mouse", "Teclas auxiliares", 3500, "imagen", "ABC420", 15)
manager.getProducts()