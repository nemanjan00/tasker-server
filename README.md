# tasker-server

tasker-server is Web API for passing requests to clients. 

It will pass request in realtime and will not store it anywhere. 

## Clients

 * [tasker-client](https://github.com/nemanjan00/tasker-client)

## API

### Sending events

[![Postman](https://raw.githubusercontent.com/postmanlabs/postmanlabs.github.io/develop/global-artefacts/postman-logo%2Btext-320x132.png)](https://www.getpostman.com/collections/43060ae3bdf2e6d6339a)

Request example: 

POST /

```javascript
{
	"action":"nextSong", //action you want to do (can not begin with _)
	"key":"home|laptop" //client selectors (each client has to advertise with list of selectors)
}
```

Response example: 

```javascript
{
	"status": "ok", //event sent
	"sentTo": 5 //sent to 5 clients
}
```

### Getting events

To get events inside of client, you need to connect to websocket, at /gate and advertise your keys... (home, laptop, etc)

So, communication would look something like this: 

client:

```javascript
{
	"message": "subscribe",
	"keys": "home|laptop"
}
```

And, when server recieve event, it will send it as is... 

### Tasker example task

```xml
<TaskerData sr="" dvi="1" tv="4.8u5m">
	<Task sr="task6">
		<cdate>1476936446375</cdate>
		<edate>1476949681640</edate>
		<id>6</id>
		<nme>Next Song</nme>
		<pri>100</pri>
		<Action sr="act0" ve="7">
			<code>547</code>
			<Str sr="arg0" ve="3">%Server</Str>
			<Str sr="arg1" ve="3">localhost:3000</Str>
			<Int sr="arg2" val="0"/>
			<Int sr="arg3" val="0"/>
		</Action>
		<Action sr="act1" ve="7">
			<code>116</code>
			<Str sr="arg0" ve="3">%Server</Str>
			<Str sr="arg1" ve="3"/>
			<Str sr="arg2" ve="3">{"action":"nextSong","key":"home"}</Str>
			<Str sr="arg3" ve="3"/>
			<Str sr="arg4" ve="3"/>
			<Int sr="arg5" val="10"/>
			<Str sr="arg6" ve="3">application/json</Str>
			<Str sr="arg7" ve="3"/>
			<Int sr="arg8" val="0"/>
		</Action>
	</Task>
</TaskerData>
```

