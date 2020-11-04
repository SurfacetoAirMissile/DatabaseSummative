var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//connect mongoose to the db
mongoose.connect("mongodb+srv://SurfacetoAirMissile:bX7CyNde4aAMU7ZV@cluster0.htcmy.mongodb.net/cars_db?retryWrites=true&w=majority");
//mongoose.connect("mongodb://localhost/cars_db");

var app = express();

console.log("running the app.js file");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
	
	res.redirect("/cars");
	
});

app.get("/cars", function(req, res) {
	
	var cars = [
		{make: "Toyota", model: "Sprinter", price: "$12,000", year: 1987, imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Corolla_XL_EE80_hatch_rear.jpg/191px-Corolla_XL_EE80_hatch_rear.jpg"},
		{make: "Dodge", model: "SRT-10", price: "$45,000", year: 2005, imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Dodge_Viper_SRT-10.jpg/1200px-Dodge_Viper_SRT-10.jpg"},
		{make: "Fiat", model: "500F", price: "$18,700", year: 1966, imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/1966_Fiat_500F.jpg/1920px-1966_Fiat_500F.jpg"},
		{make: "Chevrolet", model: "Corvette Stringray", price: "$56,000", year: 1968, imageLink: "https://upload.wikimedia.org/wikipedia/commons/3/36/1968_corvette_convt.jpg"}
	];
	
	//Car.create(cars, errCallBack);
	
	Car.find({}, function(err, data){
		if (err) {
			console.log("error")
		} else {
			res.render("cars.ejs", { cars: data});
		}
	});
	
	//res.render("cars.ejs", { cars: cars});
	
});

app.get("/cars/new", function(req, res) {
	res.render("new.ejs");
});

app.post("/cars", function(req,res){
	
	console.log(req.body);
	
	var makeEntered = req.body.make != '';
	var modelEntered = req.body.make != '';
	var yearEntered = req.body.year != null;
	var priceEntered = req.body.price != '';
	var imageLinkEntered = req.body.imageLink != '';
	if (makeEntered && modelEntered && yearEntered && priceEntered && imageLinkEntered) {
		createNewCar(req.body.make, req.body.model, req.body.year, req.body.price, req.body.imageLink);
	}
	res.redirect("/cars");
	
});

var carsSchema = mongoose.Schema({
	
	make: String,	
	model: String,
	year: Number,
	price: String,
	imageLink: String
})

var Car = mongoose.model("Car", carsSchema);

function createNewCar(_make, _model, _year,  _price, _imageLink)
{
	var obj = new Car({

		make: _make,
		model: _model,
		year: _year,
		price: _price,
		imageLink: _imageLink
		
	})
	
	obj.save(errCallBack);
	
	return obj;
}

function errCallBack(err, done){
	if (err) {
		console.log("info wasnt saved/found");
	} else {
		console.log("info" + done + " was saved/found");
	}
}

app.listen(process.env.PORT || 3000,
		  process.env.IP,
		  function(){
	console.log("Server listening")
})

//createNewCar("Toyota", "Sprinter", 1987, 15000, "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Corolla_XL_EE80_hatch_rear.jpg/191px-Corolla_XL_EE80_hatch_rear.jpg");
//createNewCar("Dodge", "SRT-10", 2005, 75000, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Dodge_Viper_SRT-10.jpg/1200px-Dodge_Viper_SRT-10.jpg");
//createNewCar("Fiat", "500F", 1973, 33000, "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Corolla_XL_EE80_hatch_rear.jpg/191px-Corolla_XL_EE80_hatch_rear.jpg");

