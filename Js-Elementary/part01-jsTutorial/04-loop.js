console.log("bài 4: Vòng lặp - loop");
//reuse: dùng lại             -       repeat: lặp lại
//loop - repeat
//while | do-while | for

var student1 = {name:"Điệp", point: 10, major:"SE"};
//              property | entry
//              entry = key : value

var array1 = [12, 17, 19];
//array > obj > con trỏ
//{0:12 , 1:17 , 2:19} 
//array vẫn có key value nhưng thay vì Agọi key -> index

console.log(student1.name); //Điệp
console.log(student1["name"]); //Điệp
console.log(array1[1]); //17

        //xem mảng như một obj

    //vòng for cơ bản đều sẽ duyệt từ start -> end

// các vòng for cải tiến luôn duyệt từ đầu đến cuối 
// chạy cho hết các phần tử từ đầu tới cuối(bỏ qua return)

    // iterable: tính khả duyệt (xuất hiện trong các object)

    //for-in: duyệt các key của một obj
for(const x in student1){
    // x đại diện cho một cái key trong object
    console.log(x); //name, point, major
}

    //tập hợp Set thì không có key nên ko chơi với for-in
//Set: tập hợp loại trùng(không có key)
var demoSet = new Set(["Điệp", "Huệ", "Lan", "Huệ"]);
//sẽ mất đi huệ
//các thứ tự key bị đảo lộn -> chọt vô sai
//bỏ key để người ta không chọt được
console.log(demoSet);
for(const key in demoSet){
    console.log(key); //không có gì
                      //vì set không có key lấy đâu mà duyệt  
}

// đa phần các object đều có chiều sâu(iterable), nhưng thường các
// object mà mình tự tạo nó không có chiều sâu(phẳng, non-iterable)
// for-of và fore duyệt object không dùng index mà dùng iterable

// thay vì sử dụng i thì for-of và fore sử dụng iterable, mỗi object
// đều sẽ có bộ máy (iterator) đảm nhiệm (không quan tâm số phần tử,
// duyệt đến đâu)

//for-of không chơi với plain obj (obj phẳng)
// for(const value of student1){
//     console.log(value);
// } lỗi

// for-of khác gì for-in?
// for-of dùng để duyệt value thông qua iterable
for(const value of demoSet){
    console.log(value);
} 
//đặc trưng của mảng là có iterable

// fore: for each: duyệt value + key
["a","b","c"].forEach((value,key) => {
    //forEach là một method
    //nhận vào một hàm khác (callBackFunc)
    console.log(value,key);
});