//Global variables


var hunter;
var direction=6;
var level=1;
var timerLevel=200;
var levelHiker=0;
var points=0;
var canvasElement;
var canvasObject;
var gameOptions=[];
var hunterData;

var hunterClue;

var timerSnakeGame;
// Setting everything ready
//Performs When document is ready
$(document).ready(function(){

canvasElement=document.getElementById("gameArea");
canvasObject=canvasElement.getContext("2d");

if(canvasElement.width<400)
{
canvasElement.width=window.screen.availWidth;
canvasElement.height=window.screen.availWidth;
}
});

function restratGame()
{
  gameOptions=[];
      direction=6;
      level=1;
      timerLevel=200;
      levelHiker=0;
      points=0;
  canvasObject=canvasElement.getContext("2d");
  canvasObject.clearRect(0,0,canvasElement.width,canvasElement.width);
  beginMyGame();
}


// Flip instructions
function flipInst()
{

	if(document.getElementById("instructionsList").style.display=="none")
		{
		  $("#instructionsList").show();
		}
	else{
		 $("#instructionsList").hide();
	}
}

// Begin game
function beginMyGame()
{
$("#gamePoints").html(points);
$("#clue").html("0+3");
$("#beginMyGame").hide();
$("#gameOverOnWrongSum").hide();
$("#gameOverOnEdgeHit").hide();
   gameOptions.push(new Option(generateXY(),generateXY(),3));

  hunterClue="0+3";
  timerSnakeGame=setInterval(runHunter,timerLevel);
hunter=new Hunter(200,200,20,20,3);


canvasObject.fillStyle="#000";
canvasObject.fillRect(gameOptions[0].x,gameOptions[0].y,20,20);
canvasObject.font="13px bold";
canvasObject.fillStyle="#fff";
canvasObject.fillText("00"+gameOptions[0].data,gameOptions[0].x,gameOptions[0].y+15);
canvasObject.fillStyle="#000";
}

//Generate Question
function generateRHint()
{
  var input1;
  var input2;
   if(level==1)
   {
      input1=genRandom(1,20);
      input2=genRandom(1,20);
   }
   else if(level==2)
   {
     input1=genRandom(20,50);
     input2=genRandom(20,50);
   }
   else if(level==3)
   {
     input1=genRandom(50,150);
     input2=genRandom(50,150);
   }
   else if(level==4)
   {
     input1=genRandom(150,350);
     input2=genRandom(150,350);
   }
   else
   {
     input1=genRandom(350,500);
     input2=genRandom(350,500);
   }

   hunterClue=""+input1+" + "+input2;
   hunterData=input1+input2;
   hunter.data=hunterData;
}


// Game Hunter / Snake
function Hunter(x,y,w,h,data)
{
   this.x=x;
   this.y=y;
   this.w=w;
   this.h=h;
   this.data=data;
}


// Game Options
function Option(x,y,data)
{
  this.x=x;
  this.y=y;
  this.data=data;
}


//Change Direction
function divert(d)
{
  direction=d;

}

//Random Number generator from 1-100

function genRandom(start,end)
{
return Math.floor(Math.random() * end) + start;
}

// Generate Random for x and y
function generateXY()
{
  var n=(Math.floor(Math.random() * parseInt(canvasElement.width/10))+1) * 10;
  if(n%20==0)
  {
    if(n==400)
    return n-20;
    else
    return n;
  }
  else if(n>10){
      console.log("@"+n-10);
    return n-10;

  }
  else{
      console.log("@"+n);
    return n+10;
  }

}

// Game over on wrong sum
function gameOverOnWrongSum()
{
  $("#gameOverOnWrongSum").show();
  $("#restratGame").show();
}
function gameOverOnEdgeHit()
{
$("#gameOverOnEdgeHit").show();
$("#restratGame").show();
}

