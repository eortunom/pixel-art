/*eslint-env browser */
/*globals $ */


//Can't do this in client side!!!
//var colorsDb = require('../db/colors');

var DEFAULT_WIDTH = 30;
var DEFAULT_HEIGHT = 15;
var INITIAL_COLOR = 'white';

var pixelArray;
var builder;

var CanvasSetup = function ($container, params) {
  builder = this;
  this.$elem = $container;
  if (params) {
    this.height = params.height;
    this.width = params.width;
  } else {
    this.height = DEFAULT_HEIGHT;
    this.width = DEFAULT_WIDTH;
  }
  this.selected = 'black';
  initializeArray(this.width, this.height);
};

var initializeArray = function (w, h) {
  pixelArray = new Array(w);
  for (var i = 0; i < w; i++) {
    pixelArray[i] = new Array(h);
  }
  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      pixelArray[x][y] = INITIAL_COLOR;
    }
  }
}

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
  $('#clearbutton').on('mousedown', clearCanvas.bind(this));
  $('#savebutton').on('mousedown', saveCanvas.bind(this));
  $('#gridcheckbox').on('mousedown', this.redraw);
}

CanvasSetup.prototype.redraw = function () {
  var swatches = document.getElementsByClassName('swatch');
  for (var x = 0; x < swatches.length; x++) {
    if (!$('#gridcheckbox').prop('checked')) {
      swatches[x].style.border = 'outset';
    }
    else {
      swatches[x].style.border = 'none'; 
    }
  }
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
  if ($this.data('selected')) {             //fixes target cell turning white after filling
    $this.removeClass(this.classList[1]);
    $this.addClass($this.data('selected'));
  }
}

var onMouseDown = function () {
  var $this = $(this);
  var x = $this.data('x');
  var y = $this.data('y');
  if ($('#fillcheckbox').prop('checked')) {
    fill(x, y, pixelArray[x][y]);
  } 
  else {
    $this.removeClass(this.classList[1]);
    var selected = $('.selected')[0].classList[1];
    $this.addClass(selected);
    $this.data('selected', selected);
    pixelArray[x][y] = selected;
  }
}

var clearCanvas = function () {
  $('.canvas').empty();
  initializeArray(this.width, this.height);
  this.redraw();
}

var saveCanvas = function () {
  var canvasColors = new Array(this.width * this.height);
  for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++) {
      canvasColors[y * this.width + x] = pixelArray[x][y];
    }
  }
  colorsDb.addColors(canvasColors, function (err) {
    console.log(err);
  });
  console.log(colorsDb.getAllColors(function (err) {
    console.log(err);
  }));
}

var recursiveFill = function (x, y, original) {
  if (x >= 0 && x < builder.width && y >= 0 && y < builder.height) {
    if (pixelArray[x][y] === original) {
      pixelArray[x][y] = builder.selected;
      recursiveFill(x, y - 1, original);
      recursiveFill(x, y + 1, original);
      recursiveFill(x - 1, y, original);
      recursiveFill(x + 1, y, original);
    }
  }
}

var fill = function (x, y, originalColor) {
  recursiveFill(x, y, originalColor);
  $('.canvas').empty();
  builder.redraw();
}
