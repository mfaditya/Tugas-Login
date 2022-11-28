$(document).ready(function () {
    $('#tableDepartment').DataTable({
        ajax: {
            url: 'https://localhost:7213/api/Department',
            type: "GET",
            dataSrc: 'data',
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem("token")
            },
        },
        columns: [
            { data: 'id', },
            { data: 'name', },
            { data: 'divisionId', },
            {
                data: null,
                "render": function (data, type, row, meta) {
                    return `<button type= "button" data-bs-toggle="modal" data-bs-target="#detailModalDepart" onclick="detailDepartment('${data.id}')" class= "btn btn-primary">Detail</button>
                    <button type= "button" data-bs-toggle="modal" data-bs-target="#editdataDepartment" onclick="editDepartment('${data.id}')" class= "btn btn-primary">Edit</button>
                    <button type= "button" onclick="deleteDepartment('${data.id}')" class= "btn btn-danger">Hapus</button>`;
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

function detailDepartment(id) {
    $.ajax({
        url: `https://localhost:7213/api/Department/${id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp += `
             <input type="hidden" class="form-control" id="hideId" readonly placeholder"" value="0">
             <h5>ID: <h5><input type="text" class="form-control" id=departId" placeholder="${res.data.id}" value="${res.data.id}" readonly>
             <h5>Nama: <h5><input type="text" class="form-control" id=departName placeholder="${res.data.name}" value="${res.data.name}" readonly>
             <h5>Division ID: <h5><input type="text" class="form-control" id=departName placeholder="${res.data.divisionId}" value="${res.data.divisionId}" readonly>`;
        $("#detailData").html(temp);
        console.log(res.data.id);
    }).fail((err) => {
        console.log(err);
    });
}

function editDepartment(id) {
    $.ajax({
        url: `https://localhost:7213/api/Department/${id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp +=`
            <input type="hidden" class="form-control" id="hideId" readonly placeholder="" value="0">
            <p>Id: </p><input type="text" class="form-control" id="departId" placeholder="${res.data.id}" value="${res.data.id}" readonly>
            <p>Name: </p><input type="text" class="form-control" id="departmentName" placeholder="${res.data.name}" value="${res.data.name}">
            <p>Division Id: </p><input type="text" class="form-control" id="departmentDivisionId" placeholder="${res.data.divisionId}" value="${res.data.divisionId}">
            <button type= "button" class= "btn-primary" id= "editButton" onclick="saveDepartment('${res.data.id}')">Save Changes</button>
            `;
        $("#editData").html(temp);
    }).fail((err) => {
    console.log(err);
    });
}

function saveDepartment(id) {
    var Id = id;
    var Name = $('#departmentName').val();
    var DivisionId = parseInt($('#departmentDivisionId').val());

    var result = { Id, Name, DivisionId };
    $.ajax({
        url: `https://localhost:7213/api/Department`,
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

function deleteDepartment(id) {
    var hapus = confirm("Are You Sure ?");
    if (hapus) {
        $.ajax({
            url: `https://localhost:7213/api/Department?id=${id}`,
            type: "DELETE", 
            contentType: "application/json",
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
}

function createDepartment() {
    let data;
    let id = 0;
    let name = $('#createDataName').val()
    let DivisionId = $('#CreateDivisionId').val()

    data = {
        "id": id,
        "name": name,
        "divisionId": DivisionId,
    };

    $.ajax({
        url: `https://localhost:7213/api/Department`,
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

//function chartDepartment() {
//    $.ajax({
//        url: 'https://localhost:7213/api/Department'
//    }).done((res) => {
//        let labels = [];
//        labels.push(res.data.divisionId);

//        const config = {
//            type: 'pie',
//            data: data,
//        };

//        const data = {
//            labels: labels;
//            datasets: [{
//                label: '',
//                data: labels,
//                backgroundColor: [
//                    'rgb(252, 116, 101)',
//                    'rgb(54, 162, 235)',
//                    'rbg(255, 205, 86)'
//                ],
//                hoverOffset: 4
//            }]
//        };
//        $("#pieChart").html(data);
//    }).fail((err) => {
//        console.log(err);
//    });
//}