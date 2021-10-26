const INITIAL_SIDE_LENGTH = 4;

const drawToPixel = (e) => {
    //Change to a variable color later
    e.target.classList.add('colored-pixel');
};

//initialize a 16x16 grid of "pixels", but allow for any size
//within the range of 16 - 100 per side

const drawPixels = (sides = INITIAL_SIDE_LENGTH) => {
    if (sides > 100) sides = 100;
    if (sides < 4) sides = 4;

    //Reset container internals, if needed
    const container = document.querySelector('.container');
    container.innerHTML = '';

    const HEIGHT = Math.min(window.innerHeight, window.innerWidth);
    const PIXEL_WIDTH = Math.floor(HEIGHT / sides / 1.5);

    //create sides x sides divs with class .pixel
    for (let i = 0; i < sides; i++) {
        const row = document.createElement('div');
        row.classList.add('pixel-row');
        for(let j = 0; j < sides; j++) {
            let pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.style.width = `${PIXEL_WIDTH}px`;
            pixel.style.height = `${PIXEL_WIDTH}px`;

            pixel.addEventListener('mouseenter', drawToPixel);

            row.appendChild(pixel);
        }
        container.appendChild(row);
    }
};

const clearGrid = () => {
    const _pixels = document.querySelectorAll('.pixel');
    _pixels.forEach((pixel) => {
        pixel.classList.remove('colored-pixel');
    });
};

const resizeGrid = () => {
    clearGrid();
    let answer = prompt('How many pixels per side? Enter a value between 4 and 100');
    answer = Number(answer);
    drawPixels(answer);
};

const handleTouch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(e.touches.length !== 1) return;
    const touch = e.touches[0];

    const element = document.elementFromPoint(touch.pageX, touch.pageY);
    if(!element.classList.contains('pixel')) return;

    element.classList.add('colored-pixel');
};

const handleTouchMove = (e) => {
    handleTouch(e);
};

const clearButton = document.getElementById('clear-button');
const resizeButton = document.getElementById('new-grid');

clearButton.addEventListener('click', clearGrid);
resizeButton.addEventListener('click', resizeGrid);

document.body.addEventListener('touchstart', handleTouch);
document.body.addEventListener('touchmove', handleTouchMove)

drawPixels();