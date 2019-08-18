const low = require('lowdb')
const express = require('express');
const FileSync = require('lowdb/adapters/FileSync')
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const moment = require("moment");
const cors = require('cors')
const adapter = new FileSync('../db.json');
const db = low(adapter);

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

http.listen(process.env.PORT || 4000);

console.log("WC-Tempo Server:");
console.log("============================");
console.log("Server Running port 4000")

const uniqueId = () => {
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now();
  }
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

const betweenDate = (startDt, endDt) => {
  var error = ((isDate(endDt)) && (isDate(startDt)) && isValidRange(startDt, endDt)) ? false : true;
  var between = [];
  if (error) console.log('betweenDate: invalid dates provided');
  else {
    var currentDate = new Date(startDt),
      end = new Date(endDt);
    while (currentDate <= end) {
      between.push(formatDate(new Date(currentDate)).toString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  return between;
}

const punctuality = (timein, maxtime) => {
  if (Date.parse(`1/1/1 ${maxtime}`) < Date.parse(`1/1/1 ${timein}`)) {
    return "LATE";
  } else {
    return "ON TIME";
  }
}

const dayofweek = (date) => {
  let dtx = moment(date, "YYYY/MM/DD");
  let dayofweek = dtx.format('dddd');
  return dayofweek;
}



app.get("/getRules", (req, res) => {
  res.send({
    status: "ok",
    users: db.get("rules").value(),
  })
})

app.get("/getEvents", (req, res) => {
  res.send({
    status: "ok",
    events: db.get("events").value(),
  });
})

app.get("/getUsers", (req, res) => {
  res.send({
    status: "ok",
    users: db.get("users").value(),
  })
})

app.post("/addUser", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let checkUserInstance = db.get("users").find({ email: email }).value();
  if (name && email) {
    if (!checkUserInstance) {
      db.get("users").value().push({ "name": name, "email": email });
      db.write();
      res.send({
        status: "ok",
        message: "Account created successfully"
      })
    } else {
      res.send({
        status: "error",
        message: "User already exists."
      })
    }
  } else {
    res.send({
      status: "error",
      message: "Bad Request"
    })
  }
});

app.post("/deleteUser", (req, res) => {
  let userId = req.body.id;
  if (userId) {
    let userExist = db.get("users").find({ email: userId }).value();
    if (userExist) {
      db.get("users").remove({ email: userId }).write();
      res.send({
        status: "ok",
        message: "User deleted successfully"
      })
    } else {
      res.send({
        status: "ok",
        message: "User not found!"
      })
    }
  } else {
    res.send({
      status: "error",
      message: "Bad Request!"
    })
  }
})

app.post("/addEvent", (req, res) => {
  let eventDate = req.body.date;
  let eventDescription = req.body.description;
  let eventType = req.body.type;
  if (eventDate && eventDescription && eventType) {
    let checkEventInstance = db.get("events").find({ date: eventDate }).value();
    if (!checkEventInstance) {
      db.get("events").value().push({ "date": eventDate, "description": eventDescription, "type": eventType })
      db.write();
      res.send({
        status: "ok",
        message: "Event added succesfully"
      })
    } else {
      res.send({
        status: "error",
        message: "Event already exists."
      })
    }
  } else {
    res.send({
      status: "error",
      message: "Bad Request"
    })
  }
})

app.post("/deleteEvent", (req, res) => {
  let eventId = req.body.date;
  if (eventId) {
    let eventExist = db.get("events").find({ date: eventId }).value();
    if (eventExist) {
      db.get("events").remove({ date: eventId }).write();
      res.send({
        status: "ok",
        message: "Event deleted successfully"
      })
    } else {
      res.send({
        status: "ok",
        message: "Event not found!"
      })
    }
  } else {
    res.send({
      status: "error",
      message: "Bad Request!"
    })
  }
});

app.post("/editUser", (req, res) => {
  let userId = req.body.id;
  let newName = req.body.name;
  if (userId && newName) {
    let userExist = db.get("users").find({ email: userId }).value();
    if (userExist) {
      db.get("users").find({ email: userId }).value().name = newName;
      db.write();
      res.send({
        status: "ok",
        message: "User updated successfully."
      })
    } else {
      res.send({
        status: "ok",
        message: "User not found!"
      })
    }
  } else {
    res.send({
      status: "error",
      message: "Bad Request!"
    })
  }
});

app.post("/editUser", (req, res) => {
  let userId = req.body.id;
  let newName = req.body.name;
  if (userId && newName) {
    let userExist = db.get("users").find({ email: userId }).value();
    if (userExist) {
      db.get("users").find({ email: userId }).value().name = newName;
      db.write();
      res.send({
        status: "ok",
        message: "User updated successfully."
      })
    } else {
      res.send({
        status: "ok",
        message: "User not found!"
      })
    }
  } else {
    res.send({
      status: "error",
      message: "Bad Request!"
    })
  }
});

app.post("/editEvent", (req, res) => {
  let eventDate = req.body.date;
  let newEventDescription = req.body.description;
  let newEventType = req.body.type;
  if (eventDate && newEventDescription && newEventType) {
    let eventExist = db.get("events").find({ date: eventDate }).value();
    if (eventExist) {
      let eventToUpdate = db.get("events").find({ date: eventDate }).value()
      eventToUpdate.description = newEventDescription;
      eventToUpdate.type = newEventType;
      db.write();
      res.send({
        status: "ok",
        message: "Event updated successfully."
      })
    } else {
      res.send({
        status: "ok",
        message: "Event not found!"
      })
    }
  } else {
    res.send({
      status: "error",
      message: "Bad Request!"
    })
  }
});

app.post("/editRules", (req, res) => {
  let rules = db.get("rules").value();
  rules.max_offsets = req.body.max_offsets;
  rules.admins = req.body.admins;
  rules.min_timein = req.body.min_timein;
  rules.max_timein = req.body.max_timein;
  rules.freedays = req.body.freedays;

  db.write();

  res.send({
    status: "ok",
    rules: db.get("rules").value()
  })
})

app.post("/fileLeave", (req, res) => {
  let userId = req.body.id;
  let date = req.body.date;
  let reason = req.body.reason;
  let leaveInstance = db.get('leaves').find({ user: userId, date: date }).value();
  if (!leaveInstance) {
    db.get("leaves").value().push({
      leaveId: uniqueId(),
      user: userId,
      date: date,
      reason: reason,
      name: req.body.name,
      reviewer: "",
      status: "PENDING",
      date_filed: moment().format("YYYY/MM/DD"),
      date_reviewed: ""
    })
    db.write();
    res.send({
      status: "ok",
      message: "Successfuly filed a leave",
    })
  } else {
    res.send({
      status: "error",
      message: "A leave on the given date already exists!"
    })
  }
})

app.post("/manageLeave", (req, res) => {
  let reviewer = req.body.reviewer;
  let leaveId = req.body.leaveId;
  let reviewState = req.body.review;
  let selectedLeave = db.get('leaves').find({ leaveId: leaveId }).value();
  selectedLeave.reviewer = reviewer;
  selectedLeave.status = reviewState;
  selectedLeave.date_reviewed = moment().format("YYYY/MM/DD");
  db.write();

  res.send({
    status: "ok",
    message: "Leave managed successfully"
  })
})

app.post("/timein", (req, res) => {
  let user = req.body.user, timein = req.body.timein, method = req.body.method;
  let date = req.body.date, wildcard = req.body.wildcard;
  let remarks = req.body.remarks, rules = db.get("rules").value();
  let attendanceState = punctuality(timein, rules['max_timein']), info = "";
  let all_entries = db.get("timelogs").find({ user: user }).value();



  if (all_entries) {
    let entries = [all_entries];
    let last_entry = entries[(entries.length - 1)];
    if (last_entry.timeout === "-") {

      res.send({
        status: "invalid",
        type: "no-timeout",
        message: "You forgot to time out.",
        day: dayofweek(last_entry.date),
        date: last_entry.date
      })

    } else if (last_entry.date === date) {
      res.send({
        status: "invalid",
        type: "double-entry",
        message: "You already timed in!"
      })
    } else {


      if (attendanceState === "LATE" && wildcard === "overtime") {
        attendanceState = "ON TIME"
      }

      if (Date.parse(`1/1/1 ${timein}`) < Date.parse(`1/1/1 ${rules['min_timein']}`)) {
        console.log(`[${user}] has timed in too early!`);
        timein = rules['min_timein'];
        info = "too_early";
      }

      remarks = rules[date];


      let timeLog = {
        user: user,
        timein: timein,
        timeout: "-",
        date: date,
        wildcard: wildcard,
        remarks: remarks,
        status: attendanceState,
        inToday: true
      }

      db.get("timelogs").value().push(timeLog);
      db.write()

      res.send({
        status: 'ok',
        info: info,
        message: "Successful Time in",
        timeData: timeLog
      })

    }
  } else {
    if (attendanceState === "LATE" && wildcard === "overtime") {
      attendanceState = "ON TIME"
    }

    if (Date.parse(`1/1/1 ${timein}`) < Date.parse(`1/1/1 ${rules['min_timein']}`)) {
      console.log(`[${user}] has timed in too early!`);
      timein = rules['min_timein'];
      info = "too_early";
    }

    remarks = rules[date];


    let timeLog = {
      user: user,
      timein: timein,
      timeout: "-",
      date: date,
      wildcard: wildcard,
      remarks: remarks,
      status: attendanceState,
      inToday: true
    }

    db.get("timelogs").value().push(timeLog);
    db.write()

    res.send({
      status: 'ok',
      info: info,
      message: "Successful Time in",
      timeData: timeLog
    })

  }
})

app.post("/timeout", (req, res) => {
  let user = req.body.user, timeout = req.body.timeout;
  let date = req.body.date;

  let all_entries = db.get("timelogs").find({ user: user }).value();

  if (all_entries) {
    let entries = [all_entries];
    let last_entry = entries[(entries.length - 1)];

    if (last_entry.date === date && last_entry.timeout === "-") {
      let timeoutaction = [db.get("timelogs").find({ user: user }).value()];
      timeoutaction[timeoutaction.length - 1].timeout = timeout;
      db.write();

      let timeoutdata = db.get("timelogs").find({ user: user }).value();

      timeoutdata.inToday = false

      db.write()

      res.send({
        status: "ok",
        message: "You have timed out!",
        timeData: [
          timeoutdata
        ]
      })
    } else {
      res.send({
        status: "invalid",
        message: "Fogotten time out",
        type: "forgot_timeout",
        date: last_entry.date,
        timein: last_entry.timein,
        day: dayofweek(last_entry.date)
      })
    }

  } else {
    res.send({
      status: "error",
      message: "You haven't even timed in yet."
    })
  }

})

app.post("/getTimesheet", (req, res) => {
  let user = req.body.id;
  let timelogSheet = db.get("timelogs").filter({ user: user }).value();
  if (timelogSheet) {
    res.send({
      status: "ok",
      timesheet: timelogSheet
    })
  } else {
    res.send({
      status: "error",
      message: "No timelogs found"
    })
  }
})


app.get("/appState", (req, res) => {
  let user = req.query.email
  let state = db.get("timelogs").find({ user: user, date: moment().format("YYYY/MM/DD") }).value();

  if (state) {
    let entries = [state];
    let last_entry = entries[(entries.length - 1)];

    res.send(last_entry);
  } else {
    res.send({})
  }

})

app.get("/getAttendance", (req, res) => {
  let date = req.query.date;
  let attendancedata;

  if (db.get('timelogs').find({ date: date }).value()) {
    attendancedata = db.get('timelogs').find({ date: date }).value();
  } else {
    attendancedata = [];
  }
  if (date) {
    res.send({
      status: "ok",
      attendance: attendancedata
    })
  } else {
    res.send({
      status: "error",
      message: "Bad request"
    })
  }
})

app.get("/getLeaves", (req, res) => {
  let user = req.query.id;
  let data = db.get('leaves').filter({ user: req.query.id }).value();
  if (data) {
    res.send({
      status: "ok",
      leaves: data
    });
  } else {
    res.send({
      status: "no data",
    })
  }
})














