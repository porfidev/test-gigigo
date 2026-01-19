/**
 * Created by elporfirio on 05/09/16.
 */
(function () {
  'use strict';

  angular
    .module('tiendita')
    .controller('TiendaController', TiendaController);

  TiendaController.$inject = ['TiendaService', 'AuthService', '$state'];

  /* @ngInject */
  function TiendaController(tiendaService, AuthService, $state) {
    const vm = this;
    vm.title = 'TiendaController';

    vm.productos = [];
    vm.producto = {
      id: null,
      name: null,
      price: 0,
      stock: 0
    };

    vm.agregarNuevo = false;
    vm.mostrarDetalle = false;

    vm.obtenerProductos = obtenerProductos;
    vm.guardarProducto = guardarProducto;
    vm.eliminarProducto = eliminarProducto;
    vm.detalleProducto = detalleProducto;

    //Interaccion
    vm.mostrarEditar = mostrarEditar;
    vm.mostrarNuevo = mostrarNuevo;
    vm.cancelarNuevo = cancelarNuevo;
    vm.regresarDetalle = regresarDetalle;

    activate();

    ////////////////

    function obtenerProductos() {
      tiendaService.getProductos()
        .then(function (result) {
          if (result.success) {
            vm.productos = result.response.products;
          }
        })
    }

    function guardarProducto(producto) {
      const msg = {};

      if (producto.id == null) {
        msg.title = 'Nuevo Producto';
        msg.text = 'Creado Satisfactoriamente';
      } else {
        msg.title = 'Cambios de Producto';
        msg.text = 'Guardados Satisfactoriamente';
      }
      tiendaService.saveProducto(producto)
        .then(function (result) {
          if (result.success) {
            vm.producto.id = null;
            vm.producto.name = null;
            vm.producto.price = 0;
            vm.producto.stock = 0;
            vm.agregarNuevo = false;

            //TODO: optimizar
            vm.obtenerProductos();
            swal(msg.title, msg.text, "success")
          }
        })
    }


    function eliminarProducto(producto) {
      swal({
        title: "¿Esta seguro?",
        text: "El producto " + producto.name + " será eliminado.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false
      }, function () {
        tiendaService.deleteProducto(producto)
          .then(function (result) {
            if (result.success) {
              vm.producto.id = null;
              vm.producto.name = null;
              vm.agregarNuevo = false;

              //TODO: optimizar
              vm.obtenerProductos();
              swal("Eliminado", producto.name, "success");
            }
          })
      });

    }

    function detalleProducto(producto) {
      tiendaService.detailProducto(producto)
        .then(function (result) {
          if (result.success) {
            vm.producto = result.response.product;
            vm.mostrarDetalle = true;
          }
        });
    }

    function mostrarNuevo() {
      vm.agregarNuevo = true;
      vm.mostrarDetalle = false;
    }

    function mostrarEditar(producto) {
      vm.agregarNuevo = true;
      vm.mostrarDetalle = false;
      vm.producto = angular.copy(producto);
    }

    function cancelarNuevo() {
      vm.agregarNuevo = false;
      vm.producto.id = null;
      vm.producto.name = null;
      vm.producto.price = 0;
      vm.producto.stock = 0;
    }

    function regresarDetalle() {
      vm.mostrarDetalle = false;
    }

    function activate() {
      if (AuthService.isLoggedIn() == false) {
        return $state.go('inicio');
      }
      vm.obtenerProductos();
    }
  }

})();

