import { useEffect, useState } from 'react'
import { listenToMessages } from '../services/chatService'

export const useMessages = (conversationId) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!conversationId) {
      return
    }


    const unsubscribe = listenToMessages(conversationId, (newMessages) => {
      setMessages(newMessages)
      setLoading(false)
    })

    return unsubscribe
  }, [conversationId])

  return { messages, loading }
}
