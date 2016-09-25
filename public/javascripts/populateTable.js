function populateTable () {
    var tableContent = '';

    $.getJSON( '/documents/documentlist/', function( data ) {
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
