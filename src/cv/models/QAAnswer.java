package cv.models;

public class QAAnswer {

	private int id;
	private int question_id;
	private int qp_id;
	private String answer;
	private String email;
	private String question;
	
	private int marksPercent;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getQuestion_id() {
		return question_id;
	}
	public void setQuestion_id(int question_id) {
		this.question_id = question_id;
	}
	public int getQp_id() {
		return qp_id;
	}
	public void setQp_id(int qp_id) {
		this.qp_id = qp_id;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public int getMarksPercent() {
		return marksPercent;
	}
	public void setMarksPercent(int marksPercent) {
		this.marksPercent = marksPercent;
	}
	
}
