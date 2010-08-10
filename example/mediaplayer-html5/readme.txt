JW Player for HTML5 Readme
==========================

Thanks for downloading the beta release of our JW Player for HTML5! This player fully skinnable and configurable and based on the new <video> tag found in HTML5. It is built using javascript (jQuery) and includes a seamless fallback to the popular JW Player for Flash.

Currently, the HTML5 player is in beta. Certain functionalities that we consider essential are missing in this beta version, but will be included in the 1.0 release. We very much value your feedback (both bug reports and feature suggestions), so please let us know!

http://www.longtailvideo.com/support/forums/jw-player



License
-------

The JW Player for HTML5 will be released under an open source license, but we have not yet determined the license model to be used. In the interim, it is available under JW Player Personal Use and Evaluation License (PUEL). See the license.txt file in the same directory as this readme for more info.

Under the terms of this license it can be used on a website for personal, educational, demonstration, or evaluation purposes.

Note that using the JW Player for HTML5 does not affect the licensing terms for the JW Player for Flash if you are using the flash fallback.



Getting started
---------------

To quickly get started, upload the contents of this ZIP to your webserver. Include the two javascripts in the <head> of your page(s). For example:

  <script type="text/javascript" src="jquery.js"></script>
  <script type="text/javascript" src="jquery.jwplayer.js"></script>

Second, place this code where you want the video to appear, replacing the "poster" and "src" attributes with your own poster image and video:

  <video height="270" id="player" poster="image.jpg" src="video.mp4" width="480">

  <script type="text/javascript">
    $('#player').jwplayer({
      flashplayer:'player.swf',
      skin:'five/five.xml'
    });
  </script>

Make sure that all references (the two javascript files, your image and video, the player.swf and all files in the skin) are correct!



Documentation
-------------

For more example setups and a complete reference of this player, visit the HTML5 Player section of our support website:

http://www.longtailvideo.com/support/jw-player/jw-player-for-html5/

Our support website also includes a forum. Please let us know if you run into any issues or have suggestions for enhancements:

http://www.longtailvideo.com/support/forums/jw-player



Developers
----------

Developers interested in modifying and/or contributing to the player should refer to the HTML5 Player section of our developer website:

http://developer.longtailvideo.com/trac/wiki/HTML5Overview

This page contains more info about the player's internal architecture. It also contains references for compiling and testing the player.



