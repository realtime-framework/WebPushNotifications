
var WebPushManager = function(){
}

WebPushManager.prototype.start = function(callback) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(this.getRegistrationId(callback));
  } else {
    callback('Service workers aren\'t supported in this browser.', null);
  }
}

WebPushManager.prototype.getRegistrationId = function (callback) {
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {

    var fb_messaging = firebase.messaging();
    fb_messaging.useServiceWorker(serviceWorkerRegistration);

    fb_messaging.requestPermission()
      .then(function() {
        console.log('Notification permission granted.');

        fb_messaging.getToken()
          .then(function(currentToken) {
            if (currentToken) {
              callback(null, currentToken);
            } 
          })
          .catch(function(err) {
            callback(err)
          });
      })
      .catch(function(err) {
        console.log('Unable to get permission to notify. ', err);
        callback(err);
      });
    });
}

WebPushManager.prototype.forceNotification = function(message) {
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.active.postMessage(message);
  });
}
