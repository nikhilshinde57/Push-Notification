#
## Real Time Notification Server

A web server that work as push notification server. App server is one who publishes the messages for their client and the notification server who pushes the messages to the clients when they are online.  Before start further discussions you can read how push notification service work [here](https://developers.google.com/web/fundamentals/push-notifications/how-push-works).

## **Getting Started**

So, to implement push notification service we need one application service who is responsible for the publishing notifications to notification server and notification server who is responsible for the send that notifications to the client or end user customer.  Here RabbitMQ is used for the holding the notifications published by the app server. MongoDB used for storing the user information.

**The App server whose responsibilities are as listed below:**

1. Admin can create users.
2. Admin can publish messages i.e. publish notifications to the channels.
3. Admin can get user information.
4. End user can log on to the application using his/her user name and password.
5. End user can subscribe to the channel.
6. End user can unsubscribe the channel.
7. If user is logged in, then he/she can see their notifications messages in their command promote.

**The Notification server whose responsibilities are as listed below:**

1. Listen app server to receive notification from app server when it publishes the notifications.
2. Accept events from the user when they are logged in i.e. online or logouts.
3. When user is online establish connection with users queue and if that queue is having any notification send that notification to user else keep watch on that queue and when any notification comes in the users queue read it from the queue and send it to user.
4. When user logout event sends close the connection with users queue so that any notification for that user comes that will be remains in the queue.

**How RabbitMQ is used in this project:**

1. 1Its exchanges are used to send one message or notification to the multiple queues those are having binding with them.
2. 2Every user having its separate queue i.e. single queue represents the customer or user
3. 3Channel represents the exchange i.e. when new channel created that time create the new exchange with that channel name.
4. 4When user subscribe to the channel that time just create the binding between the exchange and the user queue.
5. 5All exchanges are fan out exchanges means when message published to that channel it will send to all queue those are having binding with that exchange.

**How MongoDB is used in this project:**

1. 1The MongoDB is used to store the user information and to maintain the list of subscriber list against the channel.
2. 2User Entity:

{

    username: { type:String, required:true },

    userid: { type:Number, required:true },

    email: { type:String, required:true },

    birthdate: { type:Date, required:false },

    contact: { type:Number, required:true },

    city :{type:String, required :true },

    gender : {type :String, required :true},

    role : {type :String, required :true},

    occupation :{type :String , required:false},

    password: { type:String, required:true, select:false },

    created : {type :Date, default:Date.now}

}

1. 3Channel entity:

{

    name: { type:String, required:true },

    subscribers: [String],

    created : {type :Date, default:Date.now}

}

### **Prerequisites**

To run this project, make sure following setups you have installed on your machine.

- Install Node.js version 8.9.3. You can download it [here](https://nodejs.org/en/download/).
- Install RabbitMQ from [here](https://www.rabbitmq.com/install-windows.html).
- Check your RabbitMQ service is working or not by just hit this [http://localhost:15672/#/](http://localhost:15672/%23/%20) URL on your local web browser. If it is working you will get below web page in response.


	![]( App%20Server/img/RabbitMQLoginPage.PNG)
- Once you see above web page just login with guest account and create the
- Install MongoDB database from [here](https://www.mongodb.com/mongodb-4.0/).

### **Steps to Run**

Before running the app server and notification server make sure your RabbitMQ and MongoDB services running on your local machines.

**Step 1:**

- Open the NotificationServer project in your favourite editor I used Visual studio code. In terminal window run npm install command.
- This will install all the node modules required for this project to run.
- Once above command successfully completed now run npm start command.
- This will start your notification server and on console you can see below message.

![]( App%20Server/img/ScreenShot1.PNG)

Note: You can change the port number for that refer the config file.

**Step 2:**

- Open the App Server project and in the terminal window of the editor run npm install command.
- This will install all the required node modules.
- Now before running npm start make sure that you MongoDb server is running.
- Now run npm start command

-
  ![]( App%20Server/img/ScreenShot2.PNG)



- You can see the server is running message and connected to DB message n the terminal.

Now our both App server and Notification server is running next we will do testing.

## **Running the tests**

Open the postman as next step we are creating user and all.

**Create Admin user:**

 curl -X POST \

  http://localhost:3000/api/users/register \

  -H cache-control: no-cache \

  -H content-type: application/json \

  -H postman-token: 45f4eca5-429f-a35d-87a4-d8ffbcb83b04 \

  -d {

         username: admin,

          birthdate:2018-03-11T14:39:39.331Z,

           email: test@gmail.com,

           contact: 9999999999,

           city :Pune,

           gender : M,

           occupation: Dev,

           password: 1234,

           role:admin

}

**Response:**

Status code: 200 OK

{

    auth: true,

    token: null

}

**Login with admin logout:**

curl -X POST \

  http://localhost:3000/api/auth/login \

  -H cache-control: no-cache \

  -H content-type: application/json \

  -H postman-token: 68fd748e-3747-ff08-e547-294792b3fff4 \

  -d {

    username: admin,

    password: 1234

}

**Response:**

Status code : 200 OK

{

    auth: true,

    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcmlkIjoxNywicm9sZSI6ImFkbWluIiwiaWF0IjoxNTMxNjQ5MDM0LCJleHAiOjE1MzE2NTAyMzR9.u2XE2I9AFJygmzNdmYJnjeoP9fnSjtXz9kgFRaOf1o0

}

**Create User:**

Before crate the user in app server crate the queue in RabbitMQ with name of user that we are creating. In this we will create the queue with name as testuser1

curl -X POST \

  http://localhost:3000/api/users/register \

  -H cache-control: no-cache \

  -H content-type: application/json \

  -H postman-token: ad29753d-f13d-4c5b-f772-7f319402d587 \

  -d {

  username: testuser1,

   birthdate:2018-03-11T14:39:39.331Z,

    email: testuser1@gmail.com,

    contact: 8888888888,

    city :Pune,

    gender : M,

    occupation: Dev,

    password: 1234,

    role:user

}

**Response**** :**

Status code: 200 OK

{

    auth: true,

    token: null

}



**Login with normal user account:**

        Now we just created the test user in our system now use that account credentials and log into the system.

curl -X POST \

  http://localhost:3000/api/auth/login \

  -H cache-control: no-cache \

  -H content-type: application/json \

  -H postman-token: df2f88fe-f163-c879-9680-b4efa7b73fee \

  -d {

    username: testuser1,

    password: 1234

}

**Response** :

Status code: 200 OK

{

    auth: true,

    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyMSIsInVzZXJpZCI6MTksInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTMxNjQ5NDUzLCJleHAiOjE1MzE2NTA2NTN9.O1gN9AjxV1DuvLHUmAEKwaBydlOP-c6X42hekD3\_yP4

}

You will get the token in the response. Which is used for further operations. Once your login successful in app server terminal window you can see the message as shown below:

![]( App%20Server/img/ScreenShot3.PNG)

At the same time in notification server terminal window you can see the message as shown below:

![]( App%20Server/img/ScreenShot4.PNG)

This show the notification server will now know that the user testuser1 is online and the notification server will crate the connection with RabbitMQ queue that is created the channel for that use with RabbitMQ queue.

**Create exchanges:**

Now go to RabbitMQ queue localhost webpage and create the exchange. The exchange is nothing but the channel we are creating to that channel the user will subscribe afterwords.

![]( App%20Server/img/ScreenShot5.PNG)

As shown above screenshot I have created the coke\_studio, sony\_music\_india etc exchanges with type of fanout.  Also in MongoDB create the channels collection and create the below document foe the coke\_studio channel with empty subscriber list.

/\* 1 \*/

{

    \_id : ObjectId(5acc654b337387ebb9dfe596),

    name : coke\_studio,

    created : ISODate(2018-04-10T07:21:22.444Z),

    subscribers : [

    ],

    \_\_v : 4

}

**Subscribe to the Channel:**

The testuser1 will subscribe to the coke\_studio channel by using this API:

curl -X POST \

  http://localhost:3000/api/channels/subscribe \

  -H cache-control: no-cache \

  -H content-type: application/json \

  -H postman-token: 3c92c710-04da-0286-d1dc-202d55117cdf \

  -H x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pa2hpbHNoaW5kZTU3IiwidXNlcmlkIjoxNSwicm9sZSI6InVzZXIiLCJpYXQiOjE1MzE2NTAyODUsImV4cCI6MTUzMTY1MTQ4NX0.McQ38NSJKfIPj\_2IXJJph2biZaMxmjCddeXVe-IobE4 \

  -d {

unsername:testuser1,

channel:coke\_studio

}

**Response:**

Status code: 200 OK

{

    subscribed: true,

    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pa2hpbHNoaW5kZTU3IiwidXNlcmlkIjoxNSwicm9sZSI6InVzZXIiLCJpYXQiOjE1MzE2NTAyODUsImV4cCI6MTUzMTY1MTQ4NX0.McQ38NSJKfIPj\_2IXJJph2biZaMxmjCddeXVe-IobE4

}

Now in app server terminal window you see the below message:

![]( App%20Server/img/ScreenShot6.PNG)

Also, in RabbitMQ you open the testuser1 queue you can see the binding of that queue with coke\_studio exchange.

![]( App%20Server/img/ScreenShot7.PNG)



Now testuser1 is online and he is subscribed to coke\_studio channel. The notification server already created the channel for testuser1.

Now admin will publish the notification using this API:

**Publish Notification:**

Use admin token and send this request:

curl -X POST \

  http://localhost:3000/api/notifications \

  -H cache-control: no-cache \

  -H content-type: application/json \

  -H postman-token: 4456f6b5-f687-a8df-dc33-f031aafeacae \

  -H x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcmlkIjoxNywicm9sZSI6ImFkbWluIiwiaWF0IjoxNTMxNjUxOTc0LCJleHAiOjE1MzE2NTMxNzR9.PnsDX7nI3B6vEVcSCvMKfn1tTaal642zZDYIbXBobJk \

  -d {

        exchangeName:coke\_studio,

        bindingKey:coke\_studio,

        message:Enjoy new Episode of coke studio ep 50th

}





**Response:**

Status code: 200 OK

{

    message\_sent: true,

    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcmlkIjoxNywicm9sZSI6ImFkbWluIiwiaWF0IjoxNTMxNjUxOTc0LCJleHAiOjE1MzE2NTMxNzR9.PnsDX7nI3B6vEVcSCvMKfn1tTaal642zZDYIbXBobJk

}

Now observer the app server and notification server terminal windows you can see something like as shown in below:

App server:

![]( App%20Server/img/ScreenShot8.PNG)

Notification server:

![]( App%20Server/img/ScreenShot9.PNG)

Yahoo 🎉 our objective is achieved the real time notification are received to the user😊.

**Unsubscribe to channel:**

curl -X POST \

  http://localhost:3000/api/channels/unsubscribe \

  -H cache-control: no-cache \

  -H content-type: application/json \

  -H postman-token: 87e62431-9721-79c7-4a86-d534ba0fac9b \

  -H x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyMSIsInVzZXJpZCI6MTksInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTMxNjUzMDA3LCJleHAiOjE1MzE2NTQyMDd9.AOsW6WqMgJhi3p2F5uy-tuOTtfApqBzW7DJNHo5qJo4 \

  -d {

unsername:testuser1,

channel:coke\_studio

}

**Response** :

Status code: 200 OK

{

    unsubscribe: true,

    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyMSIsInVzZXJpZCI6MTksInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTMxNjUzMDA3LCJleHAiOjE1MzE2NTQyMDd9.AOsW6WqMgJhi3p2F5uy-tuOTtfApqBzW7DJNHo5qJo4

}

If you can check the testuser1 queue you will see that the binding with coke\_studio channel is removed.

![]( App%20Server/img/ScreenShot10.PNG)

**Logout user:**

curl -X POST \

  http://localhost:3000/api/auth/logout \

  -H cache-control: no-cache \

  -H content-type: application/json \

  -H postman-token: 86785e35-f3a3-f2f8-d04c-db1f5096fa56 \

  -H x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcmlkIjoxNywicm9sZSI6ImFkbWluIiwiaWF0IjoxNTMxNjUyODk2LCJleHAiOjE1MzE2NTQwOTZ9.V1wkjXjKJihVt5vh5YMGmdM72MaSFA89MK6hBJgN0ws

**Response** :

Status code: 200 OK

{

    logout: true,

    token: null

}

Now to check how it will work when the user is offline. Once again subscribe to the coke\_studi channel using testuser1 user.

Then logout the user using logout API. Now admin will publsihn one new notification to coke\_studi channel. Now the testuser1 is subscribed to the channel and the user is offline then the testuser1 queue will hold that message till the user will come online.

Now login in with the testuser1 account and look at the app server and notification server terminal windows you can see the previous message published by the admin when testuser1 was offline.

Yahoo 🎉 our 2nd scenario when user is offline and when user comes online he/she received the his/her pending notification messages is successfully tested.
