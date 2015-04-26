angular.module('starter')
.controller('prestadorCtrl', ['$scope', 'dataTableStorageFactory', '$ionicLoading', 'users', '$state','varsFactoryService',
	function ($scope, dataTableStorageFactory, $ionicLoading, users, $state, varsFactoryService) {
	$scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
	
    $scope.listado =[];
    $scope.datosCita = {};

    $scope.irFechas = function(item){
        varsFactoryService.fijarPrestador(item);
        $state.go('app.prestadorFecha', { "prestadorId": item.RowKey});        
    }  

    function obtenerDatos(){
	  	$ionicLoading.show();
	  	dataTableStorageFactory.getTableByPartition('TmPrestador', 'PrestadoresOdontologia')
	  	.success(success)
	  	.error(error);
    }

    function success(data){
    	$ionicLoading.hide();
        $scope.listado = data;
    }

    function error(error){
    	console.log(error);
    }

    obtenerDatos();


}])