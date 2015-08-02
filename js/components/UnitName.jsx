import React from "react";

const UnitName = React.createClass({
  render() {
    var unit = this.props.unit;
    if( !unit ) {
      return <td className={ "unit " + (this.props.style || "") } rowSpan={ this.props.rowSpan } >--</td>;
    }

    var style = " male";
    var norbleicon = null;

    if(unit.sex == "F") {
      style = " female";
    }
    if( unit.norble ) {
      norbleicon = <span className="glyphicon glyphicon-king norbleicon" ></span>;
    }
    return (
      <td className={ "unit " + (this.props.style || "") + style } rowSpan={ this.props.rowSpan }>{ unit.name }{ norbleicon }</td>
    );
  },
});

export default UnitName;
