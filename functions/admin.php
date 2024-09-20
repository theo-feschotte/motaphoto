<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

/************* CUSTOMIZE LOGIN *******************/

// changing the logo link from wordpress.org to your site
function login_url() {  return home_url(); }

// changing the alt text on the logo to show your site name
function login_title() { return get_option('blogname'); }

// calling it only on the login page
add_filter('login_headerurl', 'login_url');
add_filter('login_headertext', 'login_title');

/************* CUSTOMIZE ADMIN *******************/

// Custom Backend Footer
function custom_admin_footer() {
	_e('<span id="footer-thankyou">Développé par <a href="https://studio22.xyz" target="_blank">Studio 22</a> </span>. ', '');
}
add_filter('admin_footer_text', 'custom_admin_footer');

// admin menu order
function reorder_admin_menu( $__return_true ) {
    return array(
         'index.php', // Dashboard
		 'edit.php?post_type=page', // Pages
		 'edit.php', // Posts

         'upload.php', // Media
		 'themes.php', // Appearance
		//  'admin.php?page=wpcf7', // Contact
		 
		 'separator1', // --Space--
		 
         'edit-comments.php', // Comments
		 'users.php', // Users
		 
		 'separator2', // --Space--
		 
         'plugins.php', // Plugins
         'tools.php', // Tools
         'options-general.php', // Settings
   );
}
// add_filter( 'custom_menu_order', 'reorder_admin_menu' );
// add_filter( 'menu_order', 'reorder_admin_menu' );

// custom admin menu
function my_remove_admin_menus() {
	// global $user_ID;
	remove_menu_page( 'edit-comments.php' );
	remove_menu_page( 'edit.php' );
}
add_action( 'admin_init', 'my_remove_admin_menus' );

// give access to theme options and menu for editors
function editor_cap() {
	$editor = get_role('editor');
	$editor->add_cap('edit_theme_options', true);
}
add_action('admin_init', 'editor_cap', 11);

//favicon for wordpress admin
function bweb_admin_favicon() {
    $favicon_url = get_template_directory_uri() . '/favicons/favicon-32x32.png';
    echo '<link rel="shortcut icon" href="' . $favicon_url . '" />';
}
add_action( 'admin_head', 'bweb_admin_favicon' );

// Removes from post and pages
function remove_comment_support() {
	remove_post_type_support( 'post', 'comments' );
    remove_post_type_support( 'page', 'comments' );
	remove_post_type_support( 'post', 'pings' );
    remove_post_type_support( 'page', 'pings' );
}
add_action('init', 'remove_comment_support', 100);

// Close comments on the front-end
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);

// Disable WordPress Admin Bar for all users
add_filter( 'show_admin_bar', '__return_false' );

function custom_admin_bar(){
	global $wp_admin_bar;
	$wp_admin_bar->remove_menu('comments');
	$wp_admin_bar->remove_menu('new-content');
}
add_action( 'wp_before_admin_bar_render', 'custom_admin_bar' );

/************* DASHBOARD WIDGETS *****************/

// Disable default dashboard widgets
function disable_default_dashboard_widgets() {
	//remove_meta_box('dashboard_right_now', 'dashboard', 'core');    // Right Now Widget
	remove_meta_box('dashboard_recent_comments', 'dashboard', 'core'); // Comments Widget
	remove_meta_box('dashboard_incoming_links', 'dashboard', 'core');  // Incoming Links Widget
	remove_meta_box('dashboard_plugins', 'dashboard', 'core');         // Plugins Widget

	remove_meta_box('dashboard_quick_press', 'dashboard', 'core');  // Quick Press Widget
	remove_meta_box('dashboard_recent_drafts', 'dashboard', 'core');   // Recent Drafts Widget
	remove_meta_box('dashboard_primary', 'dashboard', 'core');         //
	remove_meta_box('dashboard_secondary', 'dashboard', 'core');       //

	// Removing plugin dashboard boxes
	remove_meta_box('yoast_db_widget', 'dashboard', 'normal');         // Yoast's SEO Plugin Widget

}
add_action('admin_menu', 'disable_default_dashboard_widgets');
