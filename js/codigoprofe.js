console.table(productos);
const carro = [];
let tablaBody = document.getElementById('tablabody');
let contenedorProds = document.getElementById('misprods');


let botones  = document.getElementsByClassName('compra');
for(const boton of botones){
    boton.addEventListener('click',()=>{
        const prodACarro = productos.find((producto)=>producto.id === boton.id);
        console.log(prodACarro);
        agregarACarrito(prodACarro);
    })
}