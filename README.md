## What?
Switcheroo is a product demo bar designed for showcasing your products (themes, websites, plugins) in a nice and sleek way.

## Demo?
Switcheroo demo can be found here: [http://switcheroo.getkodo.com/](http://switcheroo.getkodo.com/)

## Browsers supported?
It officially supports modern browsers (mobile included) and IE >= 8

## Is it responsive?
Yes, it is.

## Can I use it in commercial purposes?
Switcheroo is licensed under MIT licence, which basically means you can do anything with it (just don't remove the link to this github page from the js source).

## How do I add products?
Products are to be added inside products.js file, and assigned to $products global variable. Sample markup:
```javascript

    $products = {
        visia : {
            name     : 'Visia',
            tag      : 'WP',
            img      : 'http://i.imgur.com/hgp2v0H.jpg',
            url      : 'http://visia.themes.pixelentity.com/',
            purchase : 'http://themeforest.net/item/visia-responsive-one-page-retina-wordpress-theme/5602067?ref=OriginalEXE',
            tooltip  : 'Optional Tooltip'
        },

        bigwig_wp : {
            name     : 'BigWig',
            tag      : 'WP',
            img      : 'http://i.imgur.com/uoreaON.jpg',
            url      : 'http://bigwig.themes.pixelentity.com/',
            purchase : 'http://themeforest.net/item/bigwig-modern-corporate-retina-wordpress-theme/5217458?ref=OriginalEXE'
        }

    };

Note that tooltip is optional, everything else is mandatory.

## I would like to customize stuff, how do I get uncompressed source
Uncompressed scripts and styles are included in the package, only they are not referenced. To use uncompressed scripts/styles, replace in your index.html this:

    <link href="css/template.min.css" rel="stylesheet" media="screen">

with this:

    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/template.css" rel="stylesheet" media="screen">

and this:

    <script src="js/application.min.js"></script>

with this:

    <script src="js/libs/jquery.moousewheel.js"></script>
    <script src="js/libs/bootstrap.min.js"></script>
    <script src="js/libs/jquery.carouFredSel-6.2.1-packed.js"></script>
    <script src="js/application.js"></script>

## I would like to use image instead of text for the logo, is that supported?
Sure it is. Simply remove 'textual' class from .logo and replace words with your image (optimal height is 60px).

## I hate white color, can I be cool and use black instead?
Of course you can, simply add dark class to the body element and voila.

## How can I contribute?
Find bugs, report bugs, fix bugs.