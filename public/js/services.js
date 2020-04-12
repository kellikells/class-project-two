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
          .find(".editService")
          .eq(0)
          .css("display", "block");
      }
    }
  });
});

let $submitBtn = $(".bidSubmit");

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
  }
};

$submitBtn.on("click", function(event) {
  event.preventDefault();

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
