'use strict';

angular.module('devApp.list', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'list/list.html',
    controller: 'ListController'
  });
}])

.controller('ListController', ['$uibModal', '$http', '$log', function($uibModal, $http, $log) {
  var vm = this;
  vm.list = [];
  vm.realized = 0;
  vm.notRealized = 0;

  function changeStatus(status) {
    if (status === 'OK') {
      return 'NÃO REALIZADO';
    }
    return 'OK';
  }

  vm.confirm = function(list) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title-info',
      ariaDescribedBy: 'modal-body-info',
      templateUrl: 'info.html',
      size: 'lg',
      controller: 'ModalController',
      controllerAs: 'control',
      resolve: {
        list: list
      }
    });

    modalInstance.result.then(function(selectedItem) {
      selectedItem.status = changeStatus(selectedItem.status);
      selectedItem.date = new Date();
      $log.info(selectedItem);
      $http.put(
        'http://localhost:3000/participants/' + selectedItem.id,
        selectedItem, {}
      ).then(function(result) {
        $log.info(result);
        update();
      });
    }, function() {
      $log.info('modal-component dismissed at: ' + new Date());
    });
  };

  update();
  setInterval(update, 10000);

  function update() {
    $http.get('http://localhost:3000/participants')
      .then(function(result) {
        vm.list = result.data;
        vm.realized = vm.list.filter(function(item) {
          return item.status == 'OK';
        }).length;
        vm.notRealized = vm.list.length - vm.realized;
      });
  }
}])

.controller('ModalController', ['$uibModalInstance', 'list', function($uibModalInstance, list) {
  var vm = this;

  vm.selected = list;
  vm.certificate = list.certificate ? list.certificate : "NAO";

  vm.getMessage = function() {
    if (vm.selected.status === 'OK') {
      return "Confirme os dados para cancelar o CheckIn";
    }

    return "Confirme os dados para realizar o CheckIn";
  };

  vm.ok = function() {
    vm.selected.certificate = vm.certificate;
    $uibModalInstance.close(vm.selected);
  };

  vm.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
}]);