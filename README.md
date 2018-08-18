# Panzoom
Panzoom is a lightweight native JavaScript library for panning and zooming elements using CSS3 Transformations. It's built to have a small footprint and be and simple to use.

## How to use

Simply call the method `PanZoom` like so:

    PanZoom([selector]);
    
That's it! Now all your elements given by your selector will now have basic panning and zoomming functionality. For example, we could have the class `panzoom` which has many elements:

    <h1 class="panzoom">Hello World!</h1>
    <img class="panzoom" src=".." .. />
    <div class="panzoom" .. >Foo Bar</div>
    <canvas class="panzoom" ..></canvas>

Our JavaScript code for applying Panzoom on these elements might look something like this:

    window.onload(function(){
        PanZoom(".panzoom");
    });
    
## Demos

* [Demo using the HTML 5 Canvas](https://cdn.rawgit.com/SpencerWie/Panzoom/b070fa28/demo/CanvasExample/index.html)
* [Demo using the SVG Image](https://cdn.rawgit.com/SpencerWie/Panzoom/b070fa28/demo/SvgExample/index.html)

## Planned Features:

* More Configuration Options
* Non-liner zooming
