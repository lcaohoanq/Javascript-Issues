//constructor function và kế thừa = prototype
//cần quản lí sinh viên
function Student(name, birthday) {
  this.name = name;
  this.birthday = birthday;
  this.id = new Date().toISOString();
  //   chuẩn toISOString lưu được trên LS và tất cả các db
}

// ---------------------------event------------------------------
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  //   lấy data từ input
  let name = document.querySelector("#name").value;
  let birthday = document.querySelector("#birthday").value;

  // tạo một student
  let newStudent = new Student(name, birthday);

  // lưu newStudent vào danh sách các sinh viên (students) trong LS
  //**tạo ra một class chuyên liên quan đến kho */
  let store = new Store();
  store.add(newStudent);

  // ***một class chuyên liên quan đến UI
  let ui = new RenderUI();
  // hiển thị newStudent lên giao diện
  ui.add(newStudent);
  //   hiển thị thông báo thêm thành công
  ui.alert(`Bạn vừa thêm thành công ${name}`);
});

// Làm event khi vào trang thì render tất cả student lên table từ LS
// sự kiện load trang diễn ra trong html (document)
document.addEventListener("DOMContentLoaded", (event) => {
  //renderAll: render tất cả các sinh viên từ student lên UI

  const ui = new RenderUI();
  ui.renderAll();
});

// -----------------------Store -----------------------------
function Store() {}

//getStudents: lấy danh sách sinh viên từ LS
Store.prototype.getStudents = function () {
  return JSON.parse(localStorage.getItem("students")) || [];
};
//add: nhận newStudent và nhét newStudent vào danh sách sinh viên
Store.prototype.add = function (newStudent) {
  //lấy danh sách sinh viên từ LS
  // let student = new Store().getStudents();
  let student = this.getStudents();
  //vì add là một method trong class Store nên chỉ cần this
  //nhét newStudent vào students
  student.push(newStudent);
  //lưu students vào LS
  localStorage.setItem("students", JSON.stringify(student)); //***để í chỗ này
};
//**thêm một getStudent: nhận vào id, dùng id tìm sinh viên tương ứng trong students */
//tìm một sinh viên dựa trên mã
Store.prototype.getStudent = function (id) {
  //Tìm ở đâu ???
  //1. Lấy danh sách students
  //xài this được vì đang đứng ở thằng Store(thằng nó quản lí)
  const students = this.getStudents();
  //2. vào students tìm student dựa trên id
  //find chạy callback
  return students.find((student) => student.id == id);
};

//*remove: nhận id, tìm và xóa trong students
Store.prototype.remove = function (id) {
  //lấy ds ra
  const students = this.getStudents();
  //tìm vị trí
  const indexRemove = students.findIndex((student) => student.id == id);
  //xoas
  students.splice(indexRemove, 1); //từ vị trí tìm được, bỏ 1
  //cập nhật lại LS
  localStorage.setItem("students", JSON.stringify(students));
};

// -----------------------Render UI---------------------------
function RenderUI() {}
//add: thêm newStudent vào giao diện
RenderUI.prototype.add = function (newStudent) {
  const students = new Store().getStudents();

  const newTr = document.createElement("tr");

  //   phân rã ra newStudent cho dễ đọc, tránh lặp
  const { name, birthday, id } = newStudent;

  newTr.innerHTML = `
  <td>${students.length}</td>
  <td>${name}</td>
  <td>${birthday}</td>
  <td>
    <button class="btn btn-danger btn-sm btn-remove" data-id="${id}">
        Xóa
    </button>
  </td>
  `;
  //nhét vào tbody
  document.querySelector("tbody").appendChild(newTr);

  //   xóa giá trị trên các ô input
  document.querySelector("#name").value = "";
  document.querySelector("#birthday").value = "";
};
RenderUI.prototype.alert = function (msg, type = "success") {
  let name = document.querySelector("#name").value;
  //   let birthday = document.querySelector("#birthday").value;

  //tạo div thông báo
  let divAlert = document.createElement("div");

  //   divAlert.className = "alert alert-success";
  divAlert.className = `alert alert-${type}`;
  divAlert.innerHTML = msg;

  //   nhét vô notification
  document.querySelector("#notification").appendChild(divAlert);

  //sau 2 giây thì xóa div thông báo
  setTimeout(() => {
    divAlert.remove();
  }, 2000);
};

// renderAll:
RenderUI.prototype.renderAll = function () {
  //1. lấy danh sách từ localStorage
  // const students = this.getStudents();

  const students = new Store().getStudents();

  //2. biến từng student trong students thành tr
  // dồn các giá trị về một biến, reduce

  //nối các chuỗi lại thành một đoạn thiệt dài

  // giá trị khởi đầu tạo một chuỗi rỗng ""

  // total là một biến tổng (của chuỗi)
  // biến currentStudent

  // ***lỗi lặp code quá nhiều, dùng destructoring
  // let htmlContent = students.reduce(
  //   (total, currentStudent, indexCurrentStudent) => {
  //     return (
  //       total +
  //       `
  //   <tr>
  //     <td>${indexCurrentStudent + 1}</td>
  //     <td>${currentStudent.name}</td>
  //     <td>${currentStudent.birthday}</td>
  //     <td>
  //       <button class="btn btn-danger btn-sm btn-remove" data-id="${currentStudent.id}">
  //         Xóa
  //       </button>
  //     </td>
  //   </tr>
  //   `
  //     );
  //   },
  //   ""
  // );

  let htmlContent = students.reduce(
    (total, currentStudent, indexCurrentStudent) => {
      const { name, birthday, id } = currentStudent;
      return (
        total +
        `
    <tr>
      <td>${indexCurrentStudent + 1}</td>
      <td>${name}</td>
      <td>${birthday}</td>
      <td>
        <button class="btn btn-danger btn-sm btn-remove" data-id="${id}">
          Xóa
        </button>
      </td>
    </tr> 
    `
      );
    },
    ""
  );

  //3. nhét các tr vào tbody
  //đây không phải là nhét
  //thay thế các giá trị cũ bằng giá trị mới

  document.querySelector("tbody").innerHTML = htmlContent;
};

//sự kiện xóa
//không xóa các nút giả, mà lắng nghe cha nó
document.querySelector("tbody").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove")) {
    //việc đầu tiên khi bấm vào một cái nút ta phải lấy id của nó
    //data-id
    const idremove = event.target.dataset.id;

    //*const ra cái store
    const store = new Store();
    const ui = new RenderUI();

    //getStudents: từ id tìm ra thông tin của Student: Store
    const student = store.getStudent(idremove);

    // hiện confirm
    const isConfirmed = confirm(
      `Bạn có chắc là muốn xóa sinh viên ${student.name}`
    );
    if (isConfirmed) {
      //1. xóa trong store (LS)
      store.remove(idremove);
      //2. xóa trong ui
      //vì mình đã xóa tất cả kể cả UI rồi nên chỉ cần load lại
      //*hiệu năng kém
      //***muốn hiệu năng cao thì cần thằng nào xóa thằng nấy
      ui.renderAll();
      //3. Thông báo xóa thành công
      ui.alert(`Bạn đã xóa thành công ${student.name}`);
    }
  }
});
