const getDateString = () => {
  const date = new Date();

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions;

  const formattedDate = date.toLocaleString('en-GB', options);

  console.log(formattedDate); // Output: "14:00 22.08.2021"
  return formattedDate;
};

export default getDateString;
