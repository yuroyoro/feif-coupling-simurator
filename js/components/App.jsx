import React from "react";

import Couples from "./Couples.jsx";
import Females from "./Females.jsx";
import Header  from "./Header.jsx";
import Store   from "../stores//Store.js";


const App = React.createClass({

  getInitialState() {
    return Store.getState();
  },

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },

  _onChange(){
    this.setState(Store.getState());
  },

  isDisplay(route) {
    if ((route == this.state.route) || (this.state.route == "透魔") ) {
      return "show";
    }
    return "hide";
  },

  render() {
    var commons = this.state.commons;
    var lights  = this.state.lights;
    var darks   = this.state.darks;

    return (
      <div className="container">
        <Header
          route={ this.state.route }
          myunit= { this.state.myunit }
        />

        <div className="row">
          <div className="col-md-12" >
            <h5>共通</h5>
            <div className="col-md-9" >
              <Couples units={ commons.males }/>
            </div>
            <div className="col-md-3" >
              <Females units={ commons.females }/>
            </div>
          </div>

          <div className={ "col-md-12 " + this.isDisplay("白夜") }>
            <h5>白夜</h5>
            <div className="col-md-9" >
              <Couples units={ lights.males }/>
            </div>
            <div className="col-md-3" >
              <Females units={ lights.females }/>
            </div>
          </div>

          <div className={ "col-md-12 " + this.isDisplay("暗夜") }>
            <h5>暗夜</h5>
            <div className="col-md-9" >
              <Couples units={ darks.males }/>
            </div>
            <div className="col-md-3" >
              <Females units={ darks.females }/>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default App;
