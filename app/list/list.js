'use strict';

angular.module('devApp.list', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'list/list.html',
    controller: 'ListController'
  });
}])

.controller('ListController', ['$uibModal', function($uibModal) {
    var vm = this;

    vm.list = [
        {
            name: "Teste da silva",
            document: "000.000.001-91",
            email: "teste@dasilva.com",
            size: "EG",
            type: "Primeiro lote",
            status: "OK",
            genre: "Masculina"
        },
        {
            name: "Teste da silva",
            document: "000.000.001-91",
            email: "teste@dasilva.com",
            size: "EG",
            type: "Primeiro lote",
            status: "OK",
            genre: "Masculina"
        },
        {
            name: "Teste da silva",
            document: "058.529.839-42",
            email: "teste@dasilva.com",
            size: "EG",
            type: "Primeiro lote",
            status: "NÃO REALIZADO",
            genre: "Feminina"
        }
    ];

    vm.confirm = function(list) {
        if (list.status === 'OK') {
            $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-undo',
                ariaDescribedBy: 'modal-body-undo',
                templateUrl: 'undo.html',
                size: 'lg',
                controller: function($scope) {
                    $scope.selected = list;
                    $scope.ok = function(id) {
                        console.log(id);
                    };

                    $scope.cancel = function() {
                        this.close();
                    };
                }
            });
            return;
        }

        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-info',
            ariaDescribedBy: 'modal-body-info',
            templateUrl: 'info.html',
            size: 'lg',
            controller: function($scope) {
                $scope.selected = list;
            }
        });

    };
}]);