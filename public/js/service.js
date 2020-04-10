let $submitBtn = $("#submitService");
let $title = $("#title");
let $description = $("#description");
let $price = $("#price");
let $user = $("#user");

var API = {
  saveService: function(newService) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/newservice",
      data: JSON.stringify(newService)
    });
  }
};

const handleFormSubmit = function(event) {
  event.preventDefault();

  var newService = {
    title: $title.val().trim(),
    description: $description.val().trim(),
    price: $price.val().trim(),
    UserId: localStorage.getItem("userId")
  };

  if (!(newService.title && newService.description && newService.price)) {
    alert("You must enter all required fields!");
    return;
  }
  API.saveService(newService).then(function() {
    console.log("new service saved");
  });
};

$submitBtn.on("click", handleFormSubmit);
