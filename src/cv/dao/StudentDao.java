package cv.dao;


import java.io.InputStream;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.core.RowMapper;



import cv.models.CVStudent;
import cv.models.CustomFile;
import cv.models.Present;

public class StudentDao {

	private JdbcTemplate template;

	public JdbcTemplate getTemplate() {
		return template;
	}

	public void setTemplate(JdbcTemplate template) {
		this.template = template;
	}
	
	public void updateAttendance(CVStudent st)
	{
		String sql="update cv_students set attendance='"+st.getAttendance()+"' where email='"+st.getEmail()+"'";
		template.update(sql);
	}
	
	public int save(CVStudent st)throws Exception
	{
		String sql="insert into cv_students(batchNumber,fullName,email,parentName,mobile,mobile_Parent,feePaid,feeTotal,sscPercentage,"
				+ "interPercentage,graduationPercentage,graduationCollege,graduationYOP,graduationType"
				+ ",graduationBranch,password_hash,isRegistered,gender,dob,locality,city,state,joinDate,graduationCity) values("+st.getBatchNumber()+",'"+st.getFullName()+"','"+st.getEmail()+"',"
				+ "'"+st.getParentName()+"','"+st.getMobile()+"','"+st.getMobile_Parent()+"',"+st.getFeePaid()+","+st.getfeeTotal()+","+st.getSscPercentage()+","
				+ st.getInterPercentage()+","+st.getGraduationPercentage()+",'"+st.getGraduationCollege()+"',"+st.getGraduationYOP()+",'"+st.getGraduationType()+"','"+st.getGraduationBranch()+"',"
				+ "'"+st.getPassword_hash()+"','N','"+st.getGender()+"','"+st.getDob()+"','"+st.getLocality()+"','"+st.getCity()+"','"+st.getState()+"','"+st.getJoinDate()+"','"+st.getGraduationCity()+"')";
		template.update(sql);
		return 0;
	}
	public int saveTemp(CVStudent st)throws Exception
	{
		String sql="insert into cv_students(batchNumber,fullName,email,parentName,mobile,mobile_Parent,feePaid,feeTotal,sscPercentage,"
				+ "interPercentage,graduationPercentage,graduationCollege,graduationYOP,graduationType"
				+ ",graduationBranch,password_hash,isRegistered,gender,dob,locality,city,state,graduationCity) values("+st.getBatchNumber()+",'"+st.getFullName()+"','"+st.getEmail()+"',"
				+ "'"+st.getParentName()+"','"+st.getMobile()+"','"+st.getMobile_Parent()+"',"+st.getFeePaid()+","+st.getfeeTotal()+","+st.getSscPercentage()+","
				+ st.getInterPercentage()+","+st.getGraduationPercentage()+",'"+st.getGraduationCollege()+"',"+st.getGraduationYOP()+",'"+st.getGraduationType()+"','"+st.getGraduationBranch()+"',"
				+ "'"+st.getPassword_hash()+"','N','"+st.getGender()+"','"+st.getDob()+"','"+st.getLocality()+"','"+st.getCity()+"','"+st.getState()+"','"+st.getGraduationCity()+"')";
		template.update(sql);
		return 0;
	}

