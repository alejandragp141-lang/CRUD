const BASE_URL = window.API_BASE_URL || "http://127.0.0.1:5000";

async function apiRequest(path, options = {}) {
    let response;
    try {
        response = await fetch(`${BASE_URL}${path}`, options);
    } catch {
        throw new Error(
            "No se pudo contactar la API. Inicia el backend en http://127.0.0.1:5000."
        );
    }
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(result.mensaje || `Error HTTP ${response.status}`);
    }
    return result;
}

function notificar(mensaje, tipo = "error") {
    if (typeof swal === "function") {
        swal("Mensaje", mensaje, tipo);
    } else {
        window.alert(mensaje);
    }
}

function visualizar(data) {
    const tabla = document.getElementById("data");
    if (!tabla) return;
    tabla.replaceChildren();

    for (const item of data.baul) {
        const fila = document.createElement("tr");
        fila.dataset.id = item.id_baul;

        for (const value of [item.id_baul, item.plataforma, item.usuario, "••••••••"]) {
            const celda = document.createElement("td");
            celda.textContent = value;
            fila.append(celda);
        }

        const acciones = document.createElement("td");
        const editar = document.createElement("button");
        editar.type = "button";
        editar.className = "btn btn-info me-2";
        editar.textContent = "Editar";
        editar.addEventListener("click", () => {
            location.href = `edit.html?variable1=${encodeURIComponent(item.id_baul)}`;
        });

        const borrar = document.createElement("button");
        borrar.type = "button";
        borrar.className = "btn btn-warning";
        borrar.textContent = "Eliminar";
        borrar.addEventListener("click", () => eliminar(item.id_baul));

        acciones.append(editar, borrar);
        fila.append(acciones);
        tabla.append(fila);
    }
}

async function consulta_general() {
    try {
        visualizar(await apiRequest("/"));
    } catch (error) {
        notificar(`No fue posible cargar los registros: ${error.message}`);
    }
}

async function eliminar(id) {
    if (!window.confirm("¿Deseas eliminar este registro?")) return;
    try {
        const result = await apiRequest(`/eliminar/${encodeURIComponent(id)}`, {
            method: "DELETE"
        });
        actualizarDOM(id);
        notificar(result.mensaje, "success");
    } catch (error) {
        notificar(`No fue posible eliminar el registro: ${error.message}`);
    }
}

function actualizarDOM(id) {
    document.querySelector(`tr[data-id="${CSS.escape(String(id))}"]`)?.remove();
}

async function registrar() {
    const plataforma = document.getElementById("plataforma").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const clave = document.getElementById("clave").value;
    if (!plataforma || !usuario || !clave) {
        notificar("Completa plataforma, usuario y clave.");
        return;
    }

    try {
        const result = await apiRequest("/registro/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ plataforma, usuario, clave })
        });
        notificar(result.mensaje, "success");
        location.href = "index.html";
    } catch (error) {
        notificar(`No fue posible guardar el registro: ${error.message}`);
    }
}

async function consulta_individual(id) {
    try {
        const result = await apiRequest(
            `/consulta_individual/${encodeURIComponent(id)}`
        );
        document.getElementById("plataforma").value = result.baul.plataforma;
        document.getElementById("usuario").value = result.baul.usuario;
    } catch (error) {
        notificar(`No fue posible cargar el registro: ${error.message}`);
    }
}

async function modificar(id) {
    const plataforma = document.getElementById("plataforma").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const clave = document.getElementById("clave").value;
    if (!plataforma || !usuario) {
        notificar("Completa plataforma y usuario.");
        return;
    }

    try {
        const result = await apiRequest(
            `/actualizar/${encodeURIComponent(id)}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plataforma, usuario, clave })
            }
        );
        notificar(result.mensaje, "success");
        location.href = "index.html";
    } catch (error) {
        notificar(`No fue posible actualizar el registro: ${error.message}`);
    }
}
