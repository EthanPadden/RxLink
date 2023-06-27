
$(document).ready(function() {
    $('#btn-submit').click(function(event){
        event.preventDefault();

        // Get the values of the email and password inputs
        var email = $('#ip-login-email').val();
        var password = $('#ip-login-psw').val();
        var isPharmacy = $('#check-is-pharmacy').prop('checked');

        // Log the values to the console
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Pharmacy?:', isPharmacy);
   
        $.ajax({
            type: 'POST',
            url: '/account/login',
            data: {
                email, password, isPharmacy
            },
            success: function(data, textStatus, jqXHR){
                console.log(jqXHR.status);
            },
            error: function(errMsg) {
                console.log(errMsg);
            }
        });
    });

    $('#btn-register-pharmacy').click(() => {
        window.location.href = '/pharmacy/registration';
    })
    $('#btn-register-patient').click(() => {
        window.location.href = '/patient/registration';
    })
});
