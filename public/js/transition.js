$(".transition-button").click( function() {
	$(".hero-content").toggleClass("page-transition-out")
	$(".hero-content").fadeOut(400, function() {
		document.location.href="game.html"
	})
	console.log($(".hero-content"))
})

$(".fade-in").fadeIn()
