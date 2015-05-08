angular.module('starter').
controller('recaptchaController', ['$scope', '$state', '$timeout', 'varsFactoryService', 
	function($scope, $state, $timeout, varsFactoryService){
	
	$scope.activarIngreso = false;

	function validarPlataforma(){
	  var deviceInformation = ionic.Platform.device();
      var isAndroid = ionic.Platform.isAndroid();
      var isWebView = ionic.Platform.isWebView();
      var isIPad = ionic.Platform.isIPad();
      var isIOS = ionic.Platform.isIOS();
      var isAndroid = ionic.Platform.isAndroid();
      var isWindowsPhone = ionic.Platform.isWindowsPhone();

      var currentPlatform = ionic.Platform.platform();
      var currentPlatformVersion = ionic.Platform.version();

      if(isAndroid || isWindowsPhone ||  isIOS){
      	  varsFactoryService.captchaSet('mobile');          
          $state.go("sigin");
      }

	}

	$scope.irLogin = function(){
		$state.go("sigin");
	}

	 $scope.setCaptcha = function(response){
    	$scope.$apply(function () {
    		varsFactoryService.captchaSet(response);
            $scope.activarIngreso = true;
        });
  	};

  	validarPlataforma();
}])