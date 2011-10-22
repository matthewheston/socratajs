test("DatasetManager constructor", function() {
	ok(new Socrata.DatasetManager("http://data.cityofchicago.org/Transportation/Towed-Vehicles/ygr5-vcbg"), "Constructor taking in URL");
});
