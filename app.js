// ==========================================
// 1. FUNCIÓN: FILTRAR POR CATEGORÍAS
// ==========================================
function filtrarProductos(categoria) {
    const tarjetas = document.querySelectorAll('.card-producto');
    
    tarjetas.forEach(tarjeta => {
        const categoriaTarjeta = tarjeta.getAttribute('data-categoria');
        if (categoria === 'todos' || categoriaTarjeta === categoria) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });

    // Cambiar estados visuales de los botones de filtro
    const btnTodos = document.getElementById('btn-todos');
    const btnCat1 = document.getElementById('btn-categoria-1');
    const btnCat2 = document.getElementById('btn-categoria-2');

    const clasesActivo = ['bg-emerald-600', 'text-white', 'shadow-md'];
    const clasesInactivo = ['bg-white', 'text-slate-600', 'border', 'border-slate-200', 'shadow-sm'];

    [btnTodos, btnCat1, btnCat2].forEach(btn => {
        if(btn) {
            btn.classList.remove(...clasesActivo);
            btn.classList.add(...clasesInactivo);
            btn.classList.add('font-semibold');
            btn.classList.remove('font-bold');
        }
    });

    let botonSeleccionado;
    if (categoria === 'todos') botonSeleccionado = btnTodos;
    if (categoria === 'categoria-1') botonSeleccionado = btnCat1;
    if (categoria === 'categoria-2') botonSeleccionado = btnCat2;

    if (botonSeleccionado) {
        botonSeleccionado.classList.remove(...clasesInactivo);
        botonSeleccionado.classList.add(...clasesActivo);
        botonSeleccionado.classList.add('font-bold');
    }
    
    // Limpiar el buscador si se cambia de categoría
    const buscador = document.getElementById('buscador');
    if (buscador) buscador.value = '';
}

// ==========================================
// 2. FUNCIÓN: BUSCADOR EN TIEMPO REAL
// ==========================================
function buscarProductos() {
    const textoBuscado = document.getElementById('buscador').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.card-producto');

    tarjetas.forEach(tarjeta => {
        // Obtenemos el texto del título H3 dentro de la tarjeta
        const nombreProducto = tarjeta.querySelector('h3').textContent.toLowerCase();
        
        if (nombreProducto.includes(textoBuscado)) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

// ==========================================
// 3. FUNCIÓN: BOTÓN FLOTANTE "SUBIR"
// ==========================================
// Escuchar el scroll de la página para mostrar u ocultar el botón
window.onscroll = function() {
    const btnSubir = document.getElementById('btn-subir');
    if (btnSubir) {
        // Si el usuario baja más de 400 píxeles, muestra el botón
        if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
            btnSubir.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        } else {
            btnSubir.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        }
    }
};

function subirArriba() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Subida fluida
    });
}

// ==========================================
// 4. FUNCIÓN: VENTANA EMERGENTE (MODAL)
// ==========================================
// Variable global para controlar el carrusel de imágenes dentro del modal
let imagenesActuales = [];
let indiceImagenActual = 0;

function abrirModal(titulo, desc, listaImagenes, ref, precio, linkWa) {
    const modal = document.getElementById('modal-detalle');
    const contenido = document.getElementById('modal-contenido');
    
    // Guardamos la lista de imágenes recibida en nuestra variable global
    imagenesActuales = listaImagenes;
    indiceImagenActual = 0; // Siempre empezamos mostrando la primera imagen

    // Inyectamos la estructura base con el contenedor de imágenes y las flechas de navegación
    contenido.innerHTML = `
        <!-- Contenedor del Carrusel -->
        <div class="relative rounded-xl overflow-hidden aspect-video bg-slate-100 group/carrusel mb-4">
            <!-- Imagen del Carrusel -->
            <img id="modal-img-slider" src="${imagenesActuales[0]}" class="w-full h-full object-cover transition-opacity duration-300 ease-in-out" alt="${titulo}">
            
            <!-- Flecha Izquierda (Solo visible si hay más de 1 imagen) -->
            <button onclick="cambiarImagenCarrusel(-1)" class="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/40 hover:bg-slate-900/70 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/carrusel:opacity-100 z-10 flex items-center justify-center ${imagenesActuales.length <= 1 ? 'hidden' : ''}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            
            <!-- Flecha Derecha (Solo visible si hay más de 1 imagen) -->
            <button onclick="cambiarImagenCarrusel(1)" class="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/40 hover:bg-slate-900/70 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/carrusel:opacity-100 z-10 flex items-center justify-center ${imagenesActuales.length <= 1 ? 'hidden' : ''}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>

            <!-- Indicador numérico de imagen (Ej: 1 / 3) -->
            <div id="carrusel-indicador" class="absolute bottom-3 right-3 bg-slate-900/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm ${imagenesActuales.length <= 1 ? 'hidden' : ''}">
                1 / ${imagenesActuales.length}
            </div>
        </div>

        <!-- Información del Producto -->
        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">${ref}</span>
                <span class="text-2xl font-black text-slate-900">${precio}</span>
            </div>
            <h3 class="text-xl font-bold text-slate-800 pt-1">${titulo}</h3>
            <p class="text-sm text-slate-500 leading-relaxed pt-2 border-t border-slate-100">${desc}</p>
        </div>
        <div class="pt-4 flex gap-3">
            <a href="${linkWa}" target="_blank" class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-center shadow-lg shadow-emerald-500/10 transition-colors text-sm flex items-center justify-center gap-2">
                Consultar por WhatsApp
            </a>
        </div>
    `;

    // Mostrar el modal con su animación suave
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.remove('scale-95');
}

// Nueva función interna para navegar por las imágenes del producto
function cambiarImagenCarrusel(direccion) {
    if (imagenesActuales.length <= 1) return;

    const imgSlider = document.getElementById('modal-img-slider');
    const indicador = document.getElementById('carrusel-indicador');
    
    if (!imgSlider) return;

    // 1. Desvanecer la imagen actual bajando la opacidad a 0
    imgSlider.classList.add('opacity-0');

    // 2. Esperar 200ms (lo que tarda el desvanecimiento) para cambiar la información de fondo
    setTimeout(() => {
        // Calculamos el nuevo índice circularmente
        indiceImagenActual += direccion;
        if (indiceImagenActual >= imagenesActuales.length) indiceImagenActual = 0;
        if (indiceImagenActual < 0) indiceImagenActual = imagenesActuales.length - 1;

        // Cambiamos la fuente de la imagen mientras está invisible
        imgSlider.src = imagenesActuales[indiceImagenActual];
        
        // Actualizamos el contador numérico
        if (indicador) indicador.textContent = `${indiceImagenActual + 1} / ${imagenesActuales.length}`;

        // 3. Volver a iluminar la nueva imagen subiendo la opacidad a 100
        imgSlider.classList.remove('opacity-0');
    }, 200); // 200 milisegundos de espera exacta
}

function cerrarModal() {
    const modal = document.getElementById('modal-detalle');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.add('scale-95');
}