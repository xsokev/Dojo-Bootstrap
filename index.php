<?php
$system_dir = dirname(__FILE__).'/system';
$slim_dir = $system_dir.'/Slim';
$vendor_dir = $system_dir.'/vendor';

require_once $slim_dir.'/Slim.php';
require_once $vendor_dir.'/paris/Idiorm.php';
require_once $vendor_dir.'/paris/Paris.php';
require_once $slim_dir.'/Views/TwigView.php';

//Init Slim app with the custom View
$app = new Slim(array(
    'view' => new TwigView(),
    'templates.path' => $system_dir.'/templates'
));

include $system_dir.'/config.php';
include $system_dir.'/routes.php';

$app->run();
