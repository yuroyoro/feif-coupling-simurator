import React from "react";

import UnitMixin from "./UnitMixin.js";
import UnitName  from "./UnitName.jsx";
import Store     from "../stores/Store.js";

const Couple = React.createClass({
  mixins: [UnitMixin],

  onClick(unit) {
    console.log("click");
    console.log(unit);

    Store.toggle(unit.name);
  },

  render() {
    var unit    = this.props.unit;
    var husband = unit.husband;
    var child   = null;
    if( this.props.child ) {
      child = Store.computeChild(husband, unit, this.props.child);
    } else {
      child = Store.computeChild(unit, husband);
    }

    var styles = "";

    if( unit.selected ){
      styles += " active";
    }

    var params = this.paramCells(child);

    if( this.props.child ) {
      return (
        <tr className={ styles } onClick={ () => this.onClick(unit) }>
          <UnitName unit={ child } />
          { this.classesCell(child, "unit classes") }
          { params }
        </tr>
      );
    }
    return (
      <tr className={ styles } onClick={ () => this.onClick(unit) }>
        <UnitName unit={ unit } rowSpan={ this.props.rowspan } />
        { this.classesCell(unit, "unit classes", this.props.rowspan) }
        <UnitName unit={ husband } rowSpan={ this.props.rowspan } />
        { this.classesCell(husband, "unit classes", this.props.rowspan) }
        <UnitName unit={ child } />
        { this.classesCell(child, "unit classes") }
        { params }
      </tr>
    );
  },
});

export default Couple;
