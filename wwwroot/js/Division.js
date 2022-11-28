$(document).ready(function () {
    $('#tableDivision').DataTable({
        ajax: {
            url: 'https://localhost:7213/api/Division',
            dataSrc: 'data',
            "headers": {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            "type": "GET"
        },
        columns: [
            { data: 'id', },
            { data: 'name', },
            {
                data: null,
                "render": function (data, type, row, meta) {
                    return `<button type= "button" data-bs-toggle="modal" data-bs-target="#detailModalDivision" onclick="detailDivision('${data.id}')" class= "btn btn-primary">Detail</button>
                    <button type= "button" data-bs-toggle="modal" data-bs-target="#editdataDivision" onclick="editDivision('${data.id}')" class= "btn btn-primary">Edit</button>
                    <button type= "button" onclick="deleteDivision('${data.id}')" class= "btn btn-danger">Hapus</button>`;
                }
            }
        ],
        dom: 'Bfrtip',
        buttons: ['colvis',
            'excelHtml5',
            'pdfHtml5'
        ],
    });
});

function detailDivision(id) {
    $.ajax({
        url: `https://localhost:7213/api/Division/${id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp += `
             <input type="hidden" class="form-control" id="hideId" readonly placeholder"" value="0">
             <h5>ID: <h5><input type="text" class="form-control" id=divId" placeholder="${res.data.id}" value="${res.data.id}" readonly>
             <h5>Nama: <h5><input type="text" class="form-control" id=divName placeholder="${res.data.name}" value="${res.data.name}"> readonly`;
        $("#detailData").html(temp);
        console.log(res.data.id);
    }).fail((err) => {
        console.log(err);
    });
}

function editDivision(id) {
    $.ajax({
        url: `https://localhost:7213/api/Division/${id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp += `
            <input type="hidden" class="form-control" id="hideId" readonly placeholder="" value="0">
            <p>Id: </p><input type="text" class="form-control" id="divId" placeholder="${res.data.id}" value="${res.data.id}" readonly>
            <p>Name: </p><input type="text" class="form-control" id="divisionName" placeholder="${res.data.name}" value="${res.data.name}">
            <button type= "button" class= "btn-primary" id= "editButton" onclick="saveDivision('${res.data.id}')">Save Changes</button>
            `;
        $("#editData").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}

function saveDivision(id) {
    var Id = id;
    var Name = $('#divisionName').val();

    var result = { Id, Name};
    $.ajax({
        url: `https://localhost:7213/api/Division`,
        type: "PUT",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(result),
        success: function () {
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            ); setTimeout(function () {
                location.reload();
            }, 2000);
        },
        error: function () {

        }
    });
}

function createDivision() {
    let data;
    let id = 0;
    let name = $('#createDataName').val()

    data = {
        "id": id,
        "name": name,
    };

    $.ajax({
        url: `https://localhost:7213/api/Division`,
        type: 'POST',
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (datas) {
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            ); setTimeout(function () {
                location.reload();
            }, 2000);
        }
    });
}