	public List<CVStudent> getStudentsByBatch(int batchNumber) {
		// TODO Auto-generated method stub
		
		String sql="select * from cv_students where batchNumber="+batchNumber;
		List<CVStudent> students=template.query(sql,new RowMapper<CVStudent>(){
			public CVStudent mapRow(ResultSet rs,int row) throws SQLException{
			CVStudent s=new CVStudent();
			//s.setStudent_id(rs.getString(1));
			s.setBatchNumber(rs.getInt(1));
			s.setFullName(rs.getString(2));
			s.setEmail(rs.getString(3));
			s.setParentName(rs.getString(4));
			s.setMobile(rs.getString(5));
			s.setMobile_Parent(rs.getString(6));
			s.setFeePaid(rs.getInt(7));
			s.setfeeTotal(rs.getInt(8));
			s.setSscPercentage(rs.getInt(9));
			s.setInterPercentage(rs.getInt(10));
			s.setGraduationPercentage(rs.getInt(11));
			s.setGraduationCollege(rs.getString(12));
			s.setGraduationYOP(rs.getInt(13));
			s.setGraduationType(rs.getString(14));
			s.setGraduationBranch(rs.getString(15));
			s.setPassword_hash(rs.getString(16));
			s.setIsRegistered(rs.getString(17));
			s.setAggregate();
			s.setDob(""+rs.getDate("dob"));
			s.setGraduationCity(rs.getString("graduationCity"));
			s.setGender(rs.getString("gender"));
			s.setLocality(rs.getString("locality"));
			s.setCity(rs.getString("city"));
			s.setState(rs.getString("state"));
			s.setJoinDate(""+rs.getDate("joinDate"));
			s.setAttendancePerc(rs.getInt("attendancePerc"));
			
			return s;
			}	
		});
	
		if(students.size()!=0)
		return students;
		else
			return null;
	}
// List All students
	public List<CVStudent> getStudents() {
		// TODO Auto-generated method stub
		
		String sql="select * from cv_students";
		List<CVStudent> students=template.query(sql,new RowMapper<CVStudent>(){
			public CVStudent mapRow(ResultSet rs,int row) throws SQLException{
			CVStudent s=new CVStudent();
			//s.setStudent_id(rs.getString(1));
			s.setBatchNumber(rs.getInt(1));
			s.setFullName(rs.getString(2));
			s.setEmail(rs.getString(3));
			s.setParentName(rs.getString(4));
			s.setMobile(rs.getString(5));
			s.setMobile_Parent(rs.getString(6));
			s.setFeePaid(rs.getInt(7));
			s.setfeeTotal(rs.getInt(8));
			s.setSscPercentage(rs.getInt(9));
			s.setInterPercentage(rs.getInt(10));
			s.setGraduationPercentage(rs.getInt(11));
			s.setGraduationCollege(rs.getString(12));
			s.setGraduationYOP(rs.getInt(13));
			s.setGraduationType(rs.getString(14));
			s.setGraduationBranch(rs.getString(15));
			s.setPassword_hash(rs.getString(16));
			s.setIsRegistered(rs.getString(17));
			s.setAggregate();
			s.setDob(""+rs.getDate("dob"));
			s.setGraduationCity(rs.getString("graduationCity"));
			s.setGender(rs.getString("gender"));
			s.setLocality(rs.getString("locality"));
			s.setCity(rs.getString("city"));
			s.setState(rs.getString("state"));
			s.setJoinDate(""+rs.getDate("joinDate"));
			s.setAttendancePerc(rs.getInt("attendancePerc"));
			return s;
			}	
		});
	
		if(students.size()!=0)
		return students;
		else
			return null;
	}
	public CVStudent getStudentByEmail(String email)throws Exception {
		// TODO Auto-generated method stub
		CVStudent student=null;
		String sql="select * from cv_students where email=?";  
		
	   student=template.queryForObject(sql, new Object[]{email},new BeanPropertyRowMapper<CVStudent>(CVStudent.class));  
		student.setAggregate();
		
	   return student;
		
	}



	public void updateFee(String email, int feePaid)throws Exception {
		// TODO Auto-generated method stub
		String sql="update cv_students set feePaid="+feePaid+" where email='"+email+"'";
		template.update(sql);
	}

	public int getAttendancePerc(String email)throws Exception {
		// TODO Auto-generated method stub
		String sql="select attendancePerc from cv_students where email=?";
		return template.queryForObject(sql, new Object[]{email},Integer.class);
		
	}

	public List<CVStudent> getStudentsMails(String text) {
		// TODO Auto-generated method stub
		String sql="select * from cv_students where email like'%"+text+"%' or fullName like '%"+text+"%'";
	   
		List<CVStudent> students=template.query(sql,new RowMapper<CVStudent>(){
			public CVStudent mapRow(ResultSet rs,int row) throws SQLException{
			CVStudent s=new CVStudent();
			//s.setStudent_id(rs.getString(1));
			s.setBatchNumber(rs.getInt(1));
			s.setFullName(rs.getString(2));
			s.setEmail(rs.getString(3));
			s.setParentName(rs.getString(4));
			s.setMobile(rs.getString(5));
			s.setMobile_Parent(rs.getString(6));
			s.setFeePaid(rs.getInt(7));
			s.setfeeTotal(rs.getInt(8));
			s.setSscPercentage(rs.getInt(9));
			s.setInterPercentage(rs.getInt(10));
			s.setGraduationPercentage(rs.getInt(11));
			s.setGraduationCollege(rs.getString(12));
			s.setGraduationYOP(rs.getInt(13));
			s.setGraduationType(rs.getString(14));
			s.setGraduationBranch(rs.getString(15));
			s.setPassword_hash(rs.getString(16));
			s.setIsRegistered(rs.getString(17));
			s.setAggregate();
			s.setDob(""+rs.getDate("dob"));
			s.setGraduationCity(rs.getString("graduationCity"));
			
			s.setGender(rs.getString("gender"));
			s.setLocality(rs.getString("locality"));
			s.setCity(rs.getString("city"));
			s.setState(rs.getString("state"));
			s.setJoinDate(""+rs.getDate("joinDate"));
			s.setAttendancePerc(rs.getInt("attendancePerc"));
			return s;
			}	
		});
		return students;
	}

