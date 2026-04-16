'use strict';

/* ============================================================
   THE SPOT NASHUA — Dynamic Calendar Renderer
   ============================================================
   Reads event data from window.SPOT_EVENTS (set by calendar-data.js)
   and renders monthly calendar grids for the current + next month.

   Called from DOMContentLoaded in main.js:
     initDynamicCalendar();
   ============================================================ */

/**
 * Event type keys mapped to display labels for calendar tags.
 */
var CALENDAR_TYPE_LABELS = {
  'open-mic':   'Open Mic',
  'dj':         'DJ',
  'trivia':     'Trivia',
  'karaoke':    'Karaoke',
  'acoustic':   'Acoustic',
  'comedy':     'Comedy',
  'sound-bath': 'Sound Bath',
  'poetry':     'Poetry',
  'live-band':  'Live Band',
  'special':    'Special'
};

/**
 * Month names for title display.
 */
var CALENDAR_MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

/**
 * Day-of-week header labels (Sunday-first).
 */
var CALENDAR_DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Zero-pad a number to two digits.
 */
function calPad(n) {
  return n < 10 ? '0' + n : '' + n;
}

/**
 * Format a date as 'YYYY-MM-DD' for lookup in SPOT_EVENTS.
 */
function calDateKey(year, month, day) {
  return year + '-' + calPad(month + 1) + '-' + calPad(day);
}

/**
 * Get the number of days in a given month (0-indexed month).
 */
function calDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day-of-week the first of the month falls on (0 = Sunday).
 */
function calFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

/**
 * Get the display label for an event type.
 * Falls back to the raw event name if the type is unrecognized.
 */
function calEventLabel(event) {
  if (event.type && CALENDAR_TYPE_LABELS[event.type]) {
    return CALENDAR_TYPE_LABELS[event.type];
  }
  return event.name || 'Event';
}

/**
 * Build the HTML string for a single month's calendar.
 *
 * @param {number} year       - Full year (e.g. 2026)
 * @param {number} month      - Zero-indexed month (0 = January)
 * @param {string} theme      - 'cal-dark' or 'cal-light'
 * @param {Object} eventsData - The window.SPOT_EVENTS object
 * @returns {string} HTML string for the full month section
 */
