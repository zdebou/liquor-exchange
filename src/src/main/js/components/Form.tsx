import React, {FC, ComponentType} from 'react';
import {Formik, Field, FormikProps, FieldProps} from 'formik';
import BSForm from 'react-bootstrap/Form';

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

interface IFieldProps {
	value?: any;
	onChange?: (value: any) => void;
	isInvalid?: boolean;
	id?: string;
	label?: string;
}

interface IAddionalProps {
	id: string;
	label?: string;
}

export const withForm = <P extends IFieldProps>(OriginalComponent: ComponentType<P>) => {
	type TProps = Pick<P, Exclude<keyof P, keyof IFieldProps>> & IAddionalProps;
	const wrappedField: FC<TProps> = ({id, label, ...rest}) => {
		return (
			<Field name={id}>
				{({field, form}: FieldProps) => {
					let error;
					if ((form.touched[id] || form.submitCount > 0) && form.errors[id]) {
						error = String(form.errors[id]);
					}

					const handleChange = (value: any) => {
						field.onChange(id)(value);
						form.setFieldTouched(id, true);
					};

					return (
						<FormGroup label={label} error={error}>
							<OriginalComponent
								value={field.value}
								onChange={handleChange}
								isInvalid={!!error}
								{...rest as P}
							/>
						</FormGroup>
					);
				}}
			</Field>
		);
	};
	return wrappedField;
};
