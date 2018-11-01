CREATE DATABASE KidzmileDb
USE  KidzmileDb

-------TABLES----------------------------------------------
CREATE TABLE Product
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

CREATE TABLE ProductDetails
(
id					INT IDENTITY(1,1) PRIMARY KEY,
color				NVARCHAR(20) NOT NULL,
size				NVARCHAR(20) NOT NULL,
product_description NVARCHAR(100) NOT NULL,
material			NVARCHAR(50) ,
created_ts			DATETIME DEFAULT GETDATE(),
updated_ts			DATETIME DEFAULT GETDATE(),
Product_id			INT FOREIGN KEY REFERENCES Product(id)
)
GO

-------------------------STORED PROCEDURE-------------------
CREATE PROCEDURE dbo.SpProductDetails_Get
AS									
BEGIN								
SELECT p.id,name,sku_code as skucode,units ,product_active as isproductactive,
price_per_unit as priceperunit,color,size,
product_description as [description],material
FROM dbo.Product p INNER JOIN dbo.ProductDetails d ON p.id=d.Product_id				
END									
GO

CREATE PROCEDURE dbo.SpProductDetails_GetBySKUCode 
@skucode NVARCHAR(20)
AS									
BEGIN								
SELECT Top 1 p.id,name,sku_code as skucode,units ,product_active as isproductactive,
price_per_unit as priceperunit,color,size,
product_description as [description],material
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
@id int OUTPUT,
@statusmessage NVARCHAR(100) OUTPUT
AS
BEGIN TRY
	BEGIN TRANSACTION
	IF  EXISTS(Select 1 from dbo.Product where sku_code=@sku_code)
	BEGIN
	print 'after begin'
	SET @statusmessage='Product with'+ @sku_code+' already exists'
	RAISERROR('Duplicate entry',16,1)
	END
	ELSE
		BEGIN
		print 'after else'
		INSERT INTO Product (name,sku_code,units,product_active,price_per_unit) VALUES(@name,@sku_code,@units,@product_active,@price_per_unit)
		Select @id=id from Product where sku_code=@sku_code
		INSERT INTO  dbo.ProductDetails (color,size,product_description,material,Product_id) VALUES(@color,@size,@product_description,@material,@id)
		SET @statusmessage='Product'+  @sku_code+' added with id '+cast(@id AS NVARCHAR(15))
		END
	COMMIT
END	TRY
BEGIN CATCH
SET @id=-1
SET @statusmessage='Product with'+ @sku_code+' already exists'
ROLLBACK
END CATCH
GO

---------------

CREATE PROCEDURE SpProductDetails_Update
@sku_code		NVARCHAR(20)=NULL ,
@name NVARCHAR(20)=NULL,
@units SMALLINT=NULL,
@product_active BIT=NULL,
@price_per_unit  NUMERIC=NULL,
@color NVARCHAR(50) =NULL,
@size NVARCHAR(20)=NULL, 
@product_description  NVARCHAR(100)=NULL,
@material NVARCHAR(50) = NULL,
@statusmessage NVARCHAR(100) OUTPUT
AS
BEGIN TRY
	declare @pid AS INT
	declare @pdid AS INT
						Begin
						SELECT @pid=id  from Product where sku_code=@sku_code
						if(@pid<>'')
						begin
						SELECT @pdid=Product_id  from ProductDetails where Product_id=@pid	
						print 'values'+ cast(@pid AS NVARCHAR(15)) + cast(@pdid AS NVARCHAR(15))
						if(@pdid=@pid)	
						begin
						begin transaction
						UPDATE Product 
						SET name= @name,
						units=@units,
						product_active=@product_active,
						price_per_unit=@price_per_unit,
						updated_ts=GETDATE()
						WHERE id=@pid
						UPDATE  ProductDetails 
						SET color=@color,
						size=@size,
						product_description=@product_description,
						material=@material,
						updated_ts=GETDATE()
						WHERE Product_id=@pdid			
						SET @statusmessage='Product with sku code '+  @sku_code+' updated ,its  id '+cast(@pid AS NVARCHAR(15))
							commit	
						END
						ELSE
						BEGIN
						SET @statusmessage='Product with sku code '+  @sku_code+' have differnt ids being '+cast(@pid AS NVARCHAR(15))+cast(@pdid AS NVARCHAR(15))
						END
						END
						ELSE
						BEGIN
							SET @statusmessage='Product with sku code '+  @sku_code+' doesnt exist'
						END
						END
END	TRY
BEGIN CATCH
begin
SET @statusmessage='Product with sku code '+ @sku_code+' failed to update'
RAISERROR(N' PRODUCT update failed %s',16,1,@sku_code)
ROLLBACK transaction
end
END CATCH
GO

