const GET_DATE_FORMAT = (strDate, type) => {
  if (strDate.length <= 12) {
    // convertDateType(strDate);
    return strDate;
  }

  const date = new Date(strDate);

  switch (type.toUpperCase()) {
    case "GETTIME":
      return `${date.toLocaleString("th-TH")}`;
    case "NOTIME":
      return `${date.toLocaleDateString("th-TH")}`;
    default:
      return `${date.toLocaleString("th-TH")}`;
  }
  // return `${date.getHours()}:${date.getMinutes().toLocaleString('th-TH', { timeZone: 'UTC' } )}:${date.getSeconds()} | ${date.getDate()}-${date.getMonth()}-${date.getFullYear() + 543}`;
};

const CONVERT_STR_TO_DATE_TYPE = (strDate) => {
  if (strDate.length <= 12) {
    strDate = strDate.split("/");
    strDate = `${strDate[1]}/${strDate[0]}/${parseInt(strDate[2]) - 543}`;
    return new Date(strDate);
  }
  return new Date(strDate);
};

export { GET_DATE_FORMAT, CONVERT_STR_TO_DATE_TYPE };
