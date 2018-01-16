

var studentBase;
var studentIndex;
var offTimer=true;
var dTemp;
var minutes=0;
var seconds=0;


var divIDS = ['aptiSyllabus','javaSyllabus','commSyllabus','linuxSyllabus',"home","profile", "statistics","multipleChoice","theoreticQp",
	"changePassword","JavaFiles","MathFiles","CommsFiles","LinuxFiles","OtherFiles","MySQLFiles","games","sumHunter","uploadResume"];

function displayDiv(e)
{
			for(var i=0;i<divIDS.length;i++)
				{
				
				if(divIDS[i]==e)
					{
					document.getElementById(divIDS[i]).style.display="block"
					}
				else{
					document.getElementById(divIDS[i]).style.display="none"
				}

				}
			}

//flip div
function displayD(e)
{
 if(document.getElementById(e).style.display=='none')
	 document.getElementById(e).style.display='block';
 else
	 document.getElementById(e).style.display='none'
}

// Fetch Report for Home page
function fetchReport(email){ 
	console.log(email);
	let url="getStudentReportViaStudent/"+email+"/any";
		
	$('#ajaxPageLoader').show();
		
    $.get(url , function(data) {
    	data = JSON.parse(data);
    	console.log(data);
    	if(data["scorePerc"]!=null)
    		{
    	displayChart("scoreChart",data["scorePerc"],"Your overall Exams %","Secured %","Lost %");

    	//document.getElementById(email+"ChartMError").innerHTML="You took  <strong>"+data["testCount"]+"</strong> exams in total";
    	
    		}
    	else{
    		displayChart("scoreChart",0,"Your overall Exams %","Secured %","Lost %");
    	}
    	if(data["attendancePerc"]!=-1){
    	displayChart("overAttendanceChart",data["attendancePerc"],"Your overall attendance %","Present %","Absent %");
    	
    	}else{
    		displayChart("overAttendanceChart",0,"Your overall attendance %","Present %","Absent %");
    	}
    	$('#ajaxPageLoader').hide();
    	
    });
	
}




//Get a single paper exam score

function getScore(email,qp_id)
{
	
    $("#resultStats").html("<br><canvas id='myPieChartS' class='sampleCharts'></canvas>");
	$('#ajaxPageLoader').show();
	$.get("getStudentScore/"+email+"/"+qp_id, function (data){
		
		data=JSON.parse(data);
		
		if(!data["status"]){
			
			
	 		   document.getElementById('fail').style.display='block';
	 		document.getElementById('reportF').innerHTML="There is a problem in loading Score";
	 		
	 	    $('#fail').flash_message({
	 	        text: ' ',
	 	        how: 'append',
	 	        idR :'fail'
	 	    });

	 		}
		else
			{
			displayChart("myPieChartS",data["scorePer100"],"Your Score in Exam","secured %","Lost %")
			}
	 if(data["scorePer100"]==-1)
			{
			  alert("Your Theoretical exam paper not corrected by Trainer");
			}
		
			
			
			
			
	 $('#ajaxPageLoader').hide();	
	 		
		
	});
	
}

//Flah Message Script

(function($) {
    $.fn.flash_message = function(options) {
      
      options = $.extend({
        text: 'Done',
        time: 4000,
        how: 'before',
        class_name: ''
      }, options);
      
      return $(this).each(function() {
        if( $(this).parent().find('.flash_message').get(0) )
          return;
        
        var message = $('<span />', {
          'class': 'flash_message ' + options.class_name,
          text: options.text
        }).hide().fadeIn('fast');
        
        $(this)[options.how](message);
        
        message.delay(options.time).fadeOut('normal', function() {
          $(this).remove();
		   $('#'+options.idR).hide();
        });
        
      });
    };
})(jQuery);




//Ajax change password
function changePassword(){
	$('#ajaxPageLoader').show();
 $.post("changeStudentPassword", $("#changeStudentPassword").serialize(), function(data) {
 	data = JSON.parse(data);
 	if(data["status"]){
 		   document.getElementById('success').style.display='block';
 		document.getElementById('reportT').innerHTML=data["notification"];
 		
 	    $('#success').flash_message({
 	        text: ' ',
 	        how: 'append',
 	        idR :'success'
 	    });
 		document.getElementById('changeStudentPassword').reset();
 		}
 		else{
 			document.getElementById('fail').style.display='block';
 			document.getElementById('reportF').innerHTML=data["notification"];
 			$('#fail').flash_message({
     	        text: ' ',
     	        how: 'append',
     	        idR :'fail'
     	    });
 		}
 	$('#ajaxPageLoader').hide();
 });
}


//Check QA Answers
function checkQAAnswers(email,qp_id,testNameQP)
{
	 $('#ajaxPageLoader').show();
	 var st="<p class='testNameOfQPs'><span class='testNameTextHead'>Test Name : </span>"+testNameQP+"</p>";
	var t,count=1;
	$.get("getStudentQAAnswerPaper/"+email+"/"+qp_id, function(data){
		
		console.log(data);
		if(data["list"]!=null)
			{
			
			for(var i=0;i<data["list"].length;i++)
				{
				
				 t=data["list"][i];
				 st=st+"<p><span class='QPNum'>"+count+". </span><span class='theoryQp'><pre>"+t.question+"</pre></span></p><div class='row' style='padding:20px'><pre>"+t.answer+"</pre></div>";
			  		
				  	if(t.marksPercent<=35)
				  	{	
				  		st=st+"<div class='row' style='text-align:right'>" +
				  				"<p><span class='allotedMarks'>Alloted Marks Percent(%) : </span><span class='redClass clrsClass'>"+t.marksPercent+"% </span></p>" +
				  						  						"</div>";
				  	}
				  	else if(t.marksPercent<=75)
				  	{	
				  		st=st+"<div class='row' style='text-align:right'>" +
		  				"<p><span class='allotedMarks'>Alloted Marks Percent(%) : </span><span class='clrAvg clrsClass'>"+t.marksPercent+"% </span></p>" +
		  						  						"</div>";
				  	}
				  	else
				  	{
				  		st=st+"<div class='row' style='text-align:right'>" +
		  				"<p><span class='allotedMarks'>Alloted Marks Percent(%) : </span><span class='greenClass clrsClass'>"+t.marksPercent+"% </span></p>" +
		  						  						"</div>";
				  	}
				  	st=st+"<div class='row'>Google Help:<br> <a href='https://www.google.co.in/search?q="+t.question+"' target='_blank'>Ask <i style='color:green' class='fa fa-google' aria-hidden='true'></i></a></div>";
				  	st=st+"<hr>";
				  	
			  		count++;
			    }
			$("#resultStats").html(st);
			
			}
		else
			{
			document.getElementById('fail').style.display='block';
			document.getElementById('reportF').innerHTML="There is a problem in getting data";
			$('#fail').flash_message({
		        text: ' ',
		        how: 'append',
		        idR :'fail'
		    });
			}
		
		 $('#ajaxPageLoader').hide();

	});
	
	}

