$(document).ready(function(){
		
	// Tooltips
	// $('[data-toggle="tooltip"]').tooltip();
	$('a, img').tooltip(); // TODO drop title where Tooltips are not welcome
	
	// Anchors
	// anchors.add(".tileHeadline");
	
	// forms
	$("body.portaltype-easyform input[type='text'], body.portaltype-easyform textarea").addClass("form-control");
	
	// front-page: Click on blog post: add anchor
	$("body.section-front-page a.tile").click(function() {
		var href = $(this).attr("href");
		var anchor = href.split("/");
		var anchor = anchor[anchor.length-1];
		var href_new = href.replace(anchor, "#"+anchor);
		window.location.assign(href_new);
		return false;
	});
	
	
	// *
	// scrolling
	var didScroll = false;
	var lastYPos = 0;
	var delta = 5;
	var minScrollDistance = $(window).height() * 0.80;
		
	function doWhenScrolledStartpage() {
		var yPos = $(window).scrollTop();

		if (Math.abs(lastYPos - yPos) > delta) {
			// scrolled downwards for at least minPixelToShowNLbox
			if (yPos > lastYPos && yPos > minScrollDistance) {
				// do stuff when scrolled at least minScrollDistance
				$(".site_branding").addClass("site_branding_scrolled");
			} else { //scrolled upwards
				// if(((yPos + $(window).height() < $(document).height())) {
				if (yPos + $(window).height() < $(document).height() && yPos < minScrollDistance) {
					// do stuff when scrolled upwards
					$(".site_branding").removeClass("site_branding_scrolled");
				}
			};
			lastYPos = yPos;
		};
	};
		
	function watchScrolling () {
		// on scroll, let the interval function know the user has scrolled
		$(window).scroll(function(event){
		  didScroll = true;
		});
		// run hasScrolled() and reset didScroll status
		setInterval(function() {
		  if (didScroll) {
			  if ($("body").hasClass("section-front-page")) {
			  	doWhenScrolledStartpage();
			  }
			  didScroll = false;
		  }
		}, 250);
	};
	
	watchScrolling();
	
	$(window).on('resize', function(){
		// watchScrolling depends on window height. So we recalculate height
		minScrollDistance = $(window).height() * 0.9;
	});
	
	// *
	// Load blog posts
	// *
	var sitebrandingheight = $("body > header").height();
	// Load content like sharing buttons?
	var getViewletBelowContent = ($("body").find(".shareable").length>0);
	$(".tileFooter a, .tileHeadline a, .tileImage a").click(function() {
		var href_raw = $(this).attr("href")
		var href = href_raw + " #parent-fieldname-text"; // only body and later viewlet-below-content
		var tileThing = $(this).parent();
		var article = tileThing.closest("article");
		var headline = article.find(".tileHeadline");
		var toScrollTo = article.offset().top - sitebrandingheight - headline.outerHeight();
		var moreLink = article.find(".tileFooter a");
		var title = article.find(".tileHeadline a").text();
		
		if (!article.hasClass("enriched")){ // check if content is already loaded
			article.find(".tileBody").after("<div class='tilePost'></div>");
			var tilePost = article.find(".tilePost");
			tilePost.hide().load(href, function( response, status, xhr ) {
			  if ( status == "success" ) {
				  article.addClass("enriched");
				  // load sharing buttons
		  		  var footer = moreLink.parent();
				  tilePost.children("div").attr("id", "");
				  footer.hide();
				  if (getViewletBelowContent) {
					  // footer.load(href_raw + " #viewlet-below-content", function( response, status, xhr ) {
					  footer.load(href_raw + " .shariff2", function( response, status, xhr ) {
						  if( status =="success") {
							  article.find('.shariff2').each(function() {
								  if (!this.hasOwnProperty('shariff')) {
									  this.shariff = new Shariff(this);
									  $(this).addClass("shariff");
								  }
							  });
						  }
					  });
				  };
				  tilePost.fadeIn("slow");
				  if (getViewletBelowContent) {
					  footer.fadeIn("slow");
				  };
				  // scroll up to make loaded content visible
				  $('html, body').animate({
	  					  scrollTop:toScrollTo
				  },'slow');
			  }
			});
		};
		return false;
	});
	
	
	// if page called with anchor: on load of page: click link in anchor to open details 
	var href = window.location.href;
	var anchor = href.indexOf("#");
	if (anchor!=-1) {
		anchor = href.substring(anchor);
		$(anchor).find("a")[0].click();
	};
	
	
	// // Social Media Sharing Buttons in Blog
	// $(".section-blog .tileFooter a").each(function() {
	// 	var href = $(this).attr("href");
	// 	var footer = $(this).parent();
	// 	shariff = '<div class="shariff2" data-url="' + href + '" data-lang="en" data-theme="white" data-services="[&quot;facebook&quot;,&quot;twitter&quot;,&quot;googleplus&quot;,&quot;linkedin&quot;,&quot;mail&quot;,&quot;info&quot;]"></div>'
	// 	footer.before(shariff);
	// });
	// initialize .shariff elements
	$('.shariff2').each(function() {
	    if (!this.hasOwnProperty('shariff')) {
	        this.shariff = new Shariff(this);
			$(this).addClass("shariff");
	    }
	});
	
	
	
	
	// Front-page: On Click of Card-Links: load content into section "details"
	// Criterium is class "inline_link"
	$("a.inline_link").click(function() {
		var href = $(this).attr("href") + " #content";
		details = $(".details_inner");
		details.fadeOut("slow");
		details.load(href, function( response, status, xhr ) {
			  if ( status == "success" ) {
				  details.fadeIn("slow");
				  $('html, body').animate({
				      scrollTop:details.offset().top - 140
				  },'slow');
			  }
		});
		return false;
	});


	// Cookie hint
	
	
	
})
