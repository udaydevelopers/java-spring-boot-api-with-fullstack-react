
import Card from './Card'

function EmployeeForm({
  name,
  setName,
  salary,
  setSalary,
  departments,
  departmentId,
  setDepartmentId,
  selectedEmployee,
  onCreate,
  onUpdate,
  onCancel
}) {
  const handleSubmit = (event) => {
    event.preventDefault()

    if (selectedEmployee) {
      onUpdate()
    } else {
      onCreate()
    }
  }

  return (
    <Card
      title={selectedEmployee ? 'Update Employee' : 'Add Employee'}
    >
      {selectedEmployee && (
        <p>Selected Employee ID: {selectedEmployee.id}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter employee name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Enter employee salary"
          value={salary}
          onChange={(event) => setSalary(event.target.value)}
          required
          min="0.01"
          step="any"
        />

        <select
          value={departmentId}
          onChange={(event) => setDepartmentId(event.target.value)}
          required
        >
          <option value="">Select Department</option>

         {(departments ?? []).map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className={selectedEmployee ? 'update-btn' : ''}
        >
          {selectedEmployee ? 'Update Employee' : 'Create Employee'}
        </button>

        {selectedEmployee && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </Card>
  )
}

export default EmployeeForm
