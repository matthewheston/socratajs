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

test("Dataset constructor", function() {
  var dataset = new Socrata.Dataset();
  ok(dataset, "Constructor doesn't cause error");
  ok(dataset.rows, "Rows property exists");
  ok(dataset.columns, "Columns property exists");
  equals(dataset.columns.length, 0);
  equals(dataset.rows.length, 0);

});
