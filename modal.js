class Modal {
	el;

	constructor(id) {
		if (id) this.el = document.getElementById(id);
        else this.el = getElementsByClassName("modal")[0];
        this.el.addEventListener("click", e => this.hide());
        this.el.getElementsByClassName("modal-close")[0].addEventListener("click", e => this.hide());
        this.el.getElementsByClassName("modal-content")[0].addEventListener("click", e => e.stopPropagation());
	}

    show() {
        document.body.classList.add("preventScroll");
        document.documentElement.classList.add("preventScroll");
        this.el.classList.add("show");
    }

    hide() {
    	document.body.classList.remove("preventScroll");
        document.documentElement.classList.remove("preventScroll");
        this.el.classList.remove("show");
    }
}