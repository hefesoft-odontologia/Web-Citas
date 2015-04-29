angular.module('starter')
.controller('prestadorFechasCtrl', 
    ['$scope', 'dataTableStorageFactory', '$ionicLoading', 'users', '$state','varsFactoryService', '$stateParams', 'pushFactory', 'emailFactory', 'UniversalApps',
	function ($scope, dataTableStorageFactory, $ionicLoading, users, $state, varsFactoryService, $stateParams,  pushFactory, emailFactory, UniversalApps) {
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
                    $scope.horas.seleccionado.hora + " " + $scope.periodos.seleccionado.periodo + " minutos";
      
        
        var data = {
            prestador : item.username,
            platform : platformPush,
            PartitionKey : item.username,
            RowKey: usuario.username,
            solicitadaPor : usuario.username,
            nombreTabla: 'TmCitas',
            fecha : fecha
        }
        
        dataTableStorageFactory.saveStorage(data).then(citaSolicitada, error);
        UniversalApps.push(usuario.email, "Cita solicitada por: " + item.email, 1);
        UniversalApps.toast("Cita solicitada en espera de respuesta.", 6)

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

    function citaSolicitada(data){
         //var textoCita = 'Nueva cita solicitada';
        //pushFactory.enviarMensajePlatform(item.email,textoCita, item.platform);
        //emailFactory.enviarEmail(usuario.email, item.email, 'Cita solicitada', textoCita, textoCita);
        $state.go('app.citasolicitada');
    }


    //Primero se valida que se hayan cargado los combos
    //luego que algo se haya seleccionado algo en cada combo
    $scope.validar = function(){
        if($scope.hasOwnProperty('meses') && $scope.hasOwnProperty('dias') && $scope.hasOwnProperty('horas') && $scope.hasOwnProperty('periodos') ){
            if($scope.meses.hasOwnProperty('seleccionado') && $scope.dias.hasOwnProperty('seleccionado') && $scope.horas.hasOwnProperty('seleccionado') && $scope.periodos.hasOwnProperty('seleccionado')){
                return false;
            }
            else{
                return true;
            }
        }
        else{
            return true;
        }
    }

    loadData();

}])