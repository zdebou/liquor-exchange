import React, {FC, ReactElement, MouseEvent} from 'react';
import BSTable from 'react-bootstrap/Table';

enum SortOrder {
	Asc = 'asc',
	Desc = 'desc',
}

interface IColProps {
	title: string;
	sortColumn?: string;
}

interface ISortProps {
	column: string;
	order?: SortOrder;
}

interface IProps {
	cols: Array<IColProps | null>;
	data: any[] | null;
	emptyMessage: string;
	loading?: boolean;
	sortDescription?: ISortProps;
	onSortChange?: (value: ISortProps) => void;
	children: (row: any) => ReactElement<HTMLTableRowElement>;
}

const DEFAULT_ORDER = SortOrder.Asc;

const Table: FC<IProps> = ({
	cols,
	data,
	emptyMessage,
	loading = false,
	sortDescription,
	onSortChange,
	children,
}) => {
	const handleHeaderClick = (event: MouseEvent<HTMLAnchorElement>, newColumn: string) => {
		event.preventDefault();
		if (!onSortChange) {
			return;
		}

		if (!sortDescription) {
			onSortChange({column: newColumn, order: DEFAULT_ORDER});
			return;
		}

		const {column, order = DEFAULT_ORDER} = sortDescription;
		let newOrder;
		if (newColumn === column) {
			newOrder = order === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;
		} else {
			newOrder = sortDescription.order;
		}
		onSortChange({column: newColumn, order: newOrder});
	};

	const renderSortSymbol = (sortColumn: string) => {
		if (!sortDescription) {
			return null;
		}

		const {column, order = DEFAULT_ORDER} = sortDescription;
		if (column !== sortColumn) {
			return null;
		}

		return order === SortOrder.Asc ? '▼' : '▲';
	};

	return (
		<BSTable striped>
			<thead>
				<tr>
					{cols.map((col, index) => (
						<th key={index}>
							{!col ? (
								''
							) : col.sortColumn ? (
								<a
									href="#"
									onClick={event =>
										handleHeaderClick(event, col.sortColumn as string)
									}
								>
									{renderSortSymbol(col.sortColumn)} {col.title}
								</a>
							) : (
								col.title
							)}
						</th>
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
};

export default Table;
