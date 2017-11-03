var StopWatch = function (container) {
  this.container = container;
  this.value = 0;
  this.intervalId = null;
  this.clockCircle = null;
  this.clockHand = null;
  this.DEGREE_IN_SECONDS = 6;

  if (!this.container) {
    throw new Error('Please, provide an existing DOM element!');
  }

  this._drawClock(this.container);
};

StopWatch.prototype.start = function () {
  var self = this;
  if (this.intervalId) return;

  this.intervalId = setInterval(function () {
    self._tick();
    self._rotateHand(self.clockHand, self.value);
  }, 1000);
};

StopWatch.prototype.pause = function () {
  this._reset();
};

StopWatch.prototype.stop = function () {
  this._reset(true);
};

StopWatch.prototype._tick = function () {
  if (this.value === 60) {
    this.value = 0;
  }

  this.value += 1;
};

StopWatch.prototype._rotateHand = function (hand, seconds) {
  hand.style.transform = 'rotate(' + seconds * this.DEGREE_IN_SECONDS + 'deg)';
};

StopWatch.prototype._reset = function (full) {
  clearInterval(this.intervalId);
  this.intervalId = null;
  
  if (full) {
    this.value = 0;
    this._rotateHand(this.clockHand, 0);
  } 
};

StopWatch.prototype._drawClock = function (container) {
  var clockCircle = document.createElement('div'),
    clockHand = document.createElement('div');

  clockCircle.classList.add('clock-circle');
  clockHand.classList.add('clock-hand');

  
  this.clockCircle = container.appendChild(clockCircle);
  this.clockHand = this.clockCircle.appendChild(clockHand);
};

var newClock = new StopWatch(document.getElementById('clock'));

var debugButtons = document.querySelector('.clock-buttons'),
  valueBlock = document.querySelector('.clock-value');

debugButtons.addEventListener('click', function (e) {
  if (!e.target.classList.contains('js-clock-btn')) return;

  var type = e.target.dataset.type;

  if (type === 'value') {
    valueBlock.innerHTML = 'Current value: ' + newClock.value;
  } else {
    newClock[type]();
  }
});

