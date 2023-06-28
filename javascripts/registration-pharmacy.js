$(document).ready(function() {
    $('#btn-register-patient').click(() => {
        window.location.href = '/patient/registration';
    })
    $('#btn-login').click(() => {
        window.location.href = '/login';
    })

    $('#btn-submit').click(function(event){
        event.preventDefault();

        var email = $('#ip-registration-pharmacy-email').val();
        var password = $('#ip-registration-pharmacy-psw').val();
        var name = $('#ip-registration-pharmacy-name').val();


        if (email == null || email == undefined || email.length == 0)
            $('#reg-msg').text('Please enter an email');
        else if (
            password == null ||
            password == undefined ||
            password.length == 0
        )
            $('#reg-msg').text('Please enter a password');
        else if (name == null || name == undefined || name.length == 0)
            $('#reg-msg').text('Please enter a name');
        else {
            $.ajax({
                type: 'POST',
                url: '/account/pharmacy/register',
                data: {
                    email,
                    password,
                    name,
                },
                success: function (data, textStatus, jqXHR) {
                    if (jqXHR.status == 200) {
                        window.location.href = '/';
                    } else {
                        $('#reg-msg').text('Error: ' + data.error);
                    }
                },
                error: function (errMsg) {
                    $('#reg-msg').text('Error: ' + errMsg.responseJSON.error);
                },
            });
        }
    });
});
