'use strict';
var start;
var hoverInterval;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	$("#submit_url").keydown(updatePreview);
	$(".list-toggle").click(toggleList);
	// $(".peer_video_nav").click(scrollPeerVideos);
	$("#peer-video-right").hover(
        function() {
            // call doStuff every 100 milliseconds
            hoverInterval = setInterval(scrollRight, 100);
        },
        function() {
            // stop calling doStuff
            clearInterval(hoverInterval);
        }
    );
    $("#peer-video-left").hover(
        function() {
            // call doStuff every 100 milliseconds
            hoverInterval = setInterval(scrollLeft, 100);
        },
        function() {
            // stop calling doStuff
            clearInterval(hoverInterval);
        }
    );
});

function scrollLeft(){
	$(".peer_video_wrapper").animate({scrollLeft: "-=20"}, 100);
}
function scrollRight(){
	$(".peer_video_wrapper").animate({scrollLeft: "+=20"}, 100);
}

function updatePreview(){
	$("#submit_preview").attr("src", $("#submit_url").val().trim());
}

function toggleList(event){
	var id=event.target.id.split("_")[1];
	var el = $("#list_" + id);
	if(el.hasClass("collapsed")){
		el.removeClass("collapsed");
		el.addClass("expanded");
		el.find(".glyphicon").removeClass("glyphicon-chevron-up");
		el.find(".glyphicon").addClass("glyphicon-chevron-down");
		$("#sublist_" + id).slideDown();
	}else{
		el.addClass("collapsed");
		el.removeClass("expanded");
		el.find(".glyphicon").addClass("glyphicon-chevron-up");
		el.find(".glyphicon").removeClass("glyphicon-chevron-down");
		$("#sublist_" + id).slideUp();
	}
}