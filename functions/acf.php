<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// Exit if ACF is not active
if ( ! class_exists( 'acf' ) ) return;

// Google map
// add_action('acf/init', 'my_acf_init');
// function my_acf_init() {
// 	acf_update_setting('google_api_key', 'ENTER_YOUR_GOOGLE_MAP_API_KEY_HERE');
// }