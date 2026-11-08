function MessageList({ messages, currentUserId, selectedUser }) {
  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <p>No messages yet. Start a conversation!</p>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={
              message.senderId === currentUserId
                ? 'message sent'
                : 'message received'
            }
          >
            <small>
              {message.senderId === currentUserId
                ? 'You'
                : selectedUser.displayName}
            </small>

            <p>{message.text}</p>

            <small>
              {message.createdAt?.toDate
                ? message.createdAt.toDate().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Sending...'}
            </small>
          </div>
        ))
      )}
    </div>
  )
}

export default MessageList
