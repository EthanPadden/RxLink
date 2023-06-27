$(document).ready(function() {
    $('#btn-register-pharmacy').click(() => {
        window.location.href = '/pharmacy/registration';
    })
    $('#btn-login').click(() => {
        window.location.href = '/login';
    })

    $('#btn-submit').click(function(event){
        event.preventDefault();

        var email = $('#ip-login-email').val();
        var password = $('#ip-login-psw').val();
        var name = $('#ip-login-name').val();
   
        $.ajax({
            type: 'POST',
            url: '/account/patient/register',
            data: {
                email, password, name
            },
            success: function(data, textStatus, jqXHR){
                console.log(jqXHR.status);
            },
            error: function(errMsg) {
                console.log(errMsg);
            }
        });
    });
});
