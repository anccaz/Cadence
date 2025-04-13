1. Before doing anything, ensure that SQL Server 2022 Developer and SQL Server Management Studio is installed on computer.
  - https://www.microsoft.com/en-us/sql-server/sql-server-downloads
  - https://learn.microsoft.com/en-us/ssms/download-sql-server-management-studio-ssms

2. Right click on "Databases" Folder and create two databases (Users and Listings).

3. Run code files "ListTableCreate" and "UserTableCreate" to create and format tables to store User and Listing data.

4. At this point, any of the other query files can be test queries for certain functions relating to the database.

  - ListTableInsert and UserTableInsert
    This query requires the .txt files "ListingTest.txt" and "UserTest.txt". Before running this query, ensure that the path   name on line 4 is the path name to the required .txt file. This query will read the .txt file and insert data into the formatted table.

  - UserSearch and ListingSearch
    This query files takes in user input in SQL and then sorts database to most relevent match. It then displays the data based on the user's input. A test case is already preloaded into this file.

DEVELOPER NOTES:
- These queries are planning to be run via SQL Agents that can update the databases periodically/on server activation.
- In the future, ListTableInsert and UserTableInsert will be replaced by frontend POST and GET requests.
- Search function will require frontend connection, will be future implement (POST and GET requests).
