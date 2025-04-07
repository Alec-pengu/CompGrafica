document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        // Resaltar el enlace activo
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("bg-gray-500", "rounded-lg", "px-2");
        } else {
            link.classList.remove("bg-gray-500", "rounded-lg", "px-2");
        }

        // Agregar eventos para sombrear al pasar el mouse
        link.addEventListener("mouseover", () => {
            link.classList.add("bg-gray-500", "rounded-lg", "px-2");
        });

        link.addEventListener("mouseout", () => {
            // Solo quitar el sombreado si no es el enlace activo
            if (link.getAttribute("href") !== currentPage) {
                link.classList.remove("bg-gray-500", "rounded-lg", "px-2");
            }
        });
    });
});