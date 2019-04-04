import React, {FC} from 'react';
import BSNavbar from 'react-bootstrap/Navbar';

interface IProps {
	brand: string;
}

const Navbar: FC<IProps> = ({brand}) => (
	<BSNavbar bg="dark" variant="dark" expand="md" className="mb-5">
		<BSNavbar.Brand href="/">{brand}</BSNavbar.Brand>
	</BSNavbar>
);

export default Navbar;
