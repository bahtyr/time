class Canvas {
	pos = { i: 0, row: 0 };
	shape = { width: 4, height: 8, gapX: 4, gapY: 8 };
	canvas;
	ctx;
	size;

	constructor(id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");

		let scale = window.devicePixelRatio;
		this.size = this.canvas.parentElement.offsetWidth;
		this.canvas.style.width  = `${this.size}px`;
		this.canvas.style.height = `${400}px`;
		this.canvas.width  = Math.floor(this.size * scale);
		this.canvas.height = Math.floor(400 * scale);
		this.ctx.scale(scale, scale);
	}

	draw(color) {
		let x = (this.shape.width + this.shape.gapX) * this.pos.i;

		if (x + this.shape.width > this.size) {
			this.pos.row++;
			this.pos.i = 0;
			x = 0;
		}

		let y = (this.shape.height + this.shape.gapY) * this.pos.row;
		this.pos.i++;

		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, this.shape.width, this.shape.height);
	}
}

const canvas = new Canvas("canvas-main");