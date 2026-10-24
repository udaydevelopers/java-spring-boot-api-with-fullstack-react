
function Card({ title, children }) {
  return (
    <div className="employee-card">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export default Card