//Check Paper and Answers
function checkPaperAnswers(email,qp_id,questions,testNameQP)
{
	var userOptions;
	$("#ajaxPageLoader").show();
	$.get("viewPaperStudent/"+questions, function(data)
			{
		
		$.get("userMOptions/"+email+"/"+qp_id, function(d){
			
			console.log(d);
			userOptions=d.split(",");
			console.log(userOptions.length+"  "+data['questionsList'].length);
	
			
	var st="<p class='testNameOfQPs'><span class='testNameTextHead'>Test Name : </span>"+testNameQP+"</p>";
	console.log(questions);
	var e=document.getElementById("resultStats");
	
	var t;var count=1;
	for(var i=0;i<data['questionsList'].length;i++)
	{
	 t=data['questionsList'][i];
	 
	st=st+"<div class='row'>" +
			"<div class='col-md-12'>" +
			"<span style='color:red;'>Question No : </span><span style='color:green'>"+count+"</span>" +
			"</div></div>" +
			"<div class='row'>" +
			"<div class='col-md-12'> <strong><pre>"+t.question+"</pre></strong></div></div>" +
			"<div class='row'>" +
			"<div class='col-sm-2'> A) "+t.optionA+"</div>"+"<div class='col-sm-2'> B) "+t.optionB+"</div>" +
			"<div class='col-sm-2'> C) "+t.optionC+"</div><div class='col-sm-2'> D) "+t.optionD+"</div><div class='col-sm-4'> E) "+t.optionE+"</div></div>" +
			"<div class='row'>" +
			"<div class='col-sm-4'><small> Key : </small><i><strong>"+t.qkey+"</i></strong></div>" +
			"<div class='col-sm-4'><small>Your Answer : </small><i><strong>"+userOptions[i+1]+"</i></strong></div>" +
			"<div class='col-sm-4'><small>Difficulty : </small><i><strong>"+t.difficulty+"</i></strong></div>" +
			"</div><div class='row'>Explanation:<br> <pre>"+t.explanation+"</pre></div>"+
			"<div class='row'>Google Help:<br> <a href='https://www.google.co.in/search?q="+t.question+"' target='_blank'>Ask <i style='color:green' class='fa fa-google' aria-hidden='true'></i></a></div>";
	count+=1;
	}
	e.innerHTML=st;
	$("#ajaxPageLoader").hide();
		});
			});
	
	
	}


//Topic Model

