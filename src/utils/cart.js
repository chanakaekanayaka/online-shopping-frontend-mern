


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

    //  Check if the input is a DB product (productID) or a Cart item (productId)
    const idToCheck = product.productID || product.productId;

    const existingProductIndex = cart.findIndex((item)=>{
        return item.productId === idToCheck 
    })

    if(existingProductIndex == -1){
        //  only runs if the item is truly new to the cart
        cart.push(
            {
                productId: product.productID, 
                quantity: qty,
                price:product.price,
                name:product.productName,
                altNames:product.altNames,
                image:product.image[0],
            }
        )
        localStorage.setItem("cart", JSON.stringify(cart));
    }else{
        //  updates quantity
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

export function getTotal(){
    const cart = getCart();
    let total = 0;
    cart.forEach((item)=>{
        total += item.quantity * item.price;
    })
    return total;
}
