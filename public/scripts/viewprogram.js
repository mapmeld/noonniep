var myCodeMirror, lastSelectLine;
var helpTerms = [
  { name: "void setup", about: "The robot reads code inside the setup function once, at the start of the program." },
  { name: "void loop", about: "The robot repeats code inside the loop function." },
  { name: "Serial", about: "The robot uses Serial to send data and other messages back to a computer / the internet." }
];
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
    var linewords = linetext.toLowerCase().split(" ");
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
          showPopup( helpTerms[w].name );
        }
      }
      else{
        if(linewords.indexOf(helpTerms[w].name) > -1){
          showPopup( helpTerms[w].name );
        }
      }
    }
 // };
}
function showPopup( term ){
  console.log( term );
}
function replaceAll(str,oldr,newr){
  while(str.indexOf(oldr) > -1){
    str = str.replace(oldr,newr);
  }
  return str;
}