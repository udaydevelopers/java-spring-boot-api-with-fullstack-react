import java.util.LinkedList;
import java.util.Queue;

public class Practice3 {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();

        queue.offer("Ravi");
        queue.offer("Priya");
        queue.offer("Amit");

        System.out.println(queue.poll());
        System.out.println(queue.peek());
        System.out.println(queue.size());
    }
}