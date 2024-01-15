import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Button,
    CssBaseline,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ onNavbarButtonClick }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpenDrawer(open);
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    { isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={ toggleDrawer(true) }
                        >
                            <MenuIcon />
                        </IconButton>
                    ) }
                    <Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
                        Your Logo
                    </Typography>
                    { !isMobile && (
                        <>
                            <Button className="navbar-btn" color="inherit">Home</Button>
                            <Button onClick={ () => onNavbarButtonClick('Today') } className="navbar-btn" color="inherit">Today's Games</Button>
                            <Button onClick={ () => onNavbarButtonClick('Previous') } className="navbar-btn" color="inherit">Previous Games</Button>
                            <Button onClick={ () => onNavbarButtonClick('Future') } className="navbar-btn" color="inherit">Future Games</Button>
                            <Button className="navbar-btn" color="inherit">GitHub</Button>
                            <Button className="navbar-btn" color="inherit">Buy Me A Coffee</Button>
                        </>
                    ) }
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={ openDrawer }
                onClose={ toggleDrawer(false) }
                sx={ { width: '240px' } }
            >
                <List>
                    { ['Home', `Today's Games`, `Previous Games`, `Future Games`, `GitHub`, `Buy Me A Coffee`].map((text, index) => (
                        <ListItem button key={ text } onClick={ toggleDrawer(false) }>
                            <ListItemText primary={ text } />
                        </ListItem>
                    )) }
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;
