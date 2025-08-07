import ProductCart from "./productCart";

export default function SuperProduct(){

    return (
        <div>

        <h1>Features This Week</h1>

        <ProductCart
          name = " Danger Rotwailler Puppy"
          price = "$ 5400.00"
          image = "https://picsum.photos/id/237/200/300"

        />
        <ProductCart
          name = " Gray  Scale Puppy"
          price = "$ 1200.00"
          image = "https://picsum.photos/id/200/200/300"
        
        />

        </div>
    )

}