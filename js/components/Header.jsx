import React from "react";
import Store from "../stores/Store.js";
import Units from "../stores/Units.js";

export default React.createClass({

  buttonGroup(values, selected, handler) {
    var buttons = values.map((v) => {
      var style = "btn";
      if( v == selected ) {
        style += " btn-primary";
      } else {
        style += " btn-default";
      }

      return <button type="button" className={ style } onClick={ () => handler(v) } key= { v } >{ v } </button>;
    });

    return (
      <div className="btn-group" role="group" >
        { buttons }
      </div>
    );
  },

  selection(values, selected, handler) {
    var options = values.map((v) => {
      return <option value={ v } key= { v }>{ v }</option>;
    });

    return (
      <select className="form-control" defaultValue={ selected } onChange={(e) => handler(e.target.value) }>
        { options }
      </select>
    );
  },

  changeRoute(route) {
    Store.changeRoute(route);
  },

  changeSex(sex) {
    var s = "";
    switch(sex) {
    case "男":
      s = "M";
      break;
    case "女":
      s = "F";
      break;
    }
    Store.changeSex(s);
  },

  changeAdvantage(v) {
    Store.changeAdvantage(v, false);
  },

  changeDisAdvantage(v) {
    Store.changeAdvantage(v, true);
  },

  changeKlass(v) {
    Store.changeKlass(v, true);
  },

  reset() {
    Store.reset();
  },

  render() {

    var myunit = this.props.myunit;
    var sex = "男";
    if( myunit.sex == "F" ) sex = "女";

    return (
      <div className="header row">
        <div className="col-md-3" >
          <h5>ルート</h5>
          { this.buttonGroup(["白夜", "暗夜", "透魔"], this.props.route, this.changeRoute) }
        </div>

        <div className="col-md-9" >
          <h5>マイユニット</h5>
          <form className="form-inline">
            <div className="form-group">
              <label>性別</label>
              { this.buttonGroup(["男", "女"], sex, this.changeSex) }
            </div>

            <div className="form-group">
              <label>長所</label>
              { this.selection(Object.keys(Units.advantageSelection), this.props.myunit.advantage, this.changeAdvantage) }
            </div>

            <div className="form-group">
              <label>短所</label>
              { this.selection(Object.keys(Units.disadvantageSelection), this.props.myunit.disadvantage, this.changeDisAdvantage) }
            </div>

            <div className="form-group">
              <label>素質</label>
              { this.selection(Object.keys(Units.classSelection), this.props.myunit.advantage, this.changeKlass ) }
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-warning btn-sm" onClick={ this.reset } >Reset</button>
            </div>
          </form>
        </div>
      </div>
    );
  },
});
