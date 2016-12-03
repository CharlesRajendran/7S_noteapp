(function(){

var app  = angular.module('notes_app', ['ionic','notes_app.storage'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

// $stateProvider - Used for routing like $routeProvider
// $urlRouterProvider - Used for redirecion

app.config(function($stateProvider,$urlRouterProvider){
    // state has url, controllerm templateUrl
    
    $stateProvider.state("list",{
        url:"/list",
        controller:"list_controller",
        templateUrl:"views/list.html"
    });
    
    $stateProvider.state("edit",{
        url:"/edit/:noteId",
        templateUrl:"views/edit.html",
        controller:"edit_controller"
    });
    
    
    $stateProvider.state("create",{
        url:"/create",
        templateUrl:"views/edit.html",
        controller:"create_controller"
    });
    
    $urlRouterProvider.otherwise('/list');
});


   
app.controller("list_controller",["$scope","notes_store",function($scope,notes_store){
   $scope.reordering_status = false;
   $scope.tasks = notes_store.list();
   $scope.remove = function(noteId){
       notes_store.remove(noteId);
   };
   $scope.move = function(note,fromIndex,toIndex){
       notes_store.move(note,fromIndex,toIndex);
   };
   
   $scope.reordering = function(){
       $scope.reordering_status = !$scope.reordering_status;
   };
   
}]);


app.controller("edit_controller",["$scope","$state","$location","notes_store",function($scope,$state,$location,notes_store){
        
//        angular copy will let us to keep a copy of data, where if we put the below code without
//        angular copy then it will be writing to the reference
        $scope.note = angular.copy(notes_store.get($state.params.noteId));
        $scope.task_title = "Edit Task";
        $scope.save = function(note){
            notes_store.edit(note);
            $location.path("/list");
        };
}]); 

app.controller("create_controller",["$scope","$state","notes_store",function($scope,$state,notes_store){
        $scope.note = {
            id:new Date().getTime().toString(),
            title:"",
            description:""
        };
        
        $scope.task_title = "New Task";
        $scope.save = function(note){
            notes_store.create(note);
//            a replacement for $location.path, but no slashes
            $state.go("list"); 
        };  
}]);

}());