function Topic(topic,qCount,wrongQCount,wrongQuestions)
{
this.topic=topic;
this.qCount=qCount;
this.wrongQCount=wrongQCount;
this.wrongQuestions=wrongQuestions;

}
// Wrong Question Model
 function WrongQuestion(question,qkey,yourAnswer,optionA,optionB,optionC,optionD,optionE)
 {
	this.question=question;
	this.qkey=qkey;
	this.yourAnswer=yourAnswer;
	this.optionA=optionA;
	this.optionB=optionB;
	this.optionC=optionC;
	this.optionD=optionD;
	this.optionE=optionE;
	
	
 }

 var userAllPapersAnswers=[];
 var questionsAllPapersData=[];
 
 function AllPapersDataQ(qp_id,questionsList)
 {
	this.qp_id=qp_id;
	this.questionsList=questionsList;
 }
 
 function AllPapersDataO(qp_id,optionsList)
 {
	 this.qp_id=qp_id;
	 this.optionsList=optionsList;
 }
 
 
 
 // Final Analysis
 function prepareForSummary(element,qp_id,questions,email)
 {
	 $("#ajaxPageLoader").show();
	 if(element.checked)
	 {
	 $.get("viewPaperStudent/"+questions, function(data)
				{
			
		              
		  
			$.get("userMOptions/"+email+"/"+qp_id, function(d){
				
				d=d.split(",");
				d.splice(0,1);
				d.splice(d.length-1,1);
				userAllPapersAnswers.push(new AllPapersDataO(qp_id,d));
				
				 questionsAllPapersData.push(new AllPapersDataQ(qp_id,data["questionsList"]));
				 topicsSummaryMultiplePapers();
			});
				});
	 }
	 else{
		 
		 for(var i=0;i<userAllPapersAnswers.length;i++)
			 {
			   if(qp_id==userAllPapersAnswers[i].qp_id)
				   {
				   userAllPapersAnswers.splice(i,1);
				   questionsAllPapersData.splice(i,1);
				   break;
				   }
			 }
		 topicsSummaryMultiplePapers(); 
	 }
	
	
 }
 
 //Topic Summary of multiple papers
 //
 
 
 function topicsSummaryMultiplePapers()
 {
	 var points=["You did a splendid Job I can't believe you scored Fullest Percentage, But don't let this you to get into relax mode.",
			"Excellent Job! You Performed Well in the Examination but don't be relaxed",
			"You scored a very good score, But Why did you miss the remaining look at them once",
			"You have Scored Good Score but you missed others look at them",
			"Ok, But it's not up to your level must Consider this don't leave it",
			"I believe You Have the ability to score fullest, May be I think your hardWork is not as expected. So Work hard Buddy",
			"Hey! the score is not as expected. What happend to you. I know this is not your score. But Why is this happend? Take it seriously",
			"It's too low. Anything wrong? I can't expect this kind of score. You Have to put more efforts and hardwork. Hope you won't repeat this.",
			"Bad Score! Your HardWork is required.",
			"Worst Score! More and More HardWork is required",
			"No Comment! Please Think about Your progress"];
		var studyAdvice;
		var st="<div class='row'>";
		var marks=0;
		var marksPercent;
	    
		var d=[];
		 var data=[];
		 
		 for(i=0;i<userAllPapersAnswers.length;i++)
			 {
			 
			   for(j=0;j<userAllPapersAnswers[i].optionsList.length;j++)
				   {
				   d.push(userAllPapersAnswers[i].optionsList[j]);
					  data.push(questionsAllPapersData[i].questionsList[j]);
				   }
				
				
			 }
		 
		 console.log(d);
		 console.log(data);
		 
		  var answeredCount=0;
		  var topicsToFocus=[];
		  var tDuplicate=0;
		  for(var i=0;i<d.length;i++)
			  {
			  
			  tDuplicate=0;
			    if(d[i]!="NA")
			    	answeredCount++;
			    if(d[i]!=data[i].qkey)
			    	{
			    	 for(j=0;j<topicsToFocus.length;j++)
			    		 {
			    		   if(data[i].topic==topicsToFocus[j])
			    			   tDuplicate=1;  
			    		 }
			    	 if(tDuplicate==0)
			    	topicsToFocus.push(data[i].topic);
			    	
			    	}
			    else{
			    	marks++;
			    }
			  }
		  marksPercent=parseInt((marks*100)/data.length);
		  
		  if(marksPercent>=100)
			  studyAdvice=points[0];
		  else if(marksPercent>=95)
			  studyAdvice=points[1];
		  else if(marksPercent>=90)
			  studyAdvice=points[2];
		  else if(marksPercent>=80)
			  studyAdvice=points[3];
		  else if(marksPercent>=70)
			  studyAdvice=points[4];
		  else if(marksPercent>=60)
			  studyAdvice=points[5];
		  else if(marksPercent>=45)
			  studyAdvice=points[6];
		  else if(marksPercent>=35)
			  studyAdvice=points[7];
		  else if(marksPercent>=20)
			  studyAdvice=points[8];
		  else if(marksPercent>=10)
			  studyAdvice=points[9];
		  else
			  studyAdvice=points[10];
		  
		  
		  var diffTopics=[];
		  var diffTopicsQCount=[];
		  tDuplicate=0;
		  
		  for(i=0;i<data.length;i++)
			  {
			  tDuplicate=0;
			    for(j=0;j<diffTopics.length;j++)
			    	{
			    	  if(data[i].topic==diffTopics[j])
			    		  {
			    		  tDuplicate=1;
			    		  
			    		  }
			    	}
			    if(tDuplicate==0)
			    	diffTopics.push(data[i].topic); 	
			  }
		  
		  
		  //Topic wise statistics
		  var qCount=0;
		  var wrongQCount=0;
		  var wrongQuestion;
		  var wrongQuestions=[];
		  var multopics=[];
		  for(i=0;i<diffTopics.length;i++)
			  {
			  
			  wrongQCount=0;
			       qCount=0;
			       wrongQuestions=[];
			      for(j=0;j<data.length;j++)
			    	  {
			    	    if(diffTopics[i]==data[j].topic)
			    	    	{
			    	    	qCount++;
			    	    	 if(d[j]!=data[j].qkey)
			    	    		 {
			    	    		 wrongQCount++;
			    	    		 wrongQuestions.push(new WrongQuestion(data[j].question,data[j].qkey,d[j],data[j].optionA,data[j].optionB,data[j].optionC,data[j].optionD,data[j].optionE));
			    	    		 }
			    	    	}
			    	  }
			      
			      multopics.push(new Topic(diffTopics[i],qCount,wrongQCount,wrongQuestions));
			  }
		  
		st=st+"<div class='col-md-7'>" +
				"<p><span style='font-weight:600;font-size:12px;'>Total Number of Questions :</span> <span style='color:#00a69c'>"+data.length+"</span></p>" +
				"<p><span style='font-weight:600;font-size:12px;'>Total Number of Questions answered : </span> <span style='color:#00a69c'>"+answeredCount+"</span></p>" +
				"<p><span style='font-weight:600;font-size:12px;'>Total Number of Questions Correctly Answered : </span> <span style='color:#00a69c'>"+marks+"</span></p>" +
				"</div>";
			if(marksPercent<=35)
			{
				st=st+"<div class='col-md-5'><br><p style='marging-top:1%;'><span style='font-weight:600;font-size:12px;'>Your total score : </span><span class='redClass clrsClass'>"+marksPercent+"%</span></p>"+
				"</div></div>";
			}
			else if(marksPercent>35 && marksPercent<=75)
			{
				st=st+"<div class='col-md-5'><br><p style='marging-top:1%;'><span style='font-weight:600;font-size:12px;'>Your total score : </span><span class='clrAvg clrsClass'>"+marksPercent+"%</span></p>"+
				"</div></div>";
			}
			else
			{
				st=st+"<div class='col-md-5'><br><p style='marging-top:1%;'><span style='font-weight:600;font-size:12px;'>Your total score : </span><span class='greenClass clrsClass'>"+marksPercent+"%</span></p>"+
				"</div></div>";
			}
				
			st=st+"<div class='row' style='border:1px solid #4e4e4e;border-radius:5px;'><div class='col-md-12'>";
		
		if(answeredCount!=data.length)
		st=st+"<span style='color:#4e4e4e;font-weight:600;'>Note : </span><span style='color:red'> It's not fare that you did not even attempt all Questions. The Exam Doesn't even have any Negative Marking</span>"+"<br>";
	/*
		st=st+"Different Topics Covered In this Question Paper"+"<br>";
		
		for(i=0;i<diffTopics.length;i++)
		{
			st=st+"<span style='margin:3px;border-radius:20%;padding:5px;color:black;background-color:#DDD6D4'>"+diffTopics[i]+"</span>";
		}
		st=st+"<br>";
		*/
		
		st=st+"<canvas id='topicsBarGraph'></canvas>" +
				"</div></div>" +
				"<br><div class='row' style='height:450px;'><div class='col-md-8' style='height:450px;overflow:scroll;'>";
		
		/*st=st+"<p style='padding-top:1%;font-size:16px;text-align:center;font-weight:600px;color:#ff6666;'>Topics You have to Focus More"+"</p>";
		for(i=0;i<topicsToFocus.length;i++)
		{
			st=st+"<p style='padding:5px;font-size:12px;text-align:center;width:90% !important;color:black;background-color:#DDD6D4'>"+topicsToFocus[i]+"</p>";
		}
		
		st=st+"</div>" +
				"<div class='col-md-8' style='overflow:scroll;height:440px;'>";*/
		
		var labelsData=[];
		var percentData=[];
		var colors=[];
		st=st+"<p style='padding-top:1%;font-size:16px;text-align:center;font-weight:600;color:#ff6666;'>Look in Detail"+"</p>";
		for(i=0;i<multopics.length;i++)
			{
			st=st+"<p style='font-weight:600;font-size:12px'>Topic: <span style='color:#ff6666'>"+multopics[i].topic+"</span> Score Percent : <span style='font-weight:500;color:#00a69c;'>"+parseInt((multopics[i].qCount-multopics[i].wrongQCount)*100/multopics[i].qCount)+"%</span></p>";
			 st=st+"<p style='font-weight:600;font-size:12px'>Totoal Questions from Topic : <span style='font-weight:600;color:#000;'>"+multopics[i].qCount+"</span></p>";
			if(multopics[i].wrongQCount!=0)
				{
			 
			 st=st+"<p style='font-size:12px'>You did not Score for <span style='font-weight:600;color:#ff6666;'>"+multopics[i].wrongQCount+"</span> Questions</p>";
			 st=st+"<p style='font-weight:600;font-size:12px'>Want To See Questions You missed scoring : <button class='btn btn-default' style='color:#ff6666;border:1px solid #ff6666;border-radius:5px;font-size:10px;font-weight:600;' onclick='displayD(\"wrongQuestions"+i+"\")'>Click Here</button></p><hr>";
			 st=st+"<span id='wrongQuestions"+i+"' style='display:none'>";
			 for(j=0;j<multopics[i].wrongQuestions.length;j++)
				 {
				 st=st+"<p><span style='color:red;font-size:12px;'>Question No: </span><span style='color:#00a69c'>"+(j+1)+"</span></p>" +
				 		"<p style='font-weight:600;font-size:12px;'> "+multopics[i].wrongQuestions[j].question+"</p>";
				 st=st+"<p>A) "+multopics[i].wrongQuestions[j].optionA+"<span style='margin-left:10px;'>B) "+multopics[i].wrongQuestions[j].optionB+"</span><span style='margin-left:10px;'>C) "+multopics[i].wrongQuestions[j].optionC+"</span><span style='margin-left:10px;'>D) "+multopics[i].wrongQuestions[j].optionD+"</span><span style='margin-left:10px;'>E) "+multopics[i].wrongQuestions[j].optionE+"</span></p>";
				 st=st+"<p>Key : <span style='font-weight:600;'>"+multopics[i].wrongQuestions[j].qkey+"</span><span style='margin-left:2%'> Your Answer: </span><span style='font-weight:600;'>"+multopics[i].wrongQuestions[j].yourAnswer+"</span></p><hr><br>";
				  
				 st=st+"<p>Google Help:<br> <a href='https://www.google.co.in/search?q="+multopics[i].wrongQuestions[j].question+"' target='_blank'>Ask <i style='color:green' class='fa fa-google' aria-hidden='true'></i></a></p>";
				 }
			 st=st+"</span>";
			}
			 else{
				 st=st+"<p style='font-size:12px'>Good You have Answered All Questions</p>";
			 }
			 labelsData.push(multopics[i].topic);
		
			 percentData.push(parseInt((multopics[i].qCount-multopics[i].wrongQCount)*100/multopics[i].qCount));
			 
			 if(parseInt((multopics[i].qCount-multopics[i].wrongQCount)*100/multopics[i].qCount)>75)
				 colors.push("green");
			 else  if(parseInt((multopics[i].qCount-multopics[i].wrongQCount)*100/multopics[i].qCount)>45)
			     colors.push("yellow");
			 else
				 colors.push("red");
			}
		st=st+"</div><div class='col-md-4'>";
		
		st=st+"<p style='text-align:center;color:#00a69c;font-weight:600;font-size:16px;'>Study Advicer's Advice</p>"+studyAdvice+"<br>";
				
		st=st+"</div></div>";
		
		$("#resultStats").html(st);
		displayBarGraph('topicsBarGraph',percentData,'Topic Wise Analysis',labelsData,colors);
		
	 
		
		
	 
	 $("#ajaxPageLoader").hide();
 }
 

