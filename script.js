// Recuperar lista guardada al iniciar o iniciar vacía
let lista = JSON.parse(localStorage.getItem('miListaHogar')) || [];

const input = document.getElementById('inputItem');
const ul = document.getElementById('listaCompras');
const emptyMsg = document.getElementById('emptyMsg');

// Renderizar al cargar la página
document.addEventListener('DOMContentLoaded', renderizarLista);

// Agregar con tecla ENTER
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') agregarItem();
});

function guardarDatos() {
    // Guardamos el array 'lista' convertido a texto en el navegador
    localStorage.setItem('miListaHogar', JSON.stringify(lista));
    renderizarLista();
}

function agregarItem() {
    const texto = input.value.trim();
    if (texto) {
        // Agregamos al inicio del array (unshift) para que salga arriba
        lista.unshift({ nombre: texto, comprado: false });
        input.value = '';
        guardarDatos();
    }
}

function toggleComprado(index) {
    lista[index].comprado = !lista[index].comprado;
    
    // Opcional: Mover los comprados al final de la lista
    if(lista[index].comprado) {
        const item = lista.splice(index, 1)[0];
        lista.push(item);
    } else {
        // Si se desmarca, moverlo al principio (opcional)
        const item = lista.splice(index, 1)[0];
        lista.unshift(item);
    }
    
    guardarDatos();
}

function eliminarItem(index) {
    // Pequeña confirmación por seguridad
    if(confirm('¿Borrar este producto?')) {
        lista.splice(index, 1);
        guardarDatos();
    }
}

function renderizarLista() {
    ul.innerHTML = ''; // Limpiar visualmente

    if (lista.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
        
        lista.forEach((item, index) => {
            const li = document.createElement('li');
            if (item.comprado) li.classList.add('completed');

            // HTML interno del LI
            li.innerHTML = `
                <label class="check-container">
                    <input type="checkbox" ${item.comprado ? 'checked' : ''} onchange="toggleComprado(${index})">
                    <span class="checkmark"></span>
                </label>
                <span class="item-text" onclick="toggleComprado(${index})">${item.nombre}</span>
                <button class="btn-delete" onclick="eliminarItem(${index})">✕</button>
            `;
            ul.appendChild(li);
        });
    }
}