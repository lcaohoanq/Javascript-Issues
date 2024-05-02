function submitForm(HTMLFormElement) {
  event.preventDefault();
  console.log("hello world");
  swal({
    title: "Good job!",
    text: "You clicked the button!",
    icon: "success",
    // button: "Ok",
  });
}
