

(function($){
	$.fn.wh2tr = function() {
		var image = $(this).get(0);

		var w = image.width, h = image.height;
		var accuracy = $(this).data("accuracy");
		if(accuracy == undefined)
			accuracy = 1;

		var canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;

		var ctx = canvas.getContext('2d');
		ctx.width = w;
		ctx.height = h;
		ctx.drawImage(image, 0, 0, w, h);
		var imageData = ctx.getImageData(0,0, w, h);
		var pixel = imageData.data;

		var r=0, g=1, b=2, a=3;
		var cl = 255*accuracy;

		for (var p = 0; p<pixel.length; p+=4){
		if(
			pixel[p+r] >= cl &&
			pixel[p+g] >= cl &&
			pixel[p+b] >= cl) // change alpha to 0
		{ pixel[p+a] = 0; }
		}
		ctx.putImageData(imageData,0,0);

		image.src = canvas.toDataURL('image/png');

		return this;
	};
})( jQuery );

$(document).ready(function() {
	$(".wh2tr").each(function(){
		$(this).wh2tr();
	});
});
