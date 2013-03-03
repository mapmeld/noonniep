var myCodeMirror, lastSelectLine;
$(document).ready(init);
function init(){
  myCodeMirror = CodeMirror.fromTextArea( document.getElementById("sketchplace"), {
    lineNumbers: true,
    matchBrackets: true,
    readOnly: true,
    mode: "text/x-csrc"
  });  

  setInterval(function(){
    var selectedLine = myCodeMirror.getCursor().line;
    if(selectedLine >= 0 && selectedLine != lastSelectLine){
      if($(".popover").length){
        $(".popover").remove();
      }
      lastSelectLine = selectedLine;
      smartLine( selectedLine );
    }
  }, 250);
}
function smartLine( linenum ){

//  linepre.onclick = function(e){
    var linetext = myCodeMirror.getLine( linenum );
    linetext = replaceAll(linetext, "(", " ");
    linetext = replaceAll(linetext, ")", " ");
    linetext = replaceAll(linetext, "{", " ");
    linetext = replaceAll(linetext, "}", " ");
    linetext = replaceAll(linetext, ";", " ");
    linetext = replaceAll(linetext, "	", " "); // remove tabs
    linetext = replaceAll(linetext, "  ", "");
    var linewords = linetext.split(" ");
    // popup helpful info on terms
    for(var w=0;w<helpTerms.length;w++){
      if(helpTerms[w].name.indexOf(" ") > -1){
        // terms like void setup where both words appear & appear in order
        // for example "void setup"
        var helplist = helpTerms[w].name.split(" ");
        var foundAll = true;
        var lastIndex = 0;
        for(var m=0;m<helplist.length;m++){
          if(linewords.indexOf(helplist[m]) < lastIndex){
            foundAll = false;
            break;
          }
          else{
            lastIndex = linewords.indexOf(helplist[m]);
          }
        }
        if(foundAll){
          return showPopup( linenum, helpTerms[w] );
        }
      }
      else{
        if(linewords.indexOf(helpTerms[w].name) > -1){
          return showPopup( linenum, helpTerms[w] );
        }
      }
    }
 // };
}
function showPopup( linenum, term ){
  console.log( term );
  $( $(".CodeMirror-lines > div > div > pre")[linenum+1] ).popover({
  //$(".CodeMirror").popover({
    title: term.name,
    content: term.about
  })
  .popover('show');
  setTimeout(function(){
    $(".popover").css({ left: "640px" });
  }, 250);
}
function replaceAll(str,oldr,newr){
  while(str.indexOf(oldr) > -1){
    str = str.replace(oldr,newr);
  }
  return str;
}