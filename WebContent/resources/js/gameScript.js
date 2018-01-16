




var ques=[];
var res=0;
var r=0;
var score = 0;
var counter = 0;

var userOutputArray = [];
var userQuestions=[];
function rGenerator(){
  return (Math.floor(Math.random()*25))+2;
}
$( document ).ready(function() {
    console.log( "ready!" );


var randomNumber=rGenerator();
var c=new QuestionGame(1,"ravi has 16 rupess the amount ramu has above rupees then total",16,randomNumber,coutput(0,randomNumber,16));

var randomNumber=rGenerator();
var c1=new QuestionGame(2,"Sid has above amount,how much does he have if he doubles the amount",0,randomNumber,coutput(2,randomNumber,0));
var randomNumber=rGenerator();
var c2=new QuestionGame(3,"Sreeman has above amount,if he lost 22 rupees how much he has? ",22,randomNumber,coutput(1,randomNumber,22));
var randomNumber=rGenerator();
var c3=new QuestionGame(4,"A person has above cars someone gifted him another 11 cars how many cars does he have?",11,randomNumber,coutput(0,randomNumber,11));
var randomNumber=rGenerator();
var c4=new QuestionGame(5,"Sita has above rupees she spent 18 rupees ? ",18,randomNumber,coutput(1,randomNumber,18));
var randomNumber=rGenerator();
var c5=new QuestionGame(6,"Siddhartha has above apples he wants double the amount of apples? ",0,randomNumber,coutput(2,randomNumber,0));
var randomNumber=rGenerator();
var c6=new QuestionGame(7,"Cv corp has above students in the span of two weeks, students got doubled, how many students were there after two weeks? ",0,randomNumber,coutput(2,randomNumber,0));
var randomNumber=rGenerator();
var c7=new QuestionGame(8,"Siddhartha travelled above km from A to B, c is the mid point, what is distance between A and C? ",0,randomNumber,coutput(4,randomNumber,0));
var randomNumber=rGenerator();
var c8=new QuestionGame(9,"A kid has above number of choclates in his pocket he lost 10 while he was playing, how many choclates does he have now? ",10,randomNumber,coutput(1,randomNumber,10));
var randomNumber=rGenerator();
var c9=new QuestionGame(10,"A group had above members after few days same amount of members joined the group, total members? ",0,randomNumber,coutput(2,randomNumber,0));
var randomNumber=rGenerator();
var c10=new QuestionGame(11,"A mob attacked some number of people, the injured were four times the above number? ",3,randomNumber,coutput(3,randomNumber,3));
var randomNumber=rGenerator();

ques.push(c);
ques.push(c1);
ques.push(c2);
ques.push(c3);
ques.push(c4);
ques.push(c5);
ques.push(c6);
ques.push(c7);
ques.push(c8);
ques.push(c9);
ques.push(c10);

console.log(ques[0].hint+" "+ques[0].id+" "+ques[0].input);
console.log(ques[0].output);

function coutput(type,inputRandom,input){
   console.log("test");
   if(type==0)
   {
     output=inputRandom+input;
    console.log( output+"   @@@"+inputRandom);
    return output;
   }
  else if(type==1){
     output = inputRandom-input;
         console.log( output+"   @@@"+inputRandom);
           return output;
    // console.log( this.output);
   }
  else if(type==2){
     output = inputRandom+inputRandom;
         console.log( output+"   @@@"+inputRandom);
           return output;
    // console.log( output);
   }
else   if(type==3){
     output = inputRandom*input;
     console.log( output+"   @@@"+inputRandom);
    // console.log( output);
    return output;
   }
  else if(type==4){
     output = inputRandom/2;
       return output;
  //   console.log( output);
   }
else{
  console.log('not working');
}
 }





//Begin game

$('#startbtn').click(function(){

   // startTimerGame();



    runGame();



    $('#startbtn').hide();
    return false;

});

// QuestionGame Model
function QuestionGame(id,hint,input,inputRandom,output)
{
  this.inputRandom=inputRandom;
  this.input=input;
  this.hint=hint;
  this.id=id;
  this.output=output;

}


});








// Running Game

function runGame()
{

  counter++;
  r = (Math.floor(Math.random()*3));
  if(counter==1)
  {
    userQuestions.push(ques[r]);

  }
 else{
    for(var i=0;i<userQuestions.length;i++)
    {
      if(ques[r].id==userQuestions[i].id)
      {
          r = (Math.floor(Math.random()*10));
          i=0;
      }
    }
userQuestions.push(ques[r]);
  }

printData(ques[r]);

}





function printData(question)
{
  document.getElementById('numberGame').innerHTML=ques[r].inputRandom;

  document.getElementById('hintGame').innerHTML=ques[r].hint;

}


$(document).keypress(function(e) {
  if(counter==9)
  {
console.log(score);
}

else  if(e.keyCode==13){


    if(counter>=1){
    if($("#userAnswer").val().length>0)
    {
      userOutputArray.push($("#userAnswer").val());
     console.log(userQuestions[counter-1].output);
      if(userQuestions[counter-1].output==userOutputArray[counter-1])
      {
        score=score+10;
        console.log("correct answer");
          console.log(score);
      }
      else{
        score=score-0.25;
        console.log("wrong answer");
        console.log(score);
      }
      runGame();
      document.getElementById('userAnswer').value = "";
}
else{
  alert("Enter number you dont have enough time");
}
  }
  else {
  console.log("working");

  }

}

});


