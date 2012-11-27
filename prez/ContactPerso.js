//Conteneur de l'ensemble des Klee.
var Klee = {};

//Js object which contains the contact for Klee.
Klee.contact = {};

//Description des champs disponibles dans la page de contact
Klee.contact.fields = {
	firstname: "firstname",
	lastName: "lastName",
	mobilephone: "mobilephone"
}

Klee.contact.nameChange = function(){
	var attribute = Xrm.Page.getAttribute(Klee.contact.fields.firstname);
	 attribute.setValue("pierre");
	 Klee.utils.toUpperCase(attribute);
}

//Cache le champ téléphone mobile.
Klee.contact.hideTelephoneMobile = function(){
	Xrm.Page.ui.controls.get(Klee.contact.fields.mobilephone).setVisible(false);
}

//Fonction qui est appellée au chargement de la page.
Klee.contact.onLoad = function(){
	Klee.contact.hideTelephoneMobile();
	Klee.contact.nameChange();
	//var fieldsToHide = [Klee.contact.fields.lastName, Klee.contact.fields.mobilephone];
	//Klee.utils.hideFields(fieldsToHide);
};


/* Util class for crm.*/
Klee.utils = {};


Klee.utils.hideFields =  function(arrayOfFields){
	if(typeof(arrayOfFields) === "object"){
		var length = arrayOfFields.length;
		for (var i=0;i<length;i++){ 
			Xrm.Page.ui.controls.get(arrayOfFields[i]).setVisible(false);
		}	
	}

}
//To uppercase for an attribute.
Klee.utils.toUpperCase = function(attribute){
	 if (attribute != null) {
	 	attribute.setValue(attribute.getValue().toUpperCase().trim());
	 }
}