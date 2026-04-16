/**
 * The Spot — Calendar Event Data
 * ================================
 *
 * HOW TO UPDATE (for Mike or anyone editing):
 *
 *   1. Find the month you want to change below.
 *   2. Each date looks like this:
 *
 *        '2026-06-05': [{ name: 'Open Mic Night', type: 'open-mic', time: '7-10PM' }],
 *
 *      - The date is YYYY-MM-DD (year-month-day).
 *      - "name" is what shows on the calendar.
 *      - "type" controls the color tag. Pick one from the list below.
 *      - "time" is the display time (whatever you want visitors to see).
 *
 *   3. To ADD a new event, copy any line, change the date/name/type/time.
 *   4. To REMOVE an event, delete the whole line for that date.
 *   5. To put TWO events on the same day, add a second object inside the brackets:
 *
 *        '2026-07-04': [
 *          { name: 'Afternoon BBQ Jam', type: 'special', time: '2-5PM' },
 *          { name: 'Fireworks DJ Set',  type: 'dj',      time: '8PM-12AM' }
 *        ],
 *
 * EVENT TYPES (these control the colored tag on the calendar):
 *   'open-mic'   — Open Mic Night
 *   'dj'         — DJ Night / DJ Set
 *   'trivia'     — Trivia Night
 *   'karaoke'    — Karaoke Night
 *   'acoustic'   — Acoustic Night
 *   'comedy'     — Comedy Night
 *   'sound-bath' — Sound Bath
 *   'poetry'     — Poetry Slam
 *   'live-band'  — Live Band
 *   'special'    — Special Event (holidays, themed nights, etc.)
 *
 * The calendar renderer (calendar.js) automatically builds monthly grids from this data.
 */

