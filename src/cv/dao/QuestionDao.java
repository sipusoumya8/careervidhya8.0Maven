package cv.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import cv.models.QAQuestion;
import cv.models.Question;

public class QuestionDao {

	JdbcTemplate template;

	public JdbcTemplate getTemplate() {
		return template;
	}

	public void setTemplate(JdbcTemplate template) {
		this.template = template;
	}

	public void save(Question q)throws Exception {
		// TODO Auto-generated method stub
		String sql="insert into questionbank(question,optionA,optionB,optionC,optionD,optionE,"
				+ "qkey,description,topic,subject,difficulty,qby,explanation,passage_id) values('"+q.getQuestion()+"',"
						+ "'"+q.getOptionA()+"','"+q.getOptionB()+"','"+q.getOptionC()+"',"
								+ "'"+q.getOptionD()+"','"+q.getOptionE()+"','"+q.getQkey()+"','"+q.getDescription()+"',"
							+ "'"+q.getTopic()+"','"+q.getSubject()+"','"+q.getDifficulty()+"','"+q.getQby()+"','"+q.getExplanation()+"',"+0+")";
		
		template.update(sql);
	}
	
	public void update(Question q)throws Exception
	{
		String sql="update questionbank set question='"+q.getQuestion()+"', optionA='"+q.getOptionA()+"', optionB='"+q.getOptionB()+"', optionC='"+q.getOptionC()+"',"
				+ "optionD='"+q.getOptionD()+"', optionE='"+q.getOptionE()+"', topic='"+q.getTopic()+"', difficulty='"+q.getDifficulty()+"', qkey='"+q.getQkey()+"' where question_id="+q.getQuestion_id();
	    template.update(sql);
	}

	public List<Question> getQuestionsByTopic(String topic) {
		// TODO Auto-generated method stub
	
		
		String sql="select * from questionbank where topic like '%"+topic+"%'";
		List<Question> questions=template.query(sql,new RowMapper<Question>(){
			public Question mapRow(ResultSet rs,int row)throws SQLException{
				Question q=new Question();
				q.setQuestion_id(rs.getInt(1));
				q.setQuestion(rs.getString(2));
				q.setOptionA(rs.getString(3));
				q.setOptionB(rs.getString(4));
				q.setOptionC(rs.getString(5));
				q.setOptionD(rs.getString(6));
				q.setOptionE(rs.getString(7));
				q.setQkey(rs.getString(8).charAt(0));
				q.setDescription(rs.getString(9));
				q.setTopic(rs.getString(10));
				q.setSubject(rs.getString(11));
				q.setQby(rs.getString("qby"));
				q.setDifficulty(rs.getString("difficulty"));
				q.setExplanation(rs.getString("explanation"));
				q.setPassage_id(rs.getInt("passage_id"));
				if(q.getPassage_id()!=0)
					q.setPassage(getPassage(q.getPassage_id()));
              return q;				
				
				
				
			}
		});
		return questions;
		
	}
	
	public List<Question> getQuestionsByAdmin(String adminName)
	{
		String sql="select * from questionbank where qby like '%"+adminName+"%'";
		List<Question> questions=template.query(sql,new RowMapper<Question>(){
			public Question mapRow(ResultSet rs,int row)throws SQLException{
				Question q=new Question();
				q.setQuestion_id(rs.getInt(1));
				q.setQuestion(rs.getString(2));
				q.setOptionA(rs.getString(3));
				q.setOptionB(rs.getString(4));
				q.setOptionC(rs.getString(5));
				q.setOptionD(rs.getString(6));
				q.setOptionE(rs.getString(7));
				q.setQkey(rs.getString(8).charAt(0));
				q.setDescription(rs.getString(9));
				q.setTopic(rs.getString(10));
				q.setSubject(rs.getString(11));
				q.setQby(rs.getString("qby"));
				q.setDifficulty(rs.getString("difficulty"));
				q.setExplanation(rs.getString("explanation"));
				q.setPassage_id(rs.getInt("passage_id"));
				if(q.getPassage_id()!=0)
					q.setPassage(getPassage(q.getPassage_id()));
              return q;				
				
				
				
			}
		});
		return questions;
		
	}

	public List<Question> getQuestionById(int question_id) {
		// TODO Auto-generated method stub
	
		String sql="select * from questionbank where question_id="+question_id;
		List<Question> questions=template.query(sql,new RowMapper<Question>(){
			public Question mapRow(ResultSet rs,int row)throws SQLException{
				Question q=new Question();
				q.setQuestion_id(rs.getInt(1));
				q.setQuestion(rs.getString(2));
				q.setOptionA(rs.getString(3));
				q.setOptionB(rs.getString(4));
				q.setOptionC(rs.getString(5));
				q.setOptionD(rs.getString(6));
				q.setOptionE(rs.getString(7));
				q.setQkey(rs.getString(8).charAt(0));
				q.setDescription(rs.getString(9));
				q.setTopic(rs.getString(10));
				q.setSubject(rs.getString(11));
				q.setQby(rs.getString("qby"));
				q.setDifficulty(rs.getString("difficulty"));
				q.setExplanation(rs.getString("explanation"));
				q.setPassage_id(rs.getInt("passage_id"));
				if(q.getPassage_id()!=0)
					q.setPassage(getPassage(q.getPassage_id()));
              return q;				
				
				
				
			}
		});
		return questions;
	}

	public List<Question> getQuestionsByQuestion(String question) {
		// TODO Auto-generated method stub
		String sql="select * from questionbank where question like '%"+question+"%'";
		List<Question> questions=template.query(sql,new RowMapper<Question>(){
			public Question mapRow(ResultSet rs,int row)throws SQLException{
				Question q=new Question();
				q.setQuestion_id(rs.getInt(1));
				q.setQuestion(rs.getString(2));
				q.setOptionA(rs.getString(3));
				q.setOptionB(rs.getString(4));
				q.setOptionC(rs.getString(5));
				q.setOptionD(rs.getString(6));
				q.setOptionE(rs.getString(7));
				q.setQkey(rs.getString(8).charAt(0));
				q.setDescription(rs.getString(9));
				q.setTopic(rs.getString(10));
				q.setSubject(rs.getString(11));
				q.setQby(rs.getString("qby"));
				q.setDifficulty(rs.getString("difficulty"));
				q.setExplanation(rs.getString("explanation"));
				q.setPassage_id(rs.getInt("passage_id"));
				if(q.getPassage_id()!=0)
					q.setPassage(getPassage(q.getPassage_id()));
              return q;				
				
				
				
			}
		});
		return questions;
		
	}
	
	public String getPassage(int passage_id)
	{
		String sql="select PASSAGE from passage where PSG_ID=?";
		String passage = (String) template.queryForObject(
	            sql, new Object[] { passage_id }, String.class);
		
		return passage;
	}

	public List<QAQuestion> getQuestionsByTopicQA(String topic) {
		// TODO Auto-generated method stub
		String sql="select * from qabank where topic like '%"+topic+"%'";
		List<QAQuestion> questions=template.query(sql,new RowMapper<QAQuestion>(){
			public QAQuestion mapRow(ResultSet rs,int row)throws SQLException{
				QAQuestion q=new QAQuestion();
				q.setQuestion_id(rs.getInt("question_id"));
				q.setQuestion(rs.getString("question"));
			
				q.setDescription(rs.getString("description"));
				q.setTopic(rs.getString("topic"));
				q.setSubject(rs.getString("subject"));
				q.setQby(rs.getString("qby"));
				q.setDifficulty(rs.getString("difficulty"));
				
              return q;				
				
				
				
			}
		});
		return questions;
	}
	
}
