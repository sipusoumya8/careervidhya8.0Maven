package cv.services;

import java.util.ArrayList;
import java.util.List;



import cv.dao.QuestionDao;
import cv.models.QAQuestion;
import cv.models.Question;

public class QuestionService {

	QuestionDao questionDao;

	public QuestionDao getQuestionDao() {
		return questionDao;
	}

	public void setQuestionDao(QuestionDao questionDao) {
		this.questionDao = questionDao;
	}

	public boolean save(Question question) {
		// TODO Auto-generated method stub
		try{
			question.setQuestion(question.getQuestion().replace("\'", "\\'"));
			question.setOptionA(question.getOptionA().replace("\'", "\\'"));
			question.setOptionB(question.getOptionB().replace("\'", "\\'"));
			question.setOptionC(question.getOptionC().replace("\'", "\\'"));
			question.setOptionD(question.getOptionD().replace("\'", "\\'"));
	
			question.setOptionE(question.getOptionE().replace("\'", "\\'"));
			question.setDescription(question.getDescription().replace("\'", "\\'"));
			question.setExplanation(question.getExplanation().replace("\'", "\\'"));
			
		questionDao.save(question);
		return true;
		}
		catch(Exception e)
		{
			return false;
		}
	}
	
	
	

	public List<Question> getQuestionsByTopic(String topic) {
		// TODO Auto-generated method stub
		return questionDao.getQuestionsByTopic(topic);
		
	}
	
	public List<Question> getQuestionsByAdmin(String adminName) {
		// TODO Auto-generated method stub
		return questionDao.getQuestionsByAdmin(adminName);
		
	}

	public List<Question> getQuestions(String questions) {
		// TODO Auto-generated method stub
		List<Question> list=new ArrayList<Question>();
		String[] qs=questions.split(",");
		int question_id;
		for(String t:qs)
		{
			question_id=Integer.parseInt(t);
			list.addAll(questionDao.getQuestionById(question_id));
		}
		return list;
	}

	public List<Question> getQuestionsByQuestion(String question) {
		// TODO Auto-generated method stub
		return questionDao.getQuestionsByQuestion(question);
	}

	public List<QAQuestion> getQuestionsByTopicQA(String topic) {
		// TODO Auto-generated method stub
		return questionDao.getQuestionsByTopicQA(topic);
	}

	public String updateQuestion(Question question) {
		// TODO Auto-generated method stub
		
		String notification="Question updated successfully";
		boolean status=true;
		question.setQuestion(question.getQuestion().replace("\'", "\\'"));
		question.setOptionA(question.getOptionA().replace("\'", "\\'"));
		question.setOptionB(question.getOptionB().replace("\'", "\\'"));
		question.setOptionC(question.getOptionC().replace("\'", "\\'"));
		question.setOptionD(question.getOptionD().replace("\'", "\\'"));

		question.setOptionE(question.getOptionE().replace("\'", "\\'"));
		
		try {
		questionDao.update(question);
		}catch(Exception e)
		{
			e.printStackTrace();
			status=false;
			notification="There is a problem in updating";
		}
		return "{\"status\":"+status+",\"notification\":\""+notification+"\"}";
	}
}
