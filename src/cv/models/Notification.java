package cv.models;

public class Notification {

	private int id;
	private String notification;
	private String postBy;
	private String postDate;
	private String[] batchNos;
	private String name;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNotification() {
		return notification;
	}
	public void setNotification(String notification) {
		this.notification = notification;
	}
	public String getPostBy() {
		return postBy;
	}
	public void setPostBy(String postBy) {
		this.postBy = postBy;
	}
	public String getPostDate() {
		return postDate;
	}
	public void setPostDate(String postDate) {
		this.postDate = postDate;
	}
	public String[] getBatchNos() {
		return batchNos;
	}
	public void setBatchNos(String[] batchNos) {
		this.batchNos = batchNos;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
