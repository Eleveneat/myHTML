window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}
function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTablesSortable(tables) {
	for (var i = tables.length - 1; i >= 0; i--) {
		var ths = tables[i].getElementsByTagName('th');
		for (var foo = ths.length - 1; foo >= 0; foo--) {
			ths[foo].addEventListener('click', toSort_ascending)
		}
	}
}
function reset_Other_Th(ths) {
	for (var i = ths.length - 1; i >= 0; i--) {
		ths[i].style.backgroundColor = "rgba(3, 12, 110, 1)";
		ths[i].style.backgroundImage = "";
		ths[i].removeEventListener('click', toSort_descending);
		ths[i].addEventListener('click',toSort_ascending);
	}
}
function toSort_ascending(event) {
	var table = this.parentNode.parentNode.parentNode;
	//alert(table.nodeName);
	var ths = table.getElementsByTagName('th');
	reset_Other_Th(ths);
	this.removeEventListener('click', toSort_ascending);
	this.style.backgroundColor = "rgba(150, 156, 255, 1)";
	this.style.backgroundImage = "url(ascend.png)";
	this.style.backgroundRepeat = "no-repeat";
	this.style.backgroundPosition = "top right";
	this.addEventListener('click', toSort_descending);
}
function toSort_descending(event) {
	this.removeEventListener('click', toSort_descending);
	this.style.backgroundImage = "url(descend.png)";
	this.style.backgroundPosition = "top right";
	this.addEventListener('click',toSort_ascending);
}