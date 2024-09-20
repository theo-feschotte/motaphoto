<?php

require_once( __DIR__ . '/vendor/autoload.php' );

// WP Head and other cleanup functions
require_once(get_template_directory().'/functions/cleanup.php');

// Register scripts and stylesheets
require_once(get_template_directory().'/functions/enqueue-scripts.php');

// Timber
require_once(get_template_directory().'/functions/timber.php');

// Menus
require_once(get_template_directory().'/functions/menu.php'); 

// Customize the WordPress admin
require_once(get_template_directory().'/functions/admin.php');

// Theme support
require_once(get_template_directory().'/functions/theme-support.php');

// ACF custom
require_once(get_template_directory().'/functions/acf.php');

// Add custom guttenberg blocks with acf
require_once(get_template_directory().'/functions/acf-blocks.php');

// Gutenberg custom
require_once(get_template_directory().'/functions/gutenberg.php');

// Gravity Forms
require_once(get_template_directory().'/functions/gravityforms.php');