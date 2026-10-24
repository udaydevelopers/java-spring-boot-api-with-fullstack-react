import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class dbtest {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:mysql://localhost:3306/java_learning";
        String username = "root";
        String password = "Mpass@3394";

        Connection connection =
            DriverManager.getConnection(url, username, password);

        System.out.println("Database connected!");
        connection.close();
    }
}