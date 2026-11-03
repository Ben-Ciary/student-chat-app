function UserList({ users, selectedUser, onSelectUser }) {
  return (
    <div className="user-list">
      <h2>Students</h2>

      {users.length === 0 ? (
        <p>No students found.</p>
      ) : (
        users.map((user) => (
          <button
            key={user.uid}
            className={selectedUser?.uid === user.uid ? 'selected-user' : ''}
            onClick={() => onSelectUser(user)}
          >
            {user.displayName}
          </button>
        ))
      )}
    </div>
  )
}

export default UserList
