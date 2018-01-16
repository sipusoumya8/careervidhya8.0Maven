package cv.controllers;


import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;


import cv.models.Admin;
import cv.models.Batch;
import cv.models.CVStudent;
import cv.models.QAAnswersList;
import cv.models.QAQuestion;
import cv.models.QAQuestionsList;
import cv.models.Question;
import cv.models.QuestionPaper;
import cv.models.QuestionPapersList;
import cv.models.QuestionsList;
import cv.models.StudentsList;
import cv.models.TopicsList;
import cv.services.AdminService;
import cv.services.BatchService;
import cv.services.QAQuestionService;
import cv.services.QuestionPaperService;
import cv.services.QuestionService;



@Controller
public class AdminController {

	AdminService adminService;
	QuestionService questionService;
	QuestionPaperService questionPaperService;
	QAQuestionService qaQuestionService;
	
	BatchService batchService;
	
    
	public AdminService getAdminService() {
		return adminService;
	}

	public void setAdminService(AdminService adminService) {
		this.adminService = adminService;
	}
	
	public void setQuestionService(QuestionService questionService)
	{
		this.questionService=questionService;
	}
	public QuestionService getQuestionService()
	{
		return questionService;
	}
	public QAQuestionService getQaQuestionService() {
		return qaQuestionService;
	}
	public void setQaQuestionService(QAQuestionService qaQuestionService) {
		this.qaQuestionService = qaQuestionService;
	}
	public QuestionPaperService getQuestionPaperService() {
		return questionPaperService;
	}
	public void setQuestionPaperService(QuestionPaperService questionPaperService) {
		this.questionPaperService = questionPaperService;
	}
	
	
	@RequestMapping(value="/adminLogin",method=RequestMethod.POST)
	public ModelAndView adminLogin(@RequestParam("email") String email,@RequestParam("password") String password,HttpServletRequest request)
	{
		ModelAndView mv;
		
		
		if(adminService.validateAdmin(email, password,request))
		{
			mv=new ModelAndView("redirect:/");
			return mv;
		}
		else
		{
			mv=new ModelAndView("index");
			mv.addObject("errorA", "!Authentication failure");
			return mv;
		}
	}
	@RequestMapping(value="/registerStudent",method=RequestMethod.GET)
	public @ResponseBody String registerStudent(@ModelAttribute("std")CVStudent st)
	{
		boolean status=adminService.registerStudent(st);
		System.out.println(st);
		String notification="You "+st.getFullName()+" are Registered Successfully Under Batch No"+st.getBatchNumber();
		if(!status)
			notification="Oops! something went wrong, Student not registered successfully may be for the following cause. Student email already registered."
					+ "You might be entered a wrong date or format might not of type (YYYY-MM-DD)";
		
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}
    
	@RequestMapping(value="/changeAdminPassword",method=RequestMethod.POST)
	public @ResponseBody String changePassword(@RequestParam("oldPassword")String oldPassword,@RequestParam("newPassword")String newPassword,HttpServletRequest request)
	{
		String notification="Password changed successfully Login with your new Password in next login";
		boolean status=adminService.changePassword(oldPassword,newPassword,request);
		System.out.println(newPassword+"  "+oldPassword+" "+status);
		if(!status)
			notification="Oops something went wrong! check your previous password";
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}
	
	@RequestMapping(value="/viewBatch/{batchNumber}")
	public @ResponseBody StudentsList viewStudents(@PathVariable("batchNumber")int batchNumber)
	{
	
		List<CVStudent> students=adminService.viewStudents(batchNumber);
		StudentsList studentsList=new StudentsList();
		studentsList.setStudentsList(students);
		return studentsList;
	}
	
	@RequestMapping(value="/viewAll")
	public @ResponseBody StudentsList viewAllStudents()
	{
	
		List<CVStudent> students=adminService.viewAllStudents();
		StudentsList studentsList=new StudentsList();
		studentsList.setStudentsList(students);
		
		return studentsList;
	}

