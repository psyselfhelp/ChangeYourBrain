/* =========================================
   СОСТОЯНИЕ ПРИЛОЖЕНИЯ
   ========================================= */
const STORAGE_KEY = 'brain_journey_v1';

let state = loadState();
let activeTab = 'today';
let activeDay = null;
let viewMode = 'interactive'; // 'interactive' | 'readonly'
let storageAvailable = true;

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function createDefaultState() {
  return {
    unlocked: [],
    completed: [],
    answers: {},
    allUnlocked: false,
    lastCompletedDate: null
  };
}

// Загружает старое состояние и мягко добавляет новые поля без потери ответов.
function loadState() {
  try {
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedState && Array.isArray(savedState.completed) && savedState.answers && typeof savedState.answers === 'object' && !Array.isArray(savedState.answers)) {
      return {
        ...createDefaultState(),
        ...savedState,
        unlocked: Array.isArray(savedState.unlocked) ? savedState.unlocked : [],
        completed: savedState.completed,
        answers: savedState.answers,
        allUnlocked: Boolean(savedState.allUnlocked),
        lastCompletedDate: savedState.lastCompletedDate || null
      };
    }
  } catch (error) {}

  return createDefaultState();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    storageAvailable = true;
  } catch (error) {
    if (storageAvailable) showToast('Не удалось сохранить ответы. Не закрывайте страницу: проверьте доступ к хранилищу браузера.', 'error');
    storageAvailable = false;
  }
  const status = document.getElementById('saveStatus');
  if (status) {
    status.textContent = storageAvailable ? 'Ответы сохранены в этом браузере' : 'Ответы не сохранены. Не закрывайте страницу';
    status.classList.toggle('save-error', !storageAvailable);
  }
  return storageAvailable;
}

function isDayCompleted(dayId) {
  return state.completed.includes(dayId);
}

function areAllDaysCompleted() {
  return DAYS.every(day => isDayCompleted(day.id));
}

function getFirstIncompleteDayId() {
  const nextDay = DAYS.find(day => !isDayCompleted(day.id));
  return nextDay ? nextDay.id : null;
}

function didCompleteDayToday() {
  return state.lastCompletedDate === getTodayKey();
}

// В обычном режиме открывает один новый день за календарную дату.
function getCurrentDay() {
  const nextDayId = getFirstIncompleteDayId();
  if (!nextDayId) return null;
  if (state.allUnlocked) return nextDayId;
  if (didCompleteDayToday()) return null;
  return nextDayId;
}

function isWaitingForNextDay() {
  return !state.allUnlocked && !areAllDaysCompleted() && didCompleteDayToday();
}

function isDayReadable(dayId) {
  if (state.allUnlocked || isDayCompleted(dayId)) return true;
  return getCurrentDay() === dayId;
}

function isDayUnlocked(dayId) {
  if (state.allUnlocked || isDayCompleted(dayId)) return true;
  return isDayReadable(dayId) && state.unlocked.includes(dayId);
}

function unlockDayTask(dayId) {
  if (!state.unlocked.includes(dayId)) state.unlocked.push(dayId);
}

function completeDay(dayId) {
  if (!state.completed.includes(dayId)) state.completed.push(dayId);
  state.lastCompletedDate = getTodayKey();
}

function unlockAllDays() {
  state.allUnlocked = true;
  DAYS.forEach(day => unlockDayTask(day.id));
}
