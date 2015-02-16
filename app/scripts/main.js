




var x = {

	data:[],

	initApp:function(){


		x.hideNShow();
		x.getHanziData();
		x.bindHandlers();

	},

	getHanziData:function(){
		var _this = this;
		$.getJSON( 'data/hanzi2715.json', function( data ) {
		  	_this.data = data['hanzi2715'];

		  	console.log(_this.data);
  	    });
	},

	hideStartMenu:function(){
		$('.jumbotron').hide();
		
	},

	hideNShow:function(){
		$('#app-navigation').hide();
		$('#learningboard').hide();
	},

	getRandomCharacter:function(){

		var t = this;
		var chars = [new t.CharacterModel('我','I / me, character refering to 1. person','wǒ'),
					 new t.CharacterModel('人','person / human','rén'),
					 new t.CharacterModel('你','you, character refering to 2. person','nǐ')];

					 var rand = Math.round(Math.random()*(t.data.length-1));

		return  t.data[rand];

	},


	// This function can be used to flip around the language data
	// depending on if the users wants to learn characters or guess tones or
	// whatever, using a string flag..
	pushCharacterToBoard:function(chardata){
		var d = chardata;

		// Build up html for the data.
		var html_char = '<span class="board_char">'+d.char+'</span>';
		var html_translation ='<span class="board_translation">'+d.translation+'</span>';
		//var html_pinyin = "<span class='board_pinyin'>"+d.pinyin+"</span>"
		var $html = html_char+/*html_pinyin+*/html_translation;
		    
		    

		$('#learningboard').html($html);
	},


	/*****
	*
	*		MODELS FOR DATA...
	*
	*
	* ** ** * *** * **/

	// A SIMPLE MODEL FOR A CHARACTER.
	CharacterModel:function(char,translation,pinyin){
		var obj = {};
		obj.char = char;
		obj.translation = translation;
		obj.pinyin = pinyin;
		return obj;
	},

	/**
	*
	*		HANDLERS FOR BUTTONS / UI.
	*
	* **** **
	* **** ** **  **/


	bindHandlers:function(){
		var t = this;
		$(document).on('click','#startbutton',function(){
			t.hideStartMenu();
			var data = t.getRandomCharacter();
			$('#app-navigation').show();

			t.pushCharacterToBoard(data);
			$('#learningboard').show();
		});

		$(document).on('click','#appnav_nextbutton',function(){
			var data = t.getRandomCharacter();
			t.pushCharacterToBoard(data);
		});

	},

};









// JQUERY BOILERPLATE.
$(document).ready(function(){
	x.initApp();
});