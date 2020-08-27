//định nghía các phần tử cần thao tác
let btnThem,selectSearchDanhMuc,selectSearchSapXep,textSeachTen,textSearchGia,numberSearchGia,numberSearchDaBan,dateSearchNgayTao,selectSearchConHang,btnTimKiem,tableDuLieu,textTen,selectDanhMuc,numberGia,numberDaBan,numberBaoHanh,numberKhuyenMai,fileAnh,dateNgayTao,textareaGioiThieu,textareaThongSo,checkboxHetHang,btnLuu,btnXacNhanXoa;
var indexProduct,elementProduct;
//hàm này sẽ chạu cacs dòng lệnh ở trong nó khi caccs phần tử html đã được tải hết
let listProduct = [
    {
        id: 1,
        name: "Iphone 10",
        price: 10000,
        createDate: "2020-08-20",
        image: "https://cdn.cellphones.com.vn/.../iphone11-purple-select...",
        introduction: "Iphone tai thỏ",
        specification: "Chip A11",
        soldOut: true,
        guarantee: 12,
        categoryId: 1,
        bouth: 1000,
        promotion: 10
    },
    {
        id: 2,
        name: "Iphone 11",
        price: 10000,
        createDate: "2020-08-20",
        image: "https://cdn.tgdd.vn/.../iphone-11-pro-max-green-600x600.jpg",
        introduction: "Iphone tai thỏ",
        specification: "Chip A11",
        soldOut: false,
        guarantee: 12,
        categoryId: 2,
        bouth: 1000,
        promotion: 10
    },
];
$(function () {
    btnThem = $("#btn-them");
    selectSearchDanhMuc = $("#select-search-danh-muc");
    selectSearchSapXep = $("#select-search-sap-xep");
    textSeachTen = $("#input-search-ten");

    numberSearchGia = $("#input-search-gia");
    numberSearchDaBan = $("#input-search-da-ban");
    dateSearchNgayTao = $("#input-search-ngay-tao");
    selectSearchConHang = $("#select-search-het-hang");
    btnTimKiem = $("#btn-tim-kiem");
    tableDuLieu = $("tbody");
    textTen = $("#input-ten");
    selectDanhMuc = $("#select-loai-san-pham");
    numberGia = $("#input-gia");
    numberDaBan = $("#input-da-ban");
    numberBaoHanh = $("#input-bao-hanh");
    numberKhuyenMai = $("#input-khuyen-mai");
    fileAnh = $("#file-anh");
    dateNgayTao = $("#input-ngay-tao");
    textareaGioiThieu = $("#textarea-gioi-thieu");
    textareaThongSo = $("#textarea-thong-so");
    checkboxHetHang = $("#checkbox-het-hang");
    btnLuu = $("#btn-luu-lai");
    btnXacNhanXoa = $("#btn-xac-nhan-xoa");
    viewDanhSachSanPham();
    searchSanPham();
    xacNhanXoaSanPham();
    luuSanPham();
    themSanPham();
})
function viewDanhSachSanPham() {
    let view="<tr><td colspan='8'><strong>Không có dữ liệu !</strong></td></tr>";
    if (listProduct && listProduct.length > 0){
        view = listProduct.map((data,index) =>{
            //cú pháp template string trong đó cho phép thực hiện các phép toán
            return ` <tr data-index = "${index}">
                            <th scope="row">${index + 1}</th>
                            <td><img src="${data.image}" alt="" width="80px"></td>
                            <td>${viewField(data.name)}</td>
                            <td>${viewField(data.price)}</td>
                            <td>${viewField(data.bouth)}</td>
                            <td>${viewField(data.createDate)}</td>
                            <td class="text-center">${data.soldOut ?`<span class="badge badge-danger">Hết Hàng</span>` : `<span class="badge badge-success">Còn hàng</span>`}</td>
                            <td>
                                <button type="button" class="btn btn-warning sua-san-pham"><i class="fas fa-pen"></i>
                                    Sửa</button>
                                <button type="button" class="btn btn-danger xoa-san-pham"><i class="fas fa-trash-alt"></i>
                                    Xóa</button>
                            </td>
                        </tr>`
        }).join("");
        //console.log(tmp);
    }
    tableDuLieu.html(view);
    xoaSanPham();
    suaSanPham();
}

function searchSanPham(){
    btnTimKiem.click(function () {
        let valSearchTen = textSeachTen.val();
        let valSeachGia = numberSearchGia.val();
        valSeachGia = valSeachGia > 0 ? valSeachGia : -1;
        let valSearchDaBan = numberDaBan.val();
        valSearchDaBan = valSearchDaBan > 0 ? valSearchDaBan : -1;
        let valSeachNgayTao = dateNgayTao.val();
        valSeachNgayTao = valSeachNgayTao > 0 ? valSeachNgayTao : null;
        let valSeachConHang = selectSearchConHang.val();
        valSeachConHang = valSeachConHang != 0 ? valSeachConHang : null;

        console.log(valSearchTen);
        console.log(valSeachGia);
        console.log(valSearchDaBan);
        console.log(valSeachNgayTao);
        console.log(valSeachConHang);
        listProduct = [];
        viewDanhSachSanPham();
    })
}

