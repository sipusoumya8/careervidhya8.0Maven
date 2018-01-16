package cv.services;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import cv.dao.QAQuestionDao;
import cv.models.Admin;
import cv.models.QAQuestion;


public class QAQuestionService {

	QAQuestionDao qaQuestionDao;

	public QAQuestionDao getQaQuestionDao() {
		return qaQuestionDao;
	}

	public void setQaQuestionDao(QAQuestionDao qaQuestionDao) {
		this.qaQuestionDao = qaQuestionDao;
	}
	
	public boolean save(HttpServletRequest request,QAQuestion qaQuestion)
	{
		Admin admin=(Admin)request.getSession().getAttribute("admin");
		boolean b=false;
		try{
			
			qaQuestion.setQuestion(qaQuestion.getQuestion().replace("\'", "\\'"));
			qaQuestion.setDescription(qaQuestion.getDescription().replace("\'", "\\'"));
			
		qaQuestionDao.save(qaQuestion, admin.getName());
		
		
		b=true;
		}
		catch(Exception e)
		{
			
		}
		return b;
	}
	

	

	public List<QAQuestion> getQAQuestionsBySubject(String subject) {
		// TODO Auto-generated method stub
		return qaQuestionDao.getQAQuestionsBySubject(subject);
		
	}

	public List<QAQuestion> getQAQuestionsByAdmin(String adminName) {
		// TODO Auto-generated method stub
		return qaQuestionDao.getQAQuestionsByAdmin(adminName);
	}

	public List<QAQuestion> getQAQuestionsByQuestion(String question) {
		// TODO Auto-generated method stub
		return qaQuestionDao.getQAQuestionsByQuestion(question);
	}

	public List<QAQuestion> getQuestions(String questions) {
		// TODO Auto-generated method stub
		
		List<QAQuestion> list=new ArrayList<QAQuestion>();
		String[] qs=questions.split(",");
		int question_id;
		for(String t:qs)
		{
			question_id=Integer.parseInt(t);
			list.addAll(qaQuestionDao.getQuestionById(question_id));
		}
		return list;
	}
	
}
