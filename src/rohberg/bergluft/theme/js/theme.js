$.fn.clicktoggle = function(a, b) {
    return this.each(function() {
        var clicked = false;
        $(this).click(function() {
            if (clicked) {
                clicked = false;
                return b.apply(this, arguments);
            }
            clicked = true;
            return a.apply(this, arguments);
        });
    });
};


$(document).ready(function(){
	var sitebrandingheight = $("body > header").outerHeight();
		
	// Tooltips
	// $('[data-toggle="tooltip"]').tooltip();
	$('a, img').not("#portal-logo a").tooltip(); // TODO drop title where Tooltips are not welcome
	
	// Anchors
	// anchors.add(".tileHeadline");
	
	// forms
	$("body.portaltype-easyform input[type='text'], body.portaltype-easyform textarea").addClass("form-control");
	
	// front-page: Click on blog post: add anchor
	$("body.section-front-page a.tile").click(function() {
		var href = $(this).attr("href");
		var anchor = href.split("/");
		anchor = anchor[anchor.length-1];
		var href_new = href.replace(anchor, "#"+anchor);
		window.location.assign(href_new);
		return false;
	});
	
	
	// *
	// scrolling
	var didScroll = false;
	var lastYPos = 0;
	var delta = 5;
	var minScrollDistance = $("body > header").offset().top;
		
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
		minScrollDistance = $(window).height();
	});
	
	// Front Page: on click on branding: scroll to content 
	$(".front_page").click(function() {
		var href = window.location.href;
		pos = href.indexOf("#");
		if (pos!=-1) {
			href = href.substring(0,pos);
		}
		// window.location.assign(href + "#intro");
		// todo: scroll slowly
		$('html, body').animate({
		      scrollTop:$("#intro").offset().top
		},'slow');
		return false;
	});
	
	// *
	// Load blog posts
	// *
	// Load content like sharing buttons?
	var getViewletBelowContent = true; // ($("body").find(".shareable").length>0);
	$(".tileFooter a, .tileHeadline a, .tileImage a").clicktoggle(
		function() {
			var href_raw = $(this).attr("href");
			var href = href_raw + " #parent-fieldname-text"; // only body and later viewlet-below-content
			var tileThing = $(this).parent();
			var article = tileThing.closest("article");
			var headline = article.find(".tileHeadline");
			var toScrollTo = article.offset().top - sitebrandingheight - headline.outerHeight();
			var moreLink = article.find(".tileFooter a");
			var title = article.find(".tileHeadline a").text();
		
			if (!article.hasClass("enriched")) { // check if content is already loaded
				article.find(".tileBody").after("<div class='tilePost'></div>");
				var tilePost = article.find(".tilePost");
				tilePost.hide().load(href, function( response, status, xhr ) {
				  if ( status == "success" ) {
					  article.addClass("enriched");
					  // load sharing buttons
			  		  var footer = moreLink.parent();
					  tilePost.children("div").attr("id", "");
					  footer.slideUp();
					  if (getViewletBelowContent) {
						  footer.load(href_raw + " .shariff2", function( response, status, xhr ) {
							  if( status =="success") {
								  article.find('.shariff2').each(function() {
									  if (!this.hasOwnProperty('shariff')) {
										  this.shariff = new Shariff(this);
										  $(this).addClass("shariff");
										  
										  // Todo: den folgenden Link zu den Kommentaren nur anzeigen, wenn die Diskussion global aktiviert ist.
										  var $li = $('<li class="shariff-button">').addClass("comments");
										  var $shareLink = $('<a target="_blank">')
										    .attr('href', href_raw+'#discussion');
										  $shareLink.append('<span class="fa fa-comments">');
										  $li.append($shareLink);
										  $(this).find("ul")
										  	.append($li);
									  }
								  });
							  }
						  });
					  };
					  tilePost.slideDown();
					  if (getViewletBelowContent) {
						  footer.slideDown();
					  };
					  // scroll up to make loaded content visible
					  $('html, body').animate({
		  					  scrollTop:toScrollTo
					  },'slow');
				  }
				});
			} else { // article already enriched
				var tilePost = article.find(".tilePost");
				tilePost.slideDown();
			};
			return false;
		},
		function() {
			var article = $(this).closest("article");
			var tilePost = article.find(".tilePost");
			tilePost.slideUp('slow');
			return false;
		}
	); // clicktoggle
	
	
	// if page called with anchor: on load of page: click link in anchor to open details 
	var href = window.location.href;
	var anchor = href.indexOf("#");
	if (anchor!=-1) {
		anchor = href.substring(anchor);
		link = $(anchor).find("a");
		if (link.length>0) {
			link[0].click();
		};
	  	$('html').animate({
	      scrollTop:$(anchor).offset().top - sitebrandingheight
	  	},'fast');

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
		// details.fadeOut();
		details.load(href, function( response, status, xhr ) {
			  if ( status == "success" ) {
				  // details.fadeIn();
				  $('html, body').animate({
				      scrollTop:details.offset().top - sitebrandingheight
				  },'slow');
			  }
		});
		return false;
	});
	
	// Cookie hint
	
	
	
});
