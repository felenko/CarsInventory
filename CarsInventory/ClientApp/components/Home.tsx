import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as Modal from 'react-modal';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    IsOpen: boolean;

    products = [{ id: "1", name: "Ford", price: 32 },
                { id: "2", name: "Chevy", price: 32 }];

    buttonsColumnFormat(cell:any, row:any) {
        return <span><button type="submit">Edit</button>
            <button className="btn btn-warning react-bs-table-del-btn" type="submit">
                <span><i className="fa glyphicon glyphicon-trash fa-trash"></i>Delete</span></button>
               </span>;

    }
    state = {
        isShowingModal: true,
    }
    handleClick = () => this.setState({ isShowingModal: true });
    handleClose = () => this.setState({ isShowingModal: false });
    
   public render() {
        return <div>
            <h1>Hello, world!</h1>
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
                  
            <BootstrapTable data={this.products} striped hover deleteRow insertRow>
                       <TableHeaderColumn isKey dataField='id' dataSort={ true }>Product ID</TableHeaderColumn>
                       <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                       <TableHeaderColumn dataField='price' dataFormat={this.buttonsColumnFormat}>Product Price</TableHeaderColumn>

                   </BootstrapTable>
           
        </div>;
    }
}
