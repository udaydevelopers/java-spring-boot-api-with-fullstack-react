
import EmployeeRow from './EmployeeRow'
import Card from './Card'

function EmployeeList({
  employees,
  loading,
  error,
  onUpdate,
  onDelete
}) {
  return (
    <Card title="Employee List">
      <p>Total Employees: {employees.length}</p>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {loading ? (
        <p>Loading employees...</p>
      ) : employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <>
          <p>Here are your registered employees.</p>

          <ul>
            {employees.map((employee) => (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </>
      )}
    </Card>
  )
}

export default EmployeeList
