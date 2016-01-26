( function() {
    'use strict';

    angular
        .module('domTask')
        .controller('taskSaveController', taskSaveController);

    taskSaveController.$inject = ['taskFactory', 'ionicToast', '$stateParams', 'taskService'];

    function taskSaveController(taskFactory, ionicToast, $stateParams, taskService) {
        var vm = this;

        vm.task = {};
        vm.editTask = false;
        vm._id = $stateParams._id;
        vm.save = save;
        vm.edit = edit;

        if(vm._id){
            vm.editTask = true;
            getById(vm._id);
        }

        function save(task) {
            taskFactory.save(task)
                .then(function(data) {
                    ionicToast.show('Task Registered Successfully!', 'middle', false, 1500);
                    vm.task = {};
                });
        };

        function edit(task) {
            taskFactory.edit(vm._id, task)
                .then(function(data) {
                    ionicToast.show('Task Edited Successfully!', 'middle', false, 1500);
                });
        };

        function getById(_id) {
            taskFactory.getById(_id)
                .then(function(data) {
                    vm.task = data;
                });
        };

    };
})()
