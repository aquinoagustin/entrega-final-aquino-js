

// Declaramos las variables que vamos a utilizar
let contenedorNombre = document.getElementById('nombre');
let contenedorPassword = document.getElementById('password');
let contenedorCard = document.getElementById('card')
let contenedorBusqueda = document.getElementById('busqueda')
let contenedorCarrito = document.getElementById('carrito')
let contenedorLogin = document.getElementById('login')
let contenedorNombreLogin = document.getElementById('nombreLogin')
let contenedorPasswordLogin = document.getElementById('passwordLogin')
let contenedorCarritoTotal = document.getElementById('carritoTotal')
// Por defecto llamamos a la funcion para siempre mostrar los productos al comienzo

// Esta funcion renderiza los productos por medio de un for of 
/*
let producto;
obtenerJsonProds();
console.table(producto);
*/

renderizarProductos(producto)

function renderizarProductos(lista){
    contenedorCard.innerHTML = '';
    for(const product of lista){
            contenedorCard.innerHTML += `
        <div class="card col-sm-2 m-3" style="width:18rem">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title" id="card-h5">${product.name}</h5>
            <h4 class="card-title">${product.price}</h4>
            <p class="card-text">${product.description}</p>
            <button id=${product.id} class="btn btn-primary compra">Agregar al carrito</button>
            </div>
        </div>
        `;

    } 
}

// Esta funcion borra los campos del formulario
function borrarCampos(){
    contenedorNombre.value=''
    contenedorPassword.value='';
}

// Esta funcion verifica que los inputs contengan almenos un valor para poder enviarse
// Una vez que termina se vacian y mandan un alert saludando al usuario

function enviarDatos(){
    if(contenedorPassword.value.trim() ==='' || contenedorNombre.value.trim() ===''){
        alert('Error cargue los campos')
    }else{
        alert(`Bienvenido ${contenedorNombre.value} su contraseña es ${contenedorPassword.value}`)
        let usuario ={
            nombre:contenedorNombre.value,
            password:contenedorPassword.value,
        }
        localStorage.setItem('usuario',JSON.stringify(usuario))
        borrarCampos()   // Borramos los campos una vez enviados
    }

}


// Funcion para encontrar un producto por nombre, el nombre ingresado es pasado a mayuscula

function encontrarProductoNombre(){
    nombreIngresado = contenedorBusqueda.value;
    if(nombreIngresado!= ''){
        const encontrado = producto.filter((producto)=> producto.name.toUpperCase().includes(nombreIngresado.toUpperCase()))
        if(encontrado){
            renderizarProductos(encontrado)
        }
    }

}
// Borramos el filtro de busqueda
function borrarFiltros(){
    contenedorBusqueda.value = ''
    renderizarProductos(producto)
    //obtenerJsonProds()
}



// Esta funcion sirve para logearse, en caso de encontrar un usuario que coincida, muestra un alert y pasa un 1 al localStorage
function enviarDatosLogin(){
    const valor = JSON.parse(localStorage.getItem('usuario')) 
    if(valor){
        let usuarioL ={
            nombre:contenedorNombreLogin.value,
            password:contenedorPasswordLogin.value,
        }
        if(valor.nombre === usuarioL.nombre && valor.password === usuarioL.password){
            alert('Se logeo correctamente')
            localStorage.setItem('login',1)
            contenedorNombreLogin.value = ''
            contenedorPasswordLogin.value = ''
        }else{
            alert('credencial invalida')
        }
    }
}

async function obtenerJsonProds(){
    const URLJSON = '/productos.json';
    const respuesta = await fetch(URLJSON);
    const data = await respuesta.json();
    producto = data;
    renderizarProductos(producto);
}
