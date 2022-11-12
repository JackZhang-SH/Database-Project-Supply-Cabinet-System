CREATE TABLE Company
( company_name varchar primary key,
  address varchar,
  contactNo int
 );
 
CREATE TABLE BranchOffice
(
 officeNo int primary key,
 name varchar,
 contactNumber int,
 company_name varchar,
 foreign key(company_name) references Company(company_name));
 
CREATE TABLE Vendor
 ( vendorID int primary key,
    name varchar,
    contactNo int
    );

CREATE TABLE Item
( ItemNo int primary key,
  name varchar,
  cost decimal,
  description varchar
 );

CREATE TABLE Supplies
(
  suppliesNo int primary key,
  vendorID int,
  ItemNo int,
  price decimal,
  quantity int,
  foreign key(vendorID) references Vendor(vendorID),
  foreign key(ItemNo) references Item(ItemNo)
  );

CREATE TABLE Shipping
(
  shipNo int primary key,
  date date,
  time time,
  suppliesNo int,
  officeNo int,
  foreign key(suppliesNo) references Supplies(suppliesNo),
  foreign key(officeNo) references BranchOffice(officeNo));