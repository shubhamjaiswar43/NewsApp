import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
class App extends Component {
  pageSize = 20;
  apiKey = process.env.REACT_APP_NEWS_API_KEY;
  constructor(){
    super();
    this.state = {
      progress:0
    }
  }
  setProgress = (progress)=>{
    this.setState({
      progress:progress
    })
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar setCategory={this.setCategory} />
          <LoadingBar color='blue' height={3} progress={this.state.progress}/>
          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={this.pageSize} country="in" category='general' />} />
            <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pageSize={this.pageSize} country="in" category='sports' />} />
            <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' pageSize={this.pageSize} country="in" category='science' />} />
            <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={this.pageSize} country="in" category='technology' />} />
            <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' pageSize={this.pageSize} country="in" category='health' />} />
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' pageSize={this.pageSize} country="in" category='entertainment' />} />
            <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pageSize={this.pageSize} country="in" category='business' />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;