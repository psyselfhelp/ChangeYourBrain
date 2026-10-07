/* =========================================
   ТОСТЫ
   ========================================= */
function showToast(message, type='success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.getElementById('toasts').appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2500);
}

/* =========================================
   ГЛАВНЫЙ РЕНДЕР
   ========================================= */
// Выбирает главный экран на основе активной вкладки и текущего дня.
function render() {
  const mainContent = document.getElementById('mainContent');
  const dayId = activeDay || (activeTab === 'today' ? getCurrentDay() : null);
  if (dayId) {
    activeDay = dayId;
    mainContent.innerHTML = renderDayView(dayId, viewMode);
    initDayTask(dayId, viewMode);
  } else if (activeTab === 'days') {
    mainContent.innerHTML = renderDaysList();
  } else if (activeTab === 'journal') {
    mainContent.innerHTML = renderJournal();
  } else if (areAllDaysCompleted()) {
    mainContent.innerHTML = renderAllDone();
  } else {
    mainContent.innerHTML = renderWaitingForTomorrow();
  }
}

/* =========================================
   СПИСОК ДНЕЙ
   ========================================= */
function renderDaysList() {
  let html = renderJourneyProgress('Все дни', 'Один текст и одна практика. Продвигайтесь в своём темпе.');
  html += renderActivePromiseSummary();
  html += '<div class="days-list">';
  DAYS.forEach(day => {
    const readable = isDayReadable(day.id);
    const completed = isDayCompleted(day.id);
    const unlocked = isDayUnlocked(day.id);
    let statusIcon = '';
    if (completed) statusIcon = '<span class="day-status" style="color:var(--success)"><i class="fa-solid fa-circle-check"></i></span>';
    else if (unlocked) statusIcon = '<span class="day-status" style="color:var(--accent)"><i class="fa-solid fa-book-open"></i></span>';
    else if (!readable) statusIcon = '<span class="day-status" style="color:var(--muted);opacity:0.4"><i class="fa-solid fa-lock"></i></span>';
    else statusIcon = '<span class="day-status" style="color:var(--muted)"><i class="fa-regular fa-circle"></i></span>';
    const cls = completed ? 'completed' : (!readable ? 'locked' : '');
    let status = 'Можно начать';
    if (completed) status = 'Выполнен';
    else if (!readable) status = 'Откроется позже';
    else if (unlocked) status = 'Практика открыта';
    html += `<button type="button" class="day-card ${cls}" ${readable ? `data-goto="${day.id}"` : 'disabled'}>
      <div class="day-num">${day.id}</div>
      <div class="day-info"><h3>${day.title}</h3><p>${status}</p></div>
      ${statusIcon}
    </button>`;
  });
  html += '</div>';
  return html;
}

/* =========================================
   ЖУРНАЛ
   ========================================= */
function renderJournal() {
  let html = renderJourneyProgress('Мой путь', 'Ваши мысли, решения и маленькие шаги — к ним можно вернуться.');
  html += renderActivePromiseSummary();
  const entries = DAYS.filter(day => isDayCompleted(day.id) || state.answers['day' + day.id]);
  if (!entries.length) {
    return html + `<div class="empty-journal"><h3>Здесь появится ваша первая запись</h3><p>Откройте практику дня и запишите свои мысли. Ответы сохраняются в этом браузере.</p><button class="btn btn-primary" data-goto="${getCurrentDay() || 1}">Перейти к первому дню</button></div>`;
  }
  entries.forEach(day => {
    const done = isDayCompleted(day.id);
    const answer = state.answers['day' + day.id];
    html += `<details class="journal-item" name="journal" data-jday="${day.id}">
      <summary class="journal-header ${done ? 'done' : ''}">
        <div class="jnum">${day.id}</div>
        <div class="jinfo"><h4>${day.title}</h4><p>${done ? 'День выполнен' : 'Черновик практики'}</p></div>
        <span class="jarrow"><i class="fa-solid fa-chevron-down"></i></span>
      </summary>
      <div class="journal-body">${answer ? renderJournalAnswer(day.id, answer) : '<p class="empty-answer">Откройте практику, чтобы сделать первую запись</p>'}${!done && isDayReadable(day.id) ? `<button class="btn btn-secondary" data-goto="${day.id}">Продолжить практику</button>` : ''}</div>
    </details>`;
  });
  return html;
}

function renderJourneyProgress(title, description) {
  const completed = DAYS.filter(day => isDayCompleted(day.id)).length;
  return `<div class="journey-heading"><h2>${title}</h2><p>${description}</p></div>
    <div class="journey-progress"><span>Пройдено ${completed} из ${DAYS.length} дней</span><progress value="${completed}" max="${DAYS.length}" aria-label="Пройденные дни"></progress></div>`;
}

function renderActivePromiseSummary() {
  const answer = state.answers.day9;
  if (!answer || !answer.promised || typeof answer.strategy !== 'number' || !BRAIN_STRATEGIES[answer.strategy]) return '';
  const strategy = BRAIN_STRATEGIES[answer.strategy];
  const frequency = answer.frequency === 'Другое' ? answer.frequencyOther : answer.frequency;
  const schedule = [answer.date, answer.time, frequency].filter(Boolean).map(escapeHtml).join(', ');
  return `<div class="promise-badge promise-dashboard">
    <i class="fa-solid fa-certificate"></i>
    <div><strong>Обещание мозгу активно</strong><span>${strategy.name}: ${strategy.desc}</span>${schedule ? `<span>${schedule}</span>` : ''}</div>
  </div>`;
}

