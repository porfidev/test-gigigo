/**
 * Created by elporfirio on 05/09/16.
 */
(function () {
  'use strict';
  angular
    .module('tiendita', [
      'ui.router'
    ])
    .run(appRun);

  appRun.$inject = ['$rootScope', '$state', 'AuthService'];

})();


function appRun($rootScope, $state, AuthService) {
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    if (toState.name === 'inicio' && AuthService.isLoggedIn()) {
      event.preventDefault();
      $state.go('home');
    }

    const requiresAuth = toState.data && toState.data.requiresAuth;

    if (requiresAuth && !AuthService.isLoggedIn()) {
      event.preventDefault();
      $state.go('inicio');
    }
  });
}
