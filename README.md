# Timeout Cancellation

## Promise Race Method

```js 
Promise.race()
```

This ```Promise.race()``` method takes an iterable of promises as input and returns a single Promise. This returned promise settles with the eventual state of the first promise that settles. 

Additionally, with Abort Controller method that supports aborting either by cancelling or timeout.

## AbortController

The AbortController interface represents a controller object that allows you to abort one or more Web requests as and when desired.
You can create a new AbortController object using the AbortController() constructor. Communicating with a DOM request is done using an AbortSignal object.
