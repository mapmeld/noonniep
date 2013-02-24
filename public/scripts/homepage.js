var draggingCode = false;
var myCodeMirror;

function loadCode(){
  myCodeMirror = CodeMirror.fromTextArea( document.getElementById("sketchplace"), {
    matchBrackets: true,
    mode: "text/x-csrc"
  });
  myCodeMirror.setValue("/* blink */\n\nint RED_LED = 2;\n\nvoid setup(){\n  pinMode(RED_LED, OUTPUT);\n}\n\nvoid loop(){\n  digitalWrite(RED_LED, ON);\n  delay(500);\n\n  digitalWrite(RED_LED, OFF);\n  delay(500);\n}");
  //myCodeMirror.setValue("/* blink */\n\nblink( RED_LED, 500 );");
  
  document.getElementsByClassName("CodeMirror")[0].draggable = "true";
  document.getElementsByClassName("CodeMirror")[0].ondragstart = function(e){
    draggingCode = true;
  };
  document.getElementsByClassName("CodeMirror")[0].ondragend = function(e){
    draggingCode = false;
  };

  document.getElementById("robotpreview").addEventListener('dragenter', blockHandler, false);
  document.getElementById("robotpreview").addEventListener('dragexit', blockHandler, false);
  document.getElementById("robotpreview").addEventListener('dragover', blockHandler, false);
  document.getElementById("robotpreview").addEventListener('drop', dropFile, false);

}

function blockHandler(e){
  e.stopPropagation();
  e.preventDefault();
};

function dropFile(e){
  e.stopPropagation();
  e.preventDefault();
  console.log(e);
  if(draggingCode){
    // dropped code into this robot
    runCode();
  }
  else{
    var files = e.dataTransfer.files;
    if(files && files.length){
      // dropped a code file for this robot
      var reader = new FileReader();
      reader.onload = function(e){
        myCodeMirror.setValue( e.target.result );
        runCode();
      };
      reader.readAsText(files[0]);
    }
  }
}

function runCode(){
  var mycode = myCodeMirror.getValue();
}