// rules validate(những yêu cầu để công nhận dữ liệu được validate)
// email            : isRequired, isEmail
// name             : isRequired, isName(có thể tiếng việt, tiếng anh, max 50)
// gender           : isRequired
// country          : isRequired
// passwork         : isRequired, min 8, max 30
// confirmedPasswork: isRequired, min 8, max 30, isSame(password)
// agree            : isRequired

const REG_EMAIL =
  /^[a-zA-Z\d\.\-\_]+(\+\d+)?@[a-zA-Z\d\.\-\_]{1,65}\.[a-zA-Z]{1,5}$/;
const REG_NAME =
  /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+((\s[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)+)?$/;

// viết những hàm nhận vào value và kiểm tra theo một tiêu chí gì đó
// nếu như value đó hợp lệ thì return "", nếu value đó không hợp lệ, thì return "thong tin loi"

const isRequired = (value) => {
  if (value == "") return "That field is required";
  //!cầm câu chửi này hiển thị ra màn hình
  else return "";

  //(value !== "" ? "" : "that field is required");
};

const isEmail = (value) => (REG_EMAIL.test(value) ? "" : "Email is not valid");

const isName = (value) => (REG_NAME.test(value) ? "" : "Name is not valid");

// cần tối ưu tham số của các hàm cho giống nhau =))) reuse được nhiều hàm

// const min = (num, value) => (value.length >= num ? "" : `min iss ${num}`);

// viết hàm như cách trên sẽ không đồng bộ tham số với các hàm còn lại
// nếu mình muốn check một cái gì đó qua nhiều hàm thì sẽ không cùng tham số (xấu, gà)

// dùng currying để truyền chỉ 1 tham số, còn tham số sau gọi thì sẽ truyền trong hàm

const min = (num) => (value) => value.length >= num ? "" : `Min is ${num}`;
const max = (num) => (value) => value.length <= num ? "" : `Max is ${num}`;

// cofirmPassword sẽ đi so sánh với passWord

// paraValue: giá trị ô password
// value: giá trị ô confirmPassword
// const isSame = (paraValue, value) =>
//   paraValue == value ? "" : "pwd không khớp confirmPwd";

// làm như vậy ổn hơn, flexible, nhưng para không khớp với các thằng còn lại
// const isSame = (paraValue, value, fieldName1, fieldName2) =>
//   paraValue == value ? "" : `${fieldName1} không khớp ${fieldName2}`;

const isSame = (paraValue, fieldName1, fieldName2) => (value) =>
  paraValue == value ? "" : `${fieldName1} không khớp ${fieldName2}`;

// -----------------------------------------------------------------------

// ta sẽ có 1 object cấu trúc như sau
// {
//  value: giá trị của controlNode
// funcs: mảng các hàm mà value cần check
// parentNode: là cha của controlNode (chèn div chứa thông tin lỗi)
// controlNode: là element input, để thêm class is-invalid (hiện màu đỏ) -> nhưng có lúc sẽ có nhiều input
// ---controlNodes: mảng các element input, để thêm class is-invalid
// }

// {
//     value: document.querySelector("#name").value
//     funcs: [isRequired, isName, max(40)]
//     parentNode: document.querySelector("#name").parentElement
//     controlNodes: [document.querySelector("#name")] vì controlNode sẽ có nhiều input(có hoặc không) nên cần phải sử dụng mảng
// }

// hàm tạo ra thông báo lỗi, hiển thị lên màn hình
const createMsg = (parentNode, controlNodes, msg) => {
  // tạo div chứa nội dung lỗi
  const invalidDiv = document.createElement("div");
  invalidDiv.className = "invalid-feedback";
  invalidDiv.innerHTML = msg;
  parentNode.appendChild(invalidDiv);
  controlNodes.forEach((inputNode) => {
    inputNode.classList.add("is-invalid");
  });
};

// let inputName = document.querySelector("#name");
// createMsg(inputName.parentElement, [inputName], "ahihi");

// viết 1 hàm nhận vào para object có dạng {value, funcs, parentNode, controlNodes}
// ta sẽ cho value chạy qua các hàm trong mảng func để kiểm tra
// nếu trong quá trình kiểm tra trả ra chuỗi "báo lỗi" thì dùng createMsg hiển thị lỗi

const isValid = (paraObject) => {
  let { value, funcs, parentNode, controlNodes } = paraObject; //destructuring

  // duyệt mảng funcs: funcCheck là đại diện cho isRequired, isName, max(40)
  for (const funcCheck of funcs) {
    let msg = funcCheck(value);
    if (msg !== "") {
      createMsg(parentNode, controlNodes, msg);
      return msg;
    }
  }
  return "";
};

// hàm xóa hết các thông báo lỗi trên UI
const clearMsg = () => {
  document.querySelectorAll(".is-invalid").forEach((inputItem) => {
    inputItem.classList.remove("is-invalid");
  });

  //   dom ảo, nhưng mà nó chạy theo í của mình, khi có rồi thì mình mới chạy được
  document.querySelectorAll(".invalid-feedback").forEach((divMsg) => {
    divMsg.remove();
  });
};

// sự kiện diễn ra
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); //chặn reset trang
  clearMsg(); //xóa các thông báo lỗi
  let emailNode = document.querySelector("#email");
  let nameNode = document.querySelector("#name");
  let genderNode = document.querySelector("#gender");

  //   country khó
  let countryNode = document.querySelector("input[name = 'country']:checked");
  // còn nếu không check thì null xử lí sao =>>>

  let passwordNode = document.querySelector("#password");

  let confirmedpasswordNode = document.querySelector("#confirmedPassword");

  let agreeNode = document.querySelector("input#agree:checked");

  //   chú ý, những thằng tick tick thì chúng ta cần dom tới khi checked

  const errorMsg = [
    //email
    isValid({
      value: emailNode.value,
      funcs: [isRequired, isEmail],
      parentNode: emailNode.parentElement,
      controlNodes: [emailNode],
    }),
    //name
    isValid({
      value: nameNode.value,
      funcs: [isRequired, isName, max(50)],
      parentNode: nameNode.parentElement,
      controlNodes: [nameNode],
    }),
    //gender
    isValid({
      value: genderNode.value,
      funcs: [isRequired],
      parentNode: genderNode.parentElement,
      controlNodes: [genderNode],
    }),
    // country
    isValid({
      value: countryNode ? countryNode.value : "",
      funcs: [isRequired],
      parentNode: document.querySelector(".form-check-country").parentElement,
      controlNodes: document.querySelectorAll("input[name = 'country']"),
    }),
    //password
    isValid({
      value: passwordNode.value,
      funcs: [isRequired, min(8), max(30)],
      parentNode: passwordNode.parentElement,
      controlNodes: [passwordNode],
    }),
    // confirmedPassword
    isValid({
      value: confirmedpasswordNode.value,
      funcs: [
        isRequired,
        min(8),
        max(30),
        isSame(passwordNode.value, "password", "confirmed-password"),
      ],
      parentNode: confirmedpasswordNode.parentElement,
      controlNodes: [confirmedpasswordNode],
    }),
    // agree
    isValid({
      value: agreeNode ? agreeNode.value : "",
      funcs: [isRequired],
      parentNode: document.querySelector("input#agree").parentElement,
      controlNodes: [document.querySelector("input#agree")],
    }),
  ];

  const isValidForm = errorMsg.every((item) => !item);
  // nếu có một thằng false hết thì đảo ngược lại toàn

  if (isValidForm) {
    clearMsg();
    alert("Form is valid");
  }
});
