jQuery(document).ready( function($){

      /* одинаковая высота блоков построчно */
      equalheight = function(container){

      var currentTallest = 0,
           currentRowStart = 0,
           rowDivs = new Array(),
           $el,
           topPosition = 0;
       $(container).each(function() {

         $el = $(this);
         $($el).height('auto')
         topPostion = $el.position().top;

         if (currentRowStart != topPostion) {
           for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
             rowDivs[currentDiv].height(currentTallest);
           }
           rowDivs.length = 0; // empty the array
           currentRowStart = topPostion;
           currentTallest = $el.height();
           rowDivs.push($el);
         } else {
           rowDivs.push($el);
           currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
         for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
           rowDivs[currentDiv].height(currentTallest);
         }
       });
      }

  /* Подгон высоты первого экрана */
    init();
    $(window).resize(function() { init(); });
    function init() {
        equalheight('.equalheight');
    }


    $(function(){
        var $hvh = $(window).height();
        $('.hvh').css( 'height', $hvh );
    });




/* Скроллинг, если ссылка на блок */
var DsBody = $('html, body');
 $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();

var target = $($.attr(this, 'href'));
setTimeout(function(){
    DsBody.stop().animate({
        scrollTop: target.offset().top
    }, 1000);
}, 300);

});


    /* мягкая прокрутка */
    SmoothScroll({
      stepSize: 75,
    });

// Карусели на странице работы
    workslider = $('.content .owl-carousel')
    workslider.owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      dots: false,
      navText: false
    });



// кнопка бургера
function toggleClassMenu() {
	var layout = document.querySelector(".burger-container");
	var icons = document.querySelector(".ds-mnu-btn");
	if(!layout.classList.contains("active")) {
		layout.classList.add("active");
		icons.classList.add("ds-mnu-open");
	} else {
		layout.classList.remove("active");
		icons.classList.remove("ds-mnu-open");
	}
}
var oppMenu = document.querySelector(".ds-mnu-btn");
oppMenu.addEventListener("click", toggleClassMenu, false);


  document.addEventListener( 'scroll', onDocumentScroll, false );
  //document.addEventListener( 'touchend', onDocumentScroll, false );
  function onDocumentScroll( event ) {
      
      
        var icons = document.querySelector(".ds-mnu-btn");
        var layout = document.querySelector(".burger-container");
        
        if ( layout.classList.contains("active") ) {
            
        var scroll = $(window).scrollTop();
         
            if ( scroll > 420 ) { 
                layout.classList.remove("active");
                icons.classList.remove("ds-mnu-open");
            }
            
        }
        
    }



$(function(){
    $('.progressive-image').each(function(){

    var image = new Image();
    var previewImage = $(this).find('.loadingImage');
    var newImage = $(this).find('.overlay');

    image.onload = function(){
        newImage.css('background-image', 'url(' + image.src + ')');
        newImage.css('opacity', '1');
    };
        image.src = previewImage.data('image');
    });
});


// TOOLTIP
    if ( $('.ds-tooltip').length > 0 && $(window).width() > 1024 ) {
        $('.ds-tooltip').tooltip({
            trigger : 'hover'
        });
    } 

// BTN RIPPLE
    (function(){
        document.addEventListener('click', function(e) {
            
            if (!e.target.classList.contains('ripple')) {
                return;
            }
                
            var ripple = e.target, ink = ripple.querySelector('.ripple__ink'), diameter;
                
            if (!ink) {
                ink = document.createElement('i');
                ink.classList.add('ripple__ink');
                
                diameter = Math.max(ripple.clientWidth, ripple.clientHeight);
                ink.style.width = diameter + 'px';
                ink.style.height = diameter + 'px';
                
                ['animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd'].forEach(function(eventName){
                    ink.addEventListener(eventName, function(){
                        ink.classList.remove('ripple__ink--animated');
                    });
                });
                
                ripple.insertBefore(ink, ripple.firstChild);
            } else {
                diameter = ink.clientWidth;
            }
                
                    ink.style.top = (e.offsetY - diameter/2) + 'px';
                    ink.style.left = (e.offsetX - diameter/2) + 'px';
                    
            ink.classList.remove('ripple__ink--animated');
            ink.width = ink.clientWidth + 'px';
            ink.classList.add('ripple__ink--animated');
        });
    }());
    
