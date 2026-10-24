
function EmployeeRow({ employee, onUpdate, onDelete }) {
  return (
    <li>
      <span>
        {employee.name} - ₹{employee.salary}
      </span>

      <div>
        <button
          className="update-btn"
          onClick={() => onUpdate(employee)}
        >
          Update
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(employee.id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default EmployeeRow
