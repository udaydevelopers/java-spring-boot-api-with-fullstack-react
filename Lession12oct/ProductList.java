class error: Class names, 'ProductList', are only accepted if annotation processing is explicitly requested
1 error{
    String name;
    int price;

    // constructor
    Product(String ProductName, int ProductPrice){
        name = ProductName;
        price = ProductPrice;
    }

    void display(){
        System.out.println("Product Name: " + name);
        System.out.println("Product Price: " + price);
    }
}

public class ProductList{
    public static void main(String[] args) {
        Product p1 = new Product("Laptop", 85000);
        p1.display();
    }
}