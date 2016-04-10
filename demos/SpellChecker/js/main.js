var dictionary = [];
var dictionaryIsLoaded = false;
var  selectedIndex = 0;

var SUCCESS = -2;
var FAIL = -1;

function loadDictionary( callback ) {
  $.ajax({
    url: "dictionary.txt",
    dataTyle: "text",
    success: callback,
    error: function() {
      console.log("an error occured");
    }
  })
}

/**
** Performs search; returns
** -2 = valid but no search results
** -1 = invalid search result
** else the index of list that a match was found at
**/
function searchList(term, list) {
  if(list.length == 0)
    return(FAIL);
  var pivotIndex = Math.floor(list.length / 2);
  var pivot = list[pivotIndex];
  if( term.length > 1 ) { // don't bother searching for 0 or 1 letter words (we'll get to 1 letter works later)
    if(term == pivot.substring(0,term.length)) // if we've found a pivot whose has a prefix that matches the term, then it's in the dictionary!
      return(pivotIndex);
    else {
      if(term < pivot) {
        var newList = list.slice(0, pivotIndex - 1);
        var searchResult = searchList(term, newList);
        if(searchResult >= 0)
          return(searchResult)
        else
          return(FAIL);
      } else {
        var newList = list.slice(pivotIndex + 1);
        var searchResult = searchList(term, newList);
        if( searchResult >= 0 )
          return(pivotIndex + searchResult + 1)
        else
          return(FAIL);
      }
    }
  } else {
    return(SUCCESS); // if not worth search for, then it's assumed to be in the dictionary e.g. all letters in the alphabet have words that start with them
  }
}

function findMatches(index, charCount) {
  var backwards = index;
  while(backwards > -1 && dictionary[backwards].substring(0,charCount) == dictionary[index].substring(0,charCount)) {
    --backwards;
  }

  var forwards = index;
  while(forwards < dictionary.length && dictionary[forwards].substring(0,charCount) == dictionary[index].substring(0,charCount)) {
    ++forwards;
  }
  matches = [];
  for(var eachMatch = backwards + 1; eachMatch <= forwards - 1; ++eachMatch)
    matches.push(dictionary[eachMatch]);
  return(matches);
}

function renderMatches(matches) {
  output = "";
  for (let eachMatch of matches) {
    output += ("<li class='match'>" + eachMatch + "</li>");
  }
  if(output.length) {
    $("#matches").show();
    $("#matches ul").html(output)
  } else {
    $("#matches").hide();
  }
}

function searchDictionary(term) {
  if( dictionaryIsLoaded ) {
    var result = searchList( term, dictionary );
    if(result == FAIL) {
      $("#userInput").addClass("fail");
    } else {
      $("#userInput").removeClass("fail");
      if(result > 0 )
        renderMatches(findMatches(result, term.length))
      else
        renderMatches([]);
    }
  } else
    console.log("Dictionary is not yet loaded.");
}

$(document).ready( function() {
  loadDictionary(function(data) {
    console.log("loaded dictionary");
    dictionaryIsLoaded = true;
    dictionary = data.split("\n");
  });

  $("#userInput").keyup(function(ev) {
    var text = $(this).val();
    var words = text.split(" ");
    var lastWord = words[words.length - 1];
    searchDictionary(lastWord); // don't bother extracting out the last typed word, yet
  })
});
