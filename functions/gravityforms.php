<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// Exit if Gravity Forms is not active
if ( ! class_exists( 'GFAPI' ) ) return;

// Gravity Forms Permissions
function add_gf_permissions() {
    $role = get_role('editor');
    $role->add_cap('gravityforms_view_entries');
    $role->add_cap('gravityforms_delete_entries');
    $role->add_cap('gravityforms_view_entry_notes');
    $role->add_cap('gravityforms_export_entries');
}
add_action('admin_init','add_gf_permissions');