import { useState } from 'react'

function MessageInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message.trim()) return

    try {
      setError('')
      await onSendMessage(message.trim())
      setMessage('')
    } catch {
      setError('Message could not be sent. Please try again.')
    }
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

      {error && <p role="alert">{error}</p>}
    </form>
  )
}

export default MessageInput
