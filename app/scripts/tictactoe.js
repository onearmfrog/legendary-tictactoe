(function() {
    function TicTacToe() {
        
		// Define a constructor, keeping all default game values
		
        function $(element) {
            return document.querySelector(element);
        }
        this.gameRunning = false;
        this.playerSymbol = ["X", "O"];
        this.currentPlayer = 1;
        this.gridWidth = 3;
        this.gridHeight = 3;
        this.win = false;
		// Start the game with an empty array representing the grid, which is 3x3, meaning 9 array positions.
		this.gameArray = [0,0,0,0,0,0,0,0,0];
		// An array containing all winning positions to be looped over when checking for a win.
		this.winArr = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0, 4, 8], [2, 4, 6]];
        this.$gameParent = $('#ticTacToe');
		this.$newGameBtn = $('#new-game-btn');
		this.$currentPlayerTxt = $('#current-player-val');
    }
    TicTacToe.prototype = {
        generateGrid: function(width, height) {
            var gameTable = document.createElement("table"),
			tr, 
			td,
			position = 0;
            
            width = this.gridWidth;
            height = this.gridHeight;
            
			// Loop over the grid values and build a table with rows and cells,
			// keep a position var for reference to the element's position
			// (we don't want the dom for this)
            for (var i, i = 0; i < height; i++) {
                tr = document.createElement("tr");
                gameTable.appendChild(tr);
                for (var j = 0; j < width; j++){
                    td = document.createElement("td");
					td.position = position;
                    tr.appendChild(td);
                    this.cellHandler(td);
					position++;
                }
            }
            
            this.$gameParent.innerHTML = '';
			this.$gameParent.appendChild(gameTable);
        },
        cellHandler: function(element){
			// Handle all cell clicks - if the cell is empty, add the current player's symbol,
			// check for win, if no win - switch to the second player.
			var _that = this;
            element.addEventListener("click", function(e){
				if (_that.gameRunning){
					if (element.innerHTML == ""){
						element.innerHTML = "<span>" + _that.playerSymbol[_that.currentPlayer - 1] + "</span>";
						_that.gameArray[element.position] = _that.currentPlayer;
						if (_that.checkWinState()){
							alert("player " + _that.currentPlayer + " wins!!");
							_that.gameRunning = false;
							return;
						}
						_that.currentPlayer++;
						_that.currentPlayer = (_that.currentPlayer == 3) ? 1 : _that.currentPlayer;
						_that.$currentPlayerTxt.innerHTML = _that.currentPlayer;
					}				
				}
            }, false);
        },
		checkWinState: function(){
			// Simple loop over the win array, check if any of the winning positions exist in the user's array -
			// For example, if the user array looks like this: [1,1,1,2,2,0,2,0,0]
			// there is a win here since we have [0,1,2] positions set as winning positions.
			// We know who the winner is since we know who last played.
			_that = this;
			for (var i = 0; i < this.winArr.length; i++){
				if((this.gameArray[this.winArr[i][0]] == 1 && this.gameArray[this.winArr[i][1]] == 1 && this.gameArray[this.winArr[i][2]] == 1) ||
				   (this.gameArray[this.winArr[i][0]] == 2 && this.gameArray[this.winArr[i][1]] == 2 && this.gameArray[this.winArr[i][2]] == 2)){
					this.win = true;
				};
			};

			return this.win;
		},
		navHandler: function(){
			this.$newGameBtn.addEventListener("click", function(){
				var TicTacToeGame = new TicTacToe();
				TicTacToeGame.initGame();	
			});
			this.$currentPlayerTxt.innerHTML = this.currentPlayer;
			
		},
        initGame: function() {
		// Generate a grid and set the game to running.
            this.generateGrid();
			this.navHandler();
            this.gameRunning = true;
        }
    }
    
    var TicTacToeGame = new TicTacToe();
    TicTacToeGame.initGame();
    
})();
