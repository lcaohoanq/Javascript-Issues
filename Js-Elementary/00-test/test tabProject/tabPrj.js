// dom vô nút và hình
let btnList = document.querySelectorAll(".navtab-btn");
let contentList = document.querySelectorAll(".tab-content-item");

btnList.forEach((btn) => {
  // lắng nghe sự kiện click
  btn.addEventListener("click", (event) => {
    // reset tất cả các nút
    btnList.forEach((_btn) => {
      _btn.classList.remove("activated");
    });

    //kích hoạt trạng thái css cho nút
    event.target.classList.add("activated");

    //lấy id ra để biết được nút nào bấm của hình nào
    let id = event.target.id;

    //reset tất cả các hình
    contentList.forEach((content) => {
      content.classList.remove("activated");
    });

    //với cái id lấy được, tìm ra hình tương ứng
    let contentChecked = document.querySelector(
      `.tab-content-item[data-id="${id}"]`
    );

    //kích hoạt trạng thái css cho hình
    contentChecked.classList.add("activated");
  });
});
