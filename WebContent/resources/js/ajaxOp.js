


//Global Data
var request;  
var displayArea;
var data;
var selectedQuestions="";
var questionsCount=0;
var urlBase;
var divIDS=['regForm','stArea','pushQuestion','uploadFile','createQuestion','qpapers','welcome','aptiSyllabus','linuxSyllabus','commSyllabus','javaSyllabus','QApushQuestion','mailToBatch','mailToStudent','QAcreateQuestion','QAqpapers','changePassword','addBatch','viewBatches','takeAttendance','addNotification','viewNotifications'];

var mailsList=[];



$(document).ready(function(){

	var dwelDate = new Date();
	document.getElementById("welDate").innerHTML = dwelDate.toDateString();
});






// Flah Message Script

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

$('.add-item').click(function() {
 
     $('#'+idR).show();
    $('#'+idR).flash_message({
        text: ' ',
        how: 'append'
    });
});

// For validation
var studentRegForm=['fullName','email','mobile','mobile_Parent','parentName','locality','city','state','sscPercentage','interPercentage','graduationPercentage','graduationCollege','feePaid','feeTotal','joinDate'];

var  pushQuestionForm=['questionM','optionAM','optionBM','optionCM','optionDM','optionEM','topicM'];

var createQuestionForm=['testNameM','durationM'];

var pushQAQuestionForm=['questionQA','topicQA'];

var createQAQuestionForm=['testNameQA','durationQA'];


var allForms=[studentRegForm,pushQuestionForm,createQuestionForm,pushQAQuestionForm,createQAQuestionForm];



// Verify presents

function verifyPresents()
{
	
   var t;
	var st="<div class='container-fluid'><div class='row' style='height:370px;'><div class='col-md-2 col-sm-2 col-xs-0'></div>" +
			"<div class='col-md-8 col-sm-8 col-xs-12' style='height:365px;overflow:scroll;'>" +
			"<table class='table table-hover table-bordered table-striped'><tr><th class='thText'>Name</th><th class='thText'>BatchNo</th><th class='thText'>Date</th><th class='thText' colspan='2'>Options</th></tr>";
	$.get("verifyPresents", function(data){
		
		console.log(data);
		data=JSON.parse(data);
		
		for(var i=0;i<data["presents"].length;i++)
			{
		       t=data["presents"][i];
		       st=st+"<tr><td class='tdText'>"+t.name+"</td><td class='tdText'>"+t.batchNumber+"</td><td class='tdText'>"+t.presentDate+"</td>" +
		       		"<td class='tdText'><button onclick='testPresents(\""+t.email+"\",\""+t.presentDate+"\",1)' class='btn btn-default viewTableBtn' style='color:#00a69c;'>Accept</button></td>" +
		       		"<td class='tdText'><button onclick='testPresents(\""+t.email+"\",\""+t.presentDate+"\",0)' class='btn btn-default viewTableBtn' style='color:#ff6666;border-color: #ff6666 !important;'>Do NotAccept</button></td></tr>";
			}
			 st=st+"</table></div><div class='col-md-2 col-sm-2 col-xs-0'></div>" +
			 		"</div></div>";
		
		$('#takeAttendance').html(st);
	});
	
	}


//accept or reject presents

