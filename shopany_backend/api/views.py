from django.shortcuts import render
from django.forms.models import model_to_dict

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from rest_framework.parsers import MultiPartParser

from django.contrib.auth.hashers import check_password
from django.core.validators import FileExtensionValidator

from .models import *
from .serializers import *

import random

# Create your views here.

class LoginView(APIView):
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email:
            return Response({'message': 'Enter your email address'}, status=400)
        
        elif not password:
            return Response({'message': 'Enter your password'}, status=400)
        
        try:
             user = User.objects.get(email__iexact=email)
             
             pswd_check = check_password(password, user.password)
             
             if not pswd_check:
                 return Response({'message': "Invalid email or password"}, status=400)
             
             if not user.is_active:
                 return Response({'message': "Account is not active, contact admin"}, status=400)
             
             
                 
             
             refresh = RefreshToken.for_user(user)
            
             return Response({'message':
                "Logged in successful",
                'status':True,
                'user': model_to_dict(user, ['id', 'username', 
                                             'first_name',
                                             'last_name',
                                             'email',
                                             'phone_number']),
                'access': str(refresh.access_token),
                'refresh': str(refresh)
                
                })
             
            #  {
            #      "first_name": "Jack",
            #      "last_name": "Ma",
            #      "email": "jack@gmail.com",
            #      "phone_number": "08130561333",
            #      "password": "Jack123$",
            #      "confirm_password":"Jack123$"
            #  }
             
             
        except User.DoesNotExist:
            return Response({'message': 'User does not exist'}, status=404)


class RegisterUserView(APIView):
    
    def post(self, request, *args, **kwargs):
        
        if User.objects.filter(email__iexact=request.data.get('email')).exists():
            return Response({'message': 'Email already exists'}, status=400)
        
        RegisterSerializer = UserSerializer(data=request.data)
        if RegisterSerializer.is_valid(raise_exception=True):
            error = {}
            if not request.data.get('username'):
                firstname = RegisterSerializer.validated_data['first_name']
                lastname = RegisterSerializer.validated_data['last_name']
                
                username = firstname.lower() + lastname.lower().replace(' ', "") + str(random.randint(1, 9999))
                
            if not request.data.get("first_name"):
                error["message"] = "First Name is required"
                raise serializers.ValidationError(error) 
                
            if not request.data.get("last_name"):
                error["message"] = "Last Name is required"
                raise serializers.ValidatorError(error)
               
            if not request.data.get("email"):
                error["message"] = "Email is required"
                raise serializers.ValidationError(error)
               
            if not request.data.get("phone_number"):
                error["message"] = "Phone number is required"
                raise serializers.ValidationError(error)
            
            RegisterSerializer.save(username=username)
            
            return Response({"message":"registered successfully", "user": RegisterSerializer.data}, status=201)
        
        return Response({'message': "Incomplete registration"}, status=400)

class ProductView(APIView):
    
    
    def get(self, request, *args, **kwargs):
        
        queryset = Product.objects.all()
        
        serializeProduct = ProductSerializer(queryset, many=True)
        return Response(serializeProduct.data)
        

class ProductDetailView(APIView):
    
    def get(self, request, id, *args, **kwargs):
        
            try:
                 obj = Product.objects.get(id=id)
                 serializeProduct = ProductSerializer(obj).data
                 return Response(serializeProduct)
             
            except Product.DoesNotExist:
                return Response({'message': "Product not found!"}, status=404)
    
    def put(self, request, id, *args, **kwargs):
        
        product = Product.objects.get(id=id)
        
        if request.data.get("update_item") == "plus":
            product.quantity +=1
        if request.data.get("update_item") == "minus":
            if product.quantity  > 1:
                product.quantity -=1
 
        product.save()
        serializer = ProductSerializer(product, partial=True)
        return Response({"data": serializer.data}, status=201)
            
    

            

class AddProductToCart(APIView):
    
    def post(self, request, *args, **kwargs):
        parser_classes = [MultiPartParser]
        validator = FileExtensionValidator(allowed_extensions=['jpg', 'png', 'jpeg'])
        
        # image_file = request.FILES["image"]
        user = User.objects.get(id=1)
        
        if not request.data.get('name'):
            return Response({'message':"Product name is required"})
        
        serializer = CartSerializer(data=request.data ,context={"request": request})
        if serializer.is_valid(raise_exception=True):
          
            serializer.save(user=user)
            return Response({'message':"Product added successfully to cart", "data":serializer.data}, status=201)
        return Response({'message':"Failed to add product to cart"}, status=400)
    
    # {
    #     "name": "product_add",
    #     "price": 99.99,
    #     "image": ""
    # }
    
class CartView(APIView):
    
    def get(self, request, *args, **kwargs):
        
        queryset = Cart.objects.all()
        
        serializer = CartSerializer(queryset, many=True)
        
        return Response(serializer.data, status=200)

class CartDetailView(APIView):
    
    def put(self, request, id, *args, **kwargs):
        
        cart = Cart.objects.get(id=id)
        
        if request.data.get("update_item") == "plus":
            cart.quantity +=1
        if request.data.get("update_item") == "minus":
            if cart.quantity  > 1:
                cart.quantity -=1
                
            else:
                cart.delete()
                return Response({"message": "Product removed from cart"}, status=204)
        
        cart.save()
        serializer = CartSerializer(cart, partial=True)
        return Response({"message": "Cart updated!", "data": serializer.data}, status=201)
    
    def delete(self, request, id, *args, **kwargs):
        
        cart = Cart.objects.get(id=id)
        cart.delete()
        return Response({"message": "Product deleted from cart"}, status=204)
    
    # {
    #     "update_item": "plus"
    # }
    
class TotalCartPrice(APIView):
    
    def get(self, request, *args, **kwargs):
        try:
            qs = Cart.objects.all()

            total_price = sum(item.price * item.quantity for item in qs)
            
            return Response({"total_price": total_price}, status=200)
        
        except Cart.DoesNotExist:
            return Response({"message": "No cart related"})
        
class DeleteCart(APIView):
    
    def delete(self, request, *args, **kwargs):
        
        try:
            qs = Cart.objects.all()
            qs.delete()
            return Response({"message": "No product in cart"}, status=204)
        except Cart.DoesNotExist:
            return Response({"message": "No cart related"})
