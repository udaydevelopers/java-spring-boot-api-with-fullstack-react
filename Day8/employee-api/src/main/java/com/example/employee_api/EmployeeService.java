
package com.example.employee_api;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;
    private final DepartmentRepository departmentRepository;

    public EmployeeService(
            EmployeeRepository repository,
            DepartmentRepository departmentRepository) {
        this.repository = repository;
        this.departmentRepository = departmentRepository;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee createEmployee(EmployeeRequest request) {
        Employee employee = new Employee();
        employee.setName(request.getName());
        employee.setSalary(request.getSalary());

        if (request.getDepartmentId() != null) {
            Department department = departmentRepository
                    .findById(request.getDepartmentId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Department not found with id: "
                                            + request.getDepartmentId()));

            employee.setDepartment(department);
        }

        return repository.save(employee);
    }

    public Employee updateEmployee(
            Integer id, EmployeeRequest request) {

        Employee employee = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: " + id));

        employee.setName(request.getName());
        employee.setSalary(request.getSalary());

        if (request.getDepartmentId() != null) {
            Department department = departmentRepository
                    .findById(request.getDepartmentId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Department not found with id: "
                                            + request.getDepartmentId()));

            employee.setDepartment(department);
        }

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
