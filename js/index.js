const displayEl = document.querySelector('#display');
const ballEl = document.querySelector('#ball');

window.addEventListener('deviceorientation', e => {
	const { absolute, alpha, beta, gamma } = e;
	const text = JSON.stringify({ absolute, alpha, beta, gamma }, null, 4);
	displayEl.textContent = text;

	updateIncrement({ x: (beta / 2) * 0.01, y: gamma * 0.01 });
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
