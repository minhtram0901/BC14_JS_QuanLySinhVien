function Validator() {
  this.errors = {};
}

Validator.prototype.isRequired = function (name, value) {
  if (!value) {
    this.errors[name] = "Vui lòng nhập vào trường này";
    return false;
  }
  return true;
};

Validator.prototype.account  = function (name, value) {
  // if (!/^[a-zA-Z0-9]{4,6}$/.test(value)) {
  if (!/^(?=.{4,6}$)(?![0-9])[a-zA-Z0-9]+$/.test(value)) {
    this.errors[name] = "Tài khoản tối đa 4 - 6 ký số, không bắt đầu bằng số";
    return false;
    
  }
  return true;
};

Validator.prototype.fullname = function (name, value) {
  if (!/^[a-zA-Z ]{2,}$/.test(removeAscent(value))) {
    this.errors[name] = "Họ tên không hợp lệ";
    return false;
  }
  return true;
};

Validator.prototype.email = function (name, value) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    this.errors[name] = "Email không hợp lệ";
    return false;
  }

  return true;
};

Validator.prototype.password = function (name, value) {
  // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{6,10}$/.test(value)) {
  if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{6,10}$/.test(value)) {
    this.errors[name] = "Mật khẩu không hợp lệ";
      return false;
  }

  return true;
};

// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
Validator.prototype.ngayLam = function (name, dateString){
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)){
      this.errors[name] = "Ngày làm không hợp lệ";
      return false;
    }
    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1900 || year > 3000 || month < 1 || month > 12){
      this.errors[name] = "Ngày làm không hợp lệ";
      return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    if(!(day > 0 && day <= monthLength[month - 1])){
      this.errors[name] = "Ngày làm không hợp lệ";
      return false;
    }

    return true;
};

Validator.prototype.luongCoBan = function (name, value){
  if(value < 1_000_000 || value > 20_000_000 || isNaN(value)){
    this.errors[name] = "Lương cơ bản từ 1 triệu đến 20 triệu";
    return false;
  }

  return true;
};

Validator.prototype.chucVu = function (name, value){
  if(value == 0){
    this.errors[name] = "Vui lòng chọn chức vụ";
    return false;
  }

  return true;
};

Validator.prototype.gioLam = function (name, value){
  if(value < 80 || value > 200  || isNaN(value)){
    this.errors[name] = "Giờ làm từ 80 - 200 giờ";
    return false;
  }

  return true;
};

Validator.prototype.isExist = function (name, taiKhoan, dsnv){
  if(dsnv.find(function (nv) {
    return nv.taiKhoan === taiKhoan;
  })){
    return true;
  }
  this.errors[name] = "Tài khoản không tồn tại";
  return false;
}

Validator.prototype.isNoExist = function (name, taiKhoan, dsnv){
  if(dsnv.find(function (nv) {
    return nv.taiKhoan === taiKhoan;
  })){
    this.errors[name] = "Tài khoản đã tồn tại";
    return false;
  }
  
  return true;
}