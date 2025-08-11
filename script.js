const materias = [
    // PRIMER AÑO
    { nombre: "Electricidad y Mantenimiento", abre: ["Producción Televisiva", "Sonido"], año: 1, cuatri: 1 },
    { nombre: "Guion", abre: ["Arte y Diseño Digital", "Producción Comunitaria", "Producción Televisiva", "Sonido"], año: 1, cuatri: 1 },
    { nombre: "Medios de Comunicación y Cultura", abre: ["Semiótica", "Estética Audiovisual", "Producción Comunitaria"], año: 1, cuatri: 1 },
    { nombre: "Semiótica", abre: ["Estética Audiovisual", "Audiovisual II"], año: 1, cuatri: 2 },
    { nombre: "Arte y Diseño Digital", abre: ["Edición", "Realización Audiovisual", "Narrativa Transmedia"], año: 1, cuatri: 2 },
    { nombre: "Producción Comunitaria", abre: ["Audiovisual II", "Derecho Audiovisual"], año: 1, cuatri: 2 },
    { nombre: "Producción Televisiva", abre: ["Edición", "Audiovisual II", "Derecho Audiovisual", "Realización Audiovisual"], año: 1, cuatri: 2 },
    { nombre: "Fotografía, Iluminación y Cámara", abre: ["Edición", "Audiovisual II", "Realización Audiovisual", "Narrativa Transmedia"], año: 1, cuatri: "Anual" },
    { nombre: "Audiovisual I", abre: ["Audiovisual II", "Realización Audiovisual", "Derecho Audiovisual", "Narrativa Transmedia"], año: 1, cuatri: "Anual" },
    { nombre: "Práctica Profesional", abre: [], año: 1, cuatri: "Anual" },

    // SEGUNDO AÑO
    { nombre: "Estética Audiovisual", abre: ["Derecho Audiovisual"], año: 2, cuatri: 1 },
    { nombre: "Sonido", abre: ["Audiovisual III"], año: 2, cuatri: 1 },
    { nombre: "Derecho Audiovisual", abre: ["Audiovisual III"], año: 2, cuatri: 2 },
    { nombre: "Realización Audiovisual", abre: [], año: 2, cuatri: 2 },
    { nombre: "Narrativa Transmedia", abre: ["Inglés"], año: 2, cuatri: 2 },
    { nombre: "Edición", abre: ["Audiovisual III"], año: 2, cuatri: "Anual" },
    { nombre: "Audiovisual II", abre: ["Inglés", "Dirección de arte y Ambientación"], año: 2, cuatri: "Anual" },
    { nombre: "Práctica Profesional", abre: [], año: 2, cuatri: "Anual" },
    { nombre: "TP Final", abre: [], año: 2, cuatri: "Anual" },

    // TERCER AÑO
    { nombre: "Inglés", abre: [], año: 3, cuatri: 1 },
    { nombre: "Dirección de arte y Ambientación", abre: [], año: 3, cuatri: 1 },
    { nombre: "Electiva I", abre: [], año: 3, cuatri: 1 },
    { nombre: "Electiva II", abre: [], año: 3, cuatri: 1 },
    { nombre: "Audiovisual III", abre: [], año: 3, cuatri: 1 },
    { nombre: "Práctica Profesional", abre: [], año: 3, cuatri: 1 },
    { nombre: "TP Final", abre: [], año: 3, cuatri: 1 }
];

let aprobadas = JSON.parse(localStorage.getItem("aprobadas")) || [];

function crearMalla() {
    const contenedor = document.getElementById("malla");
    contenedor.innerHTML = "";
    const años = [1, 2, 3];
    
    años.forEach(año => {
        const bloqueAño = document.createElement("div");
        bloqueAño.classList.add("bloque", `año${año}`);
        bloqueAño.innerHTML = `<h2>${año}° Año</h2>`;
        
        const cuatrimestres = ["Anual", 1, 2];
        cuatrimestres.forEach(cu => {
            const cuatriDiv = document.createElement("div");
            cuatriDiv.classList.add("cuatrimestre");
            cuatriDiv.innerHTML = `<strong>${cu === "Anual" ? "Anual" : cu + "° Cuatrimestre"}</strong>`;
            
            materias.filter(m => m.año === año && m.cuatri === cu)
                    .forEach(materia => {
                const materiaDiv = document.createElement("div");
                materiaDiv.classList.add("materia");

                if (!puedeCursar(materia.nombre) && !aprobadas.includes(materia.nombre)) {
                    materiaDiv.classList.add("bloqueada");
                }
                if (aprobadas.includes(materia.nombre)) {
                    materiaDiv.classList.add("aprobada");
                }

                materiaDiv.textContent = materia.nombre;
                materiaDiv.addEventListener("click", () => toggleMateria(materia.nombre));
                
                cuatriDiv.appendChild(materiaDiv);
            });
            bloqueAño.appendChild(cuatriDiv);
        });
        
        contenedor.appendChild(bloqueAño);
    });
}

function puedeCursar(nombre) {
    let requisitos = materias.filter(m => m.abre.includes(nombre)).map(m => m.nombre);
    return requisitos.every(req => aprobadas.includes(req));
}

function toggleMateria(nombre) {
    if (aprobadas.includes(nombre)) {
        aprobadas = aprobadas.filter(m => m !== nombre);
    } else {
        if (!puedeCursar(nombre)) return;
        aprobadas.push(nombre);
    }
    localStorage.setItem("aprobadas", JSON.stringify(aprobadas));
    crearMalla();
}

crearMalla();
