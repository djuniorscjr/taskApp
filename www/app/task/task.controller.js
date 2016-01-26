(function() {
    'use strict';

    angular
        .module('domTask')
        .controller('tasksController', tasksController);

    tasksController.$inject = ['taskFactory', '$state', '$ionicActionSheet', 
        'taskService', '$scope', 'ionicToast', '$ionicLoading', '$ionicPopup'];

    function tasksController(taskFactory, $state, $ionicActionSheet, 
            taskService, $scope, ionicToast, $ionicLoadingi, $ionicPopup) {
        var vm = this;

        vm.tasks = [];
        vm.onMarkTask = onMarkTask;
        vm.showTaskStatusOff = false;
        vm.showOptions = showOptions;

        $scope.$on('$ionicView.beforeEnter', function(event) {
           getAllTask();
        });

        function onMarkTask(task) {
            task.finished = !task.finished;
        };

        function getAllTask() {
            return taskFactory.getAllTask()
                .then(function(data) {
                    vm.tasks = data;
                })
        };

        function updateStatus(task) {
            task.finished = !task.finished;
            taskFactory.edit(task._id, task)
                .then(function(data) {
                    ionicToast.show('Successfully Completed Task!', 'middle', false, 1500);
                });
        };
        
        function remove(_id) {
            taskFactory.remove(_id)
                .then(function(data) {
                    ionicToast.show('Successfully Removed Task!', 'middle', false, 1500);
                    getAllTask();
                });
        };

        function showConfirmRemove(_id) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Remove Task',
                template: 'Are you sure you want to remove this task?'
            });

            confirmPopup.then(function(res) {
                if(res){
                    remove(_id);
                }   
            });
        }

        function showOptions(task) {
            var task = task;

            $ionicActionSheet.show({
                titleText: 'Options on Task',
                buttons: [
                    { text: vm.showTaskStatusOff ? '<i class="icon ion-gear-b"></i> Working':
                        '<i class="icon ion-checkmark-round"></i> Finished'},
                    { text: '<i class="icon ion-edit"></i> Edit'  },
                ],
                destructiveText: '<i class="icon ion-trash-a"></i> Delete',
                cancelText: 'Cancel',
                cancel: function() {
                    console.log('CANCELLED');
                },
                buttonClicked: function(index) {
                    
                    if(index === 0){
                        updateStatus(task);
                    }else if(index === 1){
                       $state.go('task-edit', {_id : task._id});
                    }
                    return true;
                },
                destructiveButtonClicked: function() {
                    showConfirmRemove(task._id);
                    return true;

                }

            });
        };

    };

})();
