import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ButtonGroup,
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

    const handleHomeButtonClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        <div className="navbar-logo"> <img src={ require("../assets/NHL-Logo-500x333.png") } alt="nhl-logo" height="70" width="90" />
                            <p>NHL Season Schedule</p>
                        </div>

                    </Typography>
                    { !isMobile && (
                        <ButtonGroup variant="text" color="inherit">
                            <Button onClick={ handleHomeButtonClick }>Home</Button>
                            <Button onClick={ () => onNavbarButtonClick('Today') }>Today's Games</Button>
                            <Button onClick={ () => onNavbarButtonClick('Previous') }>Previous Games</Button>
                            <Button onClick={ () => onNavbarButtonClick('Future') }>Future Games</Button>
                            <Button component="a" href="https://github.com/jon424/nhl" target="_blank" rel="noopener noreferrer">GitHub</Button>
                            <Button component="a" href="https://www.buymeacoffee.com/jonathanja7" target="_blank" rel="noopener noreferrer">Buy Me A Coffee</Button>
                        </ButtonGroup>
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
                    <ListItem onClick={ handleHomeButtonClick }>Home</ListItem>
                    <ListItem onClick={ () => onNavbarButtonClick('Today') }>Today's Games</ListItem>
                    <ListItem onClick={ () => onNavbarButtonClick('Previous') }>Previous Games</ListItem>
                    <ListItem onClick={ () => onNavbarButtonClick('Future') }>Future Games</ListItem>
                    <hr className="divider" />
                    <ListItem component="a" href="https://github.com/jon424/nhl" target="_blank" rel="noopener noreferrer">GitHub</ListItem>
                    <ListItem component="a" href="https://www.buymeacoffee.com/jonathanja7" target="_blank" rel="noopener noreferrer">Buy Me A Coffee</ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;
