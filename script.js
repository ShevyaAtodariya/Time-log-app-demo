var selectedRow = null;

function onAdd(){
    var data = readData();
    if(selectedRow == null){
        // if(data[stime].value == null || data[setime].value == null){
        //     alert("invalid");
        // }
        // else
            insertRecord(data);
    }
    else
        updateRecord(data);
    reset();
    difference(data);
}

function insertRecord(data){
    var table = document.getElementById("list").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.stime;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.etime;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = difference(data);
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.description;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML =  `<a onclick="onEdit(this)">Edit</a> &nbsp;
                        <a onClick="onDelete(this)">Delete</a>`;
}

function readData(){
    var data = {};
    data["stime"] = document.getElementById("stime").value;
    data["etime"] = document.getElementById("etime").value;
    data["description"] = document.getElementById("description").value;
    return data;
}

function reset(){
    document.getElementById("stime").value = "";
    document.getElementById("etime").value = "";
    document.getElementById("description").value = "";
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("stime").value = selectedRow.cells[0].innerHTML;
    document.getElementById("etime").value = selectedRow.cells[1].innerHTML;
    document.getElementById("description").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(data){
    selectedRow.cells[0].innerHTML = data.stime;
    selectedRow.cells[1].innerHTML = data.etime;
    selectedRow.cells[2].innerHTML = difference(data);   
    selectedRow.cells[3].innerHTML = data.description;
}

function onDelete(td){
    if(confirm("Are you sure you want to delete this record ?")){
        row = td.parentElement.parentElement;
        document.getElementById("list").deleteRow(row.rowIndex);
        reset();
    }
}

function difference(data){
    let flag = false;
    let shour = parseInt(data["stime"]);
    let smin = parseInt(data["stime"].split(":").slice(1));
    let smeridiem = data["stime"].split(" ").slice(1);

    let ehour = parseInt(data["etime"]);
    let emin = parseInt(data["etime"].split(":").slice(1));
    let emeridiem = data["etime"].split(" ").slice(1);

    // if(smeridiem == emeridiem){
    //     flag = true;
    //     console.log(flag);
    // }
    let diff = (ehour - shour) * 60 + (emin - smin);
    
    return diff;
}

// Issues with am pm difference are yet to resolve
// difference function running completely fine for same meridiem value
// wrong end time condition is yet to impliment
// validation for null entries is remaining
// footer functionalities are also remaining