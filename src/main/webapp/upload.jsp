<%--
  Created by IntelliJ IDEA.
  User: phamthiminhthu
  Date: 8/6/2
  Time: 17:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Upload File - ITSt</title>
</head>
<body>
    <h1>Demo Upload file with Servlet</h1>
    <form method="post" action="upload-file" enctype="multipart/form-data">
        <label>Select file to upload : </label>
        <input type="file" name="file" multiple="multiple"/><br/>
        <input type="submit" value="Upload"/>
    </form>

</body>
</html>
