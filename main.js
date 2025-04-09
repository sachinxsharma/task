let pump = document.getElementById('pump');
let balloon = document.getElementById('balloon');
let letter = document.getElementById('letter');
let restartBtn = document.getElementById('restartBtn');

let scale = 1;
let isInflating = false;
let isFloating = false;

const balloonImages = Array.from({ length: 11 }, (_, i) => `Symbol 10000${i + 1}.png`);

function handlePumpClick() {
  if (!isInflating && !isFloating) {
    isInflating = true;
    balloon.style.display = 'block';
    pump.classList.add('pumping');
    generateRandomLetter();
    setRandomBalloonImage();
  }

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
}

// Support click + touch
pump.addEventListener('click', handlePumpClick);
pump.addEventListener('touchstart', handlePumpClick);

function generateRandomLetter() {
  let randomIndex = Math.floor(Math.random() * 26);
  let imageNumber = 10001 + randomIndex;
  letter.src = `assets/letter/Symbol ${imageNumber}.png`;
  letter.style.display = 'block';
}

function setRandomBalloonImage() {
  let randomImage = balloonImages[Math.floor(Math.random() * balloonImages.length)];
  balloon.src = `assets/balloon/${randomImage}`;
}

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
    letter.style.transform = `translate(${x}px, ${y - 30}px)`;
  }, 1000);

  function burstBalloon() {
    if (!isFloating) return;
    isFloating = false;
    clearInterval(moveInterval);
    balloon.src = 'assets/burst.png';
    letter.style.display = 'none';
    restartBtn.style.display = 'block';
  }

  balloon.addEventListener('click', burstBalloon, { once: true });
  balloon.addEventListener('touchstart', burstBalloon, { once: true });
}

restartBtn.addEventListener('click', () => {
  restartBtn.style.display = 'none';
  resetBalloon();
});

function resetBalloon() {
  balloon.style.display = 'none';
  scale = 1;
  balloon.style.transform = 'translateX(-50%) scale(1)';
  isFloating = false;
  isInflating = false;

  letter.style.display = 'none';
  letter.src = '';
}
