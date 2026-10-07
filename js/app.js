/* =========================================
   НАВИГАЦИЯ
   ========================================= */
document.getElementById('bottomNav').addEventListener('click', e => {
  const button = e.target.closest('button[data-tab]');
  if (!button) return;
  switchTab(button.dataset.tab);
});

document.getElementById('btnUnlockAll').addEventListener('click', () => {
  unlockAllDays();
  saveState();
  activeDay = getCurrentDay();
  activeTab = 'today';
  updateNav();
  render();
  showToast('Все дни и задания открыты', 'info');
});

// Переключает вкладки и подбирает актуальный день для экрана "Сегодня".
function switchTab(tab) {
  activeTab = tab;
  activeDay = null;
  viewMode = 'interactive';
  if (tab === 'today') {
    activeDay = getCurrentDay();
  }
  updateNav();
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.getElementById('mainContent').focus({ preventScroll: true });
}

function updateNav() {
  document.querySelectorAll('#bottomNav button').forEach(button => {
    button.classList.toggle('active', button.dataset.tab === activeTab);
    if (button.dataset.tab === activeTab) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
}

/* =========================================
   ДЕЛЕГИРОВАНИЕ КЛИКОВ (СПИСОК ДНЕЙ, ЖУРНАЛ)
   ========================================= */
document.getElementById('mainContent').addEventListener('click', e => {
  // Клик по карточке дня в списке
  const tabButton = e.target.closest('[data-tab]');
  if (tabButton) {
    switchTab(tabButton.dataset.tab);
    return;
  }
  const dayCard = e.target.closest('[data-goto]');
  if (dayCard) {
    const targetDayId = Number(dayCard.dataset.goto);
    if (!DAYS.some(day => day.id === targetDayId) || !isDayReadable(targetDayId)) return;
    activeDay = targetDayId;
    viewMode = 'interactive';
    render();
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('mainContent').focus({ preventScroll: true });
    return;
  }
});

// Обновляет доступность следующего дня при возвращении после полуночи.
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && activeTab === 'today' && !activeDay && !isWaitingForNextDay()) render();
});

/* =========================================
   ЗАПУСК
   ========================================= */
(function init() {
  // Подключаем шрифт Caveat для письма
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap';
  document.head.appendChild(fontLink);

  activeDay = getCurrentDay();
  updateNav();
  render();
})();
