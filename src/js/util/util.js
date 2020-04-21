let util = {};

let _timeoutHandlers = {};
let _throttleHistory = {}; //fn -> lastCallTime
util.DEFAULT_KEY = 'DEFAULT_KEY';
util.DEFAULT_KEY2 = 'DEFAULT_KEY2';

/**
 * Calls the given function after a specified timeout. Another subsequent call cancels and restarts the timeout.
 *
 * @param fn the function to call
 * @param timeout
 * @param key for identifying the called function. If several functions are debounced at the same time, different keys
 *        have to be specified for identifying them
 */
util.debounce = function (fn, timeout, key) {
    key = key || util.DEFAULT_KEY;
    if (!fn && !timeout) {
        log.warn('called util.debounce() without needed parameters. aborting.');
        return;
    }
    if (_timeoutHandlers[key]) {
        clearTimeout(_timeoutHandlers[key]);
    }
    _timeoutHandlers[key] = setTimeout(function () {
        fn();
    }, timeout);
};

/**
 * clears any existing timeout created by "debounce()" before by given key
 * @param key
 */
util.clearDebounce = function (key) {
    key = key || util.DEFAULT_KEY;
    if (_timeoutHandlers[key]) {
        clearTimeout(_timeoutHandlers[key]);
    }
};

/**
 * Throttles a high call rate on a given function.
 *
 * @param fn the function to call
 * @param args the arguments to pass to the function to call
 * @param minPauseMs minimum pause in milliseconds between two function calls of the same function. If last call
 *        was more than minPausMs ago, the given function is called, otherwise the function call is discarded.
 * @param key unique key to identify the given function (optional)
 */
util.throttle = function (fn, args, minPauseMs, key) {
    if (!fn || !fn.apply) {
        return;
    }
    minPauseMs = minPauseMs || 500;
    let historyKey = key || fn;
    let lastCall = _throttleHistory[historyKey];
    if (!lastCall || new Date().getTime() - lastCall > minPauseMs) {
        fn.apply(null, args);
        _throttleHistory[historyKey] = new Date().getTime();
    }
};

util.getQuestionNumber = function (question) {
    if (!question || !question.id || !question.label) {
        return '';
    }
    return question.label;
};

export {util};