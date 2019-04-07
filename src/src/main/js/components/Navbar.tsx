import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import BSNavbar from 'react-bootstrap/Navbar';
import BSNav from 'react-bootstrap/Nav';

interface IProps {
	brand: string;
	menu: Array<{href: string; label: string}>;
}

const Navbar: FC<IProps> = ({brand, menu}) => (
	<BSNavbar bg="dark" variant="dark" expand="md" className="mb-5">
		<BSNavbar.Brand href="/">{brand}</BSNavbar.Brand>
		<BSNavbar.Toggle aria-controls="basic-navbar-nav" />
		<BSNavbar.Collapse id="basic-navbar-nav">
			<BSNav className="ml-auto">
				{menu.map((item, index) => (
					<NavLink
						to={item.href}
						key={index}
						exact
						className="nav-link"
						activeClassName="active"
					>
						{item.label}
					</NavLink>
				))}
			</BSNav>
		</BSNavbar.Collapse>
	</BSNavbar>
);

export default Navbar;
