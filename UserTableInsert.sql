USE Users

BULK INSERT UserTable
FROM 'C:\Users\ltalo\OneDrive\ドキュメント\Documents\College Work\Spring 2025\SoftEngi 3354\SQLTestFiles\UserTest.txt'
WITH(
	firstrow = 1,
	FIELDTERMINATOR =',',
	ROWTERMINATOR ='\n'
);

SELECT * FROM UserTable;
--DELETE FROM UserTable;
