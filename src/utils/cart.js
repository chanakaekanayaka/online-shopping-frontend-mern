


export function getCart(){
    
    let cartInString = localStorage.getItem("cart");

    if(cartInString == null){
        cartInString = "[]"
        localStorage.setItem("cart", cartInString);
        
    }
    const cart = JSON.parse(cartInString)
    return cart;
}

export function addToCart(product, qty){
    const cart = getCart()

    const existingProductIndex = cart.findIndex((item)=>{

        return item.productId === product.productID

    })

    if(existingProductIndex == -1){
        cart.push(
            {
                productId: product.productId,
                quantity: qty,
                price:product.price,
                name:product.name,
                altNames:product.altNames,
                image:product.image[0],
            }
        )
        localStorage.setItem("cart", JSON.stringify(cart));
    }else{

        const newQty = cart[existingProductIndex].quantity + qty;
            if(newQty <= 0){
                const newCart = cart.filter((item,index)=>{
                    return index !== existingProductIndex;
                })
                localStorage.setItem("cart", JSON.stringify(newCart));
            }else{
                cart[existingProductIndex].quantity = newQty;
                localStorage.setItem("cart",JSON.stringify(cart));
            }
    }
}


