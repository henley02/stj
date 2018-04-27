export default {
  name: 'global',
  filters: {
    /**
     * 日期格式化
     * @param input 输入的值
     * @param format 格式
     * @returns {string}
     */
    date(value, format = 'yyyy-MM-dd hh:mm:ss') {
      if (typeof value === 'number' || typeof value === 'string') {
        if (typeof value === 'string') {
          value = value.replace(/-/g, '/');
        }
        value = new Date(value);
      }
      let args = {
        'M+': value.getMonth() + 1,
        'd+': value.getDate(),
        'h+': value.getHours(),
        'm+': value.getMinutes(),
        's+': value.getSeconds(),
        'q+': Math.floor((value.getMonth() + 3) / 3),
        S: value.getMilliseconds()
      };
      if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length));
      for (let i in args) {
        let n = args[i];
        if (new RegExp('(' + i + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length));
      }
      return format;
    },
    /**
     * 格式化数字
     * @param number    传进来的数字
     * @param places    保留的小数点位数，默认为2位
     * @param symbol    货币称号，默认为人民币
     * @param thousand  千位符
     * @param decimal   小数点
     * @param return
     */
    currency(number, places, symbol = '$', thousand = ',', decimal = '.') {
      number = number || 0;
      places = !isNaN(places = Math.abs(places)) ? places : 2;
      let negative = number < 0 ? '-' : '';
      let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '';
      let j = i.length > 3 ? i.length % 3 : 0;
      return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '');
    }
  },
  methods: {
    /**
     * 数组去重
     * @param array
     * @returns {Array}
     * @private
     */
    _arrayDistinct(array) {
      let self = array.concat().sort();
      let a = [];
      let b = [];
      for (let prop in self) {
        let d = self[prop];
        /**
         * 防止循环到prototype
         */
        if (d === a[prop]) continue;
        if (b[d] !== 1) {
          a.push(d);
          b[d] = 1;
        }
      }
      return a;
    }
  }
};
