<?php

$context = Timber::context();
$context['post'] = Timber::get_post();

Timber::render( 'layouts/404.twig', $context );
