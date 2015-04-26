angular.module('starter')
.factory('tokenService', [function () {
 
    var tokenServiceFactory = {};
 
    tokenServiceFactory.setTokenDocument = function(token){
        if (token)
            document.cookie = "BearerToken=" + token + "; path=/";
    }
 
 
    return tokenServiceFactory;
}]);