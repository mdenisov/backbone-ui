$(document).ready(function() {

  module("Backbone.UI.RadioGroup");

  Backbone.UI.setMobile(false);

  var regions = new Backbone.Collection([{
    name: 'Americas',
    notes: 'Bright'
  }, {
    name: 'Africa',
    notes: 'Fruity'
  }]);

  test("withoutDataBinding", function(){

    var radio = new Backbone.UI.RadioGroup({
      content: 'test',
      alternatives: regions,
      altLabelContent: 'name'
    }).render();

    $(radio.el).find('li a').eq(1).click();

    ok($(radio.el).find('li a').eq(1).hasClass('selected'));

  });

  test("withDataBinding", function(){

    var coffee = new Backbone.Model({
      roaster: 'Counter Culture',
      name: 'Baroida',
      roastedOn: new Date(2012, 2, 28, 6, 30),
      acidic: true,
      region: regions.at(0)
    });

    var radio = new Backbone.UI.RadioGroup({
      model : coffee,
      content: 'region',
      alternatives: regions,
      altLabelContent: 'name'
    }).render();

    //click to select and check model
    $(radio.el).find('li a').eq(1).click();
    equal(coffee.get('region').get('name'),'Africa');

    //update model and check if radio button changed
    coffee.set({
      region: regions.at(0)
    });
    ok($(radio.el).find('li a').eq(0).hasClass('selected'));

  });

  test("onChange", function(){
    var changeCount = 0;

    var coffee = new Backbone.Model({
      roaster: 'Counter Culture',
      name: 'Baroida',
      roastedOn: new Date(2012, 2, 28, 6, 30),
      acidic: true,
      region: regions.at(0)
    });

    var radio = new Backbone.UI.RadioGroup({
      model : coffee,
      content: 'region',
      alternatives: regions,
      altLabelContent: 'name',
      onChange: function() { changeCount++; }
    }).render();

    //make 2 selections of the same
    $(radio.el).find('li a').eq(1).click();
    $(radio.el).find('li a').eq(1).click();
    $(radio.el).find('li a').eq(1).click();

    //change count should be 1
    equal(changeCount,1);

    changeCount=0;

    //make 3 different selections
    $(radio.el).find('li a').eq(0).click();
    $(radio.el).find('li a').eq(1).click();
    $(radio.el).find('li a').eq(0).click();

    //change count should be 3
    equal(changeCount,3);

  });

});