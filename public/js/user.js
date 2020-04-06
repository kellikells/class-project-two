let $submitBtn = $("#btnsubmit");
let $firstName = $("#first_name");
let $lastName = $("#last_name");
let $email = $("#email");
let $password = $("#password");

var API = {
  saveUser: function(newUser) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/newuser",
      data: JSON.stringify(newUser)
    });
  }
};

const handleFormSubmit = function(event) {
  event.preventDefault();

  var newUser = {
    firstName: $firstName.val().trim(),
    lastName: $lastName.val().trim(),
    email: $email.val().trim(),
    password: $password.val().trim()
  };

  if (
    !(
      newUser.firstName &&
      newUser.lastName &&
      newUser.email &&
      newUser.password
    )
  ) {
    alert("You must enter all required fields!");
    return;
  }
  API.saveUser(newUser).then(function() {
    console.log("new user saved");
  });
};

$submitBtn.on("click", handleFormSubmit);
