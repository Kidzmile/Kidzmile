CREATE DATABASE KidzmileDb
GO

USE  KidzmileDb
GO

IF EXISTS(
	SELECT type,type_desc
	FROM sys.procedures
	WHERE name='SpProductDetails_Get' AND type='P'
)
DROP PROCEDURE dbo.SpProductDetails_Get
GO

IF EXISTS(
	SELECT type,type_desc
	FROM sys.procedures
	WHERE name='SpProductDetails_GetBySKUCode' AND type='P'
)
DROP PROCEDURE dbo.SpProductDetails_GetBySKUCode
GO

IF EXISTS(
	SELECT type,type_desc
	FROM sys.procedures
	WHERE name='SpProductDetails_Update' AND type='P'
)
DROP PROCEDURE dbo.SpProductDetails_Update
GO

IF EXISTS(
	SELECT type,type_desc
	FROM sys.procedures
	WHERE name='SpProductDelete' AND type='P'
)
DROP PROCEDURE dbo.SpProductDelete
GO

IF EXISTS(
	SELECT type,type_desc
	FROM sys.procedures
	WHERE name='SpProductDetails_Insert' AND type='P'
)
DROP PROCEDURE dbo.SpProductDetails_Insert
GO

IF EXISTS(
	SELECT type,type_desc
	FROM sys.procedures
	WHERE name='SpCategory_Get' AND type='P'
)
DROP PROCEDURE dbo.SpCategory_Get
GO

IF EXISTS(
	SELECT type,type_desc
	FROM sys.procedures
	WHERE name='SpProductImages_GetBySKUCode' AND type='P'
)
DROP PROCEDURE dbo.SpProductImages_GetBySKUCode
GO

----------Drop tables---------------
IF OBJECT_ID('dbo.ProductDetails', 'U') IS NOT NULL 
  DROP TABLE [dbo].[ProductDetails];

IF OBJECT_ID('dbo.Image', 'U') IS NOT NULL 
  DROP TABLE [dbo].[Image];

IF OBJECT_ID('dbo.Category', 'U') IS NOT NULL 
  DROP TABLE [dbo].[Category];

IF OBJECT_ID('dbo.Product', 'U') IS NOT NULL 
  DROP TABLE [dbo].[Product];


-------TABLES----------------------------------------------
CREATE TABLE dbo.Product
(
id INT IDENTITY(1,1) PRIMARY  KEY,
sku_code		NVARCHAR(20) NOT NULL UNIQUE,
name			NVARCHAR(100) NOT NULL ,
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
name				NVARCHAR(100) PRIMARY KEY
)
GO

CREATE TABLE [dbo].[Image]
(
id					INT IDENTITY(1,1) PRIMARY KEY,
sku_code			NVARCHAR(20) FOREIGN KEY REFERENCES dbo.Product(sku_code),
image_path			NVARCHAR(50) UNIQUE NOT NULL
)
GO

CREATE TABLE [dbo].[ProductDetails]
(
id					INT IDENTITY(1,1) PRIMARY KEY,
color				NVARCHAR(20) NOT NULL,
size				NVARCHAR(20) NOT NULL,
product_description NVARCHAR(400) NOT NULL,
material			NVARCHAR(50) ,
created_ts			DATETIME DEFAULT GETDATE(),
updated_ts			DATETIME DEFAULT GETDATE(),
image_path			NVARCHAR(50) FOREIGN KEY REFERENCES [dbo].[Image](image_path),
Product_id			INT FOREIGN KEY REFERENCES dbo.Product(id),
category_name		NVARCHAR(100) FOREIGN KEY REFERENCES dbo.Category(name)
)
GO

-------------------------STORED PROCEDURE-------------------
CREATE PROCEDURE dbo.SpProductDetails_Get
AS									
BEGIN								
SELECT p.id,p.name,p.sku_code as skucode,units ,product_active as isactive,
price_per_unit as priceperunit,color,size,
product_description as [description],material,image_path as imagepath,category_name as category
FROM 
	dbo.Product p 
	INNER JOIN 
	dbo.ProductDetails d 
	ON p.id=d.Product_id 
END									
GO

----------------------------------------------------------
CREATE PROCEDURE dbo.SpProductDetails_GetBySKUCode 
@skucode NVARCHAR(20)
AS									
BEGIN								
SELECT Top 1 p.id,p.name,sku_code as skucode,units ,product_active as isactive,
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
@product_description  NVARCHAR(400),
@material NVARCHAR(50),
@imagepath NVARCHAR(80),
@category NVARCHAR(20),
@id INT OUTPUT
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
@name NVARCHAR(100)=NULL,
@units SMALLINT=NULL,
@product_active BIT=NULL,
@price_per_unit  NUMERIC=NULL,
@color NVARCHAR(50) =NULL,
@size NVARCHAR(20)=NULL, 
@product_description  NVARCHAR(400)=NULL,
@material NVARCHAR(50) = NULL,
@imagepath NVARCHAR(50),
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

CREATE PROCEDURE dbo.SpCategory_Get
AS									
BEGIN								
SELECT id,name FROM dbo.Category
END									
GO

--------------------------------------------
CREATE PROCEDURE dbo.SpProductImages_GetBySKUCode
@skucode		NVARCHAR(20)=NULL
AS									
BEGIN								
SELECT image_path as imagepath FROM dbo.Image
WHERE sku_code=@skucode
END									
GO
--------------------------------------------
IF OBJECT_ID (N'dbo.uFnMainImagePath', N'FN') IS NOT NULL  
    DROP FUNCTION uFnMainImagePath;  
GO  

CREATE FUNCTION dbo.uFnMainImagePath(@skucode NVARCHAR(20))
returns NVARCHAR(80)
as
begin
	declare @result NVARCHAR(80)
	 return(select top 1 image_path from [dbo].[Image] where sku_code=@skucode)
end

---------------------------------------------------------------