$(document).ready(function() {

// Clear articles //
$(".clear").on("click", function() {
  console.log("clear articles button")
  $.ajax({
    method: "GET",
    url: "/delete-all"
  });
  setTimeout(reloadPage, 250)
})

// Reloads page //
function reloadPage() {
  location.reload()
}

// function clearArt() {
//   $.ajax({
//     method: "GET",
//     url: "/delete-all"
//   });
// }

// Scrapes articles //
$(".scrape-new").on("click", function() {
  console.log("scraper button clicks")
  $.ajax({
    method: "GET",
    url: "/scrape",
  }).done(function(data) {
    console.log(data)
  })
  setTimeout(reloadPage, 1000)
  // setTimeout(clearArt, 1001)
  console.log("clear all")
});

// Save articles btn //
$(".save-articles").on("click", function() {
  console.log("saved articles button clicks")
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/saved",
  }).done(function(data) {
  });
});

// Open saved articles btn ---> Directs to Saved Articles Page //
$(".open").on("click", function() {
  $.get("/saved", function (req, res) {
    console.log(res);
  }).then(function(data) {
  });
});

// Delete articles btn //
// url path
// $(".delete-article").on("click", function() {
//   var thisId = $(this).attr("data-id");
//   $.ajax({
//     method: "POST",
//     url: "/articles/unsave/" + thisId,
//   }).done(function(data) {
//   });
// });

// Save NEW note btn //
// url path
$(".note-saved").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/existingNote/" + thisId,
    data: {
      text: $("#textInput" + thisId).val(),
    }
  }).done(function(data) {
      console.log(data);
      // Empties the notes section
      $("#textInput" + thisId).val("");
      $("#noteBox").modal("disappear");
    });
});

// Delete note btn //
// url path
$(".delete-note").on("click", function() {
  var noteId = $(this).data("note");
  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId,
  }).done(function(data) {
      console.log(data);
// Empty the notes section //
      $("#noteBox").modal("remove");
    });
});  
});