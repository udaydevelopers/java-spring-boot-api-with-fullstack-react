
class Car {
    String brand;

    void showBrand() {
        System.out.println(brand);
    }
}

public class Exercise1 {
    public static void main(String[] args) {
        Car c1 = new Car();
        Car c2 = new Car();

        c1.brand = "Honda";
        c2.brand = "Toyota";

        c1.showBrand();
        c2.showBrand();
    }
}
