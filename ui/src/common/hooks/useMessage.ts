import { useContext } from 'react'
import { MessageContext } from '../contexts/MessageContext'

const useDrawer = () => useContext(MessageContext)

export default useDrawer
