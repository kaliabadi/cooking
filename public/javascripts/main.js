var documentListData = [];

$(document).ready(function() {
    populateTable();

    $('#documentList table tbody').on('click', 'td a.linkshowrecipedetails', showRecipeDetails);
    $('#btnAddRecipe').on('click', addRecipe);
    $('#documentList table tbody').on('click', 'td a.linkdeleterecipe', deleteRecipe);
    $('#btnSearch').on('click', addShownClass);
    $('#btnSearch').on('click', search);
});
