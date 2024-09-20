<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// Fire all our initial functions at the start
add_action( 'after_setup_theme', 'start', 16 );

function start() {

    // launching operation cleanup
    add_action( 'init', 'head_cleanup' );

    // remove pesky injected css for recent comments widget
    add_filter( 'wp_head', 'remove_wp_widget_recent_comments_style', 1 );

    // clean up comment styles in the head
    add_action( 'wp_head', 'remove_recent_comments_style', 1 );

}

//The default wordpress head is a mess. Let's clean it up by removing all the junk we don't need.
function head_cleanup() {
	// Remove category feeds
	remove_action( 'wp_head', 'feed_links_extra', 3 );
	// Remove post and comment feeds
	remove_action( 'wp_head', 'feed_links', 2 );
	// Remove EditURI link
	remove_action( 'wp_head', 'rsd_link' );
	// Remove Windows live writer
	remove_action( 'wp_head', 'wlwmanifest_link' );
	// Remove index link
	remove_action( 'wp_head', 'index_rel_link' );
	// Remove previous link
	remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
	// Remove start link
	remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
	// Remove links for adjacent posts
	remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
	// Remove WP version
	remove_action( 'wp_head', 'wp_generator' );
}

// Remove injected CSS for recent comments widget
function remove_wp_widget_recent_comments_style() {
   if ( has_filter('wp_head', 'wp_widget_recent_comments_style') ) {
      remove_filter('wp_head', 'wp_widget_recent_comments_style' );
   }
}

// Remove injected CSS from recent comments widget
function remove_recent_comments_style() {
  global $wp_widget_factory;
  if (isset($wp_widget_factory->widgets['WP_Widget_Recent_Comments'])) {
    remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
  }
}