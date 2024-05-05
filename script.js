/*------Problems and Notes----------*/
//based on https://www.reddit.com/r/dailyprogrammer/comments/3qjnil/20151028_challenge_238_intermediate_fallout/.
//No current Problems.
//problem with input screen not appending correctly
//problem with dud removed not working once the screen had reset once
//Project is completed.
//() <> [] {} --- duds

var howManyDuds = 7; //must be less than 15.
var tries = 4;
var x_length = 315; //changes how much the gibberish screen will spread across the x axis
//y axis requires to add in more in the variable rows on line 265.
var player_selected_words = false;//change how much words you want, must be less than 15.
var allowToPress = true;//determines if the player can press the on/off button used for testing purposes.
var sayCorrectWord = false;//should the correct word be displayed in the console?
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const words = {
  very_easy: ["FRIED","TREES","RIGID","HIRED","TRIES","WRITE","TRIED","GREED","DRIED","BRAIN","SKIES","LAWNS","GHOST","CAUSE","PAINT","SHINY","MAKES","GAINS","THIEF","BASES","RAISE","REFER","CARES","TAKEN","WAKES","WAVES","WARNS","SAVES"],
  easy:["STATING","HEALING","COSTING","REASONS","SEASIDE","SPARING","CAUSING","CRAFTED","PRISONS","PRESENT","DEALING","SETTING","LEAVING","VERSION","DEATHLY","BLAZING","GRANITE","TESTING","TRAITOR","STAMINA","TRINITY","CALLING","TALKING","ACQUIRE","WELCOME","DECRIES","FALLING","PACKING","ALLOWED","SELLING","AFFRONT","WALKING"],
  average:["CONQUORER","CONSISTED","WONDERFUL","COMMITTEE","SURRENDER","SUBJECTED","CONVICTED","FORBIDDEN","FORTIFIED","COLLECTED","CONTINUED","PERIMETER","SOUTHEAST","RELEASING","SOMETHING","ACCEPTING","MUTATIONS","GATHERING","LITERALLY","REPAIRING","INCESSANT","INTERIORS","REGARDING","TELEPHONE","OBTAINING","EXTENSIVE","DEFEATING","REQUIRING","UNLOCKING","RECYCLING","INSTINCTS","BARTERING","COMMUNITY","BATTERIES","RECIEVING","INCLUDING","INITIALLY","INVOLVING","MOUNTAINS"],
  hard:["DISCOVERING","ELIMINATING","UNIMPORTANT","MISTRUSTING","MANUFACTURE","RADIOACTIVE","EXCLUSIVELY","BOMBARDMENT","DECEPTIVELY","INDEPENDENT","UNBELIEVERS","EFFECTIVELY","IMMEDIATELY","INFESTATION","DESCRIPTION","INFORMATION","REMEMBERING","NIGHTVISION","DESTRUCTION","OVERLOOKING"],
  very_hard : ["INFILTRATION","ORGANIZATION","AUTHENTICITY","APPRECIATION","SPOKESPERSON","LABORATORIES","INITIATEHOOD","SUBTERRANEAN","PURIFICATION","TRANSMISSION","CIVILIZATION","CONSTRUCTION","RESURRECTION","REPRIMANDING","ACCOMPANYING","OVERWHELMING","CONVERSATION","NORTHERNMOST","TRANSCRIBING","ANNOUNCEMENT","SECLUTIONIST"]
}
var audioIDs = ["k1","k2","k3","k4","k5","k6","k7","k8","k9","k10","k11",]
var letters = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890[]()<>{}\|/!@#$%^&*";
function randomLetter () {
  return letters[getRandomInt(0,letters.length-1)];
}

function wordToNumber (letter) {
  switch(letter) {
      case "first" :
	      return 1;
      case "second" :
	      return 2;
      case "third" :
	      return 3;
      case "fourth" :
	      return 4;
      case "fifth" : 
	      return 5;
      case "sixth" :
	      return 6;
      case "seventh" :
	      return 7;
      case "eighth" :
	      return 8;
      case "ninth" : 
        return 9;
      case "tenth" :
        return 10;
      case "eleventh" : 
        return 11;
      case "twelfth" :
        return 12;
      case "thirteenth" : 
        return 13;
      case "fourteenth" : 
        return 14;
      case "fifteenth" : 
        return 15;
      case "sixteenth" : 
        return 16;
      case "seventeenth" :
        return 17;
      case "eighteenth" : 
        return 18;
      case "nineteenth" : 
        return 19;
      case "twentieth" : 
        return 20;
  }
}