//Analysis
function analysisOfExam(email,qp_id,questions,testNameQP)
{
	
	var points=["You did a splendid Job I can't believe you scored Fullest Percentage, But don't let this you to get into relax mode.",
		"Excellent Job! You Performed Well in the Examination but don't be relaxed",
		"You scored a very good score, But Why did you miss the remaining look at them once",
		"You have Scored Good Score but you missed others look at them",
		"Ok, But it's not up to your level must Consider this don't leave it",
		"I believe You Have the ability to score fullest, May be I think your hardWork is not as expected. So Work hard Buddy",
		"Hey! the score is not as expected. What happend to you. I know this is not your score. But Why is this happend? Take it seriously",
		"It's too low. Anything wrong? I can't expect this kind of score. You Have to put more efforts and hardwork. Hope you won't repeat this.",
		"Bad Score! Your HardWork is required.",
		"Worst Score! More and More HardWork is required",
		"No Comment! Please Think about Your progress"];
	var studyAdvice;
	var st="<div class='row'>";
	var marks=0;
	var marksPercent;

	$("#ajaxPageLoader").show();
	$.get("viewPaperStudent/"+questions, function(data)
			{
		
		$.get("userMOptions/"+email+"/"+qp_id, function(d){
			
			  d=d.split(",");
			  var answeredCount=0;
			  var topicsToFocus=[];
			  var tDuplicate=0;
			  for(var i=1;i<d.length-1;i++)
				  {
				  
				  tDuplicate=0;
				    if(d[i]!="NA")
				    	answeredCount++;
				    if(d[i]!=data['questionsList'][i-1].qkey)
				    	{
				    	 for(j=0;j<topicsToFocus.length;j++)
				    		 {
				    		   if(data['questionsList'][i-1].topic==topicsToFocus[j])
				    			   tDuplicate=1;  
				    		 }
				    	 if(tDuplicate==0)
				    	topicsToFocus.push(data['questionsList'][i-1].topic);
				    	
				    	}
				    else{
				    	marks++;
				    }
				  }
			  marksPercent=parseInt((marks*100)/data['questionsList'].length);
			  
			  if(marksPercent>=100)
				  studyAdvice=points[0];
			  else if(marksPercent>=95)
				  studyAdvice=points[1];
			  else if(marksPercent>=90)
				  studyAdvice=points[2];
			  else if(marksPercent>=80)
				  studyAdvice=points[3];
			  else if(marksPercent>=70)
				  studyAdvice=points[4];
			  else if(marksPercent>=60)
				  studyAdvice=points[5];
			  else if(marksPercent>=45)
				  studyAdvice=points[6];
			  else if(marksPercent>=35)
				  studyAdvice=points[7];
			  else if(marksPercent>=20)
				  studyAdvice=points[8];
			  else if(marksPercent>=10)
				  studyAdvice=points[9];
			  else
				  studyAdvice=points[10];
			  
			  
			  var diffTopics=[];
			  var diffTopicsQCount=[];
			  tDuplicate=0;
			  
			  for(i=0;i<data['questionsList'].length;i++)
				  {
				  tDuplicate=0;
				    for(j=0;j<diffTopics.length;j++)
				    	{
				    	  if(data['questionsList'][i].topic==diffTopics[j])
				    		  {
				    		  tDuplicate=1;
				    		  
				    		  }
				    	}
				    if(tDuplicate==0)
				    	diffTopics.push(data['questionsList'][i].topic); 	
				  }
			  
			  
			  //Topic wise statistics
			  var qCount=0;
			  var wrongQCount=0;
			  var wrongQuestion;
			  var wrongQuestions=[];
			  var multopics=[];
			  for(i=0;i<diffTopics.length;i++)
				  {
				  
				  wrongQCount=0;
				       qCount=0;
				       wrongQuestions=[];
				      for(j=0;j<data['questionsList'].length;j++)
				    	  {
				    	    if(diffTopics[i]==data['questionsList'][j].topic)
				    	    	{
				    	    	qCount++;
				    	    	 if(d[j+1]!=data['questionsList'][j].qkey)
				    	    		 {
				    	    		 wrongQCount++;
				    	    		 wrongQuestions.push(new WrongQuestion(data['questionsList'][j].question,data['questionsList'][j].qkey,d[j+1],data['questionsList'][j].optionA,data['questionsList'][j].optionB,data['questionsList'][j].optionC,data['questionsList'][j].optionD,data['questionsList'][j].optionE));
				    	    		 }
				    	    	}
				    	  }
				      
				      multopics.push(new Topic(diffTopics[i],qCount,wrongQCount,wrongQuestions));
				  }
			  
			st=st+"<p class='testNameOfQPs'><span class='testNameTextHead'>Test Name : </span>"+testNameQP+"</p>" +
					"<div class='col-md-7'>" +
					"<p><span class='testDetailsQps'>Total Number of Questions :</span> <span style='color:#00a69c'>"+data['questionsList'].length+"</span></p>" +
					"<p><span class='testDetailsQps'>Total Number of Questions answered : </span> <span style='color:#00a69c'>"+answeredCount+"</span></p>" +
					"<p><span class='testDetailsQps'>Total Number of Questions Correctly Answered : </span> <span style='color:#00a69c'>"+marks+"</span></p>" +
					"</div>";
				if(marksPercent<=35)
				{
					st=st+"<div class='col-md-5'><br><p style='marging-top:1%;'><span class='testDetailsQps'>Your total score : </span><span class='resultBox resultBox35'>"+marksPercent+"%</span></p>"+
					"</div></div>";
				}
				else if(marksPercent>35 && marksPercent<=75)
				{
					st=st+"<div class='col-md-5'><br><p style='marging-top:1%;'><span style='font-weight:600;font-size:12px;'>Your total score : </span><span class='resultBox resultBox75'>"+marksPercent+"%</span></p>"+
					"</div></div>";
				}
				else
				{
					st=st+"<div class='col-md-5'><br><p style='marging-top:1%;'><span style='font-weight:600;font-size:12px;'>Your total score : </span><span class='resultBox resultBox100'>"+marksPercent+"%</span></p>"+
					"</div></div>";
				}
					
				st=st+"<div class='row graphRowQps'><div class='col-md-12'>";
			
			if(answeredCount!=data['questionsList'].length)
			st=st+"<p class='noteTextClass'><span style='color:#4e4e4e;font-weight:600;'>Note : </span><span style='color:red'> It's not fare that you did not even attempt all Questions. The Exam Doesn't even have any Negative Marking</span>"+"</p>";
		/*
			st=st+"Different Topics Covered In this Question Paper"+"<br>";
			
			for(i=0;i<diffTopics.length;i++)
			{
				st=st+"<span style='margin:3px;border-radius:20%;padding:5px;color:black;background-color:#DDD6D4'>"+diffTopics[i]+"</span>";
			}
			st=st+"<br>";
			*/
			
			st=st+"<canvas id='topicsBarGraph'></canvas>" +
					"</div></div>" +
					"<br><div class='row' style='height:450px;'><div class='col-md-8' style='height:450px;overflow:scroll;'>";
			
			/*st=st+"<p style='padding-top:1%;font-size:16px;text-align:center;font-weight:600px;color:#ff6666;'>Topics You have to Focus More"+"</p>";
			for(i=0;i<topicsToFocus.length;i++)
			{
				st=st+"<p style='padding:5px;font-size:12px;text-align:center;width:90% !important;color:black;background-color:#DDD6D4'>"+topicsToFocus[i]+"</p>";
			}
			
			st=st+"</div>" +
					"<div class='col-md-8' style='overflow:scroll;height:440px;'>";*/
			
			var labelsData=[];
			var percentData=[];
			var colors=[];
			st=st+"<p class='lookInDetailsText'>Look in Detail"+"</p>";
			for(i=0;i<multopics.length;i++)
				{
				
				 
				 st=st+"<p class='testDetailsQps'>Topic: <span style='color:#ff6666'>"+multopics[i].topic+"</span> Score Percent : <span style='font-weight:500;color:#00a69c;'>"+parseInt((multopics[i].qCount-multopics[i].wrongQCount)*100/multopics[i].qCount)+"%</span></p>";
				 st=st+"<p class='testDetailsQps'>Totoal Questions from Topic : <span style='font-weight:600;color:#00a69c;'>"+multopics[i].qCount+"</span></p>";
				
				 if(multopics[i].wrongQCount!=0)
					{
					 st=st+"<p class='testDetailsQps'>You did not Score for <span style='font-weight:600;color:#ff6666;'>"+multopics[i].wrongQCount+"</span> Questions</p>";
				 st=st+"<p class='testDetailsQps'>Want To See Questions You missed scoring : <button class='btn btn-default' style='color:#ff6666;border:1px solid #ff6666;border-radius:5px;font-size:10px;font-weight:600;' onclick='displayD(\"wrongQuestions"+i+"\")'>Click Here</button></p><hr>";
				 st=st+"<span id='wrongQuestions"+i+"' style='display:none'>";
				 for(j=0;j<multopics[i].wrongQuestions.length;j++)
					 {
					 st=st+"<p><span style='color:red;font-size:12px;'>Question No: </span><span style='color:#00a69c'>"+(j+1)+"</span></p>" +
					 		"<p class='testDetailsQps'> "+multopics[i].wrongQuestions[j].question+"</p>";
					 st=st+"<p style='font-size:12px;'>A) "+multopics[i].wrongQuestions[j].optionA+"<span style='margin-left:10px;font-size:12px;'>B) "+multopics[i].wrongQuestions[j].optionB+"</span><span style='margin-left:10px;font-size:12px;'>C) "+multopics[i].wrongQuestions[j].optionC+"</span><span style='margin-left:10px;font-size:12px;'>D) "+multopics[i].wrongQuestions[j].optionD+"</span><span style='margin-left:10px;font-size:12px;'>E) "+multopics[i].wrongQuestions[j].optionE+"</span></p>";
					 st=st+"<p style='font-size:12px;'>Key : <span style='font-weight:600;'>"+multopics[i].wrongQuestions[j].qkey+"</span><span style='margin-left:2%;font-size:12px;'> Your Answer: </span><span style='font-weight:600;'>"+multopics[i].wrongQuestions[j].yourAnswer+"</span></p><hr>";
					 st=st+"<p>Google Help:<br> <a href='https://www.google.co.in/search?q="+multopics[i].wrongQuestions[j].question+"' target='_blank'>Ask <i style='color:green' class='fa fa-google' aria-hidden='true'></i></a></p>";
					 }
				 st=st+"</span>";
					}
				 else{
					 st=st+"<p style='font-size:12px'>Good You have Answered All Questions</p>";
				 }
				 labelsData.push(multopics[i].topic);
			
				 percentData.push(parseInt((multopics[i].qCount-multopics[i].wrongQCount)*100/multopics[i].qCount));
				 
				 if(parseInt((multopics[i].qCount-multopics[i].wrongQCount)*100/multopics[i].qCount)>75)
					 colors.push("green");
				 else  if(parseInt((multopics[i].qCount-multopics[i].wrongQCount)*100/multopics[i].qCount)>45)
				     colors.push("yellow");
				 else
					 colors.push("red");
				}
			st=st+"</div><div class='col-md-4'>";
			
			st=st+"<p class='adviseClass'>Study Advicer's Advice</p>"+studyAdvice;
					
			st=st+"</div></div>";
			console.log(st);
			$("#resultStats").html(st);
			displayBarGraph('topicsBarGraph',percentData,'Topic Wise Analysis',labelsData,colors);
			$("#ajaxPageLoader").hide();
		});
		
			});
			
}

