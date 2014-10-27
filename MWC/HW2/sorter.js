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

function tr_Exchang(tds_1, tds_2) {
	var len = tds_1.length;
	for (var i = 0; i < len; i++) {
		var tmp = tds_1[i].firstChild.nodeValue;
		tds_1[i].firstChild.nodeValue = tds_2[i].firstChild.nodeValue;
		tds_2[i].firstChild.nodeValue = tmp;
	}
}

function toSort_ascending(event) {
	var sortedTable = this.parentNode.parentNode.parentNode;
	var ths = sortedTable.getElementsByTagName('th');
	reset_Other_Th(ths);


	var th_pos = -1;
	for (var i = 0; i < ths.length; i++) {
		if (ths[i].firstChild.nodeValue == this.firstChild.nodeValue)
			th_pos = i;
	}


	var trs = sortedTable.getElementsByTagName('tr');
	for (var j = 1; j < trs.length-1; j++) {
		for (var i = 1; i < trs.length-j; i++) {
			var tdsOfTr_1 = trs[i].getElementsByTagName('td');
			var tdsOfTr_2 = trs[i+1].getElementsByTagName('td');
			if (tdsOfTr_1[th_pos].firstChild.nodeValue > tdsOfTr_2[th_pos].firstChild.nodeValue) {
				tr_Exchang(tdsOfTr_1, tdsOfTr_2);
			}
		}
	}

	this.removeEventListener('click', toSort_ascending);
	this.style.backgroundColor = "rgba(150, 156, 255, 1)";
	this.style.backgroundImage = "url(ascend.png)";
	this.style.backgroundRepeat = "no-repeat";
	this.style.backgroundPosition = "top right";
	this.addEventListener('click', toSort_descending);
}
function toSort_descending(event) {
	var sortedTable = this.parentNode.parentNode.parentNode;
	var ths = sortedTable.getElementsByTagName('th');


	var th_pos = -1;
	for (var i = 0; i < ths.length; i++) {
		if (ths[i].firstChild.nodeValue == this.firstChild.nodeValue)
			th_pos = i;
	}


	var trs = sortedTable.getElementsByTagName('tr');
	for (var j = 1; j < trs.length-1; j++) {
		for (var i = 1; i < trs.length-j; i++) {
			var tdsOfTr_1 = trs[i].getElementsByTagName('td');
			var tdsOfTr_2 = trs[i+1].getElementsByTagName('td');
			if (tdsOfTr_1[th_pos].firstChild.nodeValue < tdsOfTr_2[th_pos].firstChild.nodeValue) {
				tr_Exchang(tdsOfTr_1, tdsOfTr_2);
			}
		}
	}

	this.removeEventListener('click', toSort_descending);
	this.style.backgroundImage = "url(descend.png)";
	this.style.backgroundPosition = "top right";
	this.addEventListener('click',toSort_ascending);
}