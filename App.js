$(function(){
  $('#fillProducts').on('click',function(){
    p.fillWithRandomProducts();
  });
  $('#renderProducts').on('click',function(){
    p.render();
  });
  $('#saveLocal').on('click',function(){
    p.save();
  });
  $('#loadLocal').on('click',function(){
    p.loadProductFromLocalStorage();
  });
  $('#deleteLocal').on('click',function(){
    p.remove();
  });
  
});