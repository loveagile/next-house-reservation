export const daysStr = ["日", "月", "火", "水", "木", "金", "土"];

export const timesStr = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

export const types = [
  "イベント種別 - 全て",
  "オンライン相談会",
  "オンライン見学会",
  "オンラインセミナー",
  "オンライン",
  "展示場",
  "キャンペーン",
  "展示会",
  "相談会",
  "完成見学会",
  "イベント",
  "OB邸見学会",
  "宿泊体験",
  "構造見学会",
  "施工中現場見学",
  "セミナー",
  "ショールーム",
  "モデルハウス",
  "モデルハウス販売会",
  "建売販売会",
  "土地販売会",
  "建築条件付土地販売会",
  "中古住宅販売会",
  "ワークショップ",
  "無人見学会",
  "物件探し",
  "勉強会",
  "講座",
  "見学会",
  "分譲地",
  "その他",
];

export const sortMethods = [
  "申込日: 降順",
  "申込日: 昇順",
  "予約日: 降順",
  "予約日: 昇順",
];

export const formats = ["オープン制", "予約制", "予約承認制", "日程調整予約"];

export const status = [
  "ステータス - 全て",
  "公開中",
  "公開中(開催終了)",
  "下書き中／非公開",
];

export const mapformats = [
  "地図にピンを表示する",
  "地図をサークル表示する",
  "地図を非表示にする",
];

export const mailformats = [
  "住所を全て記載する",
  "WEB上に表示される住所を記載する",
  "住所を記載しない",
];

export const customerEmployee = ["-- 担当者 --", "システム管理者", "未設定"];
export const customerStatus = [
  "-- ステータス --",
  "未設定",
  "予約",
  "来場済",
  "来場せず",
  "アポ未定",
  "アポ確定",
  "保留",
  "失注",
  "成約",
  "引き渡し済",
];

export type TPrefectureEnum =
  | "北海道"
  | "青森県"
  | "岩手県"
  | "宮城県"
  | "秋田県"
  | "山形県"
  | "福島県"
  | "茨城県"
  | "栃木県"
  | "群馬県"
  | "埼玉県"
  | "千葉県"
  | "東京都"
  | "神奈川県"
  | "新潟県"
  | "富山県"
  | "石川県"
  | "福井県"
  | "山梨県"
  | "長野県"
  | "岐阜県"
  | "静岡県"
  | "愛知県"
  | "三重県"
  | "滋賀県"
  | "京都府"
  | "大阪府"
  | "兵庫県"
  | "奈良県"
  | "和歌山県"
  | "鳥取県"
  | "島根県"
  | "岡山県"
  | "広島県"
  | "山口県"
  | "徳島県"
  | "香川県"
  | "愛媛県"
  | "高知県"
  | "福岡県"
  | "佐賀県"
  | "長崎県"
  | "熊本県"
  | "大分県"
  | "宮崎県"
  | "鹿児島県"
  | "沖縄県";

export type TVillageEnum = {
  [key in TPrefectureEnum]: string[];
};

export const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

