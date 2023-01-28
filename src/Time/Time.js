import moment from "moment/moment";

const getTime = (date1,date2) => {
    console.log(date1);
    console.log(date2)

    const duration = moment.duration(date2.diff(date1));
    return duration.humanize()
}

export default getTime;