var documentListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

     // Recipe Name link click
    $('#documentList table tbody').on('click', 'td a.linkshowrecipedetails', showRecipeDetails);

    // Add User button click
    $('#btnAddRecipe').on('click', addRecipe);

    // Delete User link click
    $('#documentList table tbody').on('click', 'td a.linkdeleterecipe', deleteRecipe);

    $('#btnSearch').on('click', searchHttp);
});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/documents/documentlist', function( data ) {
        documentListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowrecipedetails" rel="' + this.recipeName + '">' + this.recipeName + '</a></td>';
            tableContent += '<td>' + this.cookingTime + '</td>';
            tableContent += '<td><a href="#" class="linkdeleterecipe" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#documentList table tbody').html(tableContent);
    });
};

/// Show User Info
function showRecipeDetails(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisRecipeName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = documentListData.map(function(arrayItem) { 
        return arrayItem.recipeName;
    }).indexOf(thisRecipeName);

    // Get our User Object
    var thisRecipeObject = documentListData[arrayPosition];

    //Populate Info Box
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

        $('#searchList table tbody').html(tableContent);
    });
    
    $.getJSON( '/documents/recipesearch/' + query, function( data ) {
        $.each(data.parsed, function() {
            tableContent += '<tr>';
            tableContent += '<td><a href="' + this.source_url + '" class="linkshowrecipedetailss" rel="' + this.title + '">' + this.title + '</a><img src="' + this.image_url + '"></img></td>';
            tableContent += '</tr>';
        });
        $('#searchList table tbody').html(tableContent);
    });
};

// Add User
function addRecipe(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addRecipe input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
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

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addRecipe fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function deleteRecipe(event) {
    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/documents/deletedocument/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {
        return false;

    }

};
