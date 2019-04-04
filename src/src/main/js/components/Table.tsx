import React, {FC, ReactElement} from 'react';
import BSTable from 'react-bootstrap/Table';

interface IProps {
	cols: string[];
	data: any[] | null;
	loading?: boolean;
	emptyMessage: string;
	children: (row: any) => ReactElement<HTMLTableRowElement>;
}

const Table: FC<IProps> = ({cols, loading = false, data, emptyMessage, children}) => (
	<BSTable bordered>
		<thead>
			<tr>
				{cols.map((title, index) => (
					<th key={index}>{title}</th>
				))}
			</tr>
		</thead>
		<tbody>
			{loading ? (
				<tr>
					<td colSpan={cols.length}>Loading...</td>
				</tr>
			) : !data || data.length === 0 ? (
				<tr>
					<td colSpan={cols.length}>{emptyMessage}</td>
				</tr>
			) : (
				data.map(children)
			)}
		</tbody>
	</BSTable>
);

export default Table;
