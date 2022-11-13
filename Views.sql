CREATE VIEW InStock AS 	
(
	SELECT i.item_name, i.item_id, g.good_id, g.V_branch_id
    	FROM Good as g, Item as i 
);

CREATE VIEW CheapestGood AS
(
	SELECT * 
	FROM Good
	ORDER BY Price ASC
);

CREATE VIEW GoodsWithName AS
(
	Select i.item_name, g.item_id, g.good_id, g.V_branch_id, g.Price
	From Item as i, Good as g
);

CREATE VIEW SupplyLocation AS
(
	Select Supplies.Good_id, V_branch.V_branch_id, V_branch.location "V_Location", C_branch.C_branch_id, C_branch.location "C_Location" 
	From Supplies, V_branch, C_branch 
);
