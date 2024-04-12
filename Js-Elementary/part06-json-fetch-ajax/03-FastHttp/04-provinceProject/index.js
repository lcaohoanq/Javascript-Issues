// promise + fetch + class
const baseUrl = "https://provinces.open-api.vn/api";

class Http {
  get(url) {
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error(response.statusText);
      }
    });
    //code này chỉ xử lí gói hàng nếu có lỗi thì thả ra
    //!ta không chấm then nữa
    //! thêm return vào fetch để mỗi khi gọi get thì ta sẽ có luôn gói hàng
  }
}

class Store {
  //hàm này sẽ cần dùng get để liên kết với database
  //get thì liên quan đến Http
  constructor() {
    this.htpp = new Http();
  }

  //ta lấy dữ liệu của thành phố trước (theo thứ tự)

  //TODO: getProvinces: lấy danh sách các thành phố
  getProvinces(code = "") {
    //thêm return vào
    //tách ra thêm 1 nhịp nữa để bên ngoài then, catch xử lí
    return this.htpp
      .get(`${baseUrl}/p/${code}`) //*thêm cái code nhẹ nhàng sương sương thôi, khi sử dụng mà không đề cập thì js ngầm hiểu là rỗng
      .then((provinces) => {
        //! console.log(provinces);
        return provinces;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //TODO: getDistrictsByProvinceCode: lấy danh sách các quận dựa vào provinceCode
  //!SAMPLE: https://provinces.open-api.vn/api/p/79/?depth=2

  getDistrictsByProvinceCode(provinceCode) {
    //thêm return vào
    //tách ra thêm 1 nhịp nữa để bên ngoài then, catch xử lí
    return this.htpp
      .get(`${baseUrl}/p/${provinceCode}/?depth=2`)
      .then((province) => {
        return province.districts;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //TODO: getWardByDistrictsCode: lấy danh sách các ward dựa vào districtCode
  //!SAMPLE: https://provinces.open-api.vn/api/p/79/?depth=2

  getWardByDistrictsCode(districtCode) {
    //?chỉnh thành /d vì url này nhận vào district
    return this.htpp
      .get(`${baseUrl}/d/${districtCode}/?depth=2`)
      .then((district) => {
        return district.wards;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

//thay vì in ở trong này thì ta ko in, ném ra bên ngoài để xử lí
new Store().getProvinces().then((provinces) => {
  console.log(provinces);
});

class RenderUI {
  //TODO: Nhận vào provinces(danh sách) và render lên ui
  renderProvinces(provinces) {
    //biến từng thằng thành option trong html
    let htmlContent = "";
    provinces.forEach((provinceItem) => {
      const { code, name } = provinceItem;
      htmlContent += `<option value="${code}">${name}</option>`;
    });
    //nhét vào select #province
    document.querySelector("#province").innerHTML = htmlContent;
  }

  renderDistricts(districts) {
    //biến từng thằng thành option trong html
    let htmlContent = "";
    districts.forEach((districtItem) => {
      const { code, name } = districtItem;
      htmlContent += `<option value="${code}">${name}</option>`;
    });
    //nhét vào select #district
    document.querySelector("#district").innerHTML = htmlContent;
  }

  renderWards(wards) {
    //biến từng thằng thành option trong html
    let htmlContent = "";
    wards.forEach((wardItem) => {
      const { code, name } = wardItem;
      htmlContent += `<option value="${code}">${name}</option>`;
    });
    //nhét vào select #ward
    document.querySelector("#ward").innerHTML = htmlContent;
  }

  renderInformation(information) {
    const { province, district, ward, address } = information;
    let htmlContent = `${address}, ${province}, ${district}, ${ward}`;
    document.querySelector("#information").innerHTML = htmlContent;
  }
}

//!------------------------------sự kiện load trang
document.addEventListener("DOMContentLoaded", (event) => {
  let store = new Store();
  let ui = new RenderUI();

  store
    .getProvinces()
    .then((provinces) => {
      ui.renderProvinces(provinces);

      //người dùng chọn thằng provinceCode hiện tại
      let provinceCode = document.querySelector("#province").value;

      //tìm quận bằng provinceCode
      //!không nên lồng promise vào nhau
      //!return
      return store.getDistrictsByProvinceCode(provinceCode);
    })
    .then((districts) => {
      ui.renderDistricts(districts);

      //!lấy districtCode hiện tại

      let districtCode = document.querySelector("#district").value;

      //tìm ward bằng districtCode hiện tại
      return store.getWardByDistrictsCode(districtCode);
    })
    .then((wards) => {
      ui.renderWards(wards);
    });
});

//sự kiện khi province bị thay đổi
//*đổi province thì 2 thằng kia thay đổi theo
//!nhưng nếu đổi district thì ward không ảnh hưởng
document.querySelector("#province").addEventListener("change", (event) => {
  let store = new Store();
  let ui = new RenderUI();

  //người dùng chọn thằng provinceCode hiện tại
  let provinceCode = document.querySelector("#province").value;

  //tìm quận bằng provinceCode
  //!không nên lồng promise vào nhau
  //!return
  return store
    .getDistrictsByProvinceCode(provinceCode)
    .then((districts) => {
      ui.renderDistricts(districts);

      //!lấy districtCode hiện tại

      let districtCode = document.querySelector("#district").value;

      //tìm ward bằng districtCode hiện tại
      return store.getWardByDistrictsCode(districtCode);
    })
    .then((wards) => {
      ui.renderWards(wards);
    });
});

//*sự kiện district bị thay đổi
document.querySelector("#district").addEventListener("change", (event) => {
  let store = new Store();
  let ui = new RenderUI();

  //!lấy districtCode hiện tại

  let districtCode = document.querySelector("#district").value;

  //tìm ward bằng districtCode hiện tại
  store.getWardByDistrictsCode(districtCode).then((wards) => {
    ui.renderWards(wards);
  });
});

//TODO: khi submit đặt hàng, dữ liệu sẽ
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let province = document.querySelector("#province option:checked").innerHTML;
  let district = document.querySelector("#district option:checked").innerHTML;
  let ward = document.querySelector("#ward option:checked").innerHTML;
  let address = document.querySelector("#address").value;

  let information = {
    province,
    ward,
    district,
    address,
  };

  //!khi mà hàm có quá nhiều tham số
  //!ta nên biến nó về thành một obj
  let ui = new RenderUI();
  ui.renderInformation(information);
});
