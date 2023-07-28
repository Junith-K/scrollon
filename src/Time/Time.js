import moment from "moment/moment";

const getTime = (date1,date2) => {
    const duration = moment.duration(date2.diff(date1));
    return duration.humanize()
}

export default getTime;