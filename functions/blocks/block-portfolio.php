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

    $context['categories'] = Timber::get_terms(array(
        'taxonomy' => 'categorie',
    ));

    $context['formats'] = Timber::get_terms(array(
        'taxonomy' => 'format',
    ));

    Timber::render( 'blocks/block-portfolio.twig', $context );
}

add_action('wp_ajax_portfolio', 'portfolio_ajax_handler'); // wp_ajax_{action}
add_action('wp_ajax_nopriv_portfolio', 'portfolio_ajax_handler'); // wp_ajax_nopriv_{action}
function portfolio_ajax_handler() {
    $args = [
        'post_type' => 'portfolio',
        'posts_per_page' => 8,
        'orderby' => 'date',
        'order' => 'ASC',
        'paged' => $_POST['paged'],
    ];
    if (isset($_POST['filter']) && $_POST['filter'] != null ) {
        $filter = $_POST['filter'];
        $filter = stripslashes($filter);
        $filter = json_decode($filter, true);
        $args['paged'] = $filter['page'] ? $filter['page'] : 1;
        if (isset($filter['categorie-select']) && $filter['categorie-select'] != null) {
            $args['tax_query'] = [
                [
                    'taxonomy' => 'categorie',
                    'field' => 'slug',
                    'terms' => $filter['categorie-select'],
                ],
            ];
            if (isset($filter['format-select']) && $filter['format-select'] != null) {
                $args['tax_query'] = [
                    'relation' => 'AND',
                    [
                        'taxonomy' => 'categorie',
                        'field' => 'slug',
                        'terms' => $filter['categorie-select'],
                    ],
                    [
                        'taxonomy' => 'format',
                        'field' => 'slug',
                        'terms' => $filter['format-select'],
                    ],
                ];
            };
        } else if (isset($filter['format-select']) && $filter['format-select'] != null) {
            $args['tax_query'] = [
                [
                    'taxonomy' => 'format',
                    'field' => 'slug',
                    'terms' => $filter['format-select'],
                ],
            ];
            if (isset($filter['categorie-select']) && $filter['categorie-select'] != null) {
                $args['tax_query'] = [
                    'relation' => 'AND',
                    [
                        'taxonomy' => 'format',
                        'field' => 'slug',
                        'terms' => $filter['format-select'],
                    ],
                    [
                        'taxonomy' => 'categorie',
                        'field' => 'slug',
                        'terms' => $filter['categorie-select'],
                    ],
                ];
            };
        };
        // if (isset($filter['orderby-select']) && $filter['orderby-select'] != null) {
        //     $args = [
        //         'post_type' => 'portfolio',
        //         'posts_per_page' => 8,
        //         'orderby' => 'date',
        //         'order' => $filter['orderby-select'],
        //     ];
        // };
    };
    $context = Timber::context();
    $context['posts'] = Timber::get_posts($args);
    
    $results = Timber::compile( "components/portfolio-results.twig", $context );
    $pagination = Timber::compile( "components/pagination.twig", $context );

    $output = [
        'results' => $results,
        'pagination' => $pagination,
        'data' => $filter,
    ];
    wp_send_json($output);
    
    die; // here we exit the script and even no wp_reset_query() required!
}