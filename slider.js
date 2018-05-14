$(document).ready(function(){
  init();
});

/*
  // TODO:
      -Make the slider adjust to the current height of window (in nested cases)
*/

var sliders = {};

function init(){
  $("[slider]").each(function(){registerSlider($(this));})
  shrinkSliders();
}

function registerSlider(slider){
  var tag = slider.attr("tag");
  if(sliders[tag] != undefined){
    console.error("Error: there was already a slider with tag "+ tag+" defined!");
    return false;
  }
  if(tag == undefined){
    console.error("Error: A slider doesn't have a tag");
    return false;
  }
  sliders[tag] = {};
  sliders[tag].slider = slider;
  sliders[tag].slider.attr("n_height", slider.css("height"));

  slider.addClass("slider");

  var trigger = sliders[tag].slider.children("[trigger]");
  if(trigger.length > 1){
    console.error("More than 1 trigger was found in slider with tag "+tag);
    return false;
  }else if(trigger.length == 0){
    console.error("Error: No trigger was found in  slider with tag "+tag);
    return false;
  }
  sliders[tag].trigger =trigger;
  trigger.click(function(){toggle(tag)});
  sliders[tag].content=sliders[tag].slider.children("[content]");
  slider.attr("trig_height", trigger.css("height"));
}

function shrinkSliders(){
  for(slider in sliders){
    sliders[slider].slider.css("height", sliders[slider].slider.attr("trig_height"));
    sliders[slider].slider.children(":not([trigger])").css("display", "none");

  }
}

function foldOpen(tag){
  sliders[tag].slider.children().css("display", "block");
  var height =sliders[tag].slider.attr("n_height");
  sliders[tag].slider.animate({
    height:height
  }, done=function(){});
}

function foldClose(tag){
  var height =sliders[tag].slider.attr("trig_height");
  sliders[tag].slider.animate({
    height:height
  }, done=function(){
    sliders[tag].slider.children(":not([trigger])").css("display", "none");

  });
}

function toggle(tag){
  if(sliders[tag].slider.css("height") == sliders[tag].slider.attr("trig_height")){
    foldOpen(tag);
  }else{
    foldClose(tag);
  }
}
