import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import React from 'react'
import useStyles from './styles';
import logo from '../../assets/commerce.png'
import { Link, useLocation } from 'react-router-dom';
const Navbar = ({totelItems}) => {
    const classes = useStyles()
    // hook to know the current path 
    const location = useLocation();
    return (
        <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> Commerce.js
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && (
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totelItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          )}
        </Toolbar>
        </AppBar>
        
      </>
    )
}

export default Navbar
