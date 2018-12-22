
-------
DROP TABLE dbo.ProductDetails
DROP TABLE dbo.Category
DROP TABLE dbo.Product


------------------
select * from Product
select * from ProductDetails
select * from Category
-------------------
delete ProductDetails
delete Product
delete Category

-------------------
INSERT INTO Category(name) VALUES('Baby Toys')
INSERT INTO Category(name) VALUES('Banner')
INSERT INTO Category(name) VALUES('Plush Animals')
INSERT INTO Category(name) VALUES('Plush Pillows')
INSERT INTO Category(name) VALUES('Soft Toys')	

INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) values ('Teddy Bear','TDB',20,1,20)
INSERT INTO ProductDetails (color,size,product_description,material	,created_ts	,updated_ts,Product_id,image_path,category_name)	values
('Red','20*20','teddy toy','NA',GETDATE(),GETDATE(),SCOPE_IDENTITY(),'C:\asset','Soft toys' )
INSERT INTO Category(name) values('Soft Toys')

INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) values ('Car','CCR',10,1,5)
INSERT INTO ProductDetails (color,size,product_description,material,image_path ,created_ts	,updated_ts,Product_id,category_name)	values
('blue','10*20','blue toy','NA', 'c:/' ,GETDATE(),GETDATE(),SCOPE_IDENTITY(),'Plush Animals')


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
INSERT INTO [dbo].[Image] values('TDB','\assets\images\Product\Plush Animals\1.jpg')
INSERT INTO [dbo].[Image] values('TDB','\assets\images\Product\Plush Animals\2.jpg')
INSERT INTO [dbo].[Image] values('TDBc','\assets\images\Product\Plush Animals\3.jpg')

INSERT INTO [dbo].[Image] values('BBT','\assets\images\Product\Plush Animals\IMG_3429.jpg')
INSERT INTO [dbo].[Image] values('BBT','\assets\images\Product\Plush Animals\IMG_3430.jpg')
INSERT INTO [dbo].[Image] values('BBT','\assets\images\Product\Plush Animals\IMG_3455.jpg')
INSERT INTO [dbo].[Image] values('BBT','\assets\images\Product\Plush Animals\IMG_3459.jpg')


select * from [dbo].[Image]
dbo.SpProductImages_GetBySKUCode @skucode='TDB'
-----------------------------------------------------
SpProductDetails_Get
spProductDetails_GetBySKUCode @skucode='CCR'

------------------------------------
declare @id int ,
@statusmessage nvarchar(100)
execute SpProductDetails_INSERT
'DGCCCCCCCCC',
'DOG',
'10',
'9',
'9',
'b',
'9',
'b',
'c',
'C:\asset',
'Plush Animals',
@id  output 
print @id
--@statusmessage output
print @statusmessage



SpProductDetails_Get


declare @isupdated  bit
declare @statusmessage nvarchar(100)
execute SpProductDetails_Update
'CCR',
'a',
'9',
'9',
'9',
'b',
'',
'10000.1234567898',
'c',
'C:\',
'Plush Animals',
@statusmessage output,
@isupdated output
--@id  output 
print @statusmessage
print @isupdated
---

SpProductDetails_Get

declare @isdeleted  bit
 declare @statusmessage nvarchar(100)
execute SpProductDelete
'CCR',
@statusmessage output,
@isdeleted output
--@id  output 
print @statusmessage
print @isdeleted
