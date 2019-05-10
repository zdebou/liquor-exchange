import React, {useEffect, FC} from 'react';
import {Redirect} from 'react-router';

import {logOut} from '../../client/actions';
import {useStore} from '../../client/store';
import Container from '../../components/Container';

const Logout: FC = () => {
	const loggedUser = useStore(state => state.auth.user);

	const doLogout = () => {
		logOut();
	};

	useEffect(doLogout, []);

	if (!loggedUser) {
		return <Redirect to="/login" />;
	}

	return (
		<Container>
			<div className="text-center">Working...</div>
		</Container>
	);
};

export default Logout;
