package cv.models;



public class CVStudent {

	private String fullName;
	
	private String student_id;
	private int batchNumber;
	private String email;
	
	private String parentName;
	private String isRegistered;
	private String mobile;
	private String gender;
	private String dob;
	private String graduationCity;
	
	private String houseNo;
	private String locality;
	private String city;
	private String state;
	private String mobile_Parent;
	private int feePaid;
	private int feeTotal;
	private double sscPercentage;
	private double interPercentage;
	private double graduationPercentage;
	private String graduationCollege;
	private int graduationYOP;
	private String graduationType;
	private String graduationBranch;

	private int attendancePerc;
	private String password_hash;
	
	
	private double aggregate;
	private String attendance;
	private String joinDate;
	public String getHouseNo() {
		return houseNo;
	}
	public void setHouseNo(String houseNo) {
		this.houseNo = houseNo;
	}
	public String getLocality() {
		return locality;
	}
	public void setLocality(String locality) {
		this.locality = locality;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	
	public void setAggregate()
	{
		aggregate=(sscPercentage+interPercentage+graduationPercentage)/3;
	}
	public double getAggregate(){
		return aggregate;
	}
	@Override
	public String toString() {
		return "CVStudent [fullName=" + fullName + ", student_id=" + student_id + ", batchNumber=" + batchNumber
				+ ", email=" + email + ", parentName=" + parentName + ", isRegistered=" + isRegistered + ", mobile="
				+ mobile + ", mobile_Parent=" + mobile_Parent + ", feePaid=" + feePaid + ", feeTotal=" + feeTotal
				+ ", sscPercentage=" + sscPercentage + ", interPercentage=" + interPercentage
				+ ", graduationPercentage=" + graduationPercentage + ", graduationCollege=" + graduationCollege
				+ ", graduationYOP=" + graduationYOP + ", graduationType=" + graduationType + ", graduationBranch="
				+ graduationBranch + ", password_hash=" + password_hash + ", aggregate=" + aggregate + "date"+joinDate+"]";
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getParentName() {
		return parentName;
	}
	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getMobile_Parent() {
		return mobile_Parent;
	}
	public void setMobile_Parent(String mobile_Parent) {
		this.mobile_Parent = mobile_Parent;
	}
	public int getFeePaid() {
		return feePaid;
	}
	public void setFeePaid(int feePaid) {
		this.feePaid = feePaid;
	}
	public int getfeeTotal() {
		return feeTotal;
	}
	public void setfeeTotal(int feeTotal) {
		this.feeTotal = feeTotal;
	}
	public double getSscPercentage() {
		return sscPercentage;
	}
	public void setSscPercentage(double sscPercentage) {
		this.sscPercentage = sscPercentage;
	}
	public double getInterPercentage() {
		return interPercentage;
	}
	public void setInterPercentage(double interPercentage) {
		this.interPercentage = interPercentage;
	}
	public double getGraduationPercentage() {
		return graduationPercentage;
	}
	public void setGraduationPercentage(int graduationPercentage) {
		this.graduationPercentage = graduationPercentage;
	}
	public String getGraduationCollege() {
		return graduationCollege;
	}
	public void setGraduationCollege(String graduationCollege) {
		this.graduationCollege = graduationCollege;
	}
	public int getGraduationYOP() {
		return graduationYOP;
	}
	public void setGraduationYOP(int graduationYOP) {
		this.graduationYOP = graduationYOP;
	}
	public String getGraduationType() {
		return graduationType;
	}
	public void setGraduationType(String graduationType) {
		this.graduationType = graduationType;
	}
	public String getGraduationBranch() {
		return graduationBranch;
	}
	public void setGraduationBranch(String graduationBranch) {
		this.graduationBranch = graduationBranch;
	}
	
	
	public CVStudent() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CVStudent other = (CVStudent) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (feeTotal != other.feeTotal)
			return false;
		if (feePaid != other.feePaid)
			return false;
		if (fullName == null) {
			if (other.fullName != null)
				return false;
		} else if (!fullName.equals(other.fullName))
			return false;
		if (graduationBranch == null) {
			if (other.graduationBranch != null)
				return false;
		} else if (!graduationBranch.equals(other.graduationBranch))
			return false;
		if (graduationCollege == null) {
			if (other.graduationCollege != null)
				return false;
		} else if (!graduationCollege.equals(other.graduationCollege))
			return false;
		if (graduationPercentage != other.graduationPercentage)
			return false;
		if (graduationType == null) {
			if (other.graduationType != null)
				return false;
		} else if (!graduationType.equals(other.graduationType))
			return false;
		if (graduationYOP != other.graduationYOP)
			return false;
		
		if (interPercentage != other.interPercentage)
			return false;
		if (mobile == null) {
			if (other.mobile != null)
				return false;
		} else if (!mobile.equals(other.mobile))
			return false;
		if (mobile_Parent == null) {
			if (other.mobile_Parent != null)
				return false;
		} else if (!mobile_Parent.equals(other.mobile_Parent))
			return false;
		if (parentName == null) {
			if (other.parentName != null)
				return false;
		} else if (!parentName.equals(other.parentName))
			return false;
		if (sscPercentage != other.sscPercentage)
			return false;
		return true;
	}
	public int getBatchNumber() {
		return batchNumber;
	}
	public void setBatchNumber(int batchNumber) {
		this.batchNumber = batchNumber;
	}
	public String getIsRegistered() {
		return isRegistered;
	}
	public void setIsRegistered(String isRegistered) {
		this.isRegistered = isRegistered;
	}
	public String getPassword_hash() {
		return password_hash;
	}
	public void setPassword_hash(String password_hash) {
		this.password_hash = password_hash;
	}
	public String getStudent_id() {
		return student_id;
	}
	public void setStudent_id(String student_id) {
		this.student_id = student_id;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public String getJoinDate() {
		return joinDate;
	}
	public void setJoinDate(String joinDate) {
		this.joinDate = joinDate;
	}
	public String getAttendance() {
		return attendance;
	}
	public void setAttendance(String attendance) {
		this.attendance = attendance;
	}
	public int getAttendancePerc() {
		return attendancePerc;
	}
	public void setAttendancePerc(int attendancePerc) {
		this.attendancePerc = attendancePerc;
	}
	public String getGraduationCity() {
		return graduationCity;
	}
	public void setGraduationCity(String graduationCity) {
		this.graduationCity = graduationCity;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	
	
	
	
	
}
