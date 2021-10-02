// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function fileValidation() {
    var fileInput = document.getElementById('myFile');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.csv)$/i;

    if (!allowedExtensions.exec(filePath)) {
        document.getElementById("p1").innerHTML = "Invalid file type only .csv file will support";
        fileInput.value = '';
        return false;
    }
}



function newDoc() {
    var flag = 0;
    var fileUpload = document.getElementById("myFile");
    var reader = new FileReader();
    reader.onload = function (e) {
        var rows = e.target.result.split("\n");
        var header = ["medicationId", "nature", "expiryDate", "comment"]
        var letters = /[^A-Za-z0-9]+/;
        var medicationIdArr = [];
        var errorMsg = "";
        for (var i = 1; i < rows.length; i++) {
            if (rows.length > 50) {
                errorMsg = "more than 50 elements can't be insert";
                flag = 1;
                break;
            }
            var cells = rows[i].split(",");
            var headercolu = rows[0].split(",");
            var today = new Date();
            var inputDate = new Date(cells[2])
            if (rows[0] !== header && headercolu.length > 4) {
                errorMsg = "invalid header values";
                flag = 1;
                break;
            }
            else if (cells[0] == " " && cells[1] == " ") {
                errorMsg = "medicationId should not be empty";
                flag = 1;
                break;
            }
            else if (cells[0].match(letters)) {
                errorMsg = "medicationId should not use special character";
                flag = 1;
                break;
            }
            else if(medicationIdArr.indexOf(cells[0]) > -1) {
                errorMsg = "medicationId cannot have duplicate values";
                flag = 1;
                break;
            }
            else if (inputDate < today) {
                errorMsg = "date formate should be in dd-mm-yyyy or Date expired";
                flag = 1;
                break;
            }
            medicationIdArr.push(cells[0]);
        }
        if(flag == 0) {
            document.getElementById("p1").innerHTML = "correct";
            var x = document.createElement("TABLE");
            x.setAttribute("id", "myTable");
            x.setAttribute("border", "1");
            document.body.appendChild(x);
            for (var i = 0; i < rows.length; i++) {
                var status = rows[i] + ",NEW";
                var y = document.createElement("TR");
                y.setAttribute("id", "myTr");

                document.getElementById("myTable").appendChild(y);
                console.table("New");
                console.log(status);

                var t = document.createElement("TD");
                t.appendChild(document.createTextNode(status));
                y.appendChild(t);

                

            }
        }
        else {
            document.getElementById("p1").innerHTML = errorMsg;
        }
    }
    reader.readAsText(fileUpload.files[0]);
}
