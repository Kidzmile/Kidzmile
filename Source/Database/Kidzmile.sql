CREATE DATABASE KidzmileDb
USE  KidzmileDb
DROP dbo.SpProductDetails_Get
DROP dbo.SpProductDetails_GetBySKUCode
DROP dbo.SpProductDetails_Update
DROP dbo.SpProductDelete
DROP dbo.SpProductDetails_Insert
DROP dbo.SpCategory_Get
-------TABLES----------------------------------------------
CREATE TABLE dbo.Product
(
id INT IDENTITY(1,1) PRIMARY  KEY,
sku_code		NVARCHAR(20) NOT NULL UNIQUE,
name			NVARCHAR(20) NOT NULL ,
units			SMALLINT  DEFAULT(0),
product_active  BIT  DEFAULT(0),
price_per_unit  NUMERIC DEFAULT(0),
created_ts		DATETIME DEFAULT GETDATE(),
updated_ts		DATETIME DEFAULT GETDATE(),
)
GO

CREATE TABLE dbo.Category
(
id					INT IDENTITY(1,1) ,
name				NVARCHAR(20) PRIMARY KEY
)
GO

CREATE TABLE dbo.ProductDetails
(
id					INT IDENTITY(1,1) PRIMARY KEY,
color				NVARCHAR(20) NOT NULL,
size				NVARCHAR(20) NOT NULL,
product_description NVARCHAR(100) NOT NULL,
material			NVARCHAR(50) ,
created_ts			DATETIME DEFAULT GETDATE(),
updated_ts			DATETIME DEFAULT GETDATE(),
image_path			NVARCHAR(100) NOT NULL,
Product_id			INT FOREIGN KEY REFERENCES dbo.Product(id),
category_name		NVARCHAR(20) FOREIGN KEY REFERENCES dbo.Category(name)
)
GO



-------------------------STORED PROCEDURE-------------------
CREATE PROCEDURE dbo.SpProductDetails_Get
AS									
BEGIN								
SELECT p.id,p.name,sku_code as skucode,units ,product_active as isproductactive,
price_per_unit as priceperunit,color,size,
product_description as [description],material,d.image_path as imagepath,category_name as category
FROM dbo.Product p INNER JOIN dbo.ProductDetails d ON p.id=d.Product_id		
END									
GO

----------------------------------------------------------
CREATE PROCEDURE dbo.SpProductDetails_GetBySKUCode 
@skucode NVARCHAR(20)
AS									
BEGIN								
SELECT Top 1 p.id,p.name,sku_code as skucode,units ,product_active as isproductactive,
price_per_unit as priceperunit,color,size,
product_description as [description],material,d.image_path as imagepath,category_name as category
 FROM dbo.Product p INNER JOIN dbo.ProductDetails d ON p.id=d.Product_id
 WHERE  p.sku_code=@skucode	
END									
GO

----------------------------------------
CREATE PROCEDURE dbo.SpProductDetails_Insert
@sku_code		NVARCHAR(20),
@name NVARCHAR(20),
@units SMALLINT,
@product_active BIT,
@price_per_unit  NUMERIC,
@color NVARCHAR(50) ,
@size NVARCHAR(20), 
@product_description  NVARCHAR(100),
@material NVARCHAR(50),
@imagepath NVARCHAR(100),
@category NVARCHAR(20),
@id int OUTPUT
--@statusmessage NVARCHAR(100) OUTPUT
AS
BEGIN TRY
	BEGIN TRANSACTION
	IF NOT EXISTS(Select 1 from dbo.Product where sku_code=@sku_code)
		BEGIN
		INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) VALUES(@name,@sku_code,@units,@product_active,@price_per_unit)
		Select @id=id FROM Product WHERE sku_code=@sku_code
		INSERT INTO  dbo.ProductDetails (color,size,product_description,material,image_path,Product_id,category_name) VALUES(@color,@size,@product_description,@material,@imagepath,@id,@category)
		--SET @statusmessage='Product'+  @sku_code+' added with id '+cast(@id AS NVARCHAR(15))
		END
	ELSE
		BEGIN
		SET @id=-1
		--SET @statusmessage='Product with'+ @sku_code+' already exists'		
		END
	COMMIT TRANSACTION
END	TRY
BEGIN CATCH
ROLLBACK TRANSACTION
END CATCH
GO

----------------------------------------------------------

