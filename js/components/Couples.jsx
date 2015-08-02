import React from "react";

import Couple    from "./Couple.jsx";
import Candidate from "./Candidate.jsx";
import Store     from "../stores/Store.js";

const Couples = React.createClass({

  candidates(unit) {
    var candidates = Store.candidates(unit);
    var result = [];
    var rowspan = candidates.length + candidates.filter((unit) => unit.child).length;

    candidates.forEach((husband, i) => {
      if( husband.child ) {
        result.push(<Candidate
          unit    = { unit                          }
          husband = { husband                       }
          first   = { i == 0                        }
          rowspan = { rowspan                       }
          rowspan2= "2"
          key     = { `${unit.name}&${husband.name}`}
        />);

        result.push(<Candidate
          unit    = { unit                          }
          husband = { husband                       }
          child   = { husband.child                 }
          first   = { false                         }
          rowspan = { rowspan                       }
          hideunit= { true                          }
          key     = { `${unit.name}&${husband.name}-child`}
        />);
      } else {
        result.push(<Candidate
          unit    = { unit                          }
          husband = { husband                       }
          first   = { i == 0                        }
          rowspan = { rowspan                       }
          key     = { `${unit.name}&${husband.name}`}
        />);
      }
    });

    return result;
  },

  render() {
    var couples = [];
    for(var i = 0; i < this.props.units.length; i++) {
      var unit = this.props.units[i];
      var rowspan = 1;
      if( unit.husband && unit.husband.child ) {
        rowspan = 2;
      }

      couples.push(
        <Couple
          unit={ unit }
          rowspan= { rowspan }
          key={ unit.name }
        />
      );
      if( unit.husband && unit.husband.child ) {
        couples.push(
          <Couple
            unit={ unit }
            rowspan= { rowspan }
            child={ unit.husband.child }
            key={ unit.name + ":" + unit.husband.child }
          />
        );
      }
      if( unit.selected ) {
        couples = couples.concat(this.candidates(unit));
      }
    }

    return (
      <table className="units table table-bordered">
        <thead>
          <tr>
            <th className="unit male" colSpan="2">親1</th>
            <th className="unit female" colSpan="2">親2</th>
            <th className="unit " colSpan="2">子</th>
            <th className="parameter">HP</th>
            <th className="parameter">力</th>
            <th className="parameter">魔力</th>
            <th className="parameter">技</th>
            <th className="parameter">速さ</th>
            <th className="parameter">幸運</th>
            <th className="parameter">守備</th>
            <th className="parameter">魔防</th>
          </tr>
        </thead>
        <tbody>
          { couples }
        </tbody>
      </table>
    );
  },
});

export default Couples;