	@RequestMapping(value="/pushQuestion",method=RequestMethod.GET)
	public @ResponseBody String pushQuestion(@ModelAttribute("question")Question question,HttpServletRequest request)
	{
		Admin admin=(Admin)request.getSession().getAttribute("admin");
		question.setQby(admin.getName());
		boolean status=questionService.save(question);
		String notification="New Question pushed to Database succsfully under subject"+question.getSubject();
		
		if(!status)
			notification="Oops! Something went wrong, try again or contact admin";
		
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}
	
	
	@RequestMapping(value="/getQAQuestionsBySubject/{subject}",method=RequestMethod.GET)
	public @ResponseBody QAQuestionsList getQuestionsBySubject(@PathVariable String subject)
	{
		System.out.println(" Testing");
		List<QAQuestion> questions=qaQuestionService.getQAQuestionsBySubject(subject);
		QAQuestionsList ql=new QAQuestionsList();
		ql.setQaQuestionsList(questions);
		System.out.println(ql+" Testing");
		return ql;
	}
	
	
	@RequestMapping(value="/getQAQuestionsByAdmin/{adminName}",method=RequestMethod.GET)
	public @ResponseBody QAQuestionsList getQAQuestionsByAdmin(@PathVariable String adminName)
	{
		System.out.println(" Testing");
		List<QAQuestion> questions=qaQuestionService.getQAQuestionsByAdmin(adminName);
		QAQuestionsList ql=new QAQuestionsList();
		ql.setQaQuestionsList(questions);
		System.out.println(ql+" Testing");
		return ql;
	}
	
	
	@RequestMapping(value="/getQAQuestionsByQuestion/{question}",method=RequestMethod.GET)
	public @ResponseBody QAQuestionsList getQAQuestionsByQuestion(@PathVariable String question)
	{
		System.out.println(" Testing");
		List<QAQuestion> questions=qaQuestionService.getQAQuestionsByQuestion(question);
		QAQuestionsList ql=new QAQuestionsList();
		ql.setQaQuestionsList(questions);
		System.out.println(ql+" Testing");
		return ql;
	}
	
	@RequestMapping(value="/getQuestionsByTopic/{topic}",method=RequestMethod.GET)
	public @ResponseBody QuestionsList getQuestionsByTopic(@PathVariable String topic)
	{
		
		List<Question> questions=questionService.getQuestionsByTopic(topic);
		QuestionsList ql=new QuestionsList();
		ql.setQuestionsList(questions);
		return ql;
	}
	
	
	
	@RequestMapping(value="/getQuestionsByAdmin/{adminName}",method=RequestMethod.GET)
	public @ResponseBody QuestionsList getQuestionsByAdmin(@PathVariable String adminName)
	{
		List<Question> questions=questionService.getQuestionsByAdmin(adminName);
		QuestionsList ql=new QuestionsList();
		ql.setQuestionsList(questions);
		return ql;
	}
	
	@RequestMapping(value="/getQuestionsByQuestion/{question}",method=RequestMethod.GET)
	public @ResponseBody QuestionsList getQuestionsByQuestions(@PathVariable String question)
	{
		List<Question> questions=questionService.getQuestionsByQuestion(question);
		QuestionsList ql=new QuestionsList();
		ql.setQuestionsList(questions);
		return ql;
	}
	
	
	
	@RequestMapping(value="/createQuestionPaper",method=RequestMethod.GET)
	public @ResponseBody String createQuestionPaper(@ModelAttribute("qp")QuestionPaper questionPaper,HttpServletRequest request)
	{
		System.out.println(questionPaper);
		boolean status=questionPaperService.createPaper(questionPaper,request);
		String notification="New QuestionPaper has been created succesfully for the Batches"+questionPaper.getBatchNos();
		
		if(!status)
			notification="Oops! Something went Wrong, Try again or contact admin";
		
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}
	
