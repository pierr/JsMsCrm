(function($) {
    window.Equipement = Backbone.Model.extend({
        defaults: {
            systemname: "equipement",
            name: "Maison",
            id: 0,
            description: "Description",
            nbChambres : 0,
            nbChambreDouble: 0,
            nbChambresReserves: 0,
            nbChambreDoubleReserves: 0,
            nbChambreDisponible: 0,
            nbChambreDoubleDisponible: 0,
            typeEquipement: "Seminaire"
        },
        isFull: function(index) {
            return nbChambreDisponible>0;
        }
    });

    window.Equipements = Backbone.Collection.extend({
        model: Equipement,
        url: "/equipements"
    });

    window.equipementsData = [
        {  systemname: "equipement", id: 0, description: "Description 0", nbChambres : 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv"},
        {  systemname: "equipement", id: 1, description: "Description 1", nbChambres : 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv"},
        {  systemname: "equipement", id: 2, description: "Description 2", nbChambres : 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv"},
        {  systemname: "equipement", id: 3, description: "Description 3", nbChambres : 1, nbChambreDouble: 2, nbChambresReserves: 2, nbChambreDoubleReserves: 3, nbChambreDisponible: 4, nbChambreDoubleDisponible: 5, typeEquipement: "Seminaire dsdvdv"}
    ];



    //window.Maisons  = new Equipements({collection: equipements});

    window.EquipementView = Backbone.View.extend({
        template: "#equipement-template",
        tag: 'li',
        className: 'equipement',

        initialize: function() {
            _.bindAll(this, 'render');
            this.initializeTemplate();
        },
        
        initializeTemplate: function() {
            this.template = _.template($(this.template).html());
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

var EquipementListView = Backbone.View.extend({
    tagName: 'ul',
    className: 'equipements',
    addOne: function (equipement) {
        var equipementView = new EquipementView({ model: equipement });
         $(this.el).append(equipementView.render().el);
    },
    render: function () {
        this.model.forEach(this.addOne, this);
        return this;
    }

});

/*
    window.BackboneSearchEquipement = Backbone.Router.extend({
        routes: {
            '':       'home',
            'blank': 'blank'
        },

        initialize: function() {
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
    $(document).ready(function() {
        var p = new Equipement();
        var ev = new EquipementView({model: p});
       // $('#maisons@').append(ev.render().el);
       console.log("Maisons")
        console.log(window.Maisons);
        console.log("End maisons");
        var es = new window.Equipements();
        es.reset(window.equipementsData);
        window.maisonsView = new EquipementListView({model : es});
       $('#maisons').append(window.maisonsView.render().el);
        
    });

})(jQuery);

// vim:sw=4:ts=4:expandtab
