
	var clickEnabled = true
	var chargeLevel = 0
	var rechargeTimer = 0


	var launchRecharge = function() {
		chargeLevel = 0
		recharge()
		rechargeTimer = setInterval(function() {
			console.log(clickEnabled)
			chargeLevel = chargeLevel + 5
			recharge()
			if (chargeLevel >= 100) {
				clearInterval(rechargeTimer)
				clickEnabled = true
				console.log(clickEnabled)
			}
		}, 100)
	}

	var recharge = function() {
		$(".progress-bar").css("width", chargeLevel + "%")
		console.log(chargeLevel)

		if (chargeLevel < 50) {
			$(".recharge-status").text("Wait...")
			$(".recharge-status").css("color", "#ff0000")
			$(".progress-bar").css("background-color", "#ff0000")
		} else if (chargeLevel < 100) {
			$(".recharge-status").text("Wait...")
			$(".recharge-status").css("color", "#ff0000")
			$(".progress-bar").css("background-color", "#93ff89")
		} else {
			$(".recharge-status").text("Click away!")
			$(".progress-bar").css("background-color", "#03ff00")
			$(".recharge-status").css("color", "#03ff00")


		}
	}
