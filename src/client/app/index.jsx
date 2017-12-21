import React from 'react';
import ReactDOM from 'react-dom'; 
//import {ButtonFunction} from './button.jsx';
//var nameValue = document.getElementById("name").value;
//alert(nameValue);

var theUrl = "https://comicvine.gamespot.com/api/characters/?api_key=a251cc89a1ad9254fe0a1b7d11ef5a5c848577e7&filter=name:kate_bishop&format=JSON"
//var theUrlXML = "https://comicvine.gamespot.com/api/characters/?api_key=a251cc89a1ad9254fe0a1b7d11ef5a5c848577e7&filter=name:kate_bishop"

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
        //var xml_obj = httpGet(theUrlXML)
        this.state = { name:[json_obj.results[0].name], imgsrc : [json_obj.results[0].image.medium_url], totaldata : json_obj, index:0, expansion: false};
        this.clicker1 = this.clicker1.bind(this);
        this.expand = this.expand.bind(this);
    } 

    clicker1(){
        var nameValue = document.getElementById("name").value;
        //alert(nameValue);
        let theUrl1 =  "https://comicvine.gamespot.com/api/characters/?api_key=a251cc89a1ad9254fe0a1b7d11ef5a5c848577e7&filter=name:"+nameValue+"&format=JSON";
        var json_obj = JSON.parse(httpGet(theUrl1));
        this.setState({totaldata : json_obj})
        var nameq = [];
        var imgsrcq =[];
        for(let i =0; i<10 && i< json_obj.number_of_total_results; i++){
            nameq.push(json_obj.results[i].name);
            imgsrcq.push(json_obj.results[i].image.icon_url)
        }
        //alert(nameq);
        this.setState({name:nameq, imgsrc : imgsrcq, expansion: false})
        
    }

    expand(index){
        this.setState({index: index, expansion: true})
    }
   

    render() {
        const op2 = this.state.imgsrc;
        if (!this.state.expansion){
            var name23 = this.state.name.map((name1234, index)=>{
                const imgr= op2[index];
                return (
                <div class="card text-center mb-5" onClick={()=>this.expand(index)}>
                <img class="card-img-top" src="holder.js/100px180/" alt="" />
                    <div class="card-body">
                    <div class='row'>
                        <div class="col-2">
                            <img src={imgr} class="img-thumbnail img-fluid" />
                        </div>
                        <div class="col-7">
                                <h4 class="text-left">{name1234}</h4>
                        </div>
                    </div>
                    </div>
                </div>
                )
            })
        }else {
            var name1234 = this.state.totaldata.results[this.state.index].name;
            var imgr = this.state.totaldata.results[this.state.index].image.medium_url
            var res = this.state.totaldata.results[this.state.index].description.replace(/<noscript>/g, " ");
            var final = res.replace(/<\/noscript>/g, " ");
            var name23 = 
            <div>
            <div class="card text-left">
                    <img class="card-img-top" src="holder.js/100px180/" alt="" />
                    <div class="card-body">
                        <div class="row">
                            <div class="col-5">
                                <img src={imgr} class="img-fluid" />
                            </div>
                            <div class="col-7">
                                <h4 class="text-center">{name1234}</h4>
                                <br />
                                <p>
                                    <span class="text-muted">Real Name: </span>{this.state.totaldata.results[this.state.index].real_name}</p>
                                <b4 />
                                <p>
                                    <span class="text-muted">Aliases: </span>{this.state.totaldata.results[this.state.index].aliases}</p>
                                <b4 />
                                <p><span class="text-muted">Description: </span>{this.state.totaldata.results[this.state.index].deck}</p>
                                <b4 />
                                <p><span class="text-muted">Origin: </span></p>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div class="card text-left mt-5">
                            <img class="card-img-top" src="holder.js/100px180/" alt="" />
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div dangerouslySetInnerHTML={{ __html: final} } />
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
                
            
            
        }
        return(
        <div class="container mt-5">
            <div class ='row'>
                <div class="col-md-12 text-center mb-5">
                    <button class="btn btn-dark" onClick={this.clicker1}>Search</button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 text-center mb-5">
                        {name23}
                </div>
            </div>
        </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('changing'));