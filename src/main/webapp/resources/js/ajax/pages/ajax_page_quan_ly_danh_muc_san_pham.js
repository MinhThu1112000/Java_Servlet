let listCategory
$(async function(){
    //goi api tra ve 2 th then tra ve thanh cong catch tra ve loi
   await categoryFindAll().then(rs => {

        console.log(rs);
        if(rs.message == "success"){
            listCategory = rs.data;
        }else{
            console.log(rs.data);
        }
    }).catch(err =>{
        console.log(err)
    })
})