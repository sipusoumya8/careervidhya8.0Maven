package cv.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import java.util.List;
import java.util.Map;


import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import cv.models.Batch;
import cv.models.Notification;
import cv.models.Topic;

public class BatchDao {

	JdbcTemplate template;

	public JdbcTemplate getTemplate() {
		return template;
	}

	public void setTemplate(JdbcTemplate template) {
		this.template = template;
	}

	public List<Batch> getBatches() {
		// TODO Auto-generated method stub
	
		String sql="select * from batches";
		List<Batch> list=template.query(sql,new RowMapper<Batch>(){
			
			public Batch mapRow(ResultSet rs,int row)throws SQLException{
				Batch b=new Batch();
				b.setBatchNumber(rs.getInt("batchNumber"));
				b.setBeginDate(""+rs.getDate("beginDate"));
				b.setEndDate(""+rs.getDate("endDate"));
				b.setTotalStudents(getStudentsCount(b.getBatchNumber()));
				return b;
			}
		});
		
		return list;
	}

	public List<Topic> getTopicsBySubject(String subject) {
		// TODO Auto-generated method stub
		
		String sql="select * from topics where subject='"+subject+"'";
		List<Topic> list=template.query(sql, new RowMapper<Topic>(){
			
			public Topic mapRow(ResultSet rs,int row)throws SQLException{
				Topic topic=new Topic();
				topic.setDurationDays(rs.getInt("durationDays"));
				topic.setSubject(rs.getString("subject"));
				topic.setFlowNumber(rs.getInt("flowNumber"));
				topic.setTopic_id(rs.getInt("topic_id"));
				topic.setTopicName(rs.getString("topicName"));
				topic.setResource(rs.getString("resource"));
				return topic;
			}
		});
		return list;
	}
	
	
	// Get Students count
	
	public int getStudentsCount(int n)
	{
		String sql="select count(*) from cv_students where batchNumber=?";
		return template.queryForObject(sql, new Object[]{n},Integer.class);
	}

	public void save(Batch b)throws Exception {
		// TODO Auto-generated method stub
		String sql="insert into batches(batchNumber,beginDate,endDate) values("+b.getBatchNumber()+",'"
				+ b.getBeginDate()+"','"+b.getEndDate()+"')";
		template.update(sql);
	}

	public String getProgress(int batchNumber, String subject)throws Exception {
		// TODO Auto-generated method stub

		String sql="select sum(durationDays),(select sum(durationDays) from topics where subject='"+subject+"')"
				+ " from topicscovered,topics where topics.topic_id=topicscovered.topic_id and subject ='"+subject+"' and batchNumber="+batchNumber;
	
		
		  List<HashMap<Integer,Integer>> ls=template.query(sql, new RowMapper<HashMap<Integer,Integer>>(){
			  
			  public HashMap<Integer,Integer> mapRow(ResultSet rs,int row)throws SQLException{
				 HashMap<Integer,Integer> map=new HashMap<Integer,Integer>();
				  map.put(rs.getInt(1),rs.getInt(2));
			   return map;
			  }
		  });
		  
		  Map.Entry<Integer,Integer> v=ls.get(0).entrySet().iterator().next();
		
		return "{\"total\":"+v.getValue()+",\"done\":"+v.getKey()+"}"; 
		
	}

	public List<Topic> getFinishedTopics(int batchNumber, String subject) {
		// TODO Auto-generated method stub
		
		String sql="select t.topicName,c.dateDone,c.topic_id from topicscovered c,topics t"
				+ " where t.topic_id=c.topic_id and subject ='"+subject+"' and batchNumber="+batchNumber;
	      List<Topic> topics= template.query(sql, new RowMapper<Topic>(){
	    	  public Topic mapRow(ResultSet rs,int row)throws SQLException{
	    		  Topic topic=new Topic();
	    		  topic.setTopicName(rs.getString("topicName"));
	    		  topic.setTopic_id(rs.getInt("topic_id"));
	    		  topic.setDateDone(""+rs.getDate("dateDone"));
	    		  return topic;
	    	  }
	       });
	      return topics;
	}
	
	public List<Topic> getUnFinishedTopics(int batchNumber, String subject) {
		// TODO Auto-generated method stub
		
		String sql="select topics.topicName,topics.topic_id from topics where subject='"+subject+"' and topics.topic_id not in"
				+ "(select topic_id from topicscovered where batchNumber="+batchNumber+" and subject='"+subject+"');";
	      List<Topic> topics= template.query(sql, new RowMapper<Topic>(){
	    	  public Topic mapRow(ResultSet rs,int row)throws SQLException{
	    		  Topic topic=new Topic();
	    		  topic.setTopicName(rs.getString("topicName"));
	    		  topic.setTopic_id(rs.getInt("topic_id"));
	    		  
	    		  return topic;
	    	  }
	       });
	      return topics;
	}

	public void updateTopic(int batchNumber, int topic_id, String dateDone)throws Exception {
		// TODO Auto-generated method stub
		String sql="insert into topicscovered(batchNumber,topic_id,dateDone) values ("+batchNumber+","+topic_id+",'"+dateDone+"')";

		template.update(sql);
	}

	public List<Notification> getNotifications() {
		// TODO Auto-generated method stub
		String sql="select * from notifications order by id desc";
		List<Notification> list=template.query(sql,new RowMapper<Notification>(){
			public Notification mapRow(ResultSet rs,int row)throws SQLException{
				Notification n=new Notification();
				n.setId(rs.getInt("id"));
				String[] batchNos={rs.getString("batchNos")};
				n.setBatchNos(batchNos);
				n.setNotification(rs.getString("notification"));
				n.setPostBy(rs.getString("postBy"));
				n.setPostDate(""+rs.getDate("postDate"));
				n.setName(rs.getString("name"));
				return n;
			}
		});
		return list;
	}
	
	
}
