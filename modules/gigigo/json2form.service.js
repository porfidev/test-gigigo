/**
 * Created by elporfirio on 05/09/16.
 */
(function () {
  'use strict';

  angular
    .module('tiendita')
    .service('Json2FormService', Json2FormService);


  /* @ngInject */
  function Json2FormService() {
    this.convertJson2From = convertJson2From;

    ////////////////

    function convertJson2From(json) {
      var form_data = new FormData();

      for (var key in json) {
        form_data.append(key, json[key]);
      }

      return form_data;
    }
  }
})();

