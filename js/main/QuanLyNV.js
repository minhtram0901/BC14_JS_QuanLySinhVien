function QuanLyNV() {
    this.dsnv = JSON.parse(localStorage.getItem("dsnv")) || [];
}

QuanLyNV.prototype.khoiTao = function () {
    if (this.dsnv.length === 0) {
      return;
    }
  
    this.dsnv = this.dsnv.map(function (nv) {
      return new NhanVien(
        nv.taiKhoan,
        nv.hoTen,
        nv.email,
        nv.matKhau,
        nv.ngayLam,
        nv.luongCoBan,
        nv.heSoChucVu,
        nv.gioLam
      );
    });
};

QuanLyNV.prototype.saveLocalStorage = function () {
    localStorage.setItem("dsnv", JSON.stringify(this.dsnv));
};

QuanLyNV.prototype.themNV = function (nhanVien) {
    this.dsnv.push(nhanVien);
    this.saveLocalStorage();
};

QuanLyNV.prototype.capNhatNV = function(nhanVien) {
    this.dsnv = this.dsnv.map(function (nv) {
      if (nv.taiKhoan === nhanVien.taiKhoan) {
        return nhanVien;
      }
      return nv;
    });
  
    this.saveLocalStorage();
}

QuanLyNV.prototype.xoaNV = function (taiKhoan) {
    this.dsnv = this.dsnv.filter(function (nv) {
      return nv.taiKhoan !== taiKhoan;
    });
  
    this.saveLocalStorage()
}
  
QuanLyNV.prototype.timKiemNV = function(loaiNV) {
    return this.dsnv.filter(function (nv) {
      var searchValue = removeAscent(loaiNV.trim().toLowerCase());
      var typeValue = removeAscent(nv.xepLoaiNV().trim().toLowerCase());
  
      return typeValue.indexOf(searchValue) !== -1;
    });
}

QuanLyNV.prototype.chonNV = function(taiKhoan) {
    return this.dsnv.find(function (nv) {
      return nv.taiKhoan === taiKhoan;
    });
}
  
  