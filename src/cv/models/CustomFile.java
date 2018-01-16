package cv.models;

public class CustomFile {

	private int id;
	private String fileName;
	private String subject;
	private String batches;
	private String uploadDate;
	private String fileBy;
	private String email;
	
	private byte[] fileData;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getBatches() {
		return batches;
	}
	public void setBatches(String batches) {
		this.batches = batches;
	}
	public String getUploadDate() {
		return uploadDate;
	}
	public void setUploadDate(String uploadDate) {
		this.uploadDate = uploadDate;
	}
	public String getFileBy() {
		return fileBy;
	}
	public void setFileBy(String fileBy) {
		this.fileBy = fileBy;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public byte[] getFileData() {
		return fileData;
	}
	public void setFileData(byte[] fileData) {
		this.fileData = fileData;
	}
	
}
