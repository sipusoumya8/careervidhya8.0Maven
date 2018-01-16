package cv.dao;



import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import cv.models.QuestionPaper;

public class QuestionPaperDao {

	JdbcTemplate template;

	public JdbcTemplate getTemplate() {
		return template;
	}

	public void setTemplate(JdbcTemplate template) {
		this.template = template;
	}

	public void save(QuestionPaper qp, String email,String name,String batches)throws Exception {
		// TODO Auto-generated method stub
		
		String sql="insert into questionpaper(testName,email,creationDate,questions,BatchNos,publishedBy,duration,isPractice,qp_type)"
				+ "values('"+qp.getTestName()+"','"+email+"',curdate(),'"+qp.getQuestions()+"','"+batches+"','"+name+"',"+qp.getDuration()+",'"+qp.getIsPractice()+"','"+qp.getQp_type()+"')";
		template.update(sql);
	}
	
	
	public void push(int qp_id,String batches)throws Exception {
		// TODO Auto-generated method stub
		
		String sql="update questionpaper set BatchNos=concat(BatchNos,'"+batches+"') where qp_id="+qp_id;
		template.update(sql);
	}

	public List<QuestionPaper> getQuestionPapersByemail(String email, String qp_type) {
		// TODO Auto-generated method stub
		
		String sql="select * from questionpaper where qp_type='"+qp_type+"' order by qp_id desc";
		List<QuestionPaper> qp=template.query(sql,new RowMapper<QuestionPaper>(){
			
			
			public QuestionPaper mapRow(ResultSet rs,int row)throws SQLException{
				QuestionPaper q=new QuestionPaper();
				
				String[] b=new String[1];
				b[0]=rs.getString("BatchNos");
				q.setQp_id(rs.getInt("qp_id"));
				q.setQuestions(rs.getString("questions"));
				q.setTestName(rs.getString("testName"));
				q.setCreationDate(rs.getDate("creationDate")+"");
				q.setBatchNos(b);
				q.setPublishedBy(rs.getString("publishedBy"));
				q.setDuration(rs.getInt("duration"));
				q.setIsPractice(rs.getString("isPractice"));
				q.setEmail(rs.getString("email"));
				q.setQp_type(rs.getString("qp_type"));
				
				return q;
			}
		});
		return qp;
		
	}

	public List<QuestionPaper> getPapersByBatch(String batchNo) {
		// TODO Auto-generated method stub
		
		String sql="select * from questionpaper where BatchNos like '%,"+batchNo+",%'";
		List<QuestionPaper> qp=template.query(sql,new RowMapper<QuestionPaper>(){
			
			
			public QuestionPaper mapRow(ResultSet rs,int row)throws SQLException{
				QuestionPaper q=new QuestionPaper();
				
				String[] b=new String[1];
				b[0]=rs.getString("BatchNos");
				q.setQp_id(rs.getInt("qp_id"));
				q.setQuestions(rs.getString("questions"));
				q.setTestName(rs.getString("testName"));
				q.setCreationDate(rs.getDate("creationDate")+"");
				q.setBatchNos(b);
				q.setPublishedBy(rs.getString("publishedBy"));
				q.setDuration(rs.getInt("duration"));
				q.setIsPractice(rs.getString("isPractice"));
				q.setEmail(rs.getString("email"));
				q.setQp_type(rs.getString("qp_type"));
				return q;
			}
		});
		return qp;
		
		
	}
	
	public List<QuestionPaper> getPapersForExam(String batchNo,String email,String qp_type) {
		// TODO Auto-generated method stub
		
		String sql="select * from questionpaper q where BatchNos like '%,"+batchNo+",%' and qp_type='"+qp_type+"'"
				+ " and q.qp_id not in(select qp_id from reports where student_id='"+email+"') order by q.qp_id desc";
		List<QuestionPaper> qp=template.query(sql,new RowMapper<QuestionPaper>(){
			
			
			public QuestionPaper mapRow(ResultSet rs,int row)throws SQLException{
				QuestionPaper q=new QuestionPaper();
				
				String[] b=new String[1];
				b[0]=rs.getString("BatchNos");
				q.setQp_id(rs.getInt("qp_id"));
				q.setQuestions(rs.getString("questions"));
				q.setTestName(rs.getString("testName"));
				q.setCreationDate(rs.getDate("creationDate")+"");
				q.setBatchNos(b);
				q.setPublishedBy(rs.getString("publishedBy"));
				q.setDuration(rs.getInt("duration"));
				q.setIsPractice(rs.getString("isPractice"));
				q.setEmail(rs.getString("email"));
				q.setQp_type(rs.getString("qp_type"));
				return q;
			}
		});
		return qp;
		
		
	}

	public void deleteQpaper(int qp_id) throws DataIntegrityViolationException {
		// TODO Auto-generated method stub
		
		String sql="delete from questionpaper where qp_id="+qp_id;
		template.update(sql);
	}

	public List<QuestionPaper> getQuestionPapersDone(String email) {
		// TODO Auto-generated method stub
		String sql="select qp_type,duration,questions,BatchNos,reports.qp_id,testName,publishedBy,isPractice,dateDone from questionpaper,reports where student_id='"+email+"' and reports.qp_id=questionpaper.qp_id";
		List<QuestionPaper> qp=template.query(sql,new RowMapper<QuestionPaper>(){
			
			
			public QuestionPaper mapRow(ResultSet rs,int row)throws SQLException{
				QuestionPaper q=new QuestionPaper();
				
				String[] b=new String[1];
				b[0]=rs.getString("BatchNos");
				q.setQp_id(rs.getInt("qp_id"));
				q.setQuestions(rs.getString("questions"));
				q.setTestName(rs.getString("testName"));
				q.setCreationDate(rs.getDate("dateDone")+"");
				q.setBatchNos(b);
				q.setPublishedBy(rs.getString("publishedBy"));
				q.setDuration(rs.getInt("duration"));
				q.setIsPractice(rs.getString("isPractice"));
				//q.setEmail(rs.getString("email"));
				q.setQp_type(rs.getString("qp_type"));
				return q;
			}
		});
		return qp;
	}

	public List<Integer> getAllQuestionsNumbers(String subject, String type) {
		// TODO Auto-generated method stub
		String sql;
		if(type.equals("Multiple"))
		 sql="select question_id from questionbank where subject='"+subject+"'";
		else
			 sql="select question_id from qabank where subject='"+subject+"'";
		List<Integer> numbers=template.queryForList(sql, Integer.class);
		return numbers;	
	}
	public void saveRandom(String testName,String questions,int duration, String email,String name,String batches,String qp_type)throws Exception {
		// TODO Auto-generated method stub
		
		String sql="insert into questionpaper(testName,email,creationDate,questions,BatchNos,publishedBy,duration,isPractice,qp_type)"
				+ "values('"+testName+"','"+email+"',curdate(),'"+questions+"','"+batches+"','"+name+"',"+duration+",'Y','"+qp_type+"')";
		template.update(sql);
	}
	

}
