/**

testing

v=angular.element('[ng-controller=SvenskaController]').scope()

*/


 

var svenskaControllers = angular.module('svenskaControllers', ['ui.bootstrap']);



svenskaControllers.controller('VerbsController', function($scope, $http,userService) {
    $http.get('data/verbs.json?df')
     .then(function(res){
          $scope.items=res.data;
          userService.Init("verbs",res.data);
          $scope.init();
         
        
      });

    $scope.verb=[];
    $scope.verb_ok=[];
    $scope.class=[];
    $scope.verb[0]="";
    $scope.verb[1]="";
    $scope.verb[2]="";
    $scope.verb[3]="";
    $scope.english="";
    

    
   $scope.init=function init(){
      $scope.rand=Math.floor(Math.random()*4);

      $scope.index=userService.getRandomElement();
      var v= $scope.items[$scope.index];

      $scope.verb_ok[0]=v.infinitiv;
      $scope.verb_ok[1]=v.presens;
      $scope.verb_ok[2]=v.preteritum;
      $scope.verb_ok[3]=v.supinum;
      $scope.english=v.english;


       $scope.verb[$scope.rand]=$scope.verb_ok[$scope.rand];
    }



  $scope.next = function next() {
    $scope.clear();
      $scope.init();
    };

 $scope.hint = function ok() {

  for(var i=0;i<4;i++){ 
    if(i!=$scope.rand)
       $scope.hint[i]=$scope.verb_ok[i]
    }

    };

  $scope.clear = function clear() {
      for(var i=0;i<4;i++){ 
          $scope.class[i]="";
          $scope.verb[i]="";
      }
  };

    $scope.ok = function ok() {
      var ok=0;
      for(var i=0;i<4;i++){ 
        if( $scope.verb_ok[i]==$scope.verb[i] ){
          ok++;
          $scope.class[i]="ok";
        }else{
          $scope.class[i]="error";
        }
      }
      if(ok==4){
        userService.ItemSuccess($scope.index);
      }else{
       userService.ItemError($scope.index);
      }

    };

           

   });

/**
level0
*/

svenskaControllers.controller('Level0Controller', function($scope, $http,$location,$timeout,userService,Utility) {
    $http.get('data/level0.json?ff')
     .then(function(res){
          $scope.items=res.data;
          userService.Init("level0",res.data);
          $scope.init();
      

      });

    //userService.RestoreState();
//localStorageService.clearAll();
  // localStorageService.add('userdata',{"level0":{"ko":true,"häst":false}});




    $scope.ok = function ok() {
     
      if( $scope.correct_id==$scope.id){
        $scope.id_class="ok";
        userService.ItemSuccess($scope.index);
        $scope.alerts.push({type:'success',msg: 'bra!'});
      }else{
        userService.ItemError($scope.index);
        $scope.alerts.push({type:'danger',msg: $scope.id+'? nej!'});
      }

      $timeout($scope.next,2000);
       $scope.id_class="";
    };

      $scope.showHint = function showHint() {
 
        $scope.alerts.push({msg: $scope.correct_id});
        $timeout($scope.closeHint,1000);
         // $scope.hint=$scope.correct_id;
        userService.ItemError($scope.index);
   
      }
 $scope.closeHint = function change() {
    $scope.alerts = [];
 }

    $scope.change = function change() {
      $scope.hint="";
      if( $scope.correct_id==$scope.id){
        
          $scope.id_class="ok";
          
         //userService.model.level0.push( {"hehe":true} );
        // userService.SaveState();
         // $scope.finished=true;
     
         // $scope.user.level0.push( {'id':$scope.id,'ok':true});
         // localStorageService.add( "user",$scope.user );
        }else{

          $scope.id_class="error";
        }
    }

    $scope.is_finished = function finished() {
       return $scope.finished;

    };

    $scope.pass = function pass() {
      
    };

  $scope.next = function next() {
    $scope.init() 
    };

  $scope.end = function next() {

      $location.path( "/level_finished" );

    };


    $scope.init = function init() {
         $scope.alerts = [];
        if( userService.LevelFinished()){
          $scope.end();
          return;
        }
        $scope.id="";

        var indx=userService.getRandomElement();
        console.log("em retorna un elm",indx);

        $scope.index=indx;
        var elm=$scope.items[indx];
    
         $scope.english=elm.en;

        $scope.image=elm.img;
        $scope.correct_id=elm.id;
  
    };

});

/**
en ett
*/

svenskaControllers.controller('Level1Controller', function($scope, $http,$location,userService) {
    $http.get('data/level1.json')
     .then(function(res){
      
          $scope.items=res.data;
          userService.Init("level1",res.data);

          $scope.init();
       
      });


    $scope.ok = function ok(type) {
      
    

      if( $scope.current.type==type){
        userService.ItemSuccess($scope.index);
        $scope.alerts.push({type:'success',msg: 'bra! '+$scope.current.res});
      }else{
        userService.ItemError($scope.index);
         $scope.alerts.push({type:'danger',msg: 'nej! '+$scope.current.res});
      }

    };


    $scope.next = function next() {
      $scope.init() 
    };

    $scope.end = function next() {

      $location.path( "/level_finished" );

    };


    $scope.init = function init() {
       $scope.closeHint();
        if( userService.LevelFinished()){
          $scope.end();
          return;
        }
 

        var indx=userService.getRandomElement();
    
        $scope.index=indx;
        $scope.current=$scope.items[indx];
        $scope.english= $scope.current.en;
  
    };

     $scope.closeHint = function change() {
      $scope.alerts = [];
   }


});



svenskaControllers.controller('MenuController', function($scope,$location,userService) {
    //$rootScope.stats=null;
     userService.RestoreState();
    $scope.level0=userService.LevelStats("level0");
     $scope.level1=userService.LevelStats("level1");
    $scope.verbs=userService.LevelStats("verbs");
    $scope.level2="124/400";

     $scope.reset = function reset() {

        userService.reset();
             $location.path( "/menu" );
    };
   });


