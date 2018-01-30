import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {


    products = [{ id: "1", name: "Ford", price: 32 },
                { id: "2", name: "Chaevy", price: 32 }];

    buttonsColumnFormat(cell:any, row:any) {
        return <span><button type="submit">Edit</button>
            <button className="btn btn-warning react-bs-table-del-btn" type="submit">
                <span><i className="fa glyphicon glyphicon-trash fa-trash"></i>Delete</span></button>
               </span>;

    }

   public render() {
        return <div>
            <h1>Hello, world!</h1>
            <p>Welcome to your new single-page application, built with:</p>
            <ul>
                <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                <li><a href='https://facebook.github.io/react/'>React</a> and <a href='http://www.typescriptlang.org/'>TypeScript</a> for client-side code</li>
                <li><a href='https://webpack.github.io/'>Webpack</a> for building and bundling client-side resources</li>
                <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
            </ul>
            <p>To help you get started, we've also set up:</p>
            <ul>
                <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
                <li><strong>Webpack dev middleware</strong>. In development mode, there's no need to run the <code>webpack</code> build tool. Your client-side resources are dynamically built on demand. Updates are available as soon as you modify any file.</li>
                <li><strong>Hot module replacement</strong>. In development mode, you don't even need to reload the page after making most changes. Within seconds of saving changes to files, rebuilt React components will be injected directly into your running application, preserving its live state.</li>
                <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and the <code>webpack</code> build tool produces minified static CSS and JavaScript files.</li>
            </ul>
            <h4>Going further</h4>
            <p>
                For larger applications, or for server-side prerendering (i.e., for <em>isomorphic</em> or <em>universal</em> applications), you should consider using a Flux/Redux-like architecture.
                You can generate an ASP.NET Core application with React and Redux using <code>dotnet new reactredux</code> instead of using this template.
            </p>
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
                    <tr>
                        <td>EmployeeID1</td>
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
 