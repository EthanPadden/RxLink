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
    });
});
