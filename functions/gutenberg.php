<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

function wpdocs_allowed_block_types( $block_editor_context, $editor_context ) {

        if ( ! empty( $editor_context->post ) ) {

                // add default block types
                $allowed_block_types = array(
                        // 'core/heading',
                        // 'core/paragraph',
                        // 'core/image',
                        // 'core/gallery',
                        // 'core/list',
                        // 'core/quote',
                        // 'core/shortcode',
                        // 'core/archives',
                        // 'core/audio',
                        // 'core/button',
                        // 'core/buttons',
                        // 'core/calendar',
                        // 'core/categories',
                        // 'core/code',
                        // 'core/columns',
                        // 'core/column',
                        // 'core/cover',
                        // 'core/embed',
                        // 'core/file',
                        // 'core/group',
                        // 'core/freeform',
                        // 'core/html',
                        // 'core/media-text',
                        // 'core/latest-comments',
                        // 'core/latest-posts',
                        // 'core/missing',
                        // 'core/more',
                        // 'core/nextpage',
                        // 'core/preformatted',
                        // 'core/pullquote',
                        // 'core/rss',
                        // 'core/search',
                        // 'core/separator',
                        // 'core/block',
                        // 'core/social-links',
                        // 'core/social-link',
                        // 'core/spacer',
                        // 'core/subhead',
                        // 'core/table',
                        // 'core/tag-cloud',
                        // 'core/text-columns',
                        // 'core/verse',
                        // 'core/video',
                        // 'core/page-list',
                        // 'gravityforms/form',
                        // 'contact-form-7/contact-form-selector',
                );

                // add acf-blocks registered
                if (function_exists('acf_register_block_type')) {
                        $acf_blocks = acf_get_block_types();
                        foreach ($acf_blocks as $key => $value) {
                                array_push($allowed_block_types, $key);
                        }
                }
                
                return $allowed_block_types;
        } 
}
add_filter( 'allowed_block_types_all', 'wpdocs_allowed_block_types', 10, 2 );

if (is_admin()) { 
        add_action( 'enqueue_block_editor_assets', 'jba_disable_editor_fullscreen_by_default' );
        function jba_disable_editor_fullscreen_by_default() {
                $script = "jQuery( window ).load(function() { const isFullscreenMode = wp.data.select( 'core/edit-post' ).isFeatureActive( 'fullscreenMode' ); if ( isFullscreenMode ) { wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fullscreenMode' ); } });";
                wp_add_inline_script( 'wp-blocks', $script );
        }
}