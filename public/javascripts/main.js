var documentListData = [];

$(document).ready(function() {
    populateTable();

    $('#documentList table tbody').on('click', 'td a.linkshowrecipedetails', showRecipeDetails);
    $('#btnAddRecipe').on('click', addRecipe);
    $('#documentList table tbody').on('click', 'td a.linkdeleterecipe', deleteRecipe);
    $('.search').on('click', addShownClass);
    $('.search').on('click', search);
    $('#btnRegister').on('click', registerUser);
    $('#btnLogin').on('click', login);
});
