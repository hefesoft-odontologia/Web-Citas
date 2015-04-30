angular.module('starter')
.controller('misCitasCtrl', ['$scope', 'dataTableStorageFactory', '$q', 'validarNavegacionService', 'users', '$ionicLoading',
	function ($scope, dataTableStorageFactory, $q, validarNavegacionService, users, $ionicLoading) {
	
	var valido = validarNavegacionService.validarUsuarioSeleccionado();
   
    if(valido){
        loadData();       
    }


    function loadData(){
    	var usuario = users.getCurrentUser();
    	$ionicLoading.show();
    	dataTableStorageFactory.getTableByRowKey('TmCitas', usuario.username) 
    	.success(function (data) {
            $ionicLoading.hide();           
            $scope.listado = data;
        })
        .error(function (error) {
            console.log(error);
            $ionicLoading.hide();            
        });
    }

	
}])