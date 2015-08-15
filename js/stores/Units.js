
const Units = {
  classSelection:  {
    "騎士":     { klass: "ソシアルナイト",   spclass: "忍"},
    "重装騎士": { klass: "アーマーナイト",   spclass: "槍術士"},
    "斧戦士":   { klass: "アクスファイター", spclass: null},
    "傭兵":     { klass: "マーシナリー",     spclass: null},
    "盗賊":     { klass: "シーフ",           spclass: null},
    "侍":       { klass: "侍",               spclass: "マーシナリー"},
    "鬼人":     { klass: "鬼人",             spclass: "アクスファイター"},
    "槍術士":   { klass: "槍術士",           spclass: null},
    "呪い師":   { klass: "呪い師",           spclass: "ダークマージ"},
    "修験者":   { klass: "修験者",           spclass: null},
    "巫女":     { klass: "巫女",             spclass: null},
    "天馬武者": { klass: "天馬武者",         spclass: "ドラゴンナイト"},
    "弓使い":   { klass: "弓使い",           spclass: null},
    "竜騎士":   { klass: "ドラゴンナイト",   spclass: "天馬武者"},
    "忍":       { klass: "忍",               spclass: null},
    "薬商人":   { klass: "薬商人",           spclass: null},
    "魔道士":   { klass: "ダークマージ",     spclass: "呪い師"},
    "杖騎士":   { klass: "ロッドナイト",     spclass: null},
  },

  advantageSelection:  {
    "健康":       { pmax: [ 1, 1, 0, 0, 2, 2, 2], prate: [+15,  0,  0,  0,  0,  0, +5, +5 ] },
    "力持ち":     { pmax: [ 4, 0, 2, 0, 0, 2, 0], prate: [  0, +15,  0, +5,  0,  0, +5,  0] },
    "頭が良い":   { pmax: [ 0, 4, 0, 2, 0, 0, 2], prate: [  0,  0, +20,  0, +5,  0,  0, +5] },
    "手先が器用": { pmax: [ 2, 0, 4, 0, 0, 2, 0], prate: [  0, +5,  0, +25,  0,  0, +5,  0] },
    "素早い":     { pmax: [ 0, 0, 2, 4, 2, 0, 0], prate: [  0,  0,  0, +5, +15, +5,  0,  0] },
    "運が良い":   { pmax: [ 2, 2, 0, 0, 4, 0, 0], prate: [  0, +5, +5,  0,  0, +25,  0,  0] },
    "打たれ強い": { pmax: [ 0, 0, 0, 0, 2, 4, 2], prate: [  0,  0,  0,  0,  0, +5, +10, +5] },
    "冷静沈着":   { pmax: [ 0, 2, 0, 2, 0, 0, 4], prate: [  0,  0, +5,  0, +5,  0,  0, +10] },
  },

  disadvantageSelection:  {
    "病弱":       { pmax: [-1, -1,  0,  0, -1, -1, -1], prate: [-10,  0,  0,  0,  0,  0, -5, -5 ]},
    "非力":       { pmax: [-3,  0, -1,  0,  0, -1,  0], prate: [  0, -10,  0, -5,  0,  0, -5,  0]},
    "鈍感":       { pmax: [ 0, -3,  0, -1,  0,  0, -1], prate: [  0,  0, -15,  0, -5,  0,  0, -5]},
    "ドジ":       { pmax: [-1,  0, -3,  0,  0, -1,  0], prate: [  0, -5,  0, -20,  0,  0, -5,  0]},
    "怠け者":     { pmax: [ 0,  0, -1, -3, -1,  0,  0], prate: [  0,  0,  0, -5, -10, -5,  0,  0]},
    "運が悪い":   { pmax: [-1, -1,  0,  0, -3,  0,  0], prate: [  0, -5, -5,  0,  0, -20,  0,  0]},
    "打たれ弱い": { pmax: [ 0,  0,  0,  0, -1, -3, -1], prate: [  0,  0,  0,  0,  0, -5, -10, -5]},
    "暴走しがち": { pmax: [ 0, -1,  0, -1,  0,  0, -3], prate: [  0,  0, -5,  0, -5,  0,  0, -10]},
  },

  myunit(options) {
    var s = "(男)";
    var cs = "(女)";
    var c = "ダークプリンス";
    if(options.sex == "F") {
      s = "(女)";
      cs = "(男)";
      c = "ダークプリンセス";
    }

    var cls = this.classSelection[options.klass];

    var adv = this.advantageSelection[options.advantage];
    var dis = this.disadvantageSelection[options.disadvantage];

    var pmax  = adv.pmax.map((v, i)  => v + dis.pmax[i]);
    var prate = [45, 45, 30, 40, 45, 45, 35, 25];
    prate = prate.map((v, i) => v + adv.prate[i] + dis.prate[i]);

    return {
      name    : "マイユニット" + s,
      type    : "common",
      sex     : options.sex,
      norble  : true,
      classes : [c, cls.klass],
      pmax    : pmax,
      prate   : prate,
      child   : "カンナ" + cs,
      myunit  : true,
    };
  },

  males() {
    var males = [
      // 共通
      {  name: "ジョーカー", type: "common", sex: "M", norble: false, classes:["ロッドナイト",     "ソシアルナイト"   ], pmax: [ 2,-2, 2, 0,-1, 0,-1], prate: [50,30,15,40,35,45,25,25], child: "ディーア"     },
      {  name: "サイラス",   type: "common", sex: "M", norble: false, classes:["ソシアルナイト",   "マーシナリー"     ], pmax: [ 1, 0, 2, 0,-1, 0,-1], prate: [40,45, 5,50,40,40,40,25], child: "ゾフィー"     },
      {  name: "スズカゼ",   type: "common", sex: "M", norble: false, classes:["忍",               "侍"               ], pmax: [-2, 0, 2, 3,-2,-1, 1], prate: [55,40, 0,45,65,20,20,35], child: "ミドリコ"     },
      // 白夜
      {  name: "リョウマ",   type: "light",  sex: "M", norble: true,  classes:["侍",               "天馬武者"         ], pmax: [ 1, 0, 2, 1, 1,-2,-2], prate: [50,45, 0,50,45,40,35,25], child: "シノノメ"     },
      {  name: "タクミ",     type: "light",  sex: "M", norble: true,  classes:["弓使い",           "槍術士"           ], pmax: [ 1, 0, 3,-2, 1, 0,-2], prate: [50,35, 0,60,40,45,35,20], child: "キサラギ"     },
      {  name: "ツバキ",     type: "light",  sex: "M", norble: false, classes:["天馬武者",         "侍"               ], pmax: [-1, 0, 2,-2,-1, 3,-1], prate: [55,30,20,50,20,25,45, 5], child: "マトイ",       special:["ルーナ", "ニュクス" ] },
      {  name: "サイゾウ",   type: "light",  sex: "M", norble: false, classes:["忍",               "侍"               ], pmax: [ 1, 0, 3,-2, 0, 1,-2], prate: [40,50,45,60,30,55,45,10], child: "グレイ",       special:["ベルカ", "シャーロッテ" ] },
      {  name: "アサマ",     type: "light",  sex: "M", norble: false, classes:["修験者",           "薬商人"           ], pmax: [ 2,-3, 0, 1, 0, 1, 0], prate: [55,50,20,40,45,40,40,20], child: "ミタマ",       special:["ベルカ", "エルフィ" ] },
      {  name: "ツクヨミ",   type: "light",  sex: "M", norble: false, classes:["呪い師",           "鬼人"             ], pmax: [ 0, 1,-1, 2, 1,-1,-1], prate: [50,30,40,30,45,60,40,20], child: "シャラ",       special:["エルフィ", "ニュクス" ] },
      {  name: "ヒナタ",     type: "light",  sex: "M", norble: false, classes:["侍",               "鬼人"             ], pmax: [ 1, 0,-1,-2, 0, 2, 0], prate: [55,35, 0,25,15,45,45,15], child: "ヒサメ",       special:["ビエリ", "ルーナ" ] },
      {  name: "ニシキ",     type: "light",  sex: "M", norble: false, classes:["妖狐",             "呪い師"           ], pmax: [ 1, 0,-3, 2, 1,-2, 2], prate: [45,40,10,25,45,50,35,40], child: "キヌ",         special:["ビエリ", "シャーロッテ" ] },
      // 暗夜
      {  name: "マークス",   type: "dark",   sex: "M", norble: true,  classes:["ソシアルナイト",   "ドラゴンナイト"   ], pmax: [ 2,-1,-1,-1, 2, 1,-2], prate: [45,50, 5,40,35,60,40,15], child: "ジークベルト" },
      {  name: "レオン",     type: "dark",   sex: "M", norble: true,  classes:["ダークマージ",     "ロッドナイト"     ], pmax: [-2, 2, 0,-2, 0, 0, 2], prate: [45,25,55,35,45,45,30,45], child: "フォレオ"     },
      {  name: "オーディン", type: "dark",   sex: "M", norble: false, classes:["ダークマージ",     "侍"               ], pmax: [ 0, 1, 1,-1, 1, 0,-1], prate: [55,35,30,55,35,60,40,20], child: "オフェリア",   special:["オロチ", "カゲロウ" ] },
      {  name: "ゼロ",       type: "dark",   sex: "M", norble: false, classes:["シーフ",           "ダークマージ"     ], pmax: [-2, 0,-1, 3, 0, 0, 1], prate: [40,35,20,40,50,30,30,40], child: "エポニーヌ",   special:["セツナ", "オボロ" ] },
      {  name: "ラズワルド", type: "dark",   sex: "M", norble: false, classes:["マーシナリー",     "忍"               ], pmax: [ 1, 0, 2,-1, 1,-1,-1], prate: [50,45, 0,45,30,55,35,25], child: "ソレイユ",     special:["カザハナ", "オロチ" ] },
      {  name: "フランネル", type: "dark",   sex: "M", norble: false, classes:["ガルー",           "アクスファイター" ], pmax: [ 3, 0,-2,-1, 0, 2,-1], prate: [60,60, 0,20,35,30,50,25], child: "ベロア",       special:["カザハナ", "リンカ" ] },
      {  name: "ブノワ",     type: "dark",   sex: "M", norble: false, classes:["アーマーナイト",   "アクスファイター" ], pmax: [ 0, 0, 0,-3, 0, 3, 1], prate: [50,40, 0,50,10,35,55, 4], child: "イグニス",     special:["リンカ", "オボロ" ] },
      {  name: "ハロルド",   type: "dark",   sex: "M", norble: false, classes:["アクスファイター", "ソシアルナイト"   ], pmax: [ 1, 0, 3, 0,-3, 1,-1], prate: [50,45, 0,55,35, 5,45,20], child: "ルッツ",       special:["セツナ", "カゲロウ" ] },
    ];

    return males;
  },

  females() {
    var females = [
      // 共通
      {  name: "アクア",       type: "common", sex: "F", norble: false, classes:["歌姫",             "天馬武者"         ], pmax: [ 0, 0, 1, 3, 0,-3, 0], prate: [25,50,25,60,60,40,15,35], child: "シグレ"},
      {  name: "フェリシア",   type: "common", sex: "F", norble: false, classes:["ロッドナイト",     "マーシナリー"     ], pmax: [-2, 2, 0, 1, 0,-1, 1], prate: [40,10,35,30,40,55,15,35] },
      {  name: "モズメ",       type: "common", sex: "F", norble: false, classes:["村人",             "弓使い"           ], pmax: [ 0, 0, 1, 1, 1, 0,-2], prate: [30,40, 5,50,55,45,35,30] },
      // 白夜
      {  name: "ヒノカ",       type: "light",  sex: "F", norble: true,  classes:["天馬武者",         "槍術士"           ], pmax: [ 1,-1,-1, 1, 0,-1, 2], prate: [45,45,15,40,45,40,35,40] },
      {  name: "サクラ",       type: "light",  sex: "F", norble: true,  classes:["巫女",             "天馬武者"         ], pmax: [ 0, 2,-1, 1, 0,-1, 0], prate: [45,30,50,40,40,55,30,20] },
      {  name: "リンカ",       type: "light",  sex: "F", norble: false, classes:["鬼人",             "忍"               ], pmax: [-1, 0,-2, 1, 0, 2, 0], prate: [20,25,15,50,45,35,45,20] },
      {  name: "カザハナ",     type: "light",  sex: "F", norble: false, classes:["侍",               "巫女"             ], pmax: [ 1, 0, 1, 2,-1,-3, 1], prate: [25,55,10,45,55,25,20,30] },
      {  name: "オロチ",       type: "light",  sex: "F", norble: false, classes:["呪い師",           "薬商人"           ], pmax: [ 0, 3, 2,-2,-1,-2, 1], prate: [35, 5,65,50,15,35,25,45] },
      {  name: "セツナ",       type: "light",  sex: "F", norble: false, classes:["弓使い",           "忍"               ], pmax: [ 0, 0, 1, 3,-1,-1,-1], prate: [30,20, 0,30,60,30,15,40] },
      {  name: "オボロ",       type: "light",  sex: "F", norble: false, classes:["槍術士",           "薬商人"           ], pmax: [ 1,-1, 1, 1,-1, 1,-1], prate: [30,40,20,40,40,40,40,30] },
      {  name: "カゲロウ",     type: "light",  sex: "F", norble: false, classes:["忍",               "呪い師"           ], pmax: [ 3, 0,-1,-1, 0,-1, 1], prate: [30,65, 0,20,50,30,25,40] },
      // 暗夜
      {  name: "カミラ",       type: "dark",   sex: "F", norble: true,  classes:["ドラゴンナイト",   "ダークマージ"     ], pmax: [ 1,-1, 1, 1,-2, 1, 0], prate: [40,50,25,50,55,25,35,45] },
      {  name: "エリーゼ",     type: "dark",   sex: "F", norble: true,  classes:["ロッドナイト",     "ドラゴンナイト"   ], pmax: [-1, 3,-2, 1, 1,-3, 1], prate: [30, 5,65,25,55,70,15,40] },
      {  name: "ルーナ",       type: "dark",   sex: "F", norble: false, classes:["マーシナリー",     "天馬武者"         ], pmax: [-1, 0,-1, 2, 0, 1, 0], prate: [40,30, 5,25,45,30,45,30] },
      {  name: "ベルカ",       type: "dark",   sex: "F", norble: false, classes:["ドラゴンナイト",   "アクスファイター" ], pmax: [-1, 0, 2,-2, 0, 2,-1], prate: [45,30,10,55,30,45,40,25] },
      {  name: "エルフィ",     type: "dark",   sex: "F", norble: false, classes:["アーマーナイト",   "ロッドナイト"     ], pmax: [ 3, 0,-1, 1, 0,-1,-1], prate: [35,60, 0,35,50,50,35,30] },
      {  name: "ニュクス",     type: "dark",   sex: "F", norble: false, classes:["ダークマージ",     "シーフ"           ], pmax: [ 0, 3,-2, 2,-1,-2, 1], prate: [30, 5,50,35,50,20,15,30] },
      {  name: "シャーロッテ", type: "dark",   sex: "F", norble: false, classes:["アクスファイター", "ロッドナイト"     ], pmax: [ 3, 0, 0, 2, 0,-2,-2], prate: [65,55, 0,35,50,45,20, 5] },
      {  name: "ピエリ",       type: "dark",   sex: "F", norble: false, classes:["ソシアルナイト",   "ダークマージ"     ], pmax: [ 1, 0,-1, 1, 0,-2, 2], prate: [30,50, 5,30,50,35,25,45] },
    ];

    return females;
  },

  children() {
    var children = [
      // 共通
      {  name: "カンナ(男)",   type: "common", sex: "M", norble: true,  classes:["ダークプリンス",   ""                 ], prate:[30,35,30,40,45,45,25,25] },
      {  name: "カンナ(女)",   type: "common", sex: "F", norble: true,  classes:["ダークプリンセス", ""                 ], prate:[30,35,30,40,45,45,25,25] },
      {  name: "シグレ",       type: "common", sex: "M", norble: true,  classes:["天馬武者",         "ロッドナイト"     ], prate:[35,45,5,45,35,25,35,25], spclass: "ドラゴンナイト"  },
      {  name: "ディーア",     type: "common", sex: "M", norble: false, classes:["ロッドナイト",     "ソシアルナイト"   ], prate:[45,45,30,20,30,30,30,35] },
      {  name: "ゾフィー",     type: "common", sex: "F", norble: false, classes:["ソシアルナイト",   "マーシナリー"     ], prate:[35,35,10,55,50,35,25,35] },
      {  name: "ミドリコ",     type: "common", sex: "F", norble: false, classes:["薬商人",           "忍"               ], prate:[45,35,5,55,35,50,30,20]  },
      // 白夜
      {  name: "シノノメ",     type: "light",  sex: "M", norble: true,  classes:["槍術士",           "侍"               ], prate:[50,50,0,40,35,35,45,30]  },
      {  name: "キサラギ",     type: "light",  sex: "M", norble: true,  classes:["弓使い",           "槍術士"           ], prate:[45,40,0,45,50,45,40,15]  },
      {  name: "グレイ",       type: "light",  sex: "M", norble: false, classes:["忍",               "侍"               ], prate:[40,45,50,55,45,50,30,20] },
      {  name: "キヌ",         type: "light",  sex: "F", norble: false, classes:["妖狐",             "呪い師"           ], prate:[35,30,15,35,55,60,30,50] },
      {  name: "ヒサメ",       type: "light",  sex: "M", norble: false, classes:["侍",               "鬼人"             ], prate:[50,40,0,40,40,25,30,20]  },
      {  name: "ミタマ",       type: "light",  sex: "F", norble: false, classes:["巫女",             "薬商人"           ], prate:[45,40,35,45,50,50,30,20] },
      {  name: "マトイ",       type: "light",  sex: "F", norble: false, classes:["天馬武者",         "侍"               ], prate:[55,35,15,40,40,45,35,20] },
      {  name: "シャラ",       type: "light",  sex: "F", norble: false, classes:["呪い師",           "鬼人"             ], prate:[40,15,60,10,50,30,25,35] },
      // 暗夜
      {  name: "ジークベルト", type: "dark",   sex: "M", norble: true,  classes:["ソシアルナイト",   "ドラゴンナイト"   ], prate:[40,45,5,45,45,45,35,20]  },
      {  name: "フォレオ",     type: "dark",   sex: "M", norble: true,  classes:["ロッドナイト",     "ダークマージ"     ], prate:[55,15,65,20,35,25,25,55] },
      {  name: "イグニス",     type: "dark",   sex: "M", norble: false, classes:["アーマーナイト",   "アクスファイター" ], prate:[40,50,0,40,30,55,45,35]  },
      {  name: "ベロア",       type: "dark",   sex: "F", norble: false, classes:["ガルー",           "アクスファイター" ], prate:[50,50,0,40,40,35,45,30]  },
      {  name: "ルッツ",       type: "dark",   sex: "M", norble: false, classes:["ドラゴンナイト",   "アクスファイター" ], prate:[30,30,5,45,40,75,55,15], spclass: "天馬武者"  },
      {  name: "オフェリア",   type: "dark",   sex: "F", norble: false, classes:["ダークマージ",     "侍"               ], prate:[45,15,45,40,45,65,20,30] },
      {  name: "ソレイユ",     type: "dark",   sex: "F", norble: false, classes:["マーシナリー",     "忍"               ], prate:[25,60,0,35,35,45,35,40]  },
      {  name: "エポニーヌ",   type: "dark",   sex: "F", norble: false, classes:["シーフ",           "ダークマージ"     ], prate:[30,45,30,35,40,50,25,45],spclass: "呪い師" },
    ];

    return children;
  },

  extra() {
    var extra = [
      { name:"ユキムラ",   type: "light",  sex: "M", norble: false, classes:["薬商人",         "侍",               "修験者"],         pmax:[-1,0,3,-1,0,-1,0],    prate:[25,25,5,40,15,30,25,30] },
      { name:"アシュラ",   type: "common", sex: "M", norble: false, classes:["シーフ",         "アクスファイター", "忍"],             pmax:[-1,0,-1,3,-1,-2,2], prate:[30,25,10,20,35,30,15,35] },
      { name:"イザナ",     type: "common", sex: "M", norble: false, classes:["修験者",         "侍",               "薬商人"],         pmax:[0,1,1,-2,0,0,1],     prate:[45,15,35,55,30,45,35,35] },
      { name:"クリムゾン", type: "light",  sex: "F", norble: false, classes:["ドラゴンナイト", "アーマーナイト",   "シーフ"],         pmax:[2,0,0,1,-1,0,-2],     prate:[30,45,20,40,50,40,25,20] },
      { name:"ユウギリ",   type: "light",  sex: "F", norble: false, classes:["天馬武者",       "呪い師",           "忍"],             pmax:[2,0,0,2,-1,-2,-1],    prate:[40,45,5,20,45,10,20,10] },
      { name:"フローラ",   type: "dark",   sex: "F", norble: false, classes:["ロッドナイト",   "ダークマージ",     "マーシナリー"],   pmax:[1,-1,2,0,-1,1,-1],    prate:[35,40,20,45,30,35,30,30] },
      { name:"ギュンター", type: "dark",   sex: "M", norble: false, classes:["ソシアルナイト", "マーシナリー",     "ドラゴンナイト"], pmax:[2,0,1,-2,0,2,-2],     prate:[15,5,0,5,0,15,5,5] },
    ];

    return extra;
  },


};

export default Units;

