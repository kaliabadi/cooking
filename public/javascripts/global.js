var documentListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    populateTable();

    $('#documentList table tbody').on('click', 'td a.linkshowrecipedetails', showRecipeDetails);
    
    $('#btnAddRecipe').on('click', addRecipe);

    $('#documentList table tbody').on('click', 'td a.linkdeleterecipe', deleteRecipe);

    $('#btnSearch').on('click', addShownClass);

    $('#btnSearch').on('click', searchHttp);
});

function addShownClass() {
    $('.searchList').addClass('shown');
};

function populateTable() {

    var tableContent = '';

    $.getJSON( '/documents/documentlist', function( data ) {
        documentListData = data;

        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowrecipedetails" rel="' + this.recipeName + '">' + this.recipeName + '</a></td>';
            tableContent += '<td>' + this.cookingTime + '</td>';
            tableContent += '<td><a href="#" class="linkdeleterecipe" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        $('#documentList table tbody').html(tableContent);
    });
};

function showRecipeDetails(event) {

    event.preventDefault();

    var thisRecipeName = $(this).attr('rel');

    var arrayPosition = documentListData.map(function(arrayItem) { 
        return arrayItem.recipeName;
    }).indexOf(thisRecipeName);

    var thisRecipeObject = documentListData[arrayPosition];

    $('#recipeInfoName').text(thisRecipeObject.recipeName);
    $('#recipeInfoCookingTime').text(thisRecipeObject.cookingTime);
    $('#recipeInfoIngredients').text(thisRecipeObject.ingredients);
    $('#recipeInfoSomething').text(thisRecipeObject.something);

    $('#recipeDetails').removeClass('hidden');
    $('#recipeDetails').addClass('active');
};

function searchHttp(event) {
    var tableContent = '';

    var query = $('#inputSearchQuery').val();

    $.getJSON( '/documents/documentlist/' + query, function( data ) {
        $.each(data, function() {
            tableContent += '<tr>';
            tableContent += '<td><a href="' + this.recipeName + '" class="linkshowrecipedetails" rel="something">' + this.recipeName + '</a></td>';
            tableContent += '</tr>';
        });
        $('.searchList table tbody').html(tableContent);
    });
    
    $.getJSON( '/documents/recipesearch/' + query, function( data ) {
        $.each(data.parsed, function() {
            tableContent += '<tr>';
            tableContent += '<td><a href="' + this.source_url + '" class="linkshowrecipedetailss" rel="' + this.title + '">' + this.title + '</a><img src="' + this.image_url + '"></img></td>';
            tableContent += '</tr>';
        });
        $('.searchList table tbody').html(tableContent);
    });
};

function addRecipe(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#addRecipe input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {

        var newUser = {
            'recipeName': $('#addRecipe fieldset input#inputRecipeName').val(),
            'cookingTime': $('#addRecipe fieldset input#inputCookingTime').val(),
            'ingredients': $('#addRecipe fieldset input#inputIngredients').val(),
            'something': $('#addRecipe fieldset input#inputSomeOtherShit').val(),
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

    }
    else {
        return false;

    }

};

function registerUser(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#userDetails input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    console.log('outside error check');

    if(errorCount === 0) {

        var userDetails = {
            'username': $('#inputUsername').val(),
            'firstname': $('#inputFirstname').val(),
            'lastname': $('#inputLastname').val(),
            'password': $('#inputPassword').val()
        };

        console.log('inside error check');

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
};
