/**
 * Created by elporfirio on 05/09/16.
 */
(function () {
  'use strict';

  angular
    .module('tiendita')
    .service('TiendaService', TiendaService);

  TiendaService.$inject = ['$http', 'postRequestFix', 'putRequestFix', '$window', 'Json2FormService', '$httpParamSerializerJQLike', 'env'];

  /* @ngInject */
  function TiendaService($http, postRequestFix, putRequestFix, $window, Json2FormService, $httpParamSerializerJQLike, env) {
    this.getProductos = getProductos;
    this.saveProducto = saveProducto;
    this.deleteProducto = deleteProducto;
    this.detailProducto = detailProducto;

    ////////////////

    function getProductos() {
      return $http.get(env.api + 'products?token=' + $window.localStorage.token)
        .then(getProductosSuccess)
        .catch(getProductosFailed);

      function getProductosSuccess(response) {
        if (response.data.code === 200) {
          return {success: true, response: response.data};
        } else {
          return {success: false, response: response.data}
        }
      }

      function getProductosFailed(error) {
        return {success: false, error: error};
      }
    }

    function saveProducto(producto) {
      if (producto.id === null) {
        const form = Json2FormService.convertJson2From(producto);
        return $http.post(env.api + 'products?token=' + $window.localStorage.token, form, postRequestFix)
          .then(saveProductoSuccess)
          .catch(saveProductoFailed);
      } else {
        return $http.put(env.api + 'products/' + producto.id + '?token=' + $window.localStorage.token,
          $httpParamSerializerJQLike(producto), putRequestFix)
          .then(saveProductoSuccess)
          .catch(saveProductoFailed);
      }

      function saveProductoSuccess(response) {
        if (response.data.code === 200) {
          return {success: true, response: response.data};
        } else {
          return {success: false, response: response.data}
        }
      }

      function saveProductoFailed(error) {
        return {success: false, error: error};
      }
    }

    function deleteProducto(producto) {
      return $http.delete(env.api + 'products/' + producto.id + '?token=' + $window.localStorage.token, postRequestFix)
        .then(deleteProductoSuccess)
        .catch(deleteProductoFailed);


      function deleteProductoSuccess(response) {
        if (response.data.code === 200) {
          return {success: true, response: response.data};
        } else {
          return {success: false, response: response.data}
        }
      }

      function deleteProductoFailed(error) {
        return {success: false, error: error};
      }
    }

    function detailProducto(producto) {
      return $http.get(env.api + 'products/' + producto.id + '?token=' + $window.localStorage.token)
        .then(getProductosSuccess)
        .catch(getProductosFailed);

      function getProductosSuccess(response) {
        if (response.data.code === 200) {
          return {success: true, response: response.data};
        } else {
          return {success: false, response: response.data}
        }
      }

      function getProductosFailed(error) {
        return {success: false, error: error};
      }
    }
  }

})();

