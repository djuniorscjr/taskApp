(function() {
    'use strict';

    angular
        .module('domTask')
        .factory('taskFactory', taskFactory);

    taskFactory.$inject = ['$http', 'URL'];

    function taskFactory($http, URL) {
        return {
            getAllTask: getAllTask,
            getById: getById,
            save: save,
            edit: edit,
            remove: remove
        };
        
        function getAllTask() {
           return $http.get(URL + 'api/tasks/')
               .then(getAllTaskComplete)
               .catch(getAllTaskFailed);

           function getAllTaskComplete(response) {
                return response.data;
           }

           function getAllTaskFailed(error) {
                console.log(error);
           }

        };
        
        function getById(_id) {
           return $http.get(URL + 'api/tasks/' + _id)
               .then(getByIdComplete)
               .catch(getByIdFailed);

           function getByIdComplete(response) {
                return response.data;
           }

           function getByIdFailed(error) {
                console.log(error);
           }

        };

        function save(task) {
            return $http.post(URL + 'api/tasks/', task)
                .then(saveSuccefuly)
                .catch(saveFailed);

            function saveSuccefuly(response) {
                return response;   
            }

            function saveFailed(error) {
                console.log(error);
            }
        };
        
        function edit(_id, task) {
            return $http.put(URL + 'api/tasks/'+ _id , task)
                .then(editSuccefuly)
                .catch(editFailed);

            function editSuccefuly(response) {
                return response;   
            }

            function editFailed(error) {
                console.log(error);
            }
        }

        function remove(_id) {
           return $http.delete(URL + 'api/tasks/'+ _id)
                .then(deleteSuccefuly)
                .catch(deleteFailed);

            function deleteSuccefuly(response) {
                return response;   
            }

            function deleteFailed(error) {
                console.log(error);
            }
        }
    };
    
    angular
        .module('domTask')
        .service('taskService', taskService);

    function taskService() {
        
    };

})();
