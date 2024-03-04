/*
These functions handle parsing the chord-pro text format
*/

// This function takes an array of strings, each string is a line of text

// Tracks clicks
let click = 0;

function clickDown() {
  click--;
}

function clickUp() {
  click++;
}

function parseChordProFormat(chordProLinesArray) {

  // Setting the title of the song
  var title = chordProLinesArray[0].substring(7, chordProLinesArray[0].length - 1);
  var titleElement = document.getElementById('title');
  titleElement.innerText = title;

  console.log('type of input: ' + typeof chordProLinesArray)

  //add the lines of text to html <p> elements
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = '' //clear the html


  // Looping through the song
  for (let i = 1; i < chordProLinesArray.length; i++) {
    let chords = ""
    let lyrics = ""
    let inside = false
    let space = 0
    
    // Looping through the lines of the song
    for(j = 0; j < chordProLinesArray[i].length; j++){

      // Checking for chords
      if(chordProLinesArray[i][j] === "["){
        inside = true;
        j++


        //Finding the end of the chord

        while(chordProLinesArray[i][j] !== "]"){
          chords += chordProLinesArray[i][j];
          j++
          space++
        }

        inside = false;
        chords += " "
        space++
      }

      //Adjusting for extra spaces in the lyrics

      else{
          if(space > 0){
            space--
            lyrics += chordProLinesArray[i][j];
          }

          else{
            lyrics += chordProLinesArray[i][j];
            chords += " ";
          }
      }
    }

    //Output the chord and lyric lines to the html

    console.log(chordProLinesArray[i][j])
    textDiv.innerHTML += `<span class="chord">${chords}</span>`
    textDiv.innerHTML += '<br>';
    console.log(chordProLinesArray[i][j])
    textDiv.innerHTML += `<span class="p">${lyrics}</span>`
    textDiv.innerHTML += '<br>';
    chords = ""
  }
}

//--------------------------------------------------------------------------------------------------------------

function transposeUp() {

  // Setting variables to the chord and lyric lines
  let chordProLinesArray = (document.querySelectorAll('.chord').length === 0) ?  document.querySelectorAll('.transpose') : document.querySelectorAll('.chord');
  let lyrics = document.querySelectorAll('.p');

  // Setting the title of the song
  var title = document.title;
  var titleElement = document.querySelectorAll('title');
  titleElement.innerText = title;


  // Testing
  console.log(chordProLinesArray)

  //add the lines of text to html <p> elements
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = '' //clear the html


  //Loop through the chords

  for (let i = 0; i < chordProLinesArray.length; i++) {

    //Read each chord

    let chordline = chordProLinesArray[i].textContent
    let lyricline = lyrics[i].textContent

    //Mapping for sharps and flats to go up 1 semitone
    const sharpMapping = {
      'A': 'A#',
      'A#': 'B',
      'B': 'C',
      'C': 'C#',
      'C#': 'D',
      'D': 'D#',
      'D#' : 'E',
      'E': 'F',
      'F': 'F#',
      'F#': 'G',
      'G': 'G#',
      'G#': 'A'
    };

    const flatMapping = {
      'A': 'Bb',
      'Bb': 'B',
      'B': 'C',
      'C': 'Dd',
      'Db': 'D',
      'D': 'Eb',
      'Eb': 'E',
      'E': 'F',
      'F': 'Gb',
      'Gb': 'G',
      'G': 'Ab',
      'Ab': 'A',
    };

    //Loop through the chord that is read


    for(j = 0; j < chordline.length; j++){

      //Setting variables for to check for single and double chords eg A vs A# or Ab

      let tempchordone= ""
      let tempchordtwo= ""

      
      //Checking when the chord is not a space eg chord found

      if(chordline[j] !== " "){

        //Check for both A or A# or Ab and test both

        tempchordone += chordline[j]
        tempchordtwo += chordline[j] + (chordline[j + 1] || "")

      

          //If the chord eg A# is in the sharpMapping object, replace the chord with the value of the chord in the object
          if(tempchordtwo in sharpMapping){
            chordline = chordline.slice(0, j) + sharpMapping[tempchordtwo] + chordline.slice(j + tempchordtwo.length);
          }

           //If the chord eg Ab is in the flatMapping object, replace the chord with the value of the chord in the object

          else if(tempchordtwo in flatMapping){
            chordline = chordline.slice(0, j) + flatMapping[tempchordtwo] + chordline.slice(j + 1 + tempchordtwo.length); 
          }

          //If the chord eg A is in the sharpMapping object, replace the chord with the value of the chord in the object
          else if(tempchordone in sharpMapping){
            chordline = chordline.slice(0, j) + sharpMapping[tempchordone] + chordline.slice(j + tempchordone.length);

          }

           //If the chord eg A is in the flatMapping object, replace the chord with the value of the chord in the object
          else if(tempchordone in flatMapping){
            chordline = chordline.slice(0, j) + flatMapping[tempchordone] + chordline.slice(j + tempchordone.length);
          }
      }
    }

    clickUp();


    //Output the chord and lyric lines to the html
    // Colours blue or green depending on amount of clicks


        console.log(chordline)
        textDiv.innerHTML += `<span class="transpose">${chordline}</span>`
        textDiv.innerHTML += '<br>';
        console.log(lyricline)
        textDiv.innerHTML += `<span class="p">${lyricline}</span>`
        textDiv.innerHTML += '<br>';
      
  }
}


