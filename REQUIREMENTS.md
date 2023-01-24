# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Create [token required]
    -HTTP method: "POST"
    -Endpoint: "/product"
    -Request body: JSON
        {
            name:"",
            description:"",
            price:"",
        }
    -Headers:
        x-auth-token = user's token
    -Response body:JSON
        {
            message: 'New product created successfully!',
            data:{
                "id": "products's ID",
                "name": "product's name",
                "description": "product's description",
                "price": "product's price",
            },
        }

- Get All Products
    -HTTP method: "GET"
    -Endpoint: "/product/all"
    -Request body: NULL
    -Response body:JSON
        {
            data:[{
                "id": "first product's ID",
                "name": "first product's name",
                "description":"first product's description",
                "lastname":"first product's lastname",
            },{
                "id": "second product's ID",
                "name": "second product's name",
                "description":"second product's description",
                "price":"second product's price",
            }],
        }

- Get one Product
    -HTTP method: "GET"
    -Endpoint: "/product/:id" *id = product's ID* in the params
    -Request body: NULL
    -Response body:JSON
        {
            data:{
                "id": "first product's ID",
                "name": "first product's name",
                "description":"first product's description",
                "lastname":"first product's lastname",
        }
- Update a product [token required]
    -HTTP method: "PUT"
    -Endpoint: "/product/update"
    -Request body: JSON
        {
            name?:"",
            description?:"",
            price?:"",
        }
    -Headers:
        x-auth-token = user's token
    -Response body:JSON
        {
            message: 'This product has been updated successfully!',
            data:{
                "id": "products's ID",
                "name": "product's name",
                "description": "product's description",
                "price": "product's price",
            },
        }

- Delete a product [token required]
    -HTTP method: "DELETE"
    -Endpoint: "/product/delete/:id" *id = product's ID* in the params
    -Request body: NULL
    -Headers:
        x-auth-token = user's token
    -Response body:JSON
        {
            message: 'This product has been deleted successfully!',
            data:{
                "id": "products's ID",
                "name": "product's name",
            },
        }

#### Users
- Create
    -HTTP method: "POST"
    -Endpoint: "/user"
    -Request body: JSON
        {
            email:"",
            firstname:"",
            lastname:"",
            password:""
        }
    -Response body:JSON
        {
            message: 'New user created successfully!',
            data:{
                "id": "user's ID",
                "email": "user's email"
            },
            token: "user's token"
        }

- Show [token required]
    -HTTP method: "GET"
    -Endpoint: "/user/me"
    -Request body: null
    -Headers:
        x-auth-token = user's token    
    -Response body:JSON
        {
            data:{
                "id": "708ef4c2-0209-4b86-aec4-ecc4321be801",
                "email": "user's email",
                "firstname":"user's firstname",
                "lastname":"user's lastname",
            },
        }

- Update [token required]
    -HTTP method: "PUT"
    -Endpoint: "/user/update"
    -Request body: JSON
        {
            email?:"",
            firstname?:"",
            lastname?:"",
            password?:""
        }
    -Headers:
        x-auth-token = user's token
    -Response body:JSON
        {
            message: 'This user has been updated successfully!',
            data:{
                "email": "user's email",
                "firstname":"user's firstname",
                "lastname":"user's lastname",
            },
        }

- Delete [token required]
    -HTTP method: "DELETE"
    -Endpoint: "/user/delete"
    -Request body: null
    -Headers:
        x-auth-token = user's token    
    -Response body:JSON
        {
            message: 'This user has been deleted successfully!',
            data:{
                "id": "708ef4c2-0209-4b86-aec4-ecc4321be801",
                "email": "user's email"
            },
        }

#### Orders
- Create [token required]
    -HTTP method: "POST"
    -Endpoint: "/order/newOrder"
    -Request body: JSON
        {
            "products":[{
                "id":"first product's ID",
                "quantity":"first product's quantity"
                },
                {"id":"second product's ID",
                "quantity":"second product's quantity"
            }]
        }
    -Headers:
        x-auth-token = user's token
    -Response body:JSON
        {
            message: 'New order created successfully!',
            data:{
                "id": "order's ID",
                "status": "order's status"
            },
        }

- Current Order by user (args: user id)[token required]
    -HTTP method: "GET"
    -Endpoint: "/order/:id" *id = order's ID* in the params
    -Request body: NULL
    -Headers:
        x-auth-token = user's token
    -Response body:JSON
        {
            data:[
                {
                "id": "order_products's ID",
                "user_id": "order's userId",
                "product_id":"first product's ID",
                "quantity":"first product's quantity",
                "order_id":"order's ID",
                },
                {
                "id": "order_products's ID",
                "user_id": "order's userId",
                "product_id":"second product's ID",
                "quantity":"second product's quantity",
                "order_id":"order's ID",
                },
            ]
        }

- Delete Order(args: user id)[token required]
    -HTTP method: "DELETE"
    -Endpoint: "/order/delete/:id" *id = order's ID* in the params
    -Request body: NULL
    -Headers:
        x-auth-token = user's token
    -Response body:JSON
        {
            message:"This order has been deleted successfully!",
            data:{
                id:"order's ID",
                status:"order's status"
            }
        }

## Data Shapes
#### Product
-   id: string;
-   name: string;
-   description: string;
-   price: number;
-   user_id: string;

#### User
-   id?: string;
-   email?: string;
-   firstname: string;
-   lastname: string;
-   password: string;

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

#### Order_Products
-   id?: string;
-   order_id: string;
-   product_id: string;
-   quantity: number;

## Data Schema
#### Product
CREATE TABLE products(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) CHECK (price > 0),
    description VARCHAR(20) NOT NULL,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

#### User
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(50),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

#### Orders
CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(8) DEFAULT 'active' NOT NULL,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

#### Order_Products
CREATE TABLE order_products(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);