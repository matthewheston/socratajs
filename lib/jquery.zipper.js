(function ($) {
	/* 
		Create a utility function $.zip that will transform two arrays into an object
		much like the python zip() function.  In Python the return is a tuple, the jQuery 
		function simply returns a generic object.  Like in Python, the $.zip function 
		will create an object equal in length to the shortest array passed in.
		
		EX:
		
		var arr1 = [1,2,3];
		var arr2 = [4,5,6];
		
		var zipped = $.zip(arr1,arr2); //{1:4,2:5,3:6}
		
		var arr3 = [1,2,3];
		var arr4 = [4,5];
		
		var zipped = $.zip(arr3,arr4); //{1:4,2:5}
		
	*/
	$.zip = function(arr1,arr2) {
		
		//determine the shortest array passed in
		var shortest = (arr1.length > arr2.length) ? arr2 : arr1;
		
		//create an object to store the zipped up values
		var zipped = {};
		
		//loop through our arrays, create new key:value pairs
		for(var i=0; i<shortest.length; i++){
			zipped[arr1[i]] = arr2[i];
		}
		
		//return the zipped up object
		return zipped;
		
	};

})(jQuery);
