angular.module('starter')
.controller('signInController', ['$scope','signFactoryService','$ionicLoading','$state', 'users', 'pushFactory', 'UniversalApps','signalrService', '$timeout', 'conexionSignalR', 'platformService',
	function ($scope, signFactoryService, $ionicLoading, $state, users, pushFactory, UniversalApps, signalrService, $timeout, conexionSignalR, platformService) {
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	$scope.loginData= {};
	var usuario = users.getCurrentUser();

	if(!angular.isUndefined(usuario) && usuario.email.length >0){
		$scope.loginData.username = usuario.email;
		$scope.loginData.password = usuario.password;
		//$state.go("app.citas");	
	}

	$scope.registrarse = function(){
		$state.go("signup");
	}

	$scope.doSign = function(){
		$ionicLoading.show();
		signFactoryService.sign($scope.loginData).then(success, error);		
	}

	function success(data){
		UniversalApps.login($scope.loginData.username, $scope.loginData.password);
		console.log(data);
		$ionicLoading.hide();
		$state.go("app.citas");

		if(platformService.esMobile()){
			pushFactory.registerAndroid();
		}
		
		//para, de, tipo, mensaje, accion
		//Esta instruccion es para inicializar el proxy
        conexionSignalR.procesarMensaje($scope.loginData.username, $scope.loginData.username, '', "");

        //Pruebas
        //para, de, tipo, mensaje, accion
        //conexionSignalR.procesarMensaje("futbolito152@gmail.com", "futbolito152@gmail.com", 'mensaje', "Hola");
	}	

	function error(data){
		console.log(data);
		$ionicLoading.hide();
	}

}])