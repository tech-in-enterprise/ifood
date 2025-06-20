import { AppBar, Avatar, TextField, Toolbar } from '@mui/material'
import { Search } from '@mui/icons-material'


export default function SuperiorBar() {
    return (
        < AppBar position="static" sx={{ backgroundColor: '#fff', color: '#000', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
            <Toolbar>
                <TextField variant="outlined" placeholder="Pesquisar..." size="small" sx={{ marginRight: 2, flexGrow: 1 }}
                    InputProps={{
                        startAdornment: <Search sx={{ marginRight: 1 }} />,
                        style: { backgroundColor: '#f1f3f4', borderRadius: 8 },
                    }}
                />
                <Avatar alt="Profile" src="https://via.placeholder.com/40" />
            </Toolbar>
        </AppBar >
    )
}
