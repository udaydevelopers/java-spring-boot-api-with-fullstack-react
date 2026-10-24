
public class Employee {
    String name;
    double salary;

    // Constructor
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    // Display employee details
    public void display() {
        System.out.println("Name: " + name + ", Salary: " + salary);
    }
}