//get Multiple Question paper

function viewQPaper(questions,qp_id,limit){
	offTimer=true;
	$('#ajaxPageLoader').show();
	console.log("testing");
	var t;
	var st="<p class='timeText' style='position:fixed !important;right:0 !important;z-index:1;'><i class='fa fa-clock-o timeIcon'></i>Time :<span id='mTimer'>30:27</span></p>";
	$.get("viewPaper/"+questions, function(data){
		
		console.log(data);
		dTemp=data;
		for(var i=0;i<data['questionsList'].length;i++)
		{
		 t=data['questionsList'][i];
		st=st+"<div class='row'><strong style='color:red;'>Question :<span style='color:#00a69c'>"+(i+1)+"</span></strong></div><div class='row'><br><strong><pre>"+t.question+"</pre></strong></div>"+"<div class='row'><div class='col-sm-2'><input type='radio' name='"+t.question_id+"' value='A'>A)"+t.optionA+""+"</div><div class='col-sm-3'><input type='radio' name='"+t.question_id+"' value='B'>B)"+t.optionB+"</div><div class='col-sm-2'>" +
				"<input type='radio' name='"+t.question_id+"' value='C'>C)"+t.optionC+"</div><div class='col-sm-2'><input type='radio' name='"+t.question_id+"' value='D'>D)"+t.optionD+"</div><div class='col-sm-2'><input type='radio' name='"+t.question_id+"' value='E'>E)"+t.optionE+"</div></div>";
				
		}
		st=st+"<button type='submit' style='position: absolute !important' class='btn btn-default theoeryBtnSave' onclick='submitExam("+qp_id+")'>Submit</button>";
		$("#multipleQPaper").html(st);
		$('#overlayForM').show();
		
		beginM(limit,qp_id);
		$('#ajaxPageLoader').hide();
		
	});
}


