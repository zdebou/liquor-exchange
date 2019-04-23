import React, {FC, ComponentType} from 'react';
import {Formik, Field, FormikProps, FieldProps} from 'formik';
import BSForm from 'react-bootstrap/Form';

import useUniqueId from '../utils/useUniqueId';
import FormGroup from './FormGroup';

interface IProps {
	initialValues: {[key: string]: any};
	onSubmit: (values: {[key: string]: any}) => void;
	schema?: any;
}

const Form: FC<IProps> = ({initialValues, onSubmit, schema, children}) => (
	<Formik
		initialValues={initialValues}
		validationSchema={schema}
		validateOnChange
		onSubmit={values => onSubmit(values)}
	>
		{({handleSubmit}: FormikProps<any>) => <BSForm onSubmit={handleSubmit}>{children}</BSForm>}
	</Formik>
);

export default Form;

interface IWithFormParams {
	customLabel?: boolean;
}

interface IFieldProps {
	value?: any;
	onChange?: (value: any) => void;
	isInvalid?: boolean;
	htmlId?: string;
	id?: string;
	label?: string;
	validationPostponed?: boolean;
}

interface IAddionalProps {
	id: string;
	label?: string;
	validationPostponed?: boolean;
}

export const withForm = ({customLabel = false}: IWithFormParams = {}) => {
	return <P extends IFieldProps>(OriginalComponent: ComponentType<P>) => {
		type TProps = Pick<P, Exclude<keyof P, keyof IFieldProps>> & IAddionalProps;
		const wrappedField: FC<TProps> = props => {
			const {id, label, validationPostponed = false} = props;
			const htmlId = useUniqueId();

			return (
				<Field name={id}>
					{({field, form}: FieldProps) => {
						let error;
						if (
							form.errors[id] &&
							((form.touched[id] && !validationPostponed) || form.submitCount > 0)
						) {
							error = String(form.errors[id]);
						}

						const handleChange = (value: any) => {
							field.onChange(id)(value);
							form.setFieldTouched(id, true);
						};

						return (
							<FormGroup
								label={!customLabel ? label : undefined}
								htmlId={htmlId}
								error={error}
							>
								<OriginalComponent
									value={field.value}
									onChange={handleChange}
									isInvalid={!!error}
									htmlId={htmlId}
									{...props as P}
								/>
							</FormGroup>
						);
					}}
				</Field>
			);
		};
		return wrappedField;
	};
};
