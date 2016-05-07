
# ng-pubsub

**ng-pubsub** is an AngularJS module that simplifies the way the siblings scopes -or any two other pieces of code- talk each other. AngularJS gives you _$emit_ to dispatch events from a scope to the top of its hierarchy, and _$broadcast_ to dispatch them to the bottom, but no mechanism is given to do that with siblings scopes. **ng-pubsub** fixes this.

## How to

The first step is to download the **ng-pubsub** script. You can do it cloning this repo:
```bash
$ git clone https://github.com/vermicida/ng-pubsub.git
```

Or via NPM:
```bash
$ npm install ng-pubsub
```

Once the library is downloaded, make sure you are referencing it in your `index.html`, just after the AngularJS library reference. The minified version is only recommended for a production environment.
```html
<script src="./node_modules/ng-pubsub/ng-pubsub.js"></script>
```

You must inject the **ng-pubsub** dependency within your module setter:
```javascript
angular.module("test", ["dahr.ng-pubsub"]);
```

To subscribe a scope to an event, just use the `$subscribe` function. An unsubscriber function is returned, so remember to keep it safe:
```javascript
angular
  .module("test")
  .controller("sibling1", function($scope, $pubsub) {
    var unsubscribe = $pubsub.$subscribe("onMessagePublished", function(data) {
      alert(data.message);
    });
  }
);
```

Then, to publish data on that event use `$publish`:
```javascript
angular
  .module("test")
  .controller("sibling2", function($scope, $pubsub) {
    $pubsub.$publish("onMessagePublished", {
      message: "Hi, world"
    });
  }
);
```

If you want to unsubscribe the scope from that event, just do the following:
```javascript
unsubscribe();
```

## License

Code released under the [MIT license](./LICENSE).
