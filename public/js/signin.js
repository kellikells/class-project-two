let $submitBtn = $("#signin");
let $email = $("#email");
let $password = $("#password");

var API = {
  signIn: function(newUser) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/signin",
      data: JSON.stringify(newUser),
      error: function showError() {
        alert("wrong username or password!");
      }
    });
  }
};

const handleSigninProcess = function() {
  var userCredentials = {
    email: $email.val().trim(),
    password: $password.val().trim()
  };

  if (!(userCredentials.email && userCredentials.password)) {
    alert("You must enter all required fields!");
    return;
  }
  API.signIn(userCredentials).then(function(data) {
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      let storedFirstName = JSON.parse(localStorage.getItem("user")).firstName;
      $(".dropdown-trigger").html(
        `Welcome ${storedFirstName} <i class="material-icons right">arrow_drop_down</i>`
      );
      $("#signupDrp a").text("Edit Profile");
      $("#signinDrp").html("<a id='logout'>Logout</a>");
      window.location.href = "/services";
    }
  });
};
$(document).ready(function() {
  // $(".modal").modal();
});

$submitBtn.on("click", handleSigninProcess);
