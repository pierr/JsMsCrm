/*Ui informations*/
var Ui = {
	'disableFields': ["systemName1", "systemName2"],
	'disableFieldsCondition': function(){
		return true;
	},
	'disable': function(isDisable = true){
		for(var i=0, len=Ui.disableFields.length; i < len; i++){
			Xrm.Page.ui.controls.get(Ui.disableFields[i]).setDisabled(isDisable); 
		}	
	},
	/*Describe all the fields that we want to hide.*/
	'hiddenFields': ["systemName3", "SystemName4"],
	'hiddenFieldsCondition': function(){
		return true;
	},
	/*Hide function, hide all the fields that are in the hiddenfields table.*/
	"hide": function(isVisible = false){
		for(var i=0, len=Ui.disableFields.length; i < len; i++){
			Xrm.Page.ui.controls.get("fieldName").setVisible(isVisible);
		}	
	},
}
