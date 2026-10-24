
package com.example.employee_api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class EmployeeRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @Positive(message = "Salary must be greater than zero")
    private double salary;

    public EmployeeRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}
