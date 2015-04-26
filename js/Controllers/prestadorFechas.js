angular.module('starter')
.controller('prestadorFechasCtrl', 
    ['$scope', 'dataTableStorageFactory', '$ionicLoading', 'users', '$state','varsFactoryService', '$stateParams', 'pushFactory', 'emailFactory',
	function ($scope, dataTableStorageFactory, $ionicLoading, users, $state, varsFactoryService, $stateParams,  pushFactory, emailFactory) {
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true   

    var prestador = $stateParams.prestadorId;
    $scope.listado =[];
    $scope.datosCita = {}; 

   
  
    $scope.solicitarCita = function(){
        var usuario = users.getCurrentUser();
        var item = varsFactoryService.prestadorSeleccionado();
        var platformPush = pushFactory.getPlatform();
        var fecha = $scope.meses.seleccionado.mes + " " +$scope.dias.seleccionado.dia + " " +
                    $scope.horas.seleccionado.hora + " " + $scope.periodos.seleccionado.periodo;
      
        /*
        var data = {
            prestador : item.username,
            platform : platformPush,
            PartitionKey : item.username,
            RowKey: usuario.username,
            solicitadaPor : usuario.username,
            nombreTabla: 'TmCitas',
            fecha : $scope.datosCita.fecha
        }
        */

        //var textoCita = 'Nueva cita solicitada';
        //pushFactory.enviarMensajePlatform(item.email,textoCita, item.platform);
        //emailFactory.enviarEmail(usuario.email, item.email, 'Cita solicitada', textoCita, textoCita);
        //dataTableStorageFactory.saveStorage(data);

         if(isIE){
            window.external.notify("Push," + usuario.email + "," + ",Cita solicitada por: " + item.RowKey);
         }
    }

    function loadData(){
        dataTableStorageFactory.getJsonData("dias.json").success(success).error(error);
        dataTableStorageFactory.getJsonData("horas.json").success(success).error(error);
        dataTableStorageFactory.getJsonData("meses.json").success(success).error(error);
        dataTableStorageFactory.getJsonData("periodos.json").success(success).error(error);
    }

    function success(data){

        if(data[0].tipo === "dias"){
            $scope.dias = data[0].data;
        }
        else if(data[0].tipo === "meses"){
            $scope.meses = data[0].data;
        }
        else if(data[0].tipo === "horas"){
            $scope.horas = data[0].data;
        }
        else if(data[0].tipo === "periodos"){
            $scope.periodos = data[0].data;
        }
    }

    function error(data){
        console.log(data);
    }

    loadData();

}])