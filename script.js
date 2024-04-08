const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://raw.githubusercontent.com/LucreciaC/API-restaurante/main/data/restauranteAPI.json`);
        console.log('Respuesta:', respuesta);

        if (respuesta.ok) {
            const datos = await respuesta.json();
            console.log('Datos:', datos);

            if (datos && Array.isArray(datos.menu)) {
                console.log('Cantidad de elementos en el menú:', datos.menu.length);
                
                // Limpiar la tabla antes de insertar nuevas filas
                const tableBody = document.querySelector('#menu-table tbody');
                tableBody.innerHTML = '';

                if (datos.menu.length > 0) {
                    console.log('Primer elemento del menú:', datos.menu[0]);
                    datos.menu.forEach(item => {
                        const row = tableBody.insertRow();
                        row.innerHTML = `
                            <td>${item.kategori}</td>
                            <td>${item.nama}</td>
                            <td>${item.deskripsi}</td>
                            <td>${item.harga}</td>
                           </td>`;
                    });
                } else {
                    console.log('El menú está vacío.');
                }
            } else {
                console.log('Los datos recibidos no tienen la estructura esperada o el menú no está definido.');
            }
        } else if (respuesta.status === 401) {
            console.log('Pusiste la llave mal');
        } else if (respuesta.status === 404) {
            console.log('La película que buscas no existe');
        } else {
            console.log('Hubo un error y no sabemos qué pasó');
        }

    } catch (error) {
        console.log('Error al obtener los datos de la API:', error);
    }
}

cargarPeliculas();