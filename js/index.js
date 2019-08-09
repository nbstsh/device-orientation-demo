const displayEl = document.querySelector('#display');
const inputEl = document.querySelector('#sensitivity');
const messageEl = document.querySelector('#message');
const ballEl = document.querySelector('#ball');

const ROTATION_SENSITIVITY = 0.5;
let sensitivity = ROTATION_SENSITIVITY;

inputEl.addEventListener('change', e => {
	sensitivity = Number(e.target.value) / 10;
});

let maxX, maxY;

const initMaxValues = () => {
	maxX = displayEl.clientWidth - ball.clientWidth;
	maxY = displayEl.clientHeight - ball.clientHeight;
};

initMaxValues();
window.addEventListener('resize', initMaxValues);

window.addEventListener('deviceorientation', e => {
	const { absolute, alpha, beta, gamma } = e;
	const text = JSON.stringify({ absolute, alpha, beta, gamma }, null, 4);
	messageEl.textContent = text;

	// beta's value range from -180 ~ 180
	// gamma's value range from -90 ~ 90
	updateIncrement({
		x: gamma * sensitivity,
		y: (beta / 2) * sensitivity
	});
});

const moveBall = (x, y) => {
	ballEl.style.transform = `translate(${x}px, ${y}px)`;
};

let currentX = 0;
let currentY = 0;
let incrementX = 0;
let incrementY = 0;

const animate = () => {
	currentX += incrementX;
	currentY += incrementY;

	if (currentX < 0) currentX = maxX;
	if (currentX > maxX) currentX = 0;
	if (currentY < 0) currentY = maxY;
	if (currentY > maxY) currentY = 0;

	moveBall(currentX, currentY);
	requestAnimationFrame(animate);
};

const updateIncrement = ({ x, y }) => {
	if (x) incrementX = x;
	if (y) incrementY = y;
};

animate();
