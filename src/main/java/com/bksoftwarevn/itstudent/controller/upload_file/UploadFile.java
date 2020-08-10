package com.bksoftwarevn.itstudent.controller.upload_file;

import com.bksoftwarevn.itstudent.model.JsonResult;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@WebServlet(name = "UploadFile" ,value = "/upload-file/*")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2,
        maxRequestSize = 1024 * 1024 * 50,
        maxFileSize = 1024 * 1024 * 50 )
//fileSizeThreshold : neu kich thuoc cua file upload len lon hon dinh nghia
// thi he thong tu ghi file vao truc tiep o cung khog thong qua bo dem
// maxRequestSize : kich thuo toi da cu 1 request


public class UploadFile extends HttpServlet {
    private JsonResult jsonResult = new JsonResult();
    private  static  final String SAVE_DICRECTORY = "file-upload";
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String rs = "";
       //chua cac file ma minh upload len;
        try{
            Collection<Part> partCollection = request.getParts();
            List<String> list = new ArrayList<>();
            for (Part part : partCollection){
                String fileName = getFileName(part);
                if(fileName.length() > 0 ){
                    String filePath = getFolderUpload().getAbsolutePath() + File.separator + fileName;
                    System.out.println("Write" + filePath);
                    part.write(filePath);
                    list.add(SAVE_DICRECTORY + "/" + fileName);
                    //lay ra duong dan thu muc upload file

                }
            }
            rs = jsonResult.jsonSuccess(list);
        }catch (Exception e){
            e.printStackTrace();
            rs = jsonResult.jsonFail("upload fail");
        }

        response.getWriter().write(rs);
    }
    private File getFolderUpload(){
        String appPath = "/Users/phamthiminhthu/Documents/JavaWeb/apache-tomcat-8.5.57/webapps/" + SAVE_DICRECTORY;
        File folderUpload = new File(appPath);
        if(!folderUpload.exists()){
            folderUpload.mkdir();
        }
        return  folderUpload;
    }
    private String getFileName(Part part){
        String fileNameRS = "";
        //thuoc tinh header cua doi tuong part tuong ung voi key content-disposition
        //thi se chua mot mot chuoi co dinh dang tuong tu
        //form-data ; name = "file" ; filename = "C:\file.zip"
        //tu chuoi nay minh se lay a ten file va phan mo rong cua file
        String contentDisp = part.getHeader("content-disposition");
        String[] items = contentDisp.split(";");
        for (String s : items){
            if(s.trim().startsWith("filename")){
                fileNameRS = s.substring(s.indexOf("=") + 2, s.length() - 1);
                //fileNameRS = s.replace("\\","/");
                int i = fileNameRS.lastIndexOf("/");
                fileNameRS = fileNameRS.substring(i + 1);
            }
        }
        return fileNameRS;
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
