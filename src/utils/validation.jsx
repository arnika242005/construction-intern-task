export function validateLogin({ email, password }) {
    const errors = {};
    if (!email.trim()) errors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
    if (!password) errors.password = 'Password is required.';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
    return errors;
  }
  
  export function validateDPR({ projectId, date, weather, workDescription, workerCount }) {
    const errors = {};
    if (!projectId) errors.projectId = 'Please select a project.';
    if (!date) errors.date = 'Date is required.';
    if (!weather) errors.weather = 'Please select weather condition.';
    if (!workDescription.trim()) errors.workDescription = 'Work description is required.';
    else if (workDescription.trim().length < 20) errors.workDescription = 'Please provide at least 20 characters.';
    if (!workerCount) errors.workerCount = 'Worker count is required.';
    else if (isNaN(workerCount) || Number(workerCount) < 1) errors.workerCount = 'Enter a valid number (min 1).';
    else if (Number(workerCount) > 9999) errors.workerCount = 'Worker count seems too high.';
    return errors;
  }