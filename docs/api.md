## Classes

<dl>
<dt><a href="#AfterDarkBase">AfterDarkBase</a> ⇐ <code>EventEmitter</code></dt>
<dd></dd>
<dt><a href="#Conversation">Conversation</a> ⇐ <code><a href="#AfterDarkBase">AfterDarkBase</a></code></dt>
<dd></dd>
<dt><a href="#MercuryProxy">MercuryProxy</a> ⇐ <code><a href="#AfterDarkBase">AfterDarkBase</a></code></dt>
<dd></dd>
<dt><a href="#BoardUtils">BoardUtils</a> ⇐ <code><a href="#AfterDarkBase">AfterDarkBase</a></code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#decodeBase64">decodeBase64(b64)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#decodeBase64">decodeBase64(base64)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#encodeBase64">encodeBase64(message)</a> ⇒ <code>string</code></dt>
<dd></dd>
</dl>

<a name="AfterDarkBase"></a>

## AfterDarkBase ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [AfterDarkBase](#AfterDarkBase) ⇐ <code>EventEmitter</code>
    * [new AfterDarkBase()](#new_AfterDarkBase_new)
    * [.AfterDarkBase](#AfterDarkBase.AfterDarkBase)
        * [new AfterDarkBase(spark)](#new_AfterDarkBase.AfterDarkBase_new)

<a name="new_AfterDarkBase_new"></a>

### new AfterDarkBase()
Base AfterDark Class to initialize Internal Spark SDK

<a name="AfterDarkBase.AfterDarkBase"></a>

### AfterDarkBase.AfterDarkBase
**Kind**: static class of [<code>AfterDarkBase</code>](#AfterDarkBase)  
<a name="new_AfterDarkBase.AfterDarkBase_new"></a>

#### new AfterDarkBase(spark)
Creates an instance of AfterDarkBase.


| Param | Type | Description |
| --- | --- | --- |
| spark | <code>any</code> | Initialized Spark Instance |

<a name="Conversation"></a>

## Conversation ⇐ [<code>AfterDarkBase</code>](#AfterDarkBase)
**Kind**: global class  
**Extends**: [<code>AfterDarkBase</code>](#AfterDarkBase)  

* [Conversation](#Conversation) ⇐ [<code>AfterDarkBase</code>](#AfterDarkBase)
    * [new Conversation()](#new_Conversation_new)
    * [.list()](#Conversation+list) ⇒ <code>Array</code>
    * [.get(roomId)](#Conversation+get) ⇒ <code>object</code>

<a name="new_Conversation_new"></a>

### new Conversation()
Conversation utilities class

<a name="Conversation+list"></a>

### conversation.list() ⇒ <code>Array</code>
Wrapper method for listing available conversations.
This is basically equivalent to a rooms list

**Kind**: instance method of [<code>Conversation</code>](#Conversation)  
**Returns**: <code>Array</code> - conversation list  
<a name="Conversation+get"></a>

### conversation.get(roomId) ⇒ <code>object</code>
Get conversation by roomId

**Kind**: instance method of [<code>Conversation</code>](#Conversation)  
**Returns**: <code>object</code> - conversation object  

| Param | Type | Description |
| --- | --- | --- |
| roomId | <code>string</code> | Spark roomId |

<a name="MercuryProxy"></a>

## MercuryProxy ⇐ [<code>AfterDarkBase</code>](#AfterDarkBase)
**Kind**: global class  
**Extends**: [<code>AfterDarkBase</code>](#AfterDarkBase)  

* [MercuryProxy](#MercuryProxy) ⇐ [<code>AfterDarkBase</code>](#AfterDarkBase)
    * [new MercuryProxy()](#new_MercuryProxy_new)
    * _instance_
        * [.start()](#MercuryProxy+start)
        * [.stop()](#MercuryProxy+stop)
        * [.addEventData(event, activity)](#MercuryProxy+addEventData) ⇒ <code>object</code>
        * [.handleIncomingEvent(activity)](#MercuryProxy+handleIncomingEvent) ⇒ <code>object</code>
    * _static_
        * [.MercuryProxy](#MercuryProxy.MercuryProxy)
            * [new MercuryProxy(spark)](#new_MercuryProxy.MercuryProxy_new)

<a name="new_MercuryProxy_new"></a>

### new MercuryProxy()
Class for websocket to chat bot proxy

<a name="MercuryProxy+start"></a>

### mercuryProxy.start()
Call to start the websocket proxy and disconnect from the cloud

**Kind**: instance method of [<code>MercuryProxy</code>](#MercuryProxy)  
<a name="MercuryProxy+stop"></a>

### mercuryProxy.stop()
Call to stop the websocket proxy and disconnect from the cloud

**Kind**: instance method of [<code>MercuryProxy</code>](#MercuryProxy)  
<a name="MercuryProxy+addEventData"></a>

### mercuryProxy.addEventData(event, activity) ⇒ <code>object</code>
**Kind**: instance method of [<code>MercuryProxy</code>](#MercuryProxy)  
**Returns**: <code>object</code> - Webhook Formatted Event Object  

| Param | Type |
| --- | --- |
| event | <code>any</code> | 
| activity | <code>any</code> | 

<a name="MercuryProxy+handleIncomingEvent"></a>

### mercuryProxy.handleIncomingEvent(activity) ⇒ <code>object</code>
**Kind**: instance method of [<code>MercuryProxy</code>](#MercuryProxy)  
**Returns**: <code>object</code> - Webhook Formatted Event Object  

| Param | Type |
| --- | --- |
| activity | <code>any</code> | 

<a name="MercuryProxy.MercuryProxy"></a>

### MercuryProxy.MercuryProxy
**Kind**: static class of [<code>MercuryProxy</code>](#MercuryProxy)  
<a name="new_MercuryProxy.MercuryProxy_new"></a>

#### new MercuryProxy(spark)
Creates an instance of MercuryProxy.
Initialize with spark SDK instance from super class


| Param | Type | Description |
| --- | --- | --- |
| spark | <code>object</code> | Spark SDK Instance |

<a name="BoardUtils"></a>

## BoardUtils ⇐ [<code>AfterDarkBase</code>](#AfterDarkBase)
**Kind**: global class  
**Extends**: [<code>AfterDarkBase</code>](#AfterDarkBase)  

* [BoardUtils](#BoardUtils) ⇐ [<code>AfterDarkBase</code>](#AfterDarkBase)
    * [.list(conversation)](#BoardUtils+list)
    * [.save(channel)](#BoardUtils+save) ⇒ <code>object</code>

<a name="BoardUtils+list"></a>

### boardUtils.list(conversation)
List Available Boards by Conversation

**Kind**: instance method of [<code>BoardUtils</code>](#BoardUtils)  

| Param | Type |
| --- | --- |
| conversation | <code>any</code> | 

<a name="BoardUtils+save"></a>

### boardUtils.save(channel) ⇒ <code>object</code>
Save Board by Board Channel

**Kind**: instance method of [<code>BoardUtils</code>](#BoardUtils)  
**Returns**: <code>object</code> - Board Contents JSON Object  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>any</code> | Spark channel from mercury |

<a name="decodeBase64"></a>

## decodeBase64(b64) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - Decoded base64  

| Param | Type |
| --- | --- |
| b64 | <code>string</code> | 

<a name="decodeBase64"></a>

## decodeBase64(base64) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - Decoded base64  

| Param | Type |
| --- | --- |
| base64 | <code>string</code> | 

<a name="encodeBase64"></a>

## encodeBase64(message) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - Encoded base64  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | string to be encoded |

