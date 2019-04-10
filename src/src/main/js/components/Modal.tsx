import React, {FC, useState} from 'react';
import BSModal from 'react-bootstrap/Modal';

export enum ModalType {
	Error = 'danger',
	Warning = 'warning',
	Default = 'info',
}

export interface IModalMessage {
	type?: ModalType;
	title: string;
	text: string;
	handled?: boolean;
}

interface IProps {
	message: IModalMessage;
}

export const Modal: FC<IProps> = ({message}) => {
	const {type = ModalType.Default, title, text, handled = false} = message;
	const [visible, setVisible] = useState(true);

	if (!visible && !handled) {
		setVisible(true);
	}

	const handleOnHide = () => {
		message.handled = true;
		setVisible(false);
	};

	return (
		<BSModal show={visible} onHide={handleOnHide}>
			<BSModal.Header closeButton className={`text-${type}`}>
				<BSModal.Title>{title}</BSModal.Title>
			</BSModal.Header>
			<BSModal.Body>
				<p>{text}</p>
			</BSModal.Body>
		</BSModal>
	);
};

export default Modal;
