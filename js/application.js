/*!
 * Switcheroo by OriginalEXE
 * https://github.com/OriginalEXE/Switcheroo
 * MIT licenced
 */

// Global "use strict", wrap it up in functions if you can't deal with it...
"use strict";

var $viewportButtons = $( '.mobile-btn, .tablet-btn, .desktop-btn' ),
	$productList = $( '.products-list' ),
	$body = $( 'body' ),
	$productIframe = $( '.product-iframe' );

// Insert products to carousel
$.each( $products, function( key, object ) {

	if ( 'tooltip' in object ) {

		var tooltip = 'title="' + object.tooltip.replace( /"/g, '\'' ) + '"';

	} else {

		var tooltip = '';

	}

	$productList.append(
		'<a class="product pull-left" data-id="' + key + '" ' + tooltip + '><img src="' + object.img + '" alt="' + object.name + '" width="236" height="120"><span class="title">' + object.name + '</span><span class="badge">' + object.tag + '</span></a>'
	);

});

// Close bar on click
$( '.purchase-btn' ).click( function() {

	if ( $current_product in $products ) {

		top.location.href = $products[ $current_product ][ 'purchase' ];

	}

	return false;

});

// Bail out if mobile, it does not behave good, damn idevices...
if ( jQuery.browser.mobile ) {

	if ( $current_product in $products ) {

		top.location.href = $products[ $current_product ].url;

	}

}

// Purchase btn on click
$( '.remove-btn' ).click( function() {

	if ( $current_product in $products ) {

		top.location.href = $products[ $current_product ].url;

	}

	return false;

});

// Let's calculate iframe height
function switcher_iframe_height() {

	if ( $body.hasClass( 'toggle' ) ) return;

	var $w_height = $( window ).height(),
		$b_height = $( '.switcher-bar' ).height() + $( '.switcher-body' ).height(),
		$i_height = $w_height - $b_height - 2;

	$productIframe.height( $i_height );

}

// Check if viewport buttons should be displayed
function switcher_viewport_buttons() {

	if ( 'undefined' !== typeof $products[ $current_product ].responsive && $products[ $current_product ].responsive === 0 ) {

		$( '.desktop-btn' ).click();

		$viewportButtons.addClass( 'disabled' ).removeClass( 'visible' ).css({ 'opacity': 0, 'visibility': 'hidden' });

	} else {

		$viewportButtons.removeClass( 'disabled' ).addClass( 'visible' ).css({ 'opacity': 1, 'visibility': 'visible' });

	}

}

$( document ).ready( switcher_iframe_height );

$( window ).on( 'resize load', switcher_iframe_height );

// Switching views
$( '.desktop-btn' ).on( 'click', function() {

	$productIframe.animate({
		'width'       : $( window ).width()
	});

	return false;

});

$( '.tablet-btn' ).on( 'click', function() {

	$productIframe.animate({
		'width'       : '768px'
	});

	return false;

});

$( '.mobile-btn' ).on( 'click', function() {

	$productIframe.animate({
		'width'       : '480px'
	});

	return false;

});

// Products carousel. Yeah, I use carousel, sue me.
$productList.carouFredSel({
	auto       : false,
	circular   : false,
	infinite   : false,
	cookie     : 'position',
	mousewheel : true,
	scroll     : {
		items : 1
	},
	width      : '100%',
	prev       : '.products-prev',
	next       : '.products-next'
});

// On click, toggle product switcher
$( '.product-switcher a' ).on( 'click', function() {

	$body.toggleClass( 'toggle' );
	
	if ( ! $body.hasClass( 'toggle' ) ) {

		setTimeout( 'switcher_iframe_height()', 210 );
		setTimeout( 'switcher_iframe_height()', 310 );
		setTimeout( 'switcher_iframe_height()', 410 );
		setTimeout( 'switcher_iframe_height()', 1500 );
		setTimeout( 'switcher_iframe_height()', 2500 );

	}

	return false;

});

// Hide preloader on iframe load
$productIframe.load( function() {

	$( '.preloader, .preloading-icon' ).fadeOut( 400 );

});

// Start the application
$( document ).ready( function() {

	$current_product = location.hash.replace('#', '');

	if ( ! ( $current_product in $products ) || $current_product === '' ) {

		$current_product = location.search.replace('?product=', '');

		if ( ! ( $current_product in $products ) || $current_product === '' ) {

			for (var key in $products ) if ( $products.hasOwnProperty( key ) ) break;

			$current_product = key;

		}

	}

	$( '.product-switcher a' ).html( 
		$products[ $current_product ].name + ' <span class="badge">' + $products[ $current_product ].tag + '</span>'
	);

	switcher_viewport_buttons();

	$productIframe.attr( 'src', $products[ $current_product ].url );

	$( '.product' ).tooltip({
		container : 'body',
		html      : true,
		placement : 'auto bottom',
		trigger   : 'hover'
	});

});

$( '.product' ).click( function() {

	$current_product = $( this ).data( 'id' );

	if ( $current_product in $products ) {

		$body.toggleClass( 'toggle' );

		$( '.preloader, .preloading-icon' ).fadeIn( 400 );

		$productIframe.load( function() {

			$( '.preloader, .preloading-icon' ).fadeOut( 400 );

		});

		$( '.product-switcher a' ).html( 
			$products[ $current_product ].name + ' <span class="badge">' + $products[ $current_product ].tag + '</span>'
		);

		$productIframe.attr( 'src', $products[ $current_product ].url );

		location.hash = '#' + $current_product;

	}

	switcher_viewport_buttons();

	return false;

});
