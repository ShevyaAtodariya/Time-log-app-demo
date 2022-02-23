var selectedRow = null;
var rowIndex = 0;
display();

function onAdd() {
  var data = readData();
  if (validate(data)) {
    if (selectedRow == null) {
      insertRecord(data);
    } else {
      updateRecord(data);
    }
    reset();
    location.reload();
  }
}

function insertRecord(data) {
  if (difference(data) < 0) {
    alert("Wrong End Time!!!");
    reset();
  } else {
    let entries = new Array();
    entries = JSON.parse(localStorage.getItem("record"))
      ? JSON.parse(localStorage.getItem("record"))
      : [];
    entries.push({
      Id: indexOf(),
      Start_Time: data["stime"],
      End_Time: data["etime"],
      Minutes: difference(data),
      Task_Description: data["description"],
    });
    localStorage.setItem("record", JSON.stringify(entries));
  }
}

function indexOf() {
  var table = document.getElementById("list");
  var tl = table.rows.length;
  return tl;
}

function display() {
  var table = document.getElementById("list").getElementsByTagName("tbody")[0];
  let allEntries = localStorage.getItem("record");
  if (allEntries == null) {
    entries = [];
  } else {
    entries = JSON.parse(allEntries);
    document.getElementById("noData").style.display = "none";
    entries.forEach((item, index) => {
      var newRow = table.insertRow(table.length);

      cell1 = newRow.insertCell(0);
      cell1.innerHTML = entries[index].Start_Time;
      cell2 = newRow.insertCell(1);
      cell2.innerHTML = entries[index].End_Time;
      cell3 = newRow.insertCell(2);
      cell3.innerHTML = entries[index].Minutes;
      cell4 = newRow.insertCell(3);
      cell4.innerHTML = entries[index].Task_Description;
      cell5 = newRow.insertCell(4);
      cell5.innerHTML = `
                            <a onclick="onEdit(this)">Edit</a> &nbsp;
                            <a onClick="onDelete(this)">Delete</a>`;
      cell6 = newRow.insertCell(5);
      cell6.innerHTML = index + 1;
      cell6.style.display = "none";
    });
    total();
  }
}

function readData() {
  var data = {};
  data["stime"] = document.getElementById("stime").value;
  data["etime"] = document.getElementById("etime").value;
  data["description"] = document.getElementById("description").value;
  return data;
}

function reset() {
  document.getElementById("stime").value = "";
  document.getElementById("etime").value = "";
  document.getElementById("description").value = "";
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("stime").value = selectedRow.cells[0].innerHTML;
  document.getElementById("etime").value = selectedRow.cells[1].innerHTML;
  document.getElementById("description").value = selectedRow.cells[3].innerHTML;
  rowIndex = selectedRow.cells[5].innerHTML;
}

function updateRecord(data) {
  entries = JSON.parse(localStorage.getItem("record"));
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].Id == rowIndex) {
      entries[i].Start_Time = document.getElementById("stime").value;
      entries[i].End_Time = document.getElementById("etime").value;
      entries[i].Minutes = difference(data);
      entries[i].Task_Description =
        document.getElementById("description").value;
    }
  }
  localStorage.setItem("record", JSON.stringify(entries));
}

function onDelete(td) {
  if (confirm("Are you sure you want to delete this record ?")) {
    entries = JSON.parse(localStorage.getItem("record"));
    selectedRow = td.parentElement.parentElement;
    rowIndex = selectedRow.cells[5].innerHTML;
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].Id == rowIndex) {
        entries.splice(i, 1);
        location.reload();
        break;
      }
    }
    for (let i = rowIndex - 1; i < entries.length; i++) {
      entries[i].Id = entries[i].Id - 1;
    }
    localStorage.setItem("record", JSON.stringify(entries));
  }
}

function difference(data) {
  let shour = parseInt(data["stime"]);
  let smin = parseInt(data["stime"].split(":").slice(1));
  var smeridiem = data["stime"].split(" ").slice(1);

  let ehour = parseInt(data["etime"]);
  let emin = parseInt(data["etime"].split(":").slice(1));
  var emeridiem = data["etime"].split(" ").slice(1);

  let diff = 0;

  var regex = new RegExp("^" + smeridiem);
  if (!regex.test(emeridiem)) {
    diff = diff + 720;
  }

  diff = diff + ((ehour - shour) * 60 + (emin - smin));
  return diff;
}

function validate(data) {
  var st = data["stime"];
  var et = data["etime"];
  var td = data["description"];

  if (st === "") {
    alert("Enter Start Time!");
    return false;
  } else if (et === "") {
    alert("Enter End Time!");
    return false;
  } else if (td === "") {
    alert("Enter Task Description!");
    return false;
  } else {
    return true;
  }
}

function takeShot() {
  let div = document.getElementById("photo");
  html2canvas(div).then(function (canvas) {
    document.getElementById("output").appendChild(canvas);
  });
}

function total() {
  var table = document.getElementById("list"),
    tm = 0,
    th = 0;
  for (var i = 1; i < table.rows.length; i++) {
    tm = tm + parseInt(table.rows[i].cells[2].innerHTML);
  }
  th = tm / 60;
  document.getElementById("totalM").innerHTML = tm;
  document.getElementById("totalH").innerHTML = th;
}
