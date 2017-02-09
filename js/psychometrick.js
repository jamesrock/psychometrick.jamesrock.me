(function() {

	var StackItem = ROCK.Object.extend({
		constructor: function StackItem(word, group, key) {
		
			this.word = word;
			this.group = group;
			this.key = key;
			
		}
	});

	ROCK.Psychometrick = ROCK.Object.extend({
		constructor: function Psychometrick() {
	
			this.words = new ROCK.Psychometrick.Stack(this);
			
		}
	});

	ROCK.Psychometrick.Word = ROCK.Object.extend({
		constructor: function Word(word) {
	
			this.word = word;
			this.key = ROCK.GUID.get();
			
		}
	});

	ROCK.Psychometrick.Stack = ROCK.Collection.extend({
		constructor: function Stack(psychometrick) {

			this.psychometrick = psychometrick;

		},
		toHTML: function() {
		
			var 
			_return = ROCK.JQUERY.createNode("div").attr("data-role", "tags");

			this.each(function(item) {

				ROCK.JQUERY.createNode("div").attr("data-role", "tag").attr("data-key", item.key).attr("data-group", item.group).html(item.word).appendTo(_return);

			});
			
			return _return;

		},
		append: function(item) {
		
			if(this.groupIndex===2) {
				this.groupIndex = -1;
			};

			this.groupIndex = (this.groupIndex+1);

			if(typeof(item)==="string") {
				this.push(new StackItem(this.psychometrick.words.getItemByKeyValue("key", item).word, this.groupIndex, item));				
			}
			else {
				this.push(new StackItem(item.word, this.groupIndex, item.key));
			};

		},
		sandwich: function(index) {

			var
			output = new ROCK.Psychometrick.Stack(this.psychometrick),
			pile0 = this.filter(function(item) {
				return item.group===0;
			}),
			pile1 = this.filter(function(item) {
				return item.group===1;
			}),
			pile2 = this.filter(function(item) {
				return item.group===2;
			});

			if(index===0) {
				pile2.each(function(item) {
					output.append(item.key);
				});
				pile0.each(function(item) {
					output.append(item.key);
				});
				pile1.each(function(item) {
					output.append(item.key);
				});
			}
			else if(index===1) {
				pile2.each(function(item) {
					output.append(item.key);
				});			
				pile1.each(function(item) {
					output.append(item.key);
				});
				pile0.each(function(item) {
					output.append(item.key);
				});
			}
			else if(index===2) {
				pile0.each(function(item) {
					output.append(item.key);
				});
				pile2.each(function(item) {
					output.append(item.key);
				});
				pile1.each(function(item) {
					output.append(item.key);
				});
			};

			return output;

		},
		getPicked: function() {

			var
			x = this.length,
			y = ((x+1)/2);
			
			y = (y-1);

			return this[y];

		},
		groupIndex: -1,
		psychometrick: null
	});

})();