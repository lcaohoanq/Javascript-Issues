//runtimeError: lỗi khi vận hành | do người dùng
//syntaxError: lỗi sai cấu trúc  | do người code
//logicError: lỗi sai tư duy     | do người code

// try catch: dùng để xử lí lỗi phát sinh trong runtimeError
// nhớ rằng try catch không vận hành trong syntaxError

// try catch chỉ hoạt động trong môi trường đồng bộ

// try {
//   diepPiedTeam;
// } catch (err) {
//   console.log(err);
// }

// try {
//   setTimeout(() => {
//     diepPiedTeam;
//   }, 1000);
// } catch (err) {
//   console.log(err);
// }
// không nên viết như trên vì sẽ lỗi

setTimeout(() => {
  try {
    diepPiedTeam;
  } catch (err) {
    console.log(err);
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
  }
}, 1000);

// khi phát sinh ra lỗi thì js sẽ tạo lỗi đó thành 1 object
// chứa thông tin về lỗi
// object đó:
//  name (kiểu lỗi),
//  message (thông tin của lỗi đó),
//  stack (full thông tin kèm dòng phát sinh ra lỗi)

// try {
//   let a = 1;

//   throw "lỗi chà bá nè";
//   throw new Error("lỗi chà bá nè");
//   throw new SyntaxError("lỗi chà bá nè");
//   throw new ReferenceError("Lỗi chà bá nè");
//   throw new RangeError("Lỗi chà bá nè");

//   let b = a + 2;
// } catch (err) {
//   console.log(err);
// }

//// ngoài throw new Error() chúng ta còn có 7 hàm (contructor function) khác phục vụ cho việc
// tường minh lỗi của mình hơn
// EvalError():     tạo 1 instance đại diện cho một lỗi xảy ra liên quan đến hàm toàn cục Eval()
// InternalError(): tạo 1 instance đại diện cho một lỗi xảy ra khi 1 lỗi bên trong jsEngine
//                  được ném. vd: quá nhiều đệ quy
// RangeError()   : tạo 1 instance đại diện cho một lỗi xảy ra khi một biến số hoặc tham chiếu
//                  nằm ngoài phạm vi hợp lệ của nó
// ReferenceError : tạo 1 instance đại diện cho một lỗi xảy ra khi hủy tham chiếu của 1 tham chiếu
//                  không hợp lệ
// SyntaxError    : tạo 1 instance đại diện cho một lỗi xảy ra trong khi phân tích cú pháp
//                                                                          mã trong Eval()
// TypeError      : tạo 1 instance đại diện cho một lỗi xảy ra khi một biến hoặc 1 tham số
//                  có kiểu không hợp lệ
// URIError       : tạo 1 instance đại diện cho một lỗi xảy ra khi encodeURI() hoặc decodeURI()
//                  truyền các tham số không hợp lệ
////chế ra 1 kiễu lỗi mới dựa trên Error

// finally: trời sập vẫn chạy
// đóng các connect liên quan đến DB
loading = true;
try {
  loading = true;
  get(); //phát sinh lỗi
  loading = false;
} catch (err) {
} finally {
  loading = false;
}

// false

// chế ra một kiểu lỗi mới dựa trên Error
class PiedError extends Error {
  constructor(message, student) {
    super(message);
    this.student = student;
    this.name = "PiedTeam tạo lỗi";
  }
}

try {
  //   throw new Error("ahihi");
  throw new PiedError("ahihi", { name: "Điệp", age: "24" });
} catch (err) {
  console.log(err);
  console.log(err.name);
  console.log(err.message);
  console.log(err.student);
  console.log(err.stack);
}
