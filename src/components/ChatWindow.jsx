import MessageList from './MessageList'
import MessageInput from './MessageInput'

function ChatWindow({ selectedUser, messages, currentUserId, onSendMessage }) {
  if (!selectedUser) {
    return (
      <div className="chat-window">
        <p>Select a student to start chatting.</p>
      </div>
    )
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{selectedUser.displayName}</h2>
      </div>

      <MessageList
        messages={messages}
        currentUserId={currentUserId}
      />

      <MessageInput onSendMessage={onSendMessage} />
    </div>
  )
}

export default ChatWindow