export const villages: TVillageEnum = {
  北海道: [
    "札幌市中央区",
    "札幌市北区",
    "札幌市東区",
    "札幌市白石区",
    "札幌市豊平区",
    "札幌市南区",
    "札幌市西区",
    "札幌市厚別区",
    "札幌市手稲区",
    "札幌市清田区",
    "函館市",
    "小樽市",
    "旭川市",
    "室蘭市",
    "釧路市",
    "帯広市",
    "北見市",
    "夕張市",
    "岩見沢市",
    "網走市",
    "留萌市",
    "苫小牧市",
    "稚内市",
    "美唄市",
    "芦別市",
    "江別市",
    "赤平市",
    "紋別市",
    "士別市",
    "名寄市",
    "三笠市",
    "根室市",
    "千歳市",
    "滝川市",
    "砂川市",
    "歌志内市",
    "深川市",
    "富良野市",
    "登別市",
    "恵庭市",
    "伊達市",
    "北広島市",
    "石狩市",
    "北斗市",
    "石狩振興局当別町",
    "石狩振興局新篠津村",
    "渡島総合振興局松前町",
    "渡島総合振興局福島町",
    "渡島総合振興局知内町",
    "渡島総合振興局木古内町",
    "渡島総合振興局七飯町",
    "渡島総合振興局鹿部町",
    "渡島総合振興局森町",
    "渡島総合振興局八雲町",
    "渡島総合振興局長万部町",
    "檜山振興局江差町",
    "檜山振興局上ノ国町",
    "檜山振興局厚沢部町",
    "檜山振興局乙部町",
    "檜山振興局奥尻町",
    "檜山振興局今金町",
    "檜山振興局せたな町",
    "後志総合振興局島牧村",
    "後志総合振興局寿都町",
    "後志総合振興局黒松内町",
    "後志総合振興局蘭越町",
    "後志総合振興局ニセコ町",
    "後志総合振興局真狩村",
    "後志総合振興局留寿都村",
    "後志総合振興局喜茂別町",
    "後志総合振興局京極町",
    "後志総合振興局倶知安町",
    "後志総合振興局共和町",
    "後志総合振興局岩内町",
    "後志総合振興局泊村",
    "後志総合振興局神恵内村",
    "後志総合振興局積丹町",
    "後志総合振興局古平町",
    "後志総合振興局仁木町",
    "後志総合振興局余市町",
    "後志総合振興局赤井川村",
    "空知総合振興局南幌町",
    "空知総合振興局奈井江町",
    "空知総合振興局上砂川町",
    "空知総合振興局由仁町",
    "空知総合振興局長沼町",
    "空知総合振興局栗山町",
    "空知総合振興局月形町",
    "空知総合振興局浦臼町",
    "空知総合振興局新十津川町",
    "空知総合振興局妹背牛町",
    "空知総合振興局秩父別町",
    "空知総合振興局雨竜町",
    "空知総合振興局北竜町",
    "空知総合振興局沼田町",
    "上川総合振興局幌加内町",
    "上川総合振興局鷹栖町",
    "上川総合振興局東神楽町",
    "上川総合振興局当麻町",
    "上川総合振興局比布町",
    "上川総合振興局愛別町",
    "上川総合振興局上川町",
    "上川総合振興局東川町",
    "上川総合振興局美瑛町",
    "上川総合振興局上富良野町",
    "上川総合振興局中富良野町",
    "上川総合振興局南富良野町",
    "上川総合振興局占冠村",
    "上川総合振興局和寒町",
    "上川総合振興局剣淵町",
    "上川総合振興局下川町",
    "上川総合振興局美深町",
    "上川総合振興局音威子府村",
    "上川総合振興局中川町",
    "上川総合振興局幌加内町",
    "留萌振興局増毛町",
    "留萌振興局小平町",
    "留萌振興局苫前町",
    "留萌振興局羽幌町",
    "留萌振興局初山別村",
    "留萌振興局遠別町",
    "留萌振興局天塩町",
    "宗谷総合振興局猿払村",
    "宗谷総合振興局浜頓別町",
    "宗谷総合振興局中頓別町",
    "宗谷総合振興局枝幸町",
    "宗谷総合振興局豊富町",
    "宗谷総合振興局礼文町",
    "宗谷総合振興局利尻町",
    "宗谷総合振興局利尻富士町",
    "宗谷総合振興局幌延町",
    "オホーツク総合振興局美幌町",
    "オホーツク総合振興局津別町",
    "オホーツク総合振興局斜里町",
    "オホーツク総合振興局清里町",
    "オホーツク総合振興局小清水町",
    "オホーツク総合振興局訓子府町",
    "オホーツク総合振興局置戸町",
    "オホーツク総合振興局佐呂間町",
    "オホーツク総合振興局遠軽町",
    "オホーツク総合振興局湧別町",
    "オホーツク総合振興局滝上町",
    "オホーツク総合振興局興部町",
    "オホーツク総合振興局西興部村",
    "オホーツク総合振興局雄武町",
    "オホーツク総合振興局大空町",
    "十勝総合振興局音更町",
    "十勝総合振興局士幌町",
    "十勝総合振興局上士幌町",
    "十勝総合振興局鹿追町",
    "十勝総合振興局新得町",
    "十勝総合振興局清水町",
    "十勝総合振興局芽室町",
    "十勝総合振興局中札内村",
    "十勝総合振興局更別村",
    "十勝総合振興局大樹町",
    "十勝総合振興局広尾町",
    "十勝総合振興局幕別町",
    "十勝総合振興局池田町",
    "十勝総合振興局豊頃町",
    "十勝総合振興局本別町",
    "十勝総合振興局足寄町",
    "十勝総合振興局陸別町",
    "十勝総合振興局浦幌町",
    "釧路総合振興局釧路町",
    "釧路総合振興局厚岸町",
    "釧路総合振興局浜中町",
    "釧路総合振興局標茶町",
    "釧路総合振興局弟子屈町",
    "釧路総合振興局鶴居村",
  ],
  青森県: [
    "青森市",
    "弘前市",
    "八戸市",
    "黒石市",
    "五所川原市",
    "十和田市",
    "三沢市",
    "むつ市",
    "つがる市",
    "平川市",
    "東津軽郡平内町",
    "東津軽郡今別町",
    "東津軽郡蓬田村",
    "東津軽郡外ヶ浜町",
    "西津軽郡鰺ヶ沢町",
    "西津軽郡深浦町",
    "中津軽郡西目屋村",
    "南津軽郡藤崎町",
    "南津軽郡大鰐町",
    "南津軽郡田舎館村",
    "北津軽郡板柳町",
    "北津軽郡鶴田町",
    "北津軽郡中泊町",
    "上北郡野辺地町",
    "上北郡七戸町",
    "上北郡六戸町",
    "上北郡横浜町",
    "上北郡東北町",
    "上北郡六ヶ所村",
    "上北郡おいらせ町",
    "下北郡大間町",
    "下北郡東通村",
    "下北郡風間浦村",
    "下北郡佐井村",
    "三戸郡三戸町",
    "三戸郡五戸町",
    "三戸郡田子町",
    "三戸郡南部町",
    "三戸郡階上町",
    "三戸郡新郷村",
  ],
  岩手県: [
    "盛岡市",
    "宮古市",
    "大船渡市",
    "花巻市",
    "北上市",
    "久慈市",
    "遠野市",
    "一関市",
    "陸前高田市",
    "釜石市",
    "二戸市",
    "八幡平市",
    "奥州市",
    "滝沢市",
    "岩手郡雫石町",
    "岩手郡葛巻町",
    "岩手郡岩手町",
    "紫波郡紫波町",
    "紫波郡矢巾町",
    "和賀郡西和賀町",
    "胆沢郡金ケ崎町",
    "西磐井郡平泉町",
    "気仙郡住田町",
    "上閉伊郡大槌町",
    "下閉伊郡山田町",
    "下閉伊郡岩泉町",
    "下閉伊郡田野畑村",
    "下閉伊郡普代村",
    "九戸郡軽米町",
    "九戸郡野田村",
    "九戸郡九戸村",
    "九戸郡洋野町",
    "二戸郡一戸町",
  ],
  宮城県: [
    "仙台市青葉区",
    "仙台市宮城野区",
    "仙台市若林区",
    "仙台市太白区",
    "仙台市泉区",
    "石巻市",
    "塩竈市",
    "気仙沼市",
    "白石市",
    "名取市",
    "角田市",
    "多賀城市",
    "岩沼市",
    "登米市",
    "栗原市",
    "東松島市",
    "大崎市",
    "富谷市",
    "刈田郡蔵王町",
    "刈田郡七ヶ宿町",
    "柴田郡大河原町",
    "柴田郡村田町",
    "柴田郡柴田町",
    "柴田郡川崎町",
    "伊具郡丸森町",
    "亘理郡亘理町",
    "亘理郡山元町",
    "宮城郡松島町",
    "宮城郡七ヶ浜町",
    "宮城郡利府町",
    "黒川郡大和町",
    "黒川郡大郷町",
    "黒川郡大衡村",
    "加美郡色麻町",
    "加美郡加美町",
    "遠田郡涌谷町",
    "遠田郡美里町",
    "牡鹿郡女川町",
    "本吉郡南三陸町",
  ],
  秋田県: [
    "秋田市",
    "能代市",
    "横手市",
    "大館市",
    "男鹿市",
    "湯沢市",
    "鹿角市",
    "由利本荘市",
    "潟上市",
    "大仙市",
    "北秋田市",
    "にかほ市",
    "仙北市",
    "鹿角郡小坂町",
    "北秋田郡上小阿仁村",
    "山本郡藤里町",
    "山本郡三種町",
    "山本郡八峰町",
    "南秋田郡五城目町",
    "南秋田郡八郎潟町",
    "南秋田郡井川町",
    "南秋田郡大潟村",
    "仙北郡美郷町",
    "雄勝郡羽後町",
    "雄勝郡東成瀬村",
  ],
  山形県: [
    "山形市",
    "米沢市",
    "鶴岡市",
    "酒田市",
    "新庄市",
    "寒河江市",
    "上山市",
    "村山市",
    "長井市",
    "天童市",
    "東根市",
    "尾花沢市",
    "南陽市",
    "東村山郡山辺町",
    "東村山郡中山町",
    "西村山郡河北町",
    "西村山郡西川町",
    "西村山郡朝日町",
    "西村山郡大江町",
    "北村山郡大石田町",
    "最上郡金山町",
    "最上郡最上町",
    "最上郡舟形町",
    "最上郡真室川町",
    "最上郡大蔵村",
    "最上郡鮭川村",
    "最上郡戸沢村",
    "東置賜郡高畠町",
    "東置賜郡川西町",
    "西置賜郡小国町",
    "西置賜郡白鷹町",
    "西置賜郡飯豊町",
    "東田川郡三川町",
    "東田川郡庄内町",
    "飽海郡遊佐町",
  ],
  福島県: [
    "福島市",
    "会津若松市",
    "郡山市",
    "いわき市",
    "白河市",
    "須賀川市",
    "喜多方市",
    "相馬市",
    "二本松市",
    "田村市",
    "南相馬市",
    "伊達市",
    "本宮市",
    "伊達郡桑折町",
    "伊達郡国見町",
    "伊達郡川俣町",
    "安達郡大玉村",
    "岩瀬郡鏡石町",
    "岩瀬郡天栄村",
    "南会津郡下郷町",
    "南会津郡檜枝岐村",
    "南会津郡只見町",
    "南会津郡南会津町",
    "耶麻郡北塩原村",
    "耶麻郡西会津町",
    "耶麻郡磐梯町",
    "耶麻郡猪苗代町",
    "河沼郡会津坂下町",
    "河沼郡湯川村",
    "河沼郡柳津町",
    "大沼郡三島町",
    "大沼郡金山町",
    "大沼郡昭和村",
    "大沼郡会津美里町",
    "西白河郡西郷村",
    "西白河郡泉崎村",
    "西白河郡中島村",
    "西白河郡矢吹町",
    "東白川郡棚倉町",
    "東白川郡矢祭町",
    "東白川郡塙町",
    "東白川郡鮫川村",
    "石川郡石川町",
    "石川郡玉川村",
    "石川郡平田村",
    "石川郡浅川町",
    "石川郡古殿町",
    "田村郡三春町",
    "田村郡小野町",
    "双葉郡広野町",
    "双葉郡楢葉町",
    "双葉郡富岡町",
    "双葉郡川内村",
    "双葉郡大熊町",
    "双葉郡双葉町",
    "双葉郡浪江町",
    "双葉郡葛尾村",
    "相馬郡新地町",
    "相馬郡飯舘村",
  ],
  茨城県: [
    "水戸市",
    "日立市",
    "土浦市",
    "古河市",
    "石岡市",
    "結城市",
    "龍ケ崎市",
    "下妻市",
    "常総市",
    "常陸太田市",
    "高萩市",
    "北茨城市",
    "笠間市",
    "取手市",
    "牛久市",
    "つくば市",
    "ひたちなか市",
    "鹿嶋市",
    "潮来市",
    "守谷市",
    "常陸大宮市",
    "那珂市",
    "筑西市",
    "坂東市",
    "稲敷市",
    "かすみがうら市",
    "桜川市",
    "神栖市",
    "行方市",
    "鉾田市",
    "つくばみらい市",
    "小美玉市",
    "東茨城郡茨城町",
    "東茨城郡大洗町",
    "東茨城郡城里町",
    "那珂郡東海村",
    "久慈郡大子町",
    "稲敷郡美浦村",
    "稲敷郡阿見町",
    "稲敷郡河内町",
    "結城郡八千代町",
    "猿島郡五霞町",
    "猿島郡境町",
    "北相馬郡利根町",
  ],
  栃木県: [
    "宇都宮市",
    "足利市",
    "栃木市",
    "佐野市",
    "鹿沼市",
    "日光市",
    "小山市",
    "真岡市",
    "大田原市",
    "矢板市",
    "那須塩原市",
    "さくら市",
    "那須烏山市",
    "下野市",
    "河内郡上三川町",
    "芳賀郡益子町",
    "芳賀郡茂木町",
    "芳賀郡市貝町",
    "芳賀郡芳賀町",
    "下都賀郡壬生町",
    "下都賀郡野木町",
    "塩谷郡塩谷町",
    "塩谷郡高根沢町",
    "那須郡那須町",
    "那須郡那珂川町",
  ],
  群馬県: [
    "前橋市",
    "高崎市",
    "桐生市",
    "伊勢崎市",
    "太田市",
    "沼田市",
    "館林市",
    "渋川市",
    "藤岡市",
    "富岡市",
    "安中市",
    "みどり市",
    "北群馬郡榛東村",
    "北群馬郡吉岡町",
    "多野郡上野村",
    "多野郡神流町",
    "甘楽郡下仁田町",
    "甘楽郡南牧村",
    "甘楽郡甘楽町",
    "吾妻郡中之条町",
    "吾妻郡長野原町",
    "吾妻郡嬬恋村",
    "吾妻郡草津町",
    "吾妻郡高山村",
    "吾妻郡東吾妻町",
    "利根郡片品村",
    "利根郡川場村",
    "利根郡昭和村",
    "利根郡みなかみ町",
    "佐波郡玉村町",
    "邑楽郡板倉町",
    "邑楽郡明和町",
    "邑楽郡千代田町",
    "邑楽郡大泉町",
    "邑楽郡邑楽町",
  ],
  埼玉県: [
    "さいたま市西区",
    "さいたま市北区",
    "さいたま市大宮区",
    "さいたま市見沼区",
    "さいたま市中央区",
    "さいたま市桜区",
    "さいたま市浦和区",
    "さいたま市南区",
    "さいたま市緑区",
    "さいたま市岩槻区",
    "川越市",
    "熊谷市",
    "川口市",
    "行田市",
    "秩父市",
    "所沢市",
    "飯能市",
    "加須市",
    "本庄市",
    "東松山市",
    "春日部市",
    "狭山市",
    "羽生市",
    "鴻巣市",
    "深谷市",
    "上尾市",
    "草加市",
    "越谷市",
    "蕨市",
    "戸田市",
    "入間市",
    "朝霞市",
    "志木市",
    "和光市",
    "新座市",
    "桶川市",
    "久喜市",
    "北本市",
    "八潮市",
    "富士見市",
    "三郷市",
    "蓮田市",
    "坂戸市",
    "幸手市",
    "鶴ヶ島市",
    "日高市",
    "吉川市",
    "ふじみ野市",
    "白岡市",
    "北足立郡伊奈町",
    "入間郡三芳町",
    "入間郡毛呂山町",
    "入間郡越生町",
    "比企郡滑川町",
    "比企郡嵐山町",
    "比企郡小川町",
    "比企郡川島町",
    "比企郡吉見町",
    "比企郡鳩山町",
    "比企郡ときがわ町",
    "秩父郡横瀬町",
    "秩父郡皆野町",
    "秩父郡長瀞町",
    "秩父郡小鹿野町",
    "秩父郡東秩父村",
    "児玉郡美里町",
    "児玉郡神川町",
    "児玉郡上里町",
    "大里郡寄居町",
    "南埼玉郡宮代町",
    "北葛飾郡杉戸町",
    "北葛飾郡松伏町",
  ],
  千葉県: [
    "千葉市中央区",
    "千葉市花見川区",
    "千葉市稲毛区",
    "千葉市若葉区",
    "千葉市緑区",
    "千葉市美浜区",
    "銚子市",
    "市川市",
    "船橋市",
    "館山市",
    "木更津市",
    "松戸市",
    "野田市",
    "茂原市",
    "成田市",
    "佐倉市",
    "東金市",
    "旭市",
    "習志野市",
    "柏市",
    "勝浦市",
    "市原市",
    "流山市",
    "八千代市",
    "我孫子市",
    "鴨川市",
    "鎌ケ谷市",
    "君津市",
    "富津市",
    "浦安市",
    "四街道市",
    "袖ケ浦市",
    "八街市",
    "印西市",
    "白井市",
    "富里市",
    "南房総市",
    "匝瑳市",
    "香取市",
    "山武市",
    "いすみ市",
    "大網白里市",
    "印旛郡酒々井町",
    "印旛郡栄町",
    "香取郡神崎町",
    "香取郡多古町",
    "香取郡東庄町",
    "山武郡九十九里町",
    "山武郡芝山町",
    "山武郡横芝光町",
    "長生郡一宮町",
    "長生郡睦沢町",
    "長生郡長生村",
    "長生郡白子町",
    "長生郡長南町",
    "長生郡長柄町",
    "長生郡長浦町",
    "夷隅郡大多喜町",
    "夷隅郡御宿町",
    "安房郡鋸南町",
  ],
  東京都: [
    "千代田区",
    "中央区",
    "港区",
    "新宿区",
    "文京区",
    "台東区",
    "墨田区",
    "江東区",
    "品川区",
    "目黒区",
    "大田区",
    "世田谷区",
    "渋谷区",
    "中野区",
    "杉並区",
    "豊島区",
    "北区",
    "荒川区",
    "板橋区",
    "練馬区",
    "足立区",
    "葛飾区",
    "江戸川区",
    "八王子市",
    "立川市",
    "武蔵野市",
    "三鷹市",
    "青梅市",
    "府中市",
    "昭島市",
    "調布市",
    "町田市",
    "小金井市",
    "小平市",
    "日野市",
    "東村山市",
    "国分寺市",
    "国立市",
    "福生市",
    "狛江市",
    "東大和市",
    "清瀬市",
    "東久留米市",
    "武蔵村山市",
    "多摩市",
    "稲城市",
    "羽村市",
    "あきる野市",
    "西東京市",
    "西多摩郡瑞穂町",
    "西多摩郡日の出町",
    "西多摩郡檜原村",
    "西多摩郡奥多摩町",
    "大島町",
    "利島村",
    "新島村",
    "神津島村",
    "三宅島三宅村",
    "御蔵島村",
    "八丈島八丈町",
    "青ヶ島村",
    "小笠原村",
  ],
  神奈川県: [
    "横浜市鶴見区",
    "横浜市神奈川区",
    "横浜市西区",
    "横浜市中区",
    "横浜市南区",
    "横浜市保土ケ谷区",
    "横浜市磯子区",
    "横浜市金沢区",
    "横浜市港北区",
    "横浜市戸塚区",
    "横浜市港南区",
    "横浜市旭区",
    "横浜市緑区",
    "横浜市瀬谷区",
    "横浜市栄区",
    "横浜市泉区",
    "横浜市青葉区",
    "横浜市都筑区",
    "川崎市川崎区",
    "川崎市幸区",
    "川崎市中原区",
    "川崎市高津区",
    "川崎市多摩区",
    "川崎市宮前区",
    "川崎市麻生区",
    "相模原市緑区",
    "相模原市中央区",
    "相模原市南区",
    "横須賀市",
    "平塚市",
    "鎌倉市",
    "藤沢市",
    "小田原市",
    "茅ヶ崎市",
    "逗子市",
    "三浦市",
    "秦野市",
    "厚木市",
    "大和市",
    "伊勢原市",
    "海老名市",
    "座間市",
    "南足柄市",
    "綾瀬市",
    "三浦郡葉山町",
    "高座郡寒川町",
    "中郡大磯町",
    "中郡二宮町",
    "足柄上郡中井町",
    "足柄上郡大井町",
    "足柄上郡松田町",
    "足柄上郡山北町",
    "足柄上郡開成町",
    "足柄下郡箱根町",
    "足柄下郡真鶴町",
    "足柄下郡湯河原町",
    "愛甲郡愛川町",
    "愛甲郡清川村",
  ],
  新潟県: [
    "新潟市北区",
    "新潟市東区",
    "新潟市中央区",
    "新潟市江南区",
    "新潟市秋葉区",
    "新潟市南区",
    "新潟市西区",
    "新潟市西蒲区",
    "長岡市",
    "三条市",
    "柏崎市",
    "新発田市",
    "小千谷市",
    "加茂市",
    "十日町市",
    "見附市",
    "村上市",
    "燕市",
    "糸魚川市",
    "妙高市",
    "五泉市",
    "上越市",
    "阿賀野市",
    "佐渡市",
    "魚沼市",
    "南魚沼市",
    "胎内市",
    "北蒲原郡聖籠町",
    "西蒲原郡弥彦村",
    "南蒲原郡田上町",
    "東蒲原郡阿賀町",
    "三島郡出雲崎町",
    "南魚沼郡湯沢町",
    "中魚沼郡津南町",
    "刈羽郡刈羽村",
    "岩船郡関川村",
    "岩船郡粟島浦村",
  ],
  富山県: [
    "富山市",
    "高岡市",
    "魚津市",
    "氷見市",
    "滑川市",
    "黒部市",
    "砺波市",
    "小矢部市",
    "南砺市",
    "射水市",
    "中新川郡舟橋村",
    "中新川郡上市町",
    "中新川郡立山町",
    "下新川郡入善町",
    "下新川郡朝日町",
  ],
  石川県: [
    "金沢市",
    "七尾市",
    "小松市",
    "輪島市",
    "珠洲市",
    "加賀市",
    "羽咋市",
    "かほく市",
    "白山市",
    "能美市",
    "野々市市",
    "能美郡川北町",
    "河北郡津幡町",
    "河北郡内灘町",
    "羽咋郡志賀町",
    "羽咋郡宝達志水町",
    "鹿島郡中能登町",
    "鳳珠郡穴水町",
    "鳳珠郡能登町",
  ],
  福井県: [
    "福井市",
    "敦賀市",
    "小浜市",
    "大野市",
    "勝山市",
    "鯖江市",
    "あわら市",
    "越前市",
    "坂井市",
    "吉田郡永平寺町",
    "今立郡池田町",
    "南条郡南越前町",
    "丹生郡越前町",
    "三方郡美浜町",
    "大飯郡高浜町",
    "大飯郡おおい町",
    "三方上中郡若狭町",
  ],
  山梨県: [
    "甲府市",
    "富士吉田市",
    "都留市",
    "山梨市",
    "大月市",
    "韮崎市",
    "南アルプス市",
    "北杜市",
    "甲斐市",
    "笛吹市",
    "上野原市",
    "甲州市",
    "中央市",
    "西八代郡市川三郷町",
    "南巨摩郡早川町",
    "南巨摩郡身延町",
    "南巨摩郡南部町",
    "南巨摩郡富士川町",
    "中巨摩郡昭和町",
    "南都留郡道志村",
    "南都留郡西桂町",
    "南都留郡忍野村",
    "南都留郡山中湖村",
    "南都留郡鳴沢村",
    "南都留郡富士河口湖町",
    "北都留郡小菅村",
    "北都留郡丹波山村",
  ],
  長野県: [
    "長野市",
    "松本市",
    "上田市",
    "岡谷市",
    "飯田市",
    "諏訪市",
    "須坂市",
    "小諸市",
    "伊那市",
    "駒ヶ根市",
    "中野市",
    "大町市",
    "飯山市",
    "茅野市",
    "塩尻市",
    "佐久市",
    "千曲市",
    "東御市",
    "安曇野市",
    "南佐久郡小海町",
    "南佐久郡川上村",
    "南佐久郡南牧村",
    "南佐久郡南相木村",
    "南佐久郡北相木村",
    "南佐久郡佐久穂町",
    "北佐久郡軽井沢町",
    "北佐久郡御代田町",
    "北佐久郡立科町",
    "小県郡青木村",
    "小県郡長和町",
    "諏訪郡下諏訪町",
    "諏訪郡富士見町",
    "諏訪郡原村",
    "上伊那郡辰野町",
    "上伊那郡箕輪町",
    "上伊那郡飯島町",
    "上伊那郡南箕輪村",
    "上伊那郡中川村",
    "上伊那郡宮田村",
    "下伊那郡松川町",
    "下伊那郡高森町",
    "下伊那郡阿南町",
    "下伊那郡阿智村",
    "下伊那郡平谷村",
    "下伊那郡根羽村",
    "下伊那郡下條村",
    "下伊那郡売木村",
    "下伊那郡天龍村",
    "下伊那郡泰阜村",
    "下伊那郡喬木村",
    "下伊那郡豊丘村",
    "下伊那郡大鹿村",
    "木曽郡上松町",
    "木曽郡南木曽町",
    "木曽郡木曽町",
    "木曽郡王滝村",
    "木曽郡大桑村",
    "木曽郡木祖村",
    "東筑摩郡麻績村",
    "東筑摩郡生坂村",
    "東筑摩郡山形村",
    "東筑摩郡朝日村",
    "東筑摩郡筑北村",
    "北安曇郡池田町",
    "北安曇郡松川村",
    "北安曇郡白馬村",
    "北安曇郡小谷村",
    "埴科郡坂城町",
    "上高井郡小布施町",
    "上高井郡高山村",
    "下高井郡山ノ内町",
    "下高井郡木島平村",
    "下高井郡野沢温泉村",
    "上水内郡信濃町",
    "上水内郡小川村",
    "上水内郡飯綱町",
    "下水内郡栄村",
  ],
  岐阜県: [
    "岐阜市",
    "大垣市",
    "高山市",
    "多治見市",
    "関市",
    "中津川市",
    "美濃市",
    "瑞浪市",
    "羽島市",
    "恵那市",
    "美濃加茂市",
    "土岐市",
    "各務原市",
    "可児市",
    "山県市",
    "瑞穂市",
    "飛騨市",
    "本巣市",
    "郡上市",
    "下呂市",
    "海津市",
    "羽島郡岐南町",
    "羽島郡笠松町",
    "養老郡養老町",
    "不破郡垂井町",
    "不破郡関ケ原町",
    "安八郡神戸町",
    "安八郡輪之内町",
    "安八郡安八町",
    "揖斐郡揖斐川町",
    "揖斐郡大野町",
    "揖斐郡池田町",
    "本巣郡北方町",
    "加茂郡坂祝町",
    "加茂郡富加町",
    "加茂郡川辺町",
    "加茂郡七宗町",
    "加茂郡八百津町",
    "加茂郡白川町",
    "加茂郡東白川村",
    "可児郡御嵩町",
    "大野郡白川村",
  ],
  静岡県: [
    "静岡市葵区",
    "静岡市駿河区",
    "静岡市清水区",
    "浜松市中区",
    "浜松市東区",
    "浜松市西区",
    "浜松市南区",
    "浜松市北区",
    "浜松市浜北区",
    "浜松市天竜区",
    "沼津市",
    "熱海市",
    "三島市",
    "富士宮市",
    "伊東市",
    "島田市",
    "富士市",
    "磐田市",
    "焼津市",
    "掛川市",
    "藤枝市",
    "御殿場市",
    "袋井市",
    "下田市",
    "裾野市",
    "湖西市",
    "伊豆市",
    "御前崎市",
    "菊川市",
    "伊豆の国市",
    "牧之原市",
    "賀茂郡東伊豆町",
    "賀茂郡河津町",
    "賀茂郡南伊豆町",
    "賀茂郡松崎町",
    "賀茂郡西伊豆町",
    "田方郡函南町",
    "駿東郡清水町",
    "駿東郡長泉町",
    "駿東郡小山町",
    "榛原郡吉田町",
    "榛原郡川根本町",
    "周智郡森町",
  ],
  愛知県: [
    "名古屋市千種区",
    "名古屋市東区",
    "名古屋市北区",
    "名古屋市西区",
    "名古屋市中村区",
    "名古屋市中区",
    "名古屋市昭和区",
    "名古屋市瑞穂区",
    "名古屋市熱田区",
    "名古屋市中川区",
    "名古屋市港区",
    "名古屋市南区",
    "名古屋市守山区",
    "名古屋市緑区",
    "名古屋市名東区",
    "名古屋市天白区",
    "豊橋市",
    "岡崎市",
    "一宮市",
    "瀬戸市",
    "半田市",
    "春日井市",
    "豊川市",
    "津島市",
    "碧南市",
    "刈谷市",
    "豊田市",
    "安城市",
    "西尾市",
    "蒲郡市",
    "犬山市",
    "常滑市",
    "江南市",
    "小牧市",
    "稲沢市",
    "新城市",
    "東海市",
    "大府市",
    "知多市",
    "知立市",
    "尾張旭市",
    "高浜市",
    "岩倉市",
    "豊明市",
    "日進市",
    "田原市",
    "愛西市",
    "清須市",
    "北名古屋市",
    "弥富市",
    "みよし市",
    "あま市",
    "長久手市",
    "愛知郡東郷町",
    "西春日井郡豊山町",
    "丹羽郡大口町",
    "丹羽郡扶桑町",
    "海部郡大治町",
    "海部郡蟹江町",
    "海部郡飛島村",
    "知多郡阿久比町",
    "知多郡東浦町",
    "知多郡南知多町",
    "知多郡美浜町",
    "知多郡武豊町",
    "額田郡幸田町",
    "北設楽郡設楽町",
    "北設楽郡東栄町",
    "北設楽郡豊根村",
  ],
  三重県: [
    "津市",
    "四日市市",
    "伊勢市",
    "松阪市",
    "桑名市",
    "鈴鹿市",
    "名張市",
    "尾鷲市",
    "亀山市",
    "鳥羽市",
    "熊野市",
    "いなべ市",
    "志摩市",
    "伊賀市",
    "桑名郡木曽岬町",
    "員弁郡東員町",
    "三重郡菰野町",
    "三重郡朝日町",
    "三重郡川越町",
    "多気郡多気町",
    "多気郡明和町",
    "多気郡大台町",
    "度会郡玉城町",
    "度会郡度会町",
    "度会郡大紀町",
    "度会郡南伊勢町",
    "北牟婁郡紀北町",
    "南牟婁郡御浜町",
    "南牟婁郡紀宝町",
  ],
  滋賀県: [
    "大津市",
    "彦根市",
    "長浜市",
    "近江八幡市",
    "草津市",
    "守山市",
    "栗東市",
    "甲賀市",
    "野洲市",
    "湖南市",
    "高島市",
    "東近江市",
    "米原市",
    "蒲生郡日野町",
    "蒲生郡竜王町",
    "愛知郡愛荘町",
    "犬上郡豊郷町",
    "犬上郡甲良町",
    "犬上郡多賀町",
  ],
  京都府: [
    "京都市北区",
    "京都市上京区",
    "京都市左京区",
    "京都市中京区",
    "京都市東山区",
    "京都市下京区",
    "京都市南区",
    "京都市右京区",
    "京都市伏見区",
    "京都市山科区",
    "京都市西京区",
    "福知山市",
    "舞鶴市",
    "綾部市",
    "宇治市",
    "宮津市",
    "亀岡市",
    "城陽市",
    "向日市",
    "長岡京市",
    "八幡市",
    "京田辺市",
    "京丹後市",
    "南丹市",
    "木津川市",
    "乙訓郡大山崎町",
    "久世郡久御山町",
    "綴喜郡井手町",
    "綴喜郡宇治田原町",
    "相楽郡笠置町",
    "相楽郡和束町",
    "相楽郡精華町",
    "相楽郡南山城村",
    "船井郡京丹波町",
    "与謝郡伊根町",
    "与謝郡与謝野町",
  ],
  大阪府: [
    "大阪市都島区",
    "大阪市福島区",
    "大阪市此花区",
    "大阪市西区",
    "大阪市港区",
    "大阪市大正区",
    "大阪市天王寺区",
    "大阪市浪速区",
    "大阪市西淀川区",
    "大阪市東淀川区",
    "大阪市東成区",
    "大阪市生野区",
    "大阪市旭区",
    "大阪市城東区",
    "大阪市阿倍野区",
    "大阪市住吉区",
    "大阪市東住吉区",
    "大阪市西成区",
    "大阪市淀川区",
    "大阪市鶴見区",
    "大阪市住之江区",
    "大阪市平野区",
    "大阪市北区",
    "大阪市中央区",
    "堺市堺区",
    "堺市中区",
    "堺市東区",
    "堺市西区",
    "堺市南区",
    "堺市北区",
    "堺市美原区",
    "岸和田市",
    "豊中市",
    "池田市",
    "吹田市",
    "泉大津市",
    "高槻市",
    "貝塚市",
    "守口市",
    "枚方市",
    "茨木市",
    "八尾市",
    "泉佐野市",
    "富田林市",
    "寝屋川市",
    "河内長野市",
    "松原市",
    "大東市",
    "和泉市",
    "箕面市",
    "柏原市",
    "羽曳野市",
    "門真市",
    "摂津市",
    "高石市",
    "藤井寺市",
    "東大阪市",
    "泉南市",
    "四條畷市",
    "交野市",
    "大阪狭山市",
    "阪南市",
    "三島郡島本町",
    "豊能郡豊能町",
    "豊能郡能勢町",
    "泉北郡忠岡町",
    "泉南郡熊取町",
    "泉南郡田尻町",
    "泉南郡岬町",
    "南河内郡太子町",
    "南河内郡河南町",
    "南河内郡千早赤阪村",
  ],
  兵庫県: [
    "神戸市東灘区",
    "神戸市灘区",
    "神戸市兵庫区",
    "神戸市長田区",
    "神戸市須磨区",
    "神戸市垂水区",
    "神戸市北区",
    "神戸市中央区",
    "神戸市西区",
    "姫路市",
    "尼崎市",
    "明石市",
    "西宮市",
    "洲本市",
    "芦屋市",
    "伊丹市",
    "相生市",
    "豊岡市",
    "加古川市",
    "赤穂市",
    "西脇市",
    "宝塚市",
    "三木市",
    "高砂市",
    "川西市",
    "小野市",
    "三田市",
    "加西市",
    "丹波篠山市",
    "養父市",
    "丹波市",
    "南あわじ市",
    "朝来市",
    "淡路市",
    "宍粟市",
    "加東市",
    "たつの市",
    "川辺郡猪名川町",
    "多可郡多可町",
    "加古郡稲美町",
    "加古郡播磨町",
    "神崎郡市川町",
    "神崎郡福崎町",
    "神崎郡神河町",
    "揖保郡太子町",
    "赤穂郡上郡町",
    "佐用郡佐用町",
    "美方郡香美町",
    "美方郡新温泉町",
  ],
  奈良県: [
    "奈良市",
    "大和高田市",
    "大和郡山市",
    "天理市",
    "橿原市",
    "桜井市",
    "五條市",
    "御所市",
    "生駒市",
    "香芝市",
    "葛城市",
    "宇陀市",
    "山辺郡山添村",
    "生駒郡平群町",
    "生駒郡三郷町",
    "生駒郡斑鳩町",
    "生駒郡安堵町",
    "磯城郡川西町",
    "磯城郡三宅町",
    "磯城郡田原本町",
    "宇陀郡曽爾村",
    "宇陀郡御杖村",
    "高市郡高取町",
    "高市郡明日香村",
    "北葛城郡上牧町",
    "北葛城郡王寺町",
    "北葛城郡広陵町",
    "北葛城郡河合町",
    "吉野郡吉野町",
    "吉野郡大淀町",
    "吉野郡下市町",
    "吉野郡黒滝村",
    "吉野郡天川村",
    "吉野郡野迫川村",
    "吉野郡十津川村",
    "吉野郡下北山村",
    "吉野郡上北山村",
    "吉野郡川上村",
    "吉野郡東吉野村",
  ],
  和歌山県: [
    "和歌山市",
    "海南市",
    "橋本市",
    "有田市",
    "御坊市",
    "田辺市",
    "新宮市",
    "紀の川市",
    "岩出市",
    "海草郡紀美野町",
    "伊都郡かつらぎ町",
    "伊都郡九度山町",
    "伊都郡高野町",
    "有田郡湯浅町",
    "有田郡広川町",
    "有田郡有田川町",
    "日高郡美浜町",
    "日高郡日高町",
    "日高郡由良町",
    "日高郡印南町",
    "日高郡みなべ町",
    "日高郡日高川町",
    "西牟婁郡白浜町",
    "西牟婁郡上富田町",
    "西牟婁郡すさみ町",
    "東牟婁郡那智勝浦町",
    "東牟婁郡太地町",
    "東牟婁郡古座川町",
    "東牟婁郡北山村",
    "東牟婁郡串本町",
  ],
  鳥取県: [
    "鳥取市",
    "米子市",
    "倉吉市",
    "境港市",
    "岩美郡岩美町",
    "八頭郡若桜町",
    "八頭郡智頭町",
    "八頭郡八頭町",
    "東伯郡三朝町",
    "東伯郡湯梨浜町",
    "東伯郡琴浦町",
    "東伯郡北栄町",
    "西伯郡日吉津村",
    "西伯郡大山町",
    "西伯郡南部町",
    "西伯郡伯耆町",
    "日野郡日野町",
    "日野郡日南町",
    "日野郡江府町",
  ],
  島根県: [
    "松江市",
    "浜田市",
    "出雲市",
    "益田市",
    "大田市",
    "安来市",
    "江津市",
    "雲南市",
    "八束郡東出雲町",
    "仁多郡奥出雲町",
    "飯石郡飯南町",
    "簸川郡斐川町",
    "邑智郡川本町",
    "邑智郡美郷町",
    "邑智郡邑南町",
    "鹿足郡津和野町",
    "鹿足郡吉賀町",
    "鹿足郡長門町",
  ],
  岡山県: [
    "岡山市北区",
    "岡山市中区",
    "岡山市南区",
    "岡山市東区",
    "倉敷市",
    "津山市",
    "玉野市",
    "笠岡市",
    "井原市",
    "総社市",
    "高梁市",
    "新見市",
    "備前市",
    "瀬戸内市",
    "赤磐市",
    "真庭市",
    "美作市",
    "浅口市",
    "小田郡矢掛町",
    "小田郡里庄町",
    "加賀郡吉備中央町",
    "苫田郡鏡野町",
    "苫田郡勝央町",
    "苫田郡奈義町",
    "苫田郡鏡野町",
    "真庭郡新庄村",
    "真庭郡美甘村",
    "真庭郡落合町",
    "備前郡備前町",
    "備前郡日生町",
    "備前郡吉永町",
    "備前郡東備町",
    "岡山郡岡山町",
  ],
  広島県: [
    "広島市中区",
    "広島市東区",
    "広島市南区",
    "広島市西区",
    "広島市安佐南区",
    "広島市安佐北区",
    "広島市佐伯区",
    "呉市",
    "竹原市",
    "三原市",
    "尾道市",
    "福山市",
    "府中市",
    "三次市",
    "安芸高田市",
    "江田島市",
    "大竹市",
    "東広島市",
    "廿日市市",
    "安芸郡府中町",
    "安芸郡海田町",
    "安芸郡坂町",
    "安芸郡熊野町",
    "山県郡安芸太田町",
    "山県郡安芸高田市",
    "山県郡北広島町",
    "山県郡西条町",
    "三原市三原町",
    "三原市尾道町",
  ],
  山口県: [
    "下関市",
    "山口市",
    "宇部市",
    "防府市",
    "萩市",
    "周南市",
    "光市",
    "長門市",
    "柳井市",
    "岩国市",
    "美祢市",
    "下松市",
    "周南市",
    "大島郡周防大島町",
    "熊毛郡上関町",
    "熊毛郡田布施町",
    "熊毛郡平生町",
    "玖珂郡和木町",
    "山陽小野田市",
  ],
  徳島県: [
    "徳島市",
    "鳴門市",
    "小松島市",
    "阿南市",
    "吉野川市",
    "阿波市",
    "美馬市",
    "三好市",
    "名西郡石井町",
    "名西郡神山町",
    "名東郡佐那河内村",
    "那賀郡那賀町",
    "那賀郡美波町",
    "那賀郡牟岐町",
    "那賀郡海陽町",
    "勝浦郡勝浦町",
    "勝浦郡上勝町",
    "上勝町",
    "美馬郡つるぎ町",
    "三好郡東みよし町",
  ],
  香川県: [
    "高松市",
    "丸亀市",
    "坂出市",
    "善通寺市",
    "観音寺市",
    "さぬき市",
    "東かがわ市",
    "三豊市",
    "木田郡三木町",
    "木田郡四国町",
    "香川郡直島町",
    "綾歌郡宇多津町",
    "綾歌郡綾川町",
    "仲多度郡琴平町",
    "仲多度郡多度津町",
    "仲多度郡まんのう町",
  ],
  愛媛県: [
    "松山市",
    "今治市",
    "宇和島市",
    "八幡浜市",
    "新居浜市",
    "西条市",
    "大洲市",
    "東温市",
    "伊予市",
    "松前町",
    "砥部町",
    "内子町",
    "八幡浜市",
    "喜多郡内子町",
    "喜多郡松野町",
    "喜多郡鬼北町",
    "周桑郡上島町",
    "周桑郡新居浜町",
    "周桑郡西条町",
    "伊予郡松前町",
    "伊予郡砥部町",
    "伊予郡内子町",
    "伊予郡松野町",
    "大洲郡大洲町",
    "大洲郡長浜町",
    "西予市宇和町",
    "西予市三瓶町",
    "西予市野村町",
  ],
  高知県: [
    "高知市",
    "南国市",
    "四万十市",
    "土佐清水市",
    "須崎市",
    "宿毛市",
    "高岡市",
    "香美市",
    "香南市",
    "土佐市",
    "いの町",
    "越知町",
    "佐川町",
    "檮原町",
    "梼原町",
    "津野町",
    "四万十町",
    "大月町",
    "黒潮町",
    "四万十市",
    "高知市",
    "安芸市",
  ],
  福岡県: [
    "福岡市中央区",
    "福岡市博多区",
    "福岡市東区",
    "福岡市南区",
    "福岡市城南区",
    "福岡市早良区",
    "北九州市小倉北区",
    "北九州市小倉南区",
    "北九州市八幡東区",
    "北九州市八幡西区",
    "北九州市戸畑区",
    "北九州市八幡西区",
    "久留米市",
    "直方市",
    "飯塚市",
    "田川市",
    "筑紫野市",
    "春日市",
    "大野城市",
    "宗像市",
    "宮若市",
    "嘉麻市",
    "朝倉市",
    "柳川市",
    "八女市",
    "筑後市",
    "大牟田市",
    "小郡市",
    "春日市",
    "大川市",
    "行橋市",
    "豊前市",
    "中間市",
    "小倉南区",
    "行橋市",
    "豊前市",
    "直方市",
    "中間市",
    "田川市",
    "糟屋郡志免町",
    "糟屋郡須恵町",
    "糟屋郡粕屋町",
    "糟屋郡新宮町",
    "糟屋郡久山町",
    "糟屋郡篠栗町",
    "糟屋郡志免町",
    "糟屋郡須恵町",
    "遠賀郡水巻町",
    "遠賀郡岡垣町",
    "遠賀郡芦屋町",
    "筑紫郡那珂川町",
  ],
  佐賀県: [
    "佐賀市",
    "唐津市",
    "多久市",
    "伊万里市",
    "武雄市",
    "鹿島市",
    "小城市",
    "鳥栖市",
    "嬉野市",
    "杵島郡白石町",
    "杵島郡有田町",
    "杵島郡江北町",
    "杵島郡江北町",
    "藤津郡太良町",
  ],
  長崎県: [
    "長崎市",
    "佐世保市",
    "島原市",
    "平戸市",
    "大村市",
    "諫早市",
    "雲仙市",
    "南島原市",
    "五島市",
    "西海市",
    "長与町",
    "時津町",
    "小値賀町",
    "宇久町",
    "松浦市",
    "壱岐市",
    "東彼杵郡川棚町",
    "東彼杵郡波佐見町",
    "西彼杵郡長与町",
    "西彼杵郡時津町",
    "北松浦郡佐々町",
    "北松浦郡松浦市",
  ],
  熊本県: [
    "熊本市中央区",
    "熊本市東区",
    "熊本市西区",
    "熊本市南区",
    "熊本市北区",
    "八代市",
    "人吉市",
    "荒尾市",
    "玉名市",
    "山鹿市",
    "菊池市",
    "宇土市",
    "上天草市",
    "宇城市",
    "阿蘇市",
    "合志市",
    "下益城郡美里町",
    "上益城郡甲佐町",
    "上益城郡益城町",
    "上益城郡嘉島町",
    "下益城郡城南町",
    "下益城郡砥用町",
    "球磨郡あさぎり町",
    "球磨郡球磨村",
    "球磨郡水上村",
    "球磨郡相良村",
    "球磨郡湯前町",
    "天草郡苓北町",
    "熊本郡熊本町",
    "熊本郡山鹿町",
    "熊本郡合志町",
  ],
  大分県: [
    "大分市",
    "別府市",
    "中津市",
    "日田市",
    "臼杵市",
    "津久見市",
    "竹田市",
    "豊後大野市",
    "佐伯市",
    "豊後高田市",
    "玖珠町",
    "豊後町",
    "玖珠郡玖珠町",
    "玖珠郡九重町",
    "玖珠郡九重町",
    "臼杵市",
  ],
  宮崎県: [
    "宮崎市",
    "都城市",
    "延岡市",
    "日向市",
    "小林市",
    "日南市",
    "えびの市",
    "西都市",
    "串間市",
    "高鍋町",
    "木城町",
    "川南町",
    "都農町",
    "門川町",
    "高原町",
    "宮崎郡高鍋町",
    "宮崎郡西都市",
    "宮崎郡串間市",
    "宮崎郡日向市",
    "北諸県郡三股町",
    "児湯郡川南町",
    "児湯郡都農町",
    "児湯郡木城町",
  ],
  鹿児島県: [
    "鹿児島市",
    "鹿屋市",
    "霧島市",
    "薩摩川内市",
    "指宿市",
    "枕崎市",
    "南さつま市",
    "日置市",
    "伊佐市",
    "姶良市",
    "志布志市",
    "西之表市",
    "奄美市",
    "鹿児島郡十島村",
    "南九州市",
    "南さつま市",
    "いちき串木野市",
    "阿久根市",
    "出水市",
    "枕崎市",
  ],
  沖縄県: [
    "那覇市",
    "沖縄市",
    "うるま市",
    "宮古島市",
    "石垣市",
    "浦添市",
    "豊見城市",
    "糸満市",
    "南城市",
    "北谷町",
    "南風原町",
    "与那原町",
    "八重瀬町",
    "久米島町",
    "渡嘉敷村",
    "座間味村",
    "粟国村",
    "南大東村",
    "北大東村",
    "多良間村",
  ],
};
