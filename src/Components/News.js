import React,{Component} from 'react';
import NewsItem from './NewsItem';
import sample from '../sampleJSON';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
class News extends Component{
    page = 0;
    noOfPages = 1;
    size = 15;
    static defaultProps = {
        pageSize:15,
        country:'in',
        category:'general',
        language:'en'
    }
    static propTypes = {
        pageSize:PropTypes.number,
        country:PropTypes.string,
        category:PropTypes.string,
        language:PropTypes.string
    }
    shuffle = (array)=>{
        if(array!==undefined){
            for (var i = array.length - 1; i > 0; i--) { 
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        return array;
    }
    capatalize = (array)=>{
        return array[0].toUpperCase()+array.slice(1).toLowerCase();
    }
    constructor(props){
        super(props);    
        this.shuffle(sample.articles);
        this.state = {
            usingFetch:false,
            loading:true,
            articles:[],
            totalResults:0
        };
        if(this.props.category==='general'){
            document.title = `Home - News Monkey`
        }
        else{
            document.title = `${this.capatalize(this.props.category)} - News Monkey`
        }
    }
    updateNews = async ()=>{
        this.page++;
        this.props.setProgress(0);
        this.setState({
            loading:false
        })
        this.props.setProgress(10);
        if(this.state.usingFetch){
            let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&language=${this.props.language}&apiKey=${this.props.apiKey}&page=${this.page}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            this.props.setProgress(30);
            let parseData = await data.json();
            this.props.setProgress(50);
            this.setState({
                articles:this.state.articles.concat(parseData.articles),
                totalResults:parseData.totalResults
            });
            this.props.setProgress(70);
        }else{
            this.props.setProgress(30);
            this.noOfPages = Math.ceil(sample.totalResults/this.props.pageSize);
            this.props.setProgress(50);
            this.setState({
                articles:this.state.articles.concat(sample.articles.slice((this.page-1)*this.props.pageSize,this.props.pageSize*(this.page))),
                totalResults:sample.totalResults
            });
            this.props.setProgress(70);
        }
        this.props.setProgress(100);
    }
    componentDidMount(){
        this.updateNews();
    }
    goToTop = ()=>{
        window.scrollTo(0,0);
    }
    render(){
        return(
            <>
                    <h2 className='text-center' style={{marginTop:'90px'}}>{this.props.category==='general'?`News Monkey - Latest News`:`News Monkey - Top ${this.capatalize(this.props.category)} Headlines`}</h2>
                    {this.state.loading && <Spinner/>}
                    <InfiniteScroll style={{overflowY:'hidden'}}
                    dataLength={this.state.totalResults}
                    next={this.updateNews}
                    hasMore={this.state.articles.length<=this.state.totalResults}
                    >
                        <div className="container" id="main">
                            <div id="main" className='row my-4'>
                                {
                                    this.state.articles.map((ele,key)=>{
                                        return (
                                            <div key={key} className="col-md-4">
                                                <NewsItem urlToImage={ele.urlToImage} title={ele.title} description={ele.description} url={ele.url} date={ele.publishedAt} author={ele.author} name={ele.source.name}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </InfiniteScroll>
                <div className="container d-flex justify-content-start mb-4">
                    <button className="btn btn-outline-primary" onClick={this.goToTop} style={{color:'white'}}>Goto Top</button>
                </div>
            </>
        );
    }
}
export default News;