//--------------------------------------------------------------------------


function transposeDown() {
  
  // Setting variables to the chord and lyric lines
  let chordProLinesArray = (document.querySelectorAll('.chord').length === 0) ?  document.querySelectorAll('.transpose') : document.querySelectorAll('.chord');
  let lyrics = document.querySelectorAll('.p');
  

  // Setting the title of the song
  var title = document.title;
  var titleElement = document.querySelectorAll('title');
  titleElement.innerText = title;


  // Testing to see if it works 
  console.log(chordProLinesArray)

  //add the lines of text to html <p> elements
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = '' //clear the html


  //Loop through the chords
  for (let i = 0; i < chordProLinesArray.length; i++) {

    //Read each chord

    let chordline = chordProLinesArray[i].textContent
    let lyricline = lyrics[i].textContent

    //Mapping for sharps and flats to go down 1 semitone

    const sharpMapping = {
      'G#' : 'G',
      'G': 'F#',
      'F#': 'F',
      'F': 'E',
      'E': 'D#',
      'D#': 'D',
      'D': 'C#',
      'C#': 'C',
      'C': 'B',
      'B': 'A#',
      'A#': 'A',
      'A': 'G#'
    };

    const flatMapping = {
      'Ab': 'G',
      'G': 'Gb',
      'Gb': 'F',
      'F': 'E',
      'E': 'Eb',
      'Eb': 'D',
      'D': 'Db',
      'Db': 'C',
      'C': 'B',
      'B': 'Bb',
      'Bb': 'A',
      'A': 'Ab'
    };



    //Loop through the chord that is read
    for(j = 0; j < chordline.length; j++){

      //Setting variables for to check for single and double chords eg A vs A# or Ab
      let tempchordone= ""
      let tempchordtwo= ""
    
      //Checking when the chord is not a space eg chord found
      if(chordline[j] !== " "){


        //Check for both A or A# or Ab and test both

        tempchordone += chordline[j]
        tempchordtwo += chordline[j] + (chordline[j + 1] || "")

        //If the chord eg A# is in the sharpMapping object, replace the chord with the value of the chord in the object
      
          if(tempchordtwo in sharpMapping){
            chordline = chordline.slice(0, j) + sharpMapping[tempchordtwo] + chordline.slice(j + tempchordtwo.length);
          }

          //If the chord eg Ab is in the flatMapping object, replace the chord with the value of the chord in the object
          else if(tempchordtwo in flatMapping){
            chordline = chordline.slice(0, j) + flatMapping[tempchordtwo] + chordline.slice(j + tempchordtwo.length); 
          }

          //If the chord eg A is in the sharpMapping object, replace the chord with the value of the chord in the object
          else if(tempchordone in sharpMapping){
            chordline = chordline.slice(0, j) + sharpMapping[tempchordone] + chordline.slice(j + tempchordone.length);

          }

          //If the chord eg A is in the flatMapping object, replace the chord with the value of the chord in the object
          else if(tempchordone in flatMapping){
            chordline = chordline.slice(0, j) + flatMapping[tempchordone] + chordline.slice(j + tempchordone.length);
          }
      }

    }

    clickDown();


    //Output the chord and lyric lines to the html
    // Colours blue or green depending on amount of clicks


      
        console.log(chordline)
        textDiv.innerHTML += `<span class="transpose">${chordline}</span>`
        textDiv.innerHTML += '<br>';
        console.log(lyricline)
        textDiv.innerHTML += `<span class="p">${lyricline}</span>`
        textDiv.innerHTML += '<br>';
      

    }
}