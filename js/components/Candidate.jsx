import React from "react";

import UnitMixin from "./UnitMixin.js";
import UnitName  from "./UnitName.jsx";
import Store     from "../stores/Store.js";

const Candidate = React.createClass({
  mixins: [UnitMixin],

  onClick(event) {
    var unit  = this.props.unit;
    var husband = this.props.husband;

    if( husband.husband ) {
      if( husband.husband.name == unit.name ) {
        Store.unselect(unit);
      } else {
        event.preventDefault();
      }
      return ;
    }

    console.log("select");
    console.log(unit);
    console.log(husband);

    Store.select(unit, husband);
  },

  render() {
    var unit    = this.props.unit;
    var husband = this.props.husband;
    var child   = null ;
    if( this.props.child ) {
      child = Store.computeChild(husband, unit, this.props.child);
    } else {
      child = Store.computeChild(unit, husband);
    }

    var styles = "candidate";

    if( husband.husband ) {
      if( husband.husband.name == unit.name ) {
        styles += " active";
      } else {
        styles += " disabled";
      }
    }

    var cell1 = null;
    var cell2 = null;
    var cell3 = null;
    if( this.props.first ) {
      cell1 = <td className="unit first" rowSpan={ this.props.rowspan } colSpan="2">候補</td>;
    }
    if( !this.props.hideunit ) {
      var rowspan2 = this.props.rowspan2 || 1 ;
      cell2 = <UnitName unit={ husband } rowSpan={ rowspan2 }/>;
      cell3 = this.classesCell(husband, "unit classes", rowspan2);
    }
    var params = this.paramCells(child);


    return (
      <tr className={ styles } onClick={ this.onClick }>
        { cell1 }
        { cell2 }
        { cell3 }
        <UnitName unit={ child } />
        { this.classesCell(child, "unit classes") }
        { params }
      </tr>
    );
  },
});

export default Candidate;
