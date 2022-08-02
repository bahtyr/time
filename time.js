var topics = [];
const list = document.getElementById("list");
const hiddenItem = document.getElementById("hidden-item");

class Topic {
	position;
	el;
	interval;

	name;
	color;
	isActive = false;

	time = {
		hr: 0,
		min: 0,
		sec: 0,
		total: 0,
		callback: function() {},
		increase() {
			this.total++;
			this.sec++;
			this.callback();
			if (this.sec >= 60) {
				this.sec = 0;
				this.min++;
				if (this.min >= 60) {
					this.min = 0;
					this.hr++;
				}
			}
		},
		toString() {
			return (this.hr > 0 ? this.hr + "h " : "") + (this.min > 0 ? this.min + "m " : "") + (this.sec + "s ");
		},
	};

	static fromJson(json) {
		return new Topic(json.name, json.color, json.position);
	}

	constructor(name, color, pos) {
		this.name = name;
		this.color = color;
		this.position = pos;
		this.printSelf();
	}

	printSelf() {
		this.el = document.createElement('div');
		this.el.classList.add("topic");
		this.el.setAttribute("onclick", `topics[${this.position}].click()`);
		this.el.style = `--data-color: ${this.color};`;
		this.el.innerHTML = `<p class="topic-name">${this.name}</p><p class="topic-duration"></p>`;
		list.insertBefore(this.el, hiddenItem);
	}

	click() {
		if (this.isActive) {
			this.isActive = false;
			this.el.classList.remove("active");
			clearTimeout(this.interval);
		}
		else {
			this.isActive = true;
			this.el.classList.add("active");
			clearTimeout(this.interval);
			this.interval = setInterval(this.count.bind(this), 1000);
		}
	}

	count() {
		this.time.increase();
		this.time.callback = () => canvas.draw(this.color);
		this.el.children[1].textContent = this.time.toString();
	}
}

/************************************************
 * Colors
*************************************************/

var colors = [
	"hsla(271, 70%, 40%, 1)",
	"hsla(271, 99%, 40%, 1)",
	"hsla(272, 85%, 50%, 1)",
	"hsla(202, 71%, 32%, 1)",
	"hsla(145, 63%, 32%, 1)",
	"hsla(29, 47%, 50%, 1)",
	"hsla(29, 100%, 46%, .5)",
	"hsla(324, 100%, 40%, .5)",
	"hsla(0, 0%, 20%, .5)",
];

function randomColor() {
	let i = Math.floor(Math.random() * colors.length);
	let c = colors[i];
	colors.splice(i, 1);
	return c;
}


/************************************************
 * Read / Write
*************************************************/

const autoSave = setInterval(saveData, 15 * 60 * 1000);;

readData();

function readData() {
	if (localStorage.timejs != null) {
		arr = JSON.parse(localStorage.timejs);
		for (let topic of arr) {
			topics.push(Topic.fromJson(topic));
		}
	}
	else { //first time
		topics.push(new Topic("Topic 1",  colors[5], topics.length));
		topics.push(new Topic("Topic 2",  colors[7], topics.length));
		topics.push(new Topic("Topic 3",  colors[3], topics.length));
	}
}

function saveData() {
	localStorage.setItem("timejs", JSON.stringify(topics));
}