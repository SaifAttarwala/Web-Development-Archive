const express = require("express");
const mongoose = require("mongoose");
const app = express();
const _ = require("lodash");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// some space for mongoose ///// THIS IS LOCAL HOST
// mongoose.connect("mongodb://localhost:27017/todolistDB", {
//   useNewUrlParser: true
// });
// This is ATLAS CLOUD
mongoose.connect("mongodb+srv://SAIF:SAIF12345@cluster0.bsypf.mongodb.net/todolistDB", {
  useNewUrlParser: true
});

const itemsSchema = {
  listItem: String,
};
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  listItem: "This is Item 1.",
});
const item2 = new Item({
  listItem: "This is Item 2.",
});
const item3 = new Item({
  listItem: "This is Item 3.",
});
const defaultItems = [item1, item2, item3]

// Creating new schema for dynamic express server routing
const listSchema = {
  listItem: String,
  items: [itemsSchema],
}
const List = mongoose.model("List", listSchema);

// INSERTING ITEMS EXAMPLE

// Item.insertMany(defaultItems, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully inserted the Items!!!");
//   };
// });

// FINDING ITEMS I will use this on app.get statement
// Item.find({}, function(err,results){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(results);
//   };
// });


/////////////////////////////////////////////////////////////////////////////////////////


app.get("/", function (req, res) {
  // Damn this code below is complicated, need more reverse engineering to this when referring. Insert method is nested in Find method
  Item.find({}, function (err, results) {
    if (results.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully inserted the Items!!!");
        };
      });
      res.redirect("/")
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: results
      });
    };
  });


});

app.post("/", function (req, res) {

  const item = req.body.newItem;
  const listName = _.capitalize(req.body.list);
  const newItem = new Item({
    listItem: item,
  });

  if (listName === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function (err, foundItem) {
      foundItem.items.push(newItem);
      foundItem.save();
      res.redirect("/" + listName);
    })
  }


});


app.post("/delete", function (req, res) {
  const checkboxValue = req.body.checkboxName;
  const listName = _.capitalize(req.body.listName);

  if (listName === "Today") {
    Item.findByIdAndRemove({
      "_id": checkboxValue
    }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successful deletion!");
      }
      res.redirect("/");
    });
  } else {
    List.findOneAndUpdate({
      name: listName,
    }, {
      $pull: {
        items: {
          _id: checkboxValue,
        }
      }
    }, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      };
      res.redirect("/"+listName);
    });
  };
});


app.get("/:paramName", function (req, res) {
  const paramName = _.capitalize(req.params.paramName);
  console.log(paramName);

  // finding one name from the parameter, the dynamic parameter
  List.findOne({
    listItem: paramName
  }, function (err, foundItem) {
    if (!err) {
      if (!foundItem) {
        // creating a new list
        const list = new List({
          listItem: paramName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + paramName)
      } else {
        // rendering the existing list
        res.render("list", {
          listTitle: foundItem.listItem,
          newListItems: foundItem.items,
        })
      }
    }
  })
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});