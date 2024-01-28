// Details();

$(".details-result").ready(function () {
  $(".loader").fadeOut(600, function () {
    $(".loading-details").fadeOut(500, function () {
      $("body").css("overflow", "auto");
    });
  });
});
