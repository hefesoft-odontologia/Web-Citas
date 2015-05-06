angular.module('starter')
.controller('prestadorFechasCtrl', 
    ['$scope', 'dataTableStorageFactory', '$ionicLoading', 'users', '$state','varsFactoryService', '$stateParams', 'pushFactory', 'emailFactory', 'UniversalApps', 'validarNavegacionService', '$q', '$timeout', 'messageService', 'conexionSignalR',
	function ($scope, dataTableStorageFactory, $ionicLoading, users, $state, varsFactoryService, $stateParams,  pushFactory, emailFactory, UniversalApps, validarNavegacionService, $q, $timeout, messageService, conexionSignalR) {
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;   

    var prestador = $stateParams.prestadorId;
    $scope.listado =[];
    $scope.datosCita = {}; 

    var valido = validarNavegacionService.validarPacienteSeleccionado();
   
    if(valido){
        loadData();       
    }
  
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
            fecha : fecha,            
            aceptadaPrestador : 0,
            aceptadaUsuario : 1,
            imagen : item.imagen,
            respuestaPrestador : '',
            mes: JSON.stringify($scope.meses.seleccionado),
            dia : JSON.stringify($scope.dias.seleccionado),
            hora: JSON.stringify($scope.horas.seleccionado),
            periodo : JSON.stringify($scope.periodos.seleccionado),
            prestadorEmail : item.email,
            prestadorObject : JSON.stringify(item),
            usuario : JSON.stringify(usuario),
            usuarioEmail : usuario.email
        }
        
        var mensaje = "Deseo una cita para  " + fecha;
        dataTableStorageFactory.saveStorage(data).then(citaSolicitada, error);        
        //pushFactory.enviarMensajeUsername(item.email, "Cita solicitada para: " + fecha);
        
        //para, de, tipo, mensaje, accion
        conexionSignalR.procesarMensaje(item.email, usuario.email, 'mensaje', mensaje);
        UniversalApps.alert("Cita solicitada en espera de respuesta.", 8)

    }

    function loadData(){
        var usuario = users.getCurrentUser();
        var item = varsFactoryService.prestadorSeleccionado();

        var promise1 = dataTableStorageFactory.getJsonData("dias.json");
        var promise2 = dataTableStorageFactory.getJsonData("horas.json");
        var promise3 = dataTableStorageFactory.getJsonData("meses.json");
        var promise4 = dataTableStorageFactory.getJsonData("periodos.json");
        var promise5 =dataTableStorageFactory.getTableByPartitionAndRowKey('TmCitas', item.username, usuario.username)

        $q.all([promise1, promise2, promise3, promise4, promise5]).then(function(data){
            var dias = data[0].data[0].data;
            var horas = data[1].data[0].data;
            var meses = data[2].data[0].data;
            var periodos = data[3].data[0].data;
            var citaSolicitada = data[4].data;

            $scope.dias = dias;
            $scope.meses = meses;
            $scope.horas = horas;
            $scope.periodos = periodos;            

            if(citaSolicitada != null){
                /*
                    $scope.dias.seleccionado = JSON.parse(citaSolicitada.dia);
                    $scope.meses.seleccionado = JSON.parse(citaSolicitada.mes);
                    $scope.horas.seleccionado = JSON.parse(citaSolicitada.hora);
                    $scope.periodos.seleccionado = JSON.parse(citaSolicitada.periodo);
                */

                $scope.citasolicitada = "Ya tienes una cita solicitada para el : " + citaSolicitada.fecha 
                + ' por favor espere la respuesta de la misma en el modulo mis citas'; 
            }
            
        });

    }

        

    function error(data){
        console.log(data);
    }

    function citaSolicitada(data){       
       messageService.showMessage('Cita solicitada por favor espere a que esta sea aprobada por el prestador');       
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
}])