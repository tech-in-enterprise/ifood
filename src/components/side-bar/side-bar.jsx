import React, { useEffect } from 'react'
import { Box, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuItems, selectMenuItems } from '../../redux/slice/entities-slice'


export default function SideBar({ activeItem, onMenuItemClick }) {

  const dispatch = useDispatch()
  const menuItems = useSelector(selectMenuItems)

  
  useEffect(() => {
    dispatch(getMenuItems())
  }, [dispatch])

  const handleItemClick = (item) => {
    onMenuItemClick(item)
  }



  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', backgroundColor: '#1a2027', color: '#fff' }}} >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Ifood
          </Typography>
        </Toolbar>
        <List>
          {menuItems.map((item) => (
            <ListItem component="button" key={item.id} onClick={() => handleItemClick(item)}  sx={{ border: 'none', color: '#FFF', cursor:'pointer', backgroundColor: activeItem === item.name ? '#673ab7' : 'inherit', '&:hover': { backgroundColor: '#512da8' },}} >
              <ListItemText  primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

