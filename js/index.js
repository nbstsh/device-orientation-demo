const displayEl = document.querySelector('#display');
const messageEl = document.querySelector('#message');
const ballEl = document.querySelector('#ball');

window.addEventListener('deviceorientation', e => {
	const { absolute, alpha, beta, gamma } = e;
	const text = JSON.stringify({ absolute, alpha, beta, gamma }, null, 4);
	messageEl.textContent = text;

	updateIncrement({ x: beta, y: gamma });
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

	moveBall(currentX, currentY);
	requestAnimationFrame(animate);
};

const updateIncrement = ({ x, y }) => {
	if (x) incrementX = x;
	if (y) incrementY = y;
};

animate();
