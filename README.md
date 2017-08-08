Bamazon

In this Repository, users have the ability to create and maintain a marketplace using Node.js and MySQL.

In Part I, a database (named: bamazon) has been created using MySQL to keep track of inventory.  The Id number, product name, department name, price and stock quantity for each product will be maintained in the bamazon database.  A node application (named: bamazonCustomer.js) has been created to allow customers to purchase items based on availability.  The bamazon database will be updated after purchases are completed.

Below is an image of the schema used to create the database using MySQL:
![Bamazon SQL Schema Image](images/schema.png)

The following is an image of the products table that was created using the above schema:
![Bamazon Products Table - after initial creation](images/tableBefore.png)

This is a print screen of a purchase made in the bash terminal (triggered by command: node bamazon.js):
![Bamazon Iniital Purchase](images/initialPurchase.png)

Below is an image of the updated table after the purchase above was made (Note: The units for Item id 4 was updated to 8 based on the purchase of 2 units):
![Bamazon Products Table - after purchase](images/tableAfter.png)

Below is a screen shot in the terminal where the user is attempting to buy more units than what is available in inventory: 
![Bamazon Purchase - quantity not available](images/purchaseError.png)

Part II - Manager View

Part III - Supervisor View
