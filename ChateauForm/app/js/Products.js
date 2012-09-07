
// Defind e.
var Product = Backbone.Model.extend({
    defaults: {
        description: 'Empty product description',
        price: 0.00,
        name: "Empty product name",
        quantity: 1,
        status: "incomplete",
        isReturn: true
    },
    toogleIsReturn: function () {
        if (this.get('isReturn')) {
            this.set({ 'isReturn': false });
            this.set({ 'name': 'Empty Name + false' });
        } else {
            this.set({ 'isReturn': true });
            this.set({ 'name': 'Empty Name + true' });
        }
    }
});

//Define the view of a product.
var ProductView = Backbone.View.extend({
    tagName: 'tr',
    className: 'product',
    template: _.template('<input type=number value=<%= quantity%> /> <td><%= name %></td><td><%= price %></td><td><%= description %></td>' + '<td><input type=checkbox ' + '<% if(isReturn) print("checked") %> /></td>' + '<td><button type="button" class="btn btn-inverse btn-small delete">X</button></td>'),
    initialize: function () {
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
    },
    events: {
        "change input[type=checkbox]": "toogleIsReturn",
        "click button.delete": "btnDeleteClick"
    },
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
    },

    toogleIsReturn: function () {
        this.model.toogleIsReturn();
    },
    btnDeleteClick: function () {
        this.model.destroy();
    }
});

/*Collection de prduits (model)*/
var ProductList = Backbone.Collection.extend({
    model: Product
    /*url: 'api/Products/GetAllProducts'*/
});

/*Collection de prduits (vue)*/

var ProductListView = Backbone.View.extend({
    tagName: 'table',
    className: 'products',
    initialize: function () {
        this.collection.on('add', this.addOne, this);
    },
    addOne: function (product) {
        var productView = new ProductView({ model: product });
        this.el.append(productView.render().el);
    },
    render: function () {
        this.collection.Each(this.addOne, this);
    }

});


var product = new Product();
var productView = new ProductView({ model: product });
productView.render();
console.log(productView.el);
$('table#prd').html(productView.el);


var productList = new ProductList();
var products = [
    { description: 'Beautiful product 1', price: 1.00, name: "Product 1", quantity: 1, status: "incomplete", isReturn: false },
    { description: 'Beautiful product 2', price: 2.00, name: "Product 2", quantity: 1, status: "complete", isReturn: true },
    { description: 'Beautiful product 3', price: 3.00, name: "Product 3", quantity: 1, status: "incomplete", isReturn: false },
    { description: 'Beautiful product 4', price: 4.00, name: "Product 4", quantity: 1, status: "complete", isReturn: true },
];
//productList.fetch();
productList.reset(products);
var productListView = new ProductListView({ collection: productList });
productListView.render();

