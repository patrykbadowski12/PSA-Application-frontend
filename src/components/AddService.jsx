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
            whoError:'',
            descriptionError:'',
            serviceError:'',
            whenError:'',
            distanceError: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleChangeWho(event) {
        this.setState({ who: event.target.value });
    }

    validateWho(){
        if(this.state.who.length <=11 )
            return "too short client name";
        return '';
    }
    handleChangeServiceType(event) {
        this.setState({ serviceType: event.target.value });
    }  

    validateServiceType(){
        if(this.state.serviceType.length <=10 )
            return"too short service name";
        return'';
        }
    
    handleChangeDescription(event) {
        this.setState({ description: event.target.value });
      
    } 

    validateDescription(){
        if(this.state.description.length <=10 )
            return "too short description name";
        return'';
    }

     handleChangeWhen(event) {
        this.setState({ when: event.target.value });
           
    }

    validateWhen(){
        if((parseInt(this.state.when.substring(0,4),10)>2000) && (parseInt(this.state.when.substring(0,4),10)<2150) && (parseInt(this.state.when.substring(5,7),10)<13) 
        && (parseInt(this.state.when.substring(5,7),10)>0) && (parseInt(this.state.when.substring(8,10),10)<32) && (parseInt(this.state.when.substring(8,10),10)>0))
            return '';
        return"date must be grater than 2000-00-00";
    }
    

    handleChangeDistance(event) {
        this.setState({ distance: event.target.value });
    }

    validateDistance(){
        if(this.state.distance <0 )
        return "invalid distance";
        return "";
    }


    componentDidMount() {
        this.getClientsList();
    
    }

    getClientsList() {
        fetch('http://localhost:8080/api/services/clients')
            .then(results => results.json())
            .then(results => this.setState({ listClients: results }));
    }

    responseAlert(){
        if(this.state.responseStatus === 200){
        return (<p className="btn btn-success">Success</p>);
        } else if(this.state.responseStatus ===400){
        return (<p className="btn btn-danger">Failed</p>);
        } else return '';

    }

    render() {
        return (
            <div>
                <div className="row justify-content-around " style={{margin: '10rem'}}>
                    <div className=" form p-3 mb-2 bg-secondary text-black">
                    <h1>Add Service </h1>
                        <form onSubmit={this.handleSubmit} className="form-group">
                            {this.responseAlert()}
                            <div className="form-group">
                                <label >Who </label>
                                <input list="browsers" className="form-control" value={this.state.who} onChange={this.handleChangeWho} />
                                <p>{this.validateWho()}</p>
                                <datalist id="browsers">
                                    {this.state.listClients.map((item, index) =>
                                        <option key={index} value={item} />)}
                                </datalist>
                            </div>
                            <label>Service type</label>
                            <input type="text" className="form-control" value={this.state.serviceType} onChange={this.handleChangeServiceType} />
                            <p>{this.validateServiceType()}</p>

                            <label>Description</label>
                            <input type="text" className="form-control" value={this.state.description} onChange={this.handleChangeDescription} />
                            <p>{this.validateDescription()}</p>
                            

                            <label>When</label>
                            <input type="text" className="form-control" value={this.state.when} onChange={this.handleChangeWhen} />
                            <p>{this.validateWhen()}</p> 

                            <label>Distance</label>
                            <input type="text" className="form-control" value={this.state.distance} onChange={this.handleChangeDistance} />
                            <p>{this.validateDistance()}</p>
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