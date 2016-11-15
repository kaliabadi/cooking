function addRecipe(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#addRecipe input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {

        var newUser = {
            'recipeName': $('#inputRecipeName').val(),
            'cookingTime': $('#inputCookingTime').val(),
            'ingredients': $('#inputIngredients').val(),
            'method': $('#inputMethod').val(),
        }

        $.ajax({
            type: 'POST',
            data: newUser,
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