//CONTACT FORM VALUE
    jQuery(document).ready(function($){
    	// on focus
        $(".wpcf7-form .wpcf7-form-control").focus(function() {
            $(this).parent().siblings('label').addClass('has-value');
            $(this).attr("aria-invalid", "false");
            $(this).parent().siblings('.bar').addClass('hover-bar');
        });
            
        $(".wpcf7-form .wpcf7-form-control").focusout(function() {
            $(this).parent().siblings('.bar').removeClass('hover-bar');
        })
        
        // blur input fields on unfocus + if has no value
        .blur(function() {
            var text_val = $(this).val();
            if(text_val === "") {
                $(this).parent().siblings('label').removeClass('has-value');
            }
        });
    });

//REVIEW CAROUSEL
$('.review-carousel').owlCarousel({
    loop:true,
    dots: false,
    lazyLoad: true,
    lazyContent: true,
    autoplay: false,
    autoplayTimeout: 5000,
    nav:true,
    navText: [$('.am-prev'),$('.am-next')],
    items: 1,
    navContainer: '#ds-nav-wrap',
	onInitialized: function(){
		var t = this,
		    cloned = $('.owl-item.cloned').length / 2,
			currSlide = t._current + 1 - cloned,
			length = t._items.length;
			if (currSlide <= 9) {
			    currSlide = '0' + currSlide;
			}
			if (length <= 9) {
			    length = '0' + length;
			} 
			
		jQuery('<div class="slide-num"><span>' + currSlide + ' / ' + length + '</span></div>').insertAfter('#ds-nav-wrap .owl-prev');
	},
	onTranslate: function(){
		var t = this,
		    cloned = $('.owl-item.cloned').length / 2,
			currSlide = t._current + 1 - cloned,
			length = t._items.length;
			
			if (currSlide == 0) {
		        currSlide = length;
			}
    		if ( currSlide > length) {
    		    currSlide = '1';
    		}
			if (currSlide <= 9) {
			    currSlide = '0' + currSlide;
			}
			if (length <= 9) {
			    length = '0' + length;
			}
			
		jQuery('#ds-nav-wrap div.slide-num span').html(currSlide + ' / ' + length);
	}
    
});


//IMAGE ZOOM
if ( jQuery('img.zoom').length ) {
    mediumZoom( 'img.zoom', {
        scrollOffset: 0,
    });
}

//TITLE PARALAX SCROLL
if ( jQuery('.paroller').length ) {
    
    var pWidth = $(window).width();
    
    if ( pWidth > 767 && pWidth < 1200 ) {
        $(".paroller, [data-paroller-factor]").paroller({
            factor: 0.2,    
            type: 'foreground',
            direction: 'vertical'
        });    
    } else if ( pWidth > 1200 ) {
        $(".paroller, [data-paroller-factor]").paroller({
            factor: 0.3,    
            type: 'foreground',
            direction: 'vertical'
        }); 
    } else {    
        $(".paroller, [data-paroller-factor]").paroller({
            factor: 0.15,            // multiplier for scrolling speed and offset
            type: 'foreground',     // background, foreground
            direction: 'vertical' // vertical, horizontal
        });
    }
}


//CF7 REDIRECT
document.addEventListener( 'wpcf7mailsent', function( event ) {
    location = '/thankyou/';
}, false );





// use this
var NsDefaultPort = ($(window).width() > $(window).height())? 90 : 0;
if (NsDefaultPort === 90) {
    $('body').addClass('dsportret');
}

$(window).bind("resize", function(){
    
    var NsOrienWidth = $(window).width();
    var NsOrienHeight = $(window).height();
    
    NsOrientation = ( NsOrienWidth > NsOrienHeight )? 90 : 0;

    if (NsOrientation === 90) {
        $('body').addClass('dsportret');
    } else {
        $('body').removeClass('dsportret');
    }

    if (NsDefaultPort != NsOrientation) {
    
        $('.hvh').css( 'height', NsOrienHeight );
    
        NsDefaultPort = NsOrientation;
}

});



if ( $('.render').length ) {
    render();
}


});