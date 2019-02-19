import React from 'react';
import '../index';
import '../index.css';
import '../styles/LoginStyle.css'



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
            listClients: []
        };

        this.sendData = this.sendData.bind(this);
        this.handleChangeWho = this.handleChangeWho.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeDistance = this.handleChangeDistance.bind(this);
        this.handleChangeServiceType = this.handleChangeServiceType.bind(this);
        this.handleChangeWhen = this.handleChangeWhen.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        setTimeout(()=> this.setState({responseStatus: 0}), 5000);
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
            method: 'POST', 
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(results => this.setState({
            responseStatus: results.status
        }));
    }

    responseAlert() {
        if (this.state.responseStatus === 200) {
            return (<p className="btn btn-success">Success</p>);
        } else if (this.state.responseStatus === 400) {
            return (<p className="btn btn-danger">Failed</p>);
        } else return '';
    }


    handleChangeWho(event) {
        this.setState({ who: event.target.value });
    }

    validateWho() {
        if (this.state.who.length <= 11)
            return "too short client name";
        return '';
    }
    handleChangeServiceType(event) {
        this.setState({ serviceType: event.target.value });
    }

    validateServiceType() {
        if (this.state.serviceType.length <= 10)
            return "too short service name";
        return '';
    }

    handleChangeDescription(event) {
        this.setState({ description: event.target.value });

    }

    validateDescription() {
        if (this.state.description.length <= 10)
            return "too short description name";
        return '';
    }

    handleChangeWhen(event) {
        this.setState({ when: event.target.value });

    }

    validateWhen() {
        if ((parseInt(this.state.when.substring(0, 4), 10) > 2000) && (parseInt(this.state.when.substring(0, 4), 10) < 2150) && (parseInt(this.state.when.substring(5, 7), 10) < 13)
            && (parseInt(this.state.when.substring(5, 7), 10) > 0) && (parseInt(this.state.when.substring(8, 10), 10) < 32) && (parseInt(this.state.when.substring(8, 10), 10) > 0))
            return '';
        return "date must be grater than 2000-00-00";
    }

    handleChangeDistance(event) {
        this.setState({ distance: event.target.value });
    }

    validateDistance() {
        if (this.state.distance < 0)
            return "invalid distance";
        return "";
    }


    componentDidMount(){
        /*fetch('http://localhost:8080/api/services/clients')
            .then(results => results.json())
            .then(results => this.setState({ listClients: results }));
            
            this.state.listClients.forEach(element => {
        */
    };


    render() {
        return (
            <div>
                 <section className="login-block">
                 <div className="container">
                 <div className="row ">
                    <div className="col login-sec">
                        <h2 className="text-center">Add Service </h2>
                        <form onSubmit={this.handleSubmit} className="login-form">
                            {this.responseAlert()}
                            <div className="form-group">
                            <label className="text-uppercase">Who</label>
                                <input list="browsers" className="form-control" value={this.state.who} onChange={this.handleChangeWho} />
                                <p>{this.validateWho()}</p>
                            </div>
                            <label className="text-uppercase">Service type</label>
                            <input type="text" className="form-control" value={this.state.serviceType} onChange={this.handleChangeServiceType} />
                            <p>{this.validateServiceType()}</p>

                            <label className="text-uppercase">Description</label>
                            <input type="text" className="form-control" value={this.state.description} onChange={this.handleChangeDescription} />
                            <p>{this.validateDescription()}</p>


                            <label className="text-uppercase">When</label>
                            <input type="text" className="form-control" value={this.state.when} onChange={this.handleChangeWhen} />
                            <p>{this.validateWhen()}</p>

                            <label className="text-uppercase">Distance</label>
                            <input type="text" className="form-control" value={this.state.distance} onChange={this.handleChangeDistance} />
                            <p>{this.validateDistance()}</p>
                            <br></br>
                            <input type="submit" value="Submit"  className="btn btn-login float-right" />
                        </form>
                    </div>
                </div>
            </div>
            </section>
            </div>
        );
    }
}

export default AddService;
/*
<div >
                <section className="login-block">
                    <div className="container">
                        <div className="row ">
                            <div className="col login-sec">
                                <h2 className="text-center">Add Service</h2>
                                <form className="login-form">
                                    <div className="form-group">
                                        <label className="text-uppercase">Username</label>
                                        <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmail} />

                                        <input type="submit" value="Submit" className="btn btn-login float-right" onClick={this.sendEmail} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>*/