CREATE PROCEDURE dbo.SpProductDetails_Update
@sku_code		NVARCHAR(20)=NULL ,
@name NVARCHAR(20)=NULL,
@units SMALLINT=NULL,
@product_active BIT=NULL,
@price_per_unit  NUMERIC=NULL,
@color NVARCHAR(50) =NULL,
@size NVARCHAR(20)=NULL, 
@product_description  NVARCHAR(100)=NULL,
@material NVARCHAR(50) = NULL,
@imagepath NVARCHAR(100)= NULL,
@category NVARCHAR(30)=NULL,
@statusmessage NVARCHAR(100) OUTPUT,
@isupdated AS BIT OUTPUT
AS
BEGIN TRY
	DECLARE @pid AS INT
	DECLARE @pdid AS INT
						BEGIN
						SET @isupdated=0
						SELECT @pid=id  FROM Product WHERE sku_code=@sku_code
						IF(@pid<>'')
						BEGIN
						SELECT @pdid=Product_id  FROM ProductDetails WHERE Product_id=@pid	
						if(@pdid=@pid)	
						BEGIN
						BEGIN TRANSACTION
						UPDATE Product 
						SET name= @name,units=@units,product_active=@product_active,
						price_per_unit=@price_per_unit,updated_ts=GETDATE()
						WHERE id=@pid

						UPDATE  ProductDetails 
						SET color=@color,size=@size,product_description=@product_description,
						material=@material,image_path=@imagepath,category_name=@category,updated_ts=GETDATE()
						WHERE Product_id=@pdid			

						SET @statusmessage='Product with sku code '+  @sku_code+' updated ,its  id '+cast(@pid AS NVARCHAR(15))
						SET @isupdated=1;
							COMMIT	
						END
						ELSE
						BEGIN
						--SET @statusmessage='Product with sku code '+  @sku_code+' have differnt ids being '+cast(@pid AS NVARCHAR(15))+cast(@pdid AS NVARCHAR(15))
						SET @isupdated=0;
						END
						END
						ELSE
						BEGIN
							--SET @statusmessage='Product with sku code '+  @sku_code+' doesnt exist'
							SET @isupdated=0
						END
						END
END	TRY
BEGIN CATCH
BEGIN
--SET @statusmessage='Product with sku code '+ @sku_code+' failed to update'
SET @isupdated=0;
ROLLBACK TRANSACTION
END
END CATCH
GO

------------------------------------------------------------

CREATE PROCEDURE dbo.SpProductDelete
@sku_code		NVARCHAR(20)=NULL ,
@statusmessage NVARCHAR(100) OUTPUT,
@isdeleted AS BIT OUTPUT
AS
BEGIN TRY
DECLARE @pid AS INT
DECLARE @pdid AS INT
--DECLARE @categorycount INT
--DECLARE @categoryname  NVARCHAR(20)
BEGIN
						SET @isdeleted=0
						SELECT @pid=id  FROM Product WHERE sku_code=@sku_code
						IF(@pid<>'')
						BEGIN
						SELECT @pdid=Product_id  FROM ProductDetails WHERE Product_id=@pid	
						if(@pdid=@pid)	
						BEGIN
						BEGIN TRANSACTION
						DELETE FROM ProductDetails WHERE Product_id=@pid
						DELETE FROM Product WHERE id=@pid
						--SELECT @categorycount=COUNT(*) FROM Category WHERE name IN(
						--SELECT  category_name FROM ProductDetails  WHERE Product_id=@pid)
						--SELECT  @categoryname=category_name FROM ProductDetails  WHERE Product_id=@pid
						--IF(@categorycount<=1)
						--BEGIN
						--DELETE FROM Category WHERE name=@categoryname
						--END
						SET @isdeleted=1
						COMMIT TRANSACTION
						END
						ELSE
						BEGIN
						SET @statusmessage='Product with sku code '+  @sku_code+' have differnt ids being '+cast(@pid AS NVARCHAR(15))+cast(@pdid AS NVARCHAR(15))
						SET @isdeleted=0
						END
						END
						ELSE
						BEGIN
						SET @isdeleted=0
						SET @statusmessage='Product with sku code '+  @sku_code+' doesnt exist'
						END
						
END
END TRY
BEGIN CATCH
BEGIN
SET @isdeleted=0
SET @statusmessage='Product with sku code '+  @sku_code+' didnt get deleted'
ROLLBACK TRANSACTION
END
END CATCH
GO
------------------------------------------

ALTER PROCEDURE dbo.SpCategory_Get
AS									
BEGIN								
SELECT id,name FROM dbo.Category
END									
GO
