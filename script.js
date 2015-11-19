function save() {
        var newi = document.getElementsByClassName("newiLbl");
        var i;
        for (i = 0; i < newi.length; i++) {
            newi[i].innerText = '';
            newi[i].title = "";
        }
		var listData = document.getElementById('todoList').innerHTML;
		localStorage.setItem('list', listData);
		alert("List Saved.");
}

function removeAll() {
		document.getElementById('todoList').innerHTML = "";
		localStorage.removeItem('list');
}

function removeSel() {
    var chks = document.getElementsByClassName("cheks");
    var i;
    for (i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            var liId = chks[i].id.replace("chk_", "");
            var li = document.getElementById("li_" + liId);
            var ul = li.parentElement;
            ul.removeChild(li);
        }
    }
    save();
}

function updateItemStatus() {
    var chkId = this.id.replace("chk_", "");
    var span = document.getElementById("itm_" + chkId);
    if(this.checked) {
        span.className = "checked";
    } else {
        span.className = "";
    }
    var newi = document.getElementById("newi_" + chkId);
    newi.innerText = '*';
    newi.title = "Item unsaved.";
}

function rnmItem() {
    var rnmId = this.id.replace("rnm_", "");
    var span = document.getElementById("itm_" + rnmId);
    var oldText = span.innerText;

    var newText = prompt("Please enter new item text!");

    if (newText == null || newText.trim() == "" || oldText.trim() == newText.trim()) {
    } else {
        span.innerText = newText;
        var newi = document.getElementById("newi_" + rnmId);
        newi.innerText = '*';
        newi.title = "Item unsaved.";
    }

}

function load() {
    var storedValue = localStorage.getItem('list');
    if(storedValue) {
        document.getElementById('todoList').innerHTML = storedValue;
    }
    var newi = document.getElementsByClassName("newiLbl");
    var chks = document.getElementsByClassName("cheks");
    var rnm = document.getElementsByClassName("rnmBtn");
    var i;
    for (i = 0; i < chks.length; i++) {
        chks[i].onclick = updateItemStatus;
        rnm[i].onclick = rnmItem;
        newi[i].innerText = '';
        newi[i].title = "";
    }
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

        var rnm = document.createElement("button");
        rnm.id = "rnm_" + totalItems;
        rnm.className ="rnmBtn";
        rnm.onclick = rnmItem;
        rnm.title = "Rename the item.";

        var newi = document.createElement("label");
        newi.id = "newi_" + totalItems;
        newi.className ="newiLbl";
        newi.innerText = '*';
        newi.title = "Item unsaved.";

        var img = document.createElement("img");
        img.text = "Rename";
        img.src = "pen.png";
        img.height="13";
        img.width="13";
        rnm.appendChild(img);

        li.appendChild(rnm);
        li.appendChild(chk);
        li.appendChild(span);
        li.appendChild(newi);
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