// Форматирует сохранённые ответы для вкладки журнала.
function renderJournalAnswer(dayId, answer) {
  let html = '';
  switch(dayId) {
    case 1:
      answer.reasons.forEach((reason, index) => { if (reason) html += `<div class="answer-label">Причина ${index+1}</div><div class="answer-text">${escapeHtml(reason)}</div>`; });
      break;
    case 2: {
      const helped = answer.friends.filter(friend => friend.name && friend.name.trim() && friend.helped).length;
      html += `<div class="answer-label">Результат</div><div class="answer-text">${helped} из 10 друзей нуждались в помощи</div>`;
      answer.friends.forEach(friend => { if (friend.name) html += `<div class="answer-text">${escapeHtml(friend.name)}${friend.helped ? ' — нуждался в помощи' + (friend.type ? ' (' + escapeHtml(friend.type) + ')' : '') : ''}</div>`; });
      break;
    }
    case 3:
      answer.people.forEach(person => {
        if (!person.name) return;
        html += `<div class="answer-label">${escapeHtml(person.name)}</div><div class="answer-text">Суждение: ${escapeHtml(person.judgment)}${person.hasBrainIssue ? ' — возможна проблема с мозгом' : ''}</div>`;
        if (person.hasBrainIssue && person.how) html += `<div class="answer-text">Возможное объяснение: ${escapeHtml(person.how)}</div>`;
      });
      break;
    case 4:
      answer.achievements.forEach((achievement, index) => { if (achievement.achievement) html += `<div class="answer-label">Достижение ${index+1}</div><div class="answer-text">${escapeHtml(achievement.achievement)} — ${escapeHtml(achievement.who)}</div>`; });
      break;
    case 5:
      html += `<div class="answer-label">Письмо мозгу</div><div class="answer-text">${escapeHtml(answer.letter) || '<em>Пустое письмо</em>'}</div>`;
      break;
    case 6:
      html += `<div class="answer-label">Любовь к людям: ${answer.loveOthers}/10</div><div class="answer-label">Любовь к мозгу: ${answer.loveBrain}/10</div><div class="answer-text">${escapeHtml(answer.reflection) || ''}</div>`;
      break;
    case 7:
    case 38: {
      if (!Array.isArray(answer.part1) || !Array.isArray(answer.part2)) {
        html += '<div class="answer-text">Новый тест ещё не заполнен</div>';
        break;
      }
      const result = getDay7QuizResults(answer);
      const answeredPart1 = Array.isArray(answer.part1) ? answer.part1.filter(Boolean).length : 0;
      const answeredPart2 = Array.isArray(answer.part2) ? answer.part2.filter(Boolean).length : 0;
      html += `<div class="answer-label">Уровень ранних тревожных признаков: ${result.early}</div>`;
      html += `<div class="answer-text">Ответов: ${answeredPart1} из ${EARLY_WARNING_QUESTIONS.length}</div>`;
      html += `<div class="answer-label">Оценка факторов риска: ${result.risk}</div>`;
      html += `<div class="answer-text">Ответов: ${answeredPart2} из ${RISK_FACTOR_QUESTIONS.length}</div>`;
      if (dayId === 38 && answer.reviewed) html += '<div class="answer-label" style="color:var(--success)">Ответы проверены, результат просмотрен</div>';
      break;
    }
    case 8:
      html += `<div class="answer-label">Связи привычек и последствий</div>`;
      if (answer.links && Object.keys(answer.links).length) {
        answer.habits.forEach(habit => {
          const links = Array.isArray(answer.links[habit]) ? answer.links[habit] : [];
          html += `<div class="answer-text"><strong>${escapeHtml(habit)}</strong>: ${links.length ? links.map(escapeHtml).join(', ') : 'последствия не выбраны'}</div>`;
        });
      } else {
        html += `<div class="answer-text">${answer.habits && answer.habits.length ? answer.habits.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
        if (answer.consequences && answer.consequences.length) html += `<div class="answer-text">Затронутые аспекты: ${answer.consequences.map(escapeHtml).join(', ')}</div>`;
      }
      if (answer.worst) html += `<div class="answer-label">Что страдает больше всего</div><div class="answer-text">${escapeHtml(answer.worst)}</div>`;
      break;
    case 9:
      if (answer.strategy !== null && BRAIN_STRATEGIES[answer.strategy]) {
        const frequency = answer.frequency === 'Другое' ? answer.frequencyOther : answer.frequency;
        html += `<div class="answer-label">Выбранная стратегия</div><div class="answer-text">${BRAIN_STRATEGIES[answer.strategy].name}: ${BRAIN_STRATEGIES[answer.strategy].desc}</div>`;
        html += `<div class="answer-text">Начало: ${escapeHtml(answer.date || 'не указано')}, Время: ${escapeHtml(answer.time || 'не указано')}, Частота: ${escapeHtml(frequency || 'не указано')}</div>`;
        if (answer.promised) html += '<div class="answer-label" style="color:var(--success)">Обещание мозгу активно</div>';
      }
      break;
    case 10:
      html += `<div class="answer-label" style="color:var(--danger)">Крадут резерв</div>`;
      answer.steals.forEach(item => { if (item) html += `<div class="answer-text">${escapeHtml(item)}</div>`; });
      html += `<div class="answer-label" style="color:var(--success)">Укрепляют резерв</div>`;
      answer.strengthens.forEach(item => { if (item) html += `<div class="answer-text">${escapeHtml(item)}</div>`; });
      break;
    case 11:
      html += '<div class="answer-label">Сферы потенциала</div>';
      if (answer.areas && answer.areas.length) {
        answer.areas.forEach(areaId => {
          const area = POTENTIAL_AREAS.find(item => item.id === areaId);
          const note = answer.improvements && answer.improvements[areaId] ? answer.improvements[areaId] : '';
          const score = answer.importance && answer.importance[areaId] ? answer.importance[areaId] : 3;
          if (area && note) html += `<div class="answer-text"><strong>${escapeHtml(area.name)}</strong> (${score}/5): ${escapeHtml(note)}</div>`;
        });
      } else {
        html += '<div class="answer-text">Сферы не выбраны</div>';
      }
      if (answer.firstStep) html += `<div class="answer-label">Первый шаг</div><div class="answer-text">${escapeHtml(answer.firstStep)}</div>`;
      break;
    case 12: {
      const threats = Array.isArray(answer.threats) ? answer.threats.map(id => getBrainBattleName(BRAIN_BATTLE_THREATS, id)) : [];
      const allies = Array.isArray(answer.allies) ? answer.allies.map(id => getBrainBattleName(BRAIN_BATTLE_ALLIES, id)) : [];
      html += '<div class="answer-label" style="color:var(--danger)">Атакуют мозг</div>';
      html += `<div class="answer-text">${threats.length ? threats.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      html += '<div class="answer-label" style="color:var(--success)">Защищают мозг</div>';
      html += `<div class="answer-text">${allies.length ? allies.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      if (answer.focusThreat) html += `<div class="answer-label">Главная атака</div><div class="answer-text">${escapeHtml(getBrainBattleName(BRAIN_BATTLE_THREATS, answer.focusThreat))}</div>`;
      if (answer.shieldAction) html += `<div class="answer-label">Защитный ход</div><div class="answer-text">${escapeHtml(answer.shieldAction)}</div>`;
      break;
    }
    case 13: {
      const signs = Array.isArray(answer.signs) ? answer.signs.map(getRecoverySignName) : [];
      html += '<div class="answer-label">Заметные признаки восстановления</div>';
      html += `<div class="answer-text">${signs.length ? signs.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      if (Array.isArray(answer.people)) {
        answer.people.forEach(person => {
          if (person.name || person.visibleChange || person.firstSignal) {
            html += `<div class="answer-label">${escapeHtml(person.name || 'Человек')}</div>`;
            if (person.visibleChange) html += `<div class="answer-text">${escapeHtml(person.visibleChange)}</div>`;
            if (person.firstSignal) html += `<div class="answer-text">Мягкий сигнал: ${escapeHtml(person.firstSignal)}</div>`;
          }
        });
      }
      if (answer.firstStep) html += `<div class="answer-label">Первый бережный шаг</div><div class="answer-text">${escapeHtml(answer.firstStep)}</div>`;
      break;
    }
    case 14: {
      const pace = answer.pace === 'fast' ? 'Быстрый рывок' : 'Постепенно';
      html += '<div class="answer-label">Выбранный шаг</div>';
      html += `<div class="answer-text">${answer.step ? escapeHtml(getNancyStepName(answer.step)) : 'Не выбран'}</div>`;
      html += '<div class="answer-label">Темп</div>';
      html += `<div class="answer-text">${escapeHtml(pace)}</div>`;
      if (answer.microStep) html += `<div class="answer-label">Первый микрошаг</div><div class="answer-text">${escapeHtml(answer.microStep)}</div>`;
      if (answer.when) html += `<div class="answer-label">Когда сегодня</div><div class="answer-text">${escapeHtml(answer.when)}</div>`;
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Первый шаг зафиксирован</div>';
      break;
    }
    case 15:
      html += '<div class="answer-label">Люди, которым нужна моя овчарка</div>';
      if (Array.isArray(answer.people)) {
        answer.people.forEach(person => {
          if (person.name || person.action) {
            const threats = Array.isArray(person.threats) ? person.threats.map(getShepherdThreatName) : [];
            html += `<div class="answer-text"><strong>${escapeHtml(person.name || 'Человек')}</strong>`;
            if (threats.length) html += `<br>Защита от: ${threats.map(escapeHtml).join(', ')}`;
            if (person.support) html += `<br>Способ поддержки: ${escapeHtml(getShepherdSupportName(person.support))}`;
            if (person.action) html += `<br>Мягкий шаг: ${escapeHtml(person.action)}`;
            html += '</div>';
          }
        });
      }
      if (answer.boundary) html += `<div class="answer-label">Граница без давления</div><div class="answer-text">${escapeHtml(answer.boundary)}</div>`;
      break;
    case 16: {
      const awkward = Array.isArray(answer.awkward) ? answer.awkward.map(getBrainStartAwkwardName) : [];
      html += '<div class="answer-label">Решение на старт</div>';
      html += `<div class="answer-text">${answer.decision ? escapeHtml(getBrainStartDecisionName(answer.decision, answer.customDecision)) : 'Не выбрано'}</div>`;
      html += '<div class="answer-label">Горизонт адаптации</div>';
      html += `<div class="answer-text">${escapeHtml(String(answer.horizon || 60))} дней</div>`;
      html += '<div class="answer-label">Что может быть неловко</div>';
      html += `<div class="answer-text">${awkward.length ? awkward.map(escapeHtml).join(', ') : 'Не выбрано'}</div>`;
      if (answer.support) html += `<div class="answer-label">Мягкость к себе</div><div class="answer-text">${escapeHtml(answer.support)}</div>`;
      if (answer.nextStep) html += `<div class="answer-label">Первый шаг</div><div class="answer-text">${escapeHtml(answer.nextStep)}</div>`;
      if (answer.restart) html += `<div class="answer-label">Как начать снова</div><div class="answer-text">${escapeHtml(answer.restart)}</div>`;
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Решение зафиксировано</div>';
      break;
    }
    case 17: {
      const changes = Array.isArray(answer.changes) ? answer.changes.map(getHealthyRhythmChangeName) : [];
      html += '<div class="answer-label">Заметные изменения</div>';
      html += `<div class="answer-text">${changes.length ? changes.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      if (answer.changed) html += `<div class="answer-label">Как я изменился</div><div class="answer-text">${escapeHtml(answer.changed)}</div>`;
      if (answer.support) html += `<div class="answer-label">Что помогает продолжать</div><div class="answer-text">${escapeHtml(answer.support)}</div>`;
      if (answer.returnMode) html += `<div class="answer-label">Способ возвращения</div><div class="answer-text">${escapeHtml(getHealthyRhythmReturnName(answer.returnMode))}</div>`;
      if (answer.returnStep) html += `<div class="answer-label">Первый шаг возвращения</div><div class="answer-text">${escapeHtml(answer.returnStep)}</div>`;
      break;
    }
    case 18: {
      const habits = Array.isArray(answer.habits) ? answer.habits.map(getAutomaticHabitName) : [];
      html += '<div class="answer-label">Привычки на автопилоте</div>';
      html += `<div class="answer-text">${habits.length ? habits.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      if (Array.isArray(answer.ways)) {
        answer.ways.forEach((way, index) => {
          if (way.text) {
            html += `<div class="answer-label">Улучшение ${index + 1} (${way.impact || 3}/5)</div>`;
            html += `<div class="answer-text">${escapeHtml(way.text)}</div>`;
          }
        });
      }
      if (answer.returnMode) html += `<div class="answer-label">Способ возвращения</div><div class="answer-text">${escapeHtml(getAutomaticReturnName(answer.returnMode))}</div>`;
      if (answer.returnPhrase) html += `<div class="answer-label">Фраза возвращения</div><div class="answer-text">${escapeHtml(answer.returnPhrase)}</div>`;
      break;
    }
    case 19: {
      const statuses = answer.statuses && typeof answer.statuses === 'object' ? answer.statuses : {};
      const metricIds = Object.keys(statuses);
      html += '<div class="answer-label">Показатели в работе</div>';
      if (metricIds.length) {
        metricIds.forEach(metricId => {
          const value = answer.values && answer.values[metricId] ? `: ${escapeHtml(answer.values[metricId])}` : '';
          html += `<div class="answer-text"><strong>${escapeHtml(getHealthMetricName(metricId))}</strong> — ${escapeHtml(getHealthMetricStatusName(statuses[metricId]))}${value}</div>`;
        });
      } else {
        html += '<div class="answer-text">Не выбраны</div>';
      }
      const risks = Array.isArray(answer.risks) ? answer.risks.map(getModifiableRiskName) : [];
      html += '<div class="answer-label">Изменяемые риски для обсуждения</div>';
      html += `<div class="answer-text">${risks.length ? risks.map(escapeHtml).join(', ') : 'Не отмечены'}</div>`;
      if (answer.specialist) html += `<div class="answer-label">К кому обращусь</div><div class="answer-text">${escapeHtml(answer.specialist)}</div>`;
      if (answer.contactWhen) html += `<div class="answer-label">Когда свяжусь</div><div class="answer-text">${escapeHtml(answer.contactWhen)}</div>`;
      if (answer.request) html += `<div class="answer-label">Что попрошу проверить</div><div class="answer-text">${escapeHtml(answer.request)}</div>`;
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">План измерений зафиксирован</div>';
      break;
    }
    case 20: {
      html += '<div class="answer-label">Карта четырёх кругов</div>';
      FOUR_CIRCLES.forEach(circle => {
        const rating = answer.ratings && answer.ratings[circle.id] ? answer.ratings[circle.id] : 3;
        const strength = answer.strengths && answer.strengths[circle.id] ? answer.strengths[circle.id] : '';
        const vulnerability = answer.vulnerabilities && answer.vulnerabilities[circle.id] ? answer.vulnerabilities[circle.id] : '';
        html += `<div class="answer-text"><strong>${escapeHtml(circle.name)}</strong> (${rating}/5)`;
        if (strength) html += `<br>Сильная сторона: ${escapeHtml(strength)}`;
        if (vulnerability) html += `<br>Уязвимость: ${escapeHtml(vulnerability)}`;
        html += '</div>';
      });
      if (answer.focus) html += `<div class="answer-label">Фокусный круг</div><div class="answer-text">${escapeHtml(getFourCircleName(answer.focus))}</div>`;
      if (answer.action) html += `<div class="answer-label">Балансирующий шаг</div><div class="answer-text">${escapeHtml(answer.action)}</div>`;
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Карта четырёх кругов собрана</div>';
      break;
    }
    case 21: {
      html += '<div class="answer-label" style="color:var(--success)">Питают гиппокампы</div>';
      if (Array.isArray(answer.nourish)) {
        answer.nourish.forEach(item => { if (item) html += `<div class="answer-text">${escapeHtml(item)}</div>`; });
      }
      html += '<div class="answer-label" style="color:var(--danger)">Уменьшают их</div>';
      if (Array.isArray(answer.toxic)) {
        answer.toxic.forEach(item => { if (item) html += `<div class="answer-text">${escapeHtml(item)}</div>`; });
      }
      if (answer.focusToxic) html += `<div class="answer-label">Фокус на сегодня</div><div class="answer-text">${escapeHtml(answer.focusToxic)}</div>`;
      if (answer.protection) html += `<div class="answer-label">Защитный шаг</div><div class="answer-text">${escapeHtml(answer.protection)}</div>`;
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Заповедник морских коньков защищён</div>';
      break;
    }
    case 22: {
      html += '<div class="answer-label">Популяция АНТов</div>';
      html += `<div class="answer-text">${answer.populationSet ? escapeHtml(String(answer.population)) + ' из 10' : 'Не оценена'}</div>`;
      const areas = Array.isArray(answer.areas) ? answer.areas.map(getAntAreaName) : [];
      html += '<div class="answer-label">Области появления</div>';
      html += `<div class="answer-text">${areas.length ? areas.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      if (Array.isArray(answer.thoughts)) {
        answer.thoughts.forEach((thought, index) => {
          if (thought.text) {
            html += `<div class="answer-label">АНТ ${index + 1}${thought.type ? ' — ' + escapeHtml(getAntThoughtTypeName(thought.type)) : ''}</div>`;
            html += `<div class="answer-text">${escapeHtml(thought.text)}</div>`;
          }
        });
      }
      if (answer.observation) html += `<div class="answer-label">Наблюдение</div><div class="answer-text">${escapeHtml(answer.observation)}</div>`;
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Популяция АНТов записана</div>';
      break;
    }
    case 23: {
      html += '<div class="answer-label">Кого я замечаю хорошим вниманием</div>';
      if (Array.isArray(answer.people)) {
        answer.people.forEach(person => {
          if (person.name || person.quality || person.action) {
            html += `<div class="answer-text"><strong>${escapeHtml(person.name || 'Человек')}</strong>`;
            if (person.quality) html += `<br>Что нравится: ${escapeHtml(person.quality)}`;
            if (person.method) html += `<br>Способ: ${escapeHtml(getPenguinMethodName(person.method))}`;
            if (person.action) html += `<br>Как покажу: ${escapeHtml(person.action)}`;
            html += '</div>';
          }
        });
      }
      if (answer.rule) html += `<div class="answer-label">Правило внимания</div><div class="answer-text">${escapeHtml(getPenguinRuleName(answer.rule))}</div>`;
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Хорошее внимание зафиксировано</div>';
      break;
    }
    case 24: {
      html += '<div class="answer-label">Выбранные духовные вопросы</div>';
      if (Array.isArray(answer.questions) && answer.questions.length) {
        answer.questions.forEach(questionId => {
          const response = answer.responses && answer.responses[questionId] ? answer.responses[questionId] : '';
          html += `<div class="answer-text"><strong>${escapeHtml(getButterflyQuestionText(questionId))}</strong>`;
          if (response) html += `<br>${escapeHtml(response)}`;
          html += '</div>';
        });
      } else {
        html += '<div class="answer-text">Не выбраны</div>';
      }
      const values = Array.isArray(answer.values) ? answer.values.map(getButterflyValueName) : [];
      html += '<div class="answer-label">Ценности</div>';
      html += `<div class="answer-text">${values.length ? values.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      if (answer.action) html += `<div class="answer-label">Осмысленный поступок сегодня</div><div class="answer-text">${escapeHtml(answer.action)}</div>`;
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Бабочка выпущена</div>';
      break;
    }
    case 25: {
      const supports = Array.isArray(answer.supports)
        ? answer.supports.map(id => getBiologicalPolicyName(BIOLOGICAL_SUPPORT_POLICIES, id))
        : [];
      const harms = Array.isArray(answer.harms)
        ? answer.harms.map(id => getBiologicalPolicyName(BIOLOGICAL_HARM_POLICIES, id))
        : [];
      html += '<div class="answer-label" style="color:var(--success)">Поддерживают биологический круг</div>';
      html += `<div class="answer-text">${supports.length ? supports.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      html += '<div class="answer-label" style="color:var(--danger)">Могут вредить мозгу</div>';
      html += `<div class="answer-text">${harms.length ? harms.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      if (answer.focusHarm) {
        html += `<div class="answer-label">Что ослаблю первым</div><div class="answer-text">${escapeHtml(getBiologicalPolicyName(BIOLOGICAL_HARM_POLICIES, answer.focusHarm))}</div>`;
      }
      if (answer.decree) html += `<div class="answer-label">Указ доброго правителя</div><div class="answer-text">${escapeHtml(answer.decree)}</div>`;
      if (answer.sharedAction) html += `<div class="answer-label">Кого это поддержит</div><div class="answer-text">${escapeHtml(answer.sharedAction)}</div>`;
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Указ принят</div>';
      break;
    }
    case 26: {
      const supports = Array.isArray(answer.supports)
        ? answer.supports.map(id => getPsychologicalPolicyName(PSYCHOLOGICAL_SUPPORT_POLICIES, id))
        : [];
      const harms = Array.isArray(answer.harms)
        ? answer.harms.map(id => getPsychologicalPolicyName(PSYCHOLOGICAL_HARM_POLICIES, id))
        : [];
      html += '<div class="answer-label" style="color:var(--success)">Поддерживают психологический круг</div>';
      html += `<div class="answer-text">${supports.length ? supports.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      html += '<div class="answer-label" style="color:var(--danger)">Могут вредить психологическому здоровью</div>';
      html += `<div class="answer-text">${harms.length ? harms.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      if (answer.focusHarm) {
        html += `<div class="answer-label">Что ослаблю первым</div><div class="answer-text">${escapeHtml(getPsychologicalPolicyName(PSYCHOLOGICAL_HARM_POLICIES, answer.focusHarm))}</div>`;
      }
      if (answer.decree) html += `<div class="answer-label">Поддерживающий шаг</div><div class="answer-text">${escapeHtml(answer.decree)}</div>`;
      if (answer.newMessage) html += `<div class="answer-label">Новая фраза</div><div class="answer-text">${escapeHtml(answer.newMessage)}</div>`;
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Психологический указ принят</div>';
      break;
    }
    case 27: {
      const supports = Array.isArray(answer.supports)
        ? answer.supports.map(id => getSocialItemName(SOCIAL_SUPPORT_ACTIONS, id))
        : [];
      const stressors = Array.isArray(answer.stressors)
        ? answer.stressors.map(id => getSocialItemName(SOCIAL_STRESSORS, id))
        : [];
      html += '<div class="answer-label" style="color:var(--success)">Поддерживают отношения</div>';
      html += `<div class="answer-text">${supports.length ? supports.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      html += '<div class="answer-label" style="color:var(--danger)">Стрессоры в социальном круге</div>';
      html += `<div class="answer-text">${stressors.length ? stressors.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      if (Array.isArray(answer.relationships)) {
        answer.relationships.forEach(relationship => {
          if (relationship.name || relationship.impact) {
            html += `<div class="answer-text"><strong>${escapeHtml(relationship.name || 'Отношения')}</strong>`;
            if (relationship.impact) html += `<br>${escapeHtml(relationship.impact)}`;
            html += '</div>';
          }
        });
      }
      if (answer.focusStress) {
        html += `<div class="answer-label">Что ослаблю первым</div><div class="answer-text">${escapeHtml(getSocialItemName(SOCIAL_STRESSORS, answer.focusStress))}</div>`;
      }
      if (answer.stressStep) html += `<div class="answer-label">Шаг снижения стресса</div><div class="answer-text">${escapeHtml(answer.stressStep)}</div>`;
      if (answer.connectionAction) html += `<div class="answer-label">Действие для отношений</div><div class="answer-text">${escapeHtml(answer.connectionAction)}</div>`;
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Социальный указ принят</div>';
      break;
    }
    case 28: {
      if (answer.anchor) html += `<div class="answer-label">Духовная опора</div><div class="answer-text">${escapeHtml(getSpiritualAnchorName(answer.anchor))}</div>`;
      if (answer.connection) html += `<div class="answer-label">Связь</div><div class="answer-text">${escapeHtml(getSpiritualConnectionName(answer.connection))}</div>`;
      if (answer.action) html += `<div class="answer-label">Одно осмысленное дело</div><div class="answer-text">${escapeHtml(answer.action)}</div>`;
      if (answer.when) html += `<div class="answer-label">Где в списке дел</div><div class="answer-text">${escapeHtml(answer.when)}</div>`;
      if (answer.added) html += '<div class="answer-label" style="color:var(--success)">Добавлено в список дел</div>';
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Осмысленное дело закреплено</div>';
      break;
    }
    case 29: {
      if (answer.concern) html += `<div class="answer-label">Что хочу понять глубже</div><div class="answer-text">${escapeHtml(answer.concern)}</div>`;
      const causes = Array.isArray(answer.causes) ? answer.causes.map(getMultiCauseName) : [];
      html += '<div class="answer-label">Возможные причины</div>';
      html += `<div class="answer-text">${causes.length ? causes.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      if (answer.focusCause) html += `<div class="answer-label">Первый фокус проверки</div><div class="answer-text">${escapeHtml(getMultiCauseName(answer.focusCause))}</div>`;
      if (answer.why) html += `<div class="answer-label">Почему стоит проверить</div><div class="answer-text">${escapeHtml(answer.why)}</div>`;
      if (answer.nextStep) html += `<div class="answer-label">Следующий шаг</div><div class="answer-text">${escapeHtml(getMultiCauseStepName(answer.nextStep))}</div>`;
      if (answer.planned) html += '<div class="answer-label" style="color:var(--success)">Оценка или следующий шаг запланированы</div>';
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Карта причин зафиксирована</div>';
      break;
    }
    case 30: {
      if (answer.person) html += `<div class="answer-label">Кому отправлено</div><div class="answer-text">${escapeHtml(answer.person)}</div>`;
      if (answer.reason) html += `<div class="answer-label">Почему этому человеку</div><div class="answer-text">${escapeHtml(answer.reason)}</div>`;
      if (answer.angle) html += `<div class="answer-label">Акцент сообщения</div><div class="answer-text">${escapeHtml(getBrainMessageAngleName(answer.angle))}</div>`;
      if (answer.message) html += `<div class="answer-label">Сообщение</div><div class="answer-text">${escapeHtml(answer.message)}</div>`;
      if (answer.channel) html += `<div class="answer-label">Способ передачи</div><div class="answer-text">${escapeHtml(getBrainMessageChannelName(answer.channel))}</div>`;
      if (answer.sent) html += '<div class="answer-label" style="color:var(--success)">Сообщение отправлено или передано</div>';
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Сообщение зафиксировано</div>';
      break;
    }
    case 31: {
      if (answer.person) html += `<div class="answer-label">Человек или ситуация</div><div class="answer-text">${escapeHtml(answer.person)}</div>`;
      if (answer.behavior) html += `<div class="answer-label">Поведение</div><div class="answer-text">${escapeHtml(answer.behavior)}</div>`;
      const causes = Array.isArray(answer.causes) ? answer.causes.map(getAlternativeReasonCauseName) : [];
      html += '<div class="answer-label">Возможные причины</div>';
      html += `<div class="answer-text">${causes.length ? causes.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      if (answer.focusCause) html += `<div class="answer-label">Главный фокус</div><div class="answer-text">${escapeHtml(getAlternativeReasonCauseName(answer.focusCause))}</div>`;
      if (answer.reframe) html += `<div class="answer-label">Новая фраза</div><div class="answer-text">${escapeHtml(answer.reframe)}</div>`;
      if (answer.nextStep) html += `<div class="answer-label">Следующий шаг</div><div class="answer-text">${escapeHtml(getAlternativeReasonStepName(answer.nextStep))}</div>`;
      if (answer.bounded) html += '<div class="answer-label" style="color:var(--success)">Границы и точность сохранены</div>';
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Новый взгляд зафиксирован</div>';
      break;
    }
    case 32: {
      if (answer.behavior) html += `<div class="answer-label">Поступок</div><div class="answer-text">${escapeHtml(answer.behavior)}</div>`;
      if (answer.label) html += `<div class="answer-label">Первый ярлык</div><div class="answer-text">${escapeHtml(answer.label)}</div>`;
      const causes = Array.isArray(answer.causes) ? answer.causes.map(getLabelPauseCauseName) : [];
      html += '<div class="answer-label">Возможные причины</div>';
      html += `<div class="answer-text">${causes.length ? causes.map(escapeHtml).join(', ') : 'Не выбраны'}</div>`;
      if (answer.focusCause) html += `<div class="answer-label">Главный фокус вопроса</div><div class="answer-text">${escapeHtml(getLabelPauseCauseName(answer.focusCause))}</div>`;
      if (answer.question) html += `<div class="answer-label">Вопрос вместо ярлыка</div><div class="answer-text">${escapeHtml(answer.question)}</div>`;
      if (answer.nextStep) html += `<div class="answer-label">Следующий шаг</div><div class="answer-text">${escapeHtml(getLabelPauseStepName(answer.nextStep))}</div>`;
      if (answer.bounded) html += '<div class="answer-label" style="color:var(--success)">Границы и точность сохранены</div>';
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Пауза перед ярлыком зафиксирована</div>';
      break;
    }
    case 33: {
      if (answer.idea) html += `<div class="answer-label">Большая идея</div><div class="answer-text">${escapeHtml(answer.idea)}</div>`;
      if (answer.rejection) html += `<div class="answer-label">Неприятие или критика</div><div class="answer-text">${escapeHtml(answer.rejection)}</div>`;
      if (answer.stage) html += `<div class="answer-label">Стадия</div><div class="answer-text">${escapeHtml(getRevolutionStageName(answer.stage))}</div>`;
      if (answer.motivator) html += `<div class="answer-label">Источник мотивации</div><div class="answer-text">${escapeHtml(getRevolutionMotivatorName(answer.motivator))}</div>`;
      if (answer.reason) html += `<div class="answer-label">Почему стоит продолжать</div><div class="answer-text">${escapeHtml(answer.reason)}</div>`;
      if (answer.nextStep) html += `<div class="answer-label">Следующий шаг</div><div class="answer-text">${escapeHtml(answer.nextStep)}</div>`;
      if (answer.balanced) html += '<div class="answer-label" style="color:var(--success)">Критика учтена без капитуляции</div>';
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Стадия зафиксирована</div>';
      break;
    }
    case 34: {
      if (answer.harmfulAction) html += `<div class="answer-label">Убираю на неделю</div><div class="answer-text">${escapeHtml(answer.harmfulAction)}</div>`;
      if (answer.helpfulAction) html += `<div class="answer-label">Полезное действие сегодня</div><div class="answer-text">${escapeHtml(answer.helpfulAction)}</div>`;
      if (answer.feeling) html += `<div class="answer-label">Самочувствие перед экспериментом</div><div class="answer-text">${escapeHtml(answer.feeling)}</div>`;
      if (answer.pauseWeek) html += '<div class="answer-label" style="color:var(--success)">Отказ от вредящего действия на 7 дней запланирован</div>';
      if (answer.helpfulDone) html += '<div class="answer-label" style="color:var(--success)">Полезное действие выполнено сегодня</div>';
      if (answer.committed) html += '<div class="answer-label" style="color:var(--success)">Эксперимент зафиксирован</div>';
      break;
    }
    case 35: {
      if (answer.noticedCount) html += `<div class="answer-label">Необычных мыслей замечено</div><div class="answer-text">${escapeHtml(answer.noticedCount)}</div>`;
      if (answer.heldBackCount) html += `<div class="answer-label">Оставлено без слов и действий</div><div class="answer-text">${escapeHtml(answer.heldBackCount)}</div>`;
      if (answer.support) html += `<div class="answer-label">Что помогло сделать паузу</div><div class="answer-text">${escapeHtml(answer.support)}</div>`;
      if (answer.observed) html += '<div class="answer-label" style="color:var(--success)">Наблюдение за мыслями выполнено</div>';
      break;
    }
    case 36: {
      html += `<div class="answer-label">Выступление TEDx</div><div class="answer-text"><a href="${BRAIN_SCANS_TALK_URL}" target="_blank" rel="noopener noreferrer">Самый важный урок из 83 000 сканов (новая вкладка)</a></div>`;
      if (answer.takeaway) html += `<div class="answer-label">Мысль из выступления</div><div class="answer-text">${escapeHtml(answer.takeaway)}</div>`;
      if (answer.watched) html += '<div class="answer-label" style="color:var(--success)">Выступление просмотрено</div>';
      break;
    }
    case 37: {
      if (answer.situation) html += `<div class="answer-label">Трудный период</div><div class="answer-text">${escapeHtml(answer.situation)}</div>`;
      if (answer.connection) html += `<div class="answer-label">Возможная связь со здоровьем мозга</div><div class="answer-text">${escapeHtml(answer.connection)}</div>`;
      if (answer.support) html += `<div class="answer-label">Поддержка</div><div class="answer-text">${escapeHtml(answer.support)}</div>`;
      break;
    }
    case 39: {
      if (answer.walked) html += '<div class="answer-label" style="color:var(--success)">Сегодня я прошёл(ла) быстрым шагом</div><div class="answer-text">Прогулка выполнена</div>';
      if (answer.minutes) html += `<div class="answer-label">Минут быстрым шагом</div><div class="answer-text">${escapeHtml(answer.minutes)}</div>`;
      if (answer.note) html += `<div class="answer-label">Маршрут и самочувствие</div><div class="answer-text">${escapeHtml(answer.note)}</div>`;
      break;
    }
    case 40: {
      if (answer.sport) html += `<div class="answer-label">Игра</div><div class="answer-text">${escapeHtml(answer.sport)}</div>`;
      if (answer.place) html += `<div class="answer-label">Место для игры</div><div class="answer-text">${escapeHtml(answer.place)}</div>`;
      if (answer.details) html += `<div class="answer-label">Как начать</div><div class="answer-text">${escapeHtml(answer.details)}</div>`;
      if (answer.found) html += '<div class="answer-label" style="color:var(--success)">Место для игры найдено</div>';
      break;
    }
  }
  return html || '<p class="empty-answer">Нет данных</p>';
}

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = value == null ? '' : value;
  return element.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* =========================================
   ВИД ДНЯ
   ========================================= */
function renderDayView(dayId, mode) {
  const day = DAYS[dayId - 1];
  const unlocked = isDayUnlocked(dayId);
  const completed = isDayCompleted(dayId);
  const readable = isDayReadable(dayId);

  let html = `<button class="btn-back" id="btnBack"><i class="fa-solid fa-arrow-left"></i> Назад</button>`;
  html += `<div class="day-header">
    <div class="day-meta"><div class="label">День ${day.id}</div><span>${completed ? 'Выполнен' : `из ${DAYS.length}`}</span></div>
    <h2>${day.title}</h2>
    ${mode !== 'readonly' && readable ? `<a class="practice-link" href="#dayPractice">${completed ? 'Посмотреть мои ответы' : 'Перейти к практике'} <i class="fa-solid fa-arrow-down" aria-hidden="true"></i></a>` : ''}
  </div>`;

  if (!readable && mode === 'interactive') {
    html += `<div class="task-locked"><i class="fa-solid fa-lock"></i><p>Этот день откроется в свой день программы</p></div>`;
    return html;
  }

  html += `<article class="day-text">${day.text}</article>`;

  if (mode === 'readonly') return html;

  html += '<div class="divider"></div>';
  html += '<section class="task-section" id="dayPractice" aria-labelledby="practiceTitle">';
  html += `<h3 id="practiceTitle">Практика на сегодня</h3><p class="task-desc">${day.taskTitle}</p>`;

  if (!unlocked) {
    html += `<div style="margin-top:16px"><button class="btn btn-primary" id="btnMarkRead"><i class="fa-solid fa-book-open"></i> Я прочитал</button></div>`;
  } else if (!completed) {
    html += renderTask(day);
    html += `<div class="task-actions"><button class="btn btn-primary" id="btnCompleteDay" disabled><i class="fa-solid fa-check"></i> Завершить день</button><p class="completion-hint" id="completionHint">Заполните практику, чтобы завершить день</p></div>`;
    html += `<p class="save-status ${storageAvailable ? '' : 'save-error'}" id="saveStatus" role="status">${storageAvailable ? 'Ответы сохраняются в этом браузере' : 'Ответы не сохранены. Не закрывайте страницу'}</p>`;
  } else {
    html += '<p class="completed-message"><i class="fa-solid fa-circle-check"></i> День выполнен</p>';
    const answer = state.answers['day' + dayId];
    if (answer) html += `<div class="completed-answers">${renderJournalAnswer(dayId, answer)}</div>`;
  }

  html += '</section>';
  return html;
}

function renderWaitingForTomorrow() {
  const nextDayId = getFirstIncompleteDayId();
  return renderJourneyProgress('Маленький шаг сделан', 'Дайте сегодняшней практике время стать частью вашей жизни.') + `<div class="all-done">
    <span class="trophy"><i class="fa-solid fa-moon"></i></span>
    <h2>Сегодня всё выполнено</h2>
    <p>День ${nextDayId} откроется завтра. Один небольшой текст и одно задание в день — так путь остаётся спокойным и устойчивым.</p>
    <button class="btn btn-secondary" data-tab="journal">Посмотреть мой путь</button>
  </div>`;
}

function renderAllDone() {
  return `<div class="all-done anim-fade-up">
    <span class="trophy"><i class="fa-solid fa-trophy"></i></span>
    <h2>Первые ${DAYS.length} дней пройдены</h2>
    <p>Вы сделали первый шаг к здоровью своего мозга. Продолжайте следовать стратегиям BRIGHT MINDS каждый день.</p>
  </div>`;
}
