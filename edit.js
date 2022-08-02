const btnNew = document.getElementById("btn-new");
const modalNew = new Modal("modal-new");
modalNew.inputTitle = document.getElementById("input-new-title");
modalNew.save = document.getElementById("btn-new-save");
modalNew.save.addEventListener("click", e => {
	let title = modalNew.inputTitle.value.trim();
	topics.push(new Topic(title, randomColor(), topics.length));
	saveData();
	modalNew.hide()
});
btnNew.addEventListener("click", e => modalNew.show());