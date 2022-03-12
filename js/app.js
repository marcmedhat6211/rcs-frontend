$(document).ready(function () {
  //lazy loading
  if ($("img.lazy").length > 0) {
    $("img.lazy").lazy({
      effect: "fadeIn",
    });
  }

  $("i.convert-svg").each(function () {
    var $img = $(this);
    convertSvgToIcon($img);
  });
});

function convertSvgToIcon($img) {
  var imgID = $img.attr("id");
  var imgClass = $img.attr("class");
  var imgURL = $img.attr("data-src");
  if (typeof imgURL === "undefined") {
    return false;
  }

  $svg = getSvgIconByUrl(imgURL);
  if ($svg == null) {
    return false;
  }

  // Add replaced image's ID to the new SVG
  if (typeof imgID !== "undefined") {
    $svg = $svg.attr("id", imgID);
  }
  // Add replaced image's classes to the new SVG
  if (typeof imgClass !== "undefined") {
    $svg = $svg.attr("class", imgClass + " replaced-svg");
  }
  $img.replaceWith($svg);
}

function getSvgIconByUrl(imgURL) {
  var $svg = null;

  $.ajax({
    url: imgURL,
    type: "get",
    dataType: "xml",
    async: false,
    success: function (data) {
      $svg = $(data).find("svg");

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr("xmlns:a");

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
        $svg.attr(
          "viewBox",
          "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
        );
      }
    },
  });

  return $svg;
}
