//$(".login").submit(function (e) {
//    e.preventDefault();
//    let login = new Object();

//    login.Email = $("input[name='email']").val();
//    login.Password = $("input[name='password']").val();

//    $.ajax({
//        type: "POST",
//        url: "login/login/",
//        data: login,
//        success: function (result) {
//            console.log("Success", JSON.stringify(login))
//            console.log(result)
//            switch (result.status) {
//                case 200:
//                    window.location.replace("../account/")
//                    break;
//                default:
//                    Swal.fire({
//                        icon: 'error',
//                        title: 'Oops...',
//                        text: 'Wrong Email or Password',
//                    })
//            }
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            console.log("Failed", JSON.stringify(login))
//            console.log("Failed", XMLHttpRequest, textStatus, errorThrown)
//        }
//    });
//    console.log(login)
//});

function login() {
    let data = new Object();
    data.Email = $("#inputName").val();
    data.Password = $("#inputPassword").val();

    console.log(data)

    $.ajax({
        url: `https://localhost:7213/api/Account/Login`,
        method: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (result) {
            //$.cookie('token', result.token)
            sessionStorage.setItem("token", result.token);
            console.log(result.token);
            //console.log($.cookie('token))
            window.location.replace("../Department/Index")
        }
    })
}