angular.module('noteApp', [])
    .controller('NoteCtrl', ['$scope', function ($scope) {
        $scope.notes = '';
        //剩余字数
        $scope.noteCount = function () {
            return (100 - $scope.notes.length);
        }
        $scope.save = function () {
            localStorage.notes = $scope.notes;
            $scope.notes = ''
            alert('保存成功~~');
        }
        $scope.read = function () {
            const note = localStorage.notes
            if(note) {
                this.notes = note
            }
        }
        $scope.clear = function () {
           $scope.notes = '';
        }
    }])