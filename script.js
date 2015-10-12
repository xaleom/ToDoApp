function save() {
		var listData = document.getElementById('todoList').innerHTML;
		localStorage.setItem('list', listData);
		alert("List Saved.");
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

function updateItemStatus() {
    var chkId = this.id.replace("chk_", "");
    var span = document.getElementById("itm_" + chkId);
    if(this.checked) {
        span.className = "checked";
    } else {
        span.className = "";
    }
}

function delItem() {
    var btnId = this.id.replace("del_", "");
    var li = document.getElementById("li_" + btnId);
    var ul = li.parentElement;
    ul.removeChild(li);
    localStorage.setItem('list', ul.innerHTML);
    alert("Item deleted, List saved.");
}

function newItem(ul, itmText) {
	if (itmText.trim() != "") {
        totalItems++;
		var li = document.createElement("li");
        li.id = "li_" + totalItems;
        var chk = document.createElement("input");
        chk.type = "checkbox";
        chk.id = "chk_" + totalItems;
        chk.onclick = updateItemStatus;
        var span = document.createElement("span");
        span.id = "itm_" + totalItems;
        span.innerText = itmText;

        var del = document.createElement("button");
        del.id = "del_" + totalItems;
        del.onclick = delItem;

        var img = document.createElement("img");
        img.text = "Delete";
        img.src = "delete.png";
        del.appendChild(img);

        li.appendChild(del);
        li.appendChild(chk);
        li.appendChild(span);
		ul.appendChild(li);
	} else { alert('Please provide item.');}
}

var totalItems = 0;
var btnNewItem = document.getElementById('addNewItem');
btnNewItem.onclick = function() {
    var inp = document.getElementById('newItem');
    newItem(document.getElementById('todoList'), inp.value);
    inp.value = "";
};