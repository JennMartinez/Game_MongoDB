$(document).ready(function() {

// Scrapes articles //
$(".scrape-new").on("click", function() {
  console.log("scraper button clicks")
  $.ajax({
    method: "GET",
    url: "/scrape",
  }).done(function(data) {
    console.log(data)
  })
});

// Save articles btn 
// url path
$(".save-articles").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/saved" + thisId,
  }).done(function(data) {
  });
});

// Open saved articles btn //
$(".open").on("click", function() {
  $.get("/saved", function (req, res) {
    console.log(res);
  }).then(function(data) {
  });
});

// Delete articles btn 
// url path
$(".delete-article").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/unsave/" + thisId,
  }).done(function(data) {
  });
});

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