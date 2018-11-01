
-------
DROP TABLE Product
DROP TABLE ProductDetails

------------------
select * from Product
select * from ProductDetails

-------------------

spProductDetails_GetBySKUCode @skucode='CCA'

INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) values ('Teddy Bear','TDB',20,1,20)
INSERT INTO ProductDetails (color,size,product_description,material	,created_ts	,updated_ts,Product_id)	values
('Red','20*20','teddy toy','NA',GETDATE(),GETDATE(),SCOPE_IDENTITY() )

INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) values ('Car','CCR',10,1,5)
INSERT INTO ProductDetails (color,size,product_description,material	,created_ts	,updated_ts,Product_id)	values
('blue','10*20','blue toy','NA',GETDATE(),GETDATE(),SCOPE_IDENTITY())

INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) values ('Camel','CCA',5,1,20)
INSERT INTO ProductDetails (color,size,product_description,material	,created_ts	,updated_ts,Product_id)	values
('green','20*40','green toy','NA',GETDATE(),GETDATE(),SCOPE_IDENTITY())

INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) values ('Ladder','CLA',35,0,25)
INSERT INTO ProductDetails (color,size,product_description,material	,created_ts	,updated_ts,Product_id)	values
('yellow','20','yellow color toy','NA',GETDATE(),GETDATE(),SCOPE_IDENTITY())

INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) values ('Apple','CAP',56,1,90)
INSERT INTO ProductDetails (color,size,product_description,material	,created_ts	,updated_ts,Product_id)	values
('orange','15','orange color toy','NA',GETDATE(),GETDATE(),SCOPE_IDENTITY())


--------------------------------
declare @id int ,
 @statusmessage nvarchar(100)
execute SpProductDetails_INSERT
'Dol',
'a',
'9',
'9',
'9',
'b',
'9', 
'b',
'c',
@id  output ,
@statusmessage output
print @statusmessage
