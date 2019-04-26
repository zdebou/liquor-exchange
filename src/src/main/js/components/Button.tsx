import React, {FC} from 'react';
import BSButton from 'react-bootstrap/Button';

interface IProps {
	label: string;
	type?: 'button' | 'reset' | 'submit';
	size?: 'lg' | 'sm';
	primary?: boolean;
	onClick?: () => void;
}

const Button: FC<IProps> = ({label, type = 'button', size, primary = false, onClick}) => (
	<BSButton
		onClick={onClick ? onClick : undefined}
		type={type}
		variant={primary ? 'primary' : 'outline-secondary'}
		size={size}
	>
		{label}
	</BSButton>
);

export default Button;
