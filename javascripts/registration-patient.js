$(document).ready(function() {
    $('#btn-register-pharmacy').click(() => {
        window.location.href = '/pharmacy/registration';
    })
    $('#btn-login').click(() => {
        window.location.href = '/login';
    })

    $('#btn-submit').click(function(event){
        event.preventDefault();

        var email = $('#ip-registration-patient-email').val();
        var password = $('#ip-registration-patient-psw').val();
        var name = $('#ip-registration-patient-name').val();
   
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
                url: '/account/patient/register',
                data: {
                    email, password, name
                },
                success: function (data, textStatus, jqXHR) {
                    if (jqXHR.status == 200) {
                        console.log(data.name)
                        $('#reg-msg').text('Logged in as: ' + data.result.name);
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
