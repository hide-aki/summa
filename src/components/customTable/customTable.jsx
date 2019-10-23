/* react */
import React from 'react';
import { GenericValidators } from '@pleedtech/pt-components';
import ReactTable from 'react-table';
import './react-table.css';
import { isString } from 'lodash';

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.genericValidators = new GenericValidators();
    this.getCurrenPageSelected = this.getCurrenPageSelected.bind(this);
  }

  componentDidMount() {
    if (this.activeGetCurrentRowsPage) {
      if (
        this.genericValidators.validateValueIsFunction(
          this.props.getCurrentRowsPage,
        )
      ) {
        this.props.getCurrentRowsPage(this.getCurrenPageSelected());
      } // if-this.props.getCurrentRowsPage
    } // if-activeGetCurrentRowsPage
  } // componentDidMount

  componentWillReceiveProps(nextProps) {} // componentWillUpdate

  componentWillUpdate(nextProps, nextState) {} // componentWillUpdate

  componentDidUpdate(prevProps, prevState) {
    if (this.activeGetCurrentRowsPage) {
      if (
        this.genericValidators.validateValueIsFunction(
          this.props.getCurrentRowsPage,
        )
      ) {
        this.props.getCurrentRowsPage(this.getCurrenPageSelected());
      } // if-this.props.getCurrentRowsPage
    } // if-activeGetCurrentRowsPage
  } // componentDidUpdate

  getCurrenPageSelected() {
    const startRow =
      this.instance.getResolvedState().pageSize *
      this.instance.getResolvedState().page; // startRow
    const endRow = startRow + this.instance.getResolvedState().pageSize; // endRow
    const pageRows = this.instance.getResolvedState().manual
      ? this.instance.getResolvedState().resolvedData
      : this.instance.getResolvedState().sortedData.slice(startRow, endRow); // pageRows
    return pageRows;
  } // getCurrenPageSelected

  render() {
    this.activeGetCurrentRowsPage = this.genericValidators.validateValueIsBoolean(
      this.props.activeGetCurrentRowsPage,
    )
      ? this.props.activeGetCurrentRowsPage
      : false;

    this.checkColumnOneByOne = this.genericValidators.validateValueIsBoolean(
      this.props.checkColumnOneByOne,
    ) // validateValueIsBoolean
      ? this.props.checkColumnOneByOne
      : false; // checkColumnOneByOne

    this.backgroundRowPair = !this.genericValidators.validateValueIsUndefinedOrNull(
      this.props.backgroundRowPair,
    )
      ? this.props.backgroundRowPair
      : ''; // backgroundRowPair

    this.backgroundRowNone = !this.genericValidators.validateValueIsUndefinedOrNull(
      this.props.backgroundRowNone,
    )
      ? this.props.backgroundRowNone
      : ''; // backgroundRowNone

    this.backgroundRowSelected = !this.genericValidators.validateValueIsUndefinedOrNull(
      this.props.backgroundRowSelected,
    )
      ? this.props.backgroundRowSelected
      : ''; // backgroundRowSelected

    this.activeRowColorStyle = this.genericValidators.validateValueIsBoolean(
      this.props.activeRowColorStyle,
    ) // validateValueIsBoolean
      ? this.props.activeRowColorStyle
      : false; // activeRowColorStyle

    this.activeRowColorStyleInCheckColumnOneByOne = this.genericValidators.validateValueIsBoolean(
      this.props.activeRowColorStyleInCheckColumnOneByOne,
    ) // validateValueIsBoolean
      ? this.props.activeRowColorStyleInCheckColumnOneByOne
      : false; // activeRowColorStyleInCheckColumnOneByOne

    const optionalConfigurationReactTable = {};
    if (this.activeRowColorStyle) {
      let countRows = 0;
      optionalConfigurationReactTable.getTrProps = (state, row) => {
        if (
          !this.genericValidators.validateValueIsUndefinedOrNull(row) // validateValueIsUndefinedOrNull
        ) {
          if (
            !this.genericValidators.validateValueIsUndefinedOrNull(
              row.original.rowColorStyle,
            ) && // validateValueIsUndefinedOrNull
            this.genericValidators.validateValueIsStringNotEmpty(
              row.original.rowColorStyle,
            ) && // validateValueIsUndefinedOrNull
            row.original.rowColorStyle != 'null'
          ) {
            countRows = row.index;
            countRows++;
            return {
              style: {
                background: row.original.rowColorStyle,
              },
            };
          }
          if (row.index % 2 == 0) {
            countRows = row.index;
            countRows++;
            return {
              style: {
                background: this.backgroundRowPair,
              },
            };
          }
          countRows = row.index;
          countRows++;
          return {
            style: {
              background: this.backgroundRowNone,
            },
          };
          // if-index
        }
        if (countRows % 2 == 0) {
          countRows++;
          return {
            style: {
              background: this.backgroundRowPair,
            },
          };
        }
        countRows++;
        return {
          style: {
            background: this.backgroundRowNone,
          },
        };
        // if-countRows
        // if-row
      }; // getTrProps
    } else if (this.checkColumnOneByOne) {
      let countRows = 0;
      optionalConfigurationReactTable.getTrProps = (state, row) => {
        if (!this.genericValidators.validateValueIsUndefinedOrNull(row)) {
          if (row.original.checked.checkRow) {
            countRows = row.index;
            countRows++;
            return {
              style: {
                background: this.backgroundRowSelected,
              },
            };
          }
          if (
            this.activeRowColorStyleInCheckColumnOneByOne &&
            !this.genericValidators.validateValueIsUndefinedOrNull(
              row.original.rowColorStyle,
            ) && // validateValueIsUndefinedOrNull
            this.genericValidators.validateValueIsStringNotEmpty(
              row.original.rowColorStyle,
            ) && // validateValueIsUndefinedOrNull
            row.original.rowColorStyle != 'null'
          ) {
            countRows = row.index;
            countRows++;
            return {
              style: {
                background: row.original.rowColorStyle,
              },
            };
          }
          if (row.index % 2 == 0) {
            countRows = row.index;
            countRows++;
            return {
              style: {
                background: this.backgroundRowPair,
              },
            };
          }
          countRows = row.index;
          countRows++;
          return {
            style: {
              background: this.backgroundRowNone,
            },
          };
          // if-index
        }
        if (countRows % 2 == 0) {
          countRows++;
          return {
            style: {
              background: this.backgroundRowPair,
            },
          };
        }
        countRows++;
        return {
          style: {
            background: this.backgroundRowNone,
          },
        };
        // if-countRows
        // if-row
      }; // getTrProps
    } // if-checkColumnOneByOne

    return (
      <ReactTable
        // props
        ref={(el) => (this.instance = el)}
        data={
          this.genericValidators.validateValueIsArrayNotEmpty(this.props.data)
            ? this.props.data
            : []
        }
        columns={
          this.genericValidators.validateValueIsArrayNotEmpty(
            this.props.columns,
          )
            ? this.props.columns
            : []
        }
        className={
          this.genericValidators.validateValueIsStringNotEmpty(
            this.props.className,
          )
            ? this.props.className
            : ''
        }
        previousText={
          isString(this.props.previousText) ? (
            this.props.previousText
          ) : (
            <i className="fa fa-chevron-left" />
          )
        }
        nextText={
          isString(this.props.nextText) ? (
            this.props.nextTexthist
          ) : (
            <i className="fa fa-chevron-right" />
          )
        }
        // previousText        = { this.genericValidators.validateValueIsArrayNotEmpty(this.props.previousText)
        //                        ? this.props.previousText
        //                        : null
        //                    }
        // nextText            = {'Next'}
        // loadingText         = {'Loading'}
        // noDataText          = {'No rows found'}

        pageText={
          this.genericValidators.validateValueIsStringNotEmpty(
            this.props.pageText,
          )
            ? this.props.pageText
            : null
        }
        ofText={
          this.genericValidators.validateValueIsStringNotEmpty(
            this.props.ofText,
          )
            ? this.props.ofText
            : null
        }
        rowsText={
          this.genericValidators.validateValueIsStringNotEmpty(
            this.props.rowsText,
          )
            ? this.props.rowsText
            : null
        }
        showPageSizeOptions={
          this.genericValidators.validateValueIsBoolean(
            this.props.showPageSizeOptions,
          )
            ? this.props.showPageSizeOptions
            : true
        }
        defaultPageSize={
          this.genericValidators.validateValueIsNumber(
            this.props.defaultPageSize,
          )
            ? this.props.defaultPageSize
            : this.props.data.length
        }
        pageSizeOptions={
          this.genericValidators.validateValueIsArrayNotEmpty(
            this.props.pageSizeOptions,
          )
            ? this.props.pageSizeOptions
            : []
        }
        showPagination={
          this.genericValidators.validateValueIsBoolean(
            this.props.showPagination,
          )
            ? this.props.showPagination
            : false
        }
        page={
          this.genericValidators.validateValueIsNumber(this.props.page)
            ? this.props.page
            : 0
        } // page
        pageSize={
          this.genericValidators.validateValueIsNumber(this.props.pageSize)
            ? this.props.pageSize
            : this.props.defaultPageSize
        } // pageSize
        noDataText={
          !this.genericValidators.validateValueIsUndefinedOrNull(
            this.props.noDataText,
          )
            ? this.props.noDataText
            : 'Empty Data'
        } // noDataText
        collapseOnSortingChange={
          !this.genericValidators.validateValueIsUndefinedOrNull(
            this.props.collapseOnSortingChange,
          )
            ? this.props.collapseOnSortingChange
            : false
        }
        collapseOnPageChange={
          !this.genericValidators.validateValueIsUndefinedOrNull(
            this.props.collapseOnPageChange,
          )
            ? this.props.collapseOnPageChange
            : false
        }
        collapseOnDataChange={
          !this.genericValidators.validateValueIsUndefinedOrNull(
            this.props.collapseOnDataChange,
          )
            ? this.props.collapseOnDataChange
            : false
        }
        showPageJump={
          !this.genericValidators.validateValueIsUndefinedOrNull(
            this.props.showPageJump,
          )
            ? this.props.showPageJump
            : false
        }
        // callbacks //
        onPageChange={(pageIndex) => {
          if (
            this.genericValidators.validateValueIsFunction(
              this.props.onPageChange,
            )
          ) {
            return this.props.onPageChange(pageIndex);
          }
        }} // Called when the page index is changed by the user
        onPageSizeChange={(pageSize, pageIndex) => {
          if (
            this.genericValidators.validateValueIsFunction(
              this.props.onPageSizeChange,
            )
          ) {
            return this.props.onPageSizeChange(pageSize, pageIndex);
          }
        }} // Called when the pageSize is changed by the user. The resolve page is also sent to maintain approximate position in the data
        SubComponent={
          this.genericValidators.validateValueIsFunction(
            this.props.SubComponent,
          )
            ? this.props.SubComponent
            : ''
        }
        onExpandedChange={(newExpanded, index, event) => {
          if (
            this.genericValidators.validateValueIsFunction(
              this.props.onExpandedChange,
            )
          ) {
            return this.props.onExpandedChange(newExpanded, index, event);
          }
        }}
        onSortedChange={(obejct, value) => {
          if (this.activeGetCurrentRowsPage) {
            if (
              this.genericValidators.validateValueIsFunction(
                this.props.getCurrentRowsPage,
              )
            ) {
              this.props.getCurrentRowsPage(this.getCurrenPageSelected());
            } // if-this.props.getCurrentRowsPage
          } // if-activeGetCurrentRowsPage
          if (
            this.genericValidators.validateValueIsFunction(
              this.props.onSortedChange,
            )
          ) {
            this.props.onSortedChange(obejct, value);
          } // if- onSortedChange
        }} // onSortedChange
        {...optionalConfigurationReactTable}
      />
    );
  }
}
export { CustomTable };
