export function getNowTime() {
    let time = new Date().getTime();
    let date = new Date(time);
    let HG = '-';
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let days = date.getDate();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (days >= 0 && days <= 9) {
        days = "0" + days;
    }

    let NowDate = year + HG + month + HG + days;
    return NowDate;
}

export function getLestWeekTime() {
    let time = new Date().getTime()-24*60*60*1000*7;
    let date = new Date(time);
    let HG = '-';
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let days = date.getDate();



    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (days >= 0 && days <= 9) {
        days = "0" + days;
    }

    let NowDate = year + HG + month + HG + days;
    return NowDate;
}
