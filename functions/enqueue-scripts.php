<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

define( 'VITE_SERVER', 'http://localhost:5173' );
define( 'VITE_ENTRY_POINT', str_replace( home_url(), VITE_SERVER, get_template_directory_uri() ) );
define( 'VITE_DEV', !is_wp_error( wp_remote_get( VITE_SERVER ) ) );

define( 'DIST_DEF', 'dist' );
define( 'DIST_URI', get_template_directory_uri() . '/' . DIST_DEF );

define( 'APP_JS', 'assets/scripts/app.js' );
define( 'APP_CSS', 'assets/styles/app.css' );
define( 'EDITOR_JS', 'assets/scripts/editor.js' );
define( 'EDITOR_CSS', 'assets/styles/editor-style.css' );
define( 'LOGIN_CSS', 'assets/styles/login-style.css' );

if (defined( 'VITE_DEV' ) && VITE_DEV === true) { // Dev version
    
    // Insert hmr into head for live reload
    add_action( 'wp_head', 'vite_head_module_hook' );
    function vite_head_module_hook() {
        echo '<script type="module" crossorigin src="' . VITE_ENTRY_POINT . '/@vite/client"></script>';
        echo '<script type="module" crossorigin src="' . VITE_ENTRY_POINT . '/' . APP_JS . '"></script>';
        echo '<script type="module" crossorigin src="' . VITE_ENTRY_POINT . '/' . APP_CSS . '"></script>';
    };

    // Insert hmr into admin head for live reload
    add_action( 'enqueue_block_editor_assets', 'vite_admin_head_module_hook' );
    function vite_admin_head_module_hook() {
        echo '<script type="module" crossorigin src="' . VITE_ENTRY_POINT . '/@vite/client"></script>';
        echo '<script type="module" crossorigin src="' . VITE_ENTRY_POINT . '/' . EDITOR_CSS . '"></script>';
    };

    // Insert hmr into login head for live reload
    add_action( 'login_head', 'vite_login_head_module_hook' );
    function vite_login_head_module_hook() {
        echo '<script type="module" crossorigin src="' . VITE_ENTRY_POINT . '/@vite/client"></script>';
        echo '<script type="module" crossorigin src="' . VITE_ENTRY_POINT . '/' . LOGIN_CSS . '"></script>';
    };
    
} else { // Build version
    
    $manifest = json_decode( file_get_contents( DIST_URI . '/.vite/manifest.json' ), true );
    
    if (is_array( $manifest )) {

        // Frontend JS
        if ( ! empty( $manifest[APP_JS] ) ) {
            add_action('wp_enqueue_scripts', function () use ($manifest) {
                wp_enqueue_script( 'site', DIST_URI . '/' . $manifest[APP_JS]['file'], array(), '', true );
                
                // ajax
                wp_localize_script('site', 'ajax_params', array(
                    'ajaxurl' => admin_url( 'admin-ajax.php' ),
                ));
            });
        };

        // Frontend CSS from JS
        if ( ! empty( $manifest[APP_JS]['css'] ) ) {
            add_action('wp_enqueue_scripts', function () use ($manifest) {
                wp_enqueue_style( 'site-js', DIST_URI . '/' . $manifest[APP_JS]['css'][0], array(), 1.0, 'screen, print, speech' );
            });
        }

        // Frontend CSS
        if ( ! empty( $manifest[APP_CSS] ) ) {
            add_action('wp_enqueue_scripts', function () use ($manifest) {
                wp_enqueue_style( 'site', DIST_URI . '/' . $manifest[APP_CSS]['file'], array(), 1.0, 'screen, print, speech' );
            });
        };

        // Admin JS
        // if ( ! empty( $manifest[EDITOR_JS] ) ) {};

        // Admin CSS
        if ( ! empty( $manifest[EDITOR_CSS] ) ) {
            add_action('enqueue_block_editor_assets', function () use ($manifest) {
                wp_enqueue_style( 'be-editor', DIST_URI . '/' . $manifest[EDITOR_CSS]['file'], false );
            });
        };

        // Login CSS
        if ( ! empty( $manifest[LOGIN_CSS] ) ) {
            add_action('login_enqueue_scripts', function () use ($manifest) {
                wp_enqueue_style( 'login-style', DIST_URI . '/' . $manifest[LOGIN_CSS]['file'], false );
            });
        };
    };
}

// Remove WP styles
remove_action( 'wp_enqueue_scripts', 'wp_enqueue_global_styles' );
remove_action( 'wp_footer', 'wp_enqueue_global_styles', 1 );

// Remove wp-block-library-css
function remove_block_library_style() {
    wp_dequeue_style( 'wp-block-library' );
}
add_action( 'wp_enqueue_scripts', 'remove_block_library_style' );