window.SPOT_EVENTS = {

  // =========================================================================
  //  APRIL 2026  (starts on Wednesday)
  //  Extracted from the live-music.html hardcoded calendar
  // =========================================================================

  '2026-04-17': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-04-18': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],
  '2026-04-22': [{ name: 'Trivia Night',    type: 'trivia',     time: '7-9PM' }],
  '2026-04-24': [{ name: 'Acoustic Night',  type: 'acoustic',   time: '7-10PM' }],
  '2026-04-25': [{ name: 'Karaoke Night',   type: 'karaoke',    time: '8-11PM' }],
  '2026-04-27': [{ name: 'Sound Bath',      type: 'sound-bath', time: '4-6PM' }],

  // =========================================================================
  //  MAY 2026  (starts on Friday)
  //  Extracted from the live-music.html hardcoded calendar
  // =========================================================================

  '2026-05-01': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-05-02': [{ name: 'Live Band',       type: 'live-band',  time: '8-11PM' }],
  '2026-05-07': [{ name: 'Trivia Night',    type: 'trivia',     time: '7-9PM' }],
  '2026-05-08': [{ name: 'Poetry Slam',     type: 'poetry',     time: '7-10PM' }],
  '2026-05-09': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],
  '2026-05-15': [{ name: 'Acoustic Night',  type: 'acoustic',   time: '7-10PM' }],
  '2026-05-16': [{ name: 'Karaoke Night',   type: 'karaoke',    time: '8-11PM' }],
  '2026-05-22': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-05-23': [{ name: 'Comedy Night',    type: 'comedy',     time: '8-10PM' }],
  '2026-05-30': [{ name: 'MDW Jam',         type: 'special',    time: '3-11PM' }],

  // =========================================================================
  //  JUNE 2026  (starts on Monday)
  // =========================================================================

  // Week 1 — June 1-6
  '2026-06-02': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-06-04': [{ name: 'Trivia Night',    type: 'trivia',     time: '7-9PM' }],
  '2026-06-05': [{ name: 'Acoustic Night',  type: 'acoustic',   time: '7-10PM' }],
  '2026-06-06': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],

  // Week 2 — June 7-13
  '2026-06-08': [{ name: 'Sound Bath',      type: 'sound-bath', time: '4-6PM' }],
  '2026-06-09': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-06-11': [{ name: 'Karaoke Night',   type: 'karaoke',    time: '8-11PM' }],
  '2026-06-12': [{ name: 'Poetry Slam',     type: 'poetry',     time: '7-10PM' }],
  '2026-06-13': [{ name: 'Live Band',       type: 'live-band',  time: '8-11PM' }],

  // Week 3 — June 14-20
  '2026-06-16': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-06-18': [{ name: 'Trivia Night',    type: 'trivia',     time: '7-9PM' }],
  '2026-06-19': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],
  '2026-06-20': [{ name: 'Comedy Night',    type: 'comedy',     time: '8-10PM' }],

  // Week 4 — June 21-27
  '2026-06-22': [{ name: 'Acoustic Night',  type: 'acoustic',   time: '7-10PM' }],
  '2026-06-23': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-06-25': [{ name: 'Karaoke Night',   type: 'karaoke',    time: '8-11PM' }],
  '2026-06-26': [{ name: 'Live Band',       type: 'live-band',  time: '8-11PM' }],
  '2026-06-27': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],

  // Week 5 — June 28-30
  '2026-06-29': [{ name: 'Sound Bath',      type: 'sound-bath', time: '4-6PM' }],
  '2026-06-30': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],

  // =========================================================================
  //  JULY 2026  (starts on Wednesday)
  // =========================================================================

  // Week 1 — July 1-4
  '2026-07-02': [{ name: 'Trivia Night',    type: 'trivia',     time: '7-9PM' }],
  '2026-07-03': [{ name: 'Acoustic Night',  type: 'acoustic',   time: '7-10PM' }],
  '2026-07-04': [
    { name: '4th of July Bash',  type: 'special',    time: '3-7PM' },
    { name: 'DJ Night',          type: 'dj',         time: '8PM-12AM' }
  ],

  // Week 2 — July 5-11
  '2026-07-06': [{ name: 'Sound Bath',      type: 'sound-bath', time: '4-6PM' }],
  '2026-07-07': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-07-09': [{ name: 'Karaoke Night',   type: 'karaoke',    time: '8-11PM' }],
  '2026-07-10': [{ name: 'Live Band',       type: 'live-band',  time: '8-11PM' }],
  '2026-07-11': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],

  // Week 3 — July 12-18
  '2026-07-14': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-07-15': [{ name: 'Acoustic Night',  type: 'acoustic',   time: '7-10PM' }],
  '2026-07-16': [{ name: 'Trivia Night',    type: 'trivia',     time: '7-9PM' }],
  '2026-07-17': [{ name: 'Poetry Slam',     type: 'poetry',     time: '7-10PM' }],
  '2026-07-18': [{ name: 'Live Band',       type: 'live-band',  time: '8-11PM' }],

  // Week 4 — July 19-25
  '2026-07-20': [{ name: 'Comedy Night',    type: 'comedy',     time: '8-10PM' }],
  '2026-07-21': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-07-23': [{ name: 'Karaoke Night',   type: 'karaoke',    time: '8-11PM' }],
  '2026-07-24': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],
  '2026-07-25': [{ name: 'Acoustic Night',  type: 'acoustic',   time: '7-10PM' }],

  // Week 5 — July 26-31
  '2026-07-27': [{ name: 'Sound Bath',      type: 'sound-bath', time: '4-6PM' }],
  '2026-07-28': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-07-31': [{ name: 'Live Band',       type: 'live-band',  time: '8-11PM' }],

  // =========================================================================
  //  AUGUST 2026  (starts on Saturday)
  // =========================================================================

  // Week 1 — Aug 1-2
  '2026-08-01': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],

  // Week 2 — Aug 3-8
  '2026-08-03': [{ name: 'Trivia Night',    type: 'trivia',     time: '7-9PM' }],
  '2026-08-04': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-08-05': [{ name: 'Acoustic Night',  type: 'acoustic',   time: '7-10PM' }],
  '2026-08-06': [{ name: 'Karaoke Night',   type: 'karaoke',    time: '8-11PM' }],
  '2026-08-07': [{ name: 'Poetry Slam',     type: 'poetry',     time: '7-10PM' }],
  '2026-08-08': [{ name: 'Live Band',       type: 'live-band',  time: '8-11PM' }],

  // Week 3 — Aug 9-15
  '2026-08-10': [{ name: 'Sound Bath',      type: 'sound-bath', time: '4-6PM' }],
  '2026-08-11': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-08-13': [{ name: 'Comedy Night',    type: 'comedy',     time: '8-10PM' }],
  '2026-08-14': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],
  '2026-08-15': [{ name: 'Karaoke Night',   type: 'karaoke',    time: '8-11PM' }],

  // Week 4 — Aug 16-22
  '2026-08-17': [{ name: 'Trivia Night',    type: 'trivia',     time: '7-9PM' }],
  '2026-08-18': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-08-19': [{ name: 'Acoustic Night',  type: 'acoustic',   time: '7-10PM' }],
  '2026-08-21': [{ name: 'Live Band',       type: 'live-band',  time: '8-11PM' }],
  '2026-08-22': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],

  // Week 5 — Aug 23-29
  '2026-08-24': [{ name: 'Sound Bath',      type: 'sound-bath', time: '4-6PM' }],
  '2026-08-25': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-08-27': [{ name: 'Poetry Slam',     type: 'poetry',     time: '7-10PM' }],
  '2026-08-28': [{ name: 'Acoustic Night',  type: 'acoustic',   time: '7-10PM' }],
  '2026-08-29': [{ name: 'Karaoke Night',   type: 'karaoke',    time: '8-11PM' }],

  // Week 6 — Aug 30-31
  '2026-08-31': [{ name: 'End of Summer Bash', type: 'special', time: '3-11PM' }],

  // =========================================================================
  //  SEPTEMBER 2026  (starts on Tuesday)
  // =========================================================================

  // Week 1 — Sep 1-5
  '2026-09-01': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-09-03': [{ name: 'Trivia Night',    type: 'trivia',     time: '7-9PM' }],
  '2026-09-04': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],
  '2026-09-05': [{ name: 'Live Band',       type: 'live-band',  time: '8-11PM' }],

  // Labor Day Weekend — Sep 5-7
  '2026-09-07': [{ name: 'Labor Day Cookout Jam', type: 'special', time: '2-8PM' }],

  // Week 2 — Sep 8-12
  '2026-09-08': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-09-09': [{ name: 'Acoustic Night',  type: 'acoustic',   time: '7-10PM' }],
  '2026-09-10': [{ name: 'Karaoke Night',   type: 'karaoke',    time: '8-11PM' }],
  '2026-09-11': [{ name: 'Comedy Night',    type: 'comedy',     time: '8-10PM' }],
  '2026-09-12': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],

  // Week 3 — Sep 13-19
  '2026-09-14': [{ name: 'Sound Bath',      type: 'sound-bath', time: '4-6PM' }],
  '2026-09-15': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-09-17': [{ name: 'Trivia Night',    type: 'trivia',     time: '7-9PM' }],
  '2026-09-18': [{ name: 'Poetry Slam',     type: 'poetry',     time: '7-10PM' }],
  '2026-09-19': [{ name: 'Live Band',       type: 'live-band',  time: '8-11PM' }],

  // Week 4 — Sep 20-26
  '2026-09-21': [{ name: 'Acoustic Night',  type: 'acoustic',   time: '7-10PM' }],
  '2026-09-22': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-09-24': [{ name: 'Karaoke Night',   type: 'karaoke',    time: '8-11PM' }],
  '2026-09-25': [{ name: 'DJ Night',        type: 'dj',         time: '8PM-12AM' }],
  '2026-09-26': [{ name: 'Comedy Night',    type: 'comedy',     time: '8-10PM' }],

  // Week 5 — Sep 27-30
  '2026-09-28': [{ name: 'Sound Bath',      type: 'sound-bath', time: '4-6PM' }],
  '2026-09-29': [{ name: 'Open Mic Night',  type: 'open-mic',   time: '7-10PM' }],
  '2026-09-30': [{ name: 'Fall Kickoff Night', type: 'special',  time: '7-11PM' }]
};
