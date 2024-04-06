console.log("Asynchronous-callback");

// Dù là môi trường trình duyệt hay môi trường webapp nodejs
// thì js luôn là một ngôn ngữ đa luồng

// php và java là ngôn ngữ đa luồng

// trong trường hợp đồng bộ: synchronous
// vd: anh có tác vụ L1(3s) và L2(2s)
// ta mất 5s vì L1 chạy xong rồi L2 chạy

// đặt trường hợp: L1 là kết quả cần sử dụng cho L2 thì
// đồng bộ đang bảo toàn tính nhất quán của code

// nhưng nếu L1 không liên quan gì L2
// thì ta ước L1 và L2 hoàn thành trong 3s
// lúc L1 đang làm thì L2 cũng làm luôn

// *đôi lúc có lợi, có hại(một thằng phải lấy dữ liệu xong thì thằng khác mới chạy được)

// *js mặc định luôn luôn bất đồng bộ, đôi lúc cần phải để các process đợi nhau

// *************************[XỬ LÍ BẤT ĐỒNG BỘ]*******************************

// Call stack: là một cấu trúc dữ liệu dạng ngăn xếp (stack)
// call stack hoạt động theo kiểu last in first out (LIFO)

function a(x) {
  console.log(x);
}

function b(y) {
  a(y + 2);
}

function c(z) {
  b(z + 1);
}

c(5);

//vậy callstack lần lượt là gì?
//c() => b(z+1) => z+1
//c() => b(z+1) => a(y+2) => y + 2
//c() => b(z+1) => a(y+2) => console.log(x);
//giải phóng từ phải qua trái đến hết

//Event loop và callback queue()
//***ae -> a(lon)e
//trong một js runtime (môi tường chạy js) còn 1 thứ quan trọng k kém gì callstack
//vd: web APIS, Event Loop, callback Queue(kiu)

//event loop: liên tục lặp đi lặp lại của trình đợi của 1 sự kiện "click"
//"hãy click tôi đi"
//          "click, load, onDone, submit,..."

//webApis: dom | ajax(XMLhttpRequest): già, cũ | timeOut(setTimeOut)

//
function main() {
  console.log("command1");
  setTimeout(() => {
    console.log("command2");
  }, 3000);

  console.log("command3");
}

main(); //command1 - command3 - command2

//main vô chạy -> in ra command1(giải phóng) -> gặp callback setTimeOut 3s nó đưa vô web Apis
//*vừa qua Web Apis sẽ bắt đầu đếm
//tách ra setTimeOut là 3s và một hàm riêng
//main vẫn tiếp tục chạy đến command 3(giải phóng)
//hàm riêng đó đưa vô callback Queue -> callStack rồi chạy

//nếu setTimeOut trong khoảng tg của main chạy thì vẫn 1-2-3

//*main không đợi ai chạy

//ta có thể xử lí bất đồng bộ bằng callback
//*ưu điểm: dễ viết
//!nhược điểm: khó fix bug

//callback hell

//callback sẽ được thay thế bằng promise

//ví dụ cực zui
for (var i = 0; i <= 3; i++) {
  //for này chạy nhanh hơn setTimeOut
  setTimeout(() => {
    console.log(i);
  }, 1);
  //4 cái setTimeOut(vừa mới xong thì for đã xong từ lâu)
  //i = 4
  //vì i xài chung nên nó sẽ đổi 4 thằng thành log
}
//*var bị outscope nên mới có hiện tượng xài chung
//*let sẽ 0,1,2,3
