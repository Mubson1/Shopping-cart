import {Container, Nav, Button, Navbar as NavbarBs} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';

export function Navbar() {
	const {openCart, cartQuantity} = useShoppingCart()
	return (
		<>
			<NavbarBs sticky='top' className='bg-white shadow-sm mb-3'>
				<Container>
					{/* Nav is a tag from bootstrap that would design the links accordingly */}
					<Nav className='me-auto'> {/* me-auto will adjust the margin at the right so that the nav component will be pushed to the left as far as possible */}
						{/* Nav.Link is part of bootstrap nav tag - NavLink is for visiting links. So, this is how we can incorporate bootstrap tags with react using 'as' */}
						<Nav.Link as={NavLink} to='/'>
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to='/store'>
							Store
						</Nav.Link>
						<Nav.Link as={NavLink} to='/about'>
							About
						</Nav.Link>
					</Nav>
					{cartQuantity > 0 && (
						<Button
							onClick={openCart}
							style={{width: '3rem', height: '3rem', position: 'relative'}}
							variant='outline-primary' // This is also for designing purpose
							className='rounded-circle'
							>
							<ShoppingCartIcon />
							<div
								className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
								style={{color: 'white', width: '1.5rem', height: '1.5rem', position: 'absolute', bottom: 0, right: 0, transform: "translate(25%, 25%"}}
								>
								{cartQuantity}
							</div>
						</Button>
					)}
				</Container>
			</NavbarBs>
		</>
	);
}
