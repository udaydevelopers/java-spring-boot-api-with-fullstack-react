
import { useState, useRef, useEffect  } from 'react'
import './App.css'
import EmployeeForm from './EmployeeForm'
import EmployeeList from './EmployeeList'

function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [salary, setSalary] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const loadingRef = useRef(false)

  // Load all employees
useEffect(() => {
  loadEmployees()
}, [])

const loadEmployees = async () => {
  // Prevent another request if one is already running
  if (loadingRef.current) {
    return
  }

  // Lock immediately, before React re-renders
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
    // Always release the lock
    loadingRef.current = false
    setLoading(false)
  }
}

  // Create employee
  const createEmployee = async () => {
    if (!name.trim() || !salary || Number(salary) <= 0) {
      alert('Please enter a valid name and salary.')
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
            salary: Number(salary)
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to create employee')
      }

      await loadEmployees()

      setName('')
      setSalary('')
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
            salary: Number(salary)
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
    setError('')
  }

  // Cancel update
  const cancelUpdate = () => {
    setSelectedEmployee(null)
    setName('')
    setSalary('')
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
        selectedEmployee={selectedEmployee}
        onCreate={createEmployee}
        onUpdate={updateEmployee}
        onCancel={cancelUpdate}
      />
    </div>
  )
}

export default App
