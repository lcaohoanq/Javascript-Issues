import parsePhoneNumberFromString, {
  isValidNumberForRegion,
  parsePhoneNumber,
} from "libphonenumber-js";

const phone = "0934162561";
let phoneNumber = parsePhoneNumber(phone, {
  defaultCountry: "VN",
  extract: false,
});
if (phoneNumber && phoneNumber.isValid()) {
  console.log("Phone number is valid");
} else {
  console.log("Phone number is invalid");
}

phoneNumber = parsePhoneNumberFromString(phone, "VN");
if (phoneNumber && phoneNumber.isValid()) {
  console.log("Phone number is valid");
} else {
  console.log("Phone number is invalid");
}
