// DOM
document.getElementById("btnThem").addEventListener("click", disableUpdate);
document.getElementById("btnThemNV").addEventListener("click", themNV);
document.getElementById("tableDanhSach").addEventListener("click", delegationTable);
document.getElementById("btnCapNhat").addEventListener("click", capNhatNhanVien);
document.getElementById("btnTimNV").addEventListener("click",timKiemNhanVien);
//====

var qlnv = new QuanLyNV();
qlnv.khoiTao();
hienThi(qlnv.dsnv);

function disableUpdate(){
    document.getElementById("btnCapNhat").disabled = true;
    resetForm();
    // reset span error
    var elements = document.getElementsByClassName("sp-thongbao");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

function hienThi(dsnv) {
    var tbody = document.getElementById("tableDanhSach");
    var html = "";
    for (var i = 0; i < dsnv.length; i++) {
        var nv = dsnv[i];
        html += `
        <tr>
          <td>${nv.taiKhoan}</td>
          <td>${nv.hoTen}</td>
          <td>${nv.email}</td>
          <td>${nv.ngayLam}</td>
          <td>${nv.chucVu()}</td>
          <td>${nv.tongLuong()}</td>
          <td>${nv.xepLoaiNV()}</td>
          <td>
          <button class="btn btn-primary my-1" data-action="select" data-account="${nv.taiKhoan
            }" data-toggle="modal" data-target="#myModal">Cập nhật</button>
          <button class="btn btn-danger my-1" data-action="delete" data-account="${nv.taiKhoan
            }">Xóa</button>
        </td>
        </tr>
      `;
    }

    tbody.innerHTML = html;
}

function resetForm() {
    updateForm({});
    document.getElementById("tknv").disabled = false;
}

function updateForm(nhanVien) {
    document.getElementById("tknv").value = nhanVien.taiKhoan || "";
    document.getElementById("name").value = nhanVien.hoTen || "";
    document.getElementById("email").value = nhanVien.email || "";
    document.getElementById("password").value = nhanVien.matKhau || "";
    document.getElementById("datepicker").value = nhanVien.ngayLam || "";
    document.getElementById("luongCB").value = nhanVien.luongCoBan || "";
    document.getElementById("chucvu").value = nhanVien.heSoChucVu || "";
    document.getElementById("gioLam").value = nhanVien.gioLam || "";
}

function xacThucDuLieuThem(nhanVien) {
    var validator = new Validator();
    var isValid =
        validator.isRequired("tbTKNV", nhanVien.taiKhoan) &&
        validator.account("tbTKNV", nhanVien.taiKhoan) &&
        validator.isNoExist("tbTKNV", nhanVien.taiKhoan,qlnv.dsnv);
    isValid &=
        validator.isRequired("tbTen", nhanVien.hoTen) &&
        validator.fullname("tbTen", nhanVien.hoTen);
    isValid &=
        validator.isRequired("tbEmail", nhanVien.email) &&
        validator.email("tbEmail", nhanVien.email);
    isValid &=
        validator.isRequired("tbMatKhau", nhanVien.matKhau) &&
        validator.password("tbMatKhau", nhanVien.matKhau);
    isValid &=
        validator.isRequired("tbNgay", nhanVien.ngayLam) &&
        validator.ngayLam("tbNgay", nhanVien.ngayLam);
    isValid &=
        validator.isRequired("tbLuongCB", nhanVien.luongCoBan) &&
        validator.luongCoBan("tbLuongCB", nhanVien.luongCoBan);
    isValid &= validator.chucVu("tbChucVu", nhanVien.heSoChucVu);
    isValid &=
        validator.isRequired("tbGiolam", nhanVien.gioLam) &&
        validator.gioLam("tbGiolam", nhanVien.gioLam);

    if (!isValid) {
        for (var key in validator.errors) {
            if (validator.errors[key]) {
                document.getElementById(key).innerHTML = validator.errors[key];
                document.getElementById(key).style.display = "inline-block";
            }
        }
        return false;
    }
    return true;
}

function xacThucDuLieuSua(nhanVien) {
    var validator = new Validator();
    var isValid =
        validator.isRequired("tbTKNV", nhanVien.taiKhoan) &&
        validator.account("tbTKNV", nhanVien.taiKhoan) &&
        validator.isExist("tbTKNV", nhanVien.taiKhoan,qlnv.dsnv);
    isValid &=
        validator.isRequired("tbTen", nhanVien.hoTen) &&
        validator.fullname("tbTen", nhanVien.hoTen);
    isValid &=
        validator.isRequired("tbEmail", nhanVien.email) &&
        validator.email("tbEmail", nhanVien.email);
    isValid &=
        validator.isRequired("tbMatKhau", nhanVien.matKhau) &&
        validator.password("tbMatKhau", nhanVien.matKhau);
    isValid &=
        validator.isRequired("tbNgay", nhanVien.ngayLam) &&
        validator.ngayLam("tbNgay", nhanVien.ngayLam);
    isValid &=
        validator.isRequired("tbLuongCB", nhanVien.luongCoBan) &&
        validator.luongCoBan("tbLuongCB", nhanVien.luongCoBan);
    isValid &= validator.chucVu("tbChucVu", nhanVien.heSoChucVu);
    isValid &=
        validator.isRequired("tbGiolam", nhanVien.gioLam) &&
        validator.gioLam("tbGiolam", nhanVien.gioLam);

    if (!isValid) {
        for (var key in validator.errors) {
            if (validator.errors[key]) {
                document.getElementById(key).innerHTML = validator.errors[key];
                document.getElementById(key).style.display = "inline-block";
            }
        }
        return false;
    }
    return true;
}

function themNV() {
    var taiKhoan = document.getElementById("tknv").value.toLowerCase();
    var hoTen = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var matKhau = document.getElementById("password").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luongCoBan = document.getElementById("luongCB").value;
    var heSoChucVu = +document.getElementById("chucvu").value;
    var gioLam = document.getElementById("gioLam").value;

    // reset span error
    var elements = document.getElementsByClassName("sp-thongbao");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    
    var nhanVien = new NhanVien(
        taiKhoan,
        hoTen,
        email,
        matKhau,
        ngayLam,
        luongCoBan,
        heSoChucVu,
        gioLam
    );

    var isValid = xacThucDuLieuThem(nhanVien);

    if (!isValid) {
        return;
    }

    qlnv.themNV(nhanVien);
    hienThi(qlnv.dsnv);
    resetForm();
}

function delegationTable(event) {

    var taiKhoan = event.target.getAttribute("data-account");
    var action = event.target.getAttribute("data-action");

    if (action === "select") {
        document.getElementById("btnCapNhat").disabled = false;
        chonNhanVien(taiKhoan);
    }

    if (action === "delete") {
        xoaNhanVien(taiKhoan);
    }
    
}

function chonNhanVien(taiKhoan) {
    // reset span error
    var elements = document.getElementsByClassName("sp-thongbao");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    var nhanVien = qlnv.chonNV(taiKhoan);
    document.getElementById("tknv").disabled = true;
    updateForm(nhanVien);
}

function xoaNhanVien(taiKhoan) {
    qlnv.xoaNV(taiKhoan);
    hienThi(qlnv.dsnv);
}

function capNhatNhanVien() {
    // reset span error
    var elements = document.getElementsByClassName("sp-thongbao");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    var taiKhoan = document.getElementById("tknv").value.toLowerCase();
    var hoTen = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var matKhau = document.getElementById("password").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luongCoBan = document.getElementById("luongCB").value;
    var heSoChucVu = +document.getElementById("chucvu").value;
    var gioLam = document.getElementById("gioLam").value;

    var nhanVien = new NhanVien(
        taiKhoan,
        hoTen,
        email,
        matKhau,
        ngayLam,
        luongCoBan,
        heSoChucVu,
        gioLam
    );

    var isValid = xacThucDuLieuSua(nhanVien);
  
    if (!isValid) {
        return;
    }

    qlnv.capNhatNV(nhanVien);
    hienThi(qlnv.dsnv);
    resetForm();
}

function timKiemNhanVien() {
    var search = document.getElementById("searchName").value;
    var newDsnv = qlnv.timKiemNV(search);
    hienThi(newDsnv);
}
