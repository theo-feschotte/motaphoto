<?php

$context = Timber::context();
$context['post'] = Timber::get_post();

$lightbox = get_fields('options')['lightbox'];
if ($lightbox) {
    $context['lightbox'] = Timber::get_posts(array(
        'post_type' => 'portfolio',
        'posts_per_page' => -1,
        'orderby' => 'date',
        'order' => 'ASC',
    ));
};

Timber::render( 'layouts/page.twig', $context );