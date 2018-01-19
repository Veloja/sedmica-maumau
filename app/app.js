var app = angular.module('sedmickaApp', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/sedmicka',
        {
            controller: 'SedmickaController',
            templateUrl: '/app/partials/sedmicka.html'
        })
        .otherwise({ redirectTo: '/sedmicka' });
});