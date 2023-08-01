import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";

import Axios from "../../services/api/Config";
import { tokens } from "../../theme";

const Table = (props) => {
	const {
		columns = [],
		tableDATA = [],
		dataURL,
		query,
		search,
		filter,
		showPagination: paginationSetting = true,
		populateValue,
		sorting,
		selectValues,
		checkEqual = true,
		rowSelection = false,
		rowID = "_id",
		handleSelection
	} = props;

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const showPagination = paginationSetting ? true : paginationSetting;
	const [tableData, setTableData] = useState(tableDATA);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [resPaginator, setResPaginator] = useState();

	const [obj, setObj] = useState({
		query: filter ? filter.query : query ? query : undefined,
		options: {
			select: selectValues ? selectValues : {},
			limit: pageSize,
			page: currentPage,
			sort: sorting,
			pagination: true,
			populate: populateValue === undefined ? [] : [...populateValue],
		},
		search: filter ? filter.search : search ? search : undefined,
	});

	useEffect(() => {
		if (obj && dataURL) {
			setLoading(true);
			Axios({ ...dataURL, data: obj })
				.then((res) => {
					const resData = res.data;
					const tempResPaginator = { total_entries: resData?.length };
					setTableData(resData === null ? [] : resData);
					// setResPaginator(resData === null ? [] : resData.pagination);

					setResPaginator(resData === null ? {} : tempResPaginator);
					// setCurrentPage(resData.pagination?.current_page);
					// setPageSize(resData.pagination?.per_page);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [dataURL, obj, checkEqual]);

	const handlePaginationChange = (pageConfig) => {
		const pgNo = pageConfig?.page + 1;
		const pgSize = pageConfig?.pageSize;
		let options = {
			...obj,
			options: {
				...obj.options,
				limit: pgSize,
				page: pgNo,
			},
		};
		setObj(options);
		setPageSize(pgSize);
		setCurrentPage(pgNo);
	};


	return (
		<div>
			<Box
				// height='65vh'
				// maxHeight='65vh'
				// TODO:  fix the styling of the side bar
				sx={{
					// maxHeight: '65vh',
					"& .MuiDataGrid-root": {
						border: "none",
						fontSize: "14px",
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none",
					},
					"& .name-column--cell": {
						color: colors.greenAccent[300],
					},
					"& .MuiDataGrid-columnHeaders": {
						backgroundColor: colors.blueAccent[700],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: colors.primary[400],
					},
					"& .MuiDataGrid-footerContainer": {
						borderTop: "none",
						backgroundColor: colors.blueAccent[700],
					},
					"& .MuiCheckbox-root": {
						color: `${colors.greenAccent[200]} !important`,
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${colors.grey[100]} !important`,
					},
					"& .MuiDataGrid-columnHeaderTitle": {
						fontSize: `16px !important`,
						fontWeight: 600,
					},
				}}>
				<DataGrid
					columns={columns}
					rows={tableData}
					loading={loading}
					getRowId={(row) => row[rowID]}
					disableRowSelectionOnClick
					checkboxSelection={rowSelection}
					pageSizeOptions={[10, 20, 30, 50]}
					paginationModel={{
						page: currentPage - 1,
						pageSize: pageSize,
					}}
					// paginationMode='server'
					rowCount={resPaginator ? resPaginator?.total_entries : 0}
					onPaginationModelChange={handlePaginationChange}
					hideFooterPagination={!showPagination}
					onRowSelectionModelChange={handleSelection}
				/>
			</Box>
		</div>
	);
};

Table.propTypes = {
	checkEqual: PropTypes.bool,
	columns: PropTypes.array,
	conditionalRowStyles: PropTypes.array,
	customStyles: PropTypes.object,
	dataURL: PropTypes.object,
	expandableRows: PropTypes.bool,
	expandedComponent: PropTypes.node,
	filter: PropTypes.shape({
		query: PropTypes.object,
		search: PropTypes.shape({
			value: PropTypes.string,
		}),
	}),
	populateValue: PropTypes.array,
	query: PropTypes.object,
	rowID: PropTypes.string,
	rowSelection: PropTypes.bool,
	search: PropTypes.shape({
		value: PropTypes.string,
	}),
	selectValues: PropTypes.object,
	showPagination: PropTypes.bool,
	sorting: PropTypes.object,
	tableDATA: PropTypes.array,
	tableRefresh: PropTypes.bool,
};

export default Table;
