import React, {FC} from 'react';

interface IProps {
	label: string;
	onClick?: () => void;
}

const Button: FC<IProps> = ({label, onClick}) => (
	<button onClick={onClick ? onClick : undefined}>{label}</button>
);

export default Button;
