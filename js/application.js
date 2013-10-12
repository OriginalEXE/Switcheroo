// Global "use strict", wrap it up in functions if you can't deal with it...
"use strict";

var $current_product;

// Insert products to carousel
$.each( $products, function( key, object ) {

	if ( 'tooltip' in object ) {

		var tooltip = 'title="' + object.tooltip.replace( /"/g, '\'' ) + '"';

	} else {

		var tooltip = '';

	}

	$( '.products-list' ).append(
		'<a class="product pull-left" data-id="' + key + '" ' + tooltip + '><img src="' + object.img + '" alt="' + object.name + '" width="236" height="120"><span class="title">' + object.name + '</span><span class="badge">' + object.tag + '</span></a>'
	);

});

// Hey, don't iframe my iframe!
if ( top !== self ) 
	top.location.replace( self.location.href );

// Close bar on click
$( '.purchase-btn' ).click( function() {

	if ( $current_product in $products ) {

		top.location.replace( $products[ $current_product ][ 'purchase' ] );

	}

	return false;

});

// Purchase btn on click
$( '.remove-btn' ).click( function() {

	if ( $current_product in $products ) {

		top.location.replace( $products[ $current_product ].url );

	}

	return false;

});

// Let's calculate iframe height
function switcher_iframe_height() {

	if ( $( 'body' ).hasClass( 'toggle' ) ) return;

	var $w_height = $( window ).height(),
		$b_height = $( '.switcher-bar' ).height() + $( '.switcher-body' ).height(),
		$i_height = $w_height - $b_height - 2;

	$( '.product-iframe' ).height( $i_height );

}

$( document ).ready( function() {

	switcher_iframe_height();

});

$( window ).resize( function() {

	switcher_iframe_height();

});

$( window ).load( function() {

	switcher_iframe_height();

});

// Switching views
$( '.desktop-btn' ).on( 'click', function() {

	$( '.product-iframe' ).animate({
		'width'       : $( window ).width()
	});

	return false;

});

$( '.tablet-btn' ).on( 'click', function() {

	$( '.product-iframe' ).animate({
		'width'       : '768px'
	});

	return false;

});

$( '.mobile-btn' ).on( 'click', function() {

	$( '.product-iframe' ).animate({
		'width'       : '480px'
	});

	return false;

});

// Products carousel. Yeah, I use carousel, sue me.
$( '.products-list' ).carouFredSel({
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

	$( 'body' ).toggleClass( 'toggle' );
	
	if ( ! $( 'body' ).hasClass( 'toggle' ) ) {

		setTimeout( 'switcher_iframe_height()', 210 );
		setTimeout( 'switcher_iframe_height()', 310 );
		setTimeout( 'switcher_iframe_height()', 410 );
		setTimeout( 'switcher_iframe_height()', 1500 );
		setTimeout( 'switcher_iframe_height()', 2500 );

	}

	return false;

});

// Hide preloader on iframe load
$( '.product-iframe' ).load( function() {

	$( '.preloader, .preloading-icon' ).fadeOut( 400 );

});

// Start the application
$( document ).ready( function() {

	$current_product = location.hash.replace('#', '');

	if ( ! ( $current_product in $products ) || $current_product === '' ) {

		for (var key in $products ) if ( $products.hasOwnProperty( key ) ) break;

		$current_product = key;

	}

	$( '.product-switcher a' ).html( 
		$products[ $current_product ].name + ' <span class="badge">' + $products[ $current_product ].tag + '</span>'
	);

	$( '.product-iframe' ).attr( 'src', $products[ $current_product ].url );

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

		$( 'body' ).toggleClass( 'toggle' );

		$( '.preloader, .preloading-icon' ).fadeIn( 400 );

		$( '.product-iframe' ).load( function() {

			$( '.preloader, .preloading-icon' ).fadeOut( 400 );

		});

		$( '.product-switcher a' ).html( 
			$products[ $current_product ].name + ' <span class="badge">' + $products[ $current_product ].tag + '</span>'
		);

		$( '.product-iframe' ).attr( 'src', $products[ $current_product ].url );

		location.hash = '#' + $current_product;

	}

	return false;

});