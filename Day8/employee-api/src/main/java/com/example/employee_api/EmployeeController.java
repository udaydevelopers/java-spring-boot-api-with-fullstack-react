
package com.example.employee_api;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return service.getAllEmployees();
    }

    
    @PostMapping
    public ResponseEntity<Employee> createEmployee(
            @Valid @RequestBody EmployeeRequest request) {

        Employee employee = service.createEmployee(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(employee);
    }


    @PutMapping("/{id}")
    public Employee updateEmployee(
            @PathVariable Integer id,
            @Valid @RequestBody EmployeeRequest request) {
        return service.updateEmployee(id, request);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable Integer id) {

        service.deleteEmployee(id);

        return ResponseEntity.noContent().build();
    }

}
