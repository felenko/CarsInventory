import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IEditProps {
    onCancel:()=> void;      
    onSave:(editedCar:any)=>void;
    car:any;
}

interface LooseObject {
    [key: string]: any
}

export class Edit extends React.Component<IEditProps,any> {
    constructor(props:any) {
        super(props);
        this.state = {
          
            car: this.props.car
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event:any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        var newCar:LooseObject = {
            Id:this.state.car.Id,
            Manufacturer: this.state.car.Manufacturer,
            Make: this.state.car.Make,
            Model: this.state.car.Model,
            Year: this.state.car.Year
        }
        newCar[name] = value;
        this.setState({
           car: newCar
        });
    }

    render() {
        return (
            <form>
                <div className="modal-header react-bs-table-inser-modal-header">
                    <h4 className="modal-title">Edit car</h4>
                    </div>
                <br/>
                    <label>Manufacturer</label>
                    <input placeholder="Manufacturer" className="form-control editor edit-text"
                        name="Manufacturer"
                        type="text"
                        value={this.state.car.Manufacturer}
                        onChange={this.handleInputChange} />
                
               
                
                    <label>Make</label>
                   <input placeholder="Make" className="form-control editor edit-text"
                        name="Make"
                        type="text"
                        value={this.state.car.Make}
                        onChange={this.handleInputChange} />
                
                   <label>Model</label>
                    <input placeholder="Model" className="form-control editor edit-text"
                        name="Model"
                        type="text"
                        value={this.state.car.Model}
                        onChange={this.handleInputChange} />
                    <label>Year</label>
                    <input placeholder="Year" className="form-control editor edit-text"
                        name="Year"
                        type="text"
                        value={this.state.car.Year}
                        onChange={this.handleInputChange} />
               
                <br/>
                <br/>
                <button className="btn btn-default" type="button" onClick={()=> { this.props.onCancel(); }}>
                    Cancel 
                </button>
                <button className="btn btn-default" type="button" onClick={() => {this.props.onSave(this.state.car)}}>
                    <span className="glyphicon glyphicon-floppy-save"></span>Save
                </button>
            </form>
        );
    }
}