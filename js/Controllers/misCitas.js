angular.module('starter')
.controller('misCitasCtrl', ['$scope', 'dataTableStorageFactory', '$q', 'validarNavegacionService', 'users', '$ionicLoading', 'pushFactory', 'conexionSignalR', 'messageService',
	function ($scope, dataTableStorageFactory, $q, validarNavegacionService, users, $ionicLoading, pushFactory, conexionSignalR, messageService) {
	
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
        var usuario = users.getCurrentUser();
        item.aceptadaUsuario = "3";
        dataTableStorageFactory.saveStorage(item).then(success, error);        
        //pushFactory.enviarMensajeUsername(item.prestadorEmail, "Ha cancelado la cita del dia: " +  item.fecha); 

        //para, de, tipo, mensaje, accion
        var mensaje = [item.RowKey, "cita cancelada"];
        //Debe enviarse con un separador diferente a comas
        mensaje = mensaje.join(";");
        conexionSignalR.procesarMensaje(item.prestadorEmail, usuario.email, "ejecutar accion", mensaje, "cita cancelada");
        conexionSignalR.procesarMensaje(item.prestadorEmail, usuario.email, "mensaje", "Cita cancelada  " +  item.fecha);
    }

    $scope.$on("cambio cita prestador", function(event, args) {
       try{
           var array = args.mensaje.split(';');
           var RowKey = array[0];
           var cambio = array[1];

           var cita = _.find($scope.listado, { 'RowKey': RowKey })

           if(cambio == "cita cancelada"){              
              cambioEstado(cita, "2");              
           }
           else if(cambio == "cita aprobada"){
              cambioEstado(cita, "1");              
           }                  
       }
       catch(ex){           
       }       
    })

    function cambioEstado(cita,  estado){
        $scope.$apply(function () {
             cita.aceptadaPrestador = estado;
        });
    }

    function success(data){
        console.log(data);
    }

    function error(error){
        console.log(error);
    }

	
}])