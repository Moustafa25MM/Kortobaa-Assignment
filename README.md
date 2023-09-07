# Kortobaa application Server

## Installation

```bash
npm i
```

## Usage

```python
1. create a .env file in the root directory and add the following as an example:
PORT=4000
JWT_SECRET="Kortobaa"

MYSQL_PORT=3306
MYSQL_DB="kortobaa"
MYSQL_USERNAME="root"
MYSQL_PASSWORD="root"

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

2. npm run dev -> to run the server
3. npm test -> to run tests

```

## How to use

### Create User

```python
1. endpoint = http://localhost:4000/api/create   "Or any port of your choice"
2. Provide the following example json in the body :
{
    "username":"username",
    "password":"password",
    "email":"user@gmail.com"

}
It will return an object like this:
{
    "id": 122,
    "username": "username",
    "password": "$2b$10$ggGvEXbQL1/E0CWu.B46teQldGYVk8KCxuK.jwkiHQ3RCAUf.FEp6",
    "email": "user@gmail.com",
    "updatedAt": "2023-09-07T08:33:03.213Z",
    "createdAt": "2023-09-07T08:33:03.213Z"
}

```

### Login

```python
1. endpoint =   http://localhost:4000/api/login   "Or any port of your choice"

2. Provide the following example json in the body :
{
    "email":"user@gmail.com",
    "password":"password"
}

It will return an object like this:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyLCJpYXQiOjE2OTQwNzU2NDcsImV4cCI6MTY5NDY4MDQ0N30.jcCf4j_kfHADN5YiBMssvKKPxcr8PWsFGPfmNyM-Ngk",
    "user": {
        "id": 122,
        "username": "username",
        "email": "user@gmail.com"
    }
}
```

### get User By Id

```python
1. endpoint =  http://localhost:4000/api/user/122/   "Or any port of your choice"

2. Provide the following example form-data in the body :

title: my first product
price: 99.9
image : image.url

It will return an object like this:

{
    "id": 24,
    "title": "my first product",
    "image": "http://res.cloudinary.com/das9oh9bs/image/upload/v1694048201/function%20now%28%29%20%7B%20%5Bnative%20code%5D%20%7D.png",
    "price": "99.9",
    "userId": 122,
    "updatedAt": "2023-09-07T08:34:47.191Z",
    "createdAt": "2023-09-07T08:34:47.191Z"
}
```

### Get Product BY Id

```python
1. endpoint =   http://localhost:4000/product/24   "Or any port of your choice"
2. you provide an Authorization token in the headers

It will return an object like this:

{
    "id": 24,
    "title": "my first product",
    "image": "http://res.cloudinary.com/das9oh9bs/image/upload/v1694048201/function%20now%28%29%20%7B%20%5Bnative%20code%5D%20%7D.png",
    "price": 99.9,
    "userId": 122,
    "createdAt": "2023-09-07T08:34:47.000Z",
    "updatedAt": "2023-09-07T08:34:47.000Z"
}
```

### update Product

```python
1. endpoint =   http://localhost:4000/product/update/24   "Or any port of your choice"
2. you provide an Authorization token in the headers

3. Provide the following example form-data in the body :

title : updated


It will return an object like this:

{
    "id": 24,
    "title": "updated ",
    "image": "http://res.cloudinary.com/das9oh9bs/image/upload/v1694048201/function%20now%28%29%20%7B%20%5Bnative%20code%5D%20%7D.png",
    "price": 99.9,
    "userId": 122,
    "createdAt": "2023-09-07T08:34:47.000Z",
    "updatedAt": "2023-09-07T08:36:09.642Z"
}
```

### delete Product

```python
1. endpoint =   http://localhost:4000/product/delete/24   "Or any port of your choice"
2. you provide an Authorization token in the headers


It will return an object like this:

{
    "message": "Product deleted successfully"
}
```

### Get User Products

```python
1. endpoint =    http://localhost:4000/product/user/products   "Or any port of your choice"
2. you provide an Authorization token in the headers

It will return an object like this:
{
    "pagination": {
        "totalDocs": 1,
        "limit": 5,
        "totalPages": 1,
        "page": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    },
    "employees": [
        {
            "id": 24,
            "title": "updated ",
            "image": "http://res.cloudinary.com/das9oh9bs/image/upload/v1694048201/function%20now%28%29%20%7B%20%5Bnative%20code%5D%20%7D.png",
            "price": 99.9,
            "userId": 122,
            "createdAt": "2023-09-07T08:34:47.000Z",
            "updatedAt": "2023-09-07T08:36:09.000Z"
        }
    ]
}
```
