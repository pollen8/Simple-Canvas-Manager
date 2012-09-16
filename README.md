#Simple Canvas Manager

Description ... soon

SimpleCanvasManager Object
--------------------------

* <B>SimpleCanvasManager(node)</B>:
    * This is the SCM constructor.
    * [node] is the html div where SCM will work.


* <B>addLayer(name, layerLevel)</B>:
    * Add a layer to your node.
    * [name] is the name of the new layer.
    * [layerLevel] is just a simple z-index.
    * <B>Return a ScmLayer Object.</B>
    

* <B>getLayer(name)</B>:
    * Get a layer previously created.
    * [name] is the name of the layer.
    * <B>Return a ScmLayer Object.</B>
    
ScmLayer Object
---------------

* <B>ScmLayer()</B>:
    * Can't be directly construct. Use SimpleCanvasManager.addLayer();
    

* <B>getHtmlElement()</B>:
    * <B>Return the dom Element.</B>


* <B>getContext(type)</B>:
    * <B>Return the html object that provides methods and properties for drawing on the canvas.</B>


* <B>setBackgroundColor(color)</B>:
    * Set the layer's Background color.
    * [color] : a CSS color value that indicates the fill color of the drawing.
    * <B>Return a ScmLayer Object.</B>    
    
    
    