//begin M

//Begin Timer
function beginM(limit,qp_id) {

    var t = 60 * limit;
        display = document.getElementById('mTimer');
    startTimerM(t, display,qp_id);
}


//
function startTimerM(duration, display,qp_id) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
 
    var t;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);
      

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + ":" + seconds; 
        
        
        //Setting Time and etc 
       
        

        
        if(diff == 120)
        	{
        	document.getElementById("mTimer").style.backgroundColor="red";
        	}

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            	
        	
           // document.getElementById("ex").submit();
        	
        	
        	submitExam(qp_id);
            
            offTimer=false;
            clearInterval(t);
            console.log("checking");
        	
        }
    };
    // we don't want to wait a full second before the timer starts
    if(offTimer)
    	{
    timer();
    	}
   
   t= setInterval(timer, 1000);
    	
    
}




//Submit Exam
function submitExam(qp_id)
{
	$('#ajaxPageLoader').show();
	var marks=0;
	var t;
	var userAnswers=",";
	var temp;
	var tempValue;
	for(var i=0;i<dTemp['questionsList'].length;i++)
		{
		 t=dTemp['questionsList'][i];
		  temp=document.getElementsByName(t.question_id);
		 tempValue=0;
		  for(var j=0;j<temp.length;j++)
			  {
			  if(temp[j].checked && temp[j].value==t.qkey)
				  {
				    marks++;
				  }
			  if(temp[j].checked)
				  {
				  tempValue=temp[j].value;
				  
				  }
			
			  }
		  if(tempValue!=0)
			  userAnswers=userAnswers+tempValue+",";
		  else
			  userAnswers=userAnswers+"NA,";
		}
	var scorePer100=(marks/dTemp['questionsList'].length)*100;
	
	 var url='registerAnswers/'+qp_id+'/'+scorePer100+'/'+userAnswers;
	 
	 
	 $.get(url,function(data){
		
		 data = JSON.parse(data);
		 
		 	if(data["status"]){
		 		   document.getElementById('success').style.display='block';
		 		document.getElementById('reportT').innerHTML=data["notification"];
		 		
		 	    $('#success').flash_message({
		 	        text: ' ',
		 	        how: 'append',
		 	        idR :'success'
		 	    });
		 	    location.reload();
		 		}
		 		else{
		 			document.getElementById('fail').style.display='block';
		 			document.getElementById('reportF').innerHTML=data["notification"];
		 			$('#fail').flash_message({
		     	        text: ' ',
		     	        how: 'append',
		     	        idR :'fail'
		     	    });
		 		}
		 	$('#ajaxPageLoader').hide();
		
		 offTimer=false;
	 });
}


