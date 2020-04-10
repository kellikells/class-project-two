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
      data: JSON.stringify(newUser)
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
    localStorage.setItem("userId", data);
  });
};
$(document).ready(function() {
  $(".modal").modal();
});

$submitBtn.on("click", handleSigninProcess);
