/************************************************
 * Today's Date
 ************************************************/

const el = document.getElementsByTagName("h4")[0];
const options = {weekday: 'short'};
el.innerHTML = new Date().toLocaleDateString("en-US", options);

/************************************************
 * Progress
 ************************************************/

const canvasToday = new Canvas("canvas-today", 40);

canvasToday.shape = { width: 3, height: 25, gapX: 6, gapY: 0};
canvasToday.offset = 46 + 4;
canvasToday.allowNewLine = false;
canvasToday.t = setInterval(this.print, 15 * 60 * 1000);

canvasToday.print = function() {
	//calculate day progress
	let d = new Date();
	let hrsNow = (d.getHours() * 60) + d.getMinutes();
	let hrsTotal = 24 * 60;
	let shpTotal = this.pos.i; //get last item count

	let highlightCount = Math.floor((hrsNow * shpTotal) / hrsTotal);
	let loop = shpTotal > 0 ? shpTotal : 200;

	//reset to draw over
	this.pos.i = 0;

	//print
	for (let i = 0; i < loop; i++) {
		if (i < highlightCount)
			this.draw("hsl(0, 0%, 27%)");
		else this.draw("hsl(0, 0%, 12%)");
	}
}

canvasToday.print(); // learn max shape count (total)
canvasToday.print(); // highlight time