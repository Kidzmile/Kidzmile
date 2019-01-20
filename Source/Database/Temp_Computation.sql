-----------data Insertion script----------
--delete [ProductDetails]
--delete [Image]
--delete [Category]
--delete product
-----------------------
INSERT INTO [dbo].[Category](name) VALUES('Baby Toys')
INSERT INTO [dbo].[Category](name) VALUES('Banner')
INSERT INTO [dbo].[Category](name) VALUES('Plush Animals')
INSERT INTO [dbo].[Category](name) VALUES('Plush Pillows')
INSERT INTO [dbo].[Category](name) VALUES('Soft Toys')	

-----------------------
INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) values ('Soft Teddy Bear, 4ft/112cm (Brown)','TDB',20,1,20)

INSERT INTO [dbo].[Image] values('TDB','\assets\images\Product\Soft Toys\teddy_4.jpg')
INSERT INTO [dbo].[Image] values('TDB','\assets\images\Product\Soft Toys\teddy_5.jpg')
INSERT INTO [dbo].[Image] values('TDB','\assets\images\Product\Soft Toys\teddy_2.jpg')
INSERT INTO [dbo].[Image] values('TDB','\assets\images\Product\Soft Toys\teddy_1.jpg')

INSERT INTO ProductDetails (color,size,product_description,material	,created_ts	,updated_ts,Product_id,image_path,category_name)	values
('Brown','112cm','teddy toy-It is made with child safe fabrics and wears a bow around its neck','NA',GETDATE(),GETDATE(),IDENT_CURRENT('Product'),'\assets\images\Product\Soft Toys\teddy_4.jpg','Soft toys' )

--------------------------

INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) values ('CIVIZ Mickey Mouse Soft Toy (3ft)','B075MG7J93',23,1,1500)
INSERT INTO [dbo].[Image] values('B075MG7J93','\assets\images\Product\Baby Toys\bt.jpg')
INSERT INTO [dbo].[Image] values('B075MG7J93','\assets\images\Product\Baby Toys\bt_1.jpg')
INSERT INTO [dbo].[Image] values('B075MG7J93','\assets\images\Product\Baby Toys\bt_2.jpg')
INSERT INTO [dbo].[Image] values('B075MG7J93','\assets\images\Product\Baby Toys\bt_3.jpg')

INSERT INTO ProductDetails (color,size,discount,product_description,material	,created_ts	,updated_ts,Product_id,image_path,category_name)	values
('Red','182cm',1300,'Light weighted, attractive, colourful, vibrant','NA',GETDATE(),GETDATE(),IDENT_CURRENT('Product'),'\assets\images\Product\Baby Toys\bt.jpg','Baby Toys' )

-----

INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) values ('Hot Toys Gift Pack  (Multicolor)-a set of 10 pieces','85231HBANT',10,1,3500)
INSERT INTO [dbo].[Image] values('85231HBANT','\assets\images\Product\Banner\1.jpeg')
INSERT INTO [dbo].[Image] values('85231HBANT','\assets\images\Product\Banner\2.jpeg')
INSERT INTO [dbo].[Image] values('85231HBANT','\assets\images\Product\Banner\3.jpeg')

INSERT INTO ProductDetails (color,size,discount,product_description,material,created_ts	,updated_ts,Product_id,image_path,category_name)	values
('Multi','Variety*152cm',2400,'League TCG Collection Bonanza Pack 2018/19 by Topps, colourful, vibrant','NA',GETDATE(),GETDATE(),IDENT_CURRENT('Product'),'\assets\images\Product\Banner\1.jpeg','Banner' )

----------

INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) values ('Cuddly Toys Plush Animal Hand Puppets for Kids ','91AHFTZPL',5,1,895)
INSERT INTO [dbo].[Image] values('91AHFTZPL','\assets\images\Product\Plush Animals\5.jpg')
INSERT INTO [dbo].[Image] values('91AHFTZPL','\assets\images\Product\Plush Animals\4.jpg')
INSERT INTO [dbo].[Image] values('91AHFTZPL','\assets\images\Product\Plush Animals\3.jpg')
INSERT INTO [dbo].[Image] values('91AHFTZPL','\assets\images\Product\Plush Animals\2.jpg')

INSERT INTO ProductDetails (color,size,discount,product_description,material,created_ts	,updated_ts,Product_id,image_path,category_name)	values
('Black','122cm',890.90,'Montessori Storytelling Educational Puppet For Preschoolers (Small- For Kids)','NA',GETDATE(),GETDATE(),IDENT_CURRENT('Product'),'\assets\images\Product\Plush Animals\2.jpg','Plush Animals' )
------------------------------------------------

INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) values ('EZ Life Soft Plush Smiling Star Illuminating 7 Colour LED Light Pillow Toy (Yellow)','PPLFK33AE',5,1,4562.50)
INSERT INTO [dbo].[Image] values('PPLFK33AE','\assets\images\Product\Plush Pillows\2.jpg')
INSERT INTO [dbo].[Image] values('PPLFK33AE','\assets\images\Product\Plush Pillows\1.jpg')
INSERT INTO [dbo].[Image] values('PPLFK33AE','\assets\images\Product\Plush Pillows\3.jpg')
INSERT INTO [dbo].[Image] values('PPLFK33AE','\assets\images\Product\Plush Pillows\4.jpg')

INSERT INTO ProductDetails (color,size,discount,product_description,material,created_ts	,updated_ts,Product_id,image_path,category_name)	values
('Pink','122cm',0,'Pretty, squishy and cuddly-- perfect gift for your kids and adults too. The LED lights keep changing colors','NA',GETDATE(),GETDATE(),IDENT_CURRENT('Product'),'\assets\images\Product\Plush Pillows\2.jpg','Plush Pillows' )
-----------------------------------------
---SpProductImages_GetBySKUCode @skucode='TDB'
--SpProductDetails_Get
--spProductDetails_GetBySKUCode @skucode='B075MG7J93'
------------------------------------------
select * from Category
select * from Product
select * from ProductDetails
select * from [dbo].[Image]
-------------------
