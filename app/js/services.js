'use strict';
/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').
  value('test', 'supthen').
  factory('DataSource', ['$http',function($http){
       return {
           get: function(callback, route, lastTime){
                $http.get(
                  'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=sf-muni&r='+route+'&t='+lastTime || 0,
                    {transformResponse:function(data) {
                      // convert the data to JSON and provide
                      // it to the success function below
                        var json = xml2json.parser( data );
                        // lastTime = json.body.lasttime.time;
                        return json;
                        },
                    }
                ).
                success(function(data, status) {
                    // send the converted data back
                    // to the callback function
                    callback(data);
                })
           }
       }
    }]);
