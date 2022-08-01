/************************************************
 * Today's Date
 ************************************************/

const el = document.getElementsByTagName("h2")[0];
const options = { weekday: 'long', month: 'numeric', day: '2-digit' };
const date = new Date().toLocaleDateString("en-US", options).split(", ");
el.innerHTML = `${date[0]}<span> ${date[1]}</span>`;

/************************************************
 * Progress Bar
 ************************************************/

class Progress {
	t = setInterval(this.calc, 15 * 60 * 1000);
	bar1 = document.getElementById("bar1");
	bar2 = document.getElementById("bar2");

	constructor() {
		this.calc()
	}

	calc() {
		let d = new Date();
		let now = (d.getHours() * 60) + d.getMinutes();
		let total = 24 * 60;
		// percentage
		let percentage = Math.floor((now / total) * 100);
		let percentage2 = 100 - percentage;
		// set
		this.bar1.style.width = percentage + "%";
		this.bar2.style.width = percentage2 + "%";
	}
}

new Progress();