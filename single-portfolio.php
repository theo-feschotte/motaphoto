<?php

$context = Timber::context();
$context['post'] = Timber::get_post();

Timber::render( 'layouts/single-portfolio.twig', $context );