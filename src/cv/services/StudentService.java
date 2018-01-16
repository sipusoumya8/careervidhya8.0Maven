package cv.services;

import cv.dao.QuestionPaperDao;
import cv.dao.ReportDao;
import cv.dao.StudentDao;
import cv.dao.StudentInGameDao;
import cv.models.Admin;
import cv.models.CVStudent;
import cv.models.CustomFile;
import cv.models.Notification;

import cv.models.QAAnswer;
import cv.models.QAAnswersList;
import cv.models.QuestionPaper;
import cv.models.Report;
import cv.models.StudentInGame;

import java.io.InputStream;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import java.util.List;

import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.web.multipart.MultipartFile;

public class StudentService {

	private StudentDao studentDao;
	private QuestionPaperDao questionPaperDao;
	private ReportDao reportDao;
	
	private StudentInGameDao studentInGameDao;
	private MailSender mailSender;
	
	public MailSender getMailSender() {
		return mailSender;
	}


	public void setMailSender(MailSender mailSender) {
		this.mailSender = mailSender;
	}


	public ReportDao getReportDao() {
		return reportDao;
	}


	public void setReportDao(ReportDao reportDao) {
		this.reportDao = reportDao;
	}


	public boolean login(String email,String password, HttpServletRequest request)
	{
		boolean lg=false;
		System.out.println("before");
		CVStudent student=null;
		try{
		student=studentDao.getStudentByEmail(email);
		}
		catch(Exception e)
		{
			lg=false;
			e.printStackTrace();
		}
		System.out.println("after");
		if(student!=null)
		{
				try{
				
					lg=BCrypt.checkpw(password, student.getPassword_hash());
					if(lg)
					{
					request.getSession().setAttribute("student", student);
					request.getSession().setMaxInactiveInterval(-1);
					
					if(student.getIsRegistered().equals("N"))
						studentDao.setIsRegistered(student.getEmail());
				
				if(!isTaken(student))
				{
					try{
					studentDao.present(student.getEmail(),student.getFullName(),student.getBatchNumber());
					}catch(Exception e)
					{
						e.printStackTrace();
					}
					//String today=new SimpleDateFormat("yyyy-MM-dd").format(new Date());
					
					//if(student.getAttendance()!=null)
					//student.setAttendance(student.getAttendance()+","+today);
					//else
						//student.setAttendance(today);
				//studentDao.updateAttendance(student);
				}
				
					
					
					
					}
				 System.out.println(lg+"kjh");
				}
				catch(Exception e)
				{
					e.printStackTrace();
					lg=false;
				}

		}
		return lg;
	}
	
	
	

	
	public StudentDao getStudentDao() {
		return studentDao;
	}

	public void setStudentDao(StudentDao studentDao) {
		this.studentDao = studentDao;
	}
	
	public boolean isTaken(CVStudent st)
	{
		String today=new SimpleDateFormat("yyyy-MM-dd").format(new Date());
		String atd=st.getAttendance();
		//System.out.println(atd==null);
		boolean r=false;
		if(atd!=null)
		{
		String[] ar=atd.split(",");
		
		for(int i=0;i<ar.length;i++)
		{
			if(ar[i].equalsIgnoreCase(today))
			{
				r=true;
				break;
			}
		}
		}
	
		
		return r;
	}


	public List<QuestionPaper> getQuestionPapersByBatch(String batchNo) {
		// TODO Auto-generated method stub
		
		return questionPaperDao.getPapersByBatch(batchNo);
		
	}

	public List<QuestionPaper> getQuestionPapersForExam(String batchNo,String email,String qp_type) {
		// TODO Auto-generated method stub
		
		return questionPaperDao.getPapersForExam(batchNo,email,qp_type);
		
	}

	public QuestionPaperDao getQuestionPaperDao() {
		return questionPaperDao;
	}


	public void setQuestionPaperDao(QuestionPaperDao questionPaperDao) {
		this.questionPaperDao = questionPaperDao;
	}
	
