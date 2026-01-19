/**
 * Created by elporfirio on 05/09/16.
 */
(function () {
  'use strict';

  angular
    .module('tiendita')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['AuthService', '$state'];

  /* @ngInject */
  function AuthController(AuthService, $state) {
    const vm = this;
    vm.title = 'AuthController';

    //PROPERTIES
    vm.user = {
      email: '',
      password: ''
    };

    vm.sendLogin = sendLogin;
    vm.sendLogOut = sendLogOut;
    activate();

    ////////////////

    function sendLogin() {
      AuthService.doLogin(vm.user)
        .then(function (result) {
          console.log('result login', result)
          if (!result.success && result.error) {
            return swal('Error al iniciar sesión.', result.error.data.message || "Error desconocido", "error")
          }

          return $state.go('home');
        });
    }

    function sendLogOut() {
      AuthService.doLogOut()
        .then(function (result) {
          if (result.success) {
            $state.go('inicio');
          }
        });
    }

    function activate() {
      if ($state.includes("logout")) {
        vm.sendLogOut();
      }
    }
  }

})();

