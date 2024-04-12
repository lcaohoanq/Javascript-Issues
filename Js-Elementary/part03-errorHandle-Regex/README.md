# Regex

```js
var re = /ab+c/;
var re = new RegExp("ab+c");
```

## Flags:

- g: global
- i: case-insensitive
- m: multiline
- u: unicode
- y: sticky

## Method

- exec : return array of matched string
- test : return boolean
- match : return array of matched string (same as exec), if no match return null
- search : return index of matched string, if no match return -1
- replace : return new string with replaced string
- split : return array of string splitted by regex

> demo

```js
const str = "Hello world";
const regex = /world/;
const result = regex.exec(str); // ["world", index: 6, input: "Hello world", groups: undefined]
const result = regex.test(str); // true
const result = str.match(regex); // ["world", index: 6, input: "Hello world", groups: undefined]
const result = str.search(regex); // 6
const result = str.replace(regex, "universe"); // Hello universe\

const result = str3.split(""); // ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
result = str3.split(" "); // ["Hello", "world"]
result = str3.split(regex); // ["Hello ", ""]
```

# Sample

- Phương thức exec được dùng để tìm chuỗi phù hợp theo mẫu so khớp.

```js
var myRe = /d(b+)d/g;
var myArray = myRe.exec("cdbbdbsbz");
// myArray is ["dbbd", "bb"]
```

> Nên gán biến để kiểm tra kết quả trả về

```js
var myRe = /d(b+)d/g;
var myArray = myRe.exec("cdbbdbsbz");
console.log("The value of lastIndex is " + myRe.lastIndex);
```

> The value of lastIndex is 5

```js
var myArray = /d(b+)d/g.exec("cdbbdbsbz");
console.log("The value of lastIndex is " + /d(b+)d/g.lastIndex);
```

> The value of lastIndex is 0

Sự xuất hiện của /d(b+)d/g trong 2 lệnh trên là những đối tượng biểu thức chính quy khác nhau và vì thế có những giá trị khác nhau cho thuộc tính lastIndex. Nếu bạn cần truy cập những thuộc tính của một biểu thức chính quy, bạn nên gán nó tới một biến.
