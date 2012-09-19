#Simple Canvas Manager

Description ... soon

SimpleCanvasManager Object
--------------------------

* <B>SimpleCanvasManager(node)</B>:
    * This is the SCM constructor.
    * [node] is the html div where SCM will work.<br /><br />


* <B>addLayer(name, layerLevel)</B>:
    * Add a layer to your node.
    * [name] is the name of the new layer.
    * [layerLevel] is just a simple z-index.
    * <B>Return a ScmLayer Object.</B><br /><br />
    

* <B>getLayer(name)</B>:
    * Get a layer previously created.
    * [name] is the name of the layer.
    * <B>Return a ScmLayer Object.</B>
    
ScmLayer Object
---------------

* <B>ScmLayer()</B>:
    * Can't be directly construct. Use SimpleCanvasManager.addLayer(); (see above)<br /><br />
    

* <B>setBackgroundColor(color)</B>:
    * Set the layer's Background color.
    * [color] : a CSS color value (ex: #FF00FF).<br /><br />


* <B>setBackgroundImg(img)</B>:
    * Set the layer's Background image.
    * [image] : relative or absolute url of an image.<br /><br />
    

* <B>clear()</B>:
    * Clear the layer to transparent (each pixel's RGBA value is equal to zero).<br /><br />
    
    
* <B>draw(object)</B>:
    * Draw an SCM Object (shapes, images ...)
    * [object] : an ScmShape Object. See all ScmShape Objects below.<br /><br />
    
        
* <B>getHtmlElement()</B>:
    * <B>Return the dom Element.</B><br /><br />


* <B>getContext(type)</B>:
    * <B>Return the html object that provides methods and properties for drawing on the canvas.</B>
    
ScmShape Objects
----------------

Simple Canvas Manager provides natively simple 2D shapes, such as lines, pixel, rectangles and circles.

* <B>ScmRect(x, y, width, height, color)</B>:
    * Constructor for create a rectangle.
    * [x] : Horizontal Position.
    * [y] : Vertical Position.
    * [width] : Width in pixel.
    * [height] : Height in pixel.
    * [color] : a CSS color (ex: #FF00FF).<br /><br />
    
      
* <B>ScmPixel(x, y, color)</B>:
    * Constructor for create a pixel.
    * [x] : Horizontal Position.
    * [y] : Vertical Position.
    * [color] : a CSS color (ex: #FF00FF).<br /><br />
    
    
    
