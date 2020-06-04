// Your code here
function createEmployeeRecord(params){
  return {
    firstName: params[0],
    familyName: params[1],
    title: params[2],
    payPerHour: params[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

function createEmployeeRecords(rows){
  return rows.map(createEmployeeRecord);
}

function createTimeInEvent(record, time){
  return createTimeEvent(record, time, "TimeIn");
}

function createTimeOutEvent(record, time){
  return createTimeEvent(record, time, "TimeOut");
}

function createTimeEvent(record, time, type){
  const splitTime = time.split(' ');
  const date = splitTime[0];
  const hour = parseInt(splitTime[1]);
  if (type === "TimeIn"){
    record.timeInEvents.push({type: type, date: date, hour: hour});
  }else if(type === "TimeOut"){
    record.timeOutEvents.push({type: type, date: date, hour: hour});
  }
  return record;
}

function hoursWorkedOnDate(record, date){
  //assuming that worker can only clock in and out once a day (so using "find" rather than "filter")
  const timeInEventOnDate = record.timeInEvents.find(time => time.date == date);
  if (timeInEventOnDate == undefined){
    alert(`${record.firstName} ${record.familyName} did not work on ${date}.`)
  } else {
    const startingHour = parseInt(timeInEventOnDate.hour);
    //assuming that a worker must timeOut on the same day
    const timeOutEventOnDate = record.timeOutEvents.find(time => time.date == date);
    const endingHour = parseInt(timeOutEventOnDate.hour);
    return (endingHour - startingHour)/100;
  }
}

function wagesEarnedOnDate(record, date){
  const hoursWorked = hoursWorkedOnDate(record, date);
  const payRate = record.payPerHour;
  return hoursWorked * payRate;
}

function allWagesFor(record){
  const allDates = record.timeInEvents.map(timeInEvent => timeInEvent.date);
  return allDates.reduce((total, date) => total + wagesEarnedOnDate(record, date), 0);
}
<<<<<<< HEAD

function calculatePayroll(employees){
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}


function findEmployeeByFirstName(employees, firstName){
  return employees.find((employee) => employee.firstName == firstName);
}
=======
>>>>>>> 5d562906dc7d2684d80fa6ebfa58ea798182ab27
