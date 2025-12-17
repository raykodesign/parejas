// --- FECHA ---
const startDate = new Date("2023-01-14T00:00:00"); 

// --- LOADING SCREEN ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 800);
    }, 1500);
});

// --- NUEVO MOUSE MÁGICO (Seguidor + Rastro Tierno) ---
const magicCursor = document.getElementById('magic-cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// Detectar movimiento (funciona en PC, en móvil será al tocar)
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    createCuteTrail(e.clientX, e.clientY);
});

// Suavizado del movimiento del cursor principal
function animateCursor() {
    let dx = mouseX - cursorX;
    let dy = mouseY - cursorY;
    cursorX += dx * 0.2; // Velocidad de seguimiento
    cursorY += dy * 0.2;
    magicCursor.style.left = cursorX + 'px';
    magicCursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Función para crear el rastro tierno
function createCuteTrail(x, y) {
    // Reducir frecuencia en móviles para rendimiento
    if (window.innerWidth < 768 && Math.random() > 0.3) return; 
    if (Math.random() > 0.5) return; // No crear en cada frame

    const trail = document.createElement('div');
    trail.classList.add('cute-trail');
    
    // Alternar entre corazones y estrellitas
    const symbols = ['❤️', '✨', '💖', '🌟'];
    trail.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    // Colores pasteles aleatorios
    const colors = ['#ff8fab', '#ffc2d1', '#ffe5ec', '#fff'];
    trail.style.color = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(trail);
    
    setTimeout(() => { trail.remove(); }, 1500); // Eliminar después de la animación
}


// --- TIMER ---
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}
setInterval(updateTimer, 1000); updateTimer();

// --- CARTA ---
function revealLetter() {
    document.getElementById('letter-cover').style.display = 'none';
    document.getElementById('letter-content').style.display = 'block';
}
function closeLetter() {
    document.getElementById('letter-content').style.display = 'none';
    document.getElementById('letter-cover').style.display = 'block';
}

// --- NUEVA FUNCIÓN: LANZAR BESOS ---
function throwKisses() {
    for (let i = 0; i < 15; i++) { // Lanzar 15 emojis
        setTimeout(() => {
            const kiss = document.createElement('div');
            kiss.classList.add('kiss-emoji');
            kiss.innerHTML = '😘';
            kiss.style.left = Math.random() * 100 + 'vw';
            kiss.style.top = (window.innerHeight + 100) + 'px'; // Empezar desde abajo
            kiss.style.fontSize = (Math.random() * 30 + 20) + 'px';
            kiss.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
            document.body.appendChild(kiss);
            setTimeout(() => { kiss.remove(); }, 3000);
        }, i * 100); // Pequeño retraso entre cada uno
    }
}

// --- POPUP MODAL PARA FOTOS ---
const modal = document.getElementById('photo-modal');
const modalImg = document.getElementById('modal-img');

function openModal(element) {
    // Obtener la fuente de la imagen dentro del div clickeado
    const imgSource = element.querySelector('img').src;
    modalImg.src = imgSource;
    modal.style.display = 'flex'; // Mostrar modal usando Flex para centrar
}

function closeModal() {
    modal.style.display = 'none';
}

// --- REPRODUCTOR SIMPLE ---
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play(); playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        audio.pause(); playIcon.classList.replace('fa-pause', 'fa-play');
    }
});