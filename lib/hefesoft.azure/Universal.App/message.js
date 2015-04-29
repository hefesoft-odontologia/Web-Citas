angular.module('starter').
service('UniversalApps', ['$timeout', function ($timeout) {
	
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	var dataFactory = {};


	/*
		Este servicio se utiliza para comunicarse con universal app el timer se utiliza para enviar mensajes 
		con intervalos de 6 segundos ya que la app de windows universal limpia los mensajes cada 5 segundos
	*/

	dataFactory.alert = function(mensaje){
		$timeout(function(){

			 if(isIE){
	            window.external.notify("Alert," + mensaje);
	         }

		},6000);

		
	}

	dataFactory.toast = function(mensaje){
		$timeout(function(){

			if(isIE){
	            window.external.notify("Toast," + mensaje);
	         }

		},6000);


		
	}

	dataFactory.login = function(username, password){
		$timeout(function(){

			if(isIE){
				window.external.notify("Ingreso," + username + "," + password);
			}

		},1000);


	}

	dataFactory.push = function(to, mensaje){

		$timeout(function(){

			if(isIE){
	            window.external.notify("Push," + to + "," + mensaje);
	         }

		},6000);

		
	}	

	return dataFactory;


}])