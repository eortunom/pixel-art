/*eslint-env browser */
/*globals $ */

// Default size of map (in tiles)
var DEFAULT_WIDTH = 30;
var DEFAULT_HEIGHT = 15;

var MapBuilder = function ($container, params) {
  this.$elem = $container;
  if (params) {
    this.height = params.height;
    this.width = params.width;
  } else {
    this.height = DEFAULT_HEIGHT;
    this.width = DEFAULT_WIDTH;
  }
  this.selected = 'white';
};

MapBuilder.prototype.setupPalette = function () {
  var builder = this;
  var swatches = $('.palette').get(0).children[0].getElementsByTagName('li');
  $.each(swatches, function (index, value) {
    var name = value.classList[1];
    $('.swatch.' + name).click(function () {
      $('.swatch.' + builder.selected).removeClass('selected');
      $('.swatch.' + name).addClass('selected');
      builder.selected = name;
    });
  });
  $("#clearbutton").on('mousedown', clearCanvas.bind(this));
}

MapBuilder.prototype.setupCanvas = function () {
  for (var x = 0; x < this.height; x++) {
    var $newRow = $('<div>');
    $newRow.addClass('row');
    for (var y = 0; y < this.width; y++) {
      var $tile = $('<div>');
      $newRow.append($tile);
      $tile.addClass('swatch');
      $tile.addClass(this.selected);
      addHandlers($tile);
      $('.map').append($newRow);
    }
  }
}

var addHandlers = function ($div) {
  $div.on('mouseenter', onMouseEnter);
  $div.on('mouseout', onMouseOut);
  $div.on('mousedown', onMouseDown);
}

var onMouseEnter = function (e) {
  var $this = $(this);
  if (e.which === 1) {  //If left mouse is pressed
    onMouseDown.call(this);
  } else {
    var name = this.classList[1];
    $this.removeClass(name);
    var selected = $('.selected')[0].classList[1];
    $this.addClass(selected);
    $this.data('selected', name);
  }
}

var onMouseOut = function () {
  var $this = $(this);
  $this.removeClass(this.classList[1]);
  $this.addClass($this.data('selected'));
}


var onMouseDown = function () {
  var $this = $(this);
  $this.removeClass(this.classList[1]);
  var selected = $('.selected')[0].classList[1];
  $this.addClass(selected);
  $this.data('selected', selected);
}

var clearCanvas = function () {
  $('.map').empty();
  for (var x = 0; x < this.height; x++) {
    var $newRow = $('<div>');
    $newRow.addClass('row');
    for (var y = 0; y < this.width; y++) {
      var $tile = $('<div>');
      $newRow.append($tile);
      $tile.addClass('swatch');
      $tile.addClass('white');
      addHandlers($tile);
      $('.map').append($newRow);
    }
  }
  console.log(this);
}