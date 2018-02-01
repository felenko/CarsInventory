import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as Modal from 'react-modal';



function onAfterDeleteRow(rowKeys:any) {
    alert('The rowkey you drop: ' + rowKeys);
}

const options = {
    afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
};

// If you want to enable deleteRow, you must enable row selection also.
const selectRowProp = {
    mode: 'checkbox'
};

interface MyComponentState { activities : any[]}

interface CarsInventoryState {
    cars : any[],
    isShowingModal:boolean;
}

export class MainGrid extends React.Component<{}, MyComponentState> {
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


const MainGrid1 = () => (<MainGrid></MainGrid>);

export class Home extends React.Component<RouteComponentProps<{}>, CarsInventoryState> {
    constructor() {
        super();
        this.deleteBtnClick = this.deleteBtnClick.bind(this);
        this.buttonsColumnFormat = this.buttonsColumnFormat.bind(this);
        this.state = { cars: [
            { id: 1, name: "Ford", price: 32 },
            { id: 2, name: "Chevy", price: 32 },
            { id: 3, name: "Chevy", price: 32 }
        ], isShowingModal: false
    }
    }

    deleteBtnClick(row: any) {
        console.log("delete clicked");
        console.log(row.id);
        var index = this.state.cars.indexOf(row);
        this.state.cars.splice(index,1);
        this.setState(this.state);
    }

    IsOpen: boolean;

    products = [{ id: 1, name: "Ford", price: 32 },
                { id: 2, name: "Chevy", price: 32 },
                {  id: 3, name: "Chevy", price: 32 }];

    buttonsColumnFormat(cell:any, row:any) {
       
        return <span><button type="submit">Edit</button>
            
            <button className="btn btn-warning react-bs-table-del-btn" type="submit" onClick={() => { this.deleteBtnClick(row); }}>
            <span><i className="fa glyphicon glyphicon-trash fa-trash"  ></i>Delete</span></button>
               </span>;

    }

    
    
         
    handleClick = () => this.setState({ cars:[], isShowingModal: true });
    handleClose = () => this.setState({ cars:[], isShowingModal: false });
    
   public render() {
        return <div>
            <h1>Hello, world!</h1>
<MainGrid1></MainGrid1>
                    <button onClick={()=>this.deleteBtnClick({test:42})}> BTN</button>
                   <BootstrapTable data={this.state.cars} striped hover deleteRow insertRow >
                       <TableHeaderColumn isKey dataField='id' dataSort={ true }>Product ID</TableHeaderColumn>
                       <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                       <TableHeaderColumn dataField='price' dataFormat={ this.buttonsColumnFormat.bind(this)}>Product Price</TableHeaderColumn>

                   </BootstrapTable>

                   <Modal
                       
                       isOpen= {this.state.isShowingModal}
                       closeTimeoutMS={150}
                       contentLabel="modalB"
                       shouldCloseOnOverlayClick={true}>
                       <form>
                       <fieldset>
                           <input type="text"  />
                           <input type="text"  />
                       </fieldset>
                        </form>
                   </Modal>
            <div>
                <table className="table table-hover">
            <thead>
                   <tr >
                       <th data-defaultsign="_19"> Employee ID</th>
                       <th data-defaultsign="AZ">Name</th>
                       <th data-defaultsign="AZ">Title</th>
                       <th data-defaultsign="month">Birth Date</th>
                       <th data-firstsort="desc">Address</th>
                       <th data-defaultsign="AZ">City</th>
                       <th data-defaultsort="disabled">Country</th>
                   </tr>
                   </thead>
                  <tbody>
                <tr>
                    <td>EmployeeID0</td>
                    <td>Name</td>
                    <td>Title</td>
                    <td>BirthDate</td>
                    <td>Address</td>
                    <td>City</td>
                    <td>Country</td>
                </tr>
                </tbody>
                    </table>
            </div>
         
            
           
        </div>;
    }
}
