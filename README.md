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

```json
{
	"action":"nextSong", //action you want to do (can not begin with _)
	"key":"home|laptop" //client selectors (each client has to advertise with list of selectors)
}
```

Response example: 

```json
{
	"status": "ok", //event sent
	"sentTo": 5 //sent to 5 clients
}
```

### Getting events

To get events inside of client, you need to connect to websocket, at /gate and advertise your keys... (home, laptop, etc)

So, communication would look something like this: 

client:

```json
{
	"message": "subscribe",
	"keys": "home|laptop"
}
```

And, when server recieve event, it will send it as is... 