function getDuds(amt_of_inner) {
  var dud_endings = [["[","]"],["{","}"],["<",">"],["(",")"]];
  var single_dud = [];
  let amountIn = getRandomInt(1,amt_of_inner);
  let dudSelection = dud_endings[getRandomInt(0,3)];
  for (var x = 0; x<= amountIn;x++) {
    if (x === 0) {
     single_dud.push(dudSelection[0]);
    }
    else if (x == amountIn) {
      single_dud.push(dudSelection[1]);
    }
    else {
      single_dud.push(letters[getRandomInt(0,letters.length-1)]);
    }
    
  }
  return single_dud.join("");
}


var difficulty = "";
$(document).ready(function() {
  
  $(".fa-cogs").click(function() {
    $(".black-computer-framing-before").css("display","none");
    $(".settings-screen").css("display","block");
  })
  
  $("#confirm").click(function() {
    var wd = $("#wd").val(),//word
        dd = $("#dd").val(),//duds
        tr = $("#tr").val();//tries
    if (wd != "" && wd != null && wd != undefined && typeof +wd == "number") {
      if (wd >= 15) {
        player_selected_words = 15;
      }
      else {
        player_selected_words = wd;
      }
      
    }
    
    if (dd != "" && dd != null && typeof +dd == "number") {
      if (dd >= 15) {
        howManyDuds = 15;
      }
      else {
        howManyDuds = dd;
      }
    }
    
    if (tr != "" && tr != undefined && tr != "null" && typeof +tr == "number") {
      if (tr>=10) {
        tries = 10;
      }
      else {
        tries = tr;
      }
    }
    $(".settings-screen").css("display","none");
    $(".black-computer-framing-before").css("display","block");
  })
  
  $("#back").click(function() {
    $(".help-screen").css("display","none");
    $(".black-computer-framing-before").css("display","block");
  })
  
  $("#help").click(function() {
    $(".black-computer-framing-before").css("display","none");
    $(".help-screen").css("display","block");
  })
  
  $("li").click(function() {
    difficulty = $(this).text().replace(" ", "_").toLowerCase();
    $(".black-computer-framing-before").css("display","none");//changing screens
    $(".black-computer-framing").css("display","block");
    $(".title-screen").html("<p class = 'text-center' id = 'title'></p>")//title-reading
    $(".title-screen").append("<p id = 'enter-password'></p>"); //enterpassword
    $(".title-screen").append("<p id = 'password-attempts'><span id = 'player-tries'></span></p><br>");//password attempts
    var readings = {
      title: "ROBO INDSTRUIES (TM) TERMLINK PROTOCOL",
      password: "ENTER PASSWORD :",
      attempts:"Attempts remaining --> " + tries + " "+ dots(tries)
    }, 
    reading = "",counter_title = 0,counter_password = 0, counter_attempts = 0;
    
     var typing_effect = setInterval(function() {
       allowToPress = false;
       $("#"+ audioIDs[getRandomInt(0,audioIDs.length-1)] )[0].play();
      if (undefined != readings.title && counter_title <= readings.title.length) {
        reading += readings.title.charAt(counter_title);
        $("#title").text(reading);
        counter_title++;
      }
      else if (undefined != readings.password && counter_password <= readings.password.length) {
        if (counter_password === 0) {
          reading = "";
        }
        reading += readings.password.charAt(counter_password);
        $("#enter-password").text(reading);
        counter_password++;
      }
       else if (undefined != readings.attempts && counter_attempts <= readings.attempts.length + 4) {
         if (counter_attempts === 0) {
           reading = "";
         }
         reading += readings.attempts.charAt(counter_attempts);
         $("#password-attempts").text(reading);
         counter_attempts++;
       }
      else {
        clearInterval(typing_effect);
        hacking_interface();
        allowToPress = true;
      }
    },50)
    
  })//.click
  
var dudsThatAreInActualGame = [],
    correct_word = "",
    inGameWordsThatAreInActualGame = [];
function hacking_interface() {//36
  {
    letters = letters.split(""); //570
  var duds = [];
  var ingame_words = [];
    
  for (var x = 0;x<=howManyDuds;x++) {
    duds.push(getDuds(10));
    }
  }
  
  (function getWords() {//?
    var player_selected_difficulty = words[difficulty];
    if (player_selected_words === false) {
      var randomNumber = getRandomInt(7,15);
    }
    else {
      randomNumber = player_selected_words;
    }
    for (var x = 0;x<=randomNumber;x++) {
      ingame_words.push(player_selected_difficulty[getRandomInt(0,player_selected_difficulty.length-1)] );
    }
    correct_word = ingame_words[getRandomInt(0,ingame_words.length-1)];
  })();
    ingame_words.splice(ingame_words.indexOf(correct_word),1);
  var rows = {
    first:null,
    second:null,
    third:null,
    fourth:null,
    fifth:null,
    sixth:null,
    seventh:null,
    eigth:null,
    ninth:null,
    tenth:null,
    eleventh:null,
    twelfth:null,
    thirteenth:null,
    fourteenth:null,
    fifteenth:null
  }
  var correctWordUsed = false;
  
  function willUseCorrectWord(rowName) {
    if (correctWordUsed === false && wordToNumber(rowName) != Object.keys(rows).length) {
        if (Math.random() <=0.1) {
          correctWordUsed = true;
          return true;
        }
        else {
          return false;
        }
    }
    else if (correctWordUsed === true) {
      return false;
    }
    else {
      correctWordUsed = true;
      return true;
    }
  }
  
  function willUseRandomWord (rowName) {
    if ((ingame_words.length + wordToNumber(rowName)) >= Object.keys(rows).length +1) {//if there is too few rows for words
      return true;
    }
    else if (ingame_words[0] == undefined || ingame_words[0] == null) {//if there is no more words to choose from
      return false;
    }
    else {
      return Math.random()>=0.5;
    }
  }
  
  function willUseDud(rowName) {
    if ((duds.length + wordToNumber(rowName)) >= Object.keys(rows).length+1) {
      return true;
    }
    else if (duds[0] == undefined || duds[0] == null) {
      return false;
    }
    else {
      return Math.random()>=0.5;
    }
  }
    
  function makeFirstRow(row,correctWord,dud,randomWord) {
    //problem where an undefined value gets into the array
     var dummyRow = [],
         rdmint1 = getRandomInt(0,30),
         rdmint2 = getRandomInt(0,30),
         rdmint3 = getRandomInt(0,30);
      for (var x = 0; x<=30;x++) {
        dummyRow.push(randomLetter())
        if (correctWord && x == rdmint1) {
          correctWordUsed = true;
          dummyRow.push(correct_word);
        }
      
        if (dud && x == rdmint2) {
          let rdm = duds[getRandomInt(0,duds.length-1)]
          dummyRow.push(rdm);
          dudsThatAreInActualGame.push(rdm);
          duds = duds.filter(function(value) {
            if (value == rdm) {
              return false;
            }
            else {
              return true;
            }
          });
          
        }
      
        if (randomWord && x == rdmint3) {
          let rdm1 = ingame_words[getRandomInt(0,ingame_words.length-1)];
          dummyRow.push(rdm1);
          inGameWordsThatAreInActualGame.push(rdm1);
          ingame_words = ingame_words.filter(function(value) {
            if (value != rdm1) {
              return true;
            }
            else {
              return false;
            }
          });
        }
      }
      return dummyRow;
  }
    
  function minimizeRow (row) {
    var askd = 1;
    return row.filter(function(value) {
      if (value.length == 1 && askd == 1) {
        askd--;
        return false;
      }
      else {
        return true;
      }
    })
  }
  
  function addToRow (row) {
    for (var x = 0;x<=2;x++) {
      let rdm4 = getRandomInt(0,row.length-1);
       row.splice(rdm4,0,randomLetter() );
    } 
    return row;
  }
  
  function maximizeRow (row,correctWord,dud,randomWord) {
    if (row[0] == undefined || row[0] == null) {
      return makeFirstRow(row,correctWord,dud,randomWord);
    }
    else {
      return addToRow(row);
    }
    
  }
    
  function addHTML (row) {//problem with &lt;
    return row.map(function(value) {
      if (value.length == 1) {//if its a random letter
      value = "<span id = 'letter'>" + value + "</span>";  
      }// if its a dud
      else if (value[0] == "(" || value[0] == "[" || value[0] == "{" || ( /&lt;/.test(value) == true && /&gt;/.test(value) == true)   ) {
        value = "<span id = 'dud' data-dud = '"+value+"'>" + value + "</span>";
      }
      else {//if its a word
        value = "<span id = 'word' data-word = '"+value+"'>" + value + "</span>"
      }
      return value;
    })
    
  }
  
  function changeToCharacterEntity(row) {
    return row.map(function(value) {
      value = value.replace(/</g,"&lt;");
      value = value.replace(/>/g,"&gt;");
      //value = value.replace(/\//g,"&sol;");
      return value;
    })
  }
  
  function createRow (row,theRowName) {
    var resultantRow = "";
    if (correctWordUsed === false) {
      var useCorrectWord = willUseCorrectWord(theRowName);
    }
    else {
      var useCorrectWord = false
    }
    var useDud = willUseDud(theRowName);
    var useRandomWord = willUseRandomWord(theRowName);
    var widthOfRow = 0;
    function checkWidth() {
      $("#ignore").html("<span id = 'Width'>" + resultantRow.join("") + "</span>");
      widthOfRow = Math.floor($("#Width").width());
    }
    while (widthOfRow <= x_length) {
      resultantRow = maximizeRow(resultantRow,useCorrectWord,useDud,useRandomWord);
      resultantRow = changeToCharacterEntity(resultantRow);
      checkWidth()
    }//<---- Looop ---->
    while (widthOfRow >= x_length + 17) {
      resultantRow = minimizeRow(resultantRow);
      checkWidth()
    }
    resultantRow = addHTML(resultantRow);
    return resultantRow;
  }
  
  for (var j in rows) {
      rows[j] = createRow(rows[j],j);
  }
  for (var b in rows) {
    $(".hacking-screen").append("<p id = 'rows'>" + rows[b].join("") + "</p>");
  } 
    inGameWordsThatAreInActualGame.splice(inGameWordsThatAreInActualGame.indexOf(correct_word),1);
  if ($(".hacking-screen").height() >=310) {
    $(".hacking-screen").html("<h2 class = 'text-center'>An error occured displaying the screen.</h2>")
  }
  if (sayCorrectWord) {
    console.log(correct_word);
  }
}//hacking-interface

function dots(number) {
  var result = "";
  for (var x = 0; x <= number -1;x++) {
    result += " ⬛"; 
  }
  return result;
}
  
function inputWin(word) {
  $(".input-screen").html("<p style = 'order: 3'> &gt; " + word + "</p>")
  $(".input-screen").append("<p style = 'order:2'> &gt; Exact Match!</p>");
  $(".input-screen").append("<p style = 'order :1'> &gt; Please wait while system is accessed.</p>");
  $(".input-screen").append("<p id = 'dotting-win'></p>");
}
  
function getQuoteOrHaiku() {
  var link = "<a href='https://www.notion.so/a1029532fe8d4f03b953d56bb8818ce6' target='_blank' style='color: #00ff00; font-family: inherit; text-align: center; display: block;'>Click here to proceed</a>";
  var reading = "";
  var counter = 0;

  var typing_effect = setInterval(function() {
    $("#" + audioIDs[getRandomInt(0, audioIDs.length - 1)])[0].play();
    reading += link.charAt(counter);
    $("#win-quote").html("<p>" + reading + "</p>");
    counter++;

    if (counter > link.length) {
      clearInterval(typing_effect);
    }
  }, 50);

  return link;
}
  
function amtOfRightPlaces(word) {
	var resultantAmount = 0;
	var comparisonWord = correct_word.split("");
	word = word.split("");
	for (var x = 0;x<=word.length-1;x++) {
		if (word[x] == comparisonWord[x]) {
			resultantAmount++;
		}
	}
	return resultantAmount;
}
  
function dotsForDud (wordLength) {
  var l = "•";
  var res = "";
  for (var x = 0;x<=wordLength.length -1;x++) {
    res += l + " ";
  }
  return res;
}
  
  var verticalAlign = 1000;
$(".hacking-screen").on("click","#word",function() {
  
  if ($(this).text() == correct_word) { //if the player chose the correct word
    $("#pg")[0].play();
    inputWin($(this).text() );
    var dotts = "•",
        readings = "&gt; ";
    var goToWinScreen = setInterval(function() {
  readings += dotts.charAt(0);
  $("#dotting-win").html(readings);
  if (readings.length >=11) {
    clearInterval(goToWinScreen);
    $(".black-computer-framing").css("display","none");
    $(".win-screen").css("display","block");
    $("#win-quote").html("<p>&quot;" + getQuoteOrHaiku() + "&quot;</p>")
  }
},500);
    
  }
  else {//otherwise the player must have choosen an incorrect word
    $("#pb")[0].play();
    tries--;
    if (tries !== 0) {
      (function changeTries() {
      $(".title-screen").html("<p class = 'text-center' id = 'title'>ROBO INDSTRUIES (TM) TERMLINK PROTOCOL</p>")//title-reading
      $(".title-screen").append("<p id = 'enter-password'>ENTER PASSWORD :</p>"); //enterpassword
      $(".title-screen").append("<p id = 'password-attempts'>Attempts remaining --> "+tries+ " " + dots(tries) +"</p><br>");  
      })();
      //Attempts remaining --> " + tries + " "+ dots(tries)
      (function inputChances(inputtedWord) {
        $(".input-screen").append("<p style = 'order:" + verticalAlign + "'>&gt; " + inputtedWord + "</p>");
        $(".input-screen").append("<p style = 'order:" + verticalAlign + "'>&gt; Entry Denied.  "+ amtOfRightPlaces( inputtedWord ) +"/"+correct_word.length+ "  correct.</p>");
      })( $(this).text() );
    }
    
    else {
      console.log(correct_word);
      $(".black-computer-framing").css("display","none");
      $(".failed-screen").css("display","block");
    }
    
  }
  verticalAlign--;
})
  
  var falseWords = inGameWordsThatAreInActualGame;
$(".hacking-screen").on("click","#dud",function() {
  verticalAlign--;
  if (Math.random() >=0.2) {
    
    (function deleteARandomWord() {
      var wrd = $(".hacking-screen").find("[data-word = '" + falseWords[getRandomInt(0,falseWords.length-1)] + "']");
      wrd.text(dotsForDud(wrd.text()) );
      inGameWordsThatAreInActualGame.splice(inGameWordsThatAreInActualGame.indexOf(wrd.attr("data-word")),1);
      falseWords.splice(falseWords.indexOf(wrd.attr("data-word")),1)
      wrd.attr("data-word","null");
      
      $(".input-screen").append("<p order = '" + verticalAlign + "'>&gt; Dud removed.</p>")
  })();
    
  }
  else {
    
    (function replenishAttempts() {
      tries = 4;
      $(".title-screen").html("<p class = 'text-center' id = 'title'>ROBO INDSTRUIES (TM) TERMLINK PROTOCOL</p>")//title-reading
      $(".title-screen").append("<p id = 'enter-password'>ENTER PASSWORD :</p>"); //enterpassword
      $(".title-screen").append("<p id = 'password-attempts'>Attempts remaining --> "+tries+ " " + dots(tries) +"</p><br>");
      $(".input-screen").append("<p order = '" + verticalAlign + "'>&gt; Allowance replinshed.</p>");
  })();
    
  }
  $(this).attr("id","dead-dud");
})

$(".hacking-screen").on("mouseover","span",function() {
  var mouseover = $(this).text();
  if ( !(/•/.test(mouseover) ) ) {
    var mouseoverReading = "";
    var int = 0;
    var inputTypingEffect = setInterval(function() {
      $("#"+ audioIDs[getRandomInt(0,audioIDs.length-1)] )[0].play();
      mouseoverReading += mouseover.charAt(int) 
      $(".lower-input-screen").html("<p>&gt; "+mouseoverReading+"</p>")
      int++;
      if (mouseoverReading.length == mouseover.length) {
        clearInterval(inputTypingEffect);
      }
    },50);
  }
  
});

function resetGame () {
  letters = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890[]()<>{}\|/!@#$%^&*";
      tries = 4;
      dudsThatAreInActualGame = [];
      correct_word = "";
      inGameWordsThatAreInActualGame = [];
 }
  var on = false;
  $("#turn").click(function() {
    if (on === false) {
      $(".black-screen").css("display","none");
      $(".black-computer-framing-before").css("display","block");
      $("#po")[0].play();
      on = true;
    }
    else {
      if (allowToPress == true) {
        (function removeAllScreens() {
          $(".black-computer-framing-before").css("display","none");
          $(".help-screen").css("display","none");
          $(".settings-screen").css("display","none");
          $(".black-computer-framing").css("display","none");
          $(".failed-screen").css("display","none");
          $(".win-screen").css("display","none");
          $(".hacking-screen").empty();
          $(".input-screen").empty();
          $(".lower-input-screen").empty();
          $(".black-screen").css("display","block");
        })();
        resetGame();
        $("#pof")[0].play();
        on = false;
      }
        
    }//else
    
  })
 
}); 
