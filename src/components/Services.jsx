import React from 'react';
import '../index';
import '../index.css';
import fetch from 'isomorphic-fetch'
import { saveAs } from 'file-saver/FileSaver';

class Services extends React.Component {

    constructor() {
        super();
        this.state = {
            list: [],
            period: this.date(),
            showUpdateForm: false,
            updateId: null,
            periodOnChange: ''

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.whichData = this.whichData.bind(this);
        this.render = this.render.bind(this);
        this.deleteButton = this.deleteButton.bind(this);

        this.updateService = this.updateService.bind(this);
        this.updateToBack = this.updateToBack.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
        this.pdfDownload = this.pdfDownload.bind(this);

        this.handleChangeServiceType = this.handleChangeServiceType.bind(this);
        this.handleChangeDistance = this.handleChangeDistance.bind(this);
        this.handleChangeWhen = this.handleChangeWhen.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.onChangePeriod = this.onChangePeriod.bind(this);

    }

    Distance() {

        let suma = 0;
        for (let i = 0; i < this.state.list.length; i++) {
            suma = suma + this.state.list[i].distance;
        }
        return suma;
    }

    date() {
        var Today = new Date();
        var Month = Today.getMonth() + 1;
        var Year = Today.getFullYear();
        if (Month < 10)
            return Year + "-0" + Month;
        return Year + "-" + Month
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ period: this.textInput.value });
        this.whichData();
    }

    onChangePeriod(event) {
        this.setState({ periodOnChange: event.target.value });
    }

    whichData() {

        if (this.state.period.length === 0) {
            this.isEmpty();
        } else {
            this.getData();
        }
    }

    componentWillUpdate() {
        this.whichData();
    }

    componentDidMount() {
        this.getData();
    }


    getData() {
        fetch('http://localhost:8080/api/services/search/' + this.state.period)
            .then(results => results.json())
            .then(results => this.setState({ list: results }));
    }

    isEmpty() {
        fetch('http://localhost:8080/api/services')
            .then(results => results.json())
            .then(results => this.setState({ list: results }));
    }

    deleteButton(event) {
        event.preventDefault();
        fetch('http://localhost:8080/api/services/' + this.state.list[event.target.value].id, {
            method: 'DELETE'
        });
    }

    updateService(event) {
        event.preventDefault();
        this.setState({
            showUpdateForm: true,
            updateId: event.target.value,
            serviceType: this.state.list[event.target.value].serviceType,
            description: this.state.list[event.target.value].description,
            when: this.state.list[event.target.value].when,
            distance: this.state.list[event.target.value].distance
        });
    }

    updateToBack(event) {
        event.preventDefault();
        var url = 'http://localhost:8080/api/services/' + this.state.list[this.state.updateId].id;
        var data = {
            serviceType: this.serviceType.value,
            description: this.description.value,
            when: this.when.value,
            distance: this.distance.value
        };
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => this.setState({ showUpdateForm: false}));
    }

    pdfDownload(event) {
        event.preventDefault();
        fetch('http://localhost:8080/api/services/generatePdf/' + this.state.periodOnChange , {
            headers: {
                'Content-Type': 'application/pdf'
            },
            responseType: 'blob'
        }).then(response => response.blob())
            .then(blob => saveAs(blob, 'summary.pdf'))
    }

    cancelUpdate(event) {
        event.preventDefault();
        this.setState({
            showUpdateForm: false,
        });
    }

    handleChangeServiceType(event) {
        this.setState({ serviceType: event.target.value });
    }

    handleChangeDescription(event) {
        this.setState({ description: event.target.value });
    }

    handleChangeWhen(event) {
        this.setState({ when: event.target.value });
    }

    handleChangeDistance(event) {
        this.setState({ distance: event.target.value });
    }

    updateForm() {
        return (
            <div className="">
                <form className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <label>
                            <b className="btn btn-primary btn-lg" style={{ marginLeft: '20px' }}>{this.state.updateId}</b>
                        </label>
                        <label>
                            <input type="text" className="form-control" value={this.state.serviceType} onChange={this.handleChangeServiceType}
                                ref={(input) => this.serviceType = input} placeholder="servicetype" style={{ marginLeft: '20px' }}/>
                        </label>
                        <label>
                            <input type="text" className="form-control" value={this.state.description} onChange={this.handleChangeDescription}
                                ref={(input) => this.description = input} placeholder="description" style={{ marginLeft: '20px' }}/>
                        </label>
                        <label>
                            <input type="text" className="form-control" value={this.state.when} onChange={this.handleChangeWhen}
                                ref={(input) => this.when = input} placeholder="When" style={{ marginLeft: '20px' }}/>
                        </label>
                        <label>
                            <input type="text" className="form-control" value={this.state.distance} onChange={this.handleChangeDistance}
                                ref={(input) => this.distance = input} placeholder="distance" style={{ marginLeft: '20px' }}/>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2" onClick={this.updateToBack}>Confirm Date</button>
                    <button type="button" className="btn btn-primary mb-2" onClick={this.cancelUpdate} style={{ marginLeft: '20px' }}>Cancel</button>
                </form>
            </div>
        )

    }


    render() {
        return (
            <div>
                <div className="form-inline">
                    <form onSubmit={this.handleSubmit} className="form-inline">
                        <div className="form-group mx-sm-3 mb-2">
                            <label>
                                <input type="text" className="form-control" ref={(input) => this.textInput = input} placeholder={this.date()} onChange={this.onChangePeriod} />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary mb-2 ">{this.state.periodOnChange.length === 0 ? 'Show All' : 'Confirm Date'}</button>
                    </form>
                    <button type="button" className="btn btn-danger mb-2" onClick={this.pdfDownload} style ={{marginLeft: '10px'}}>Generate PDF</button>
                </div>
                <div>
                    {this.Distance() !== 0 ? <span className="text-light" style={{ margin: '20px' }}> Distance :  {this.Distance()} </span> : null} 
                </div>
                {this.state.showUpdateForm ? this.updateForm() : null}
                {this.state.list.length !== 0 ? (
                    <div className="table-margin ">
                        <table className="table table-striped table-dark ">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Who</th>
                                    <th scope="col">Service Type</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">When</th>
                                    <th scope="col">Distance</th>
                                    <th scope="col">Update </th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.list.map((item, index) =>
                                    <tr key={index}>
                                        <th scope='row'>{index}</th>
                                        <th>{item.who}</th>
                                        <th>{item.serviceType}</th>
                                        <th>{item.description}</th>
                                        <th>{item.when}</th>
                                        <th>{item.distance}</th>
                                        <th>
                                            <button type="button" value={index} className="btn btn-warning mb-2" onClick={this.updateService} >Update</button>
                                        </th>
                                        <th>
                                            <button type="button" value={index} className="btn btn-danger mb-2" onClick={this.deleteButton}  >Delete</button>
                                        </th>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                ) :
                    <span className="text-light" style={{ margin: '20px' }}>It's nothing to show</span>}
            </div>
        );
    }

}
export default Services;