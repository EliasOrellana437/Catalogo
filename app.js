// Variable global para controlar el carrusel de imágenes dentro del modal
let imagenesActuales = [];
let indiceImagenActual = 0;

// ==========================================
// 1. FUNCIÓN: FILTRAR POR CATEGORÍAS (MÉDICO)
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

    // Cambiamos a bg-teal-600 para el botón activo médico
    const clasesActivo = ['bg-teal-600', 'text-white', 'shadow-md'];
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
    
    const buscador = document.getElementById('buscador');
    if (buscador) buscador.value = '';
}

// ==========================================
// 2. FUNCIÓN: BUSCADOR EN TIEM REAL
// ==========================================
function buscarProductos() {
    const textoBuscado = document.getElementById('buscador').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.card-producto');

    tarjetas.forEach(tarjeta => {
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
window.onscroll = function() {
    const btnSubir = document.getElementById('btn-subir');
    if (btnSubir) {
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
        behavior: 'smooth'
    });
}

// ==========================================
// 4. FUNCIÓN: VENTANA EMERGENTE (MODAL CLÍNICO)
// ==========================================
function abrirModal(titulo, desc, listaImagenes, ref, precio, linkWa) {
    const modal = document.getElementById('modal-detalle');
    const contenido = document.getElementById('modal-contenido');
    
    imagenesActuales = listaImagenes;
    indiceImagenActual = 0;

    contenido.innerHTML = `
        <div class="relative rounded-xl overflow-hidden aspect-video bg-slate-50 group/carrusel mb-4 border border-slate-100">
            <img id="modal-img-slider" src="${imagenesActuales[0]}" class="w-full h-full object-cover transition-opacity duration-300 ease-in-out" alt="${titulo}">
            
            <button onclick="cambiarImagenCarrusel(-1)" class="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/40 hover:bg-slate-900/70 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/carrusel:opacity-100 z-10 flex items-center justify-center ${imagenesActuales.length <= 1 ? 'hidden' : ''}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            
            <button onclick="cambiarImagenCarrusel(1)" class="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/40 hover:bg-slate-900/70 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/carrusel:opacity-100 z-10 flex items-center justify-center ${imagenesActuales.length <= 1 ? 'hidden' : ''}">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>

            <div id="carrusel-indicador" class="absolute bottom-3 right-3 bg-slate-900/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm ${imagenesActuales.length <= 1 ? 'hidden' : ''}">
                1 / ${imagenesActuales.length}
            </div>
        </div>

        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <!-- Distintivo en color turquesa (teal) médico -->
                <span class="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md">${ref}</span>
                <span class="text-2xl font-black text-slate-900">${precio}</span>
            </div>
            <h3 class="text-xl font-bold text-slate-800 pt-1">${titulo}</h3>
            <p class="text-sm text-slate-500 leading-relaxed pt-2 border-t border-slate-100">${desc}</p>
        </div>
        <div class="pt-4 flex gap-3">
            <!-- El botón de WhatsApp mantiene el verde universal de conversión -->
            <a href="${linkWa}" target="_blank" class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-center shadow-lg shadow-emerald-500/10 transition-colors text-sm flex items-center justify-center gap-2">
                Consultar Disponibilidad por WhatsApp
            </a>
        </div>
    `;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.remove('scale-95');
}

function cambiarImagenCarrusel(direccion) {
    if (imagenesActuales.length <= 1) return;

    const imgSlider = document.getElementById('modal-img-slider');
    const indicador = document.getElementById('carrusel-indicador');
    
    if (!imgSlider) return;

    imgSlider.classList.add('opacity-0');

    setTimeout(() => {
        indiceImagenActual += direccion;
        if (indiceImagenActual >= imagenesActuales.length) indiceImagenActual = 0;
        if (indiceImagenActual < 0) indiceImagenActual = imagenesActuales.length - 1;

        imgSlider.src = imagenesActuales[indiceImagenActual];
        if (indicador) indicador.textContent = `${indiceImagenActual + 1} / ${imagenesActuales.length}`;

        imgSlider.removepacity = imgSlider.classList.remove('opacity-0');
    }, 200);
}

function cerrarModal() {
    const modal = document.getElementById('modal-detalle');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.add('scale-95');
}