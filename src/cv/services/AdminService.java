package cv.services;


import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;


import javax.servlet.http.HttpServletRequest;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;

import cv.dao.AdminDao;
import cv.dao.ReportDao;
import cv.dao.StudentDao;
import cv.models.Admin;

import cv.models.CVStudent;

import cv.models.Present;
import cv.models.QAAnswer;
import cv.models.QAAnswersList;

public class AdminService {

	private AdminDao adminDao;
	
	private StudentDao studentDao;
	private ReportDao reportDao;
	
	private MailSender mailSender;
	
	
	public boolean validateAdmin(String email, String password, HttpServletRequest request)
	{
		System.out.println("test admin login");
		return adminDao.validateAdmin(email, password,request);
	}

	public boolean registerStudent(CVStudent st)
	{
		try{
			
			String[] p=generateRandomPassword();
			st.setPassword_hash(p[1]);
			System.out.print(p[1]);
		studentDao.save(st);
		sendWelcomeMail(st.getEmail(),st.getFullName(),p[0],st.getBatchNumber());
		return true;
		}catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
	}
	
	public AdminDao getAdminDao() {
		return adminDao;
	}

	public void setAdminDao(AdminDao adminDao) {
		this.adminDao = adminDao;
	}

	public StudentDao getStudentDao() {
		return studentDao;
	}
	

	public void setStudentDao(StudentDao studentDao) {
		this.studentDao = studentDao;
	}
	public MailSender getMailSender() {
		return mailSender;
	}

	public void setMailSender(MailSender mailSender) {
		this.mailSender = mailSender;
	}

	public List<CVStudent> viewStudents(int batchNumber) {
		// TODO Auto-generated method stub
		List<CVStudent> students=studentDao.getStudentsByBatch(batchNumber);
		return students;
	}
	
	public List<CVStudent> viewAllStudents()
	{
		List<CVStudent> students=studentDao.getStudents();
		return students;
	}

	public String updateFee(String email, int feePaid) {
		// TODO Auto-generated method stub
		boolean status=true;
		String notification="Fee updated successfully Refresh the page to see changes";
		try{
		studentDao.updateFee(email,feePaid);
		}
		catch(Exception e)
		{
			status=false;
			notification="There is a problem in updating the fee";
		}
		
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
		
		}

	public boolean changePassword(String oldPassword, String newPassword,HttpServletRequest request) {
		// TODO Auto-generated method stub
		Admin admin=(Admin)request.getSession().getAttribute("admin");
		if(BCrypt.checkpw(oldPassword, admin.getPassword_hash()))
		{
		
		try{
			BCryptPasswordEncoder e=new BCryptPasswordEncoder();
			String password_hash=e.encode(newPassword);
		adminDao.setPassword(password_hash,admin.getEmail());
		admin.setPassword_hash(password_hash);
		
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

	public ReportDao getReportDao() {
		return reportDao;
	}

	public void setReportDao(ReportDao reportDao) {
		this.reportDao = reportDao;
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


	public boolean sendMail(String[] to,String[] cc,String subject,String text,String[] bcc,String[] names)
	{
		boolean b=true;
	try{
		SimpleMailMessage sm=new SimpleMailMessage();
		sm.setTo(to);
		if(cc!=null)
		sm.setCc(cc);
		if(bcc!=null)
			sm.setBcc(bcc);
		sm.setSubject(subject);
		
		sm.setText(text);
		mailSender.send(sm);
	}
	catch(Exception e)
	{
		e.printStackTrace();
		b=false;
	}
	
		return b;
	}

	public List<CVStudent> getStudentsMails(String text) {
		// TODO Auto-generated method stub
		
		return studentDao.getStudentsMails(text);
		
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
	
	public void sendWelcomeMail(String email,String fullName,String password,int batchNumber){
	
		String message="Hello "+fullName+",\n\n"
				+ "Career Vidhya welcomes you!\n\n"
				+ "Thank you for choosing us as your career partner. We are looking forward to  "
				+ "your progress in the finishing school where you can enhance your skills and  "
				+ "explore career oppurtunities with the use of our best rendered services."
				+ "\n "
				+ "\n We wish you all the best for your career. \n\n"
				+ "To access online services of Career Vidhya- please visit:  http://onlinetest.cvcorp.in\n"
				+ "Your login Id is your email ID:  "+email+" \n"
				+ "Your primary password:  "+password+"\n"
						+ "Your enrolement is done under batch Number:  "+batchNumber
				+ "\n \n \n "
				+ "From \n"
				+ " \n"
				+ "Chaithanya Vaddi\n"
				+ "Mobile: +91 9705 1982 99"
				+ "\ncv@cvcorp.in\n"
				+ "https://in.linkedin.com/in/chaitanyavaddi";
		String subject="Registration Email - OnlineTest-CVCORP";
		
		SimpleMailMessage sm=new SimpleMailMessage();
		sm.setTo(email);
		sm.setSubject(subject);
		
	
		sm.setText(message);
		mailSender.send(sm);
		
	}
	
	
	public String presentsToVerify()
	{
		List<Present> ls=studentDao.getAllPresents();
		String result="{\"presents\":[";
		Present p;
		for(int i=0;i<ls.size();i++)
		{
			p=ls.get(i);
			if(i==ls.size()-1)
			result=result+"{\"email\":\""+p.getEmail()+"\",\"presentDate\":\""+p.getPresentDate()+"\",\"name\":\""+p.getName()+"\","
					+ "\"id\":\""+p.getId()+"\",\"batchNumber\":"+p.getBatchNumber()+"}";
			else
				result=result+"{\"email\":\""+p.getEmail()+"\",\"presentDate\":\""+p.getPresentDate()+"\",\"name\":\""+p.getName()+"\","
						+ "\"id\":\""+p.getId()+"\",\"batchNumber\":"+p.getBatchNumber()+"},";
		}
		result=result+"]}";
		return result;
	}

	public String acceptPresents(String email, String presentDate) {
		// TODO Auto-generated method stub
		boolean status=true;
		String notification="Updated successfully";
		try{
		CVStudent student=studentDao.getStudentByEmail(email);
		if(student.getAttendance()!=null)
		student.setAttendance(student.getAttendance()+","+presentDate);
		else
			student.setAttendance(presentDate);
	  studentDao.updateAttendance(student);
	  studentDao.deletePresents(email, presentDate);
		//st.setAttendance(st.getAttendance()+","+presentDate);
		}
		catch(Exception e)
		{
			status=false;
			notification="There is problem in updating attendance please contact admin";
		}
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}

	public String rejectPresents(String email, String presentDate) {
		// TODO Auto-generated method stub
		String notification="Rejected successfully";
		boolean status=true;
		
		try{
		studentDao.deletePresents(email, presentDate);
		
		}
		catch(Exception e)
		{
			status=false;
			notification="Oops! There is a technical problem occured";
		}
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}

	public String addNotification(String notif,String[] bNos,HttpServletRequest request) {
		// TODO Auto-generated method stub
		String batchNos=",";
		Admin admin=(Admin)request.getSession().getAttribute("admin");
		notif=notif.replace("\'", "\\'");
		
		for(String no:bNos)
		{
			batchNos=batchNos+no+",";
		}
		boolean status=true;
		String notification="New Notification added successfully for batches "+batchNos;
		try{
		adminDao.saveNotification(notif,batchNos,admin.getEmail(),admin.getName());
		}
		catch(Exception e)
		{
			status=false;
			notification="There is a problem in posting the notification";
		}
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}

	public String getStudentsListByPaper(int qp_id) {
		// TODO Auto-generated method stub
		String result="";
		try{
		List<CVStudent> list=reportDao.getStudentsListByPaper(qp_id);
		result="{\"list\":[";
		CVStudent s;
		for(int i=0;i<list.size();i++)
		{
			s=list.get(i);
			if(i!=list.size()-1)
			result=result+"{\"fullName\":\""+s.getFullName()+"\",\"email\":\""+s.getEmail()+"\"},";
			else
				result=result+"{\"fullName\":\""+s.getFullName()+"\",\"email\":\""+s.getEmail()+"\"}";
		}
		  result=result+"]}";
		}
		catch(Exception e)
		{
			
		}
		return result;
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

	public String updateAnswerScore(int id, double score) {
		// TODO Auto-generated method stub
		String notification="Score updated successfully";
		boolean status=true;
		int scoreInInt=(int)score;
		System.out.println(id);
		try{
		reportDao.updateAnswerScore(id,scoreInInt);
		reportDao.upDateInReports(id);
		}
		catch(Exception e)
		{
			status=false;
			notification="There is a problem in updating score";
			e.printStackTrace();
		}
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";

	}

	public String fileUpload(MultipartFile file, String fileName, String subject, String[] batchNos,
			HttpServletRequest request, String fileType) {
		// TODO Auto-generated method stub
		String notification="File Uploaded successfully";
		
		boolean status=true;
		
		Admin admin=(Admin)request.getSession().getAttribute("admin");
	     
		try {
			InputStream stream=file.getInputStream();
			
			byte[] fileData=file.getBytes();
			String batches=",";
			for(String t:batchNos)
			{
				batches=batches+t+",";
			}
			adminDao.uploadFile(stream,fileName,subject,admin.getName(),batches,admin.getEmail(),fileType);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			status=false;
			notification="There is a problem in uploading file, check size of file";
		}
		
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
		
	}

	public String forgotPassword(String email) {
		// TODO Auto-generated method stub
		String notification="Oops! Looks like you are not a registered user to the portal";
	    boolean status=false;
		Admin admin;
		try{
			admin=adminDao.getAdminByEmail(email);
			String[] pwds=generateRandomPassword();
			adminDao.setPassword(pwds[1], email);
			sendForgotPasswordMail(email,admin.getName(),pwds[0]);
			notification="Your new Password has been sent to your mail "+email;
		   status=true;
 		}
		catch(Exception e)
		{
			e.printStackTrace();
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

	public byte[] downloadResume(String email) {
		// TODO Auto-generated method stub
		
		
		byte[] data=null;
		try {
			
					
					InputStream str=studentDao.getResume(email).getBinaryStream();
					
			data=new byte[str.available()];
			str.read(data);
			str.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return data;
	}
	

	
	public String getTopicsList(String subject, String topic2) {
		// TODO Auto-generated method stub
		String topic="[";
		List<String> l;
		try{
		l=reportDao.getTopicsList(subject,topic2);
		for(int i=0;i<l.size();i++)
		{
			if(i!=l.size()-1)
				topic=topic+"\""+l.get(i)+"\",";
			else
				topic=topic+"\""+l.get(i)+"\"";
		}
		topic=topic+"]";
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return topic;
	}

	public String getTopicsListQA(String subject, String topic2) {
		// TODO Auto-generated method stub
		String topic="[";
		List<String> l;
		try{
		l=reportDao.getTopicsListQA(subject,topic2);
		for(int i=0;i<l.size();i++)
		{
			if(i!=l.size()-1)
				topic=topic+"\""+l.get(i)+"\",";
			else
				topic=topic+"\""+l.get(i)+"\"";
		}
		topic=topic+"]";
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return topic;
	}

	public String updateTotalFee(String email,int totalFee) {
		// TODO Auto-generated method stub
		String notification="Fee updated refresh the page to see change";
		boolean status=true;
		try {
		studentDao.updateTotalFee(email,totalFee);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			status=false;
			notification="problem occured";
			System.out.println("test false");
		}
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}

	
}
