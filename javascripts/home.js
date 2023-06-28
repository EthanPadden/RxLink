$(document).ready(function() {
    var cookiesNotSet = (document.cookie == null || document.cookie == undefined || document.cookie.length == 0);
    if(cookiesNotSet) window.location.href = '/login';
    else $('#info-user').text(document.cookie);

    $('#btn-logout').click(() => {
        if(cookiesNotSet) window.location.href = '/login';
        else {
            $.ajax({
                type: 'GET',
                url: '/logout',
                success: function (data, textStatus, jqXHR) {
                    cookiesNotSet = (document.cookie == null || document.cookie == undefined || document.cookie.length == 0);
                    
                    if (cookiesNotSet) window.location.href = '/login';
                    else  $('#info-user').text('Error logging out: ' + document.cookie);
                },
                error: function (errMsg) {
                    $('#info-user').text('Error: ' + errMsg.responseJSON.error);
                },
            });
        }
    });
});
