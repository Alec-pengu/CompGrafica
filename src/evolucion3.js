const items = document.querySelectorAll('[data-carousel-item]');
let currentIndex = 0;
const intervalTime = 6000;
let autoPlayInterval;

const evolutions = {
    0: { video: './videos/evolve.webm', evolvedImage: './img/gen3/grovyle.webp' },
    1: { video: './videos/evolve.webm', evolvedImage: './img/gen3/combusken.webp' },
    2: { video: './videos/evolve.webm', evolvedImage: './img/gen3/marshtomp.webp' }
};

const evolutions2 = {
    0: { video: './videos/evolve.webm', evolvedImage2: './img/gen3/sceptile.webp' },
    1: { video: './videos/evolve.webm', evolvedImage2: './img/gen3/blaziken.webp' },
    2: { video: './videos/evolve.webm', evolvedImage2: './img/gen3/swampert.webp' }
};

function updateCarousel(index) {
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('opacity-100', 'z-10');
            item.classList.remove('opacity-0', 'z-0');
        } else {
            item.classList.add('opacity-0', 'z-0');
            item.classList.remove('opacity-100', 'z-10');
        }
    });
}

function updatePokemonName() {
    const currentItem = items[currentIndex];
    const img = currentItem.querySelector('img');
    const pokemonNameElement = document.getElementById('pokemon-name');
    if (img) {
        pokemonNameElement.textContent = img.alt; // Usa el atributo alt para mostrar el nombre
    } else {
        console.error('No se encontró una imagen en el elemento actual del carrusel.');
    }
}

function autoPlayCarousel() {
    currentIndex = (currentIndex + 1) % items.length; // Avanza al siguiente índice
    updateCarousel(currentIndex); // Actualiza el carrusel
    updatePokemonName(); // Actualiza el nombre del Pokémon
}

function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(autoPlayCarousel, intervalTime);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Maneja la evolución del Pokémon
function handleEvolution() {
    const evolutionData = evolutions[currentIndex];
    const evolutionData2 = evolutions2[currentIndex];

    if (!evolutionData && !evolutionData2) {
        console.error('No hay datos de evolución para este índice.');
        return;
    }

    stopAutoPlay(); // Detiene el autoplay para evitar conflictos

    const carousel = document.getElementById('custom-controls-gallery');
    const pokemonNameElement = document.getElementById('pokemon-name');
    carousel.style.display = 'none'; // Oculta el carrusel durante la animación
    pokemonNameElement.style.display = 'none'; // Oculta el nombre del Pokémon

    const videoContainer = document.createElement('div');
    videoContainer.classList.add('fixed', 'inset-0', 'flex', 'justify-center', 'items-center', 'bg-black/90', 'z-50');
    document.body.appendChild(videoContainer);

    const video = document.createElement('video');
    video.src = evolutionData ? evolutionData.video : evolutionData2.video;
    video.autoplay = true;
    video.controls = false;
    video.classList.add('w-full', 'max-w-2xl', 'h-auto');
    videoContainer.appendChild(video);

    video.onended = () => {
        videoContainer.remove();

        const currentItem = items[currentIndex];
        const img = currentItem.querySelector('img');
        if (img) {
            const currentSrc = img.src;

            if (currentSrc.includes(evolutions[currentIndex].evolvedImage.split('/').pop())) {
                // Si está en la primera evolución, pasa a la segunda
                img.src = evolutions2[currentIndex].evolvedImage2;
                img.alt = evolutions2[currentIndex].evolvedImage2.split('/').pop().split('.')[0];
            } else {
                // Si está en el estado base, pasa a la primera evolución
                img.src = evolutions[currentIndex].evolvedImage;
                img.alt = evolutions[currentIndex].evolvedImage.split('/').pop().split('.')[0];
            }

            img.alt = img.alt.charAt(0).toUpperCase() + img.alt.slice(1); // Capitaliza el nombre
        }

        carousel.style.display = 'block'; // Muestra el carrusel nuevamente
        pokemonNameElement.style.display = 'block'; // Muestra el nombre del Pokémon nuevamente
        startAutoPlay(); // Reinicia el autoplay
        updatePokemonName(); // Actualiza el nombre del Pokémon
    };
}

// Reinicia al estado base con animación
document.getElementById('reset').addEventListener('click', () => {
    const currentItem = items[currentIndex];
    const img = currentItem.querySelector('img');
    const originalImage = currentItem.dataset.originalImage;
    const pokemonNameElement = document.getElementById('pokemon-name');

    if (!originalImage) {
        console.error('No se encontró la imagen original o el atributo data-original-image.');
        return;
    }

    stopAutoPlay(); // Detiene el autoplay para evitar conflictos

    const carousel = document.getElementById('custom-controls-gallery');
    carousel.style.display = 'none'; // Oculta el carrusel durante la animación
    pokemonNameElement.style.display = 'none'; // Oculta el nombre del Pokémon

    const videoContainer = document.createElement('div');
    videoContainer.classList.add('fixed', 'inset-0', 'flex', 'justify-center', 'items-center', 'bg-black/90', 'z-50');
    document.body.appendChild(videoContainer);

    const video = document.createElement('video');
    video.src = './videos/evolve.webm'; // Ruta del video de reinicio
    video.autoplay = true;
    video.controls = false;
    video.classList.add('w-full', 'max-w-2xl', 'h-auto');
    videoContainer.appendChild(video);

    video.onended = () => {
        videoContainer.remove();

        if (img) {
            img.src = `./img/gen3/${originalImage}`; // Restaurar la imagen original
            img.alt = originalImage.split('.')[0]; // Actualizar el atributo alt
            img.alt = img.alt.charAt(0).toUpperCase() + img.alt.slice(1); // Capitaliza el nombre
        }

        carousel.style.display = 'block'; // Muestra el carrusel nuevamente
        pokemonNameElement.style.display = 'block'; // Muestra el nombre del Pokémon nuevamente
        startAutoPlay(); // Reinicia el autoplay
        updatePokemonName(); // Actualiza el nombre del Pokémon
    };
});

document.addEventListener('DOMContentLoaded', () => {
    updateCarousel(currentIndex); // Muestra el primer elemento del carrusel
    updatePokemonName(); // Actualiza el nombre del Pokémon
    startAutoPlay(); // Inicia el autoplay
});

// Event listeners
document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel(currentIndex);
    updatePokemonName();
    startAutoPlay();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel(currentIndex);
    updatePokemonName();
    startAutoPlay();
});

document.querySelector('.text-gray-900').addEventListener('click', handleEvolution);

// Initialize carousel
updateCarousel(currentIndex);
updatePokemonName(); // Actualiza el nombre al cargar la página
startAutoPlay(); // Inicia el autoplay