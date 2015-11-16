export default {
  load: function (name, req, load, config) {
    let modes = {};
    let checksPassed = true;

    if (config && config.isBuild && config.config && config.config.mode) {
      config.config.mode.split(',').map((mode) => {
        modes[mode] = true;
      });
    } else if (!config && window && window.app && window.app.mode) {
      modes = window.app.mode;
    }

    const initial = name.split('?');
    const checks = initial.shift().split(',');
    const fullCond = initial.toString().split(':');
    const fail = fullCond.length > 1 ? fullCond.pop() : false;
    const pass = fullCond.toString();

    for (let i = 0; i < checks.length; i++) {
      let mode = checks[i];

      if (!modes[mode]) {
        checksPassed = false;
      }
    }

    if (checksPassed) {
      req([pass],load);
    } else if (fail) {
      req([fail],load);
    } else {
      req([],load);
    }
  }
};
