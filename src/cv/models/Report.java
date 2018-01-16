package cv.models;



public class Report {

	private int id;
	private String student_id;
	
	private double scorePer100;
	private String remarks;
	private int qp_id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStudent_id() {
		return student_id;
	}
	public void setStudent_id(String student_id) {
		this.student_id = student_id;
	}


	public double getScorePer100() {
		return scorePer100;
	}
	public void setScorePer10(double scorePer100) {
		this.scorePer100 = scorePer100;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	public Report() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getQp_id() {
		return qp_id;
	}
	public void setQp_id(int qp_id) {
		this.qp_id = qp_id;
	}

	
	
	
}

