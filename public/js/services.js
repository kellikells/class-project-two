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
