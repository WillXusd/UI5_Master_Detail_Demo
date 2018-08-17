sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"UI5_Master_Detail_Will/model/formatter"
], function(Controller, UIComponent, JSONModel, MessageToast,formatter) {
	"use strict";

	return Controller.extend("UI5_Master_Detail_Will.controller.Detail", {
		formatter:formatter,
		onInit: function() {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
			this.changeBtn();
			this.getEnabled();
		},
		_onObjectMatched: function(oEvent) {
			var sPathDetail = decodeURIComponent(
				oEvent.getParameter("arguments").sPath);
			var model = new sap.ui.model.json.JSONModel();
			var oModel = this.getView().getModel("invoice");
			model.setData(oModel.getProperty(sPathDetail));
			this.getView().setModel(model, "detailModel");
			this.getView().bindElement({
				path: sPathDetail
			});
		},
		//Set whether input can be edited
		getEnabled: function() {
			this.getView().setModel(new JSONModel({
				enabled: false
			}), "EnabledModel");
		},
		//Toggle display hidden button
		changeBtn: function() {
			this.getView().setModel(new JSONModel({
				isAccept: false,
				isEdite: true,
				isCancel: false
			}), "changeBtn");
		},
		//Editing operation
		onEdit: function() {
			var changeBtn = this.getView().getModel("changeBtn"),
				EnableModel = this.getView().getModel("EnabledModel");
			changeBtn.setData({
				isAccept: true,
				isEdite: false,
				isCancel: true
			});
			EnableModel.setData({
				enabled: true
			});
			var msg = 'You have chosen to edit.';
			MessageToast.show(msg);
		},
		//saving operation
		onSave: function() {
			this.getView().getModel("changeBtn").setData({
				isAccept: false,
				isEdite: true,
				isCancel: false
			});
			this.getView().getModel("EnabledModel").setData({
				enabled: false
			});
			var msg = 'Saved successfully.';
			MessageToast.show(msg);
		},
		//cancel operation
		onCancel: function() {
			this.onSave();
			var msg = 'Canceled successfully.';
			MessageToast.show(msg);
		}
	});

});