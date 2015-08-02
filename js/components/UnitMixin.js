import React from "react";

export default {

  classesCell(unit, style, rowspan) {
    var classes = ((unit && unit.classes) || []).map((c) => {
      var style = "label label-" + this.classColors[c];
      return <div key={ c }><span className={ style } >{ c }</span></div>;
    });

    return (
      <td className={ style } rowSpan={ rowspan || 1 } >
        { classes }
      </td>
    );
  },

  paramCells(unit) {
    return unit.prate.map((r, i) => {
      var m = 0;
      if( i > 0 ) m = unit.pmax[i - 1];
      var ms = "" + m;
      var style = "";
      if( m > 0 ) {
        ms = "+" + ms;
        style = "plus";
      }
      if( m == 0 ) {
        ms = "\u00A0";
      }
      if (m < 0 ) {
        style = "minus";
      }

      return(
        <td className="parameter" key={i}>
          <div className={ style }>{ ms }</div>
          <div>{ r }</div>
        </td>
      );
    });
  },

  classColors: {
    "ダークプリンス"   : "default",
    "ダークプリンセス" : "default",
    "侍"               : "primary",
    "鬼人"             : "primary",
    "槍術士"           : "primary",
    "呪い師"           : "success",
    "修験者"           : "success",
    "巫女"             : "success",
    "天馬武者"         : "info",
    "弓使い"           : "warning",
    "忍"               : "danger",
    "薬商人"           : "danger",
    "村人"             : "default",
    "妖狐"             : "default",
    "歌姫"             : "default",
    "ソシアルナイト"   : "primary",
    "アーマーナイト"   : "primary",
    "アクスファイター" : "primary",
    "マーシナリー"     : "primary",
    "シーフ"           : "warning",
    "ドラゴンナイト"   : "info",
    "ロッドナイト"     : "success",
    "ダークマージ"     : "success",
    "ガルー"           : "default",
  },
};
