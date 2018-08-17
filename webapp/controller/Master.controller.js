sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	'sap/ui/model/Filter',
	'sap/ui/model/Sorter',
	"sap/ui/model/FilterOperator",
	"UI5_Master_Detail_Will/model/formatter"
], function(Controller, UIComponent, Filter, Sorter,FilterOperator, formatter) {
	"use strict";

	return Controller.extend("UI5_Master_Detail_Will.controller.Master", {
		formatter: formatter,
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},
		//Jump to the Detail Page with parameter
		handleListSelect: function(oEvent) {
			var oItem = oEvent.getSource();
			var sPath = oItem._aSelectedPaths[0];
			this.oRouter.navTo("Detail", {
				sPath: encodeURIComponent(sPath)
			});
		},
		//Fuzzy query on field ProductName
		onSearch: function(oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}
			// filter binding
			var oList = this.byId("orders");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		//open filter fragment
		onFilter: function() {
			if (!this._oDialog_f) {
				this._oDialog_f = sap.ui.xmlfragment("UI5_Master_Detail_Will.view.filter", this);
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog_f.open();
		},
		//open sort fragment
		onSort: function() {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("UI5_Master_Detail_Will.view.sorter", this);
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},
		//According to the ProductName、the ShipperName、the Status and the VAT.
		onViewSettingsConfirm_sorter: function(oEvent) {
			var oinfoitems = this.getView().byId("orders");
			var oBindingItems = oinfoitems.getBinding("items");
			var mParams = oEvent.getParameters();
			var aSorters = [],
				sPath, bDescending;
			if (mParams.sortItem) {
				sPath = mParams.sortItem.getKey();
				bDescending = mParams.sortDescending;
				aSorters.push(new Sorter(sPath, bDescending));
			}
			oBindingItems.sort(aSorters);
		},
		onViewSettingsConfirm_filter: function(oEvent) {
			var oinfoitems = this.getView().byId("orders");
			var oBindingItems = oinfoitems.getBinding("items");
			var mParams = oEvent.getParameters();
			var aFilters = [];
			jQuery.each(mParams.filterItems, function(i, oItem) {
				var aSplit = oItem.getKey().split("___");
				var sPath = aSplit[0];
				var sOperator = aSplit[1];
				var sValue1 = aSplit[2];
				var oFilter = new Filter(sPath, sOperator, sValue1);
				aFilters.push(oFilter);
			});
			oBindingItems.filter(aFilters);
		}
	});

});