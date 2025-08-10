document.addEventListener("DOMContentLoaded", () => {
    const materias = document.querySelectorAll(".materia");

    // Cargar progreso desde LocalStorage
    let aprobadas = JSON.parse(localStorage.getItem("aprobadas")) || [];

    function actualizarDesbloqueos() {
        materias.forEach(m => {
            const id = m.dataset.id;
            if (aprobadas.includes(id)) {
                m.classList.add("aprobada");
                m.classList.remove("bloqueada");
            }
        });

        materias.forEach(m => {
            if (m.classList.contains("aprobada")) {
                const desbloquea = m.dataset.desbloquea;
                if (desbloquea) {
                    desbloquea.split(",").forEach(idDes => {
                        const materiaDestino = document.querySelector(`.materia[data-id="${idDes}"]`);
                        if (materiaDestino) {
                            materiaDestino.classList.remove("bloqueada");
                        }
                    });
                }
            }
        });
    }

    // Al hacer clic en una materia
    materias.forEach(materia => {
        materia.addEventListener("click", () => {
            if (materia.classList.contains("bloqueada") || materia.classList.contains("aprobada")) return;

            const id = materia.dataset.id;
            if (!aprobadas.includes(id)) {
                aprobadas.push(id);
                localStorage.setItem("aprobadas", JSON.stringify(aprobadas));
            }

            actualizarDesbloqueos();
        });
    });

    // Inicializar interfaz
    actualizarDesbloqueos();
});
