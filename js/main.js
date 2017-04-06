(function(n){n.viewportSize={},n.viewportSize.getHeight=function(){return t("Height")},n.viewportSize.getWidth=function(){return t("Width")};var t=function(t){var f,o=t.toLowerCase(),e=n.document,i=e.documentElement,r,u;return n["inner"+t]===undefined?f=i["client"+t]:n["inner"+t]!=i["client"+t]?(r=e.createElement("body"),r.id="vpw-test-b",r.style.cssText="overflow:scroll",u=e.createElement("div"),u.id="vpw-test-d",u.style.cssText="position:absolute;top:-1000px",u.innerHTML="<style>@media("+o+":"+i["client"+t]+"px){body#vpw-test-b div#vpw-test-d{"+o+":7px!important}}<\/style>",r.appendChild(u),i.insertBefore(r,e.head),f=u["offset"+t]==7?i["client"+t]:n["inner"+t],i.removeChild(r)):f=n["inner"+t],f}})(this);

( function( $ ) {
	
	// Setup variables
	$window = $(window);
	$slide = $('.homeSlide');
	$slideTall = $('.homeSlideTall');
	$slideTall2 = $('.homeSlideTall2');
	$body = $('body');
	htmlbody = $('html,body');
	var duration = 500;
	

    //FadeIn all sections   
	$body.imagesLoaded( function() {
		setTimeout(function() {
		      
		      // Resize sections
		      adjustWindow();
		      
		      // Init navigation
		      initHomepageNav();
		      
		      // Fade in sections
			  $body.removeClass('loading').addClass('loaded');
			  
		}, 800);
	});
	
	function adjustWindow(){
		
		// Init Skrollr
		var s = skrollr.init({
		    forceHeight: false,
		    render: function(data) {
		    
		        //Debugging - Log the current scroll position.
		        //console.log(data.curTop);
		    }
		});
		
		// Get window size
	    winH = $window.height();
	    
	    // Keep minimum height 550
	    if(winH <= 550) {
			winH = 550;
		} 
	    
	    // Resize our slides
	    $slide.height(winH);
	    $slideTall.height(winH*2);
	    $slideTall2.height(winH*3);
	    
	    // Refresh Skrollr after resizing our sections
	    s.refresh($('.homeSlide'));
	    
	}

	function initHomepageNav(){
		
		var homeSlides = $('.homeSlide');
		var $slideContent = $('.hsContainer');
		var slidesCount = $(homeSlides).length;
		var activeSlide = 1;
		
		// Build HTML for Nav
		$('<div/>', {
		    'id' : 'slideNav'
		}).append($('<ul><li class="slideNavPrev"><a class="disabled" href="#" title="Go to previous slide"><span class="ico ico-up">↑</span></a></li><li><span id="activeSlide">'+activeSlide+'</span>/<span id="maxSlides">'+slidesCount+'</span></li><li class="slideNavNext"><a href="#" title="Go to next slide"><span class="ico ico-down">↓</span></a></li></ul>')).appendTo('body').delay(1200).fadeIn(duration);
		

		// Navigation highligting
		var $activeSlide = $('#activeSlide');
		var $maxSlides = $('#maxSlides');
		var $numberOfSlides = parseInt($maxSlides.text());
		var slideNavPrev = $('');
		var $slideNavNext = $('.slideNavNext');
		var $slideNavPrev = $('.slideNavPrev');	
		var $slideNavNextA = $('.slideNavNext a');
		var $slideNavPrevA = $('.slideNavPrev a');	
		
		// Highlight the section currently scrolling DOWN
		homeSlides.waypoint(function(direction) {
		  if (direction === 'down') {
		    var index = $(this).index();
			var index = index+1;
			$activeSlide.text(index);
			showHideNavItems();
		  }
		}, { offset: '50%' });
		
		// Highlight the section currently scrolling UP
		homeSlides.waypoint(function(direction) {
		  if (direction === 'up') {
			var index = $(this).index();
			var index = index+1;
			$activeSlide.text(index);
			showHideNavItems();
		  }
		}, {
		  offset: function() {
		    // This is the calculation that would give you
		    // "bottom of element hits middle of window"
		    return $.waypoints('viewportHeight') / 2 - $(this).outerHeight();
		  }
		});
		
		//Fade out unnecesary nav items
		function showHideNavItems(){
			var $activeSlideNumber = parseInt($activeSlide.text());
			
			if($activeSlideNumber == 1){
			
				$slideNavNextA.removeAttr('class');
				$slideNavPrev.animate({opacity: 0.25}).find('a').addClass('disabled');
				
			} else if ($activeSlideNumber == $numberOfSlides) {
			
				$slideNavPrevA.removeAttr('class');
				$slideNavNext.animate({opacity: 0.25}).find('a').addClass('disabled');
				
			} else {
			
				$slideNavNext.add($slideNavPrev).animate({opacity: 1});
				$slideNavNextA.add($slideNavPrevA).removeAttr('class');
				
			}
		}	
		
		//Next slide
		$slideNavNext.click(function (e) {
		    e.preventDefault();
		    var index = parseInt($activeSlide.text());
		    index++;
		    if(index <= $numberOfSlides){
		        
				$.fn.scroll(index);
		        
		    }
		});
		
		//Prev slide
		$slideNavPrev.click(function (e) {
		    e.preventDefault();
		    var index = parseInt($activeSlide.text());
		    index--;
		    if(index > 0){
		        
		        $.fn.scroll(index);
		        
		    }
		});
	    
	    
		$.fn.scroll = function scrollToSlide(slideId){
			
			// Custom slide content offset
		    var customSlideOffset = $("#slide-"+slideId).attr('data-content-offset');
		    
		    
		    // Scroll to the top of a container if it doesn't have custom offset defined
		    if(typeof customSlideOffset === 'undefined'){
		        
		        htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top) + 'px'},'slow');
		        
		    } else {
		        
		        // Convert percentage 'eg. 25p' into pixels
		        if(customSlideOffset.indexOf('p')!=-1) {
			       
			       var customSlideOffset = parseInt(customSlideOffset.split('p')[0]);
				   var slideHeight = $slide.height();
				   
				   customSlideOffset = Math.ceil((slideHeight/100) * customSlideOffset);
				   
				//    console.log(slideHeight +' '+ customSlideOffset);
				   
				   htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top + customSlideOffset) + 'px'},'slow');
			        
		        } else {
			       
			       var customSlideOffset = parseInt(customSlideOffset);
			    //    console.log(slideHeight +' '+ customSlideOffset);
				//    console.log(slideId);
			       htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top + customSlideOffset) + 'px'},'slow');
			        
		        }
		    
		    }
		}
	    
	    
	}


	// Highlight the top nav as scrolling occurs
    $('body').scrollspy({
		selector  : '.nav-link',
        // target: '.navbar-fixed-top',
        offset: 80
    })

	function filterPath(string) {
    return string
      .replace(/^\//,'')  
      .replace(/(index|default).[a-zA-Z]{3,4}$/,'')  
      .replace(/\/$/,'');
  	}
    $('a[href*=\\#]').each(function() {
    if (filterPath(location.pathname) == filterPath(this.pathname) &&
         location.hostname == this.hostname && this.hash.replace(/#/,'') ) {
        var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
        var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
        if ($target) {
        var targetOffset = $target.offset().top;
        $(this).click(function() {
        $("#nav li a").removeClass("active");
        $(this).addClass('active');
        //$('html, body').animate({scrollTop: targetOffset}, 1000);
        return false;
        });
		}
    }
    });
		
} )( jQuery );