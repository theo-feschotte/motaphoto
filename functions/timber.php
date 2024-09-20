<?php 

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

$timber = Timber\Timber::init();

// Use options fields site wide
add_filter( 'timber_context', 'mytheme_timber_context'  );
function mytheme_timber_context( $context ) {
    $context['options'] = get_fields('options');
    return $context;
}

// Add custom functions to twig
add_filter( 'timber/twig', 'add_to_twig' );
function add_to_twig( $twig ) {
    // $twig->addFunction( new Twig\TwigFunction( 'menuName', 'menuName' ) );
    return $twig;
}

// function menuName($menuID) {
//     echo wp_get_nav_menu_object($menuID)->taxonomy;
// }