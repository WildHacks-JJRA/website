$(".transition-button").click( function() {
	$(".hero-content").toggleClass("page-transition-out")
	$(".hero-content").fadeOut(400, function() {
		document.location.href="game"
	})
	console.log($(".hero-content"))
})

$(".fade-in").fadeIn()


//’secret’ specifies the numerical keystrokes that make up the word “mario”
var secret = "6873848479";
var secret2 = "67657169";
var input = "";
var timer;
//The following function sets a timer that checks for user input. You can change the variation in how long the user has to input by changing the number in ‘setTimeout.’ In this case, it’s set for 500 milliseconds or ½ second.
$(document).keyup(function(e) {
   input += e.which;
   clearTimeout(timer);
   timer = setTimeout(function() { input = ""; }, 500);
   check_input();
});
//Once the time is up, this function is run to see if the user’s input is the same as the secret code
function check_input() {
    if(input == secret) {
        //the code used to reveal mario and the world is then put here
        document.location.href = 'http://www.matmartinez.net/nsfw/'
    }

    if(input == secret2) {
        //the code used to reveal mario and the world is then put here
        $(".cage").fadeIn(2000);

    }
};








