/**
 * Created by elporfirio on 05/09/16.
 */
(function () {
  'use strict';

  angular
    .module('tiendita')
    .constant('postRequestFix', {
      headers: {'Content-Type': undefined},
      transformRequest: angular.identity
    })
    .constant('putRequestFix', {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //transformRequest: angular.identity
    })
})();
