
import { useState, useRef, useEffect } from 'react'
import './App.css'
import EmployeeForm from './EmployeeForm'
import EmployeeList from './EmployeeList'

function App() {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [departmentId, setDepartmentId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [salary, setSalary] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const loadingRef = useRef(false)

  // Load employees and departments when the component mounts
  useEffect(() => {
    loadEmployees()
    loadDepartments()
  }, [])

  // Load all employees
  const loadEmployees = async () => {
    if (loadingRef.current) {
      return
    }

    loadingRef.current = true
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        'http://localhost:8080/api/employees'
      )

      if (!response.ok) {
        throw new Error('Failed to load employees')
      }

      const data = await response.json()
      setEmployees(data)
    } catch (err) {
      setError(err.message)
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }

  // Load all departments
  const loadDepartments = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/departments'
      )

      if (!response.ok) {
        throw new Error('Failed to load departments')
      }

      const data = await response.json()
      setDepartments(data)
    } catch (err) {
      setError(err.message)
    }
  }

  // Create employee
  const createEmployee = async () => {
    if (!name.trim() || !salary || Number(salary) <= 0) {
      alert('Please enter a valid name and salary.')
      return
    }

    if (!departmentId) {
      alert('Please select a department.')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:8080/api/employees',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.trim(),
            salary: Number(salary),
            departmentId: Number(departmentId)
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to create employee')
      }

      await loadEmployees()

      setName('')
      setSalary('')
      setDepartmentId('')
      setSelectedEmployee(null)
      setError('')

      alert('Employee created successfully!')
    } catch (err) {
      setError(err.message)
    }
  }

  // Update employee
  const updateEmployee = async () => {
    if (!selectedEmployee) {
      return
    }

    if (!name.trim() || !salary || Number(salary) <= 0) {
      alert('Please enter a valid name and salary.')
      return
    }

    if (!departmentId) {
      alert('Please select a department.')
      return
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/employees/${selectedEmployee.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.trim(),
            salary: Number(salary),
            departmentId: Number(departmentId)
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update employee')
      }

      await loadEmployees()

      setSelectedEmployee(null)
      setName('')
      setSalary('')
      setDepartmentId('')
      setError('')

      alert('Employee updated successfully!')
    } catch (err) {
      setError(err.message)
    }
  }

  // Delete employee
  const deleteEmployee = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this employee?'
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/employees/${id}`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete employee')
      }

      await loadEmployees()
      setError('')

      alert('Employee deleted successfully!')
    } catch (err) {
      setError(err.message)
    }
  }

  // Select employee for updating
  const handleUpdate = (employee) => {
    setSelectedEmployee(employee)
    setName(employee.name)
    setSalary(String(employee.salary))
    setDepartmentId(
      employee.department
        ? String(employee.department.id)
        : ''
    )
    setError('')
  }

  // Cancel update
  const cancelUpdate = () => {
    setSelectedEmployee(null)
    setName('')
    setSalary('')
    setDepartmentId('')
    setError('')
  }

  return (
    <div className="app-container">
      <h1>Employee Management</h1>

      <button
        onClick={loadEmployees}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load Employees'}
      </button>

      <button
        onClick={loadEmployees}
        disabled={loading}
      >
        Refresh Employees
      </button>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {/* Employee list component */}
      <EmployeeList
        employees={employees}
        loading={loading}
        error={error}
        onUpdate={handleUpdate}
        onDelete={deleteEmployee}
      />

      {/* Employee form component */}
      <EmployeeForm
        name={name}
        setName={setName}
        salary={salary}
        setSalary={setSalary}
        departments={departments}
        departmentId={departmentId}
        setDepartmentId={setDepartmentId}
        selectedEmployee={selectedEmployee}
        onCreate={createEmployee}
        onUpdate={updateEmployee}
        onCancel={cancelUpdate}
      />
    </div>
  )
}

export default App
