Bamazon

In this repository, Bamazon has been built to allow users the ability to create and maintain a marketplace using Node.js and MySQL.

Part I - Customer View

In Part I, a database (bamazon) has been created using MySQL to keep track of inventory.  The Id number, product name, department name, price and stock quantity for each product will be maintained in the bamazon database.  A node application, bamazonCustomer.js, has been created to allow customers to purchase items based on availability.  The bamazon database will be updated after purchases are completed.

Below is an image of the schema used to create the database using MySQL:
![Bamazon SQL Schema Image](images/schema.png)

The following is an image of the products table that was created using the above schema:
![Bamazon Products Table - after initial creation](images/tableBefore.png)

This is a print screen of a purchase made in the bash terminal (triggered by running command: node bamazon.js):
![Bamazon Iniital Purchase](images/initialPurchase.png)

Below is an image of the updated table after the purchase above was made (Note: The units for Item id 4 was updated to 8 based on the purchase of 2 units):
![Bamazon Products Table - after purchase](images/tableAfter.png)

Below is a screen shot in the terminal where the user is attempting to buy more units than what is available in inventory:
![Bamazon Purchase - quantity not available](images/purchaseError.png)

Part II - Manager View

In Part II, users have the ability to choose between options of viewing products, viewing low inventory, and adding new products using Node application, bamazonManager.js:

* View Products for Sale
* View Low Inventory
* Add New Products

Below is a screen shot from the bash terminal (triggered by running: node bamazonManager.js):
![bamazon Manager command line screen shot](images/partII.png)

The following will appear when users select View Products for Sale:
![bamazon Manager view products](images/ManagerViewProducts.png)

Users will view the following in the CLI when selecting View Low Inventory:
![bamazon Manager view low inventory](images/ManagerLowInventory.png)

Below is a sampling of a user that has added a new product to the marketplace as well as an updated view of the MySQL database showing the new product:
![bamazon Manager Add New](images/ManagerAddNew.png)
![bamazon Manager DB update](images/ManagerAddItem.png)

Users may exit the CLI by selecting the Exti option:
![bamazon Manager Exit](images/ManagerExit.png)
