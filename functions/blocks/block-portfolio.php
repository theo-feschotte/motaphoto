<?php

add_action( 'acf/init', function() {
    acf_register_block_type(array(
        'name'              => 'portfolio',
        'title'             => 'Portfolio',
        'render_callback'   => 'block_portfolio',
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

function block_portfolio( $block, $content = '', $is_preview = false ) {
    $context = Timber::context();
    $context['block'] = $block;
    $context['fields'] = get_fields();
    $context['is_preview'] = $is_preview;
    $context['post'] = Timber::get_post();

    $context['portfolio'] = Timber::get_posts(array(
        'post_type' => 'portfolio',
        'posts_per_page' => 8,
        'orderby' => 'date',
        'order' => 'ASC',
    ));

    Timber::render( 'blocks/block-portfolio.twig', $context );
}