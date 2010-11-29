/**
 * @author thatcher
 */
load('dist/env.rhino.js');
load('plugins/jquery.js');

function scrape(url, links){
    
    // scrape text from current document which we will
    // assign weights to in our search index
    var data = {
        $id: encodeURIComponent(url),
        url: url,
        full_text: $(document.body).text(),
        title: document.title,
        headings: $('h1, h2, h3, h4, h5, h6').text(),
        description: $('meta[name=description]').attr('content'),
        keywords: $('meta[name=keywords]').attr('content').split(',')
    };
    
    // find all the relavant links, but don't include any we
    // already have in our link array
    $('a[href]').each(function(){
        var href = $(this).attr('href');
        if($.inArray(href, links) == -1 && !href.match(/^(\s)*http|#/)){
            //we only want to crawl local links
            links.push(href);
        }
    });
    
    // save the record to our index
    $.ajax({
        url:'http://localhost:8080/rest/index/'+data.$id,
        contentType:'application/json',
        dataType:'json',
        type: 'post',
        async: false,
        data: JSON.stringify(data),
        processData: false,
        success: function(){
            console.log('indexed document %s', url);
        }
    });
}

$(function(){

    // delete the index to start fresh
    $.ajax({
        url:'http://localhost:8080/rest/index/',
        contentType:'application/json',
        dataType:'json',
        type:'delete',
        async: false,
        success: function(){
            console.log('deleted search index');
        }
    });
    
    // create the search index we will populate with 
    // our simple crawl
    $.ajax({
        url:'http://localhost:8080/rest/index/',
        contentType:'application/json',
        dataType:'json',
        type:'put',
        async: false,
        success: function(){
            console.log('created search index');
        }
    });
    
    // create an array which we'll use
    // to store relavant links to crawl
    var links = [];
    
    // index this document 
    scrape(document.location.toString(), links);
    
    // now crawl our links
    for(var i = 0; i < links.length; i++){
        try{
            // replaces this document with the document
            // from the link
            document.location = Envjs.uri(links[i]);
            scrape(links[i], links);
        }catch(e){
            console.log('failed to load %s \n %s', links[i], e);
        }
    }
    

});

window.location = 'http://localhost:8080/';
