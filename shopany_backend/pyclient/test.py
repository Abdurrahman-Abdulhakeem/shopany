import requests
from getpass import getpass

endpoint = 'http://localhost:8000/api/v1/'


email = input("Enter your email address: ")
password = getpass('Enter your password: ')

body = {
    'email': email,
    'password': password
}


response = requests.post(f"{endpoint}login/", data=body)

print(response.json(), response.status_code)

if response.status_code == 200:
    token = response.json()["access"]
    headers = {
        # 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': f"Bearer {token}"
    }
    new_response = requests.put(f"{endpoint}cart/{34}/", headers=headers , data= {'update_item': 'minus'})
    print(new_response.json(), new_response.status_code)