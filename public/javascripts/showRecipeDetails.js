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
    $('#recipeMethod').text(thisRecipeObject.method);

    $('#recipeDetails').removeClass('hidden');
    $('#recipeDetails').addClass('active');
};
