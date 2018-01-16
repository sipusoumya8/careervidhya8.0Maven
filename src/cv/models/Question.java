package cv.models;

public class Question {

	private int question_id;
	private String question;
	private String optionA;
	private String optionB;
	private String optionC;
	private String optionD;
	private String optionE;
	private char qkey;
	private String description;
	private String topic;
	private String subject;
	private String difficulty;
	private int passage_id;
	private String passage;
	private String qby;
	private String explanation;
	public int getQuestion_id() {
		return question_id;
	}
	public void setQuestion_id(int question_id) {
		this.question_id = question_id;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getOptionA() {
		return optionA;
	}
	public void setOptionA(String optionA) {
		this.optionA = optionA;
	}
	public String getOptionB() {
		return optionB;
	}
	public void setOptionB(String optionB) {
		this.optionB = optionB;
	}
	public String getOptionC() {
		return optionC;
	}
	public void setOptionC(String optionC) {
		this.optionC = optionC;
	}
	public String getOptionD() {
		return optionD;
	}
	public void setOptionD(String optionD) {
		this.optionD = optionD;
	}
	public String getOptionE() {
		return optionE;
	}
	public void setOptionE(String optionE) {
		this.optionE = optionE;
	}
	public char getQkey() {
		return qkey;
	}
	public void setQkey(char qkey) {
		this.qkey = qkey;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTopic() {
		return topic;
	}
	public void setTopic(String topic) {
		this.topic = topic;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getDifficulty() {
		return difficulty;
	}
	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}
	public int getPassage_id() {
		return passage_id;
	}
	public void setPassage_id(int passage_id) {
		this.passage_id = passage_id;
	}
	public Question() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getQby() {
		return qby;
	}
	public void setQby(String qby) {
		this.qby = qby;
	}
	public String getExplanation() {
		return explanation;
	}
	public void setExplanation(String explanation) {
		this.explanation = explanation;
	}
	public String getPassage() {
		return passage;
	}
	public void setPassage(String passage) {
		this.passage = passage;
	}
	
	
}
