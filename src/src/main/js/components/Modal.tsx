import React, {FC, useState, ComponentType} from 'react';
import BSModal from 'react-bootstrap/Modal';

export enum ModalType {
	Error = 'danger',
	Warning = 'warning',
	Default = 'info',
}

export interface ModalMessage {
	type?: ModalType;
	title: string;
	text: string;
	handled?: boolean;
}

interface IProps {
	message?: ModalMessage;
}

export const Modal: FC<IProps> = ({message}) => {
	const [visible, setVisible] = useState(true);

	if (!visible && !message.handled) {
		setVisible(true);
	}

	const handleOnHide = () => {
		message.handled = true;
		setVisible(false);
	};

	return (
		<BSModal show={visible} onHide={handleOnHide}>
			<BSModal.Header closeButton variant={message ? message.type : ''}>
				<BSModal.Title>{message.title ? message.title : message.type}</BSModal.Title>
			</BSModal.Header>
			<BSModal.Body>
				<p>{message.text}</p>
			</BSModal.Body>
		</BSModal>
	);
};

export default Modal;
