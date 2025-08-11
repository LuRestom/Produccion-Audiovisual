const materias = [
    // PRIMER AÑO
    { nombre: "Electricidad y Mantenimiento", id: "electricidad", abre: ["produccion_tv", "sonido"], grupo: "año1c1" },
    { nombre: "Guion", id: "guion", abre: ["arte_diseno", "produccion_comunitaria", "produccion_tv", "sonido"], grupo: "año1c1" },
    { nombre: "Medios de Comunicación y Cultura", id: "medios", abre: ["semiotica", "estetica", "produccion_comunitaria"], grupo: "año1c1" },

    { nombre: "Semiótica", id: "semiotica", abre: ["estetica", "audiovisual2"], grupo: "año1c2", req: ["medios"] },
    { nombre: "Arte y Diseño Digital", id: "arte_diseno", abre: ["edicion", "realizacion", "narrativa"], grupo: "año1c2", req: ["guion"] },
    { nombre: "Producción Comunitaria", id: "produccion_comunitaria", abre: ["audiovisual2", "derecho", "produccion_tv"], grupo: "año1c2", req: ["guion", "medios"] },
    { nombre: "Producción Televisiva", id: "produccion_tv", abre: ["edicion", "audiovisual2", "derecho", "realizacion"], grupo: "año1c2", req: ["guion", "electricidad"] },

    { nombre: "Fotografía, Iluminación y Cámara", id: "foto", abre: ["edicion", "audiovisual2", "realizacion", "narrativa"], grupo: "año1anual" },
    { nombre: "Audiovisual I", id: "audiovisual1", abre: ["audiovisual2", "realizacion", "derecho", "narrativa"], grupo: "año1anual" },
    { nombre: "Práctica Profesional", id: "practica1", grupo: "año1anual" },

    // SEGUNDO AÑO
    { nombre: "Estética Audiovisual", id: "estetica", abre: ["derecho"], grupo: "año2c1", req: ["medios", "semiotica"] },
    { nombre: "Sonido", id: "sonido", abre: ["audiovisual3"], grupo: "año2c1", req: ["electricidad", "guion"] },

    { nombre: "Derecho Audiovisual", id: "derecho", abre: ["audiovisual3"], grupo: "año2c2", req: ["produccion_tv", "produccion_comunitaria", "audiovisual1", "estetica"] },
    { nombre: "Realización Audiovisual", id: "realizacion", grupo: "año2c2", req: ["arte_diseno", "produccion_tv", "foto", "audiovisual1"] },
    { nombre: "Narrativa Transmedia", id: "narrativa", abre: ["ingles"], grupo: "año2c2", req: ["arte_diseno", "foto", "audiovisual1"] },

    { nombre: "Edición", id: "edicion", abre: ["audiovisual3"], grupo: "año2anual", req: ["arte_diseno", "produccion_tv", "foto"] },
    { nombre: "Audiovisual II", id: "audiovisual2", abre: ["ingles", "direccion_arte"], grupo: "año2anual", req: ["semiotica", "produccion_comunitaria", "produccion_tv", "foto", "audiovisual1"] },
    { nombre: "Práctica Profesional", id: "practica2", grupo: "año2anual" },
    { nombre: "TP Final", id: "tp2", grupo: "año2anual" },

    // TERCER AÑO
    { nombre: "Inglés", id: "ingles", grupo: "año3c1", req: ["narrativa", "audiovisual2"] },
    { nombre: "Dirección de Arte y Ambientación", id: "direccion_arte", grupo: "año3c1", req: ["audiovisual2"] },
    { nombre: "Electiva I", id: "electiva1", grupo: "año3c1" },
    { nombre: "Electiva II", id: "electiva2", grupo: "año3c1" },
    { nombre: "Audiovisual III", id: "audiovisual3", grupo: "año3c1", req: ["sonido", "derecho", "edicion"] },
    { nombre: "Práctica Profesional", id: "practica3", grupo: "año3c1" },
    { nombre: "TP Final", id: "tp3", grupo: "año3c1" }
];

let progreso = JSON.parse(localStorage.getItem("progresoMaterias")) || [];

function renderMalla() {
    const contenedor = document.getElementById("malla");
    contenedor.innerHTML = "";
    materias.forEach(m => {
        const aprobada = progreso.includes(m.id);
        const requisitosCumplidos = !m.req || m.req.every(r => progreso.includes(r));

        const div = document.createElement("div");
        div.className = `materia ${m.grupo} ${aprobada ? "aprobada" : ""} ${!requisitosCumplidos && !aprobada ? "bloqueada" : ""}`;
        div.innerHTML = `
            <strong>${m.nombre}</strong>
            <br><small>${m.req ? "Requisitos: " + m.req.map(id => materias.find(x => x.id === id)?.nombre).join(", ") : "Sin requisitos"}</small>
            <br><button ${(!requisitosCumplidos && !aprobada) ? "disabled" : ""}>
                ${aprobada ? "Aprobada" : "Aprobar"}
            </button>
        `;
        div.querySelector("button").addEventListener("click", () => aprobarMateria(m.id));
        contenedor.appendChild(div);
    });
}

function aprobarMateria(id) {
    if (!progreso.includes(id)) {
        progreso.push(id);
        localStorage.setItem("progresoMaterias", JSON.stringify(progreso));
        renderMalla();
    }
}

renderMalla();