	public String getStudentReport(String email) {
		// TODO Auto-generated method stub
		String result;
		int scorePerc=0;
		int attendancePerc=0;
		int testCount=0;
		int[] rs;
		boolean b=true;
		try{
		rs=reportDao.getScorePerc(email);
		scorePerc=rs[0];
		testCount=rs[1];
		}catch(Exception e)
		{
		  b=false;
		}
		
		try{
		attendancePerc=studentDao.getAttendancePerc(email);
		if(b)
			result="{\"scorePerc\":"+scorePerc+",\"attendancePerc\":"+attendancePerc+",\"testCount\":"+testCount+"}";
		else
			result="{\"scorePerc\":"+null+",\"attendancePerc\":"+attendancePerc+",\"testCount\":"+testCount+"}";
		  
		}
		catch(Exception e)
		{
			if(b)
				result="{\"scorePerc\":"+scorePerc+",\"attendancePerc\":"+null+",\"testCount\":"+testCount+"}";
			else
				result="{\"scorePerc\":"+null+",\"attendancePerc\":"+null+",\"testCount\":"+testCount+"}";
		}
		return result; 
	}


	public boolean evaluateExam(int qp_id,double marks,String student_id, String manswers) {
		// TODO Auto-generated method stub
		Report report=new Report();
		report.setScorePer10(marks);
		report.setQp_id(qp_id);
		report.setStudent_id(student_id);
		try{
		reportDao.save(report);
		reportDao.saveUserAnswers(qp_id,student_id,manswers);
		return true;
		}
		catch(Exception e)
		{
			return false;
		}
		
	}


	public List<QuestionPaper> getQuestionPapersDone(String email) {
		// TODO Auto-generated method stub
		return questionPaperDao.getQuestionPapersDone(email);
	}



	
	public boolean changePassword(String oldPassword, String newPassword,HttpServletRequest request) {
		// TODO Auto-generated method stub
		CVStudent st=(CVStudent)request.getSession().getAttribute("student");
		if(BCrypt.checkpw(oldPassword, st.getPassword_hash()))
		{
		
		try{
			BCryptPasswordEncoder e=new BCryptPasswordEncoder();
			String password_hash=e.encode(newPassword);
		studentDao.setPassword(password_hash,st.getEmail());
		st.setPassword_hash(password_hash);
		
		return true;
		}
		catch(Exception e)
		{
			return false;
		}
		}
		else
		{
			return false;
		}
		
	}


	public Notification getNotification(String batchNumber) {
		// TODO Auto-generated method stub
		return reportDao.getNotification(batchNumber);
		
	}


	public boolean submitQAExam(String[] question_ids, String[] qaAnswers, int qp_id, String email) {
		// TODO Auto-generated method stub
		
		boolean b=true;
		
		for(int i=0;i<question_ids.length;i++)
		{
			try{
				qaAnswers[i]=qaAnswers[i].replace('\'', '"');
			reportDao.saveQAAnswers(question_ids[i],qaAnswers[i],email,qp_id);
			}catch(Exception e)
			{
				b=false;
				e.printStackTrace();
				break;
				
			}
		}
		Report report=new Report();
		report.setQp_id(qp_id);
		report.setStudent_id(email);
		report.setScorePer10(-1);
	
		try{
			
		reportDao.save(report);
		
		}catch(Exception e)
		{
			b=false;
			e.printStackTrace();
		}
		return b;
		
	}


	public String getStudentScore(String email, int qp_id) {
		// TODO Auto-generated method stub
		int scorePer100=0;
		boolean status=true;
		try{
		scorePer100=reportDao.getStudentScoreForPaper(email,qp_id);
		}
		catch(Exception e)
		{
			status=false;
			e.printStackTrace();
		}
		return "{\"status\":"+status+",\"scorePer100\":"+scorePer100+"}";
	}
	
