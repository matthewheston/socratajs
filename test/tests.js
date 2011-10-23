test("DatasetManager constructor", function() {
	ok(new Socrata.DatasetManager("http://data.cityofchicago.org/Transportation/Towed-Vehicles/ygr5-vcbg"), "Constructor taking in URL");
  raises(function() {
    var datasetManager = new Socrata.DatasetManager();
  },
  function(e) {
    return e.message == "DatasetManager constructor expects URL parameter";
  },
  "Constructor without URL parameter.");
});
