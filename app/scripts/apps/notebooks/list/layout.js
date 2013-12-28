/*global define */
define([
    'underscore',
    'app',
    'backbone',
    'text!apps/notebooks/list/templates/layout.html',
    'backbone.mousetrap',
    'marionette',
], function (_, App, Backbone, Templ) {
    'use strict';

    var Layout = App.module('AppNotebook.List.Layout');

    /**
     * Layout view
     */
    Layout.View = Backbone.Marionette.Layout.extend({
        template: _.template(Templ),

        regions: {
            notebooks :  '#notebooks',
            tags      :  '#tags'
        },

        keyboardEvents: { },

        initialize: function () {
            this.keyboardEvents[App.settings.navigateBottom] = 'next';
            this.keyboardEvents[App.settings.navigateTop] = 'prev';
        },

        /**
         * Navigation: next
         */
        next: function () {
            if ( !this.activeRegion) {
                this.activeRegion = 'notebooks';
            }
            this[this.activeRegion].currentView.trigger('next');
            this[this.activeRegion].currentView.on('changeRegion', this.changeNext, this);
        },

        /**
         * Navigation: prev
         */
        prev: function () {
            if ( !this.activeRegion) {
                this.activeRegion = 'notebooks';
            }
            this[this.activeRegion].currentView.trigger('prev');
        },

        changeNext: function (region) {
            if (this.options[region] !== 0) {
                this.activeRegion = region;
            }
        }

    });

    return Layout.View;
});
