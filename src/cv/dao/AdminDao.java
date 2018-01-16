package cv.dao;

import java.io.InputStream;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.security.crypto.bcrypt.*;
import cv.models.Admin;


public class AdminDao {

	private JdbcTemplate template;

	public JdbcTemplate getTemplate() {
		return template;
	}

	public void setTemplate(JdbcTemplate template) {
		this.template = template;
	}
	
	public boolean validateAdmin(String email,String password, HttpServletRequest request)
	{
		Admin admin;
		System.out.println(email+"@");
		String sql="select * from admin where email=?";  
		try{
	    admin=template.queryForObject(sql, new Object[]{email},new BeanPropertyRowMapper<Admin>(Admin.class));  
	    
		}
		catch(EmptyResultDataAccessException e)
		{
		  admin=null;
		  e.printStackTrace();
		  System.out.println("test");
		}
		if (admin!=null)
	    {
	    	
	    	
	    	boolean t= BCrypt.checkpw(password, admin.getPassword_hash());
	        if(t)
	        {
	        	request.getSession().setAttribute("admin", admin);
	        	request.getSession().setMaxInactiveInterval(-1);
	        	System.out.println(request.getSession().getMaxInactiveInterval());
	        }
	        return t;
	        	
	    }
	    else
	    	return false;
	    		
	}

	public void setPassword(String password,String email)throws Exception {
		// TODO Auto-generated method stub
		String sql="update admin set password_hash='"+password+"' where email='"+email+"'";
		template.update(sql);
		
		
	}

	public void saveNotification(String notif, String batchNos,String email,String name)throws Exception {
		// TODO Auto-generated method stub
		String sql="insert into notifications(notification,batchNos,postDate,postBy,name) values('"+notif+"',"
				+ "'"+batchNos+"',curdate(),'"+email+"','"+name+"')";
		template.update(sql);
	}

	public void uploadFile(InputStream fileData, String fileName, String subject, String name, String batches,String email, String fileType)
	throws Exception{
		// TODO Auto-generated method stub
		String sql="insert into files(fileData,fileName,subject,fileBy,batches,email,uploadDate,fileType) values(?,?,?,?,?,?,curdate(),?)";
		
		template.execute(sql,new PreparedStatementCallback<Boolean>(){  
		    @Override  
		    public Boolean doInPreparedStatement(PreparedStatement ps)  
		            throws SQLException, DataAccessException {  
		              
		       ps.setBlob(1, fileData);
		       ps.setString(2, fileName);
		       ps.setString(3, subject);
		       ps.setString(4,name);
		       ps.setString(5, batches);
		       ps.setString(6, email);
		       ps.setString(7, fileType);
		              
		        return ps.execute();  
		              
		    }  
		    });  
	}
	
	
	public Admin getAdminByEmail(String email)throws Exception
	{
		Admin admin=null;
		System.out.println(email);
		String sql="select * from admin where email=?";  
	
	   admin=template.queryForObject(sql, new Object[]{email},new BeanPropertyRowMapper<Admin>(Admin.class));  
		
	  return admin;
	}
}
