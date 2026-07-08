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
function abrirModal(titulo, desc, imgSrc, ref, precio, linkWa) {
    const modal = document.getElementById('modal-detalle');
    const contenido = document.getElementById('modal-contenido');
    
    // Inyectamos la estructura visual detallada del producto dentro del modal
    contenido.innerHTML = `
        <div class="rounded-xl overflow-hidden aspect-video bg-slate-50 mb-4">
            <img src="${imgSrc}" class="w-full h-full object-cover" alt="${titulo}">
        </div>
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

    // Animación para mostrar el modal quitando las clases de Tailwind de ocultado
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.remove('scale-95');
}

function cerrarModal() {
    const modal = document.getElementById('modal-detalle');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.add('scale-95');
}