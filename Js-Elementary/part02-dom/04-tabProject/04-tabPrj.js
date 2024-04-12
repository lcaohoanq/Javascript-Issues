// Lấy ra các nút
let btnList = document.querySelectorAll(".navtab-btn");
let contentList = document.querySelectorAll(".tab-content-item");

// 3 cái nút đều phải lắng nghe
//fore duyệt từng nút
btnList.forEach((btn) => {
  // thêm sự kiện click cho từng nút
  //nếu có 1 nút bị nhấn
  btn.addEventListener("click", (event) => {

    // ---bước kề cuối
    // reset actived trên các nút
    // _btn: privated
    btnList.forEach((_btn) => {
      _btn.classList.remove("actived");
    });
    // ---

    // không xác định được nút nào bị nhấn
    event.target.classList.add("actived");

    // lấy id của thằng bị nhấn
    let id = event.target.id;

    //lấy thằng bị nhấn ra
    // tìm phần tử có attribute của class tương ứng
    // chú ý có nháy đôi vì id bên html có nháy đôi

    //--- bước cuối reset các hình
    contentList.forEach((content) => {
      content.classList.remove("actived");
    });

    let contentChecked = document.querySelector(
      `.tab-content-item[data-id="${id}"]`
    );

    contentChecked.classList.add("actived");
  });
});