// Begin Timer
function begin(limit) {
	$("#qaTimerLoad").show();
    var t = 60 * limit;
        display = document.getElementById('qaTimer');
    startTimer(t, display);
}


//
function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
 
    var t;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);
      

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + ":" + seconds; 
        
        
        //Setting Time and etc 
        var students=JSON.parse(localStorage.getItem("students"));
        students.splice(studentIndex,1);
        if(minutes>2)
        studentBase.qTimer=minutes;
        students.push(studentBase);
        localStorage.setItem("students",JSON.stringify(students));
        

        
        if(diff == 120)
        	{
        	document.getElementById("qaTimer").style.backgroundColor="red";
        	}

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            	
        	
           // document.getElementById("ex").submit();
        	
        	
        	submitQAExam();
            
            offTimer=false;
            clearInterval(t);
            console.log("checking");
        	
        }
    };
    // we don't want to wait a full second before the timer starts
    if(offTimer)
    	{
    timer();
    	}
   
   t= setInterval(timer, 1000);
    	
    
}



//Submit QAExam
function submitQAExam()
{
	
	offTimer=false;
	$('#ajaxPageLoader').show();
    $.post("submitQAExam", $("#QAAnswersForm").serialize(), function (data){
    	
    	data = JSON.parse(data);
     	if(data["status"]){
     		   document.getElementById('success').style.display='block';
     		document.getElementById('reportT').innerHTML=data["notification"];
     		
     	    $('#success').flash_message({
     	        text: ' ',
     	        how: 'append',
     	        idR :'success'
     	    });
     		
     		localStorage.clear();
     		}
     		else{
     			document.getElementById('fail').style.display='block';
     			document.getElementById('reportF').innerHTML=data["notification"];
     			$('#fail').flash_message({
         	        text: ' ',
         	        how: 'append',
         	        idR :'fail'
         	    });
     		}
     	$('#ajaxPageLoader').hide();
    	
     	 location.reload();
     	 
    	
    });
   
	
}



// get QA Question paper

function viewQAPaper(questions,limit,qp_id,email)
{
	
	$('#ajaxPageLoader').show();
	

	var t;
	var st="<i class='fa fa-clock fa-spin fa-3x fa-fw' style='float:right;'></i>"+
			"<p class='timeText'><i class='fa fa-clock-o timeIcon'></i>Time :<span id='qaTimer'>30:27</span></p>" +
			"<div class='form-group' style='margin:1%;'>" +
			"<button type='submit' class='btn btn-default theoeryBtnSave' onclick='prepareLocalData("+limit+","+qp_id+",\""+email+"\",\""+questions+"\",1)'>Save</button>" +
			"</div>" +
			"<div class='row'>" +
			"<div class='col-md-1 col-sm-1 col-xs-0'></div>" +
			"<div class='col-md-10 col-sm-10 col-xs-12 testRowClass' style='border:1px solid #4e4e4e;border-radius:5px;'><form id='QAAnswersForm' style='margin:1%;'>" +
			"<input type='text' style='display:none;' name='qp_id' value='"+qp_id+"'>";
	$.get("viewQAPaper/"+questions, function(data){
		
		
		console.log(data);
		var t;
		for(var i=0;i<data['qaQuestionsList'].length;i++)
		{
		 t=data['qaQuestionsList'][i];
		 
		 st=st+"<input type='text' name=question_id style='display:none' value='"+t.question_id+"'><p class='questionClass'><span>Q"+i+").</span><span><pre>"+t.question+"</pre></span></p>"+
									"<button  onclick='displayD(\"qa"+i+"\"); return false;' class='btn btn-default showBtn'>Write answer</button>"+ 
									"<div class='form-group'  id='qa"+i+"' style='display:none;margin-top:1%;'>"+
										"<textarea id='qaAns"+t.question_id+"' name='qaAnswer' class='form-control' style='height: 200px !important;width:100% !important;' placeholder='Write your answer' rows='20'></textarea>"+
									"</div>" +
									"";

		}
		st=st+"<div class='form-froup'>" +
				"<button type='submit' class='btn btn-default theoeryBtnSubmit' onclick='submitQAExam(); return false;'>Submit All Answers</button>" +
				"</div>"
		st=st+"</form></div>"+
		"<div class='col-md-1 col-sm-1 col-xs-0'></div>" +
		$("#qaQPaper").html(st);
		
		
		
		prepareLocalData(limit,qp_id,email,questions,0);
		begin(studentBase.qTimer);
		$('#ajaxPageLoader').hide();
		$('#overlayForQA').show();
	
	});
	
	
}



//onclick='sendData(\"viewPaper/\",\""+t.questions+"\",\"viewQPaper\",-1)'


// Student model for local storage
function Student(email,qTimer,qp_id,QA)
{
	this.email=email;
	
	this.qTimer=qTimer;
	this.qp_id=qp_id;
	this.QA=QA;

	}

// qa model 

function QA(question_id,answer)
{
this.question_id=question_id;
this.answer=answer;
}

