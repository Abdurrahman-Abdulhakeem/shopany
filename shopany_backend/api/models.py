from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=200, null=True, blank=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=200)
    image = models.FileField(upload_to="users/", default="users/empty_logo.png")
    
    USERNAME_FIELD = 'email'
    
    REQUIRED_FIELDS = ["first_name", "last_name"]
    
    def __str__(self):
        return self.first_name or self.username or self.last_name
    
    
    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'
    

class Category(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name
 

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category, related_name="products")
    name = models.CharField(max_length=200)
    image = models.FileField(upload_to='products/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10000, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    image = models.FileField(upload_to='carts/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10000, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.name
    
    def total_price(self):
        return self.price * self.quantity
