/**
 * Created by elporfirio on 05/09/16.
 */
angular
  .module('tiendita')
  .config(configRoutes);

function configRoutes($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/inicio');

  const inicioState = {
    name: 'inicio',
    url: '/inicio',
    templateUrl: 'modules/inicio/inicio.view.html',
    controller: 'AuthController',
    controllerAs: 'AuthCtrl'
  };

  const logOutState = {
    name: 'logout',
    url: '/logout',
    controller: function ($state, AuthService) {
      AuthService.doLogOut();
      $state.go('inicio');
    },
    data: {
      requiresAuth: true
    }
  };

  const homeState = {
    name: 'home',
    url: '/home',
    templateUrl: 'modules/home/home.view.html',
    controller: 'TiendaController',
    controllerAs: 'TiendaCtrl',
    data: {
      requiresAuth: true
    }
  };

  $stateProvider.state(inicioState);
  $stateProvider.state(logOutState);
  $stateProvider.state(homeState);
}
