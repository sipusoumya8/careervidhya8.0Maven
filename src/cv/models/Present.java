package cv.models;

public class Present {

	private int id;
	private String email;
	private String name;
	private int batchNumber;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPresentDate() {
		return presentDate;
	}
	public void setPresentDate(String presentDate) {
		this.presentDate = presentDate;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getBatchNumber() {
		return batchNumber;
	}
	public void setBatchNumber(int batchNumber) {
		this.batchNumber = batchNumber;
	}
	private String presentDate;
}
