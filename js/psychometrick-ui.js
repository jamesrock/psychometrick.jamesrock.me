(function() {

	var
	query = function(selector, callback) {

		ROCK.ARRAY.each(document.querySelectorAll(selector), callback);

	},
	createButton = function(txt, group, clickHandler) {

		var
		node = ROCK.DOM.createNode("a");

		node.setAttribute("href", "#");
		node.setAttribute("data-role", "button");
		node.setAttribute("data-group", group);
		node.addEventListener("click", clickHandler);
		node.innerHTML = txt;

		return node;

	},
	handleGroup = function(group) {

		level = level.sandwich(group);

		if(step<maxStep) {

			level.each(function(item) {

				query("[data-key=\"" + item.key + "\"]", function(node) {

					node.setAttribute("data-group", item.group);

				});

			});

		}
		else {

			var
			picked = level.getPicked();

			timer = setTimeout(function() {

				query("[data-role=\"tag\"]", function(node) {

					node.setAttribute("data-action", "fade-out");

				})

				query("[data-key=\"" + picked.key + "\"]", function(node) {

					node.setAttribute("data-action", "");

				});

				timer = setTimeout(function() {

					text.innerHTML = shareHTML.replace("{url}", getShareURL(picked.word)).replace("{text}", shareText.replace("{tweet}", tweetText.replace("{word}", picked.word)));

				}, 3000);

			}, 5000);

			buttons.setAttribute("data-action", "hide");

		};

		step ++;
		text.innerHTML = strings[step];

	},
	getShareURL = function(word) {

		return (shareURL + "" + encodeURIComponent(tweetText.replace("{word}", word)));

	},
	goToURL = function(url) {

		window.location = url;

	},
	tweetText = "Wow! PSYCHOMETRICK could tell I'm feeling {word}!",
	shareURL = ("http://twitter.com/share?&text="),
	shareHTML = "<a href=\"{url}\">{text}</a>",
	shareText = "Tweet \"{tweet}\"",
	level = psychometrick.words,
	step = 0,
	maxStep = 2,
	strings = [
		"Find a word above which best describes your mood right now. Use the buttons below to state the colour of your chosen word.",
		"And for the second time; state the colour of your chosen word.",
		"And again; for the third and final time.",
		"OK. Based on your answers; I'm able to build-up a picture of the word you are <strong>most&nbsplikely</strong> to have chosen. See above..."
	],
	timer,
	app = ROCK.DOM.createNode("div"),
	text = ROCK.DOM.createNode("div"),
	buttons = ROCK.DOM.createNode("div"),
	group0_button = createButton("red", "0", function(event) {

		event.preventDefault();
		handleGroup(0);

	}),
	group1_button = createButton("green", "1", function(event) {

		event.preventDefault();
		handleGroup(1);

	}),
	group2_button = createButton("blue", "2", function(event) {

		event.preventDefault();
		handleGroup(2);

	});

	buttons.appendChild(group0_button);
	buttons.appendChild(group1_button);
	buttons.appendChild(group2_button);

	app.setAttribute("data-role", "app");
	document.body.appendChild(app);

	app.appendChild(level.toHTML());

	text.setAttribute("data-role", "text");
	text.innerHTML = strings[step];
	app.appendChild(text);

	buttons.setAttribute("data-role", "buttons");
	app.appendChild(buttons);

})();
