sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"UI5_Master_Detail_Will/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("UI5_Master_Detail_Will.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
				//initialize router
			jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
			var router = this.getRouter();
			this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
			router.initialize();
		}
	});
});