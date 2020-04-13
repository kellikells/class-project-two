let $submitBtn = $("#submitService");
let $updateService = $("#updateService");
let $title = $("#title");
let $description = $("#description");
let $price = $("#price");

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
  },
  updateService: function(newupdatedService) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "PUT",
      url: "/editservice",
      data: JSON.stringify(newupdatedService)
    });
  }
};

const handleFormSubmit = function(event) {
  event.preventDefault();

  let user = JSON.parse(localStorage.getItem("user"));

  if (!user || user === null) {
    alert("You should first login!");
    window.location.href = "/signin";
    return;
  }

  var newService = {
    title: $title.val().trim(),
    description: $description.val().trim(),
    price: $price.val().trim(),
    UserId: user.id
  };

  if (!(newService.title && newService.description && newService.price)) {
    alert("You must enter all required fields!");
    return;
  }

  API.saveService(newService).then(function() {
    //console.log("new service saved", UserId);
    window.location.href = "/services";
  });
};

const handleUpdateService = function(event) {
  event.preventDefault();

  var newupdatedService = {
    id: $("#serviceId")
      .val()
      .trim(),
    title: $title.val().trim(),
    description: $description.val().trim(),
    price: $price.val().trim()
  };

  if (
    !(
      newupdatedService.title &&
      newupdatedService.description &&
      newupdatedService.price
    )
  ) {
    alert("You must enter all required fields!");
    return;
  }

  API.updateService(newupdatedService).then(function() {
    window.location.href = "/services";
  });
};

$submitBtn.on("click", handleFormSubmit);
$updateService.on("click", handleUpdateService);
