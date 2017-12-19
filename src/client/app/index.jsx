import React from 'react';
import ReactDOM from 'react-dom'; 
//import {ButtonFunction} from './button.jsx';
//var nameValue = document.getElementById("name").value;
//alert(nameValue);

var theUrl = "https://comicvine.gamespot.com/api/characters/?api_key=a251cc89a1ad9254fe0a1b7d11ef5a5c848577e7&filter=name:kate_bishop&format=JSON"
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

export class App extends React.Component {
    constructor(props) {
        super(props);
        var json_obj = JSON.parse(httpGet(theUrl));
        this.state = { name:json_obj.results[0].name, imgsrc : json_obj.results[0].image.medium_url};
        this.clicker1 = this.clicker1.bind(this);
    } 

    clicker1(){
        var nameValue = document.getElementById("name").value;
        //alert(nameValue);
        let theUrl1 =  "https://comicvine.gamespot.com/api/characters/?api_key=a251cc89a1ad9254fe0a1b7d11ef5a5c848577e7&filter=name:"+nameValue+"&format=JSON";
        let json_obj = JSON.parse(httpGet(theUrl1));
        this.setState({name:json_obj.results[0].name, imgsrc : json_obj.results[0].image.medium_url})
    }
    

    render() {
        return(
            <div class="container mt-5">
                <div class="row">
                    <div class="col-md-12 text-center mb-5">
                    <div class="card text-center mb-5" id="changing">
                        <img class="card-img-top" src="holder.js/100px180/" alt="" />
                        <div class="card-body">
                            <h4 class="card-title">{this.state.name}</h4>
                            <img src={this.state.imgsrc} />
                        </div>
                    </div>
                    </div>
                </div>
                <div class ='row'>
                <div class="col-md-12 text-center mb-5">
                    <button class="btn btn-dark"onClick={this.clicker1}>Search</button>
                </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('changing'));