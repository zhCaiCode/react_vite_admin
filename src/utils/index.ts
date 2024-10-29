/*
 * 工具函数封装
 */

export function formatMoney(num: number) {
  return num.toLocaleString("zh-CN", { style: "currency", currency: "CNY" });
}

export function formatNumber(num: string | number) {
  const a = num.toString();
  let reg = /(\d)(?=(\d{3})+$)/g;
  if (a.indexOf(".") > -1) {
    reg = /(\d)(?=(\d{3})+\.)/g;
  }
  return a.replace(reg, "$1,");
}

export function formatDate(date?: Date, rules?: string) {
  let curDate = new Date();
  if (date) curDate = date;
  interface OTypes {
    [key: string]: number;
  }
  const o: OTypes = {
    "y+": curDate.getFullYear(),
    "M+": curDate.getMonth() + 1,
    "d+": curDate.getDate(),
    "H+": curDate.getHours(),
    "m+": curDate.getMinutes(),
    "s+": curDate.getSeconds(),
  };
  let fmt = rules || "yyyy-MM-dd HH:mm:ss";
  for (const key in o) {
    const val = o[key].toString();
    fmt = fmt.replace(
      new RegExp(`(${key})`),
      ("00" + val).substring(val.length)
    );
  }
  return fmt;
}
