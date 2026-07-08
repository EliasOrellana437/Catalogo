function filtrarProductos(categoria) {
    // 1. Seleccionar todas las tarjetas de productos
    const tarjetas = document.querySelectorAll('.card-producto');
    
    // 2. Recorrer cada tarjeta y decidir si mostrarla u ocultarla
    tarjetas.forEach(tarjeta => {
        // Obtenemos la categoría guardada en el atributo data-categoria de la tarjeta
        const categoriaTarjeta = tarjeta.getAttribute('data-categoria');
        
        if (categoria === 'todos' || categoriaTarjeta === categoria) {
            // Mostramos la tarjeta removiendo cualquier clase oculta
            tarjeta.style.display = 'block';
        } else {
            // Ocultamos la tarjeta por completo
            tarjeta.style.display = 'none';
        }
    });

    // 3. CAMBIAR EL ESTILO VISUAL DE LOS BOTONES
    // Obtenemos los 3 botones usando sus IDs
    const btnTodos = document.getElementById('btn-todos');
    const btnCat1 = document.getElementById('btn-categoria-1');
    const btnCat2 = document.getElementById('btn-categoria-2');

    // Lista de clases de Tailwind para botón activo (Verde) e inactivo (Blanco)
    const clasesActivo = ['bg-emerald-600', 'text-white', 'shadow-md'];
    const clasesInactivo = ['bg-white', 'text-slate-600', 'border', 'border-slate-200', 'shadow-sm'];

    // Primero reiniciamos todos los botones poniéndolos en modo "Inactivo"
    [btnTodos, btnCat1, btnCat2].forEach(btn => {
        if(btn) {
            btn.classList.remove(...clasesActivo);
            btn.classList.add(...clasesInactivo);
            // Aseguramos que mantenga la tipografía semibold si pasa a estar inactivo
            btn.classList.add('font-semibold');
            btn.classList.remove('font-bold');
        }
    });

    // Ahora, activamos solo el botón al que se le hizo clic
    let botonSeleccionado;
    if (categoria === 'todos') botonSeleccionado = btnTodos;
    if (categoria === 'categoria-1') botonSeleccionado = btnCat1;
    if (categoria === 'categoria-2') botonSeleccionado = btnCat2;

    if (botonSeleccionado) {
        botonSeleccionado.classList.remove(...clasesInactivo);
        botonSeleccionado.classList.add(...clasesActivo);
        botonSeleccionado.classList.add('font-bold');
    }
}