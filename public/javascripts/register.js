function registerUser(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#userDetails input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {

        var userDetails = {
            'username': $('#inputUsername').val(),
            'firstname': $('#inputFirstname').val(),
            'lastname': $('#inputLastname').val(),
            'password': $('#inputPassword').val()
        };

        $.ajax({
            type: 'POST',
            data: userDetails,
            url: '/register',
            dataType: 'JSON'
        }).done();
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
}

function login(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#loginDetails input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {

        var userDetails = {
            'username': $('#inputUsername').val(),
            'firstname': $('#inputFirstname').val()
        };

        $.ajax({
            type: 'POST',
            data: userDetails,
            url: '/login',
            dataType: 'JSON'
        }).done();
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
}