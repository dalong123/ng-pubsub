/**
 * @name ng-pubsub
 * @version 0.0.3
 * @license MIT
 * @author Diego Herrera
 * @description ng-pubsub is an AngularJS module that simplifies the way the siblings scopes -or any two other pieces of code- talk each other.
 */

(function(window) {

    "use strict";

    if (window && window.angular) {

        angular.module("dahr.ng-pubsub", []).service("$pubsub", function () {

            var topics = {};
            var hasOwnProperty = topics.hasOwnProperty;

            /**
             * Pushes a handler to the given topic.
             * @param topic The topic to push the handler in.
             * @param handler The handler to be pushed.
             * @returns {Function} The handler unsubscriber.
             */
            this.$subscribe = function(topic, handler) {
                if (!hasOwnProperty.call(topics, topic)) {
                    topics[topic] = [];
                }
                var index = topics[topic].push(handler) - 1;
                return function () {
                    delete topics[topic][index];
                }
            };

            /**
             * Publish data in the given topic.
             * @param topic The topic to publish in.
             * @param data The data to publish.
             */
            this.$publish = function(topic, data) {
                if (!hasOwnProperty.call(topics, topic)) {
                    return;
                }
                topics[topic].forEach(function (handler) {
                    handler(data || {});
                });
            };
        });
    }
    else {
        window.console.error("ng-pubsub: AngularJS must be loaded first. More info at https://angularjs.org/.");
    }

})(window);
