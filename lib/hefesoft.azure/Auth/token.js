angular.module('starter')
.factory('tokenService', [function () {
 
    var tokenServiceFactory = {};
    var tokenString;
 
    tokenServiceFactory.setTokenDocument = function(token){
        if (token)
            document.cookie = "BearerToken=" + token + "; path=/";
    }
 
  	tokenServiceFactory.getTokenDocument = function(token){
        if (tokenString)
            return tokenString;
    } 
 
    return tokenServiceFactory;
}]);