function xoaSanPham() {
    // xóa có 2 bước
    // click xóa sản phẩm thì phải thực hiện chức năng là ra id sản phẩm đấy
    // sau khi đã lấy ra được id thì mới mở được modal xác nhận xóa lên
    // khi người dùng chấp nhận xóa thì mới gọi api và nếu xóa thành công thì cập nhật lại list và view lại
    $(".xoa-san-pham").click(function () {
        // Khi click vào một phần tử nào đấy thì từ khóa this hiện tại chính là phần tử vừa click
        // .parents cho phép tìm kiếm các phần tử cha của phần tử hiện tại
        // .attr("name") là key của một giá trị cần lấy
        indexProduct =  $(this).parents("tr").attr("data-index");
        $("#exampleModal1").modal("show");
    })
}

function xacNhanXoaSanPham() {
    btnXacNhanXoa.click(function () {
        let idProduct = listProduct[parseInt(indexProduct-0)].id;

        listProduct = listProduct.filter((data, index) => {
            return index != indexProduct;

        })
        viewDanhSachSanPham();
        $("#exampleModal1").modal("hide");
    })
}

function suaSanPham() {
    $(".sua-san-pham").click(function () {
        elementProduct = listProduct[$(this).parents("tr").attr("data-index")-0];
        textTen.val(elementProduct.name);
        selectDanhMuc.val(elementProduct.categoryId);
        numberGia.val(elementProduct.price);
        numberDaBan.val(elementProduct.bouth);
        numberBaoHanh.val(elementProduct.guarantee);
        numberKhuyenMai.val(elementProduct.promotion);
        dateNgayTao.val(elementProduct.createDate);
        textareaGioiThieu.val(elementProduct.introduction);
        textareaThongSo.val(elementProduct.specification);
        if(elementProduct.soldOut) checkboxHetHang.prop("checked");
        $("#exampleModal").modal("show");
    })

}

function checkData(selector, textError) {
    let val = $(selector).val();
    let check = false;
    if(val.length > 0){
        check = true;
        hiddenError(selector);
    }else{
        viewError(textError);
    }
    // trả về đối tượng
    return {val,check}
}
function luuSanPham() {
    btnLuu.click(function () {
        //mỗi trường người dùng nhập vào
        let {val:valTen, check:checkTen} = checkData(textTen, "Định dạng tên chưa đúng");
        let valDanhMuc = selectDanhMuc.val();
        let {val:valGia, check:checkGia}= checkData(numberGia, "Giá bán phải là số");
        let {val:valDaBan, check:checkDaBan}= checkData(numberDaBan, "Nhập số lượng đã bán");
        let {val:valBaoHanh, check:checkBaoHanh}= checkData(numberBaoHanh, "Nhập thời gian bảo hành");
        let {val:valKhuyenMai, check:checkKhuyenMai}= checkData(numberKhuyenMai, "Nhập phần trăm khuyến mãi");
        let valGioiThieu = textareaGioiThieu.val();
        let valThongSo = textareaThongSo.val();
        let valHetHang = checkboxHetHang.is(":checked");
        // nếu tất cả chính xác định dạng
        if(checkTen && checkGia && checkDaBan && checkBaoHanh && checkKhuyenMai){
            let checkAction =false; // true là sửa false là thêm
            if(elementProduct){
                checkAction = true;
            }else{
                elementProduct = {};
            }
            elementProduct.name = valTen;
            elementProduct.categoryId = valDanhMuc;
            elementProduct.price = valGia;
            elementProduct.bouth = valDaBan;
            elementProduct.guarantee = valBaoHanh;
            elementProduct.promotion = valKhuyenMai;
            elementProduct.introduction = valGioiThieu;
            elementProduct.specification = valThongSo;
            elementProduct.soldOut = valHetHang;
            if(checkAction){
                //sưa san pham
                // Sau khi thay đổi các trường xong gọi đến api nếu api trả về true thì gán đối tượng apitrar về vào listProduct ứng
                // với index của nó lúc đầu
                listProduct[indexProduct] = elementProduct;
                // sau đó gọi lại view danh sách sản phẩm
                console.log("save");
                // sau khi save thành công thì phải ẩn modal
                $("#exampleModal").modal("hide");
            }else{
                //them san pham
                // gọi api thêm sản phẩm nếu thành công ai sẽ trẩ về một dối tượng vừa được thêm vào đã có id
                // nếu thành công push đối tượng mới vào mảng listProduct và thực hiện view lại danh sách
                listProduct.push(elementProduct);
            }
            viewDanhSachSanPham();
            // sau khi save thành công thì phải ẩn modal
            $("#exampleModal").modal("hide");
        }
    })
}
//bt kiểm tra regred l, khi lưu thành công và hiện ra danh sách

function themSanPham(){
    btnThem.click(function () {
        console.log("fdfdfd");
        elementProduct = null;
        $("#exampleModal").modal("show");
    })
}