package cv.models;

public class Topic {

	private int topic_id;
	private String topicName;
	private int durationDays;
	private int flowNumber;
	private String subject;
	private String resource;
	private String dateDone;
	
	
	public int getTopic_id() {
		return topic_id;
	}
	public void setTopic_id(int topic_id) {
		this.topic_id = topic_id;
	}
	public String getTopicName() {
		return topicName;
	}
	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}
	public int getDurationDays() {
		return durationDays;
	}
	public void setDurationDays(int durationDays) {
		this.durationDays = durationDays;
	}
	public int getFlowNumber() {
		return flowNumber;
	}
	public void setFlowNumber(int flowNumber) {
		this.flowNumber = flowNumber;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getResource() {
		return resource;
	}
	public void setResource(String resource) {
		this.resource = resource;
	}
	public String getDateDone() {
		return dateDone;
	}
	public void setDateDone(String dateDone) {
		this.dateDone = dateDone;
	}
	
	
}
