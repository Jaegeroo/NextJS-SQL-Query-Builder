const fs = require("fs");

// Read the data from db.json
fs.readFile("users.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading db.json:", err);
    return;
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Fields to be deleted
  const fieldsToDelete = [
    "username",
    "password",
  ];

  // Iterate through each user and delete specified fields
  jsonData.users.forEach((user) => {
    fieldsToDelete.forEach((field) => {
      delete user[field];
    });
  });

  // Write the updated data back to db.json
  fs.writeFile("db.json", JSON.stringify(jsonData, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Error writing to db.json:", err);
      return;
    }
    console.log("db.json has been updated.");
  });
});
