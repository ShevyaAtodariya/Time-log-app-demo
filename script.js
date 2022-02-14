// script file for time log app

function onAdd(){
    var data = readData();
    var table = document.getElementById("list").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.stime;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.etime;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.description;
    cell6 = newRow.insertCell(4);
    cell6.innerHTML =  `<a onclick="onEdit(this)">Edit</a> &nbsp;
                        <a onClick="onDelete(this)">Delete</a>`;
}

function readData(){
    var data = {};
    data["stime"] = document.getElementById("stime").value;
    data["etime"] = document.getElementById("etime").value;
    data["description"] = document.getElementById("description").value;
    return data;
}