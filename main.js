let pump = document.getElementById('pump');
let balloon = document.getElementById('balloon');
let scale = 1;
let isInflating = false;
let isFloating = false;
// Pick a random letter A–Z
let randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
document.getElementById('letter').src = `assests/letters/${randomChar}.png`;
document.getElementById('letter').style.display = 'block';

pump.addEventListener('click', () => {
    if (!isInflating && !isFloating) {
        balloon.style.display = 'block';
        isInflating = true;
        pump.classList.add('pumping');
    }

    // Inflate balloon
    if (isInflating && scale < 1.5) {
        scale += 0.05;
        balloon.style.transform = `translateX(-50%) scale(${scale})`;
    }

    if (scale >= 1.5) {
        isInflating = false;
        isFloating = true;
        pump.classList.remove('pumping');
        startFloating();
    }
});

function startFloating() {
    balloon.style.transition = 'transform 1s linear';

    let moveInterval = setInterval(() => {
        if (!isFloating) {
            clearInterval(moveInterval);
            return;
        }
        let x = (Math.random() * 200) - 100;
        let y = -Math.random() * 300;
        balloon.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }, 1000);

    // Burst on click
    balloon.onclick = () => {
        if (!isFloating) return;

        isFloating = false;
        clearInterval(moveInterval);
        balloon.src = 'assests/burst.png'; // Change this to your burst image

        setTimeout(() => {
            resetBalloon();
        }, 500);
    };
}

function resetBalloon() {
    balloon.style.display = 'none';
    balloon.src = 'assests/balloon.png';
    scale = 1;
    balloon.style.transform = 'translateX(-50%) scale(1)';
    isFloating = false;
    isInflating = false;

    document.getElementById('letter').style.display = 'none';
    document.getElementById('letter').src = '';

}