	public List<CustomFile> getFilesBySubject(String subject,int batchNumber)
	{
		return studentDao.getFilesBySubject(subject,batchNumber);
	}


	public ArrayList getFileById(int id) {
		// TODO Auto-generated method stub
		ArrayList al=null;
		String fileType=null;
		byte[] data=null;
		try {
			
					al=studentDao.getFileById(id);
					InputStream str=((java.sql.Blob) al.get(1)).getBinaryStream();
					fileType=(String)al.get(0);
			data=new byte[str.available()];
			str.read(data);
			str.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		al.clear();
		al.add(fileType);
		al.add(data);
		return al;
	}
	
	
	public String[] generateRandomPassword()
	{
		String[] p=new String[2];
		Random rm=new Random();
		String pwd="";
		for(int i=0;i<=8;i++){
		int n=rm.nextInt(26)+65;
		pwd=pwd+(char)n;
		}
		p[0]=pwd;
		System.out.println(pwd);
		BCryptPasswordEncoder e=new BCryptPasswordEncoder();
		String password_hash=e.encode(pwd);
		
		p[1]=password_hash;
		return p;
	}
	
	public String forgotPassword(String email) {
		// TODO Auto-generated method stub
		String notification="Oops! Looks like you are not a registered user to the portal";
		boolean status=false;
		CVStudent student;
		try{
		    student=studentDao.getStudentByEmail(email);
			String[] pwds=generateRandomPassword();
			studentDao.setPassword(pwds[1], email);
			sendForgotPasswordMail(email,student.getFullName(),pwds[0]);
			notification="Your new Password has been sent to your mail "+email;
		    status=true;
 		}
		catch(Exception e)
		{
			
		}
		
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
		
	}
	
	public void sendForgotPasswordMail(String email,String name,String password)
	{
		
		String subject="New Password - CareerVidhya Operations";
		
		String message="Hi "+name+"\n\n"
				+ "This mail is regarding your request to change password in Career Vidhya online portal. \n"
				+ "If you have't requested, We recommend you to change your password.\n"
				+ "\n\nYour New password to Login is: "+password
						+ "\n\n\n"
						+ "From"
						+ "CareerVidhya Operations";
		SimpleMailMessage sm=new SimpleMailMessage();
		sm.setTo(email);
		sm.setSubject(subject);
		sm.setText(message);
		mailSender.send(sm);
	}


	public Object getLeadBoard() {
		// TODO Auto-generated method stub
		
		StudentInGame st;
		return null;
	}


	public StudentInGameDao getStudentInGameDao() {
		return studentInGameDao;
	}


	public void setStudentInGameDao(StudentInGameDao studentInGameDao) {
		this.studentInGameDao = studentInGameDao;
	}


	public String getUserOptions(String email, int qp_id) {
		// TODO Auto-generated method stub
        String options=null;
		try{
		options=reportDao.getUserOptions(email,qp_id);
		} 
		catch(Exception e)
		{
		}
		return options;
	}
	
	
	public QAAnswersList getStudentQAAnswerPaper(int qp_id,String email) {
		// TODO Auto-generated method stub
		List<QAAnswer> ans=null;
		try {
			ans=reportDao.getStudentQAAnswerPaper(qp_id,email);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
		QAAnswersList ql=new QAAnswersList();
		ql.setList(ans);


		return ql;
	}


	public String uploadResume(MultipartFile file, HttpServletRequest request) {
		// TODO Auto-generated method stub
		
		// TODO Auto-generated method stub
				String notification="File Uploaded successfully";
				
				boolean status=true;
				
				CVStudent student=(CVStudent)request.getSession().getAttribute("student");
			     
				try {
					InputStream stream=file.getInputStream();
					
					
					
					studentDao.uploadResume(stream,student.getEmail());
					
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					status=false;
					notification="There is a problem in uploading file, check size of file";
				}
				
				return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
				
	}


	
}