function calBuildMonth(year, month, theme, eventsData) {
  var today = new Date();
  var todayYear = today.getFullYear();
  var todayMonth = today.getMonth();
  var todayDate = today.getDate();

  var daysInMonth = calDaysInMonth(year, month);
  var firstDow = calFirstDayOfWeek(year, month);
  var monthName = CALENDAR_MONTH_NAMES[month];
  var isDark = theme === 'cal-dark';

  // Determine if a given day is in the past
  // A day is past if it's before today (not including today)
  function isDayPast(day) {
    var cellDate = new Date(year, month, day);
    var todayStart = new Date(todayYear, todayMonth, todayDate);
    return cellDate < todayStart;
  }

  function isDayToday(day) {
    return year === todayYear && month === todayMonth && day === todayDate;
  }

  // Section background
  var sectionBg = isDark ? '#0F272E' : '#fff';
  var titleColor = isDark ? 'var(--teal-primary)' : 'var(--teal-deep)';
  var subtitleColor = isDark ? 'rgba(255,255,255,0.6)' : 'var(--text-body)';

  var html = '';

  // Wave divider between months
  if (isDark) {
    html += '<div class="wave-divider" style="background:#fff;">';
    html += '<svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">';
    html += '<path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="#0F272E"/>';
    html += '</svg></div>';
  } else {
    html += '<div class="wave-divider" style="background:#0F272E;">';
    html += '<svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">';
    html += '<path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff"/>';
    html += '</svg></div>';
  }

  // Section open
  html += '<section style="background:' + sectionBg + ';padding:60px 0;">';
  html += '<div class="container">';

  // Title
  html += '<h2 style="font-family:\'Norwester\',sans-serif;font-size:clamp(32px,5vw,56px);color:' + titleColor + ';text-align:center;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;" class="animate-on-scroll">';
  html += monthName + ' ' + year;
  html += '</h2>';

  // Subtitle
  html += '<p style="text-align:center;color:' + subtitleColor + ';font-family:\'Roboto Condensed\',sans-serif;font-size:16px;margin-bottom:30px;" class="animate-on-scroll">';
  html += '217 Main Street &bull; Nashua, NH &bull; All Shows Free Entry';
  html += '</p>';

  // Calendar grid
  html += '<div class="cal-grid ' + theme + ' animate-on-scroll">';

  // Day-of-week headers
  for (var h = 0; h < CALENDAR_DAY_HEADERS.length; h++) {
    html += '<div class="cal-day-header">' + CALENDAR_DAY_HEADERS[h] + '</div>';
  }

  // Empty cells before the 1st
  for (var e = 0; e < firstDow; e++) {
    html += '<div class="cal-cell-empty"></div>';
  }

  // Day cells
  for (var d = 1; d <= daysInMonth; d++) {
    var dateKey = calDateKey(year, month, d);
    var dayEvents = eventsData[dateKey] || [];
    var hasEvent = dayEvents.length > 0;
    var past = isDayPast(d);
    var isToday = isDayToday(d);

    // Build class list
    var cellClasses = 'cal-cell';
    if (hasEvent) cellClasses += ' has-event';
    if (past) cellClasses += ' cal-past';
    if (isToday) cellClasses += ' cal-today';

    // Inline opacity for past days (cal-past has no CSS rule yet)
    var cellStyle = past ? ' style="opacity:0.5"' : '';

    html += '<div class="' + cellClasses + '"' + cellStyle + '>';
    html += '<div class="cal-cell-num">' + d + '</div>';

    // Render events for this day
    for (var ev = 0; ev < dayEvents.length; ev++) {
      var event = dayEvents[ev];
      html += '<div class="cal-event-tag">' + calEventLabel(event) + '</div>';
      if (event.time) {
        html += '<div class="cal-event-time">' + event.time + '</div>';
      }
    }

    html += '</div>';
  }

  // Empty cells after the last day to fill out the final week
  var totalCells = firstDow + daysInMonth;
  var trailing = totalCells % 7;
  if (trailing > 0) {
    for (var t = 0; t < 7 - trailing; t++) {
      html += '<div class="cal-cell-empty"></div>';
    }
  }

  html += '</div>'; // .cal-grid
  html += '</div>'; // .container
  html += '</section>';

  return html;
}

/**
 * Main entry point. Renders dynamic calendars into #dynamic-calendars.
 * Shows the current month and the next month, alternating dark/light themes.
 */
function initDynamicCalendar() {
  var container = document.getElementById('dynamic-calendars');
  if (!container) return;

  // Require event data
  var eventsData = window.SPOT_EVENTS;
  if (!eventsData || typeof eventsData !== 'object') {
    eventsData = {};
  }

  var now = new Date();
  var currentYear = now.getFullYear();
  var currentMonth = now.getMonth();

  // Calculate next month (handles year rollover)
  var nextMonth = currentMonth + 1;
  var nextYear = currentYear;
  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear = currentYear + 1;
  }

  // Build both months
  var html = '';
  html += calBuildMonth(currentYear, currentMonth, 'cal-dark', eventsData);
  html += calBuildMonth(nextYear, nextMonth, 'cal-light', eventsData);

  container.innerHTML = html;

  // Re-observe any new animate-on-scroll elements inside the container
  // so scroll animations still work for dynamically inserted content
  if (typeof IntersectionObserver !== 'undefined') {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    var animatedEls = container.querySelectorAll('.animate-on-scroll');
    for (var i = 0; i < animatedEls.length; i++) {
      observer.observe(animatedEls[i]);
    }
  }
}
