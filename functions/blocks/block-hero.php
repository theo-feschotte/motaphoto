<?php

add_action( 'acf/init', function() {
    acf_register_block_type(array(
        'name'              => 'hero',
        'title'             => 'Hero',
        'render_callback'   => 'block_hero',
        'category'          => sanitize_title(get_bloginfo('name')),
        'mode'			    => 'preview',
        'post_types'        => array('page'),
        'supports'		    => [
            'align'			    => false,
            'anchor'		    => false,
            'customClassName'	=> false,
            'mode'              => false,
            'jsx' 			    => false,
        ],
    ));
});

function block_hero( $block, $content = '', $is_preview = false ) {
    $context = Timber::context();
    $context['block'] = $block;
    $context['fields'] = get_fields();
    $context['is_preview'] = $is_preview;
    $context['post'] = Timber::get_post();

    Timber::render( 'blocks/block-hero.twig', $context );
}