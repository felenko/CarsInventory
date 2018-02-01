// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
interface MyComponentState { activities : any[]}
export class MainGrid extends React.Component<{},MyComponentState> {
    constructor() {
        super();
        this.state = {
            activities: [{id: 0, title: 'test', address: 'asdfasdf'},
                {id: 1, title: 'test1', address: 'asdfasdf'},
                {id: 2, title: 'test2', address: 'asdfasdf'}]
        }
    }
    
    _validateFunction(row:any) {    
        console.log("activity id :"+ row.id);
    }
    
    buttonFunction(cell:any, row:any) {
        return <label>
                   <button type="button"
                           id="validatebutton"
                           onClick={() => { this._validateFunction(row) }}
                           className="bbtn btn-primary btn-sm">
                       Click Me
                   </button>
               </label>;
    }
    
    render() {
        return (
            <BootstrapTable data={this.state.activities} pagination={true} hover={true} search={true} >
                <TableHeaderColumn isKey={true} dataField="id" hidden>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="title" dataSort={true}>Title</TableHeaderColumn>
                <TableHeaderColumn dataField="address" dataSort={true}>Adress</TableHeaderColumn>
                <TableHeaderColumn dataField="button" dataFormat={this.buttonFunction.bind(this)}></TableHeaderColumn>
            </BootstrapTable>
        );
    }
}