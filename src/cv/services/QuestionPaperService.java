package cv.services;

import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.dao.DataIntegrityViolationException;

import cv.dao.QuestionPaperDao;
import cv.dao.ReportDao;
import cv.models.Admin;
import cv.models.QuestionPaper;

public class QuestionPaperService {
	
	QuestionPaperDao questionPaperDao;
	ReportDao reportDao;

	public QuestionPaperDao getQuestionPaperDao() {
		return questionPaperDao;
	}

	public void setQuestionPaperDao(QuestionPaperDao questionPaperDao) {
		this.questionPaperDao = questionPaperDao;
	}

	public boolean createPaper(QuestionPaper questionPaper, HttpServletRequest request) {
		// TODO Auto-generated method stub
		Admin admin=(Admin)request.getSession().getAttribute("admin");
		String batches=",";
		if(questionPaper.getBatchNos()!=null)
		for(String s:questionPaper.getBatchNos())
		{
			batches=batches+s+",";
		}
		
		try{
		questionPaperDao.save(questionPaper,admin.getEmail(),admin.getName(),batches);
		return true;
		}catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
	}

	public ReportDao getReportDao() {
		return reportDao;
	}

	public void setReportDao(ReportDao reportDao) {
		this.reportDao = reportDao;
	}

	public List<QuestionPaper> getQuestionPapers(String qp_type, HttpServletRequest request) {
		// TODO Auto-generated method stub
		Admin admin=(Admin)request.getSession().getAttribute("admin");
		List<QuestionPaper> qp=questionPaperDao.getQuestionPapersByemail(admin.getEmail(),qp_type);
		
		
		for(QuestionPaper q:qp)
		{
			q.setQuestionsCount(q.getQuestions().split(",").length);
			q.setStudentsCount(reportDao.totalStudentsTookExam(q.getQp_id()));
			
		}
		return qp;
	}

	public boolean deleteQPaper(int qp_id) {
		// TODO Auto-generated method stub
		
		try{
		questionPaperDao.deleteQpaper(qp_id);
		return true;
		}catch(DataIntegrityViolationException e)
		{
			return false;
		}
		
	}

	public String pushPaper(int qp_id,String[] batches) {
		// TODO Auto-generated method stub
		
		boolean status=true;
		String notification;
		
		try{
			String BatchNos="";
			for(String s:batches)
			{
				BatchNos=BatchNos+s+",";
			}
		questionPaperDao.push(qp_id,BatchNos);
		notification="Question Paper Pushed Successfully for batches "+BatchNos;
		
		}catch(Exception e)
		{
			e.printStackTrace();
			notification="There is a problem in pushing the question paper";
			status=false;
		}
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}

	public String createRandomPaper(String subject, String type, HttpServletRequest request) {
		// TODO Auto-generated method stub
		Admin admin=(Admin)request.getSession().getAttribute("admin");
		String batches=",";
		
		 Random rm=new Random();
		 String questions="";
		 int duration=17;
		 List<Integer> numbers=questionPaperDao.getAllQuestionsNumbers(subject,type);
		 if(numbers.size()>15)
		 {
			for(int i=0;i<15;i++)
			{
				questions=questions+numbers.get(rm.nextInt(numbers.size()))+",";
			}
		 }
		 else {
			 
			 for(int i=0;i<numbers.size();i++)
				{
				 questions=questions+numbers.get(rm.nextInt(numbers.size()))+",";
				}
			 duration=numbers.size();
			 
		 }
		 try {
		 questionPaperDao.saveRandom("Random "+subject+" QP By assistant", questions, duration, admin.getEmail(), admin.getName(), batches, type);
		 
		 }catch(Exception e)
		 {
			 
		 }
		return "Done";
	}
   
	
	

}
