import java.util.HashSet;

public class Practice2 {
    public static void main(String[] args) {
        HashSet<String> fruits = new HashSet<>();

        fruits.add("Apple");
        fruits.add("Mango");
        fruits.add("Apple");

        System.out.println(fruits.size());
        System.out.println(fruits.contains("Mango"));
    }
}