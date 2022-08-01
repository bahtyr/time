const pos = { i: 0,	row: 0 };
const shape = { width: 4, height: 8, gapX: 4, gapY: 8 };

const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

const scale = window.devicePixelRatio;
const size = document.getElementById("canvas-wrapper").offsetWidth;
canvas.style.width  = `${size}px`;
canvas.style.height = `${400}px`;
canvas.width  = Math.floor(size * scale);
canvas.height = Math.floor(400 * scale);
ctx.scale(scale, scale);

canvas.draw = function(color) {
	let x = (shape.width + shape.gapX) * pos.i;

	if (x + shape.width > size) {
		pos.row++;
		pos.i = 0;
		x = 0;
	}

	let y = (shape.height + shape.gapY) * pos.row;
	pos.i++;

	ctx.fillStyle = color;
	ctx.fillRect(x, y, shape.width, shape.height);
}

// for (let x of new Array(100)) canvas.draw(colors[0]);