
### Class which is describing a product and the way it is rendered.
 {
	"classname": "Product", 
	"params": { 
		{"paramName": "id", "paramType": "guid", "paramDescription": "Identifyer of the product."},
		{"paramName": "reference", "paramType": "string", "paramDescription": "Reference of the product which allows us to identify it."},
        {"paramName": "label", "paramType": "string", "paramDescription": "Label of the product."},
	    {"paramName": "price", "paramType": "decimal", "paramDescription": "Price of the product."},
        {"paramName": "currency", "paramType": "string", "paramDescription": "Currency of the product price."}
	},
	"methods":{
		{"methodName: "print", "description": "Return a string Containing the current product."},
		{"methodName: "log", "description": "Log the print result in the console."},
		{"methodName: "save", "description": "Save the current product in the local storage."},
	}
}
###
class Product
  ###  Constructor of the product class. ###
  constructor: (@id,@reference,@label,@price,@currency) ->
  ### Print the product. ###
  print: ->
    "The product " + @label + " which have reference: " + @reference + " costs " + @price + @currency + "." + '\n'
  ### Log the productin the js console. ###
  log: ->
    console.log @print()
  ### Save the product in the local storage. ###
  render: ->
    "<tr><td>#{@id}</td><td>#{@reference}</td><td>#{@label}</td><td>#{@price}<div class='currendy'>#{@currency}</div></td></tr>"

###
Alea helper class, is able to return new Guid.
###
class AleaHelper
  ###
   Return the part of a guid.
  ###
  S4: ->
   (((1+Math.random())*0x10000)|0).toString(16).substring 1
  
  ###
  Return a new Guid generated in js.
  ###
  newGuid: ->
    @S4()+@S4()+"-"+@S4()+"-"+@S4()+"-"+@S4()+"-"+@S4()+@S4()+@S4()
  
  ###
  Given   : low <= high.
  Returns : a random number in the range [low, high).
  ###
  randomNum:(low, high)->
    Math.random()*(high-low) + low
  
  ###
  Given   : low <= high.
  Returns : a random integer in the range [low, high].
  ###
  randomInt:(low, high)->
    Math.floor(Math.random()*(high-low+1)) + low
 
  ###
  Given  : str is a nonempty string 
  Returns: a random character from the string 
  ###
  randomChar:(str='azertyuiopqsdfghjklmwxcvbn')->
    str.charAt(@randomInt(0, str.length-1))
 
  ###
  Given  : str is a nonempty string 
  Returns: a random character from the string 
  ###
  randomText:(@length=10)->
    text = ""
    for i in [0...@length]
      text += @randomChar()
    text
  ###
  Given  : str is a nonempty string 
  Returns: a random character from the string 
  ###
  randomNumberAsText:(@length=10)->
    text = ""
    for i in [0...@length]
      text += @randomInt(0,9)
    text

  ###
  Given  : list is a nonempty list (array) 
  Returns: a random item from the list 
  ###
  randomOneOf:(list)->
    list[randomInt(0, list.length-1)]


###Get an alea product.###
getAleaProduct=->
  aHelper = new AleaHelper();
  new Product aHelper.newGuid(), aHelper.randomNumberAsText(), aHelper.randomText(20), aHelper.randomNumberAsText(2), '$' 

### Class which is describing a product and the way it is rendered.
{
  "classname": "Products", 
  "params": { 
    {"paramName": "products_list", "paramType": "Array of Product", "paramDescription": "Container of all the products."}
  }
}
###
class Products
  constructor: (@name) ->
    @system_name = "products"
    @name = "Products "+ new AleaHelper().newGuid()
    @products_list = [] 
  
  add:(product)->
    @products_list.push product

  print: ->
    text = ""
    @products_list.forEach (product, index) ->
      text = text + product.print()
    text
  log: ->
    console.log @print()
  ###Build a random products array.###
  fillWithRandomProducts:(nbProducts = 1000)->
    for i in [0...nbProducts]
      @add @getAleaProduct()
    @name
  
  save: ->
    localStorage.setItem @system_name, JSON.stringify(@)
    #product.save() for product in @products_list
    true
  render: ->
    _html = "<table><thead><tr><th>Id</th><th>Reference</th><th>Label</th><th>Price</th></tr></thead><tbody"
    _html += product.render() for product in @products_list  
    _html +="</tbody></table>"
    $('#ProductsLoading').html _html
  ###Remove the products from###
  remove: ->
    localStorage.removeItem @system_name
    true
  
  ###Get an alea product.###
  getAleaProduct: ->
    aHelper = new AleaHelper();
    new Product aHelper.newGuid(), aHelper.randomNumberAsText(), aHelper.randomText(20), aHelper.randomNumberAsText(2), '$'

  ###Load products from local storage.###
  loadProductFromLocalStorage: ->
    a = JSON.parse(localStorage.getItem(@system_name))
    @system_name = a.system_name
    @name = a.name
    @products_list.push( new Product(product.id, product.reference, product.label, product.price, product.currency) ) for product in a.products_list
    true

Page =  {
	"Products": new Products().fillWithRandomProducts()
};

###
Generation and tests of instances.
###    

#Creation of many products.
product1 = new Product "1111111", "1111111A", "Produit1", "99", '$'
product2 = new Product "2222222", "2222222B", "Produit2", "99", '$'
product3 = new Product "3333333", "3333333C", "Produit3", "99", '$'
product4 = new Product "4444444", "4444444D", "Produit4", "99", '$'
product5 = new Product "5555555", "5555555E", "Produit5", "99", '$'
product6 = new Product "6666666", "6666666F", "Produit6", "99", '$'
product7 = new Product "7777777", "7777777G", "Produit7", "99", '$'

#Generation of a products.
p = new Products
p.products_list.push product1
p.products_list.push product2
p.products_list.push product3
p.products_list.push product4
p.products_list.push product5
p.products_list.push product6
p.products_list.push product7