//Student object initial preperation
$( document ).ready(
	function(){
		
		var dwelDate = new Date();
		document.getElementById("welDate").innerHTML = dwelDate.toDateString();
		//localStorage.clear();
		
		var temp=JSON.parse(localStorage.getItem("students"));
		if(temp!=null)
			{
			if(temp.length!=0)
				{
				for(var i=0;i<temp.length;i++)
					{
					if(temp[i]==null)
						{
						temp.splice(i,1);
						i--;
						}
					}
				}
			if(temp.length==0)
				{
				localStorage.clear();
				}
			}
		console.log(JSON.parse(localStorage.getItem("students")));
		var students;
		var student;
		if(localStorage.getItem("students")==null)
			{
			 student=new Student($("#stdIdEmail").html(),null,null,[]);
			  students=[];
			  students.push(student);
			  localStorage.setItem("students",JSON.stringify(students));
			  console.log(JSON.parse(localStorage.getItem("students")));
			  
			}
		else{
			students=JSON.parse(localStorage.getItem("students"));
			var check=true;
			
			for(var i=0;i<students.length;i++)
				{
				if(students[i].email==$("#stdIdEmail").html())
					{
					   check=false;
					}
				}
			if(check)
			students.push(new Student($("#stdIdEmail").html(),null,null,[]));
			localStorage.setItem("students",JSON.stringify(students));
			
		}
		console.log(JSON.parse(localStorage.getItem("students")));
	}
	

);
	


//Prepare Student object for Local Storage
function prepareLocalData(limit,qp_id,email,questions,option)
{
	var qts=questions.split(",");
	
console.log("function calling");
var students=JSON.parse(localStorage.getItem("students"));
var student;
for(var i=0;i<students.length;i++)
{
if(students[i].email==$("#stdIdEmail").html())
	{
	  student=students[i]; 
	  students.splice(i,1);
	  studentIndex=i;
	  break;
	}
}
if(student.qp_id!=null && student.qp_id==qp_id)
	{
	console.log("function calling correct");
	console.log($("#qaAns"+student.QA[0].question_id).val());
      
	  for(var i=0;i<student.QA.length;i++)
		  {
		  
		  if(option==0)
			  {
		   $("#qaAns"+student.QA[i].question_id).val(student.QA[i].answer);
		
		   
			  }
		  else
			  {
			  student.QA[i].answer= $("#qaAns"+student.QA[i].question_id).val();
			 
			  }
			  
		  
		  }
	 
	
	}
else{
	student.qp_id=qp_id;
	student.qTimer=limit;
	student.QA=[];
   
	var qa;
	for(var i=0;i<qts.length-1;i++)
		{
		  qa=new QA(qts[i],"");
		  student.QA.push(qa);
		}
	
}
students.push(student);
console.log(students);
localStorage.setItem("students",JSON.stringify(students));

studentBase=student;
}


//Chart Main Source;
function displayChart(e,percent,head,l1,l2)
{
let myPieChrtForBatch = document.getElementById(e).getContext('2d');
//global options
var ctx = $('#myPieChrtForBatch');
  ctx.height = 200;
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

let myPieChrtBatch = new Chart(myPieChrtForBatch, {
  type:'pie',
  data:{
    labels:[l1,l2],
    datasets:[{
      label:'Population',
      data:[percent,100-percent],
      //backgroundColor:'green'
      backgroundColor:[
        'rgba(255,99,132,0.6)',
        'rgba(54,162,235,0.6)'
      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:3,
      hoverBorderColor:'#000'
    }]
  },
  options:{
    title:{
      display : true,
      text : head,
      fontSize:25
    },
    legend:{
      display:true,
      position:'right',
      labels:{
        fontColor:'#000'
      }
    },
    layouts:{
      padding:{
        left:50,
        right:0,
        bottum:0,
        top:0
      }
    },
    tooltips:{
      enabled:true
    }
  }


});

}



// Bar Graph
//Chart Main Source;
function displayBarGraph(e,percentData,head,labelsData,colors)
{
let myPieChrtForBatch = document.getElementById(e).getContext('2d');
//global options
var ctx = $('#myPieChrtForBatch');
  ctx.height = 200;
Chart.defaults.global.defaultFontFamily = 'Open sans';
Chart.defaults.global.defaultFontSize = 14;
Chart.defaults.global.defaultFontColor = '#777';

let myPieChrtBatch = new Chart(myPieChrtForBatch, {
  type:'horizontalBar',
  data:{
    labels:labelsData,
    datasets:[{
      label:'In %',
      data:percentData,
      //backgroundColor:'green'
      backgroundColor:colors,
      borderWidth:2,
      borderColor:'#4e4e4e',
      hoverBorderWidth:1,
      hoverBorderColor:'#777'
    }]
  },
  options:{
    title:{
      display : true,
      text : head,
      fontSize:25
    },
    legend:{
      display:true,
      position:'right',
      labels:{
        fontColor:'#000'
      }
    },
    layouts:{
      padding:{
        left:50,
        right:0,
        bottum:0,
        top:0
      }
    },
    tooltips:{
      enabled:true
    }
  }


});

}

//upload Resume

 function uploadResume()
 {
	 console.log("testing");
	 $('#ajaxPageLoader').show();
	 var formD=$("#sendResumeForm");
	 var formData=new FormData();
	 formData.append("file",$("#resumeFile").val());
	 $.ajax({
		    url: 'uploadResume',
		    data: formData,
		    type: 'POST',
		    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
		    processData: false, // NEEDED, DON'T OMIT THIS
		    success: function(data){
		    	console.log("testing");
	
		 data = JSON.parse(data);
		 	if(data["status"]){
		 		   document.getElementById('success').style.display='block';
		 		document.getElementById('reportT').innerHTML=data["notification"];
		 		
		 	    $('#success').flash_message({
		 	        text: ' ',
		 	        how: 'append',
		 	        idR :'success'
		 	    });
		 	
		 		}
		 		else{
		 			document.getElementById('fail').style.display='block';
		 			document.getElementById('reportF').innerHTML=data["notification"];
		 			$('#fail').flash_message({
		     	        text: ' ',
		     	        how: 'append',
		     	        idR :'fail'
		     	    });
		 		}
		 	$('#ajaxPageLoader').hide(); 
		    }
		 
	 });
 }


