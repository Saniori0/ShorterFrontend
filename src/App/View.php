<?php


namespace Shorter\Frontend\App;

use Shorter\Frontend\Http\Request;
use Shorter\Frontend\Http\Response;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use Twig\TemplateWrapper;

class View
{

    public static function render(string $templateName, array $data = [])
    {

        $loader = new FilesystemLoader(__DIR__ . "/Templates/");
        $twig = new Environment($loader);

        $data["base"] = Request::getInstance()->getBaseURL();

        Response::html(200, $twig->render("pages/".$templateName, $data))->dispatch();

    }

}