/*eslint-env browser */
/*globals $ */

// Default size of canvas (in tiles)
var DEFAULT_WIDTH = 30;
var DEFAULT_HEIGHT = 15;
var INITIAL_COLOR = 'white';

var pixelArray;

var CanvasSetup = function ($container, params) {
  this.$elem = $container;
  if (params) {
    this.height = params.height;
    this.width = params.width;
  } else {
    this.height = DEFAULT_HEIGHT;
    this.width = DEFAULT_WIDTH;
  }
  this.selected = 'black';


  //Initialize array that represents color in each cell
  pixelArray = new Array(this.width);
  for (var i = 0; i < this.width; i++) {
    pixelArray[i] = new Array(this.height);
  }
  for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++) {
      pixelArray[x][y] = INITIAL_COLOR;
    }
  }
};

CanvasSetup.prototype.setupPalette = function () {
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

CanvasSetup.prototype.setupCanvas = function () {
  for (var x = 0; x < this.height; x++) {
    var $newRow = $('<div>');
    $newRow.addClass('row');
    for (var y = 0; y < this.width; y++) {
      var $tile = $('<div>');
      $newRow.append($tile);
      $tile.addClass('swatch');
      $tile.addClass(pixelArray[x][y]);
      $tile.data('x', x);
      $tile.data('y', y);
      addHandlers($tile);
      $('.canvas').append($newRow);
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
  pixelArray[$this.data('x')][$this.data('y')] = selected;
}

var clearCanvas = function () {
  $('.canvas').empty();
  for (var x = 0; x < this.height; x++) {
    var $newRow = $('<div>');
    $newRow.addClass('row');
    for (var y = 0; y < this.width; y++) {
      var $tile = $('<div>');
      $newRow.append($tile);
      $tile.addClass('swatch');
      $tile.addClass('white');
      addHandlers($tile);
      $('.canvas').append($newRow);
    }
  }
}

var fillWithColor = function (x, y) {
  //TODO: recursive method
}
