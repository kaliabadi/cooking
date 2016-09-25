function search(event) {
    var query = $('#inputSearchQuery').val();

    populateSearchResults('/documents/documentlist/', query);
    // populateSearchResults('documents/recipesearch/', query);
};

function populateSearchResults (endpoint, query) {
    var tableContent;

    $.getJSON(endpoint + query, function(data) {
        $.each(formatCheck(data), function() {
            tableContent += '<tr>';
            if (this.recipeName) {
                tableContent += '<td><a href="/recipe/' + this.recipeName + 
                '" class="linkshowrecipedetails" rel="something">' + this.recipeName + '</a></td>';  
            } else {
                tableContent += '<td><a href="' + this.source_url + 
                '" class="linkshowrecipedetailss" rel="' + this.title + '">' +
                 this.title + '</a><img src="' + this.image_url + '"></img></td>';
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
