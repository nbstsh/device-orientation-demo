const displayEl = document.querySelector('#display');
const messageEl = document.querySelector('#message');
const ballEl = document.querySelector('#ball');

const maxX = displayEl.clientWidth - ball.clientWidth;
const maxY = displayEl.clientHeight - ball.clientHeight;

window.addEventListener('deviceorientation', e => {
	const { absolute, alpha, beta, gamma } = e;
	const text = JSON.stringify({ absolute, alpha, beta, gamma }, null, 4);
	messageEl.textContent = text;

	updateIncrement({ x: beta / 10, y: gamma / 10 });
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
