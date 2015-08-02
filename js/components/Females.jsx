import React from "react";

import UnitMixin from "./UnitMixin.js";
import UnitName  from "./UnitName.jsx";

export default React.createClass({
  mixins: [UnitMixin],

  render() {
    var units = this.props.units.map((unit) => {
      var styles = "";
      if( unit.husband ) styles = "disabled";

      return (
        <tr className={ styles } key={ unit.name }>
          <UnitName unit={ unit } />
          { this.classesCell(unit, "unit classes") }
        </tr>

      );
    });

    return (
      <table className="units table table-bordered">
        <thead>
          <tr>
            <th className="unit female" colSpan="2">母</th>
          </tr>
        </thead>
        <tbody>
          { units }
        </tbody>
      </table>
    );
  },
});
