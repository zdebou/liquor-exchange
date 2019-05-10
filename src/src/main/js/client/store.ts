import {createStore, action, Action, createTypedHooks} from 'easy-peasy';

interface IUser {
	email: string;
	accessToken: string;
}

interface IAuthModel {
	user: IUser | null;
	setUser: Action<IAuthModel, IUser | null>;
}

interface IStoreModel {
	auth: IAuthModel;
}

const {useActions, useStore, useDispatch} = createTypedHooks<IStoreModel>();

export {useActions, useStore, useDispatch};

export default createStore<IStoreModel>({
	auth: {
		user: null,
		setUser: action((state, payload) => {
			state.user = payload;
		}),
	},
});
