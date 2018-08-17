sap.ui.define([], function () {
	"use strict";
	return {
		statusText: function (sStatus) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (sStatus) {
				case "A":
					return resourceBundle.getText("invoiceStatusA");
				case "B":
					return resourceBundle.getText("invoiceStatusB");
				case "C":
					return resourceBundle.getText("invoiceStatusC");
				default:
					return sStatus;
			}
		},
		date: function(value) {
			var txt = '';
			if (value) {
				var year = value.substr(0, 4);
				var month = value.substr(5, 2);
				var day = value.substr(8, 2);

				txt= year + "/" + month + "/" + day;
			}
			return txt;
		}
	};
});