document.addEventListener('DOMContentLoaded', function() {
  /*
  This is called after the browser
  has loaded the web page
  */

  //add listeners to buttons
  document.getElementById('submit_button').addEventListener('click', handleSubmitButton)
  document.getElementById('transpose_up').addEventListener('click', function(){transposeUp(); clickUp();});
  document.getElementById('transpose_down').addEventListener('click', function(){transposeDown(); clickDown();});
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)

  
})
