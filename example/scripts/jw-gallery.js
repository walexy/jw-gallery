$.ajaxSetup({cache:false});

// Write the video and source tags into the DOM
var setPlayer = function( json, videosIndex,sessionsIndex, autostart ){
	var html = [];
	var vidTag = document.createElement('video');
	var sourceTag = document.createElement('source');
	var theServer = json[videosIndex].sessions[sessionsIndex].server;
	var theVideo = json[videosIndex].sessions[sessionsIndex].file;
	var thePoster = json[videosIndex].sessions[sessionsIndex].poster;
	$("#myplayer_jwplayer").remove();
	$("#videoPlayer").html(vidTag);
		
	//	<video id='myplayer' width='425' height='320'
	//		poster='http://" + theServer + "/" + thePoster + ".jpg'
	//		autoplay>
	//		<source src='http://" + theServer + "/" + theVideo + ".mp4'
	//		type='video/mp4' />
	//	</video>
		$(vidTag).attr('id','myplayer')
		.attr('src',"http://" + theServer + "/" + theVideo + ".mp4")
		.attr('poster',"http://" + theServer + "/" + thePoster + ".jpg")
		.attr('width','425')
		.attr('height','320')
	//	html.push("<source src='http://" + theServer + "/" + theVideo + ".ogv' type='video/ogg' />");
		
		$(vidTag).append(html.join(''));
		html = [];
		
	showVideo( json, videosIndex, sessionsIndex, autostart );
}

// Skin and and intitialize the JWPlayer
var showVideo = function(json, videosIndex, sessionsIndex, autostart){
		var theServer = json[videosIndex].sessions[sessionsIndex].server;
		var theVideo = json[videosIndex].sessions[sessionsIndex].file;
		$('#myplayer').jwplayer({
		    flashplayer:'/mediaplayer-html5/player.swf',
		    skin:'/mediaplayer-html5/five/five.xml',
		    autostart:autostart
                //  Enable line below for RTMP streaming
		//  file:'streamer=rtmp://' + theServer + '&file='+ theVideo + '.mp4&type=rtmp'
		});
}

// Create Playlist
var createPlaylist = function (json){
	var html = [];
	var sn;
	var tmb;
	var index;
	var iLen = json.length;
	
	for( var i = 0; i < iLen; i++ ){
		sn = "sn" + i;
		
		html.push( "<div id='catIndex-"+ i + "' class='scroller'>" );
		html.push("<hr /><h2>" + json[i].categoryLabel);
		html.push("</h2>");
		html.push( "<div class='scroll-container grid_15 alpha'><ul>");
		
		var iiLen = json[i].sessions.length;
		var ii;
		for ( ii = 0; ii < iiLen; ii++ ){
			var theServer = json[i].sessions[ii].server;
			var theVideo = json[i].sessions[ii].file;
			var theName = json[i].sessions[ii].name;
			var conCatIds = i + "-" + ii;
			tmb = "tmb" + conCatIds;
			indexID = "index-" + conCatIds;
			
			// If item is the very first or first in set then add alpha class. Else add no alpha.
			var thumbClass = ((ii == 0) || ( ii % 5 == 0 ))  ? "grid_3 thumb alpha " :  "grid_3 thumb ";
			
			// If item is last in set, 5th, or the very last, but not the very first, then add omega class. Else keep last value.
			thumbClass = ( ( ii + 1 ) % 5 == 0 ) || ( ( ii > 4 ) && ( ii  == ( iiLen - 1 ) ) ) ? "grid_3 thumb omega " : thumbClass;
			
			html.push( "<li class='" + thumbClass + tmb + "'>" );
			html.push( "<div class='description'><strong>Video: </strong>" );
			html.push( "<a id='" + indexID + "'" );
			html.push( "' class='load-video' href='http://" + theServer + "/"+ theVideo + "'>" + theName + "</a>" );
			html.push( "</div>" );
			html.push( "</li>" );
		}
		 // Closing div
		 html.push("</ul></div>");
		 html.push("</div>");
		 $("#videoList").append(html.join(''));
		 html = [];
		 
		 //Scroller
		 if (ii > 4) {
			 var ex = ( ii % 5 ) == 0 ? 4 : Math.abs( ( ii % 5 ) - 1 ); // this determines the correct value for exclude param.
			 											 				// One less then viewable items
			 
			 html.push("<span class='scrollnav " + sn + "'>");
			 html.push("<a href='#' class='prev'>prev</a><a href='#' class='next'>next</a>");
			 html.push("</span>");
			 $('#catIndex-' + i).append(html.join(''));
			 html = [];
			 $('#catIndex-' + i + ' .scroll-container').serialScroll({
				items:'li',
				prev:'span.' + sn + ' a.prev',
		        next:'span.' + sn + ' a.next',
		        start:0,
		        step:5,
		        duration:600,
		        force:true,
		        lazy:true,
		        cycle:true,
		        exclude: ex
			});
		}
	}
	
	// Click handler for playlist
	$("#videoList .scroller").click( function(e){
		var el = $(e.target);
		if ((el.attr("class") == "load-video" ) && !(el.attr("class") == "active-vid" )) {
			// Gather the id attribute from the clicked target element
			// and split it's value to retrieve category
			// and video index numbers
			var vidIndex = el.attr('id');
			var splitIDs = vidIndex.split("-");
			var catNum = splitIDs[1];
			var vidNum = splitIDs[2];
			
			var deactivatedEl = $('#videoList ul').find('div.active-vid');
			
			var activatedEl = el.closest('li');
			var activeVid = $("<div class='active-vid' />").hide();
			activatedEl.append( activeVid );
			$('div.active-vid').animate({
				opacity:'toggle'
			},420,function(){
				deactivatedEl.parent().find('a').removeClass('active-vid');
				deactivatedEl.remove();
				el.addClass('active-vid');
				
			});
			showNext(catNum,vidNum, true);
			return false;
		}
		return false;
	});
}

// We've retrieved the index numbers from the click event
// now let's load the selected video into the player
function showNext( videosIndex, sessionsIndex, autoplay ) {
	$.getJSON('/data/video.js', processNext);
	function processNext(json){
		var theServer = json[videosIndex].sessions[sessionsIndex].server;
		var theVideo = json[videosIndex].sessions[sessionsIndex].file;
		var thePoster = json[videosIndex].sessions[sessionsIndex].poster;
	    if (( $( 'param' ).length > 0) || ( $( 'embed[flashvars *= rtmp ]' ).length > 0)){
	    	setPlayer( json, videosIndex, sessionsIndex, true);
	    }else{
	    	var theVidSrc = "http://"+ theServer + "/" + theVideo + ".mp4";
	    	var thePosterSrc = "http://"+ theServer + "/" + thePoster + ".jpg";
	    	playThis( theVidSrc, thePosterSrc );
	    }
	 } 
}

function playThis( vid, poster ){
	var videoTag = document.getElementsByTagName('video')[0];
	videoTag.src = vid;
	videoTag.poster = poster;
	$('#myplayer_displayImage')
		.css({
			'background-image':'url(' + poster + ')',
			'display': 'block'
		})
		.fadeTo(200,1)
		.delay(2000)
		.fadeTo(600,0, function(){
			$(videoTag).css('display', 'block');
		});
	videoTag.load();
	videoTag.play();
}

// Init
$(window).load( function(){
	$.getJSON('/data/video.js', function(json){
			setPlayer(json, 0, 0, false);
			createPlaylist(json);
		}
	);
});
