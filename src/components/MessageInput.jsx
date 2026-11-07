import { useState } from 'react'

function MessageInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!message.trim()) return

    onSendMessage(message.trim())
    setMessage('')
  }

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        maxLength={1000}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
      />

      <button type="submit" disabled={disabled || !message.trim()}>
        Send
      </button>
    </form>
  )
}

export default MessageInput
