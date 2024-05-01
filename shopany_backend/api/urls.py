from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('register/', RegisterUserView.as_view()),
    
    path('products/', ProductView.as_view()),
    path('product/<int:id>/', ProductDetailView.as_view()),
    
    path('addcart/', AddProductToCart.as_view()),
    path('carts/', CartView.as_view()),
    path('cart/<int:id>/', CartDetailView.as_view()),
    path('carts/delete/', DeleteCart.as_view()),
    path('carts/totalprice/', TotalCartPrice.as_view()),
]