	@RequestMapping(value="/publishQuestionPaper",method=RequestMethod.GET)
	public @ResponseBody String publishQuestionPaper(@RequestParam("qp_id") int qp_id,@RequestParam("BatchNos") String[] batches)
	{
		
	return	questionPaperService.pushPaper(qp_id,batches);
		
	}
	
	@RequestMapping(value="/getQuestionPapers/{qp_type}")
	public @ResponseBody QuestionPapersList getQuestionPapers(@PathVariable String qp_type,HttpServletRequest request)
	{
		
		QuestionPapersList qplist=new QuestionPapersList();
		qplist.setQuestionPapersList(questionPaperService.getQuestionPapers(qp_type,request));
	
		return qplist;
	}
	
	
	@RequestMapping(value="/viewPaper/{questions}",method=RequestMethod.GET)
	public @ResponseBody QuestionsList viewPaper(@PathVariable String questions)
	{
		QuestionsList ql=new QuestionsList();
		ql.setQuestionsList(questionService.getQuestions(questions));
		return ql;
	}
	
	
	@RequestMapping(value="/viewQAPaper/{questions}",method=RequestMethod.GET)
	public @ResponseBody QAQuestionsList viewQAPaper(@PathVariable String questions)
	{
		
		QAQuestionsList ql=new QAQuestionsList();
		ql.setQaQuestionsList(qaQuestionService.getQuestions(questions));
		System.out.println(ql);
		return ql;
	}
	
	@RequestMapping(value="/deleteQpaper/{qp_id}",method=RequestMethod.GET)
	public @ResponseBody String deleteQpaper(@PathVariable int qp_id)
	{
		String notification="QuestionPaper Successfully Deleted";
		boolean status=questionPaperService.deleteQPaper(qp_id);
		if(!status)
			notification="Oops! You cannot Delete this Question paper since few students have already taken exam, The record has been tracked";
		
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}

	@RequestMapping(value="/updateFee/{email}/{feePaid}")
	public @ResponseBody String updateFee(@PathVariable String email,@PathVariable int feePaid,HttpServletRequest request)
	{
		Admin admin=(Admin)request.getSession().getAttribute("admin");
		if(admin!=null && (admin.getEmail().equals("cv@cvcorp.in") || admin.getEmail().equals("akanksha@cvcorp.in") || admin.getEmail().equals("lalitha@cvcorp.in")))
		
		return adminService.updateFee(email,feePaid);
		else 
			return "{\"status\":"+false+",\"notification\":\"Not acceptable\"}";
	}
	
	@RequestMapping(value="/pushQAQuestion",method=RequestMethod.GET)
	public @ResponseBody String pushQAQuestion(@ModelAttribute("qaQuestion")QAQuestion qaQuestion,HttpServletRequest request )
	{
		String notification="New QA type question pushed to DB successfully";
		boolean status=qaQuestionService.save(request, qaQuestion);
		if(!status)
			notification="There is a problem in pushing the question to DB";
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}
	
	@RequestMapping(value="/getStudentReport/{email}/{any}",method=RequestMethod.GET)
	public @ResponseBody String getStudentReport(@PathVariable String email){
		
		System.out.println(email);
		return 	adminService.getStudentReport(email);
		
	}
	
	@RequestMapping(value="/sendMail",method=RequestMethod.POST)
	public @ResponseBody String sendMail(@RequestParam("message")String message,@RequestParam("recipients")String[] recipients,
			@RequestParam("ccrecipients")String[] cc,@RequestParam("subject")String subject,@RequestParam("bccrecipients")String[] bcc,
			@ RequestParam(value="studentsNames",required=false) String[] names){
	
		String notification="Mail Sent successfully";
		
		//System.out.println(cc[0]);
		boolean status=adminService.sendMail(recipients,cc,subject,message,bcc,names);
		
		if(!status)
			notification="There is a problem in sending the mail please contact admin";
		
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}
	
