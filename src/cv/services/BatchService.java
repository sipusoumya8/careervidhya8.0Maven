package cv.services;

import java.util.List;

import cv.models.Batch;
import cv.models.Notification;
import cv.models.Topic;
import cv.models.TopicsList;

public class BatchService {

	cv.dao.BatchDao batchDao;

	public cv.dao.BatchDao getBatchDao() {
		return batchDao;
	}

	public void setBatchDao(cv.dao.BatchDao batchDao) {
		this.batchDao = batchDao;
	}

	public List<Batch> getBatches() {
		// TODO Auto-generated method stub
	 return batchDao.getBatches();
	
	}
	
	public List<Topic> getTopicsBySubject(String subject){
		
		return batchDao.getTopicsBySubject(subject);
	}

	public boolean addBatch(Batch b) {
		// TODO Auto-generated method stub
		boolean status=true;
		try{
			batchDao.save(b);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			status=false;
		}
		return status;
	}

	public String getProgress(int batchNumber, String subject) {
		// TODO Auto-generated method stub
		String rs="Something went wrong";
		try{
		 rs=batchDao.getProgress(batchNumber,subject);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return rs;
	}

	public TopicsList viewFinishedTopics(int batchNumber, String subject) {
		// TODO Auto-generated method stub
		TopicsList tl=new TopicsList();
		tl.setTopics(batchDao.getFinishedTopics(batchNumber,subject));
		return tl;
	}
	public TopicsList viewUnFinishedTopics(int batchNumber, String subject) {
		// TODO Auto-generated method stub
		TopicsList tl=new TopicsList();
		tl.setTopics(batchDao.getUnFinishedTopics(batchNumber,subject));
		return tl;
	}

	public boolean updateTopic(int batchNumber, int topic_id, String dateDone) {
		// TODO Auto-generated method stub
		boolean status=true;
		try{
		batchDao.updateTopic(batchNumber,topic_id,dateDone);
		}catch(Exception e)
		{
			status=false;
			e.printStackTrace();
		}
		return status;
	}

	public List<Notification> getNotifications() {
		// TODO Auto-generated method stub
		
		
		return batchDao.getNotifications();
	}
}
