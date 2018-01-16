package cv.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import cv.models.QAQuestion;

public class QAQuestionDao {

	JdbcTemplate template;

	public JdbcTemplate getTemplate() {
		return template;
	}

	public void setTemplate(JdbcTemplate template) {
		this.template = template;
	}
	
	public void save(QAQuestion q,String name)throws Exception
	{
		String sql="insert into qabank(question,topic,subject,difficulty,qby,description) values("
				+ "'"+q.getQuestion()+"','"+q.getTopic()+"','"+q.getSubject()+"','"+q.getDifficulty()+"','"+name+"','"+q.getDescription()+"')";
		
		template.update(sql);
		
	}

	public List<QAQuestion> getQAQuestionsBySubject(String subject) {
		// TODO Auto-generated method stub
		String sql="select * from qabank where subject like '%"+subject+"%'";
		List<QAQuestion> questions=template.query(sql,new RowMapper<QAQuestion>(){
			public QAQuestion mapRow(ResultSet rs,int row)throws SQLException{
				QAQuestion q=new QAQuestion();
				q.setDescription(rs.getString("description"));
				q.setDifficulty(rs.getString("difficulty"));
				q.setQby(rs.getString("qby"));
				q.setQuestion(rs.getString("question"));
				q.setQuestion_id(rs.getInt("question_id"));
				q.setSubject(rs.getString("subject"));
				q.setTopic(rs.getString("topic"));
				
				return q;
			}
		});
		
		return questions;
	}

	public List<QAQuestion> getQAQuestionsByAdmin(String adminName) {
		// TODO Auto-generated method stub
		String sql="select * from qabank where qby like '%"+adminName+"%'";
		List<QAQuestion> questions=template.query(sql,new RowMapper<QAQuestion>(){
			public QAQuestion mapRow(ResultSet rs,int row)throws SQLException{
				QAQuestion q=new QAQuestion();
				q.setDescription(rs.getString("description"));
				q.setDifficulty(rs.getString("difficulty"));
				q.setQby(rs.getString("qby"));
				q.setQuestion(rs.getString("question"));
				q.setQuestion_id(rs.getInt("question_id"));
				q.setSubject(rs.getString("subject"));
				q.setTopic(rs.getString("topic"));
				
				return q;
			}
		});
		
		return questions;
	}

	public List<QAQuestion> getQAQuestionsByQuestion(String question) {
		// TODO Auto-generated method stub
		String sql="select * from qabank where question like '%"+question+"%'";
		List<QAQuestion> questions=template.query(sql,new RowMapper<QAQuestion>(){
			public QAQuestion mapRow(ResultSet rs,int row)throws SQLException{
				QAQuestion q=new QAQuestion();
				q.setDescription(rs.getString("description"));
				q.setDifficulty(rs.getString("difficulty"));
				q.setQby(rs.getString("qby"));
				q.setQuestion(rs.getString("question"));
				q.setQuestion_id(rs.getInt("question_id"));
				q.setSubject(rs.getString("subject"));
				q.setTopic(rs.getString("topic"));
				
				return q;
			}
		});
		
		return questions;
	}

	public List<QAQuestion> getQuestionById(int question_id) {
		// TODO Auto-generated method stub
		String sql="select * from qabank where question_id="+question_id;
		List<QAQuestion> questions=template.query(sql,new RowMapper<QAQuestion>(){
			public QAQuestion mapRow(ResultSet rs,int row)throws SQLException{
				QAQuestion q=new QAQuestion();
				q.setDescription(rs.getString("description"));
				q.setDifficulty(rs.getString("difficulty"));
				q.setQby(rs.getString("qby"));
				q.setQuestion(rs.getString("question"));
				q.setQuestion_id(rs.getInt("question_id"));
				q.setSubject(rs.getString("subject"));
				q.setTopic(rs.getString("topic"));
				
				return q;
			}
		});
		
		return questions;
	}
}
