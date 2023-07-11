
// Este funcion sirve para mostrar por sweetAlert un producto, pasando el objeto
function alertAceptado(item){
    Swal.fire({
      title: `${item.name}`,
      text: `${item.description}`,
      footer:`Precio:${item.price}`,
      imageUrl: `${item.image}`,
      imageWidth: 400,
      imageHeight: 600,
      imageAlt: `${item.name}`,
    })
}


// Esta funcion filtra los precios, cargados anteriormente
function filtrarPorPrecio(price){
    const filtrados = producto.filter((item)=>item.price <= price);
    return filtrados;
}
// En esta funcion llamamos a un sweetAlert que nos pedira un rango de precio maximo, para filtrar
function filtrarPorPrecioButton(){
    contenedorCard.innerHTML=''
    Swal
    .fire({
        title: 'Elige el rango del precio de los productos',
        icon: 'question',
        input: 'range',
        inputLabel: 'Your age',
        inputAttributes: {
          min: 1,
          max: 300000,
          step: 1
        },
        inputValue: 25
    })
    .then(resultado => {
        if (resultado.value) {
            let precio = resultado.value;
            const alumnosFiltrados = filtrarPorPrecio(precio);
            console.table(alumnosFiltrados);
            renderizarProductos(alumnosFiltrados)
            Toastify({
                text:`Precio actual buscado: ${precio}`,
                duration:-1,
                close:true
            }).showToast();
        }
    });

}



// Esta funcion nos permite vaciar nuestro carrito, antes nos mostrara un sweetalert confirmando nuestra decision

let vaciarBtn = document.getElementById('vaciar')
    vaciarBtn.onclick = () => {
        if(carro.length!=0){
        Swal.fire({
            title: 'Esta seguro de que desea vaciar el carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              vaciarCarrito()
              Swal.fire(
                'Carrito vaciado correctamente',
              )
            }
          })
    }
    else{
        Toastify({
            text:'Usted no tiene nada en el carrito, por favor agregue algo primero',
            duration:2000,
        }).showToast();
    }
}

