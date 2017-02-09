(function() {

	var
	createButton = function() {
		return ROCK.JQUERY.createNode("a").attr("href", "#").attr("data-role", "button");
	},
	tweetText = "Wow! #Psychometrick could tell I'm feeling {word}!",
	shareURL = ("http://twitter.com/share?&text="),
	shareHTML = "<a href=\"{url}\">{text}</a>",
	shareText = "Tweet \"{tweet}\"",
	getShareURL = function(word) {
		return (shareURL + "" + encodeURIComponent(tweetText.replace("{word}", word)));
	},
	goToURL = function(url) {
		window.location = url;
	},
	level = psychometrick.words,
	step = 0,
	maxStep = 2,
	strings = [
		"Find a word above which best describes your mood right now. Use the buttons below to state the color of your chosen word.",
		"And for the second time; state the color of your chosen word.",
		"And again; for the third and final time.",
		"OK. Based on your answers; I'm able to build up a picture of the word you are <strong>most&nbsplikely</strong> to have chosen. See above."
	],
	timer,
	app = ROCK.JQUERY.createNode("div").attr("data-role", "app").appendTo("body"),
	handleGroup = function(group) {
		
		level = level.sandwich(group);

		if(step<maxStep) {

			level.each(function(item) {

				$("[data-key=\"" + item.key + "\"]").attr("data-group", item.group);

			});

		}
		else {

			// console.log(level);
			
			var 
			picked = level.getPicked();
			
			timer = setTimeout(function() {

				$("[data-role=\"tag\"]").attr("data-action", "fade-out");
				$("[data-key=\"" + picked.key + "\"]").attr("data-action", "");
				
				timer = setTimeout(function() {
					text.html(shareHTML.replace("{url}", getShareURL(picked.word)).replace("{text}", shareText.replace("{tweet}", tweetText.replace("{word}", picked.word))));
				}, 3000);
				
			}, 5000);

			buttons.attr("data-action", "hide");

		};

		step ++;
		text.html(strings[step]);

	},
	text = ROCK.JQUERY.createNode("div").attr("data-role", "text").appendTo(app).html(strings[step]),
	buttons = ROCK.JQUERY.createNode("div").attr("data-role", "buttons").appendTo(app),
	group0_button = createButton().attr("data-group", "0").html("red").appendTo(buttons).on("click", function() {
		
		handleGroup(0);
		return false;

	}),
	group1_button = createButton().attr("data-group", "1").html("green").appendTo(buttons).on("click", function() {

		handleGroup(1);
		return false;

	}),
	group2_button = createButton().attr("data-group", "2").html("blue").appendTo(buttons).on("click", function() {

		handleGroup(2);
		return false;

	});

	level.toHTML().prependTo(app);

})();