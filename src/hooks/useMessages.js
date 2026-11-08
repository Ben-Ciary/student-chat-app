import { useEffect, useState } from 'react'
import { listenToMessages } from '../services/chatService'

export const useMessages = (conversationId) => {
  const [state, setState] = useState({
    conversationId: null,
    messages: [],
    loading: false,
    error: '',
  })

  useEffect(() => {
    if (!conversationId) return

    const unsubscribe = listenToMessages(
      conversationId,
      (newMessages) => {
        setState({
          conversationId,
          messages: newMessages,
          loading: false,
          error: '',
        })
      },
      (listenerError) => {
        console.error('Error loading messages:', listenerError)
        setState({
          conversationId,
          messages: [],
          loading: false,
          error: 'Could not load messages. Please try again.',
        })
      }
    )

    return unsubscribe
  }, [conversationId])

  if (!conversationId) {
    return { messages: [], loading: false, error: '' }
  }

  if (state.conversationId !== conversationId) {
    return { messages: [], loading: true, error: '' }
  }

  return {
    messages: state.messages,
    loading: state.loading,
    error: state.error,
  }
}
