const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useNewUrlParser: true
});
// remove useNewUrlParser later to check for errors, idk; this was written in the course and apparently doesnt break anything


const fruitSchema = new mongoose.Schema({
    name: {type:String,required:[true,"No name?"],},
    rating: {type:Number,min:0,max:10,},
    review: String,
})
const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
    name: "Apple",
    rating: 8,
    review: "An Apple a day keeps the doctor away!"
})
// apple.save();




const personSchema = new mongoose.Schema({ //schema creation
    name: String,
    age: {type:Number,min:0,max:140,},
    gender: String,
    // D79368946        Schema should be linked to a document property
    favoriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema); // model creation

const person = new Person({ // collection insertion
    name: "Alexei Numenov",
    age: 25,
    gender: "Male",
    // You can also add relation ships like this, check D79368946 with FIND
    favoriteFruit: apple,
});
// person.save(); 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Insert many at a time with mongoose
//    Fruit.insertMany([fruit, person],function(err){
//     if(err){
//         console.log("Process Failed");
//     }else{
//         console.log("Process Completed");
//     }
// });



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Search in a collection ||  db.collection.find()
// Fruit.find(function(err, fruits){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(fruits);
//     }
// });


// Search in a collection with an attribute || db.collection.find({attribute}) 
// This method is using .map method and will log the result in an array
// Fruit.find(function (err, fruits) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(fruits.map((fruit) => fruit.name));
//     }
// });



// Search in a collection with an attribute || db.collection.find({attribute})
// This method will use the forLoop and will log results individually
//////////////////////////////////////////// DEFAULT //////////////////////////////
// Fruit.find(function (err, fruits) {
//     if (err) {
//         console.log(err);
//     } else {
//         fruits.forEach(function(fruit){
//             console.log(fruit.name);
//         })
//     }
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Update with mongoose, lets try updating the fruit model
// The syntax is Model.updateOne({ID},{What you want to update/add},function(err){if(err){console.log(err)}else(console.log("Done"))})
// Fruit.updateOne({ID},{PLACEHOLDER},function(err){if(err){console.log(err)}else{console.log("Success")}});




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Delete with mongoose, lets try updating the fruit model
// the syntax is Model.deleteOne({ID},functon(err){if(err){console.log(err)}else{console.log("Deleted, Process is done")}});
// Fruit.deleteOne({name:"Apple"},function(err){if(err){console.log(err)}else{console.log("Deleted, Process is done")}});

// Delete many with mongoose, lets try updating the fruit model
// The syntax is Model.deleteMany({ID},{ID},{ID}, function(err){if(err){console.log(err)}else{console.log("Deleted, OK")}});
// Fruit.deleteMany({name:"Apple"}, function(err){if(err){console.log(err)}else{console.log("Deleted, OK")}});