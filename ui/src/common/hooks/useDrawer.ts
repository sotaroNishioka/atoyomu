import { useContext } from 'react'
import { DrawerContext } from '../contexts/DrawerContext'

const useDrawer = () => useContext(DrawerContext)

export default useDrawer
