# Web Push Notifications with Realtime
This project shows how to use the Web Push Notifications API in a website, allowing easy engagement with users that are currently not browsing the website. This project uses the Realtime Messaging JavaScript SDK and requires Chrome 50+ or Firefox 44+.

## Realtime + Web Push Notifications guide

- Register to get your free Realtime Messaging application key at [https://accounts.realtime.co/signup/](https://accounts.realtime.co/signup/)

- Create a Firebase Cloud Messaging project. [Follow this tutorial](http://messaging-public.realtime.co/documentation/starting-guide/mobilePushGCM.html).

- Update the Web App Manifest file (`manifest.json`) and enter your Firebase Sender ID obtained from the previous step:

		{
		  "name": "Realtime Web Push Demo",
		  "short_name": "Web Push Demo",
		  "gcm_sender_id": "<YOUR_FIREBASE_SENDER_ID>"		  
		}

- Open the `index.html` file and replace the Firebase initialization code shown below with the configuration code you got in the previous step:

		  <!-- START INITIALIZATION CODE -->
		  <script src="https://www.gstatic.com/firebasejs/3.5.0/firebase.js"></script>
		  <script>
		    // Initialize Firebase
		    var config = {
		      ...
		    };
		    firebase.initializeApp(config);
		  </script>
		  <!-- END INITIALIZATION CODE -->

- In the `index.js` file replace the Realtime demo application key (K4xqxB) with your own Realtime application key:

		var RealtimeAppKey = "K4xqxB"; 
	
- Edit the `service-worker.js` file enter your Firebase Sender ID in the `messagingSenderId` property:

		firebase.initializeApp({
		  'messagingSenderId': '915139563807'
		});

- Map a webserver to folder where you have cloned this repository, open http://localhost/index.html in your Chrome/Firefox browser and try it out. If it doesn't work as expected have a look at the limitations and troubleshooting sections below.                           
		

## Limitations
1. This will only work on Chrome 50+ and Firefox 44+
2. If you are not using localhost you must use the https protocol (it will work on localhost with http)
3. At least one Chrome/Firefox tab must be opened in order to receive push notifications 

## Troubleshooting

### Unable to subscribe to push

* Check that you have entered the right Firebase configurations, namely your Firebase Sender ID in the `gcm_sender_id` of your manifest.json file;

* Don't forget to give permissions for the notifications when your browser requests them;

* Make sure your webserver is properly configured to serve the file manifest.json (check if there are no errors in Chrome Developers Tool network tab). IIS users may need to add the MIME type; 

* If you're not using localhost make sure you are using the https protocol with a valid SSL certificate for the domain you are using;  

## Private channel vs Global channel
If you want to control to which users you are sending each push you should use a private channel for each user. If you want to broadcast a push notification to all users you should use a global channel that every user subscribes.

A mixed private/global channel strategy can also be used, it really depends on your use case.

## On-line example
You can test the Realtime Web Push Notifications [here](https://framework.realtime.co/demo/web-push).
