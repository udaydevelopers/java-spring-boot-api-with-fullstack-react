
class Employee {
    String name;
    int salary;

    // Constructor
    Employee(String employeeName, int employeeSalary) {
        name = employeeName;
        salary = employeeSalary;
    }

    void display() {
        System.out.println("Name: " + name);
        System.out.println("Salary: " + salary);
    }
}

public class Exercise2 {
    public static void main(String[] args) {
        Employee emp = new Employee("Rahul", 50000);
        emp.display();
    }
}
