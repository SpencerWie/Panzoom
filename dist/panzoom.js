// Inital method to call to apply PanZoom to elements given a selector
function PanZoom(selector, minScale = 0.1, maxScale = 5, increment = 0.1) {
  document.querySelectorAll(selector).forEach(function(ele){
    new AttachPanZoom(ele, minScale, maxScale, increment);
  });
}

// Appy PanZoom functionality to a given element, allow user defined zoom min and inc per scroll
function AttachPanZoom(ele, minScale, maxScale, increment) {
  this.increment = increment;
  this.minScale = minScale;
  this.maxScale = minScale;
  this.panning = false;
  this.oldX = this.oldY = 0;
  let self = this;
  ele.style.transform = "matrix(1, 0, 0, 1, 0, 0)";
  
  // Gets the current Scale, along with transX and transY
  this.getTransformMatrix = function() {
    trans = ele.style.transform;
    let start = trans.indexOf("(") + 1;
    let end = trans.indexOf(")");
    matrix = trans.slice(start, end).split(",");
    return { 
      "scale": +matrix[0], 
      "transX": +matrix[4], 
      "transY": +matrix[5] 
    }
  }

  // Given the scale, translateX and translateY apply to CSSS transform
  this.setTransformMatrix = function(o) {
    ele.style.transform = 'matrix('+o.scale+', 0, 0, '+o.scale+', '+o.transX+', '+o.transY+')';
  }

  this.applyTranslate = function(dx, dy){
    let newTrans = this.getTransformMatrix();
    newTrans.transX += dx;
    newTrans.transY += dy;
    this.setTransformMatrix(newTrans);
  } 

  // Applying Deltas to Scale and Translate transformations
  this.applyScale = function(dscale, x, y){
    let newTrans = this.getTransformMatrix();
    let tranX = x - (ele.width / 2);
    let tranY = y - (ele.height / 2);
    newTrans.scale += dscale;
    if(newTrans.scale < this.minScale) 
      newTrans.scale = this.minScale;
    this.applyTranslate(tranX, tranY);
    this.setTransformMatrix(newTrans);
    this.applyTranslate(-(tranX * dscale), -(tranY * dscale));
  }

  // Capture when the mouse is down on the element or not
  ele.addEventListener("mousedown", function(e) {
    e.preventDefault();
    this.panning = true;
    this.oldX = e.clientX;
    this.oldY = e.clientY;
  });
  
  ele.addEventListener("mouseup", function(e) { this.panning = false; });
  ele.addEventListener("mouseleave", function(e) { this.panning = false; });

  ele.addEventListener("mousemove", function(e){
    if(this.panning) {
      let deltaX = e.clientX - this.oldX;
      let deltaY = e.clientY - this.oldY;
      self.applyTranslate(deltaX, deltaY);
      this.oldX = e.clientX;
      this.oldY = e.clientY;
    }
  });

  this.getScrollDirection = function(e){
    var delta = (event.wheelDelta? event.wheelDelta : event.deltaY* -1)
    if(delta < 0)
      self.applyScale(-self.increment, e.offsetX, e.offsetY)
    else
      self.applyScale(self.increment, e.offsetX, e.offsetY);
  }

  ele.addEventListener('DOMMouseScroll',this.getScrollDirection,false);
  ele.addEventListener('mousewheel',this.getScrollDirection,false); 
}