	@RequestMapping(value="/getStudentsMails/{text}")
	public @ResponseBody StudentsList getStudentsMails(@PathVariable String text)
	{
		StudentsList studentsList=new StudentsList();
		
		studentsList.setStudentsList(adminService.getStudentsMails(text));
		return studentsList;
	}
	
	public BatchService getBatchService() {
		return batchService;
	}

	public void setBatchService(BatchService batchService) {
		this.batchService = batchService;
	}

	@RequestMapping(value="/addBatch",method=RequestMethod.GET)
	public @ResponseBody String addBatch(@ModelAttribute Batch b)
	{
		System.out.println("test");
		String notification="New Batch with the number "+b.getBatchNumber()+" added successfully";
		boolean status=batchService.addBatch(b);
		if(!status)
			notification="There is problem in adding batch please check details"
					+ " Check Dates or check the batch Number might already enrolled";
		System.out.println(status+"  "+notification);
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}
	
	@RequestMapping(value="/getProgress/{batchNumber}/{subject}",method=RequestMethod.GET)
	public @ResponseBody String getProgress(@PathVariable int batchNumber,@PathVariable String subject)
	{
		
	return	batchService.getProgress(batchNumber,subject);
		
	}
	
	@RequestMapping(value="viewFinishedTopics/{batchNumber}/{subject}",method=RequestMethod.GET)
	public @ResponseBody TopicsList viewFinishedTopics(@PathVariable int batchNumber,@PathVariable String subject)
	{
		
	return	batchService.viewFinishedTopics(batchNumber,subject);
		
	}
	
	@RequestMapping(value="viewUnFinishedTopics/{batchNumber}/{subject}",method=RequestMethod.GET)
	public @ResponseBody TopicsList viewUnFinishedTopics(@PathVariable int batchNumber,@PathVariable String subject)
	{
		
	return	batchService.viewUnFinishedTopics(batchNumber,subject);
		
	}	
	
	@RequestMapping(value="/updateTopic/{batchNumber}/{topic_id}/{dateDone}",method=RequestMethod.GET)
	public @ResponseBody String updateTopic(@PathVariable int batchNumber,@PathVariable int topic_id,@PathVariable String dateDone)
	{
		String notification="Topic updated successfully"; 
		
		boolean status=batchService.updateTopic(batchNumber,topic_id,dateDone);
		if(!status)
			notification="There is a problem in updating Topic please check date nor contact admin";
		
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}
	

	
	@RequestMapping("/verifyPresents")
	public @ResponseBody String verifyPresents()
	{
		return adminService.presentsToVerify();
	}
	
	
	@RequestMapping("/acceptPresent/{email}/{presentDate}")
	public @ResponseBody String acceptPresents(@PathVariable String email,@PathVariable String presentDate)
	{
		
		return adminService.acceptPresents(email,presentDate);
		
	}
	
	@RequestMapping("/rejectPresent/{email}/{presentDate}")
	public @ResponseBody String rejectPresents(@PathVariable String email,@PathVariable String presentDate)
	{
		
		return adminService.rejectPresents(email,presentDate);
		
	}
	@RequestMapping(value="/addNotification",method=RequestMethod.GET)
	public @ResponseBody String addNotification(@RequestParam("notification")String notification,@RequestParam("batchNos")String[] batchNos,
			HttpServletRequest request)
	{
		System.out.println(notification);
		return adminService.addNotification(notification,batchNos,request);
	}
	
	
	@RequestMapping(value="/getStudentsListByPaper/{qp_id}",method=RequestMethod.GET)
	public @ResponseBody String getStudentsListByPaper(@PathVariable int qp_id)
	{
		
		return adminService.getStudentsListByPaper(qp_id);
	}
	
	@RequestMapping(value="/getStudentQAAnswerPaper/{email}/{qp_id}",method=RequestMethod.GET)
	public @ResponseBody QAAnswersList getStudentQAAnswerPaper(@PathVariable int qp_id,@PathVariable String email)
	{
		System.out.println("testing");
		return adminService.getStudentQAAnswerPaper(qp_id,email);
	}
	
