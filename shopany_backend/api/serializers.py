from rest_framework import serializers
from .models import *

from django.core.validators import FileExtensionValidator

import re


class UserSerializer(serializers.ModelSerializer):
    
    confirm_password = serializers.CharField(write_only=True)
    fullname = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = (
            'username', 
            'fullname', 
            'first_name',
            'last_name',
            'email', 
            'phone_number',
            'image',
            'password',
            'confirm_password'
        )
        
        
    def get_fullname(self, obj):
        return obj.get_full_name()
    
    def create(self, validated_data):
      
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        
        
        user.set_password(validated_data['password'])
        
        return user
    
    def validate(self, obj):
        
        errors = {}
        
        if not re.search(r'^[a-zA-Z]{2,20}$', obj.get("first_name")):
            errors['message'] = "Enter valid first name"
            raise serializers.ValidationError(errors)
        
        if not re.search(r'^[a-zA-Z]{2,20}$', obj.get("last_name")):
            errors['message'] = "Enter valid last name"
            raise serializers.ValidationError(errors)
        
        if not obj.get("email").endswith(("@gmail.com", "@yahoo.com")):
            errors['message'] = "We accept only valid email addresses"
            raise serializers.ValidationError(errors)
        
        if not re.search(r'\b(?:\+?234|0)?[789][01]\d{8}\b', obj.get("phone_number")):
            errors["message"] = "Invalid phone number"
            raise serializers.ValidationError(errors)
        if not re.search(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', obj.get("password")):
            errors["message"] = "Password must contains at least 8 characters long one uppercase letter, one lowercase letter, one digit and one special character"
            raise serializers.ValidationError(errors)
        
        if not obj.get("password") == obj.get("confirm_password"):
            errors["message"] = "Password does not match confirm password"
            raise serializers.ValidationError(errors)
        
        return obj
    

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ('id', 'name',)
    
    
class ProductSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(source='category', many=True, read_only=True)    
    class Meta:
        model = Product
        fields = (  "id",
                    "categories",
                    "name",
                    "image",
                    "description",
                    "quantity",
                    "price",
                    "rating")
        
        
class CartSerializer(serializers.ModelSerializer):
    
    product_amount = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Cart
        fields = (
                    "id",
                    "product",
                    "name",
                    "image",
                    "description",
                    "quantity",
                    "price",
                    "product_amount",
                    "rating")
        
    def get_product_amount(self, obj):
        return obj.total_price()
    
        