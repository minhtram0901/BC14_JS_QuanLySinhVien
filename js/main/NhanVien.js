function NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    heSoChucVu, //nhan vien: 1; truong phong: 2; giam doc: 3
    gioLam
) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.heSoChucVu = heSoChucVu;
    this.gioLam = gioLam;
}

// +nếu chức vụ là giám đốc: tổng lương = lương cơ bản * 3
// +nếu chức vụ là trưởng phòng: tổng lương = lương cơ bản * 2
// +nếu chức vụ là nhân viên: tổng lương = lương cơ bản * 1
NhanVien.prototype.tongLuong = function () {
    return this.heSoChucVu * this.luongCoBan;
};

// +nếu nhân viên có giờ làm trên 192h (>=192): nhân viên xuất sắc : 1
// +nếu nhân viên có giờ làm trên 176h (>=176): nhân viên giỏi: 2
// +nếu nhân viên có giờ làm trên 160h (>=160): nhân viên khá: 3
// +nếu nhân viên có giờ làm dưới 160h: nhân viên trung bình: 4
NhanVien.prototype.xepLoaiNV = function () {
    if(this.gioLam >= 192){
        return "Xuất sắc"; 
    }
    if(this.gioLam >= 176){
        return "Giỏi";
    }
    if(this.gioLam >=160){
        return "Khá"; 
    }
    return "Trung bình"; 
};

//nhan vien: 1; truong phong: 2; giam doc: 3
NhanVien.prototype.chucVu = function () {
    if(this.heSoChucVu === 1){
        return "Nhân viên"; 
    }
    if(this.heSoChucVu === 2){
        return "Trưởng phòng"; 
    }
    return "Giám đốc"; 
};