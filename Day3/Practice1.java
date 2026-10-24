
import java.util.ArrayList;

public class Practice1 {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();

        fruits.add("Apple");
        fruits.add("Mango");
        fruits.add("Banana");

        System.out.println(fruits);
        System.out.println(fruits.get(1));

        fruits.remove("Apple");

        System.out.println(fruits);
        System.out.println("Size: " + fruits.size());
    }
}
