import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Edit} from "./edit";
import 'isomorphic-fetch';

import * as Modal from 'react-modal';

//import * as webpack from 'webpack';

const serverBaseUrl = "http://localhost:5000/";


function onAfterDeleteRow(rowKeys:any) {
    alert('The rowkey you drop: ' + rowKeys);
}

const options = {
    afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
     
};

// If you want to enable deleteRow, you must enable row selection also.

interface MyComponentState { activities : any[]}

interface CarsInventoryState {
    cars : any[],
    isShowingModal:boolean;
}

interface ICar {
    
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
            
            <BootstrapTable data={this.state.activities} pagination={true} hover={true} search={true}>
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
        this.editBtnClick = this.editBtnClick.bind(this);
        this.buttonsColumnFormat = this.buttonsColumnFormat.bind(this);
        this.onAddRowHandler = this.onAddRowHandler.bind(this);
        this.postStateToServer = this.postStateToServer.bind(this);
        this.editCancelHandler = this.editCancelHandler.bind(this);
        this.editSaveHandler = this.editSaveHandler.bind(this);

        this.state = {
            cars: [
                { Id: 1, Manufacturer: "Ford", Make: "Ford", Model: "GT", Year: 2015 },
                { Id: 2, Manufacturer: "Chevy", Make: "Chevy", Model: "GT", Year: 2015 },
                { Id: 3, Manufacturer: "Chevy", Make: "Chevy", Model: "GT", Year: 2015 }
            ],
            isShowingModal: false
        }
        fetch(serverBaseUrl + 'api/CarRepository/GetAllCars')
            .then(response => response.json() as Promise<ICar[]>)
            .then(data => {
                console.log("inital receied data");
                console.log(data);
                this.setState({ cars: data, isShowingModal: false });
            });
    }


    clone<T>(o: T): T {
        return JSON.parse(JSON.stringify(o));
    }


    deleteBtnClick(row: any) {
        console.log("delete clicked");
        console.log(row.id);
        console.log(row);
        console.log("state cars count" + this.state.cars.length);


        var index = this.state.cars.indexOf(row);
        console.log("index" + index);
        var newState = this.clone(this.state);
        newState.cars.splice(index, 1);
        this.setState(newState);
        this.postStateToServer(newState);

    }

    IsOpen: boolean;

    buttonsColumnFormat(cell: any, row: any) {

        return <span><button className="btn btn-default" type="submit" onClick={() => {this.editBtnClick(row);}}>
                       <span className="glyphicon glyphicon-pencil"></span>Edit
                   </button>
                   <button className="btn btn-warning react-bs-table-del-btn" 
                           type="submit"
                           onClick={() => {this.deleteBtnClick(row);}}>
                           <span><i className="fa glyphicon glyphicon-trash fa-trash"></i>Delete</span>
                   </button>
               </span>;

    }

    onAddRowHandler(row: any) {
        console.log(row);
        var car = {
            Id: row.Id,
            Manufacturer: row.Manufacturer,
            Make: row.Make,
            Model: row.Model,
            Year: Number(row.Year)
        }
        var lastentry = this.state.cars[this.state.cars.length - 1];
        car.Id = Number(lastentry.Id) + 1;
        var newState = this.clone(this.state);
        newState.cars.push(car);
        this.setState(newState);
        this.postStateToServer(newState);

    }


    handleClick = () => this.setState({ cars: [], isShowingModal: true });
    handleClose = () => this.setState({ cars: [], isShowingModal: false });

    public render() {
        const options = {
            afterInsertRow: this.onAddRowHandler

        };


        const style = {
            content: {
                borderRadius: '4px',
                bottom: 'auto',
                height: '50%',  // set height
                padding: '2rem',
                left: '40%',
                top: '10%', // start from center
                //transform: 'translate(-50%,-' + offsetPx + ')', // adjust top "up" based on height
                width: '40%',
                maxWidth: '40rem'
            }
        };

        return <div>
                   <BootstrapTable options={ options } data={this.state.cars} striped hover insertRow>
                       <TableHeaderColumn isKey dataField='Id' dataSort={ true } editable={ {
                           readOnly: true,
                           defaultValue: "New Car"
                       }} width='20%' hidden={true}></TableHeaderColumn>
                       <TableHeaderColumn dataField='Manufacturer' dataSort={ true } width='20%'>Manufacturer</TableHeaderColumn>
                       <TableHeaderColumn dataField='Make' dataSort={ true } width='20%'>Make</TableHeaderColumn>
                       <TableHeaderColumn dataField='Model' dataSort={ true } width='20%'>Model</TableHeaderColumn>
                       <TableHeaderColumn dataField='Year' dataSort={ true } width='10%'>Year</TableHeaderColumn>
                       <TableHeaderColumn width='15%' dataFormat={ this.buttonsColumnFormat.bind(this)}></TableHeaderColumn>

                   </BootstrapTable>

                   <Modal
                       style = {style}
                       isOpen={this.state.isShowingModal}
                       closeTimeoutMS={150}
                       contentLabel="modalB"
                       shouldCloseOnOverlayClick={false}>
                       <Edit onCancel={this.editCancelHandler} onSave={this.editSaveHandler} car={this.editedCar}></Edit>
                   </Modal>
                   <div>
                   </div>
               </div>;
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        console.log("updated");

        
        
    }


    postStateToServer(state:CarsInventoryState) {
        console.log(JSON.stringify(this.state.cars));
        fetch('http://localhost:5000/api/CarRepository/UpdateAllCars',
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(state.cars)
                })
            .then(response => response.json() as Promise<boolean>)
            .then(data => {
                console.log("successfull post");
            });
    }

    editCancelHandler() {
       this.setState({
                cars:this.state.cars,
                isShowingModal: false
        });
    };
    
    editBtnClick(row:any) {
        console.log('edit started');
        console.log(row);
        this.editedCar = row;
        const newState = 
        {
            cars: this.state.cars,
            isShowingModal: true
        }
        this.setState(newState);
        this.postStateToServer(newState);
    }


    editSaveHandler(editedCar: any) {
        console.log(editedCar);
        var index = -1;
        this.state.cars.filter((item, i) => { if (item.Id == editedCar.Id) index = i });
        if (index >= 0) {
            var newState = this.clone(this.state);
            newState.cars[index] = editedCar;
            newState = 
            {
                cars: newState.cars,
                isShowingModal: false
            }
           
            this.setState(newState);
            this.postStateToServer(newState);
        }
    }

    editedCar: any;
}