function testPresents(email,presentDate,v)
{
	$('#ajaxPageLoader').show();
	var url;
	
    if(v==1)
       url="acceptPresent/"+email+"/"+presentDate;
    else
    	url="rejectPresent/"+email+"/"+presentDate;
    $.get(url,function(data){
    	
    	console.log(data);
    	data=JSON.parse(data);
    	
    	if(data["status"]){
 		   document.getElementById('success').style.display='block';
 		document.getElementById('reportT').innerHTML=data["notification"];
 		$('#success').flash_message({
 	        text: ' ',
 	        how: 'append',
 	        idR :'success'
 	    });
 		verifyPresents();
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


// Add Notification

function addNotification()
{
	$('#ajaxPageLoader').show();
	console.log( $("#addNotification").serialize()+"  @@ ");
   $.get("addNotification", $("#addNotificationForm").serialize(), function(data){
	   
	   data=JSON.parse(data);
   	
   	if(data["status"]){
		   document.getElementById('success').style.display='block';
		document.getElementById('reportT').innerHTML=data["notification"];
		$('#success').flash_message({
	        text: ' ',
	        how: 'append',
	        idR :'success'
	    });
		document.getElementById('addNotificationForm').reset();
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

// Ajax change password
function changePassword(){
	$('#ajaxPageLoader').show();
    $.post("changeAdminPassword", $("#changeAdminPassword").serialize(), function(data) {
    	data = JSON.parse(data);
    	if(data["status"]){
    		   document.getElementById('success').style.display='block';
    		document.getElementById('reportT').innerHTML=data["notification"];
    		
    	    $('#success').flash_message({
    	        text: ' ',
    	        how: 'append',
    	        idR :'success'
    	    });
    		document.getElementById('changeAdminPassword').reset();
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






//get Students Mails

function getStudentsMails(v)
{
	$('#ajaxPageLoader').show();
	var li="";
   var t;
	$.get("getStudentsMails/"+v, function(data)
			{
		
		
		     for(var i=0;i<data["studentsList"].length;i++)
		    	 {
		    	 t=data["studentsList"][i];
		    	
		    	 
		    	  	li=li+	"<option value='"+t.email+"'>"+t.fullName+" <i class='fa fa-envelope' style='color:black' aria-hidden='true'></i> " +
		    	  				""+t.email+"" +
		    	  		" <span style='color:black;background-color:#fff; border-radius:50%;padding:1%; width:100%;'>"+t.batchNumber+"</span></option>";
		    	  
		    	
		    	 }
		     $("#singleStudentMailsList").html(li);
		     $('#ajaxPageLoader').hide();
			});

}



//Add a new Batch

function addBatch(){ 
	$('#ajaxPageLoader').show();
    $.get("addBatch", $("#addBatchForm").serialize(), function(data) {
    	data = JSON.parse(data);
    	if(data["status"]){
    		   document.getElementById('success').style.display='block';
    		document.getElementById('reportT').innerHTML=data["notification"];
    		$('#success').flash_message({
    	        text: ' ',
    	        how: 'append',
    	        idR :'success'
    	    });
    		document.getElementById('addBatchForm').reset();
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







//set BatchMails

function setBatchMails(v)
{
	
	var t;
	var b;
	if(v.checked){
		$('#ajaxPageLoader').show();	
$.get("viewBatch/"+v.value, function(data){
	
	for(var i=0;i<data["studentsList"].length;i++)
		{
		  t=data["studentsList"][i];
		b=true;
		console.log(mailsList.length);
		   for(var j=0;j<mailsList.length;j++)
			  {
			     if(t.email==mailsList[j].email)
			    	 {
			    	 b=false;
			    	
			    	 }
			     
			  }
		   if(b)
			   {
			   mailsList.push(t);
			  
			   }
		}
	setMailButtons();
	$('#ajaxPageLoader').hide();
});


	}
	else
		{
		for(var j=0;j<mailsList.length;j++)
		  {
		     if(mailsList[j].batchNumber==v.value)
		    	 {
		    	   
		    		    mailsList.splice(j,1);
		    		    j--;
		    		  console.log(j+"  removing");
		    	 }
		     
		  } 
		setMailButtons();
		}
	
	
	
	
}

//Add cc/ to / bcc

function addCC(e,name)
{
	
	var t=$("#"+e).html();
 $("#"+e).html(t+"<input type='text' class='form-control' value='add Mail'  name='"+name+"' placeholder='Add'/>");	
}



//Mail To Student
function sendMail(url,form)
{
	$('#ajaxPageLoader').show();
	$.post(url, $('#'+form).serialize(), function(data){
		
		data=JSON.parse(data);
		if(data["status"]){
			
		   document.getElementById('success').style.display='block';
		document.getElementById('reportT').innerHTML=data["notification"];
		$('#success').flash_message({
	        text: ' ',
	        how: 'append',
	        idR :'success'
	    });
		document.getElementById(form).reset();
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

// Setting mail buttons in div

function setMailButtons()
{
	
 	var e=document.getElementById("batchMailButtons");
 	var btns="";
 	var ip="";
 	console.log(mailsList.length);
   for(var i=0;i<mailsList.length;i++)
	   {
	   console.log(mailsList[i]);
	   
	     btns=btns+"<input type='button' onclick='removeMail(\""+mailsList[i].email+"\")' " +
	     		"style='border-radius:20%;background-color:#eee;' value='"+mailsList[i].email+" &#10006;'>";
	     ip=ip+"<input type='checkbox' name='recipients' checked value='"+mailsList[i].email+"'>";
	     ip=ip+"<input type='checkbox' name='studentsNames' checked value='"+mailsList[i].fullName+"'>";
	     
	   }
   console.log("check error");
   e.innerHTML=btns;
   document.getElementById("multipleMails").innerHTML=ip;
}



// Remove a single mail from the batch list
function removeMail(email)
{
	for(var i=0;i<mailsList.length;i++)
		{
		if(mailsList[i].email==email)
			{
			mailsList.splice(i,1);
			}
		}

	setMailButtons();
	
}


// Clear search list of mails


function clearULSearchList()
{
	document.getElementById('studentsMailList').style.display='none';
	}








// Fetch Student progress Report Attendance and Marks

function fetchReport(email){ 
	console.log(email);
	let url="getStudentReport/"+email+"/any";
	if(document.getElementById(email+"Chart").style.display=="none")
		{
		document.getElementById("V"+email).style.display="none";
		document.getElementById(email+"Chart").style.display="block";
		
		$('#ajaxPageLoader').show();
		
    $.get(url , function(data) {
    	data = JSON.parse(data);
    	console.log(data);
    	if(data["scorePerc"]!=null)
    		{
    	displayChart(email+"ChartM",data["scorePerc"],"Students overall Exams %","Secured %","Lost %");
    	document.getElementById(email+"ChartM").style.display='block';
    	document.getElementById(email+"ChartMError").innerHTML="Student took  <strong>"+data["testCount"]+"</strong> exams in total";
    	document.getElementById(email+"ChartMError").style.color='#908684';
    	document.getElementById(email+"ChartMError").style.fontSize="16px";
    		}
    	else{
    		document.getElementById(email+"ChartMError").innerHTML="<p style='color:#ff6666 !important;text-align:center !important;font-size:18px !important;'>Student might not taken any exam</p>";
    	}
    	if(data["attendancePerc"]!=-1){
    	displayChart(email+"ChartA",data["attendancePerc"],"Students overall attendance %","Present %","Absent %");
    	document.getElementById(email+"ChartA").style.display='block';
    	}else{
    		document.getElementById(email+"ChartAError").innerHTML="<p style='color:#ff6666 !important;text-align:center !important;font-size:18px !important;'>Attendance of Student is not updated</p>";
    	}
    	$('#ajaxPageLoader').hide();
    });
		}
	
	else{
		document.getElementById(email+"Chart").style.display="none";
	}
}


//Finished Topics
function viewFinishedTopics(batchNumber,subject)
{
	$('#ajaxPageLoader').show();
	$.get("viewFinishedTopics/"+batchNumber+"/"+subject, function(data){
		var d="" +
				"<p style='text-align:center;color:#00a69c;padding:1%;font-size:18px;font-weight:600;'>Finished Topics</p>"
		d=d+"<div style='overflow:scroll !important;height:400px;'><table class='table table-hover table-bordered table-striped tableClass'><thead class='theadText'><tr><th class='thText'>Topic</th><th class='thText'>Finished On</th></tr></thead>";
		var t;
		for(var i=0;i<data["topics"].length;i++)
			{
			 t=data["topics"][i];
			  d=d+"<tr><td class='tdText' style='text-align:justify !important;'>"+t.topicName+"</td><td class='tdText'>"+t.dateDone+"</td></tr>";
			}
		d=d+"</table></div>"
		$('#TopicsFinished').html(d);
		
		$('#ajaxPageLoader').hide();
		
	});

}


//display finished Functions


// Unfinished topics and Update
function viewUnFinishedTopics(batchNumber,subject)
{
	$('#ajaxPageLoader').show();
	$.get("viewUnFinishedTopics/"+batchNumber+"/"+subject, function(data){
		var d="<p style='text-align:center;color:#00a69c;padding:1%;font-size:18px;font-weight:600;'>UnFinished Topics</p>"
		d=d+"<div style='overflow:scroll !important;height:400px;'> <table class='table table-hover table-bordered tableClass'><thead class='theadText'><tr><th class='thText'>Topic</th><th class='thText' colspan='2'>Finished On</th></tr></thead>";
		var t;
	
		for(var i=0;i<data["topics"].length;i++)
			{
			 t=data["topics"][i];
			 
			  d=d+"<tr id='TopicStrike"+t.topic_id+"'><td class='tdText' style='text-align:justify !important;'>"+t.topicName+"</td><td class='tdText'><input type='date' class='form-control' style='height: 34px !important;' id='Topic"+t.topic_id+"'></td><td><button class='btn btn-default viewTableBtn' onclick='updateTopic("+t.topic_id+","+batchNumber+")'>Update</button></td></tr>";
			}
		d=d+"</table></div>"
		$('#TopicsUnFinished').html(d);
		$('#ajaxPageLoader').hide();
		
	});

}


// update unfinished Topics
function updateTopic(topic_id,batchNumber)
{
	var dateDone=$('#Topic'+topic_id).val();
	$('#ajaxPageLoader').show();
	$.get("updateTopic/"+batchNumber+"/"+topic_id+"/"+dateDone, function(data){
		
		
		data=JSON.parse(data);
		if(data["status"]){
			
		   document.getElementById('success').style.display='block';
		document.getElementById('reportT').innerHTML=data["notification"];
		$('#success').flash_message({
	        text: ' ',
	        how: 'append',
	        idR :'success'
	    });
		 $('#TopicStrike'+topic_id).wrap("<strike>");
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


// Get Batch Progress
function getProgress(url,batchNumber,subject)
{

	console.log(url);
	$('#ajaxPageLoader').show();
	$.get(url, function(data){
		
		data=JSON.parse(data);
		
		var p=parseInt((data["done"]*100)/data["total"]);
		
		displayChart('progressPieChart',p,'Batch Portion Graph in %',"Finished","Yet to Finish");
		$('#updateProgress').html("<button type='button' style='width:100%;margin-top:20% !important;background-color:#00a69c;border:1px solid #00a69c;color:#fff;' class='btn btn-default'  onclick='viewFinishedTopics("+batchNumber+",\""+subject+"\")' value='viewFinishedTopics'>View Finished Topics</button>" +
				"<button type='button' style='width:100%;margin-top:6% !important;background-color:#00a69c;border:1px solid #00a69c;color:#fff;' class='btn btn-default' onclick='viewUnFinishedTopics("+batchNumber+",\""+subject+"\")' value='viewUnFinishedTopics'>View UnFinished Topics</button>");
		
		$('#ajaxPageLoader').hide();
	});

}



// Chart Main Source;
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



// Major Display Div operations
function displayDiv(e)
{
 
	
	selectedQuestions="";
	questionsCount=0;
	document.getElementById('qts').value=selectedQuestions;
	document.getElementById('QAqts').value=selectedQuestions;
	console.log(document.getElementById('QAqts').value);
	for(var i=0;i<divIDS.length;i++)
		{
		console.log(i);
		if(divIDS[i]==e)
			{
			document.getElementById(e).style.display="block";
			}
		else
			{
			document.getElementById(divIDS[i]).style.display="none";
			}
		}
	
}



//Function for basic validation
function basicValidation(n)
{
	var v;
	var isValid=true;
	var count;
	var checkBoxes;
	if(n==-1)
		return true;
  /*	if(n==2)
		{
		count=0;
		checkBoxes=$('#createQuestionPaperForm input[name=BatchNos]');
		for(var j=0;j<checkBoxes.length;j++)
			{
		if(checkBoxes[j].checked==true)
		
			  count++;
			
			}
		if(count==0)
			isValid=false;
		console.log(count+"@@@");
		
		}*/
	if(n==4)
		{
		
		count=0;
		checkBoxes=$('#QAcreateQuestionPaperForm input[name=BatchNos]');
		for(var j=0;j<checkBoxes.length;j++)
			{
		if(checkBoxes[j].checked==true)
			{
			  count++;
			}
			}
		if(count==0)
			isValid=false;
		
	
		
		}
	
	
	for(var i=0;i<allForms[n].length;i++)
		{
		
		v=$('#'+allForms[n][i]).val();
		console.log(i+"  "+v);
	if(v.length<1)
		{
		   isValid= false;
		   console.log("error@"+v+"@");
		   break;
		}
	
	
	
		}
	return isValid;
	}


//Ajax call
function sendData(url,v,area,tempValidNumber)  
{  
	
	if(basicValidation(tempValidNumber))
		{
		
	if(url=="registerStudent?")
		{
		$('#sscPercentage').val($('#sscPercentage').val().split(".")[0]);
    	console.log($('#sscPercentage').val().split(".")[0]);
    	$('#interPercentage').val($('#interPercentage').val().split(".")[0]);
    	$('#graduationPercentage').val($('#graduationPercentage').val().split(".")[0]);
		v=$('#registration').serialize();
		
    	
		
		}
	else if(url=="pushQuestion?")
		{
		v=$('#pushQuestionForm').serialize();
		
		}
	else if(url=="createQuestionPaper?")
		{
		if(area!="QA")
		v=$('#createQuestionPaperForm').serialize();
		else
			v=$('#QAcreateQuestionPaperForm').serialize();	
		
		}
	else if(url=="pushQAQuestion?")
		{
		v=$('#QApushQuestionForm').serialize();
		}
	
	
	
	urlBase=url;
	
url=url+v;

  displayArea=area;

  $('#ajaxPageLoader').show();
	$.get(url,function(temp,status){
		console.log(temp);
		
		console.log(typeof temp);
		if(typeof temp =='object')
  data = temp; 
		else
			data=JSON.parse(temp);
	 
		console.log(status+" testing");
	
	 if(displayArea=='stArea')
		 {
		   putStudents(displayArea);
		 }
	 else if(displayArea=='viewQAQPaper')
	 {
	   putQAQuestionPaper(displayArea);
	 }
	 else if(displayArea=='qArea')
		 {
		  putQuestions(displayArea);
		 
		 }
	 else if(displayArea=='QAqArea'){
		 
		 putQAQuestions(displayArea); 
	 }
	 else if(displayArea=='listQPapers')
	 {
	  putQuestionPapers(displayArea);
	 
	 }
	 else if(displayArea=='listQAQPapers')
	 {
	  putQAQuestionPapers(displayArea);
	 
	 }
	
	 else if(urlBase=="registerStudent?")
		 {
		 
		if(data["status"]){
		   document.getElementById('success').style.display='block';
		document.getElementById('reportT').innerHTML=data["notification"];
		$('#success').flash_message({
	        text: ' ',
	        how: 'append',
	        idR :'success'
	    });
		document.getElementById('registration').reset();
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
		 }
	 else if(urlBase=="pushQAQuestion?")
	 {
	 
	if(data["status"]){
	   document.getElementById('success').style.display='block';
	document.getElementById('reportT').innerHTML=data["notification"];
	$('#success').flash_message({
        text: ' ',
        how: 'append',
        idR :'success'
    });
	document.getElementById('QApushQuestionForm').reset();
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
	 }
	 else if(urlBase=="pushQuestion?")
	 {
		
	 
	if(data["status"]){
		 console.log("chekcing positive");
	   document.getElementById('success').style.display='block';
	document.getElementById('reportT').innerHTML=data["notification"];
	$('#success').flash_message({
        text: ' ',
        how: 'append',
        idR :'success'
    });
	document.getElementById('pushQuestionForm').reset();
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
	 }
	 else if(urlBase=="deleteQpaper/")
	 {
		
	 
	if(data["status"]){
		 console.log("chekcing positive");
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
	 }
	 else if(urlBase=="createQuestionPaper?")
	 {
	 
	if(data["status"]){
	   document.getElementById('success').style.display='block';
	document.getElementById('reportT').innerHTML=data["notification"];
	$('#success').flash_message({
        text: ' ',
        how: 'append',
        idR :'success'
    });
	
	document.getElementById('createQuestionPaperForm').reset();
	document.getElementById('qcount').innerHTML="";
	$("#qArea").html("");
	$("#QAqArea").html("");
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
	 }
	 else if(area=='feeLoad')
		 {
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
		 }
	 
	 else
	 {
	 putQuestionPaper(displayArea);
	
	 }

	 $('#ajaxPageLoader').hide();
 });
		}
	else{
	alert("check the data you entered");
	}
}
// End of ajax functions


//Create Question paper- selecting questions and counting
function prepareQuestions(v)
{

	if(v.checked)
		{
		questionsCount++;
		selectedQuestions=selectedQuestions+v.value+",";
		}
	else{
		questionsCount--;
		var a=selectedQuestions.split(",");
		selectedQuestions="";
		if(a.length>=2)
		for(var i=0;i<a.length-1;i++)
			{
			if(v.value!=a[i])
				{
				 selectedQuestions=selectedQuestions+a[i]+",";
				
				}

			}
		
	}
	document.getElementById('qcount').innerHTML="Total Questions Selected:&nbsp &nbsp<b>"+questionsCount+"<b><br>";
	document.getElementById('qts').value=selectedQuestions;
	
	document.getElementById('QAqcount').innerHTML="Total Questions Selected:&nbsp &nbsp<b>"+questionsCount+"<b><br>";
	document.getElementById('QAqts').value=selectedQuestions;
	
}


//Update student Fee
function fee(e)
{
	var email=e.substring(0,e.length-3);
	var t;
	for(var i=0;i<data["studentsList"].length;i++)
		{
		if(email==data["studentsList"][i].email)
			{
			t=data["studentsList"][i];
			}
		}
	
	
	if(document.getElementById(e).style.display=='none' )
		{
		document.getElementById(e).style.display='block';
		}
	else{

		if(t.feePaid>=t.feeTotal)
			{
			alert("fee already paid");
			}
		else if(document.getElementById(e).value!=""){
			var v=document.getElementById(e).value;
			var pay=v;
			v= parseInt(v)+parseInt(t.feePaid);
			//document.getElementById("feeLoad").style.display='block';
			if(confirm("Are you confirm that student"+t.fullName+" is paying"+pay+" Rupees?"))
				{
			sendData("updateFee/"+t.email,"/"+v,"feeLoad",-1);
			//document.getElementById("feeLoad").style.display='none';
			document.getElementById(e).style.display='none';
			
				}
		}
	}
	}



//Put Questions under create question paper

function putQuestions(e)
{
	var st="";
e=document.getElementById(e);
var t;
for(var i=0;i<data['questionsList'].length;i++)
{
 t=data['questionsList'][i];
 st +='<form id="questionForm_'+t.question_id+'"><div class="row">';
 st +='<div class="col-md-12"><div class="form-group">';
 st +='<input class="checkbox" type="checkbox" value="'+t.question_id+'" name="question_ids" style="float:left;" onclick="'+"prepareQuestions(this)"+'">';
 
 st +='<span style="color:red;margin-left:2%;">Question ID: </span><span style="color:green;margin-left:1%;">'+t.question_id+'<i onclick="editQuestionContent('+t.question_id+')" style="color:red;cursor:pointer" class="fa fa-pencil" aria-hidden="true"></i></span>';
 st +="<input type='text' value='"+t.question_id+"' name='question_id' style='display:none'>";
 st +='</div></div></div>';
 st +='<div class="row">';
 st +='<div class="col-md-12">';
 st +='<small>'+t.passage+'</small><br><textarea id="questionU_'+t.question_id+'" style="width:100%;outline: none;border:0"  name="question">'+t.question+'</textarea>';

 st +='</div></div><br>';
 st +='<div class="row">';
 st +='<div class="col-sm-3 col-md-3 col-xs-0">'; 
 st +='<span><strong>A)</strong> <textarea name="optionA" id="optionAU_'+t.question_id+'" style="outline: none;border:0;">'+t.optionA+'</textarea></span>';
 st +='</div><div class="col-sm-2 col-md-2 col-xs-0"><span><strong>B)</strong> <textarea  id="optionBU_'+t.question_id+'" style="outline: none;border:0;" name="optionB">'+t.optionB+'</textarea></span>';
 st +='</div><div class="col-sm-2 col-md-2 col-xs-0"><span><strong>C)</strong> <textarea  id="optionCU_'+t.question_id+'" style="outline: none;border:0;" name="optionC">'+t.optionC+'</textarea></span>';
 st +='</div><div class="col-sm-2 col-md-2 col-xs-0"><span><strong>D)</strong> <textarea  id="optionDU_'+t.question_id+'" style="outline: none;border:0;" name="optionD">'+t.optionD+'</textarea></span>';
 st +='</div><div class="col-sm-3 col-md-3 col-xs-0"><span><strong>E)</strong> <textarea  id="optionEU_'+t.question_id+'" style="outline: none;border:0;" name="optionE">'+t.optionE+'</textarea></span>';
 st +='</div></div><br>';
 st +='<div class="row" style="font-size:12px;">';
 st +='<div class="col-md-3">';
 st +='<p>Topic : <strong><textarea id="topicU_'+t.question_id+'" style="outline: none;border:0;" name="topic">'+t.topic+'</textarea></strong></p>';
 st +='</div>';
 st +='<div class="col-md-3">';
 st +='<p>Key : <strong><i><textarea id="qkeyU_'+t.question_id+'" style="outline: none;border:0;" name="qkey">'+t.qkey+'</textarea></strong></p></i>';
 st +='</div>';
 st +='<div class="col-md-3">';
 st +='<p>Difficulty Level : <strong><i><textarea id="difficultyU_'+t.question_id+'" style="outline: none;border:0" name="difficulty">'+t.difficulty+'</textarea></i></strong></p>';
 st +='</div>';
 st +='<div class="col-md-3">';
 st +='<p>Published by : <strong><i>'+t.qby+'</i></strong></p>';
 st +='</div></div><br><div class="row" style="text-align:center"><button onclick="updateQuestion(\'questionForm_'+t.question_id+'\','+t.question_id+');return false;" id="formSubmitU_'+t.question_id+'" style="display:none;background-color:#ff6666" class="btn btn-warning">Update</button>'+
 '<i id="doneQuestionUpdate'+t.question_id+'" style="display:none" class="fa fa-check-circle" aria-hidden="true"></i><i id="loadQuestionUpdate'+t.question_id+'" style="display:none"  class="fa fa-circle-o-notch" aria-hidden="true"></i>'+
'</div></form>';
 

/*st=st+"<div class='container'><div class='row'><span>Question ID: "+t.question_id+"</span></div><div class='row'>"+t.question+"</div>"+"<div class='row'><div class='col-sm-3'>A)"+t.optionA+"</div>"+"<div class='col-sm-2'>B)"+t.optionB+"</div>" +
		"<div class='col-sm-2'>C)"+t.optionC+"</div><div class='col-sm-2'>D)"+t.optionD+"</div><div class='col-sm-3'>E)"+t.optionE+"</div></div><div class='row'><div class='col-sm-4'></div><div class='col-sm-3'>"+
		t.topic+"</div><div class='col-sm-2'>"+t.difficulty+"</div><div class='col-sm-3'>"+t.qby+"</div></div></div></div>";*/
}
e.innerHTML=st;
for(var i=0;i<data['questionsList'].length;i++)
{
	console.log(document.getElementById('questionU_'+data['questionsList'][i].question_id).scrollHeight); 
document.getElementById('questionU_'+data['questionsList'][i].question_id).style.height=document.getElementById('questionU_'+data['questionsList'][i].question_id).scrollHeight+'px';
document.getElementById('optionAU_'+data['questionsList'][i].question_id).style.height=document.getElementById('optionAU_'+data['questionsList'][i].question_id).scrollHeight+'px';
document.getElementById('optionBU_'+data['questionsList'][i].question_id).style.height=document.getElementById('optionBU_'+data['questionsList'][i].question_id).scrollHeight+'px';
document.getElementById('optionCU_'+data['questionsList'][i].question_id).style.height=document.getElementById('optionCU_'+data['questionsList'][i].question_id).scrollHeight+'px';
document.getElementById('optionDU_'+data['questionsList'][i].question_id).style.height=document.getElementById('optionDU_'+data['questionsList'][i].question_id).scrollHeight+'px';
document.getElementById('optionEU_'+data['questionsList'][i].question_id).style.height=document.getElementById('optionEU_'+data['questionsList'][i].question_id).scrollHeight+'px';
document.getElementById('optionEU_'+data['questionsList'][i].question_id).style.height=document.getElementById('optionEU_'+data['questionsList'][i].question_id).scrollHeight+'px';


}	
	}


function editQuestionContent(question_id)
{

	document.getElementById('questionU_'+question_id).style.border="0.5px solid #00a69c ";
	document.getElementById('optionAU_'+question_id).style.border="0.5px solid #00a69c ";
	document.getElementById('optionBU_'+question_id).style.border="0.5px solid #00a69c ";
	document.getElementById('optionCU_'+question_id).style.border="0.5px solid #00a69c ";
	document.getElementById('optionDU_'+question_id).style.border="1px solid #00a69c ";
	document.getElementById('optionEU_'+question_id).style.border="1px solid #00a69c ";
	document.getElementById('topicU_'+question_id).style.border="0.5px solid #00a69c ";
	document.getElementById('difficultyU_'+question_id).style.border="1px solid #00a69c ";
	document.getElementById('qkeyU_'+question_id).style.border="1px solid #00a69c ";
	$('#formSubmitU_'+question_id).show();
}


// update Question
function updateQuestion(formID,question_id)
{
	$('#loadQuestionUpdate'+question_id).show();
$.post("updateQuestion", $("#"+formID).serialize(), function(result){

	console.log(result);
	result=JSON.parse(result);
	if(result["status"])
		{
		
		$('#doneQuestionUpdate'+question_id).show();
		}
	else{
		
		document.getElementById('fail').style.display='block';
		document.getElementById('reportF').innerHTML=result["notification"];
		$('#fail').flash_message({
	        text: ' ',
	        how: 'append',
	        idR :'fail'
	    });
	}
	$('#loadQuestionUpdate'+question_id).hide();
});

}
// Put QA questions
function putQAQuestions(e)
{
	var st="";
e=document.getElementById(e);
var t;
for(var i=0;i<data['qaQuestionsList'].length;i++)
{
 t=data['qaQuestionsList'][i];
 st +='<div class="row">';
 st +='<div class="col-md-12"><div class="form-group">';
 st +='<input class="checkbox" type="checkbox" value="'+t.question_id+'" name="question_ids" style="float:left;" onclick="'+"prepareQuestions(this)"+'">';
 
 st +='<span style="color:red;margin-left:2%;">Question ID: </span><span style="color:green;margin-left:1%;">'+t.question_id+'</span>';
 
 st +='</div></div></div>';
 st +='<div class="row">';
 st +='<div class="col-md-12">';
 st +='<br><pre>'+t.question;
 st +='</pre></div></div><br>';
 st +='<div class="row" style="font-size:12px;">';
 st +='<div class="col-md-4">';
 st +='<p>Topic : <strong><i>'+t.topic+'</i></strong></p>';
 st +='</div>';
 st +='<div class="col-md-4">';
 st +='<p>Difficulty Level : <strong><i>'+t.difficulty+'</i></strong></p>';
 st +='</div>';
 st +='<div class="col-md-4">';
 st +='<p>Published by : <strong><i>'+t.qby+'</i></strong></p>';
 st +='</div></div><br>';
 

/*st=st+"<div class='container'><div class='row'><span>Question ID: "+t.question_id+"</span></div><div class='row'>"+t.question+"</div>"+"<div class='row'><div class='col-sm-3'>A)"+t.optionA+"</div>"+"<div class='col-sm-2'>B)"+t.optionB+"</div>" +
		"<div class='col-sm-2'>C)"+t.optionC+"</div><div class='col-sm-2'>D)"+t.optionD+"</div><div class='col-sm-3'>E)"+t.optionE+"</div></div><div class='row'><div class='col-sm-4'></div><div class='col-sm-3'>"+
		t.topic+"</div><div class='col-sm-2'>"+t.difficulty+"</div><div class='col-sm-3'>"+t.qby+"</div></div></div></div>";*/
}
e.innerHTML=st;

	
	}


//put Students

function putStudents(e)
{
	var st="<div class='container-fluid' style='height:430px;overflow:scroll;'><div class'row'><div class='col-md-12'>" +
 		"<table class='table table-hover table-bordered table-striped' style='margin-top:2%;'>" +
 		"<thead>" +
 		"<tr><th class='thText'>Batchno</th><th class='thText'>FullName</th><th class='thText'>Email</th><th class='thText'>MobileNumber</th><th class='thText'>FeePaid</th>" +
 		"<th class='thText'>TotalFee</th><th class='thText'>Graduation YOP</th><th class='thText'>Percentage(10+12+UG)</th><th class='thText' colspan='2'>View More</th>" +
 		"<th class='thText'>Resume</th></tr>" +
 		"</thead>" +
 		"<tbody>";
		/*<div class='container-fluid' style='text-align:center'><div class='row' style='border-bottom:1px solid black'><div class='col-sm-1' ><strong>Batch No</div><div class='col-sm-2'>FullName</div><div class='col-sm-2'>Email</div><div class='col-sm-1'>Mobile Number</div><div class='col-sm-1'>feePaid</div><div class='col-sm-1'>Total Fee</div><div class='col-sm-1'>" +
	"graduation YOP</div><div class='col-sm-1'>Percent (10+12+Grad)</div><div class='col-sm-2'>view More</strong></div></div>";*/
e=document.getElementById(e);
var t;
var color;
var feeSt;
for(var i=0;i<data['studentsList'].length;i++)
{
	t=data['studentsList'][i];
	
	if(t.feeTotal-t.feePaid>0)
		{
		
		feeSt='border:1px solid red;background-color:red;color:white; border-radius:100%; text-align:center;'
		}
	else{
		feeSt="";
	}
	
 
  
 st=st+
 		"<tr>" +
 		"<td class='tdText' style='"+feeSt+"'>"+t.batchNumber+"</td>" +
 		"<td class='myTip tdText'>"+t.fullName+"<span class='tooltiptext'>Grad % "+t.graduationPercentage+"<br> Inter % "+t.interPercentage+"<br>SSC % "+t.sscPercentage+"</span></td>" +
 		"<td class='tdText'>"+t.email+"</td>" +
 		"<td class='tdText'>"+t.mobile+"</td>" +
 		"<td class='tdText'>"+t.feePaid+"<input class='form-control' type='number' style='display:none;border:1px solid #00a69c !important;' placeholder='Add fee' id='"+t.email+"Fee'/> <i class='fa fa-plus-square' aria-hidden='true' onclick='fee(\""+t.email+"Fee\")'></i></td>" +
 		"<td class='tdText'><span id='feeUpdate_"+t.email+"'>"+t.feeTotal+"<i style='cursor:pointer;' onclick='editFee(\""+t.email+"\")' class='fa fa-pencil-square' aria-hidden='true'></i></span></td>" +
 		"<td class='tdText'>"+t.graduationYOP+"</td>" +
 		"<td class='tdText'>"+parseInt(t.aggregate)+"</td>" +
 		"<td style='font-size:12px !important;'><button onclick='displayD(\"V"+t.email+"\");' class='btn btn-default viewTableBtn'>View More Details</button></td>" +
 		"<td style='font-size:12px !important;'><button onclick='fetchReport(\""+t.email+"\");' class='btn btn-default viewTableBtn'>View Progress</button></td>" +
 		"<td style='font-size:12px !important;'><a href='downloadResume/"+t.email+"/any' target='_blank'><button class='btn btn-default viewTableBtn'>download</button></a></td>" +
 		"</tr>";
 	
 
 	st=st+"<tr><td colspan='10'><div id='V"+t.email+"' class='container-fluid' style='display:none;width:96%;background-color:#fff;margin:auto;border:1px solid #00a69c;border-radius:10px;'>" +
 			"<div class'row' style='margin:1% !important;'>" +
 			"<h3 style='color:#ff6666;text-align:center !important;'>More details</h3>" +
 				"<div class='col-md-6 col-sm-6'>" +
 					"<div class='row' style='margin:1% !important;'>" +
 						"<div class='col-md-6 col-sm-6'>" +
				 			"<p style='padding-top:1% !important;font-weight:600;'>Parent Name<span style='float:right;'>:</span></p>" +
				 			"<p style='font-weight:600;'>Parent Mobile<span style='float:right;'>:</span></p>" +
				 			"<p style='font-weight:600;'>HouseNo<span style='float:right;'>:</span></p>" +
				 			"<p style='font-weight:600;'>Locality or street<span style='float:right;'>:</span></p>" +
				 			"<p style='font-weight:600;'>City or District<span style='float:right;'>:</span></p>" +
				 			"<p style='font-weight:600;'>State<span style='float:right;'>:</span></p>" +
				 		"</div>" +
				 		"<div class='col-md-6 col-sm-6'>" +
				 			"<p>"+t.parentName+"</p>"+
				 			"<p>"+t.mobile_Parent+"</p>"+
				 			"<p>"+t.houseNo+"</p>"+
				 			"<p>"+t.locality+"</p>"+
				 			"<p>"+t.city+"</p>"+
				 			"<p>"+t.state+"</p>"+
				 		"</div>" +
				 	"</div>" +
				 "</div>" +
	 			"<div class='col-md-6 col-sm-6'>" +
	 				"<div class='row'>" +
	 					"<div class='col-md-6 col-sm-6'>" +
				 			"<p style='font-weight:600;padding-top:1% !important;'>Gender<span style='float:right;'>:</span></p>" +
				 			"<p style='font-weight:600;'>SSC Percentage<span style='float:right;'>:</span></p>" +
				 			"<p style='font-weight:600;'>Inter Percentage<span style='float:right;'>:</span></p>" +
				 			"<p style='font-weight:600;'>Graduation Percentage<span style='float:right;'>:</span></p>" +
				 			"<p style='font-weight:600;'>Graduation Type<span style='float:right;'>:</span></p>" +
				 			"<p style='font-weight:600;'>Graduation College<span style='float:right;'>:</span></p>" +
				 		"</div>" +
				 		"<div class='col-md-6 col-sm-6'>" +
				 			"<p>"+t.gender+"</p>"+
				 			"<p>"+t.sscPercentage+"</p>"+
				 			"<p>"+t.interPercentage+"</p>"+
				 			"<p>"+t.graduationPercentage+"</p>"+
				 			"<p>"+t.graduationType+"</p>"+
				 			"<p>"+t.graduationCollege+"</p>"+
				 		"</div>" +
				 	"</div>" +
				 "</div>" +
			"</div>" +
			"</div>" +
			"</td>" +
			"</tr>";
 	
 	st=st+"<tr><td colspan='10'><div id='progress'></div>" +
 	"<div class='container-fluid' id='"+t.email+"Chart' style='display:none;width:96%;margin:auto;border:1px solid #00a69c;border-radius:10px;'>" +
 	"<div class='row'>" +
 	"<div class='col-md-6 col-sm-6 col-xs-12' style='border-right:1px solid black'>" +
 	"<span id='"+t.email+"ChartAError' style='color:#d00d0d;font-size:20px;'></span>" +
 	"<canvas id='"+t.email+"ChartA'  style='display:none;width:100%;height: 300px;'></canvas>" +
 	"</div>" +
 	"<div class='col-md-6 col-sm-6 col-xs-12'>" +
 	"<span id='"+t.email+"ChartMError' style='color:#d00d0d;font-size:20px;'></span>" +
 	"<canvas id='"+t.email+"ChartM'  style='display:none;width:100%;height: 300px;'></canvas>" +
 	"</div>" +
 	"</div></div></td></tr>";
       
}
st=st+	"</tbody>" +
	"</table>" +
		"</div></div></div>";
st=st+"";
e.innerHTML=st;
	}




function editFee(email)
{

	console.log("test");
	 document.getElementById("feeUpdate_"+email).innerHTML="<input type='number' id='totalFee_"+email+"' value='20000'><i style='cursor:pointer;color:66ffff' onclick='updateTotalFee(\""+email+"\")' class='fa fa-pencil-square' aria-hidden='true'></i>";
	 
	 
	 
}

function updateTotalFee(email)
{
	var val=document.getElementById('totalFee_'+email).value;
	$.get("updateTotalFee/"+email+"/"+val, function(data){
		
		data=JSON.parse(data);
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
		
		
	});
}


function displayD(e)
{
	console.log(e);

	if(document.getElementById(e).style.display=='none')
		document.getElementById(e).style.display='block';
	else
		document.getElementById(e).style.display='none';
}


// Put questions from question paper
function putQuestionPaper(e)
{
	
	var st="";
	console.log(e);
	e=document.getElementById(e);
	console.log(e);
	var t;
	for(var i=0;i<data['questionsList'].length;i++)
	{
	 t=data['questionsList'][i];
	 
	st=st+"<div class='row'><span style='color:red'>Question ID: </span><span style='color:green'>"+t.question_id+"</span></div><div class='row'><small>"+t.passage+"</small><br><pre>"+t.question+"</pre></div>"+"<div class='row'><div class='col-sm-2'>A)"+t.optionA+"</div>"+"<div class='col-sm-2'>B)"+t.optionB+"</div>" +
			"<div class='col-sm-2'>C)"+t.optionC+"</div><div class='col-sm-2'>D)"+t.optionD+"</div><div class='col-sm-2'>E)"+t.optionE+"</div></div><div class='row'><div col-sm-8></div><div class='col-sm-2'><small> Key:</small><i><strong>"+
			t.qkey+"</i></strong></div><div class='col-sm-1'><small>Difficulty:</small><i><strong>"+t.difficulty+"</i></strong></div><div class='col-sm-1'><small>PublishedBy:</small><i><strong>"+t.qby+"</i></strong></div></div>";
	}
	e.innerHTML=st;
	}
function putQAQuestionPaper(e)
{
	var st="";
	console.log(e);
	e=document.getElementById(e);
	console.log(e);
	var t;
	for(var i=0;i<data['qaQuestionsList'].length;i++)
	{
	 t=data['qaQuestionsList'][i];
	 
	st=st+"<div class='row'><span style='color:red'>Question ID: </span><span style='color:green'>"+t.question_id+"</span></div><div class='row'><br><pre>"+t.question+"</pre></div>"+"<div class='row'><div col-sm-8></div><div class='col-sm-2'><small> Subject:</small><i><strong>"+
			t.subject+"</i></strong></div><div class='col-sm-1'><small>Difficulty:</small><i><strong>"+t.difficulty+"</i></strong></div><div class='col-sm-1'><small>PublishedBy:</small><i><strong>"+t.qby+"</i></strong></div></div>";
	}
	e.innerHTML=st;
	}
function putQuestionPapers(e)
{
	var st="Select By<select onchange='putQuestionPapersByAdmin(\"listQPapers\",this.value)'>" +
	"<option selected>Select</option><option value='shiva@cvcorp.in'>ShivaKumar</option><option value='cv@cvcorp.in'>CV</option>" +
	"<option value='sandeep@cvcorp.in'>Sandeep</option><option value='rajkiran@cvcorp.in'>Rajkiran</option></select>";
	e=document.getElementById(e);
	var t;
	console.log(data['questionPapersList']);
	for(var i=0;i<data['questionPapersList'].length;i++)
		{
		 t=data['questionPapersList'][i];
		 
		/* st=st+
		 		"<div class='row' id=\""+t.qp_id+"\" style='display:none'><table style='border:1px solid black;'>" +
		 		"<tr><td>TestName</td><td><a onclick='sendData(\"viewPaper/\",\""+t.questions+"\",\"viewQPaper\",-1)'>"+t.testName+"</a></td></tr>" +
		 		"<tr><td>Test For</td><td>"+t.batchNos[0]+"</td></tr>" +
		 		"<tr><td>Total No Questions</td><td>"+t.questionsCount+"</td></tr>" +
		 		"<tr><td>date Created</td><td>"+t.creationDate+"</td></tr>" +
		 		"<tr><td>No of students took test</td><td>"+t.studentsCount+"</td></tr>" +
		 		"<tr><td>Duration in min</td><td>"+t.duration+"</td></tr>" +
		 		"<tr><td>Is it Practice Test?</td><td>"+t.isPractice+"</td></tr>" +
		 		"<tr><td><a onclick='sendData(\"deleteQpaper/\",\""+t.qp_id+"\",\"\",-1)'>Delete</a></td></tr>" +
		 		"</table></div><br>";*/
		 		
		 st=st+"<div class='row'>"+
                         
                            
                            "<div class='col-md-12 col-sm-12 col-xs-12 takeTestBox'>"+
                                "<p class='testClass' style='padding-top:2%;'><i class='fa fa-book' style='margin-right:1.5%;' aria-hidden='true'></i>Test name : <span style='font-weight: 500' id='tname'>"+t.testName+"</span></p>"+
                                "<p class='testClass'><i class='fa fa-calendar-o' style='margin-right:1.5%;' aria-hidden='true'></i>Test for batches : <span style='font-weight: 500' id='tdate'>"+t.batchNos[0]+"</span></p>"+
                                "<p class='testClass'><i class='fa fa-male' style='margin-right:1.5%;' aria-hidden='true'></i>Total No Questions : <span style='font-weight: 500' id='tCunduncted'>"+t.questionsCount+"</span></p>"+
                                "<p class='testClass'><i class='fa fa-clock-o' style='margin-right:1.5%;' aria-hidden='true'></i> Date Created :<span style='font-weight: 500' id='tduration'>"+t.creationDate+"</span></p>"+
                                "<p class='testClass'><i class='fa fa-clock-o' style='margin-right:1.5%;' aria-hidden='true'></i> No of Students Took Test :<span style='font-weight: 500' id='tduration'>"+t.studentsCount+"</span></p>"+
                                "<p class='testClass'><i class='fa fa-clock-o' style='margin-right:1.5%;' aria-hidden='true'></i> Duration :<span style='font-weight: 500' id='tduration'>"+t.duration+"</span></p>"+
                                "<p class='testClass'><i class='fa fa-clock-o' style='margin-right:1.5%;' aria-hidden='true'></i> Is it practice? :<span style='font-weight: 500' id='tduration'>"+t.isPractice+"</span></p>"+
                                "<button onclick='sendData(\"deleteQpaper/\",\""+t.qp_id+"\",\"\",-1)' style='border:1px solid #ff6666 !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#ff6666;'>Delete</button>"+
                               " <button onclick='sendData(\"viewPaper/\",\""+t.questions+"\",\"viewQPaper\",-1)' style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;'>View Paper</button>"+
                               " <button onclick='viewStudentsTookMTest("+t.qp_id+",\""+t.questions+"\")' style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;float: right;'>View Results</button>"+ 
                               " <button onclick='displayD(\"pushQDiv"+t.qp_id+"\")' style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;float: right;'>Publish</button>"+ 
                                "<span style='display:none;' id='pushQDiv"+t.qp_id+"'><form id='pushForm"+t.qp_id+"'>" +
                                		"<input name='qp_id' value='"+t.qp_id+"' style='display:none'>" ;
                                		
		                                 var bTemp=t.batchNos[0].split(",");
		                                 bTemp.splice(0,1);
		                                 bTemp.splice(bTemp.length-1,1);
		                                 var temptoCheck=0;
		                                 var bCounter=0;
		                                   for(k=0;k<batchNos.length;k++)
                                			{  
		                                	   temptoCheck=0;
		                                	   for(c=0;c<bTemp.length;c++)
		                                		   {
		                                		     if(batchNos[k]==bTemp[c])
		                                		    	 {
		                                		    	 temptoCheck=1;
		                                		     break;
		                                		    	 }
		                                		   }
		                                	   if(temptoCheck==0)
		                                		   {
                                				st=st+"<label class='checkbox'><input type='checkbox' name='BatchNos' value='"+batchNos[k]+"'>Batch "+batchNos[k]+"</label>";
		                                		   bCounter++;
		                                		   }
		                                		   }
                                		if(bCounter==0)
                                			st=st+"<span>Question Paper has already been pushed to all batches</span>";
                          st=st+  "<input style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;'   type='submit' onclick='publishQuestionPaper(\"pushForm"+t.qp_id+"\","+t.qp_id+");return false' value='Publish'></form></span></div>" +
                            		
                        "</div><br>";
		}
	e.innerHTML=st;
	
}



function putQuestionPapersByAdmin(e,admin)
{
	var st="Select By<select onchange='putQuestionPapersByAdmin(\"listQPapers\",this.value)'>" +
	"<option selected>Select</option><option value='shiva@cvcorp.in'>ShivaKumar</option><option value='cv@cvcorp.in'>CV</option>" +
	"<option value='sandeep@cvcorp.in'>Sandeep</option><option value='rajkiran@cvcorp.in'>Rajkiran</option></select>";
	e=document.getElementById(e);
	var t;
	console.log(data['questionPapersList']);
	for(var i=0;i<data['questionPapersList'].length;i++)
		{
		 t=data['questionPapersList'][i];
		 
		/* st=st+
		 		"<div class='row' id=\""+t.qp_id+"\" style='display:none'><table style='border:1px solid black;'>" +
		 		"<tr><td>TestName</td><td><a onclick='sendData(\"viewPaper/\",\""+t.questions+"\",\"viewQPaper\",-1)'>"+t.testName+"</a></td></tr>" +
		 		"<tr><td>Test For</td><td>"+t.batchNos[0]+"</td></tr>" +
		 		"<tr><td>Total No Questions</td><td>"+t.questionsCount+"</td></tr>" +
		 		"<tr><td>date Created</td><td>"+t.creationDate+"</td></tr>" +
		 		"<tr><td>No of students took test</td><td>"+t.studentsCount+"</td></tr>" +
		 		"<tr><td>Duration in min</td><td>"+t.duration+"</td></tr>" +
		 		"<tr><td>Is it Practice Test?</td><td>"+t.isPractice+"</td></tr>" +
		 		"<tr><td><a onclick='sendData(\"deleteQpaper/\",\""+t.qp_id+"\",\"\",-1)'>Delete</a></td></tr>" +
		 		"</table></div><br>";*/
		 if(t.email==admin){
		 		
		 st=st+"<div class='row'>"+
                         
                            
                            "<div class='col-md-12 col-sm-12 col-xs-12 takeTestBox'>"+
                                "<p class='testClass' style='padding-top:2%;'><i class='fa fa-book' style='margin-right:1.5%;' aria-hidden='true'></i>Test name : <span style='font-weight: 500' id='tname'>"+t.testName+"</span></p>"+
                                "<p class='testClass'><i class='fa fa-calendar-o' style='margin-right:1.5%;' aria-hidden='true'></i>Test for batches : <span style='font-weight: 500' id='tdate'>"+t.batchNos[0]+"</span></p>"+
                                "<p class='testClass'><i class='fa fa-male' style='margin-right:1.5%;' aria-hidden='true'></i>Total No Questions : <span style='font-weight: 500' id='tCunduncted'>"+t.questionsCount+"</span></p>"+
                                "<p class='testClass'><i class='fa fa-clock-o' style='margin-right:1.5%;' aria-hidden='true'></i> Date Created :<span style='font-weight: 500' id='tduration'>"+t.creationDate+"</span></p>"+
                                "<p class='testClass'><i class='fa fa-clock-o' style='margin-right:1.5%;' aria-hidden='true'></i> No of Students Took Test :<span style='font-weight: 500' id='tduration'>"+t.studentsCount+"</span></p>"+
                                "<p class='testClass'><i class='fa fa-clock-o' style='margin-right:1.5%;' aria-hidden='true'></i> Duration :<span style='font-weight: 500' id='tduration'>"+t.duration+"</span></p>"+
                                "<p class='testClass'><i class='fa fa-clock-o' style='margin-right:1.5%;' aria-hidden='true'></i> Is it practice? :<span style='font-weight: 500' id='tduration'>"+t.isPractice+"</span></p>"+
                                "<button onclick='sendData(\"deleteQpaper/\",\""+t.qp_id+"\",\"\",-1)' style='border:1px solid #ff6666 !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#ff6666;'>Delete</button>"+
                               " <button onclick='sendData(\"viewPaper/\",\""+t.questions+"\",\"viewQPaper\",-1)' style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;'>View Paper</button>"+
                               " <button onclick='viewStudentsTookMTest("+t.qp_id+",\""+t.questions+"\")' style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;float: right;'>View Results</button>"+ 
                               " <button onclick='displayD(\"pushQDiv"+t.qp_id+"\")' style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;float: right;'>Publish</button>"+ 
                                "<span style='display:none;' id='pushQDiv"+t.qp_id+"'><form id='pushForm"+t.qp_id+"'>" +
                                		"<input name='qp_id' value='"+t.qp_id+"' style='display:none'>" ;
                                		
		                                 var bTemp=t.batchNos[0].split(",");
		                                 bTemp.splice(0,1);
		                                 bTemp.splice(bTemp.length-1,1);
		                                 var temptoCheck=0;
		                                 var bCounter=0;
		                                   for(k=0;k<batchNos.length;k++)
                                			{  
		                                	   temptoCheck=0;
		                                	   for(c=0;c<bTemp.length;c++)
		                                		   {
		                                		     if(batchNos[k]==bTemp[c])
		                                		    	 {
		                                		    	 temptoCheck=1;
		                                		     break;
		                                		    	 }
		                                		   }
		                                	   if(temptoCheck==0)
		                                		   {
                                				st=st+"<label class='checkbox'><input type='checkbox' name='BatchNos' value='"+batchNos[k]+"'>Batch "+batchNos[k]+"</label>";
		                                		   bCounter++;
		                                		   }
		                                		   }
                                		if(bCounter==0)
                                			st=st+"<span>Question Paper has already been pushed to all batches</span>";
                          st=st+  "<input style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;'   type='submit' onclick='publishQuestionPaper(\"pushForm"+t.qp_id+"\","+t.qp_id+");return false' value='Publish'></form></span></div>" +
                            		
                        "</div><br>";
		 }
		}
	e.innerHTML=st;
	
}

function publishQuestionPaper(formID,id)
{
	
	$.get("publishQuestionPaper",$("#"+formID).serialize(), function(rs){
		console.log(rs);
		
		rs=JSON.parse(rs);
		if(rs["status"]){
			   document.getElementById('success').style.display='block';
			document.getElementById('reportT').innerHTML=rs["notification"];
			$('#success').flash_message({
		        text: ' ',
		        how: 'append',
		        idR :'success'
		    });
			$('#pushQDiv'+qp_id).hide();
			}
			else{
				document.getElementById('fail').style.display='block';
				document.getElementById('reportF').innerHTML=rs["notification"];
				$('#fail').flash_message({
			        text: ' ',
			        how: 'append',
			        idR :'fail'
			    });
			}
	});
	}

//Data for final analysis
var diffTopics=[];
var studentsScoresForGraph=[];
var studentsNamesForGraph=[];

function viewStudentsTookMTest(qp_id,questions)
{
	$("#ajaxPageLoader").show();
	 var st="<h4>Select Student to see his or her Result</h4><br>";

	$.get("getStudentsListByPaper/"+qp_id, function(data){
		
		data=JSON.parse(data);
		st=st+"<select onchange='analysisOfExam(this.value,"+qp_id+",\""+questions+"\")'>" +
		"<option selected value='any'>Select</option>";
		
		var dataQ;
		
		 $.ajax({
			   url: "viewPaperStudent/"+questions,
			   type: "get",
			   async : false,
			   success: function(dataMQ)
			   {
				   dataQ=dataMQ;
				   
				   var tDuplicate=0;
					  
					
					  for(k=0;k<dataQ['questionsList'].length;k++)
						  {
						  tDuplicate=0;
						    for(j=0;j<diffTopics.length;j++)
						    	{
						    	  if(dataQ['questionsList'][k].topic==diffTopics[j].topic)
						    		  {
						    		  tDuplicate=1;
						    		  
						    		  }
						    	}
						    if(tDuplicate==0)
						    	diffTopics.push(new Topic(dataQ['questionsList'][k].topic,0,0,"NA")); 	
						  }
				   
			   }});
		 
		 for(var i=0;i<data["list"].length;i++)
			 {
			   
			  
			   // prepareDataForQpResultsAnalysis(data["list"][i].email);
			   
			   var totalQCount=0;
			   var totalWrongQCount=0;
			  
					   
					   $.ajax({
						   url: "userMOptions/"+data["list"][i].email+"/"+qp_id,
						   type: "get",
						   async : false,
						   success: function(d)
						   {
							   d=d.split(",");
							   d.splice(0,1);
							   d.splice(d.length-1,1)
							   
							   console.log(d);
							   
				 
				 
				  
				   
				 for(k=0;k<diffTopics.length;k++)
				  {
				  
				  
				       
				      for(j=0;j<dataQ['questionsList'].length;j++)
				    	  {
				    	    if(diffTopics[k].topic==dataQ['questionsList'][j].topic)
				    	    	{
				    	    	 diffTopics[k].qCount++;
				    	    	 if(d[j]!=dataQ['questionsList'][j].qkey)
				    	    		 {
				    	    		 diffTopics[k].wrongQCount++;
				    	    		 totalWrongQCount++;
				    	    		 }
				    	    	 totalQCount++;
				    	    	}
				    	  }
				      
				     
				  }
				 st=st+"<option value='"+data["list"][i].email+"'>"+data["list"][i].fullName+"  <span>"+parseInt((totalQCount-totalWrongQCount)*100/totalQCount)+"%</span></option>";
				 
				 studentsScoresForGraph.push(parseInt((totalQCount-totalWrongQCount)*100/totalQCount));
				 studentsNamesForGraph.push(data["list"][i].fullName);
				 
				 console.log("test");   
							   
					       }
					  
					       
					    });
					   
					   
			     
			       
			 
					   console.log(i+"@"); 
			   
			   
			   
			 }
		 st=st+"</select>";
		 st=st+"<button onclick='qpResultsAnalysis()'>Question Paper Results Analysis</button>" +
		 		"<button onclick='displaystudentsResultsGraph()'>Graphical View of All Students Scores</button>";
		 st=st+"<div id='studentResult'></div>";
		 $("#viewQPaper").html(st);
		 $("#ajaxPageLoader").hide();
	});
	
}


//

function displaystudentsResultsGraph()
{
	
	var st="<canvas id='studentsScoresGraph'></canvas>";
	$("#studentResult").html(st);
	var colors=[];
	for(i=0;i<studentsScoresForGraph.length;i++)
		{
		  if(studentsScoresForGraph[i]>65)
			  colors.push("green");
		  else if(studentsScoresForGraph[i]>35)
			  colors.push("yellow");
		  else 
			  colors.push("red");
		}
	displayBarGraph('studentsScoresGraph',studentsScoresForGraph,'All Students Scores Graph',studentsNamesForGraph,colors);
	
	
	}



function putQAQuestionPapers(e)
{
	var st="";
	e=document.getElementById(e);
	var t;
	console.log(data['questionPapersList']);
	for(var i=0;i<data['questionPapersList'].length;i++)
		{
		
		
		 t=data['questionPapersList'][i];
		 /*
		 st=st+"<div style='background-color:yellow;border:1px solid black;'><a onclick='displayD(\""+t.qp_id+"\")' style='cursor:pointer'><h5>"+t.testName+"</h5>Date: "+t.creationDate+"</a></div><div class='row' id=\""+t.qp_id+"\" style='display:none'><table style='border:1px solid black;'>" +
		 		"<tr><td>TestName</td><td><a onclick='sendData(\"viewQAPaper/\",\""+t.questions+"\",\"viewQAQPaper\",-1)'>"+t.testName+"</a></td></tr>" +
		 		"<tr><td>Test For</td><td>"+t.batchNos[0]+"</td></tr>" +
		 		"<tr><td>Total No Questions</td><td>"+t.questionsCount+"</td></tr>" +
		 		"<tr><td>date Created</td><td>"+t.creationDate+"</td></tr>" +
		 		"<tr><td>No of students took test</td><td>"+t.studentsCount+"</td></tr>" +
		 		"<tr><td>Duration in min</td><td>"+t.duration+"</td></tr>" +
		 		"<tr><td>Is it Practice Test?</td><td>"+t.isPractice+"</td></tr>" +
		 		"<tr><td><a onclick='sendData(\"deleteQpaper/\",\""+t.qp_id+"\",\"\",-1)'>Delete</a></td></tr>" +
		 		"</table></div><br>";*/
		
		st=st+"<div class='row'>"+
        
        
        "<div class='col-md-12 col-sm-12 col-xs-12 takeTestBox'>"+
            "<p class='testClass' style='padding-top:2%;'><i class='fa fa-book' style='margin-right:1.5%;' aria-hidden='true'></i>Test name : <span style='font-weight: 500' id='tname'>"+t.testName+"</span></p>"+
            "<p class='testClass'><i class='fa fa-calendar-o' style='margin-right:1.5%;' aria-hidden='true'></i>Test for batches : <span style='font-weight: 500' id='tdate'>"+t.batchNos[0]+"</span></p>"+
            "<p class='testClass'><i class='fa fa-male' style='margin-right:1.5%;' aria-hidden='true'></i>Total No Questions : <span style='font-weight: 500' id='tCunduncted'>"+t.questionsCount+"</span></p>"+
            "<p class='testClass'><i class='fa fa-clock-o' style='margin-right:1.5%;' aria-hidden='true'></i> Date Created :<span style='font-weight: 500' id='tduration'>"+t.creationDate+"</span></p>"+
            "<p class='testClass'><i class='fa fa-clock-o' style='margin-right:1.5%;' aria-hidden='true'></i> No of Students Took Test :<span style='font-weight: 500' id='tduration'>"+t.studentsCount+"</span></p>"+
            "<p class='testClass'><i class='fa fa-clock-o' style='margin-right:1.5%;' aria-hidden='true'></i> Duration :<span style='font-weight: 500' id='tduration'>"+t.duration+"</span></p>"+
            "<p class='testClass'><i class='fa fa-clock-o' style='margin-right:1.5%;' aria-hidden='true'></i> Is it practice? :<span style='font-weight: 500' id='tduration'>"+t.isPractice+"</span></p>"+
            "<button onclick='sendData(\"deleteQpaper/\",\""+t.qp_id+"\",\"\",-1)' style='border:1px solid #ff6666 !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#ff6666;'>Delete</button>"+
           " <button onclick='sendData(\"viewQAPaper/\",\""+t.questions+"\",\"viewQAQPaper\",-1)' style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;float: right;'>View Paper</button>"+
            " <button onclick='correctPaper(\""+t.qp_id+"\")' style='border:1px solid #000 !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;float: right;'>Correct Papers</button>"+
            
        "</div>" +
        		
    "</div><br>";
		}
	e.innerHTML=st;
	
}


function correctPaper(qp_id)
{
	 $('#ajaxPageLoader').show();
	 var st="<h4>Select Student to Correct his or her Answer Paper</h4><br>";
	 
	    st=st+"<select onchange='studentQAAnswerPaper("+qp_id+",this.value)'>" +
	    		"<option selected value='any'>Select</option>";
	 $.get("getStudentsListByPaper/"+qp_id, function(data){
		 console.log(data);
		 data=JSON.parse(data);
		 
		
		 for(var i=0;i<data["list"].length;i++)
			 {
			   st=st+"<option value='"+data["list"][i].email+"'>"+data["list"][i].fullName+"</option>";
			   
			 }
		 st=st+"</select>";
		 
		 st=st+"<div id='studentsQAAnswers'></div>"
		 $("#viewQAQPaper").html(st);
		 $('#ajaxPageLoader').hide();
	 });
}

function studentQAAnswerPaper(qp_id,email)
{
	 $('#ajaxPageLoader').show();
	var st="";
	var t;
	$.get("getStudentQAAnswerPaper/"+email+"/"+qp_id, function(data){
		
		console.log(data);
		if(data["list"]!=null)
			{
			
			for(var i=0;i<data["list"].length;i++)
				{
				 t=data["list"][i];
			  st=st+"<h4>"+t.question+"</h4><div class='row' style='padding:20px'><pre>"+t.answer+"</pre></div>" +
			  		"<div class='row' style='text-align:right'>Enter Marks Percent:<input type='number' id='qaAnsC"+t.id+"'>" +
			  				"<button onclick='updateAnswerScore("+t.id+")' " +
			  						"style='border:1px solid #000 !important;border-radius:5px;font-size:14px;" +
			  						"background-color: transparent !important;color:#000;'>update Score</button>" +
			  						"<i class='fa fa-check-circle-o' aria-hidden='true' style='display:none' id='doneAns"+t.id+"'></i></div>";
			    }
			$("#studentsQAAnswers").html(st);
			
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

function updateAnswerScore(id)
{

	var score=$("#qaAnsC"+id).val();
	if(score.length>0 && score>0){
	$.get("updateAnswerScore/"+id+"/"+score, function(data){
		
		data=JSON.parse(data);
		
		if(data["status"]){
			   document.getElementById('success').style.display='block';
			document.getElementById('reportT').innerHTML=data["notification"];
			$('#success').flash_message({
		        text: ' ',
		        how: 'append',
		        idR :'success'
		    });
			$('#doneAns'+id).show();
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
		
		
		
	});
	}
	else
		{
		alert("Enter proper score");
		}
}






// Send Files


	
	function sendFile() {

	    var formData = new FormData($("#sendFileForm"));

	    $.post($($("#sendFileForm")).attr("action"), formData, function(data) {
	        console.log(data);
	        
	        
	        data=JSON.parse(data);
			
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
	        
	        
	    });

	    return false;
	}

	
	//Question Result Analysis
	
	
	
	//Analysis
	function analysisOfExam(email,qp_id,questions)
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
				  
				st=st+"<div class='col-md-7'>" +
						"<p><span style='font-weight:600;font-size:12px;'>Total Number of Questions :</span> <span style='color:#00a69c'>"+data['questionsList'].length+"</span></p>" +
						"<p><span style='font-weight:600;font-size:12px;'>Total Number of Questions You answered : </span> <span style='color:#00a69c'>"+answeredCount+"</span></p>" +
						"<p><span style='font-weight:600;font-size:12px;'>Total Number of Questions Correctly Answered : </span> <span style='color:#00a69c'>"+marks+"</span></p>" +
						"</div>";
					if(marksPercent<=35)
					{
						st=st+"<div class='col-md-5'><br><p style='marging-top:1%;'><span style='font-weight:600;font-size:12px;'>Your total score : </span><span style='padding:10px;border:2px solid red;border-radius:5px;color:red;font-weight:600;'>"+marksPercent+"%</span></p>"+
						"</div></div>";
					}
					else if(marksPercent>35 && marksPercent<=75)
					{
						st=st+"<div class='col-md-5'><br><p style='marging-top:1%;'><span style='font-weight:600;font-size:12px;'>Your total score : </span><span style='padding:10px;border:2px solid #bb3535;border-radius:5px;color:#bb3535;font-weight:600;'>"+marksPercent+"%</span></p>"+
						"</div></div>";
					}
					else
					{
						st=st+"<div class='col-md-5'><br><p style='marging-top:1%;'><span style='font-weight:600;font-size:12px;'>Your total score : </span><span style='padding:10px;border:2px solid green;border-radius:5px;color:green;font-weight:600;'>"+marksPercent+"%</span></p>"+
						"</div></div>";
					}
						
					st=st+"<div class='row' style='border:1px solid #4e4e4e;border-radius:5px;'><div class='col-md-12'>";
				
				if(answeredCount!=data['questionsList'].length)
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
						 st=st+"<p>Key : <span style='font-weight:600;'>"+multopics[i].wrongQuestions[j].qkey+"</span><span style='margin-left:2%'> Your Answer: </span><span style='font-weight:600;'>"+multopics[i].wrongQuestions[j].yourAnswer+"</span></p><hr>";
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
				
				st=st+"<p style='text-align:center;color:#00a69c;font-weight:600;font-size:16px;'>Study Advicer's Advice</p>"+studyAdvice;
						
				st=st+"</div></div>";
				console.log(st);
				$("#studentResult").html(st);
				displayBarGraph('topicsBarGraph',percentData,'Topic Wise Analysis',labelsData,colors);
				$("#ajaxPageLoader").hide();
			});
			
				});
				
	}
	
	
//Models
	
function qpResultsAnalysis()
{
	var st="Total Question Paper Results Analysis";
	st=st+"<canvas id='topicsBarGraphCompleteQP'></canvas>";
	var labelsData=[];
	var colors=[];
	var percentData=[];
	console.log(diffTopics);
	for(var i=0;i<diffTopics.length;i++)
		{
		labelsData.push(diffTopics[i].topic);
		 colors.push("blue");
		 
		 percentData.push(parseInt((diffTopics[i].qCount-diffTopics[i].wrongQCount)*100/diffTopics[i].qCount));
		 
		}
	$("#studentResult").html(st);
	displayBarGraph('topicsBarGraphCompleteQP',percentData,'Topic Wise Complete QP Analysis',labelsData,colors);
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
	
	
	function getTopicsList(search)
	{
		var subject=$("#questionSubject").val();
		$.get("getTopicsList/"+subject+"/"+search, function(data){
			console.log(data);
			data=JSON.parse(data);
			var opts="";
			for(i=0;i<data.length;i++)
				{
				 opts=opts+"<option value='"+data[i]+"'>"+data[i]+"</option>";
				}
			$("#topicSuggetions").html(opts);
		
		});
	}
	
	function setTopicsList(subject)
	{
		
		$.get("getTopicsList/"+subject+"/nouse", function(data){
			console.log(data);
			data=JSON.parse(data);
			var opts="<option selected>select</option>";
			for(i=0;i<data.length;i++)
				{
				 opts=opts+"<option value='"+data[i]+"'>"+data[i]+"</option>";
				}
			$("#topicsInSearch").html(opts);
		
		});
	}
	
	function setTopicsQA(subject)
	{
		
		$.get("getTopicsListQA/"+subject+"/nouse", function(data){
			console.log(data);
			data=JSON.parse(data);
			var opts="<option selected>select</option>";
			for(i=0;i<data.length;i++)
				{
				 opts=opts+"<option value='"+data[i]+"'>"+data[i]+"</option>";
				}
			$("#topicsListQA").html(opts);
		
		});
	}
	
	function getTopicsListQA(search)
	{
		var subject=$("#subjectInQA").val();
		$.get("getTopicsListQA/"+subject+"/"+search, function(data){
			console.log(data);
			data=JSON.parse(data);
			var opts="";
			for(i=0;i<data.length;i++)
				{
				 opts=opts+"<option value='"+data[i]+"'>"+data[i]+"</option>";
				}
			$("#topicsListinQA").html(opts);
		
		});
	}
	
	function getQuestionsByTopicQA(topic)
	{
		$("ajaxPageLoader").show();
		$.get("getQuestionsByTopicQA/"+topic, function(t){
			
			data=t;
			putQAQuestions("QAqArea");
			$("ajaxPageLoader").hide();
		});
	}
	
	var assistantOptions=[];
	function assistantCreateQuestionPaper(v)
	{
		console.log("test call");
		 if(assistantOptions.length==0)
			{
			 if(v=='Y'){
			  assistantOptions.push(v);
			  $("#smartchatbox901621879").html("For Which Subject You want me to Create Paper?<br>" +
			  "<button style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;' onclick='assistantCreateQuestionPaper(\"Math\")'>Math</button><button style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;' onclick='assistantCreateQuestionPaper(\"Java\")'>Java</button>");
			  responsiveVoice.speak("For Which Subject You want me to Create Paper?");
			 }
			 else{
				 $("#smartchatbox901621879").html("Thats Ok "+adminName+", I am currently Programmed just to Create a Random Paper. Lets see weather I have any further works to do in future");
				 responsiveVoice.speak("Thats Ok "+adminName+", I am currently Programmed just to Create a Random Paper. Lets see weather I have any further works to do in future");
			 }
			 }
		else if(assistantOptions.length==1)
			{
		assistantOptions.push(v);
		
		$("#smartchatbox901621879").html("Select the type of Question paper you want me to create<br>" +
				"<button style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;' onclick='assistantCreateQuestionPaper(\"Multiple\")'>Multiple Choice</button><button " +
				"style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;' 'assistantCreateQuestionPaper(\"QA\")'>Theory Type</button>");
		      responsiveVoice.speak("Select the type of Question paper you want me to create");
			}
		else{
			$("#smartchatbox901621879").html("Please Wait I am doing your work<br><i style='text-align:center;' class='fa fa-circle-o-notch' aria-hidden='true'></i>");
			
			assistantOptions.push(v);
			$.get("createRandomPaper/"+assistantOptions[1]+"/"+assistantOptions[2], function(data){
				
				console.log(data);
				$("#smartchatbox901621879").html("Done! "+adminName+" I have created a Random Question paper for you. Do you want me to list all question papers to see the one I created?" +
						"<br><button style='border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;'  onclick='sendData(\"getQuestionPapers/\",\""+assistantOptions[2]+"\",\"listQPapers\",-1); displayDiv(\"qpapers\");assistantDone()'>YES</button>");
				responsiveVoice.speak("I have created a Random Question paper for you. Do you want me to list all question papers to see the one I created?");
				assistantOptions=[];
				
			});
				
			
		}
		
		
	}
	
	function speakBegin()
	{
		assistantOptions=[];
		responsiveVoice.speak("Hello "+adminName+", I am your new assistant, Can I Create a New QuestionPaper? By the way, I can create a new question paper with the random"+
					    "questions and random topics.");
		$("#smartchatbox901621879").html('Can I Create a New QuestionPaper?<br>'+
				   '<small>By the way, I can create a new question paper with the random'+
				    'questions and random topics.</small>'+
				   '<br>'+
				   '<button style="border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;"  onclick="assistantCreateQuestionPaper(\'Y\')">YES</button><button style="border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;" onclick="assistantCreateQuestionPaper(\'N\')" >NO</button></div></div>');
		
	}
	function assistantDone()
	{
		$("#smartchatbox901621879").html("Done "+adminName+", You can check Paper If you don't like it delete it I can create on more for you. I am currently Programmed just to Create a Random Paper. Lets see weather I have any further works to do in future");
		responsiveVoice.speak("Done "+adminName+", You can check Paper (the last in list above) If you don't like it delete it I can create on more for you. I am currently Programmed just to Create a Random Paper. Lets see weather I have any further works to do in future");
	}
	
	