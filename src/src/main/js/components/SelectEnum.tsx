import React, {FC, useMemo} from 'react';
import {SelectRaw} from './Select';
import {withForm} from './Form';

interface IProps {
	value?: any | null;
	onChange: (value: any) => void;
	isInvalid?: boolean;
	htmlId?: string;
	enumObject: {[key: string]: any};
}

export const SelectEnumRaw: FC<IProps> = ({value, onChange, isInvalid, htmlId, enumObject}) => {
	const items = useMemo(
		() => Object.keys(enumObject).map(key => ({key, value: enumObject[key]})),
		[enumObject],
	);

	return (
		<SelectRaw
			value={value}
			onChange={onChange}
			isInvalid={isInvalid}
			htmlId={htmlId}
			items={items}
			idFieldName="value"
			labelFieldName="key"
		/>
	);
};

export default withForm()(SelectEnumRaw);
