<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// WordPress functions and theme support
add_action( 'after_setup_theme', 'theme_support' );
function theme_support() {
    
    // WordPress thumbnail
    add_theme_support( 'post-thumbnails' );
    
    // Default thumbnail size
    set_post_thumbnail_size( 125, 125, true );
    
    // RSS
    add_theme_support( 'automatic-feed-links' );
    
    // WordPress controlled title tag
    add_theme_support( 'title-tag' );
    
    // HTML5 Support
    add_theme_support( 'html5', [
        'comment-list',
        'comment-form',
        'search-form',
    ]);
    
    // add_theme_support( 'custom-logo', [
    //     'height' => 100,
    //     'width' => 400,
    //     'flex-height' => true,
    //     'flex-width' => true,
    //     'header-text' => [
    //         'site-title',
    //         'site-description',
    //     ],
    // ]);
    
    // Post format
    add_theme_support( 'post-formats', [
        'aside', // title less blurb
        'gallery', // gallery images
        'link', // quick link to other site
        'image', // image
        'quote', // quick quote
        'status', // Facebook like status update
        'video', // video
        'audio', // audio
        'chat', // chat transcript
    ]);
    
    // Set the maximum allowed width for any content in the theme, like oEmbeds and images added to posts
    $GLOBALS['content_width'] = apply_filters( 'theme_support', 1200 );

}


// Disable the emoji's
function disable_wp_emoji() {
    // all actions related to emojis
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
  
    // filter to remove TinyMCE emojis
    add_filter( 'tiny_mce_plugins', 'disable_emoji_tinymce' );
    
    // filter to remove DNS prefetch
    add_filter( 'emoji_svg_url', '__return_false' );
}
add_action( 'init', 'disable_wp_emoji' );
  
function disable_emoji_tinymce( $plugins ) {
if ( is_array( $plugins ) ) {
    return array_diff( $plugins, array( 'wpemoji' ) );
} else {
    return array();
}
}