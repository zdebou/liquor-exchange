import React, {FC} from 'react';
import BSButton from 'react-bootstrap/Button';

interface IProps {
	label: string;
	type?: 'button' | 'reset' | 'submit';
	className?: string;
	size?: 'lg' | 'sm';
	primary?: boolean;
	onClick?: () => void;
}

const Button: FC<IProps> = ({
	label,
	type = 'button',
	className,
	size,
	variant = 'primary',
	onClick,
}) => (
	<BSButton
		onClick={onClick ? onClick : undefined}
		type={type}
		variant={variant}
		size={size}
		className={className}
	>
		{label}
	</BSButton>
);

export default Button;
