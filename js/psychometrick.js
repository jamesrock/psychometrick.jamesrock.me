(function() {

	ROCK.Psychometrick = ROCK.Object.extend({
		constructor: function Psychometrick() {

			this.words = new ROCK.Psychometrick.Stack(this);

		}
	});

	ROCK.Psychometrick.StackItem = ROCK.Object.extend({
		constructor: function StackItem(word, group, key) {

			this.word = word;
			this.group = group;
			this.key = key;

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
			_return = ROCK.DOM.createNode("div"),
			node;

			_return.setAttribute("data-role", "tags");

			this.each(function(item) {

				node = ROCK.DOM.createNode("div");

				node.setAttribute("data-role", "tag");
				node.setAttribute("data-key", item.key);
				node.setAttribute("data-group", item.group);
				node.innerHTML = item.word;
				_return.appendChild(node);

			});

			return _return;

		},
		append: function(item) {

			if(this.groupIndex===2) {

				this.groupIndex = -1;

			};

			this.groupIndex ++;

			if(typeof(item)==="string") {

				this.push(new ROCK.Psychometrick.StackItem(this.psychometrick.words.getItemByKeyValue("key", item).word, this.groupIndex, item));

			}
			else {

				this.push(new ROCK.Psychometrick.StackItem(item.word, this.groupIndex, item.key));

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

			switch(index) {
				case 0:

					pile2.each(function(item) {
						output.append(item.key);
					});
					pile0.each(function(item) {
						output.append(item.key);
					});
					pile1.each(function(item) {
						output.append(item.key);
					});

				break;
				case 1:

					pile2.each(function(item) {
						output.append(item.key);
					});
					pile1.each(function(item) {
						output.append(item.key);
					});
					pile0.each(function(item) {
						output.append(item.key);
					});

				break;
				case 2:

					pile0.each(function(item) {
						output.append(item.key);
					});
					pile2.each(function(item) {
						output.append(item.key);
					});
					pile1.each(function(item) {
						output.append(item.key);
					});

				break;
			};

			return output;

		},
		getPicked: function() {

			return this[13];

		},
		groupIndex: -1,
		psychometrick: null
	});

})();
