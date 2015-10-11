function save() {
		var listData = document.getElementById('todoList').innerHTML;
		localStorage.setItem('list', listData);
		window.alert("List Saved.");
}

function remove() {
		document.getElementById('todoList').innerHTML = "";
		localStorage.removeItem('list');
}

function load() {
		var storedValue = localStorage.getItem('list');
		if(storedValue) {
				document.getElementById('todoList').innerHTML = storedValue;
		}
}


//<li>Test <button type="button" name="delete" onclick="delete()" ><img src="delete.png" /></button></li>
function newItem() {
	var inp = document.getElementById('newItem');
	if (inp.value != "") {
		var ul = document.getElementById("todoList");
		var li = '<li><button type="button" name="delete" id="" + 'onclick="delete()" ><img src="delete.png" /></button>' + inp.value + '</li>';
		ul.innerHTML += li;
		inp.value = "";
	}
}