//Khi mà sự kiện có nhiều nút, thì mình tạo biến hứng dom
//rồi duyệt qua từng cái nút (for-each)

// chỉ có một sự kiện của form
// hứng sự kiện của form (enter và bấm add)
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); //chặn sự kiện reset trang của submit

  // dữ liệu sẽ đẩy từ input (có id = name) xuống
  let name = document.querySelector("#name").value;

  //   tạo ra một đối tượng để lưu trữ
  let item = {
    // tạo ra thêm một id để lưu trữ
    // thay vì lưu bằng số thì lưu bằng ngày tháng
    // cần id vì có id mới có thể truy cập đến và thêm xóa sửa được
    id: new Date().toISOString(),

    // nếu cái key trùng value thì bỏ luôn, ví dụ name: name, => name,

    // trim lại
    name: name.trim(),
  };
  // hàm nhận vào item và hiển thị lên UI (user interface):
  addItemToUI(item);
  // hàm nhận vào item và lưu vào localStorage
  addItemToLS(item);

  // tại sao phải cần lưu nút remove cái id (lưu date)
  // detect được cần phải xóa thằng nào???
});

// hàm nhận item và hiển thị ra UI
const addItemToUI = (item) => {
  //tạo ra một cái card bỏ vào div
  let newCard = document.createElement("div");

  //   sự khác biệt của classList và className

  //  classList khi ta cần thao tác logic

  //  className khi ta muốn tạo mới
  newCard.className =
    "card d-flex flex-row justify-content-between align-item-center p-2 mb-3";

  // lấy mà chỉnh sửa nội dung thì dùng innerHTML
  // template string truyền item.name và item.id
  newCard.innerHTML = `<span>${item.name}</span>

  <button data-id="${item.id}" type="button" class="btn btn-danger btn-sm btn-remove">Remove</button>`;
  // thêm 1 attribute là btn-remove

  // nhét newCard vào list (div empty)
  document.querySelector(".list").appendChild(newCard);
};

// getList(): hàm lấy danh sách các item từ localStorage
// ép kiểu về chuỗi mới lưu đươc trên LS
const getList = () => {
  // getItem method trả ra string và null (có hoặc không có dữ liệu trong đó)
  // ý tưởng: string = mảng và null = mảng rỗng []
  // dùng parse

  // localStorage.getItem("list");

  // return về localStorage cần phải ép về một mảng
  // chuỗi JSON -> parse -> mảng
  // mảng luôn true

  return JSON.parse(localStorage.getItem("list")) || [];
};

// chưa lưu item đó
// tạo hàm lưu
const addItemToLS = (item) => {
  // lấy danh sách các item từ localStorage
  let list = getList();

  // nhét item vào danh sách
  // mảng xài method push()
  list.push(item);

  // lưu danh sách lên lại localStorage
  // localStorage.setItem("list", list);
  //localStorage chỉ lưu chuỗi JSON mà list là mảng được tạo từ getList()

  //mảng -> stringify -> chuỗi JSON

  localStorage.setItem("list", JSON.stringify(list));

  // set là chỉnh sửa và update
};

// dữ liệu đã lưu vào localStorage không bị mất đi
// F5 mất dữ liệu của UI

// GIẢI PHÁP: render dữ liệu từ localStorage về push lên UI

//init: hàm render các item trong danh sách LS
(function init() {
  let list = getList();
  list.forEach((item) => {
    addItemToUI(item);
  });
})();
// vừa mới tạo ra gọi luôn, thay thế bằng IIFE
// init();

// HÀNH ĐỘNG XÓA

// muốn lắng nghe sự kiện click của các nút remove
// nút remove là fake không dom được
// không được dom vô các node giả
// dom vô cha nó -> list

document.querySelector(".list").addEventListener("click", (event) => {
  // trong phạm vi của list, bấm vào remove thì sẽ xảy ra sự kiện
  // nếu như mode nhấn có chứa class btn-remove thì mới chạy

  // cần thao tác logic, ta dùng classList
  if (event.target.classList.contains("btn-remove")) {
    // tạo một biến lưu trữ tên thằng mình đã nhập
    // để in ra màn hình thông báo người dùng content của nó khi mình bấm xóa
    // là khu vực span phía trên -> pre
    let nameItem = event.target.previousElementSibling.innerHTML;
    let isConfirmed = confirm(` Bạn có chắc là muốn xóa item: ${nameItem} `);
    if (isConfirmed) {
      // xóa UI: khi bấm vào remove thì sẽ truy cập tới nút, xóa thằng div chứa nút
      let card = event.target.parentElement;
      card.remove();
      // F5 lại vẫn còn vì chưa xóa trong localStorage

      // xóa LS: khó hơn, cần truy cập tới data-id để biết thằng nào mà xóa
      let idRemove = event.target.dataset.id; //lấy data-id

      // hàm nhận vào mã item cần xóa, và xóa item khỏi danh sách trong LS
      removeItemFromLS(idRemove);
    }
  }
});

const removeItemFromLS = (idRemove) => {
  let list = getList();
  // filter: lọc ra những item có mã khác idRemove
  list = list.filter((item) => item.id != idRemove);
  // lưu lại trên ls

  // tạo bằng getList() ta được mảng -> stringify -> chuỗi JSON
  localStorage.setItem("list", JSON.stringify(list));
};

// xóa hết đi
document.querySelector("#btn-remove-all").addEventListener("click", (event) => {
  // log ra một message
  const isConfirmed = confirm("Bạn có chắc là muốn xóa hết không?");
  if (isConfirmed) {
    // xóa giao diện
    document.querySelector(".list").innerHTML = "";
    // xóa localStorage
    localStorage.removeItem("list");
  }
});

// sự kiện filter
document.querySelector("#filter").addEventListener("keyup", (event) => {
  let inputValue = document.querySelector("#filter").value;
  let list = getList();
  // item nào có name chứa giá trị đang gõ thì lấy ra
  let filterList = list.filter((item) => item.name.includes(inputValue));

  // trước khi filter thì mình phải xóa hết UI (rỗng), giống bước ở trên
  document.querySelector(".list").innerHTML = "";
  // nếu không xóa thì sẽ bị chồng các kiểu ....

  // tìm được rồi phải hiện lên UI lại
  filterList.forEach((item) => {
    addItemToUI(item);
  });
});
