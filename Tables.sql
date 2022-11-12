CREATE TABLE userName
( user_id int primary key,
  user_name varchar,
  user_password int,
  user_type varchar
 );
 
CREATE TABLE C_branch
(
 C_user_id int primary key,
 C_branch_id int primary key,
 location varchar,
 foreign key(userName) references userName(user_id)
 );
 
CREATE TABLE V_branch
 (
  V_user_id int primary key,
  V_branch_id int primary key,
  location varchar,
  foreign key(userName) references userName(user_id)
  );
CREATE TABLE adminName
(
 user_id int primary key,
 permission varchar,
 foreign key(userName) references userName(user_id)
 );
CREATE TABLE Item
( item_id int primary key,
  item_name varchar
 );
CREATE TABLE Good
(
 good_id int primary key,
 item_id int,
 V_branch_id int,
 Price int,
 V_user_id int,
 foreign key(Item) references Item(item_id),
 foreign key(V_branch) references V_branch(V_branch_id),
 foreign key(V_branch) references V_branch(V_user_id)
 );
CREATE TABLE Supplies
(
  Good_id int,
  C_user_id int,
  C_branch_id int,
  V_user_id int,
  V_branch_id int,
  foreign key(V_branch) references V_branch(V_branch_id),
  foreign key(V_branch) references V_branch(V_user_id),
  foreign key(C_branch) references C_branch(C_branch_id),
  foreign key(C_branch) references C_branch(C_user_id),
  foreign key(Good) references Good(good_id)
  );
