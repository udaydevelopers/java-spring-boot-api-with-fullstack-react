import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class Main {
    public static void main(String[] args) {
        try {
            Files.writeString(
                Path.of("data.txt"),
                "\nSpring Boot",
                StandardOpenOption.CREATE,
                StandardOpenOption.APPEND
            );

            System.out.println("Data appended successfully");
        } catch (IOException e) {
            System.out.println("Unable to write file");
        }
    }
}