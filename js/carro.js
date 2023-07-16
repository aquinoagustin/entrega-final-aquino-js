
let carro = [];

// Hacemos una consulta a nuestro LocalStorage, para saber si tenemos productos cargados
if(carro = JSON.parse(localStorage.getItem('carro')) ){
    renderizarProductosCarro(carro)
}
// Si la consulta falla, carga un carro vacío
else{
    carro = [];
    localStorage.setItem('carro',JSON.stringify(carro))
    localStorage.removeItem('total')
}




// Esta funcion muestra los productos del carrito
function renderizarProductosCarro(lista){
    contenedorCarrito.innerHTML = '';
    for(const product of lista){
            contenedorCarrito.innerHTML += `
            <div class="card col-sm-2 m-3" style="width:18rem">
                <img src="${product.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title" id="card-h5">${product.name}</h5>
                <h4 class="card-title">${product.price}</h4>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Cantidad: ${product.cantidad}</p>
                <button id="${product.id}" class="btn btn-success compra">Agregar</button>
                <button id="${product.id}" class="btn btn-danger borrar">Borrar</button>
                </div>
            </div>
            `
        
    }
    let total = localStorage.getItem('total');
    contenedorCarritoTotal.innerHTML='';
    if(total==0 || total == null){
        contenedorCarritoTotal.innerHTML='';
    }else{
        contenedorCarritoTotal.innerText= `Total: ${total}`
    }
       
}


// Evento practicado, en donde agragamos productos al carrito
let botones  = document.getElementsByClassName('compra');
for(const boton of botones){
    boton.addEventListener('click',()=>{
        const prodACarro = producto.find((item)=>item.id == boton.id);
        agregarACarrito(prodACarro);
    })
}    


// funcion donde agregamos productos al carrito
function agregarACarrito(item){
    let total = carro.reduce((ac,producto)=> ac + producto.price,0)
    const repetido = carro.some((prod)=> prod.id == item.id);
    if(repetido){
        carro.map((prod)=>{
            if(prod.id == item.id){
                prod.cantidad++
            }
        })
    }else{
        carro.push({
            id:item.id,
            name:item.name,
            price:item.price,
            description:item.description,
            image:item.image,
            cantidad:item.cantidad,
        })
    }
    total = carro.reduce((ac,producto)=> ac + producto.price*producto.cantidad,0)
    if(total!=0){
        localStorage.setItem('total',total)
    }
    localStorage.setItem('carro',JSON.stringify(carro)) // cargamos el objeto al localStorage
    alertAceptado(item)
    renderizarProductosCarro(carro)
}

// Esta funcion vacía el carrito en el array y en el LocalStorage

function vaciarCarrito(){
    carro = [];
    localStorage.setItem('carro',JSON.stringify(carro))
    localStorage.removeItem('total')
    renderizarProductosCarro(carro)
}

// Este evento llama a una funcion anonima, que simula la finalizacion de una compra y borra el carrito

let finalizarBtn = document.getElementById('finalizar');
finalizarBtn.onclick= () =>{
    if(carro.length != 0){
        Toastify({
            text:'Gracias por tu compra!!!',
            duration:5000,
            gravity:'bottom',
            position:'right'
        }).showToast();
        vaciarCarrito()
    }else{
        Toastify({
            text:'Usted no tiene nada en el carrito, por favor agregue algo primero',
            duration:2000,
        }).showToast();
    }
    
}


// Este evento, llama a una funcion anonima, que borra los productos seleccionados



let botonesEliminar  = document.getElementsByClassName('borrar');
for(const boton of botonesEliminar){
    boton.addEventListener('click',()=>{
        let totalT = localStorage.getItem("total");
    const index = carro.findIndex(producto => producto.id == boton.id);
    if(index!=-1){
        if(carro[index].cantidad==1){
            totalT = totalT - carro[index].price;
            localStorage.setItem('total',totalT)
            carro.splice(index, 1);
        }
        else{
            if(carro[index].cantidad>1){
                carro[index].cantidad--
                totalT = totalT - carro[index].price;
                localStorage.setItem('total',totalT)
            }
        }
    }
    carro.push()
    localStorage.setItem("carro", JSON.stringify(carro));
    renderizarProductosCarro(carro)
    })

}
