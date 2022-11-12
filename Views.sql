#Shows all items that vendors have in stock.
CREATE VIEW InStock AS 	
(
	SELECT  i.name, s.suppliesNo, s.ItemNo, s.VendorID, s.quantity
    FROM Supplies as s, Item as i 
    Where s.quantity > 0
);

#Lists all of the shipping table, arranged earliest date first
CREATE VIEW ShippingByDate AS
(
	SELECT * 
    FROM Shipping
    ORDER BY date ASC
);

#Lists Branch Offices with their corresponding company address
CREATE VIEW OfficeAddress AS
(
	SELECT b.company_name, b.officeNo, b.name, c.address
    FROM BranchOffice as b, company as c
    ORDER BY b.company_name
);

#Gives the supply table but with the item's name added
CREATE VIEW SuppliesWithName AS
(
	SELECT s.suppliesNo, s.vendorID, s.ItemNo, i.name, s.price, s.quantity
    FROM Supplies AS s, Item AS i
);
