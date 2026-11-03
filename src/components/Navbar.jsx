function Navbar({ currentUser, onSignOut }) {
  return (
    <nav className="navbar">
      <h2>Student Chat</h2>

      <div>
        <span>{currentUser?.displayName}</span>
        <button onClick={onSignOut}>Sign Out</button>
      </div>
    </nav>
  )
}

export default Navbar
