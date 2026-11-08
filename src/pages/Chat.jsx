import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

import { getOrCreateConversation, sendMessage } from '../services/chatService'
import { useMessages } from '../hooks/useMessages'

import Navbar from '../components/Navbar'
import UserList from '../components/UserList'
import UserSearch from '../components/UserSearch'
import ChatWindow from '../components/ChatWindow'

function Chat({ currentUser, onSignOut }) {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [conversationId, setConversationId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const { messages, loading: messagesLoading } = useMessages(conversationId)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        
        const studentUsers = snapshot.docs
          .map((document) => document.data())
          .filter((user) => user.uid !== currentUser.uid)

        
        setUsers(studentUsers)
        setLoading(false)
      },
      (error) => {
        console.error('Error loading students:', error)
        setLoading(false)
      }
    )

    return unsubscribe
  }, [currentUser.uid])

  const handleSelectUser = async (user) => {
    setSelectedUser(user)
    setConversationId(null)

    try {
      const id = await getOrCreateConversation(currentUser.uid, user.uid)
      setConversationId(id)
    } catch (error) {
      console.error('Could not open conversation:', error)
    }
  }

  const handleSendMessage = async (text) => {
    if (!conversationId) return

    try {
      await sendMessage(conversationId, currentUser.uid, text)
    } catch (error) {
      console.error('Could not send message:', error)
      throw error
    }
  }

  const filteredUsers = users.filter((user) =>
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="chat-page">
      <Navbar currentUser={currentUser} onSignOut={onSignOut} />

      <div className="chat-layout">
        <aside className="sidebar">
          <UserSearch
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />

          {loading ? (
            <p>Loading students...</p>
          ) : (
            <UserList
              users={filteredUsers}
              selectedUser={selectedUser}
              onSelectUser={handleSelectUser}
            />
          )}
        </aside>

        {selectedUser ? (
          messagesLoading ? (
            <div className="chat-window">
              <p>Loading messages...</p>
            </div>
          ) : (
            <ChatWindow
              selectedUser={selectedUser}
              messages={messages}
              currentUserId={currentUser.uid}
              onSendMessage={handleSendMessage}
            />
          )
        ) : (
          <div className="chat-window">
            <p>
              {loading
                ? 'Loading students...'
                : 'Select a student to start chatting.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat
