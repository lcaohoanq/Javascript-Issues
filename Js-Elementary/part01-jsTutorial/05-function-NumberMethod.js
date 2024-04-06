console.log("Bài 5: Hàm - Function");
// Hàm trong js được chia làm 2 loại chính

// Function Declaration(FD) | Function Expression (FE)

    //1.Function Declaration(khai báo hàm) : nó hoisting

handle1();// hoisting: chạy bth
function handle1(){
    console.log("Tui là được tạo từ FD nè");
}
// handle1();

    //2. Function expression(biểu thức hàm) : ko hoisting
// handle2();//undefined + () hàm -> lỗi
var handle2 = function (){
    console.log("Tui là được tạo từ FE nè");
}
// nếu đặt tên là function handle3 -> tên vẫn là handle2
handle2();

    //3.IIFE - Immediatety invokable function expression
/*---------------------------------------------------------- */
/* IIFE + async await | promise */
/* tạo ra hàm dùng liền mà không có tính tái sử dụng */
function handle(){
    let a = 10;
    let b = 20;
    console.log(a+b);
}
handle();

    //lười
(function handle(){
    let a = 10;
    let b = 20;
    console.log(a+b);
})();

    //tạo ra một cái hàm không cần dùng tên
    //mới tạo ra chạy liền rồi vứt


// xử lí bất đồng bộ bằng await - async
//muốn chạy được await phải chứa trong hàm async

//bị lỗi khi không để ý dấu ; sẽ gộp hàm lại làm chung
/* ;(function async (){
    //(await) get data 4s

    //xử lí data
    let a = 10;
    let b = 20;
    console.log(a+b);
})(); */

//Anonymous Function: (FE)
//Callback: gọi lại | hàm nhận một hàm làm đối số (argument)
//đưa cho nhưng mà không chạy, nhưng chạy lại sau 

// function1(x, function2){
    // đợi a(s) rồi làm
    // function2(y, function3){
            // ...
    // }
// }

//cả đống trên là hiện tượng callback
//function2 gọi là callback Function

// chú ý function2 != function2() (chạy luôn cả hàm)

var handle3 = function(){
    console.log("Ahihi đồ chó");
}
handle3();

// callBack
setTimeout(handle3,3000);
// đây là một callBack, nhận vào một hàm và callback Function (sau 3s chạy thằng trước)

// lười đặt tên
setTimeout(function(){
    console.log("Ahihi đồ chó");
},2500);

//ngắn hơn
setTimeout(() => {
    console.log("Ahihi đồ chó");
},1000);
// cách viết tắt của FE (Arrow Function)

    //nhược điểm lớn nhất cả Arrow Func
    //thằng này sẽ thả this | và this sẽ đi đến global(window)

//FD
function handle4(){
    console.log(this);
};
//FE
var handle5 = function(){
    console.log(this);
};
//FA
var handle6 = () => {
    console.log(this);
};

//test                       function
//                      normal  |  use strict 
handle4(); //FD         window  |  undefined
handle5(); //FE         window  |  undefined
handle6(); //FA         window  |  window

// this đại diện cho object đã gọi nó

// khi normal thì bị tất cả bị bung khỏi hàm, nên chạy bình thường
// use strict -> undefined

// FD|FE giam this: hành động tốt
// nếu có cụ thể object đang gọi thì this sẽ có giá trị là obj đó
// còn nếu không thì this sẽ undefined

// FA không giữ được this, không sử dụng cho hàm có this bên trong

    // vd2:
var person1 = {
    fullname: "Điệp đẹp trai",
    getNameByFd(){
        console.log(this.fullname); //this lúc này là undefined
        //chưa chạy thì không biết
    },
    getNameByFe: function(){
        console.log(this.fullname); //this lúc này là undefined
    },
    getNameByFa: () => {
        console.log(this.fullname); //this lúc này là undefined
    }
}
// this là đại diện cho obj gọi nó
person1.getNameByFd(); //this là person1 => person1.fullname
person1.getNameByFe(); //this là person1 => person1.fullname
person1.getNameByFa(); //this bị ném đi  => window.fullname => undefined

    /* lời khuyên"
        FD nên dùng trong method
        FE cho function có    this
        FA cho function không this (nếu cố chấp thì dùng .call, .blind, .apply)
    */

    // PHÂN BIỆT ĐỐI SỐ VÀ THAM SỐ
function handle7(a,b = 10){
    console.log(a+b);
}
//a,b là tham số
//b = 10 là default parameter

handle7(5, 3); //8
handle7(5);    //15

    // tham số còn lại | tham số nghỉ | tham số đợi (rest parameter)
function handle8(a,b,c){
    console.log(a);
    console.log(b);
    console.log(c);
}
handle8(2,5,7);
handle8(2,5,7,9,10); //vẫn lấy 2,5,7
/////////////////////////////////////////////
function handle9(a,b, ...c){
    console.log(a);
    console.log(b);
    console.log(c);
}
handle9(2,5,7,9,10);

    //ứng dụng
// viết hàm nhận vào 1 đống giá trị số, tính tổng của 1 đống số đó
function sumAll(...numbList){
    let sum = 0;
    numbList.forEach((value) => {
        sum += value;
    });
    return sum;
}
console.log(sumAll(1,2,3,4,5,6,7,8,9,10)); //sum = 55

                //Number - method
// Không ai dùng js để làm app ngân hàng
// Số trong js chỉ có dạng là number
// số nguyên có độ chính xác là 15 số

let x = 999999999999999; //15 số
x = 9999999999999999; //16 số làm tròn lên 

// đối với số thập phân, độ chính xác là 17
x = 0.2 + 0.1;  //0.3000000000000000000004
x = (0.2 * 10 + 0.2 * 10) / 10; //0.3
x = Number((0.2 + 0.1).toFixed(1)); 
//trả về string (màu trắng), nên phải ép kiểu về number
console.log(x);

// ...............................................
console.log(2 / 0);  //infinity
console.log(-2 / 0); //-infinity

/* x = 0o7;
x = 0xff; //255

x = 10;
// ép kiểu thành chuỗi
// x = String(x); ////bình thường
x = x + "";
x = x.toString();
x = x.toFixed(0); */

