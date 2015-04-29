angular.module('starter')
.controller('signUpController', ['$scope', 'signFactoryService','$ionicLoading', '$state',
	function ($scope, signFactoryService, $ionicLoading, $state) {
	
	$scope.loginData= {};

	$scope.doSignUp = function(){
		$ionicLoading.show();
		signFactoryService.signUp($scope.loginData).then(success, error);
	}

	//Apenas se registre se loguea en la app
	function success(data){
		signFactoryService.sign(data).then(successLogin, error);
	}

	function successLogin(data){
		console.log(data);
		$ionicLoading.hide();
	}

	function error(data){
		$ionicLoading.hide();
		console.log(data);
	}

	$scope.goLogin = function(){
		$state.go('sigin');
	}

}])