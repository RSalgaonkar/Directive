// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})




.directive('nanuEmail', ['$compile', '$timeout' , function($compile, $timeout) {
  return {
    // restrict: 'E',
    scope: {},
    require: 'ngModel',
    link: function(scope, elm, attrs, model) {
      var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      var counter = 0, selectedLoopValue = null;
      var emailValidator = function(value) {
          elm.bind('keypress keyup', function(event) {
            event.stopPropagation()
            if(event.keyCode.toString() == '32'){
              var coll = model.$viewValue.split(/[\s]+/);
              for(i in coll){
                // if(selectedLoopValue != coll[i]){
                  if(EMAIL_REGEXP.test(coll[i])){
                    // var template = $compile('<i ng-show="closeButton" ng-click="reset($event)" ng-class='+coll[i]+' class="icon ion-android-close reset-field-icon '+coll[i]+'"></i>')(scope);
                    var template = $compile("<i ng-show='closeButton' ng-click='reset($event)' class='icon ion-android-close reset-field-icon'></i>")(scope);
                    elm.after(template);
                    scope.reset = function(event,className) {
                      // debugger;
                      // var targetClass = event.target.getAttribute('ng-class');
                      // var selectedElements  = document.getElementsByClassName(targetClass);
                      // for(sele in selectedElements){
                      //   selectedElements[sele].remove()
                      // }
                      var inputEle = document.getElementById('email');
                      if(inputEle.value.length == 0){
                        var element = document.getElementsByClassName('ion-android-close');
                        for(sele in element){
                          element[sele].remove();
                        }
                      }
                      model.$setViewValue(null);
                      model.$render();
                      $timeout(function() {
                        elm[0].focus();
                      }, 0, false);
                    };
                    elm.bind('input focus', function() {
                      scope.closeButton = EMAIL_REGEXP.test(value);
                      scope.$apply();
                    })
                    .bind('blur', function() {
                      scope.closeButton = false;
                      scope.$apply();
                    });
                    selectedLoopValue = coll[i]
                    model.$setValidity('email', true);
                    return value;
                  } else {
                    model.$setValidity('email', false);
                    return undefined;
                  }  
                // }
              }  
            }
            // return;
          })
      }
      model.$parsers.push(emailValidator);
      model.$formatters.push(emailValidator);
    }
  }
}])



.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
