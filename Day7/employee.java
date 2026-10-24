import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class employee {
    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/java_learning";
        String username = "root";
        String password = "Mpass@3394";

        String sql =
            "INSERT INTO employee (id, name, salary) VALUES (?, ?, ?)";

        try (Connection con =
                 DriverManager.getConnection(url, username, password);
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, 102);
            ps.setString(2, "Uday");
            ps.setDouble(3, 60000);

            int rows = ps.executeUpdate();

            System.out.println("Rows inserted: " + rows);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}