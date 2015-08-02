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

    var firstCell = null;
    if( this.props.first ) {
      firstCell = <td className="unit first" rowSpan={ this.props.rowspan } colSpan="2">候補</td>;
    }

    var params = this.paramCells(child);

    return (
      <tr className={ styles } onClick={ this.onClick }>
        { firstCell }
        <UnitName unit={ husband } />
        { this.classesCell(husband, "unit classes") }
        <UnitName unit={ child } />
        { this.classesCell(child, "unit classes") }
        { params }
      </tr>
    );
  },
});

export default Candidate;
