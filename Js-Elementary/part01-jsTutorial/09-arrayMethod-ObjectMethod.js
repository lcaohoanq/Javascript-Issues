console.log("09-arrayMethod-ObjectMethod.js");

//mảng không nhất thiết phải cùng kiểu
let arr1 = [1, 2, "a", { lname: "Huệ", age: 10 }, [3, 5]];
//mảng có thể lưu rất nhiều thứ
//số, kí tự, object, mảng khác...

//2. *length
console.log(arr1.length);

//3. *isArray | instanceof Array; hỏi xem một biến có phải là mảng ko
console.log(arr1 instanceof Array); //true
console.log(Array.isArray(arr1)); //true

//4. *.toString(): biến mảng thành chuỗi kèm dấu phẩy
let workerList = ["Huệ", "Lan", "Trà"];
console.log(workerList.toString()); //Huệ,Lan,Trà

//5. *split() | join():

// II- chèn mảng
//array là mutable -> có cả 2 khả năng ~~
//có các method có khả năng chỉnh sửa object

// 6. *push(item): nhét item vào cuối mảng | return độ dài mới của mảng đó
console.log("push");
workerList = ["Huệ", "Lan", "Trà"];
console.log(workerList, workerList.push("Cúc")); //['Huệ', 'Lan', 'Trà', 'Cúc'] 4

//7. pop(): xóa item ở cuối mảng | return item bị xóa
console.log("pop");
workerList = ["Huệ", "Lan", "Trà"];
console.log(workerList, workerList.pop());

//8. unshift(item): nhét item ở đầu mảng | return độ dài mới của mảng
console.log("unshift");
workerList = ["Huệ", "Lan", "Trà"];
console.log(workerList, workerList.unshift("Cúc"));

//9. shift() : xóa item ở đầu mảng | return item bị xóa
console.log("shift");
workerList = ["Huệ", "Lan", "Trà"];
console.log(workerList, workerList.shift());

//10. delete array[index]: xóa phần tử ở vị trí index - xóa entry trong object
console.log("delete array");
workerList = ["Huệ", "Lan", "Trà"];
delete workerList[1]; //bị empty: vì đã xóa mịa key rồi
console.log(workerList); //["Huệ", empty, "Trà"]
// *cần xóa một thuộc tính trong object, tạo 1 lỗ thủng
console.log(workerList[1]); //Lan - > undefined

//11. splice(index, sl cần xóa,...phần tử muốn thêm):
//return mảng các item bị xóa
//demo thêm mà không xóa.............
console.log("splice");
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 0, "Điệp", "Cường");
console.log(workerList, result); //['Huệ', 'Điệp', 'Cường', 'Lan', 'Trà'] []
//không xóa được gì nên return mảng rỗng

//xóa không thêm
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 1);
console.log(workerList, result); //['Huệ', 'Trà'] ['Lan']

//vừa thêm vừa xóa
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(0, 2, "Điệp", "Cường");
console.log(workerList, result); //['Điệp', 'Cường', 'Trà'] ['Huệ', 'Lan']

//12. slice (start, end): return mảng con từ start đến end - 1

//13. concat()
console.log("concat");
workerGirl = ["Huệ", "Lan", "Trà"];
workerBoy = ["Điệp", "Cường", "Hùng"];

//workerBoy = ["Điệp", ["Cường", "Hùng"]];

//hiện tượng dây mơ rễ má với thằng workerList cuối cùng
//workerList không cắt được mqh với workerBoy(**chứa mảng**)
//hiện tượng 2 chàng trỏ một nàng

//shallow copy: sao chép nông

workerList = workerGirl.concat(workerBoy, "Hồng", ["Trúc", "Lâm"]);
console.log(workerList);

//14. (thay thế concat()): spread operator: destructuring | phân rã mảng | object
console.log("spread | destructuring");

let person = {
  lname: "Điệp",
  age: 25,
};
let { lname, age } = { ...person };
//rest parameter ở chỗ khác với hàm -> phân rã
//////////////////////////////////
workerList = [...workerGirl, ...workerBoy];
console.log(workerList);
//vẫn gây ra hiện tượng shallow copy

//15. forEach(callback func): lập mảng
//      cf  : (val, index, array) => {}
console.log("forEach");

arr1 = ["Huệ", "Cúc", "Hồng"];
arr1.forEach((val, index, array) => {
  console.log(val, index, array);
});
//thường chúng ta sẽ không cần xài nhiều phần tử như vậy

//16. ***map(cf): biến đổi từng phần tử theo công thức
//      cf  : (val, index, array) => {}
//return ra mảng mới -> hứng lại

console.log("map(cf)");

arr1 = [2, 6, 9];
//ta muốn mỗi phần tử đều phải nhân 2 chia 3
arr1 = arr1.map((item) => {
  return (item * 2) / 3;
  //nếu không có return
  //undefined
});

//cách viết khác, ngắn gọn hơn

// arr1 = arr1.map((item) => (item * 2) / 3); //currying

console.log(arr1);

//17. filter(cf): trả về mảng sau khi đã được lọc qua cf
//          nếu cf trả về true thì lấy, false thì bỏ

console.log("filter");

