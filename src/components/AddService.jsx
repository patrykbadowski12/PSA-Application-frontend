import React from 'react';
import '../index';
import '../index.css';



class AddService extends React.Component {
    constructor() {
        super();
        this.state = {
            who: '',
            serviceType: '',
            description: '',
            when: '',
            distance: 0,
            responseStatus: 0,
            client: '',
            listClients: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeWho = this.handleChangeWho.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeDistance = this.handleChangeDistance.bind(this);
        this.handleChangeServiceType = this.handleChangeServiceType.bind(this);
        this.handleChangeWhen = this.handleChangeWhen.bind(this);

    }



    handleSubmit(event) {
        event.preventDefault();
        this.sendData();

        this.setState({
            who: '',
            serviceType: '',
            description: '',
            when: '',
            distance: 0,
        })

    }

    sendData() {
        var url = 'http://localhost:8080/api/services';
        var data = {
            who: this.state.who,
            serviceType: this.state.serviceType,
            description: this.state.description,
            when: this.state.when,
            distance: this.state.distance
        };
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(results => this.setState({
            list: results,
            responseStatus: results.status
        }));

    }

    handleChange(event) {
        this.setState({ client: event.target.value });
    }
    handleChangeWho(event) {
        this.setState({ who: event.target.value });
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

    componentDidMount() {
        this.getClientsList();
    }

    getClientsList() {
        fetch('http://localhost:8080/api/services/clients')
            .then(results => results.json())
            .then(results => this.setState({ listClients: results }));
    }




    render() {
        return (
            <div>
                <div className="row justify-content-around " style={{margin: '10rem'}}>

                    <div className=" form p-3 mb-2 bg-secondary text-black">
                        <form onSubmit={this.handleSubmit} className="form-group">

                            <div className="form-group">
                                <label >Who </label>
                                <input list="browsers" className="form-control" value={this.state.who} onChange={this.handleChangeWho} />
                                <datalist id="browsers">
                                    {this.state.listClients.map((item, index) =>
                                        <option key={index} value={item} />)}
                                </datalist>
                            </div>
                            <label>Service type</label>
                            <input type="text" className="form-control" value={this.state.serviceType} onChange={this.handleChangeServiceType} />

                            <label>Description</label>
                            <input type="text" className="form-control" value={this.state.description} onChange={this.handleChangeDescription} />

                            <label>When</label>
                            <input type="text" className="form-control" value={this.state.when} onChange={this.handleChangeWhen} />

                            <label>Distance</label>
                            <input type="text" className="form-control" value={this.state.distance} onChange={this.handleChangeDistance} />
                            <br></br>
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddService;