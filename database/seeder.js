// const headers = require("./api_header");
const Mongoose = require("mongoose"),
menu = require("./models.js"),
fetch = require("node-fetch"),
fs = require('fs')
// ,es = require('event-stream')

/*------------The followings are all helper functions for the main seeder function---------------------
------------Scroll down to the bottom to see the main seeder function ;D-----------------------------*/

function itemNameGenerator() {
  const storage = [
    "Slow Cooker Coq au Vin",
    "Golden Beet & Beet Greens Pasta",
    "Meatballs with onion gravy",
    "Beef Curry",
    "Super Mom Stir Fry",
    "Almond-Thyme-Crusted Mahi Mahi",
    "Contest-Winning Parmesan",
    "Creamy Baked Risotto",
    "Chicken Cacciatore",
    "Bird's Nest Egg Salad",
    "Tofu Kabobs with Barbecue Sauce",
    "Grilled Chicken, and Quinoa Salad",
    "Grilled Pork Chops",
    "One Pot Garlic Butter Chicken",
    "Instant Pot Turkey Chili",
    "Chicken Fajita Burgers",
    "Fruit Salad",
    "Chicken Grilled Cheese Sandwich",
    "Steak Sandwiches",
    "Coconut & tamarind chicken curry",
    "Smoked Salmon Carbonara",
    "Pan-Seared Cod",
    "Guinea fowl tagine",
    "Kale Pesto Avocado Grilled Cheese",
    "Mexican Chicken Taco Skillet",
    "Skinnified Pork Burrito",
    "Calamari",
    "Bang-Bang Shrimp",
    "Chicken Fajita Casserole",
    "The TJ Hooker Pizza",
    "Seared Scallops",
    "Spinach Burrata Omelet",
    "Roasted Macaroni and Cheese",
    "Chicken and Corn Chowder",
    "Mediterranean Crab",
    "Creamy chicken & mango curry",
    "Grilled chicken",
    "Homemade Creamy Chicken Soup",
    "Flattened Chicken",
    "Skirt Steak With Arugula Salad",
    "Healthy Chicken Burgers",
    "Stir-Fried Udon Noodles",
    "Pan-seared Salmon",
    "Penne and Vegetable Casserole",
    "Grilled Watermelon Salad",
    "Slow Cooker Chicken Soup",
    "Creamy Chile Chicken Enchiladas",
    "Caprese Mac and Cheese",
    "Oven Baked Chicken Tacos",
    "Thai Peanut Chicken"
  ];
  return storage[Math.floor(storage.length * Math.random())];
}

function descriptionGenerator() {
  const storage = [
    `Beef koobide comes inside of baguette bread filled with our special sauce with lettuce, white and red cabbage and tomato.`,
    `Chicken kebab comes inside of baguette bread filled with our special sauce with lettuce, tomato and pickled cucumber.`,
    `Lettuce, tomato, cucumber, white and red cabbage with our special salad dressing.`,
    `Vegetarian. Pureed chickpeas topped with paprika and olive oil. Served with pita bread.`,
    `Lightly battered and fried shrimp, pumpkin, broccoli, and zucchini served with tempura sauce.`,
    `Grilled salmon, mixed greens, cucumbers, carrots, and tomatoes, served with miso dressing.`
  ];
  return storage[Math.floor(storage.length * Math.random())];
}

function extrasGenerator() {
  const itemStorage = ["rice", "fries", "coke", "Avocado", "tuna"];
  let result = [];
  function extraPriceGenerator() {
    return Math.floor(1 + Math.random() * 3);
  }
  const length = Math.floor(Math.random() * 5);
  for (let i = 0; i < length; i++) {
    result.push({
      name: itemStorage[Math.floor(itemStorage.length * Math.random())],
      price: extraPriceGenerator()
    });
  }
  return result;
}

function makeLargeArray() {
  let largeArray = [];
  for (let i=1; i < 10000001; i++) {

    let obj = {};
    obj.restaurant_id = i;
    obj.photo_URL = "https://loremflickr.com/320/240/food";
    obj.item_name = itemNameGenerator();
    obj.description = descriptionGenerator();
    obj.price = Math.floor(Math.random()*10) + 5;
    obj.popular = [true, false][Math.floor(Math.random()*2)];
    obj.special_instruction = [true, false][Math.floor(Math.random()*2)];
    obj.extras = extrasGenerator();

    largeArray.push(obj);
  }
  return largeArray;
}

const data = makeLargeArray();

const file = require("fs").createWriteStream("./data.json");

(async() => {
  for(let i = 0; i < 10000000; i++) {
    let tempObj = '';

    //format to JSON array
    // if (i === 0) {
    //   tempObj = '[' + JSON.stringify(data[i]) + ',\n'
    // } else if (i === 10000000) {
    //   tempObj = JSON.stringify(data[i]) + ']'
    // } else {
    //   tempObj = JSON.stringify(data[i]) + ',\n'
    // }

    //format to JSON
    if (i !== 9999999) {
      tempObj = JSON.stringify(data[i], null, 2) + ',\n'
    } else {
      tempObj = JSON.stringify(data[i], null, 2) + '\n'
    }

    if(!file.write(tempObj)) {
      // Will pause every 16384 iterations until `drain` is emitted
      await new Promise(resolve => file.once('drain', resolve));
    }
  }
})();

const fileCSV = require("fs").createWriteStream("./data.csv");

(async() => {
  for(let i = 0; i < 10000000; i++) {
    let tempObj = '';

    //format to CSV
    if (i === 0) {
      tempObj = 'restaurant_id|photo_URL|item_name|description|price|popular|special_instruction|extras\n';
      // console.log("1: ", data[i].restaurant_id)
      let obj = JSON.stringify(data[i].extras);
      tempObj += `${data[i].restaurant_id}|${data[i].photo_URL}|${data[i].item_name}|${data[i].description}|${data[i].price}|${data[i].popular}|${data[i].special_instruction}|${obj}\n`;
    } else {
      // console.log(data[i].restaurant_id)
      let obj = JSON.stringify(data[i].extras);
      tempObj += `${data[i].restaurant_id}|${data[i].photo_URL}|${data[i].item_name}|${data[i].description}|${data[i].price}|${data[i].popular}|${data[i].special_instruction}|${obj}\n`;
    }

    if(!fileCSV.write(tempObj)) {
      // Will pause every 16384 iterations until `drain` is emitted
      await new Promise(resolve => fileCSV.once('drain', resolve));
    }
  }
})();
