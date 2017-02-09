(function() {
 
	psychometrick = new ROCK.Psychometrick();

	var
	moods = [
		"MERRY",
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
		"CRAPPY",
		"CHEERFUL",
		"CHILLED",
		"CHIRPY",
		"THRILLED",
		"CAREFREE"
	],
	target = moods,
	loop = target.length;
	
	// console.log(loop);

	while(loop--) {
		psychometrick.words.append(new ROCK.Psychometrick.Word(target[loop]));
	};

})();