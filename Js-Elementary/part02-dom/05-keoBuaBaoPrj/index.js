const VALUES = [
  { id: "scissors", value: "✌️" }, //0
  { id: "rock", value: "✊" }, //1
  { id: "paper", value: "🖐" }, //2
];

// phân tích logic
// khi nào thì thắng
// 0 - 2 = -2
// 1 - 0 = 1
// 2 - 1 = 1
//indexPlayer - indexComputer = 1 || 2 (thắng) return 1
//indexPlayer - indexCom...   = 0      (hòa)   return 0
//còn lại                                      return -1

// xử lí đổi giá trị liên tục cho Computer
let i = 0;
const handleChange = () => {
  let computer = document.querySelector("#computer");
  // trỏ tới đổi giá trị cho
  computer.textContent = VALUES[i].value; //VALUES[i] có value và id là thành phần của mảng ở trên
  computer.dataset.id = VALUES[i].id; //thêm attribute cho data-id | id (của nó)

  // nếu id đến 3 thì chạy về 0 đi
  i = i === VALUES.length - 1 ? 0 : ++i;
};
// setTimeOut là gọi lại chỉ 1 lần thôi

// setInterval gọi liên tục
let interval = setInterval(handleChange, 100);

// viết hàm so sánh 2 giá trị và return 1,0,-1
let compare = (valuePlayer, valueComputer) => {
  let indexPlayer = VALUES.findIndex((item) => item.id === valuePlayer);
  let idnexComputer = VALUES.findIndex((item) => item.id === valueComputer);

  let result = indexPlayer - idnexComputer;

  if ([1, 2].includes(result)) return 1; //1-0, 2-1, 2-0
  else if (result == 0) return 0; //0-0, 1-1, 2-2
  else return -1; //0-1, 1,2, 0,2
};

// console.log(compare("rock", "paper")); //0

// làm sự kiện click
const playerItem = document.querySelectorAll(".user");

//duyệt qua từng nút của user
playerItem.forEach((item) => {
  // lắng nghe sự kiện click
  item.addEventListener("click", (event) => {
    //dừng thằng máy lại
    clearInterval(interval);
    // chậm lại vài giây rồi dừng -> kkkkkkkk
    // cần phải dừng trước

    // lấy giá trị để so sánh
    let valuePlayer = event.target.id;
    //event.targer.id là lấy cái id của thằng mà mình dom tới bằng biến
    //mình dom playerItem tới .user tức là vô lấy id của class user =))))))))))

    let computer = document.querySelector("#computer");
    // dom tới một thằng span

    let valueComputer = computer.dataset.id;
    // let valueComputer = event.getAttribute("data-id");

    // gọi hàm compare đã làm ở trên để so sánh 2 kết quả
    let result = compare(valuePlayer, valueComputer);

    // xóa active cho các nút trước
    playerItem.forEach((_item) => {
      _item.classList.remove("actived");
      //   không nhận sự kiện từ chuột nữa
      _item.style.pointerEvents = "none";
    });
    // thêm actived cho thằng vừa nhấn
    event.target.classList.add("actived");

    // thêm thông báo
    const alertDiv = document.createElement("div");

    //thêm class alert (bootstrap) đẩy các phần tử trong nó vô giữa
    // thêm các thuộc tính khác sẽ tạo màu viền (success-warning-dark)
    alertDiv.classList.add("alert");
    let msg = "";
    if (result == 1) {
      msg = "bạn thắng";
      alertDiv.classList.add("alert-success"); //alert alert-success : xanh lá
    } else if (result == 0) {
      msg = "bạn hòa";
      alertDiv.classList.add("alert-warning"); //alert alert-warning : vàng
    } else {
      msg = "bạn thua";
      alertDiv.classList.add("alert-dark"); //alert alert-dark    : xám
    }
    alertDiv.textContent = msg;

    // dom tới nối alertDiv vào notification (trống) bên html
    document.querySelector(".notification").appendChild(alertDiv);

    // dom tới chơi lại
    // display: none
    document.querySelector("#play-again").classList.remove("d-none");
  });
});

// sự kiện click chơi lại
document.querySelector(".btn-play-again").addEventListener("click", (event) => {
  clearInterval(interval);
  interval = setInterval(handleChange, 100);
  playerItem.forEach((_item) => {
    _item.classList.remove("actived");
    _item.style.pointerEvents = ""; //trả lại khả nắng click
  });
  document.querySelector(".notification").innerHTML = "";
  document.querySelector("#play-again").classList.add("d-none");
});
