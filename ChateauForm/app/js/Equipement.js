(function ($) {
    //Modèle d'un équipement.
    window.Equipement = Backbone.Model.extend({
        defaults: {
            systemname: "equipement",
            name: "Maison",
            id: 0,
            description: "Description",
            nbChambres: 0,
            nbChambreDouble: 0,
            nbChambresReserves: 0,
            nbChambreDoubleReserves: 0,
            nbChambreDisponible: 0,
            nbChambreDoubleDisponible: 0,
            typeEquipement: "Maison",
            isActive: true,
            imgSrc: "../img/romainVille.jpg",
            nbPlaceSeminaire: 10,
            isSeminaireFree: true
        },
        initialize: function(){
            var salles = new window.SalleSeminaires();
            salles.reset(window.salleSeminairesData);
            var sallesView = new window.SalleSeminaireListView({model: salles});
            this.set({'seminaireSalles': sallesView});
        },
        isFull: function (index) {
            return nbChambreDisponible > 0;
        },
        activate: function(){
            if(this.get('isActive')){
                this.set({'isActive': false});
                return false;
            } else{
                this.set({'isActive': true});
                return true;
            }
        }
    });

    // Modèle d'une collection d'équipement.
    window.Equipements = Backbone.Collection.extend({
        model: Equipement,
        url: "/equipements"
    });

    // Data equipement.
    window.equipementsData = [
        { systemname: "equipement", imgSrc: "../img/campusBergeSeine.jpg",name: "Campus Les Berges de Seine", id: 0, description: "Description 0", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 1, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Maison", nbPlaceSeminaire: 10 },
        { systemname: "equipement", imgSrc: "../img/rochefort.jpg", name: "Château de Rochefort", id: 1, description: "Description 1", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Maison" },
        { systemname: "equipement", imgSrc: "../img/monceauRio.jpg", name: "Châteauform' City Monceau Rio ", id: 2, description: "Description 2", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Maison" },
        { systemname: "equipement", imgSrc: "../img/romainVille.jpg", name: "Château de Romainville", id: 3, description: "Description 3", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Maison" }
    ];

    //Modèle d'une salle de séminaire.
    window.SalleSeminaire = Backbone.Model.extend({
            defaults: {
                systemname: "equipement",
                name: "Salle de séminaire",
                id: 0,
                description: "Description de la salle de séminaire",
                nbPlaces: 0,
                reservataireId: 0,
                equipementId: 0,
                reservataireName: "Entreprise",
                typeEquipement: "Seminaire",
                isReserved: false
            },
            initialize: function(){
                if(!this.get('isReserved')){
                   this.set({'reservataireName': 'Libre'}); 
                }
            },
            reserve: function(){
                if(this.get('isReserved')){
                    return false;
                } else{
                    this.set({'isReserved': true});
                    return true;
                }
            }
        });
//Salle se seminaire Data
window.salleSeminairesData = [ 
    {id: 0, name:"Salle des champions", description: "Superbe salle avec de jolies fenêtres.", nbPlaces:15, isReserved:true, reservataireId: 1, reservataireName: "EDF"},
    {id: 1, name:"Salle des warriors", description: "Superbe salle avec de jolies portes.", nbPlaces:22},
    {id: 2, name:"Salle des masters", description: "Superbe salle avec de jolies chaises.", nbPlaces:8, isReserved:true, reservataireId: 2, reservataireName: "Klee"},
    {id: 3, name:"Salle des rois", description: "Superbe salle avec de jolies tableaux.", nbPlaces:85},
    {id: 4, name:"Salle des reines", description: "Superbe salle avec de jolies tables.", nbPlaces:45},
    {id: 5, name:"Salle des dieux", description: "Superbe salle avec de jolies assiettes.", nbPlaces:35, isReserved:true, reservataireId: 4, reservataireName: "Microsoft"},
    {id: 6, name: "Salle des geux", description: "Superbe salle avec de jolies tapisseries.", nbPlaces:25}
];

//Collection de reservation day.
    window.SalleSeminaires = Backbone.Collection.extend({
        model: SalleSeminaire,
        url: "/equipements"
    });
    //Alert Model.
    // Attributes;
    // Name => Alert
    //content => Alert content.
    //Type in {"none = Warning,  error, success, info"}
    window.Alert = Backbone.Model.extend({
        // defaults values
        defaults: {
            title: "Alerte",
            content: "Contenu de l \'alerte",
            type: ""
        },
        initialize: function () {
            this.processCssClass();
        },
        //Find the correct css class to apply to the alert.
        processCssClass: function(){
            var alertType = this.get('type');
            var cssClass = alertType === 'error' ? 'alert-error' : ( alertType === 'success' ? 'alert-success':(alertType === 'info' ? 'alert-info' : '' ));
            this.set({'cssClass': cssClass});
        }
    });



    //Reservation Dat Model.
    //Provide a model for the equipement reservation.
    window.ReservationDay = Backbone.Model.extend({
        defaults: {
            systemname: "reservation",
            name: "Jour de réservation",
            id: 0,
            equipementId: 0,
            description: "Description de la réservation",
            date: new Date(),
            nbChambres: 0,
            nbChambreDouble: 0,
            nbChambresReserves: 0,
            nbChambreDoubleReserves: 0,
            nbChambreDisponible: 0,
            nbChambreDoubleDisponible: 0,
            typeEquipement: "Seminaire",
            singleCssClass: 'success',
            doubleCssClass: 'success',
            nbPlaceSeminaire: 10,
            isSeminaireFree: true,
            seminaireCssClass: 'success'
        },
        initialize: function () {
            this.processNbChbCssClass(true);
            this.processNbChbCssClass(false);
            this.processSeminaireCssClass();
            var salles = new window.SalleSeminaires();
            salles.reset(window.salleSeminairesData);
            var sallesView = new window.SalleSeminaireListView({model: salles});
            this.set({'seminaireSalles': sallesView});
        },
        processSeminaireCssClass: function(){
            var cssClass = this.get('isSeminaireFree') ? 'btn-info' : 'btn-danger';
            this.set({'seminaireCssClass': cssClass});
        },
        processNbChbCssClass: function (isSingle) {
            var cssClassName = isSingle ? 'singleCssClass' : 'doubleCssClass';
            var chbDispo = isSingle ? 'nbChambreDisponible' : 'nbChambreDoubleDisponible';
            var nbChbName = isSingle ? 'nbChambres': 'nbChambreDouble';
            var nbChb = this.get(chbDispo);
            var avg = this.get(nbChbName)/2;
            var cssClass  =  nbChb == 0 ? 'btn-danger' : (nbChb < avg ? 'btn-warning' : 'btn-success') ;
            if(isSingle){
                this.set({ 'singleCssClass' : cssClass });
            } else{
                this.set({ 'doubleCssClass' : cssClass });
            }
        },
        reserve: function(isSingle){
            var chbDispo = isSingle ? 'nbChambreDisponible' : 'nbChambreDoubleDisponible';
            var chbReserved = isSingle ? 'nbChambresReserves' : 'nbChambreDoubleReserves';
            var nbCD = this.get(chbDispo);
            var nbCR = this.get(chbReserved);
            if(nbCD == 0){
                return false;
            }else{
                if(isSingle){
                    this.set({ 'nbChambresReserves': nbCR +1 , 'nbChambreDisponible' : (nbCD - 1)});
                }else{

                    this.set({ 'nbChambreDoubleReserves': nbCR +1 , 'nbChambreDoubleDisponible' : (nbCD - 1)});
                }
                this.processNbChbCssClass(isSingle);  
                return true;
            }
        }

    });
    //Collection de reservation day.
    window.ReservationDays = Backbone.Collection.extend({
        model: ReservationDay,
        url: "/reservations"
    });



    /*All the day data*/
    window.reservationDayData = [
        { systemname: "equipement", date: new Date("1/10/2012"), id: 0, equipementId: 0, description: "Description 0", nbChambres: 10, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 0, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv", nbPlaceSeminaire: 10, isSeminaireFree: true },
        { systemname: "equipement", date: new Date("2/10/2012"), id: 1, equipementId: 0, description: "Description 0 1", nbChambres: 5, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv", nbPlaceSeminaire: 55, isSeminaireFree: false },
        { systemname: "equipement", date: new Date("3/10/2012"), id: 2, equipementId: 0, description: "Description 0 2", nbChambres: 4, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv", nbPlaceSeminaire: 44, isSeminaireFree: true  },
        { systemname: "equipement", date: new Date("4/10/2012"), id: 3, equipementId: 0, description: "Description 0 3", nbChambres: 8, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv", nbPlaceSeminaire: 34, isSeminaireFree: false  },
        { systemname: "equipement", date: new Date("1/10/2012"), id: 4, equipementId: 1, description: "Description 0", nbChambres: 3,nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv", nbPlaceSeminaire: 22, isSeminaireFree: true  },
        { systemname: "equipement", date: new Date("2/10/2012"), id: 5, equipementId: 1, description: "Description 1", nbChambres: 2, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv", nbPlaceSeminaire: 10, isSeminaireFree: false  },
        { systemname: "equipement", date: new Date("3/10/2012"), id: 6, equipementId: 1, description: "Description 2", nbChambres: 5, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 0, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv", nbPlaceSeminaire: 77, isSeminaireFree: true  },
        { systemname: "equipement", date: new Date("4/10/2012"), id: 7, equipementId: 1, description: "Description 3", nbChambres: 10, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv",nbPlaceSeminaire: 88, isSeminaireFree: true  },
        { systemname: "equipement", date: new Date("1/10/2012"), id: 8, equipementId: 2, description: "Description 0", nbChambres: 19, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv",nbPlaceSeminaire: 22, isSeminaireFree: true  },
        { systemname: "equipement", date: new Date("2/10/2012"), id: 9, equipementId: 2, description: "Description 1", nbChambres: 2, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 0, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" ,nbPlaceSeminaire: 37, isSeminaireFree: false },
        { systemname: "equipement", date: new Date("3/10/2012"), id: 10, equipementId: 2, description: "Description 2", nbChambres: 6, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv", nbPlaceSeminaire: 10, isSeminaireFree: false  }
        //{ systemname: "equipement", date: new Date("4/10/2012"), id: 11, equipementId: 2, description: "Description 3", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4,   : 5, typeEquipement: "Seminaire" }
    ];


    /*Reservation Equipement 0.*/
    window.reservationDayData1 = [
        { systemname: "equipement", date: new Date("1/10/2012"), id: 0, equipementId: 0, description: "Description 0", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("2/10/2012"), id: 1, equipementId: 0, description: "Description 0 1", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("3/10/2012"), id: 2, equipementId: 0, description: "Description 0 2", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("4/10/2012"), id: 3, equipementId: 0, description: "Description 0 3", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
    ];
    /*Reservation Equipement 1.*/
    window.reservationDayData2 = [
        { systemname: "equipement", date: new Date("5/10/2012"), id: 4, equipementId: 1, description: "Description 0", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("6/10/2012"), id: 5, equipementId: 1, description: "Description 1", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("7/10/2012"), id: 6, equipementId: 1, description: "Description 2", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("8/10/2012"), id: 7, equipementId: 1, description: "Description 3", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" }
    ];

    /*Réservation Equipement 2.*/
    window.reservationDayData3 = [
        { systemname: "equipement", date: new Date("9/10/2012"), id: 8, equipementId: 2, description: "Description 0", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("10/10/2012"), id: 9, equipementId: 2, description: "Description 1", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("11/10/2012"), id: 10, equipementId: 2, description: "Description 2", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("1/11/2012"), id: 11, equipementId: 2, description: "Description 3", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" }
    ];

    /*Réservation Equipement 4.*/
    window.reservationDayData4 = [
        { systemname: "equipement", date: new Date("2/11/2012"), id: 12, equipementId: 3, description: "Description 0", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("3/11/2012"), id: 13, equipementId: 3, description: "Description 1", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("4/11/2012"), id: 14, equipementId: 3, description: "Description 2", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("5/11/2012"), id: 15, equipementId: 3, description: "Description 3", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" }
    ];

    //window.Maisons  = new Equipements({collection: equipements});

    window.EquipementView = Backbone.View.extend({
        tagName: 'li',
        template: "#equipement-template",
        initialize: function () {
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
            this.initializeTemplate();
        },
        initializeTemplate: function () {
            this.template = _.template($(this.template).html());
        },
        events: {
        "click": "activate"
        },
        processActivateClass: function(){
            if(this.model.get('isActive')){
                $(this.el).addClass('active'); 
            }else{
                $(this.el).removeClass('active');
            }
        },

        activate: function(){
            this.model.activate();
        },
        render: function () {
            this.processActivateClass();
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    // Vue d'une liste de salle de séminaires.
    window.EquipementListView = Backbone.View.extend({
        tagName: 'ul',
        className: 'equipements nav nav-stacked nav-pills',
        addOne: function (equipement) {
            var equipementView = new EquipementView({ model: equipement });
            $(this.el).append(equipementView.render().el);
        },
        render: function () {
           this.model.forEach(this.addOne, this);
            return this;
        }

    });

    //Vue d'une salle de séminaire.
    window.SalleSeminaireView = Backbone.View.extend({
        tagName: 'div',
        template: "#salleSeminaire-template",
        initialize: function () {
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
            this.initializeTemplate();
        },
        initializeTemplate: function () {
            this.template = _.template($(this.template).html());
        },
        events: {
        "click": "reserve"
        },
        reserve: function(){
            this.model.reserve();
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

     // Vue d'une liste de salle de séminaires.
    window.SalleSeminaireListView = Backbone.View.extend({
        tagName: 'div',
        className: 'salleSeminaires',
        addOne: function (salleSeminaire) {
            var salleSeminaireView = new SalleSeminaireView({ model: salleSeminaire });
            $(this.el).append(salleSeminaireView.render().el);
        },
        render: function () {
          $(this.el).empty();  
           this.model.forEach(this.addOne, this);
            return this;
        }

    });

    //Alert view.
    //Display a message on the page.
    //Uses a twitter Bootstrap alert.
    // Model: AlertModel.
    window.AlertView = Backbone.View.extend({
        tagName: 'div',
        className: 'message',
        template: "#alert-template",
        initialize: function () {
            _.bindAll(this, 'render');
            this.initializeTemplate();
        },
        initializeTemplate: function () {
            this.template = _.template($(this.template).html());
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
    //Vue d'un jour de réservation.
    window.ReservationDayView = Backbone.View.extend({
        tagName: 'td',
        template: "#reservationDay-template",
        initialize: function () {
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
            this.initializeTemplate();
        },
        events: {
        "click a.reserveSingle": "reserveSingle",
        "click a.reserveDouble": "reserveDouble",
        "click a.pop": "showSalleDetail"
        },

        initializeTemplate: function () {
            this.template = _.template($(this.template).html());
        },
        render: function () {
            //this.model.processSingleCssClass();
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        showSalleDetail: function(event){
            var ttl = this.model.get('name');
            var html = this.model.get('seminaireSalles').render().el;
            $(event.target).popover({title: ttl, content: html, placement: "right"});
        },
        reserveSingle: function(){
            this.reserve(true);
        },
        reserveDouble: function(){
            this.reserve(false);
        },
        reserve: function(isSingle){
            if(!this.model.reserve(isSingle)){
                var alert = new Alert({
                    'type': 'error',
                    'title': 'Erreur',
                    'content': 'The room is full. Please choose another.'
                });
                this.addAlert(alert);
            } else{
                var date = this.model.get('date');
                var alert = new Alert({
                    'type': 'success',
                    'title': 'Reservation succeed.',
                    'content': 'This room has been reserved on: ' + date.getFullYear() +'/' + date.getDate() + '/' + date.getDay() + '.'
                });
                this.addAlert(alert);
                this.render();              
            }
        },
        addAlert: function(alert){
            $('div#messages').html(new AlertView({model: alert}).render().el);
        }

    });

    window.ReservationDayListView = Backbone.View.extend({
        className: 'equipements table table-striped',
        tagName: 'div',
        addOne: function (reservation) {
            var reservationView = new ReservationDayView({ model: reservation });
            $(this.el).append(reservationView.render().el);
        },
        render: function () {
            // Get all the equipements ids.
            var dates = _.uniq(this.model.pluck("date"));
            console.log("Dates" + dates);
            var html = '<thead><tr>';
            dates.forEach(function (date) {
                html += '<th>' + date.getFullYear() +'/' + date.getDate() + '/' + date.getDay() +'</th>';
            }, this);
            html += '</tr></thead>';
             $(this.el).append(html);
  //          $(this.el).append('<tbody>')

            // Get all the equipements ids.
            var ids = _.uniq(this.model.pluck("equipementId"));
            // Create a line in the table for all the equipements.             
            ids.forEach(function (id) {
                $(this.el).append('<tr>');
                this.model.where({ equipementId: id }).forEach(this.addOne, this);
                $(this.el).append('</tr>');
            }, this);
            return this;
        }
    });

    /*
    window.BackboneSearchEquipement = Backbone.Router.extend({
    routes: {
    '':       'home',
    'blank': 'blank'
    },

    initialize: function() {x
    this.maisonsView = new EquipementListView({
    collection:   window.maisons
    });
    }
    ,

    home: function() {
    $('#container').empty();
    $("#container").append(this.maisonsView.render().el);
    },

    blank: function() {
    $('#container').empty();
    $('#container').text('blank');
    }
    });

    */
    $(document).ready(function () {
        var p = new Equipement();
        var ev = new EquipementView({ model: p });
        // $('#maisons@').append(ev.render().el);
        console.log("Maisons");
        console.log(window.Maisons);
        console.log("End maisons");
        var es = new window.Equipements();
        es.reset(window.equipementsData);
        window.maisonsView = new window.EquipementListView({ model: es });
        $('#maisons').append(window.maisonsView.render().el);

        /*Process Reservations*/
        var res = new window.ReservationDays();
        console.log("Reservation day data length: " + window.reservationDayData.length);
        res.reset(window.reservationDayData);
        console.log("Reservation day model data length: " + res.model.toJSON);
    
        window.reservationsView = new window.ReservationDayListView({ model: res });
        $('#reservations').append(window.reservationsView.render().el);
        console.log("Reservations");
        console.log(window.reservationsView.el);
        console.log("END Reservations");
        
        //Salles.
        var salles = new SalleSeminaires({model: window.salleSeminairesData});
        salles.reset(window.salleSeminairesData);
        console.log('Salles');
        console.log("Salles 0 - " +salles.at(0).get('name') + " Taille: " + salles.length + "  Derniere salle" + salles.at(salles.length -1).get('name')     )
        var sallesView = new SalleSeminaireListView({model: salles});
        console.log("Salles Views");
        console.log(sallesView.render().el)
    });

})(jQuery);
