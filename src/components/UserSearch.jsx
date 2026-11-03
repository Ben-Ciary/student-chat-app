function UserSearch({ searchTerm, onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search students..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}

export default UserSearch
