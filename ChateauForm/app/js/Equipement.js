(function ($) {
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
            typeEquipement: "Seminaire",
            isActive: true,
            cssClass: 'active'
        },
        isFull: function (index) {
            return nbChambreDisponible > 0;
        },
        activate: function(){
            if(this.get('isActive')){
                this.set({'isActive': false, 'cssClass': '' });
            } else{
                this.set({'isActive': true, 'cssClass': 'active' });
            }
        }
    });

    window.Equipements = Backbone.Collection.extend({
        model: Equipement,
        url: "/equipements"
    });

    window.equipementsData = [
        { systemname: "equipement", id: 0, description: "Description 0", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 1, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", id: 1, description: "Description 1", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", id: 2, description: "Description 2", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", id: 3, description: "Description 3", nbChambres: 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" }
    ];

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
            singleCssClass: 'success'
        },
        initialize: function () {
            this.processSingleCssClass();
        },
        processSingleCssClass: function () {
            var nbChb = this.get('nbChambreDisponible');
            var avg = this.get('nbChambres')/2;
            var cssClass  =  nbChb == 0 ? 'btn-danger' : (nbChb < avg ? 'btn-warning' : 'btn-success') ;
            this.set({ 'singleCssClass': cssClass });
        },
        reserve: function(){
            var nbCD = this.get('nbChambreDisponible');
            var nbCR = this.get('nbChambresReserves');
            if(nbCD == 0){
                return false;
            }else{
                this.set({ 'nbChambresReserves': nbCR +1 , 'nbChambreDisponible' : (nbCD - 1)});
                this.processSingleCssClass();  
                return true;
            }
        }

    });
    //Collection de reservation day.
    window.ReservationDays = Backbone.Collection.extend({
        model: ReservationDay,
        url: "/equipements"
    });



    /*All the day data*/
    window.reservationDayData = [
        { systemname: "equipement", date: new Date("1/10/2012"), id: 0, equipementId: 0, description: "Description 0", nbChambres: 10, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 0, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("2/10/2012"), id: 1, equipementId: 0, description: "Description 0 1", nbChambres: 5, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("3/10/2012"), id: 2, equipementId: 0, description: "Description 0 2", nbChambres: 4, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("4/10/2012"), id: 3, equipementId: 0, description: "Description 0 3", nbChambres: 8, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("1/10/2012"), id: 4, equipementId: 1, description: "Description 0", nbChambres: 3,nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("2/10/2012"), id: 5, equipementId: 1, description: "Description 1", nbChambres: 2, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("3/10/2012"), id: 6, equipementId: 1, description: "Description 2", nbChambres: 5, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 0, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("4/10/2012"), id: 7, equipementId: 1, description: "Description 3", nbChambres: 10, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("1/10/2012"), id: 8, equipementId: 2, description: "Description 0", nbChambres: 19, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("2/10/2012"), id: 9, equipementId: 2, description: "Description 1", nbChambres: 2, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 0, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" },
        { systemname: "equipement", date: new Date("3/10/2012"), id: 10, equipementId: 2, description: "Description 2", nbChambres: 6, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv" }
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
            this.initializeTemplate();
        },
        initializeTemplate: function () {
            this.template = _.template($(this.template).html());
        },
        events: {
        "click": "activate"
        },
        activate: function(){
            this.model.activate();
            className = this.model.get('isActive');
            $(this.el).addClass('active');
            this.render();
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });
    //Alert view.
    window.AlertView = Backbone.View.extend({
        tagName: 'div',
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

    window.EquipementListView = Backbone.View.extend({
        tagName: 'ul',
        className: 'equipements nav nav-tabs nav-stacked',
        addOne: function (equipement) {
            var equipementView = new EquipementView({ model: equipement });
            $(this.el).append(equipementView.render().el);
        },
        render: function () {
           this.model.forEach(this.addOne, this);
            return this;
        }

    });

    window.ReservationDayView = Backbone.View.extend({
        tagName: 'td',
        template: "#reservationDay-template",
        initialize: function () {
            _.bindAll(this, 'render');
            this.initializeTemplate();
        },
        events: {
        "click button.reserve": "reserve"
        },

        initializeTemplate: function () {
            this.template = _.template($(this.template).html());
        },
        render: function () {
            //this.model.processSingleCssClass();
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        reserve: function(){
            if(!this.model.reserve()){
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
                html += '<th>' + date.getDate() +'</th>';
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
    });

})(jQuery);
