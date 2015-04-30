angular.module('starter')
.controller('misCitasCtrl', ['$scope', 'dataTableStorageFactory', '$q', 'validarNavegacionService', 'users', '$ionicLoading', 'pushFactory',
	function ($scope, dataTableStorageFactory, $q, validarNavegacionService, users, $ionicLoading, pushFactory) {
	
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;  
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

    $scope.cancelar = function(item){
        item.aceptadaUsuario = 2;
        dataTableStorageFactory.saveStorage(item).then(success, error);        
        pushFactory.enviarMensajeUsername(item.prestadorEmail, "Ha cancelado la cita del dia: " +  item.fecha); 
    }

    function success(data){
        console.log(data);
    }

    function error(error){
        console.log(error);
    }

	
}])