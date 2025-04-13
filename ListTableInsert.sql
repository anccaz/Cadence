use Listings

BULK INSERT ListingTable
FROM 'C:\Users\ltalo\OneDrive\ドキュメント\Documents\College Work\Spring 2025\SoftEngi 3354\SQLTestFiles\ListingTest.txt'
WITH(
	firstrow = 1,
	FIELDTERMINATOR ='<>',
	ROWTERMINATOR ='\n'
);

SELECT * FROM ListingTable;
--delete from ListingTable;
