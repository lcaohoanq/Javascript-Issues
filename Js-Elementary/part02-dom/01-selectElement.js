//dom: document object model

//kết nối js để điều khiển html

//truy cập thông qua id của object(thẻ) gọi là node

//document = html

let inputNode = document.getElementById("name"); //ít xài, dùng giá trị id
inputNode = document.querySelector("#name"); //hay xài hơn, dùng css selector
//.card sẽ truy cập vào cái card đầu tiên
//querySelector sẽ lấy ra 1 phần tử đầu tiên
console.log(inputNode);

// dùng để móc | dom đến 1 node trong document
// nếu dùng querySelector cho class thì vẫn sẽ lấy được duy nhất 1 node đầu tiên
//thỏa điều kiện CSS Selector

//Nếu muốn lấy nhiều phần tử cho selector thì sao??
let cardList = document.getElementsByClassName("card"); //HTMLCollection
console.log(cardList);

//HTMLCollection: giống array, không hỗ trợ mấy method phổ biến (fore)

//xử lí bằng cách phân rã ra tạo thành mảng
cardList = [...document.getElementsByClassName("card")];

cardList = document.querySelectorAll(".card"); //NodeList

//NodeList giống Array, hỗ trợ hầu hết các method

// nên dùng querySelector cho 1 đối tượng, All cho nhiều đối tượng

//1 node có gì?

let firstCard = document.querySelector(".card");
console.log(firstCard);
console.log(firstCard.childNodes); //xịn nhưng lưu text(xuống dòng)
console.log(firstCard.children); //không xịn nhưng các element rõ ràng
console.log(firstCard.parentElement); //đưa quyền truy cập lên thằng to hơn
console.log(firstCard.nextElementSibling); //truy cập vào phần tử phía dưới(không có thì null)
console.log(firstCard.previousElementSibling); //

// ta muốn lấy ra obj đầu tiên của thẻ firstCard ntn
console.log(firstCard.firstChild); ///text vì dùng note
console.log(firstCard.firstElementChild); //h2

//classList: chứa mảng tách ra các tên của class, thêm 1
//className: khi muốn thêm rất nhiều class

//tự chế element
let newCard = document.createElement("div");
// newCard.classList.add("card", "p-2");

newCard.className = "card p-2";
//khi tạo mới thì dùng cách dưới
//nhưng khi muốn thao tác logic thì dùng cách trên

// newCard.outerHTML //bọc hết cả cái div còn inner chỉ lấy ở trong

let fname = "Tui được tạo ra từ js";

newCard.innerHTML = `
    <h2>${fname}</h2>
    <p>Tui là một node fake</p>
`;
//template string

// nhét div vào cái card-group
let cardGroup = document.querySelector(".card-group");
// cardGroup.appendChild(newCard);

//thay thế div cho 1 cái trước
cardGroup.replaceChild(newCard, cardGroup.children[1]);

// ví dụ như muốn xóa một thẻ, mà các thẻ có tên trùng nhau sao biết mà xóa
// đánh dấu cái mã mình muốn
firstCard.setAttribute("data-id", "1"); //set hoặc thêm attribute

console.log(firstCard.getAttribute("data-id")); //1

firstCard.removeAttribute("data-id"); //xóa attribute

// không nên dom với thằng element giả mình tạo ra (khác với html)