arr1 = [1, 2, 3, 4, 5, 6];
arr1 = arr1.filter((item) => {
  return item % 2 == 0 ? true : false;
});
console.log(arr1); //2,4,6

//18. find(cf): trả về phần tử đầu tiên trong mảng thỏa đk

console.log("find");

arr1 = [1, 2, 3, 4, 5, 6];
arr1 = arr1.find((item) => {
  return item % 2 == 0 ? true : false;
});
console.log(arr1); //2

//19. findIndex(cf): trả về index của phần tử đầu tiên trong mảng thõa đk
arr1 = [1, 2, 3, 4, 5, 6];
arr1 = arr1.findIndex((item) => (item % 2 == 0 ? true : false));
console.log(arr1); //1 (vị trí)

//20. indexOf(value): tìm vị trí dựa vào value (đầu tiên)
arr1 = [1, 2, 3, 4, 5, 6];
console.log(arr1.indexOf(3)); //2

// find(cf) thỏa thì trả item
// findIndex(cf) thỏa thì trả index của item đầu tiên (thỏa đk cf)
// indexOf(value) thỏa thì trả index của item đầu tiên (thỏa giá trị)

//NHỮNG KHỨA KHÔNG BAO GIỜ XÀIIIIIIII

//21. every(cf) giống như all trong DBI

//Tất cả phần tử trong mảng thỏa đk callback thì true
//nếu một phần tử không thỏa thì false

console.log("every(cf)");

arr1 = [1, 2, 3, 4, 5, 6];
arr1 = arr1.every((item) => item > 7);
console.log(arr1); //false
/* arr1 = arr1.every((item) => item > 0);
console.log(arr1); //true */

//22. some(cf): giống như in trong DBI
// chỉ cần 1 phần tử thỏa điều kiện cf là true -> không ai thỏa sẽ false
arr1 = [1, 2, 3, 4, 5, 6];
arr1 = arr1.some((item) => item > 1);
console.log(arr1); //true

//23. includes(val): tìm xem value có tồn tại trong mảng không (true | false)
arr1 = [1, 2, 3, 4, 5, 6];
console.log((arr1 = arr1.includes(4))); //true

// 24. reverse()

// 25. sort()
arr1 = ["Điệp", "An", "Bảo"];
console.log(arr1.sort()); //['An', 'Bảo', 'Điệp']

// sort số
arr1 = [1, 3, 20, 100];
console.log(arr1.sort()); //xem số như chuỗi, 1,100,20,3

//dạy nó
arr1 = [1, 3, 20, 100];
console.log(arr1.sort((a, b) => a - b));
//dương thì swap, âm thì thôi, cơ chế comparator

// 25. *reduce(cf,initial)

// cf: (total, current, *currentIndex)

//nếu map dùng để thay đổi từng phần tử theo công thức(vẫn là cái mảng)
//reduce có khả năng dồn số về một biến, biến đổi

console.log("reduce");

arr1 = [1, 3, 20, 100];

//viết một hàm tính tổng

result = arr1.reduce((total, current) => {
  return total + current;
  //số 0 cuối cùng là một giá trị khởi tạo
  //tương tự như int sum = 0;
}, 0);
console.log(result);

//Object Method
//Entry của object = key : value
//key thì luôn là string, num
//value: nhiềuuuuuuuuuuuuuuuuu

console.log("Object Method");

let worker1 = {
  lname: "Điệp đẹp trai",
  age: 24,
  showInFor() {
    console.log(this.lname + " " + this.age);
  },
};
worker1.showInFor(); //Điệp đẹp trai 24

worker1.point = 10; //thêm thuộc tính
worker1["point"] = 12; //cách viết khác

worker1.lname = "Điệp PiedTeam";

//delete thuộc tính, không để lại lỗ
console.log(delete worker1.age);

console.log(worker1); //{lname: 'Điệp PiedTeam', point: 12, showInFor: ƒ}

//Object Assign()
//merge Object(xác nhập các object)

//có rồi thì ghi đè, chưa có thì thêm vào

console.log("Object Assign()");

let person1 = {
  lname: "Điệp",
  age: 24,
  job: ["yangho", "coder"],
};
let person2 = {
  lnam: "Lan",
  age: 24,
  company: "PiedTeam",
};
let person3 = Object.assign(person1, person2);
console.log(person3);
//có dây mơ rễ má với nhau (mảng chồng mảng)

person3.job[1] = "bợm nhậu";

console.log(person3);
console.log(person1);

console.log(person3.job == person1.job); //true

//phân rã ra
person3 = { ...person1, ...person2 };
//dù có phân rã như thế nào thì cũng ko cắt được
console.log(person3.job == person1.job); //true

// chưa được thì phân rã một phần nữa là ok

person3.job = [...person1.job];
console.log(person3.job == person1.job); //false

// Object.keys(obj) //mảng các key của object
console.log(Object.keys(person3)); //['lname', 'age', 'job', 'lnam', 'company']

// Object.values(obj) //mảng các value của object
console.log(Object.values(person3)); //['Điệp', 24, Array(2), 'Lan', 'PiedTeam']

// Object.entries(obj) //mảng các entry của object

// for-in: lâp với object được =)))))))))))))