	public void setPassword(String password_hash,String email)throws Exception {
		// TODO Auto-generated method stub
		String sql="update cv_students set password_hash='"+password_hash+"' where email='"+email+"'";
		template.update(sql);
		
	}

	public void present(String email,String name,int batchNumber)throws Exception {
		// TODO Auto-generated method stub
		
		String sql="insert into present(email,presentDate,name,batchNumber) values('"+email+"',curdate(),'"+name+"',"+batchNumber+")";
		template.update(sql);
	}

	public List<Present> getAllPresents() {
		// TODO Auto-generated method stub
		String sql="select * from present order by presentDate desc";
		List<Present> pl=template.query(sql, new RowMapper<Present>(){
			public Present mapRow(ResultSet rs,int row)throws SQLException{
				Present p=new Present();
				p.setEmail(rs.getString("email"));
				p.setPresentDate(""+rs.getDate("presentDate"));
				p.setId(rs.getInt("id"));
				p.setName(rs.getString("name"));
				p.setBatchNumber(rs.getInt("batchNumber"));
				return p;
			}
			
		});
		
		return pl;
		
	}

	public void deletePresents(String email, String presentDate)throws Exception {
		// TODO Auto-generated method stub
		String sql="delete from present where email='"+email+"' and presentDate='"+presentDate+"'";
         template.update(sql);		
	}
	
	public List<CustomFile> getFilesBySubject(String subject,int batchNumber)
	{
		System.out.println("test bbb");
		String sql="select id,batches,email,fileBy,fileName,subject,uploadDate from files where subject='"+subject+"' and batches like '%,"+batchNumber+",%'";
		List<CustomFile> files=template.query(sql, new RowMapper<CustomFile>(){
			public CustomFile mapRow(ResultSet rs,int row)throws SQLException 
			{
				CustomFile f=new CustomFile();
				f.setBatches(rs.getString("batches"));
				f.setId(rs.getInt("id"));
				f.setEmail(rs.getString("email"));
				f.setFileBy(rs.getString("fileBy"));
				f.setFileName(rs.getString("fileName"));
				f.setSubject(rs.getString("subject"));
				f.setUploadDate(""+rs.getDate("uploadDate"));
			
				System.out.println(f.getEmail());
			
				
				return f;
			}
		});
		return files;
	}

	public ArrayList getFileById(int id) throws Exception {
		// TODO Auto-generated method stub
		String sql="select fileData from files where id="+id;
		String sqlFileType="select fileType from files where id="+id;
		java.sql.Blob b=template.queryForObject(sql, java.sql.Blob.class);
		String fileType=template.queryForObject(sqlFileType, String.class);
		ArrayList al=new ArrayList();
		al.add(fileType);
		al.add(b);
		return al;
	}
	
	public void setIsRegistered(String email)
	{
		String sql="update cv_students set isRegistered='Y' where email='"+email+"'";
		template.update(sql);
	}

	public void uploadResume(InputStream stream, String email)throws Exception {
		// TODO Auto-generated method stub
		String sql="update cv_students set resume=? where email=?";
		
		template.execute(sql,new PreparedStatementCallback<Boolean>(){  
		    @Override  
		    public Boolean doInPreparedStatement(PreparedStatement ps)  
		            throws SQLException, DataAccessException {  
		              
		       ps.setBlob(1, stream);
		     ps.setString(2, email);
		     
		              
		        return ps.execute();  
		              
		    }  
		    });  
	}

	public java.sql.Blob getResume(String email)throws Exception {
		// TODO Auto-generated method stub
		String sql="select resume from cv_students where email='"+email+"'";
		java.sql.Blob b=template.queryForObject(sql, java.sql.Blob.class);
		return b;
	}

	public void updateTotalFee(String email, int totalFee)throws Exception {
		// TODO Auto-generated method stub
		String sql="update cv_students set feeTotal="+totalFee+" where email='"+email+"'";
		template.update(sql);
	}
	
	
}
