function save() {
		var listData = document.getElementById('todoList').innerHTML;
		localStorage.setItem('list', listData);
		alert("List Saved.");
}

function remove() {
		document.getElementById('todoList').innerHTML = "";
		localStorage.removeItem('list');
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

function load() {
    var storedValue = localStorage.getItem('list');
    if(storedValue) {
        document.getElementById('todoList').innerHTML = storedValue;
    }

    var chks = document.getElementsByClassName("cheks");
    var dels = document.getElementsByClassName("delBtn");
    var i;
    for (i = 0; i < chks.length; i++) {
        chks[i].onclick = updateItemStatus;
        dels[i].onclick = delItem;
    }
}

function delItem() {
    var btnId = this.id.replace("del_", "");
    var li = document.getElementById("li_" + btnId);
    var ul = li.parentElement;
    ul.removeChild(li);
}

function newItem(ul, itmText) {

    var spans = document.getElementsByTagName("span");
    var c;
    for (c = 0; c < spans.length; c++) {
        if (itmText.trim() == spans[c].innerText.trim()) {
            alert("Item already exists.");
            return;
        }
    }

	if (itmText.trim() != "") {
        totalItems++;
		var li = document.createElement("li");
        li.id = "li_" + totalItems;
        var chk = document.createElement("input");
        chk.type = "checkbox";
        chk.id = "chk_" + totalItems;
        chk.onclick = updateItemStatus;
        chk.className = "cheks";
        chk.title = "Check to mark item completed.";

        var span = document.createElement("span");
        span.id = "itm_" + totalItems;
        span.innerText = itmText;

        var del = document.createElement("button");
        del.id = "del_" + totalItems;
        del.className ="delBtn";
        del.onclick = delItem;
        del.title = "Delete the item from the list. Must click Save to update local storage.";

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