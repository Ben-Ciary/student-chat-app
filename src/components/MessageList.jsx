function MessageList({ messages, currentUserId }) {
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
            <p>{message.text}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default MessageList
