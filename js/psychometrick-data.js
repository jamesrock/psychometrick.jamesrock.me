(function() {

	psychometrick = new ROCK.Psychometrick();

	var
	moods = [
		"JOLLY",
		"CRANKY",
		"CONTENT",
		"BUBBLY",
		"BORED",
		"CHEERY",
		"TIRED",
		"LIVELY",
		"EXCITED",
		"HAPPY",
		"CONCERNED",
		"UNHAPPY",
		"UPSET",
		"SLEEPY",
		"ANXIOUS",
		"WORRIED",
		"SPLENDID",
		"GROGGY",
		"MIFFED",
		"SAD",
		"CALM",
		"RUBBISH",
		"CHEERFUL",
		"RELAXED",
		"CHIRPY",
		"THRILLED",
		"CAREFREE"
	],
	target = moods,
	loop = target.length;

	while(loop--) {

		psychometrick.words.append(new ROCK.Psychometrick.Word(target[loop]));

	};

})();
