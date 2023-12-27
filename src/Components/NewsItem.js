import React,{Component} from 'react';

class NewsItem extends Component{
    render(){
        const styleForMainDiv = {
            backgroundColor:'rgb(75, 75, 75)',
            color:'white',width: '18rem',
        }
        return (
            <div className="card my-3" style={styleForMainDiv}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{left:'90%',zIndex:'1'}}>{this.props.name}</span>
                <img src={this.props.urlToImage} className="card-img-top" style={{width:'100%',height:'150px'}} alt=""/>
                <div className="card-body" style={{width:'300px',height:'200px',overflowY:'auto'}}>
                    <details>
                        <summary className="card-title">{this.props.title}</summary>
                        <p className="card-text">{this.props.description}</p>
                    </details>
                    <a href={this.props.url} rel="noreferrer" target="_blank" className="btn btn-outline-primary" style={{color:'white'}}>Read More</a>
                </div>
                <p className="text-center my-0 mx-1">By {this.props.author?this.props.author:'Unknown'} On {new Date(this.props.date).toGMTString()}</p>
            </div>
        )
    }
}

export default NewsItem;