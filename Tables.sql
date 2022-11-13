CREATE TABLE `user`
( user_id int primary key,
  user_name varchar(255),
  user_password int,
  user_type varchar(255)
 );
 
CREATE TABLE C_branch
(
 C_user_id int not null,
 C_branch_id int not null,
 location varchar(255),
 Primary Key(C_user_id, C_branch_id),
 UNIQUE(C_branch_id),
 foreign key(C_user_id) references `user`(user_id)
	ON DELETE CASCADE ON UPDATE CASCADE
 );
 
CREATE TABLE V_branch
 (
  V_user_id int not null,
  V_branch_id int not null,
  location varchar(255),
  Primary Key(V_user_id, V_branch_id),
  UNIQUE(V_branch_id),
  foreign key(V_user_id) references `user`(user_id)
		ON DELETE CASCADE ON UPDATE CASCADE
  );
CREATE TABLE `admin`
(
 user_id int not null primary key,
 permission boolean,
 foreign key(user_id) references `user`(user_id)
	ON DELETE CASCADE ON UPDATE CASCADE
 );
CREATE TABLE Item
( item_id int primary key,
  item_name varchar(255)
 );
CREATE TABLE Good
(
 good_id int not null primary key,
 item_id int not null,
 V_branch_id int not null,
 Price int not null,
 V_user_id int not null,
 foreign key(item_id) references Item(item_id)
	ON DELETE CASCADE ON UPDATE CASCADE,
 foreign key(V_branch_id) references v_branch(V_branch_id)
		ON DELETE CASCADE ON UPDATE CASCADE,
 foreign key(V_user_id) references V_branch(V_user_id)
		ON DELETE CASCADE ON UPDATE CASCADE
 );
CREATE TABLE Supplies
(
  Good_id int not null,
  C_user_id int not null,
  C_branch_id int not null,
  V_user_id int not null,
  V_branch_id int not null,
  Primary Key(Good_id, C_user_id, C_branch_id, V_user_id, V_branch_id),
  foreign key(V_branch_id) references V_branch(V_branch_id)
		ON DELETE CASCADE ON UPDATE CASCADE,
  foreign key(V_user_id) references V_branch(V_user_id)
		ON DELETE CASCADE ON UPDATE CASCADE,
  foreign key(C_branch_id) references C_branch(C_branch_id)
		ON DELETE CASCADE ON UPDATE CASCADE,
  foreign key(C_user_id) references C_branch(C_user_id)
		ON DELETE CASCADE ON UPDATE CASCADE,
  foreign key(Good_id) references Good(good_id)
		ON DELETE CASCADE ON UPDATE CASCADE
  );
