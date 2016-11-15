function search(event) {
    var query = $('#inputSearchQuery').val();

    populateSearchResults('/documents/documentlist/' + query);
    populateSearchResults('/documents/recipesearch/' + query);
};

function populateSearchResults (query) {
    var tableContent;

    $.getJSON(query, function(data) {
        $.each(formatCheck(data), function() {
            tableContent += '<tr>';
            if (this.recipeName) {
                var href = this.recipeName.replace(/ /g,"_");
                tableContent += '<td><a href="/recipe/' + href + 
                '" class="linkshowrecipedetails list-group-item" rel="something">' + this.recipeName + '</a></td>';
            } else {
                tableContent += '<td><a href="' + this.source_url + 
                '" class="linkshowrecipedetails list-group-item" rel="' + this.title + '">' +
                 this.title + '</a></td>';
            }
            tableContent += '</tr>';
        });
    
    $('.searchList table tbody').append(tableContent); 
    });
};

function formatCheck (data) {
    if (data.parsed) {
        return data.parsed;
    } else {
        return data;
    }
};

function addShownClass () {
    $('.searchList').addClass('shown');
};