	@RequestMapping(value="/updateAnswerScore/{id}/{score}",method=RequestMethod.GET)
	public @ResponseBody String updateAnswerScore(@PathVariable int id,@PathVariable double score)
	{
		return adminService.updateAnswerScore(id,score);
	}
	
	@RequestMapping(value="/uploadFile",method=RequestMethod.POST)
	public @ResponseBody String fileUpload(@RequestParam("file") MultipartFile file,@RequestParam("fileName") String fileName,
			@RequestParam("subject")String subject,@RequestParam("batchNos")String[] BatchNos,HttpServletRequest request)
	{
		System.out.println(file.getContentType());
		System.out.println(file.getName());
		return adminService.fileUpload(file,fileName,subject,BatchNos,request,file.getContentType());
		 
		
	}
	
	@RequestMapping(value="/downloadResume/{email}/{any}",method=RequestMethod.GET)
	public ModelAndView downloadResume(@PathVariable String email,HttpServletResponse response)
	{
		 ModelAndView model=new ModelAndView("errorPage");
		byte[] file=adminService.downloadResume(email);
		try {
			if(file!=null){
			response.setContentType("application/msword");
			OutputStream stream=response.getOutputStream();
			
			stream.write(file);
			stream.close();
			}
		} 
		catch (IOException| NullPointerException e) {
			// TODO Auto-generated catch block
			
			e.printStackTrace();
			 model=new ModelAndView("errorPage");
		}
		return model;
	}
	
	@RequestMapping(value="/getTopicsList/{subject}/{topic}",method=RequestMethod.GET)
	public @ResponseBody String getTopicsList(@PathVariable String subject,@PathVariable String topic)
	{
	    if(!topic.equals("nouse"))	
		return adminService.getTopicsList(subject,topic);
	    else
	    	return adminService.getTopicsList(subject,"");
	}
	
	@RequestMapping(value="/getTopicsListQA/{subject}/{topic}",method=RequestMethod.GET)
	public @ResponseBody String getTopicsListQA(@PathVariable String subject,@PathVariable String topic)
	{
	    if(!topic.equals("nouse"))	
		return adminService.getTopicsListQA(subject,topic);
	    else
	    	return adminService.getTopicsListQA(subject,"");
	}
	
	@RequestMapping(value="/getQuestionsByTopicQA/{topic}",method=RequestMethod.GET)
	public @ResponseBody QAQuestionsList getQuestionsByTopicQA(@PathVariable String topic)
	{
		
		List<QAQuestion> questions=questionService.getQuestionsByTopicQA(topic);
		QAQuestionsList ql=new QAQuestionsList();
		ql.setQaQuestionsList(questions);
		return ql;
	}
	
	@RequestMapping(value="/createRandomPaper/{subject}/{type}",method=RequestMethod.GET)
	public @ResponseBody String createRadomPaper(@PathVariable String subject,
			@PathVariable String type,HttpServletRequest request)
	{
		return questionPaperService.createRandomPaper(subject,type,request);
	}
	
	@RequestMapping(value="/updateQuestion",method=RequestMethod.POST)
	public @ResponseBody String updateQuestion(@ModelAttribute("question") Question question)
	{
		return questionService.updateQuestion(question);
	}
	
	@RequestMapping(value="/updateTotalFee/{email}/{totalFee}",method=RequestMethod.GET)
	public @ResponseBody String updateTotalFee(@PathVariable("email") String email,@PathVariable int totalFee,HttpServletRequest request)
	{
		Admin admin=(Admin)request.getSession().getAttribute("admin");
		if(admin!=null && (admin.getEmail().equals("cv@cvcorp.in") || admin.getEmail().equals("akanksha@cvcorp.in") || admin.getEmail().equals("lalitha@cvcorp.in")))
		
		return adminService.updateTotalFee(email,totalFee);
		else 
			return "{\"status\":"+false+",\"notification\":\"Not acceptable\"}";
	}
}