// Run Hunter
function runHunter()
{
 var t;
canvasObject.clearRect(hunter.x,hunter.y,20,20);
if(direction==8)
{

  hunter.y=hunter.y-20;
    t=checkHitStatus(hunter.x,hunter.y);
  if(checkGameStatus(hunter.x,hunter.y))
  {
     clearInterval(timerSnakeGame);
    gameOverOnEdgeHit();

  }
  else  if(t==2)
   {
      clearInterval(timerSnakeGame);
      gameOverOnWrongSum();
   }
   else if(t==3){
     updateGameArea();
   }
}
else if(direction==6)
{
  hunter.x=hunter.x+20;
    t=checkHitStatus(hunter.x,hunter.y);
  if(checkGameStatus(hunter.x,hunter.y))
  {
     clearInterval(timerSnakeGame);
     gameOverOnEdgeHit();
  }
  else  if(t==2)
   {
      clearInterval(timerSnakeGame);
      gameOverOnWrongSum();
   }
   else if(t==3){
     updateGameArea();
   }
}
else if(direction==2)
{
  hunter.y=hunter.y+20;
    t=checkHitStatus(hunter.x,hunter.y);
  if(checkGameStatus(hunter.x,hunter.y))
  {
     clearInterval(timerSnakeGame);
     gameOverOnEdgeHit();
  }
  else  if(t==2)
   {
      clearInterval(timerSnakeGame);
      gameOverOnWrongSum();
   }
   else if(t==3){
     updateGameArea();
   }
}
else if(direction==4)
{
  hunter.x=hunter.x-20;
    t=checkHitStatus(hunter.x,hunter.y);
  if(checkGameStatus(hunter.x,hunter.y))
  {
     clearInterval(timerSnakeGame);
     gameOverOnEdgeHit();
  }
 else  if(t==2)
  {
     clearInterval(timerSnakeGame);
     gameOverOnWrongSum();
  }
  else if(t==3){
    updateGameArea();
  }
}


 canvasObject.fillRect(hunter.x,hunter.y,20,20);

  //canvasObject.fillText("3",hunter.x,hunter.y);

}


//update GameArea
function updateGameArea()
{

  generateOptions();

 putOptionsOnBoard();
 $("#clue").html(hunterClue);
}

// generateOptions
function generateOptions()
{
  gameOptions=[];

  for(var i=0;i<level+2;i++)
  {
    generateRHint();

    gameOptions.push(new Option(generateXY(),generateXY(),hunter.data));

  }


}

// Put options
function putOptionsOnBoard()
{
  var t;
  for(var i=0;i<gameOptions.length;i++)
  {
    canvasObject.fillStyle="#000";
    canvasObject.fillRect(gameOptions[i].x,gameOptions[i].y,20,20);
    canvasObject.font="13px bold";
    canvasObject.fillStyle="#fff";

      if(gameOptions[i].data<10)
      {
        t="00"+gameOptions[i].data;
      }
      else if(gameOptions[i].data<100)
      {
         t="0"+gameOptions[i].data;
      }
      else
      {
        t=""+gameOptions[i].data;
      }


    canvasObject.fillText(t,gameOptions[i].x,gameOptions[i].y+15);
    canvasObject.fillStyle="#000";
  }
}


//checkGameStatus hits
function checkGameStatus(x,y)
{
  if(x==canvasElement.width || y==canvasElement.width
  || x==-20 || y==-20)
  {
  return true;
}
  else
  {
    return false;
  }
}

//Hit Status

function checkHitStatus()
{
  var b;
  var hit=0;
  for(var i=0;i<gameOptions.length;i++)
  {
    console.log(gameOptions[i].x+"  "+hunter.x);
    console.log(gameOptions[i].y+"  "+hunter.y);
    console.log(gameOptions.length);
    if(gameOptions[i].x == hunter.x
     && gameOptions[i].y==hunter.y)
    {
      if(hunter.data==gameOptions[i].data)
      {
         b=3;
         levelHiker++;
         points=points+(levelHiker*level);
         $("#gamePoints").html(points);
          if(levelHiker%10==0)
          {
            level++;
          }
         canvasObject.clearRect(0,0,canvasElement.width,canvasElement.width);
      }
      else{
        b=2;
      }
      hit++;
      break;
    }
  }
  if(hit==0)
   b=1;
   console.log(b);
  return b;
}




//Working for Arrows keys
document.onkeydown=function(){
var e=window.event;
if (e.keyCode == '38' || e.keyCode== '56') {
        direction=8;
    }
    else if (e.keyCode == '40' || e.keyCode== '50') {
        // down arrow
        direction=2;
    }
    else if (e.keyCode == '37' || e.keyCode== '52') {
       // left arrow
       direction=4;
    }
    else if (e.keyCode == '39' || e.keyCode== '54') {
       // right arrow
       direction=6;
    }
};
