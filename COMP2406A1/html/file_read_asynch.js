
/*
Example of ASYNCHRONOUS file read.
Function readFile does not block (wait) for the file to be read.

Instead its argument function(err,data) will be called once the file has been read.
function(err,data) is the "call back" function that will be called when readFile's task is done.

Notice "DONE" gets written to the console before the file contents. Make
sure you understand why that is.
*/


const fs = require('fs')

fs.readFile('songs/Sister Golden Hair.txt', 
  function(err, data) {
    if(err) throw err
    let songs = data.toString().split("\n")
    for(let verse of songs) { 
      let chords = ""
      let lyrics = ""
      let inside = false
      let space = 0
  
      for(let character = 0; character < verse.length; character++){

        if(verse[character] === "["){
          inside = true;
          character++

          while(verse[character] !== "]"){
            chords += verse[character];
            character++
            space++
          }
          inside = false;

          chords += " "
          space++
        }

        else{
            if(space > 0){
              space--
              lyrics += verse[character];
            }

            else{
              lyrics += verse[character];
              chords += " ";
            }
        }
      }
      console.log(chords)
      console.log(lyrics)
      chords = ""

    }
  }
)

console.log("DONE")





