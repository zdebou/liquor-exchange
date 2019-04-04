import React, {FC} from 'react';
import BSButton from 'react-bootstrap/Button';

interface IProps {
	label: string;
	type?: 'button' | 'reset' | 'submit';
	primary?: boolean;
	onClick?: () => void;
}

const Button: FC<IProps> = ({label, type = 'button', primary = false, onClick}) => (
	<BSButton
		onClick={onClick ? onClick : undefined}
		type={type}
		variant={primary ? 'primary' : 'outline-secondary'}
	>
		{label}
	</BSButton>
);

export default Button;
