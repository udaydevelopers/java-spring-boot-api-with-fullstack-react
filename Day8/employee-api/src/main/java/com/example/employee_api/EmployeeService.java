
package com.example.employee_api;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee createEmployee(EmployeeRequest request) {
        Employee employee = new Employee();
        employee.setName(request.getName());
        employee.setSalary(request.getSalary());

        return repository.save(employee);
    }

    public Employee updateEmployee(
            Integer id, EmployeeRequest request) {

        Employee employee = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found with id: " + id));

        employee.setName(request.getName());
        employee.setSalary(request.getSalary());

        return repository.save(employee);
    }

    
    public void deleteEmployee(Integer id) {
        Employee employee = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: " + id));

        repository.delete(employee);
    }

}
