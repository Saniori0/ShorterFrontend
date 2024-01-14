<?php

require_once __DIR__ . "/../vendor/autoload.php";

ini_set('display_errors', true);
ini_set('display_startup_errors', true);
error_reporting(E_ALL);

use Shorter\Frontend\App\App;
use Shorter\Frontend\App\View;

$_ENV = parse_ini_file(__DIR__ . "/../.env");

$app = new App();

$app->setError(404, function(){

    View::render("errors/404.twig");

});

$app->get("/sign-in-account", function(object $data){

    View::render("sign-in-account.twig");

}, []);

$app->get("/create-account", function(object $data){

    View::render("create-account.twig");

}, []);

$app->get("/link/:id", function(object $data){

    View::render("statistics.twig", ["id" => @$data->route->getParams()->id ?? ""]);

}, []);

$app->get("/goto/:alias", function(object $data){

    View::render("redirect.twig", ["alias" => @$data->route->getParams()->alias ?? ""]);

}, []);


$home = fn(object $data) => View::render("home.twig");
$homeMiddlewares = [];

$app->get("/home", $home, []);
$app->get("/", $home, []);

$app->dispatchByHttpRequest();