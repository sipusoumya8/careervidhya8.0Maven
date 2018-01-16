package cv.models;

import java.util.Arrays;

public class QuestionPaper {

	private int qp_id;
	private String email;
	private String testName;
	private String[] BatchNos;
	private String questions;
	private String creationDate;
	private int questionsCount;
	private int duration;
	private String publishedBy;
	private String isPractice;
	
	private int studentsCount;
	
	private String qp_type;
	
	
	@Override
	public String toString() {
		return "QuestionPaper [qp_id=" + qp_id + ", email=" + email + ", testName=" + testName + ", BatchNos="
				+ Arrays.toString(BatchNos) + ", questions=" + questions + "]";
	}
	public int getQp_id() {
		return qp_id;
	}
	public void setQp_id(int qp_id) {
		this.qp_id = qp_id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTestName() {
		return testName;
	}
	public void setTestName(String testName) {
		this.testName = testName;
	}
	public String[] getBatchNos() {
		return BatchNos;
	}
	public void setBatchNos(String[] batchNos) {
		BatchNos = batchNos;
	}
	public String getQuestions() {
		return questions;
	}
	public void setQuestions(String questions) {
		this.questions = questions;
	}
	public String getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}
	public int getQuestionsCount() {
		return questionsCount;
	}
	public void setQuestionsCount(int questionsCount) {
		this.questionsCount = questionsCount;
	}
	public void setDuration(int duration)
	{
		this.duration=duration;
	}
	public int getDuration()
	{
		return duration;
	}
	public String getPublishedBy() {
		return publishedBy;
	}
	public void setPublishedBy(String publishedBy) {
		this.publishedBy = publishedBy;
	}
	public String getIsPractice() {
		return isPractice;
	}
	public void setIsPractice(String isPractice) {
		this.isPractice = isPractice;
	}
	public int getStudentsCount() {
		return studentsCount;
	}
	public void setStudentsCount(int studentsCount) {
		this.studentsCount = studentsCount;
	}
	public String getQp_type() {
		return qp_type;
	}
	public void setQp_type(String qp_type) {
		this.qp_type = qp_type;
	}
	
	
}
