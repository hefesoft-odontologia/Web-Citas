angular.module('starter')
.factory('varsFactoryService', [function () {
	
	var vars = {};
	var prestadorSeleccionado;
	var captcha;
	var captchaFijado = false;
	var proxyInicializado = false;
    var proxyEnLinea = false;
    var modoDesarrollo = false;

	vars.fijarPrestador = function(prestador){
		prestadorSeleccionado = prestador;
	}

	vars.prestadorSeleccionado = function(){
		return prestadorSeleccionado;
	}


	//Si ya se llamo a la funcion inicializar
    vars.setproxyInicializado = function(item){
        proxyInicializado = item;
    }

    vars.setproxyEnLinea = function(item){
        proxyEnLinea = item;
    }

	//Si ya se llamo a la funcion inicializar
    vars.obtenerproxyInicializado = function(){
        return proxyInicializado;
    }

    vars.obtenerproxyEnLinea = function(){
        return proxyEnLinea;
    }

	vars.captchaSet = function(response){
		captcha = response;
		captchaFijado = true;
	}

	vars.captchaFijado = function(){
		return captchaFijado;
	}

	vars.getModoDesarrollo = function(){
		return modoDesarrollo;
	}

	return vars;
	
}])