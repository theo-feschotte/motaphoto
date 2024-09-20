<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// Exit if ACF is not active
if ( ! class_exists( 'acf' ) ) return;

if (function_exists('acf_register_block_type')) {

    // Register block category
    function filter_block_categories_when_post_provided($block_categories, $editor_context){
        if (!empty($editor_context->post)) {
            array_push(
                $block_categories,
                array(
                'slug'  => sanitize_title(get_bloginfo('name')),
                'title' => get_bloginfo('name'),
                'icon'  => null,
                )
            );
        }
     return $block_categories;
    }
    add_filter('block_categories_all', 'filter_block_categories_when_post_provided', 10, 2);

    // Register acf blocks
    require_once(get_template_directory().'/functions/blocks/block-hero.php');
    require_once(get_template_directory().'/functions/blocks/block-portfolio.php');
}