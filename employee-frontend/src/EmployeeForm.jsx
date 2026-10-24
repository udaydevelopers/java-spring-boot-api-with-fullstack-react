
import Card from './Card'

function EmployeeForm({
  name,
  setName,
  salary,
  setSalary,
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
