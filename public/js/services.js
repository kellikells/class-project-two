$(document).ready(function() {
  $(".serviceBox").each(function() {
    let serviceUserId = $(this).data("userid");
    let serviceId = $(this).data("serviceid");

    let loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser !== null) {
      if (serviceUserId === loggedInUser.id) {
        $(this)
          .find(".editService a")
          .eq(0)
          .attr("href", `/editservice/${serviceId}`);
        $(this)
          .find(".removeService")
          .eq(0)
          .attr("data-serviceid", serviceId);
        $(this)
          .find(".editService")
          .css("display", "block");
        $(this)
          .find(".removeService")
          .css("display", "block");
      }
    }
  });
});

let $submitBtn = $(".bidSubmit");
let $removeService = $(".removeService");

var API = {
  saveBid: function(newBid) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/newBid",
      data: JSON.stringify(newBid)
    });
  },
  removeService: function(id) {
    return $.ajax({
      type: "DELETE",
      url: "api/deleteService/" + id
    });
  }
};

$submitBtn.on("click", function(event) {
  event.preventDefault();
  let user = JSON.parse(localStorage.getItem("user"));

  if (!user || user === null) {
    alert("You should first login!");
    window.location.href = "/signin";
    return;
  }

  var newBid = {
    price: $(this)
      .closest(".card-action")
      .find(".bidInput")
      .val()
      .trim(),
    ServiceId: $(this)
      .closest(".card-action")
      .find(".bidInput")
      .data("serviceid")
  };

  console.log(newBid);

  API.saveBid(newBid).then(function() {
    console.log("new bid saved");
    location.reload();
  });
});

$removeService.on("click", function() {
  let id = $(this).data("serviceid");
  API.removeService(id).then(function() {
    console.log("deleted" + id);
    location.reload();
  });
});
