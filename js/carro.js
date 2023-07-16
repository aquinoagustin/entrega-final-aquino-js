// Vaciamos nuestro array de carrito
let carro = [];

// Hacemos una consulta a nuestro LocalStorage, para saber si tenemos productos cargados
if(carro = JSON.parse(localStorage.getItem('carro')) ){
    renderizarProductosCarro(carro)
}
// Si la consulta falla, carga un carro vacío
else{
    carro = [];
    localStorage.setItem('carro',JSON.stringify(carro))
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
                <button id="${product.id}" class="btn btn-success agregar">Agregar</button>
                <button id="${product.id}" class="btn btn-danger borrar">Borrar</button>
                </div>
            </div>
            `
        
    }
    let total = localStorage.getItem('total');
    if(total!=0){
        contenedorCarritoTotal.innerHTML= `Total: ${total}`
    }
       
}





// Evento practicado, en donde agragamos productos al carrito
let botones  = document.getElementsByClassName('compra');
for(const boton of botones){
    boton.addEventListener('click',()=>{
        const prodACarro = producto.find((item)=>item.id == boton.id);
        console.log(prodACarro);
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
    console.table(carro);
    total = carro.reduce((ac,producto)=> ac + producto.price*producto.cantidad,0)
    localStorage.setItem('total',total)
    localStorage.setItem('carro',JSON.stringify(carro)) // cargamos el objeto al localStorage
    alertAceptado(item)
    console.log(repetido)
    renderizarProductosCarro(carro)
}

// Esta funcion vacía el carrito en el array y en el LocalStorage

function vaciarCarrito(){
    carro = [];
    localStorage.setItem('carro',JSON.stringify(carro))
    localStorage.setItem('total',0)
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
        const prodACarroEliminar = carro.find((item)=>item.id == boton.id);
        if(prodACarroEliminar && prodACarroEliminar.cantidad==1){
            let lugar = carro.indexOf(prodACarroEliminar)
            if(lugar!=-1){
                let totalT = localStorage.getItem("total");
                totalT = totalT - carro[lugar].price;
                localStorage.removeItem('carro',JSON.stringify(carro[lugar]))
              //  localStorage.setItem('carro',JSON.stringify(carro))
                localStorage.setItem('total',totalT)
                console.log(JSON.parse(localStorage.getItem('carro')))

            }
            
        }else{
            let totalT = localStorage.getItem("total");
            const repetido = carro.some((prod)=> prod.id == boton.id);
            if(repetido){
                carro.map((prod)=>{
                    if(prod.id == boton.id){
                        prod.cantidad--
                        totalT = totalT - prod.price;
                        localStorage.setItem('total',totalT);
                    }
                })
            }
            localStorage.setItem('carro',JSON.stringify(carro))
        }
        renderizarProductosCarro(carro)
    })
}
