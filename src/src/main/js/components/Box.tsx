import React, {FC} from 'react';
import BSCard from 'react-bootstrap/Card';

interface IProps {
	title?: string;
}

const Box: FC<IProps> = ({title, children}) => (
	<BSCard className="ml-auto mr-auto" style={{maxWidth: '600px'}}>
		<BSCard.Body>
			{title && <h2 className="card-title h4 mb-5">{title}</h2>}
			{children}
		</BSCard.Body>
	</BSCard>
);

export default Box;
