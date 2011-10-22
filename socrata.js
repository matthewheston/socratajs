Socrata = (function(Socrata, $, undefined) {

	//DatasetManager {{{
	Socrata.DatasetManager = (function() {
		function DatasetManager(url){
			var that = this;
			 extractUID(that, url);
			 extractHost(that, url);
		}


		//private methods {{{
		extractUID = function(that, url) {
			matches = url.match(/.*([a-z0-9]{4}-[a-z0-9]{4}).*/);
			if ( matches == null || matches.length < 2 ) {
				return false;
			}
			that.uid = matches[1];
			return true;
		};

		extractHost = function(that, url) {
			matches = url.match(/^(?:[^\/]+:\/\/)?([^\/]+)/im);
			if ( matches == null || matches.length < 2 ) {
				return;
			}
			this.host = "http://" + matches[1];
		};
		//}}}

		return DatasetManager;
	})();
	//}}}

	return Socrata;
}(window.Socrata = window.Socrata || {}, jQuery));



