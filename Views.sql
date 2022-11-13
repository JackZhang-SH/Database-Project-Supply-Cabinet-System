CREATE VIEW InStock AS 	
(
	SELECT i.name, i.item_id, g.good_id, V_branch_id
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
	Select Supplies.Good_id, V_branch.V_branch_id, V_branch.location, C_branch.C_branch_id, C_branch.location 
	From Supplies 
	Join V_branch
	on V_branch_id
	Join C_branch
	on C_branch_id
);
