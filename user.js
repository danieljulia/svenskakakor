//var user = angular.module('app', []);
app.factory('userService', ['$rootScope', function ($rootScope) {
    $rootScope.stats;

    var service = {
        model: {
            name: 'dani',
            email: 'dani@kiwoo.org',
            test:'test',
            levels:{},
        
            //vel0:{}
        },
         Init: function (level,data) {

            $rootScope.level=level;

          

           console.log("init",level,data);
            service.level=level;
            service.arr=data;
     
             service.RestoreState();

             if(!service.LevelIsRegistered(level)){
                service.LevelRegister(level);
            }else{
     
            }

              service.LevelStats(level);
          
         

         },

        SaveState: function () {
            console.log("saving ",service.model);

            localStorage.setItem("user",angular.toJson(service.model));
  
        },
        RestoreState: function () {
  
          if(localStorage.getItem("user")){
            service.model = angular.fromJson(localStorage.getItem("user"));
          }
            
         
        },
        LevelIsRegistered: function () {
         

           if(service.model.levels[this.level]==null) return false;
       
           return true;

        },
        LevelRegister: function (level) {
         // if(!service.model.levels) service.model.levels=new Array();
        console.log("registering new level ",level)
           service.model.levels[level]={'num':service.arr.length,'success':[],'errors':[],intents:0};
       
           service.SaveState();
        }, //percentatge d'encerts 20/50
         LevelStats: function (level) {
            /*
            var stats=[];
            console.log("stats0",service.model.levels[level]);
            if(!service.model.levels[level]) return stats;
            var ok=Math.floor(service.model.levels[level].success.length*100/service.model.levels[level].num);
            stats.push({value:ok,type:'success'});
     */   
            $rootScope.stats=false; //{val:0, max:100};

  
            if(!service.model.levels[level]) return;
            $rootScope.stats={};
            
            if(!service.model.levels[level].success ) return;
            $rootScope.stats.ok=service.model.levels[level].success.length;
            $rootScope.stats.max=service.model.levels[level].num;
            $rootScope.stats.errors=service.model.levels[level].errors.length;
            $rootScope.stats.intents=service.model.levels[level].intents;
     

        }, //true false
          LevelFinished: function () {
            var m=service.model.levels[service.level];
     
            if( ((m.success).length + (m.errors).length )>=service.arr.length) return true;
            return false;
        }, //retorna array amb nivells ja resolts
          LevelGetSuceed: function () {
           
        }, //retorna un index aleatori tenint en compte els ja resolts
          LevelGetRandom: function () {
           
        }, //marca item com fallat
          ItemError: function (c) {
           service.model.levels[this.level].errors.push(c);
           service.model.levels[this.level].intents++;
            service.SaveState();
                 service.LevelStats(this.level);
        }, //marca item com fallat
          ItemSuccess: function (c) {
            //if(!service.model.levels[level].success){
            //  service.model.levels[level].success=[];
           // }
            service.model.levels[this.level].success.push(c);
             service.model.levels[this.level].intents++;
            service.SaveState();
                 service.LevelStats(this.level);
           
        },//si no esta fet o no ha sortit mai
          ItemIsSucess: function (c) {
           
        },
        getRandomElement: function () {
          //todo excloure els errors o no?

          var ok=true;
           while(ok){ 
             var indx=Math.floor( Math.random()*this.arr.length );

             if( service.model.levels[this.level].success==undefined ) return indx;
             if( service.model.levels[this.level].success.indexOf(indx) !=-1  ||
              service.model.levels[this.level].errors.indexOf(indx) !=-1 
              ){

             }else{
                return indx;
             }

          }


        },
        

        reset: function () {

            localStorage.clear();
       
        },

    }
    $rootScope.$on("LevelIsRegistered", service.LevelIsRegistered);
    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
}]);

app.factory('Utility', [ function () {
    var service = {
        getRandomElement: function (arr,exclude) {
            console.log(exclude);
            if(exclude!=undefined){ 
                if(arr.length==exclude.length){
                    console.log("no possible!");
                }else{

                    var ok=true;
                    var c=0;
                    while(ok){
                      ok=false;
                       var e= arr[Math.floor( Math.random()*arr.length)];
                       
                       for(var i = 0; i < exclude.length;i++){
                            if( e.id==exclude[i].id ){
                                if(exclude[i].ok){
                                    ok=true;
                                    
                                }
                       
                            }
                        }
                        return e;
                        c++;
                        if(c>10) return "caca";
                    }
                }
            }else{  
               return arr[Math.floor( Math.random()*arr.length)];
            }
        }
       

    }
    return service;
    
}]);

/*
app.factory('user', [ function (localStorageServiceProvider) {
     var service = {
        model: {
            name: 'dani',
            email: 'dani@kiwoo.org',
            level0:{}
            //vel0:{}
        },
        save:function () {
            console.log("save");
            sessionStorage.userService = angular.toJson(service.model);
        },
        restore: function () {
            service.model = angular.fromJson(sessionStorage.userService);
               console.log("restore");
        }
    }

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
    
}]);*/

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}