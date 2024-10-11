<?php

$context = Timber::context();
$context['post'] = Timber::get_post();

$context['posts'] = Timber::get_posts([
    'post_type' => 'portfolio',
    'post__not_in' => [$context['post']->ID],
    'posts_per_page' => 2,
    'orderby' => 'date',
    'order' => 'DESC',
    'tax_query' => [
        'relation' => 'OR',
        [
            'taxonomy' => 'categorie',
            'field' => 'slug',
            'terms' => wp_get_post_terms($context['post']->ID, 'categorie', ['fields' => 'slugs'])[0],
        ],
        [
            'taxonomy' => 'format',
            'field' => 'slug',
            'terms' => wp_get_post_terms($context['post']->ID, 'format', ['fields' => 'slugs'])[0],
        ],
    ],
]);

Timber::render( 'layouts/single-portfolio.twig', $context );