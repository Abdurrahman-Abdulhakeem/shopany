from django.shortcuts import render
from django.forms.models import model_to_dict

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly

from django.contrib.auth.hashers import check_password
from django.core.validators import FileExtensionValidator
from django.db.models import Q

from .models import *
from .serializers import *
from .permissions import *

import random
import re
# Create your views here.

class LoginView(APIView):
    permission_classes = (AllowAny,)
    
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
    permission_classes = (AllowAny,)
    
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

class UserDetailView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, *args, **kwargs):
        
        user = request.user
        
        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)
    
    def post(self, request, *args, **kwargs):
        validator = FileExtensionValidator(allowed_extensions=['jpg', 'png', 'jpeg'])
        
        image_file = request.FILES.get("image")
        if not image_file:
            return Response({"message": "Please provide an image file"}, status=400)
        try:
            validator(image_file)
        except:
            return Response({"message": "file must be an image file with extension 'jpg', 'jpeg', or 'png"}, status=400)
        user = request.user
        user.image = image_file
        user.save()
        serializer = UserSerializer(user)
        return Response({"message": "Profile picture saved successfully", "data": serializer.data}, status=200)
    

class PasswordChangeView(APIView):
    permission_classes = (IsAuthenticated, IsOwner)
    
    def post(self, request, *args, **kwargs):
        new_password = request.data.get('new_password')
        confirm_new_password = request.data.get('confirm_new_password')
        
        if not new_password:
            return Response({"message": "Please enter new password"}, status=400)
        if not confirm_new_password:
            return Response({"message": "Please confirm your new password"}, status=400)
        
        if not re.search(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', new_password):
            return Response({"message": "Password must contains at least 8 characters long one uppercase letter, one lowercase letter, one digit and one special character"}, status=400)
        if not new_password == confirm_new_password:
            return Response({"message": "New password must match confirm password"}, status=400)
        
        user = request.user
        
        paswd_check = check_password(new_password, user.password)
        if paswd_check:
            return Response({"message": "New password cannot be old password"}, status=400)
        
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password was successfully changed"}, status=200)
    
    
class CategoryView(APIView):
    
    def get(self, request, *args, **kwargs):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data, status=200)

class ProductView(APIView):
    permission_classes = (IsAuthenticated,)
    
    
    def get(self, request, *args, **kwargs):
        
        query = request.GET.get('query', None)
        category = request.query_params.get('category', None)
        
        if query is not None:
                queryset = Product.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
                recent_products = queryset.order_by('-created')[:5]
                best_selling = queryset.order_by('-rating')[:5]
                
                serialized_data = {
                    "data": ProductSerializer(queryset, many=True).data,
                    "recent_products": ProductSerializer(recent_products, many=True).data,
                    "best_selling": ProductSerializer(best_selling, many=True).data
                }
                return Response(serialized_data)

        
        if category is not None:
            queryset = Product.objects.filter(category__name__icontains=category)
            serializeProduct = ProductSerializer(queryset, many=True)
            return Response({"data": serializeProduct.data, "category": category} )
        
        queryset = Product.objects.all()
        
        recent_products = queryset.order_by('-created')[:5]
        best_selling = queryset.order_by('-rating')[:5]
        
        serialized_data = {
            "data": ProductSerializer(queryset, many=True).data,
            "recent_products": ProductSerializer(recent_products, many=True).data,
            "best_selling": ProductSerializer(best_selling, many=True).data
        }
        
        serializeProduct = ProductSerializer(queryset, many=True)
        return Response(serialized_data)
    

    

class ProductDetailView(APIView):
    permission_classes = (IsAuthenticated,)
    
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
        return Response({"data": serializer.data, "method": request.data.get("update_item")}, status=201)
            
    

            

class AddProductToCart(APIView):
    permission_classes = (IsAuthenticated, )
    
    def post(self, request, *args, **kwargs):
     
        product_id = request.data.get("product_id")
        product = Product.objects.get(id=product_id)
        if Cart.objects.filter(user=request.user).filter(product=product).exists():
            return Response({"message": "Product already in your cart", "product_id": product_id}, status=400)
            
  
        data = {
            "product": product_id,
             "name": product.name,
             "image": product.image,
             "description": product.description,
             "quantity": request.data.get("quantity"),
             "price": product.price,
             "rating": product.rating
        }
        
        serializer = CartSerializer(data=data ,context={"request": request})
        if serializer.is_valid(raise_exception=True):
          
            serializer.save(user=request.user)
            return Response({'message':"Product added successfully to cart", "data":serializer.data, "product_id": product_id}, status=201)
        return Response({'message':"Failed to add product to cart"}, status=400)
  
    
class CartView(APIView):
    permission_classes = (IsAuthenticated, IsOwner)
    
    def get(self, request, *args, **kwargs):
        
        queryset = request.user.cart_set.all()
        
        serializer = CartSerializer(queryset, many=True)
        
        return Response(serializer.data, status=200)

class CartDetailView(APIView):
    permission_classes = (IsAuthenticated, IsOwner)
    def put(self, request, id, *args, **kwargs):
        
        try :
            cart = Cart.objects.get(id=id)
            
            if request.data.get("update_item") == "plus":
                cart.quantity +=1
            if request.data.get("update_item") == "minus":
                if cart.quantity  > 1:
                    cart.quantity -=1
                    
                else:
                    cart.delete()
                    return Response({"message": "Product removed from cart", "id": id}, status=200)
            
            cart.save()
            serializer = CartSerializer(cart, partial=True)
            return Response({"message": "Cart updated!", "method":request.data.get("update_item"), "id": id, "data": serializer.data}, status=200)
        
        except Cart.DoesNotExist:
            return Response({"message": "No cart exists!"}, status=404)
        
    def delete(self, request, id, *args, **kwargs):
        
        try :
            cart = Cart.objects.get(id=id)
            cart.delete()
            return Response({"message": "Product deleted from cart", "id": id}, status=200)
        except Cart.DoesNotExist:
            return Response({"message": "No cart exists!"}, status=404)
  
    
class TotalCartPrice(APIView):
    permission_classes = (IsAuthenticated, )
    
    def get(self, request, *args, **kwargs):
        try:
            qs = Cart.objects.filter(user=request.user)

            total_price = sum(item.price * item.quantity for item in qs)
            
            return Response({"total_price": total_price}, status=200)
        
        except Cart.DoesNotExist:
            return Response({"message": "No cart related"}, status=404)
        
class DeleteCart(APIView):
    permission_classes = (IsAuthenticated, IsOwner)
    
    def delete(self, request, *args, **kwargs):
        
        try:
            qs = request.user.cart_set.all()
            qs.delete()
            return Response({"message": "No product in cart"}, status=200)
        except Cart.DoesNotExist:
            return Response({"message": "No cart related"}, status=404)
