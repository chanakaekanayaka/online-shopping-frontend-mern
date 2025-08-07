export default function ProductCart(props){

    return(
     <>

    <div className='bg-amber-200'>
        <h1>{props.name}</h1>
        <img src={props.image}/>
        <p>price :{props.price}</p>
        <button>View More</button>

    </div> 
     
     </>   

   

    )
    

}