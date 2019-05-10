import React, {FC} from 'react';
import {withRouter, RouteComponentProps} from 'react-router';

import Button from './Button';

interface IProps {
	href: string;
	label: string;
	size?: 'lg' | 'sm';
	primary?: boolean;
}

const NavButton: FC<IProps & RouteComponentProps> = ({href, label, size, primary, history}) => {
	const handleClick = () => {
		history.push(href);
	};

	return <Button label={label} size={size} primary={primary} onClick={handleClick} />;
};

export default withRouter(NavButton);
