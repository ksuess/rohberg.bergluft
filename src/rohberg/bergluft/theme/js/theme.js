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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            var returnvalue = c.substring(name.length, c.length);
			return returnvalue;
        }
    }
    return "";
};

$(document).ready(function(){
	var sitebrandingheight = $("body > header").outerHeight();
		
	// Tooltips
	// $('[data-toggle="tooltip"]').tooltip();
	$('a, img').not("#portal-logo a").not(".newsImage")
		.tooltip();
	
	// Anchors
	// anchors.add(".tileHeadline");
	
	
	// forms of package easyform
	$("body.portaltype-easyform input[type='text'], body.portaltype-easyform textarea").addClass("form-control");
	
	// front-page: Click on blog post: add anchor and open blog with post
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
	
	// end // scrolling
	
	
	// show gigantic header image once and then hide for 7 days, if cookie can be set
	// 1. No gigantic header if cookie cannot be set
	// 2. Gigantic header if no cookie is found but can be set
	var showGiganticHeader = getCookie("showGiganticHeader");
	if (showGiganticHeader=="") {
		setCookie("showGiganticHeader", "1", 7);		
	};
	showGiganticHeader = getCookie("showGiganticHeader");
	if (showGiganticHeader=="1") {
		// show gigantic header
		// and set cookie to hide gigantic header for 7 days
		setCookie("showGiganticHeader", "0", 7);
	} else {
		// hide gigantic header image by scrolling
		$('html, body').animate({
		      scrollTop:$("#action_header").offset().top
		},'slow');
	};	
	
	
	// Front Page: on click on branding: scroll to content 
	$(".front_page").click(function() {
		var href = window.location.href;
		pos = href.indexOf("#");
		if (pos!=-1) {
			href = href.substring(0,pos);
		}
		// window.location.assign(href + "#action_header");
		$('html, body').animate({
		      scrollTop:$("#action_header").offset().top
		},'slow');
		return false;
	});
	
	// *
	// Load blog posts details
	// *
	// Load content like sharing buttons?
	var getViewletBelowContent = true; // ($("body").find(".shareable").length>0);
	$(".tileFooter a, .tileHeadline a, .tileImage a").click(
		function() {
			var href_raw = $(this).attr("href");
			var href = href_raw + " #parent-fieldname-text"; // only body and later viewlet-below-content
			var tileThing = $(this).parent();
			var article = tileThing.closest("article");
			
			var moreLink = article.find(".tileFooter a");
			var title = article.find(".tileHeadline a").text();
			
			if (!article.hasClass("clicked")) { // open article
				article.addClass("clicked");
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
											  if (response.indexOf("commenting") !== -1) {
												  var $li = $('<li class="shariff-button">').addClass("comments");
												  var $shareLink = $('<a>')
												    .attr('href', href_raw+'#discussion');
												  $shareLink.append('<span class="fa fa-comments">');
												  $li.append($shareLink);
												  $(this).find("ul")
												  	.append($li);
											  }
										  }
									  });
								  }
							  });
							};
							// load categories
							$('<div class="tileCategories"></div>').load(href_raw + " #category", function(response, status, xhr){
								if (status=="success") {
									tilePost.after($(this));
								};
							});
							tilePost.slideDown("slow", function(){
								if (getViewletBelowContent) {
									footer.slideDown();
								};
								// scroll up to make loaded content visible
								var cb = article.find(".card-block");
								cb = (cb.length==0) ? article : cb;
								var toScrollTo = cb.offset().top - sitebrandingheight;
								// console.log("show article"); console.log(cb.offset().top); console.log(sitebrandingheight);
								// console.log(toScrollTo);	article.css("background-color", "rgb(239, 223, 243)");
								$('html, body').animate({
									 scrollTop:toScrollTo
								},'slow');
							});
					  }
					});
				} else { // article already enriched
					var tilePost = article.find(".tilePost");
					tilePost.slideDown("slow", function(){
						// scroll up to make loaded content visible
						var cb = article.find(".card-block");
						cb = (cb.length==0) ? article : cb;
						var toScrollTo = cb.offset().top - sitebrandingheight;
						// console.log("show article"); console.log(cb.offset().top); console.log(sitebrandingheight);
						// console.log(toScrollTo);	article.css("background-color", "rgb(239, 223, 243)");
						$('html, body').animate({
							 scrollTop:toScrollTo
						},'slow');		
					});		
				};
				return false;
			} else { // close article
				article.removeClass("clicked");
				var article = $(this).closest("article");
				var tilePost = article.find(".tilePost");
				tilePost.slideUp('slow');
				return false;
			};
		}
	); // click
	
	
	// if page called with anchor: on load of page: click link in anchor to open details 
	var href = window.location.href;
	var anchor = href.indexOf("#"); // TODO: window.location.hash
	if (anchor!=-1) {
		anchor = href.substring(anchor);
		var anchor_jq = $(anchor);
		anchor_jq = (anchor_jq.length==0 && anchor=="#discussion") ? $("#commenting") : anchor_jq;
		if (anchor_jq.length>0) {
			link = anchor_jq.filter(".tileHeadline").find("a");
			if (link.length>0) {
				link[0].click();
			};
		  	$('html, body').animate({
		      scrollTop:anchor_jq.offset().top - sitebrandingheight
		  	},'fast');
		}

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
