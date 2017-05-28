function getCookie(name, next) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        next(parts.pop().split(";").shift());
    }
}

function addRecipe(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#addRecipe input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {

        var userID = "";

        getCookie('cookinguser', function(cookieId) {
            userID = decodeURIComponent(cookieId);
        });

        var newRecipe = {
            'recipeName': $('#inputRecipeName').val(),
            'cookingTime': $('#inputCookingTime').val(),
            'ingredients': $('#inputIngredients').val(),
            'method': $('#inputMethod').val(),
            'userID': userID.valueOf()
        };

        $.ajax({
            type: 'POST',
            data: newRecipe,
            url: '/documents/adddocument',
            dataType: 'JSON'
        }).done(function( response ) {

            if (response.msg === '') {
                $('#addRecipe fieldset input').val('');
                populateTable();
            }
            else {
               alert('Error: ' + response.msg);
            }
        });
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
};

function deleteRecipe(event) {
    event.preventDefault();

    var confirmation = confirm('Are you sure you want to delete this user?');

    if (confirmation === true) {
        $.ajax({
            type: 'DELETE',
            url: '/documents/deletedocument/' + $(this).attr('rel')
        }).done(function( response ) {

            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            populateTable();
        });
    } else {
        return false;
    }
};
