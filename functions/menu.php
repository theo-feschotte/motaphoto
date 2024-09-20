<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

## Filters/Actions
add_action( 'init', 'register_menus' );
add_filter( 'timber/context', 'add_to_context' );


// Wordpress init menus
function register_menus() {
	register_nav_menus(
		array(
			'menu-header'	=> __( 'Menu header', '' ),
			'menu-footer'	=> __( 'Menu footer', '' ),
		)
	);
}

// Timber init menus
function add_to_context( $context ) {
	$args = array(
		'depth' => 1,
	);
	if( has_nav_menu( 'menu-header' ) ) {
		$context['menu_header'] = Timber::get_menu('menu-header');
	}
	if( has_nav_menu( 'menu-footer' ) ) {
		$context['menu_footer'] = Timber::get_menu('menu-footer');
	}
	return $context;
}