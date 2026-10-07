/* =========================================
   РЕНДЕР ЗАДАНИЙ
   ========================================= */
function renderTask(day) {
  switch(day.taskType) {
    case 'reasons': return renderReasons();
    case 'friends': return renderFriends();
    case 'judgment': return renderJudgment();
    case 'achievements': return renderAchievements();
    case 'letter': return renderLetter();
    case 'loveScale': return renderLoveScale();
    case 'brightMinds': return renderBrightMinds();
    case 'habits': return renderHabits();
    case 'strategy': return renderStrategy();
    case 'scales': return renderScales();
    case 'potential': return renderPotential();
    case 'brainBattle': return renderBrainBattle();
    case 'inspiration': return renderInspiration();
    case 'nancyStep': return renderNancyStep();
    case 'shepherd': return renderShepherd();
    case 'brainStart': return renderBrainStart();
    case 'healthyRhythm': return renderHealthyRhythm();
    case 'automaticPhase': return renderAutomaticPhase();
    case 'healthMetrics': return renderHealthMetrics();
    case 'fourCircles': return renderFourCircles();
    case 'seahorseReserve': return renderSeahorseReserve();
    case 'antPopulation': return renderAntPopulation();
    case 'penguinPraise': return renderPenguinPraise();
    case 'butterflyPurpose': return renderButterflyPurpose();
    case 'biologicalRuler': return renderBiologicalRuler();
    case 'psychologicalRuler': return renderPsychologicalRuler();
    case 'socialRuler': return renderSocialRuler();
    case 'spiritualRuler': return renderSpiritualRuler();
    case 'multiCauseMap': return renderMultiCauseMap();
    case 'brainHealthMessage': return renderBrainHealthMessage();
    case 'alternativeReason': return renderAlternativeReason();
    case 'labelPause': return renderLabelPause();
    case 'revolutionStage': return renderRevolutionStage();
    case 'weeklyExperiment': return renderWeeklyExperiment();
    case 'thoughtPause': return renderThoughtPause();
    case 'brainScansTalk': return renderBrainScansTalk();
    case 'hopeReflection': return renderHopeReflection();
    case 'memoryRescue': return renderMemoryRescue();
    case 'briskWalk': return renderBriskWalk();
    case 'brainSport': return renderBrainSport();
    default: return '';
  }
}

function createEmptyFriends() {
  return Array.from({length:10}, () => ({name:'', helped:false, type:''}));
}

function normalizeReasonsAnswer() {
  if (!state.answers.day1) state.answers.day1 = { reasons: ['','',''], sealed: false };
  if (!Array.isArray(state.answers.day1.reasons)) state.answers.day1.reasons = ['','',''];
  while (state.answers.day1.reasons.length < 3) state.answers.day1.reasons.push('');
  state.answers.day1.reasons = state.answers.day1.reasons.slice(0, 3);
  state.answers.day1.sealed = Boolean(state.answers.day1.sealed);
  return state.answers.day1;
}

function normalizeFriendsAnswer() {
  if (!state.answers.day2) state.answers.day2 = { friends: createEmptyFriends() };
  if (!Array.isArray(state.answers.day2.friends)) state.answers.day2.friends = createEmptyFriends();
  while (state.answers.day2.friends.length < 10) state.answers.day2.friends.push({name:'', helped:false, type:''});
  state.answers.day2.friends = state.answers.day2.friends.slice(0, 10).map(friend => {
    const name = friend && friend.name ? friend.name : '';
    const helped = Boolean(name.trim() && friend && friend.helped);
    return {
      name,
      helped,
      type: helped && friend && friend.type ? friend.type : ''
    };
  });
  return state.answers.day2;
}

function createEmptyJudgmentPeople() {
  return Array.from({length:4}, () => ({name:'', judgment:'', hasBrainIssue:false, how:''}));
}

function normalizeJudgmentAnswer() {
  if (!state.answers.day3) state.answers.day3 = { people: createEmptyJudgmentPeople(), flipped: false };
  if (!Array.isArray(state.answers.day3.people)) state.answers.day3.people = createEmptyJudgmentPeople();
  if (state.answers.day3.people.length < 3) {
    while (state.answers.day3.people.length < 3) state.answers.day3.people.push({name:'', judgment:'', hasBrainIssue:false, how:''});
  }
  state.answers.day3.people = state.answers.day3.people.slice(0, 4).map(person => ({
    name: person && person.name ? person.name : '',
    judgment: person && person.judgment ? person.judgment : '',
    hasBrainIssue: Boolean(person && person.hasBrainIssue),
    how: person && person.how ? person.how : ''
  }));
  state.answers.day3.flipped = Boolean(state.answers.day3.flipped);
  return state.answers.day3;
}

function normalizeAchievementsAnswer() {
  if (!state.answers.day4) state.answers.day4 = { achievements: [{achievement:'',who:''},{achievement:'',who:''},{achievement:'',who:''}] };
  if (!Array.isArray(state.answers.day4.achievements)) state.answers.day4.achievements = [];
  while (state.answers.day4.achievements.length < 3) state.answers.day4.achievements.push({achievement:'', who:''});
  state.answers.day4.achievements = state.answers.day4.achievements.slice(0, 3).map(item => ({
    achievement: item && item.achievement ? item.achievement : '',
    who: item && item.who ? item.who : ''
  }));
  return state.answers.day4;
}

function normalizeBrightMindsAnswer(dayId = 7) {
  const key = 'day' + dayId;
  if (!state.answers[key] || !Array.isArray(state.answers[key].part1) || !Array.isArray(state.answers[key].part2)) {
    state.answers[key] = { part1: Array(EARLY_WARNING_QUESTIONS.length).fill(null), part2: Array(RISK_FACTOR_QUESTIONS.length).fill(null) };
  }
  const answer = state.answers[key];
  answer.part1 = answer.part1.slice(0, EARLY_WARNING_QUESTIONS.length);
  answer.part2 = answer.part2.slice(0, RISK_FACTOR_QUESTIONS.length);
  while (answer.part1.length < EARLY_WARNING_QUESTIONS.length) answer.part1.push(null);
  while (answer.part2.length < RISK_FACTOR_QUESTIONS.length) answer.part2.push(null);
  answer.part1 = answer.part1.map(value => EARLY_WARNING_OPTIONS.some(option => option.id === value) ? value : null);
  answer.part2 = answer.part2.map(value => RISK_FACTOR_OPTIONS.some(option => option.id === value) ? value : null);
  delete answer.risks;
  delete answer.expanded;
  return answer;
}

function normalizeHabitsAnswer() {
  if (!state.answers.day8) state.answers.day8 = { habits: [], consequences: [], links: {}, worst: '', activeHabit: '' };
  const answer = state.answers.day8;
  if (!Array.isArray(answer.habits)) answer.habits = [];
  if (!Array.isArray(answer.consequences)) answer.consequences = [];
  if (!answer.links || typeof answer.links !== 'object' || Array.isArray(answer.links)) answer.links = {};
  const habitAliases = {
    'Избыток сахара': 'Сахар',
    'Токсичное окружение': 'Общение с токсичными людьми'
  };
  answer.activeHabit = habitAliases[answer.activeHabit] || answer.activeHabit || '';
  const legacyConsequences = answer.consequences
    .filter((item, index, consequences) => LIFE_CONSEQUENCES.includes(item) && consequences.indexOf(item) === index);
  const normalizedLinks = {};
  Object.keys(answer.links).forEach(habit => {
    const normalizedHabit = habitAliases[habit] || habit;
    if (!Array.isArray(normalizedLinks[normalizedHabit])) normalizedLinks[normalizedHabit] = [];
    if (Array.isArray(answer.links[habit])) normalizedLinks[normalizedHabit].push(...answer.links[habit]);
  });
  answer.links = normalizedLinks;
  answer.habits = answer.habits
    .map(habit => habitAliases[habit] || habit)
    .filter((habit, index, habits) => HARMFUL_HABITS.includes(habit) && habits.indexOf(habit) === index);
  answer.habits.forEach(habit => {
    if (!Array.isArray(answer.links[habit])) answer.links[habit] = legacyConsequences.slice();
    answer.links[habit] = answer.links[habit]
      .filter((item, index, links) => LIFE_CONSEQUENCES.includes(item) && links.indexOf(item) === index);
  });
  Object.keys(answer.links).forEach(habit => {
    if (!answer.habits.includes(habit)) delete answer.links[habit];
  });
  if (!answer.habits.includes(answer.activeHabit)) answer.activeHabit = answer.habits[0] || '';
  syncHabitConsequences(answer);
  answer.worst = answer.worst || '';
  return answer;
}

function syncHabitConsequences(answer) {
  answer.consequences = [];
  answer.habits.forEach(habit => {
    const links = Array.isArray(answer.links[habit]) ? answer.links[habit] : [];
    links.forEach(consequence => {
      if (!answer.consequences.includes(consequence)) answer.consequences.push(consequence);
    });
  });
}

function normalizeStrategyAnswer() {
  if (!state.answers.day9) state.answers.day9 = { strategy: null, date: '', time: '', frequency: '', frequencyOther: '', promised: false };
  const answer = state.answers.day9;
  if (typeof answer.strategy !== 'number') answer.strategy = null;
  if (answer.strategy !== null && !BRAIN_STRATEGIES[answer.strategy]) answer.strategy = null;
  answer.date = answer.date || '';
  answer.time = answer.time || '';
  answer.frequency = answer.frequency || '';
  answer.frequencyOther = answer.frequencyOther || '';
  const allowedFrequencies = ['', 'Каждый день', '4 раза в неделю', 'Другое'];
  if (!allowedFrequencies.includes(answer.frequency)) {
    answer.frequencyOther = answer.frequency;
    answer.frequency = 'Другое';
  }
  answer.promised = Boolean(answer.promised);
  return answer;
}

function normalizeScalesAnswer() {
  if (!state.answers.day10) state.answers.day10 = { steals: ['','',''], strengthens: ['','',''] };
  if (!Array.isArray(state.answers.day10.steals)) state.answers.day10.steals = ['','',''];
  if (!Array.isArray(state.answers.day10.strengthens)) state.answers.day10.strengthens = ['','',''];
  while (state.answers.day10.steals.length < 3) state.answers.day10.steals.push('');
  while (state.answers.day10.strengthens.length < 3) state.answers.day10.strengthens.push('');
  state.answers.day10.steals = state.answers.day10.steals.slice(0, 3);
  state.answers.day10.strengthens = state.answers.day10.strengthens.slice(0, 3);
  return state.answers.day10;
}

function normalizePotentialAnswer() {
  if (!state.answers.day11) state.answers.day11 = { areas: [], improvements: {}, importance: {}, firstStep: '' };
  const answer = state.answers.day11;
  const allowedAreaIds = POTENTIAL_AREAS.map(area => area.id);
  if (!Array.isArray(answer.areas)) answer.areas = [];
  if (!answer.improvements || typeof answer.improvements !== 'object' || Array.isArray(answer.improvements)) answer.improvements = {};
  if (!answer.importance || typeof answer.importance !== 'object' || Array.isArray(answer.importance)) answer.importance = {};
  answer.areas = answer.areas.filter((areaId, index, areas) => allowedAreaIds.includes(areaId) && areas.indexOf(areaId) === index);
  answer.areas.forEach(areaId => {
    answer.improvements[areaId] = answer.improvements[areaId] || '';
    const score = Number(answer.importance[areaId]);
    answer.importance[areaId] = score >= 1 && score <= 5 ? score : 3;
  });
  Object.keys(answer.improvements).forEach(areaId => {
    if (!answer.areas.includes(areaId)) delete answer.improvements[areaId];
  });
  Object.keys(answer.importance).forEach(areaId => {
    if (!answer.areas.includes(areaId)) delete answer.importance[areaId];
  });
  answer.firstStep = answer.firstStep || '';
  return answer;
}

function getFilledPotentialCount(answer) {
  return answer.areas.filter(areaId => answer.improvements[areaId] && answer.improvements[areaId].trim()).length;
}

function getCollectionField(collection, id, field='name') {
  const item = collection.find(entry => entry.id === id);
  return item ? item[field] : id;
}

function normalizeBrainBattleAnswer() {
  if (!state.answers.day12) state.answers.day12 = { threats: [], allies: [], focusThreat: '', shieldAction: '' };
  const answer = state.answers.day12;
  const allowedThreats = BRAIN_BATTLE_THREATS.map(item => item.id);
  const allowedAllies = BRAIN_BATTLE_ALLIES.map(item => item.id);
  if (!Array.isArray(answer.threats)) answer.threats = [];
  if (!Array.isArray(answer.allies)) answer.allies = [];
  answer.threats = answer.threats.filter((id, index, ids) => allowedThreats.includes(id) && ids.indexOf(id) === index);
  answer.allies = answer.allies.filter((id, index, ids) => allowedAllies.includes(id) && ids.indexOf(id) === index);
  answer.focusThreat = allowedThreats.includes(answer.focusThreat) && answer.threats.includes(answer.focusThreat)
    ? answer.focusThreat
    : (answer.threats[0] || '');
  answer.shieldAction = answer.shieldAction || '';
  return answer;
}

function getBrainBattleName(collection, id) {
  return getCollectionField(collection, id);
}

function isBrainBattleReady(answer) {
  return answer.threats.length > 0 && answer.allies.length > 0 && answer.focusThreat && answer.shieldAction.trim();
}

function createEmptyInspirationPeople() {
  return Array.from({length:3}, () => ({name:'', visibleChange:'', firstSignal:''}));
}

function normalizeInspirationAnswer() {
  if (!state.answers.day13) state.answers.day13 = { signs: [], people: createEmptyInspirationPeople(), firstStep: '' };
  const answer = state.answers.day13;
  const allowedSigns = RECOVERY_SIGNS.map(sign => sign.id);
  if (!Array.isArray(answer.signs)) answer.signs = [];
  if (!Array.isArray(answer.people)) answer.people = createEmptyInspirationPeople();
  answer.signs = answer.signs.filter((id, index, ids) => allowedSigns.includes(id) && ids.indexOf(id) === index).slice(0, 3);
  while (answer.people.length < 3) answer.people.push({name:'', visibleChange:'', firstSignal:''});
  answer.people = answer.people.slice(0, 3).map(person => ({
    name: person && person.name ? person.name : '',
    visibleChange: person && person.visibleChange ? person.visibleChange : '',
    firstSignal: person && person.firstSignal ? person.firstSignal : ''
  }));
  answer.firstStep = answer.firstStep || '';
  return answer;
}

function getFilledInspirationCount(answer) {
  return answer.people.filter(person => person.name.trim() && person.visibleChange.trim() && person.firstSignal.trim()).length;
}

function isInspirationReady(answer) {
  return getFilledInspirationCount(answer) >= 2 && answer.signs.length > 0 && answer.firstStep.trim();
}

function getRecoverySignName(id) {
  return getCollectionField(RECOVERY_SIGNS, id);
}

function normalizeNancyStepAnswer() {
  if (!state.answers.day14) state.answers.day14 = { step: '', pace: 'gradual', microStep: '', when: '', committed: false };
  const answer = state.answers.day14;
  const allowedSteps = NANCY_STEPS.map(step => step.id);
  if (!allowedSteps.includes(answer.step)) answer.step = '';
  if (!['fast', 'gradual'].includes(answer.pace)) answer.pace = 'gradual';
  answer.microStep = answer.microStep || '';
  answer.when = answer.when || '';
  answer.committed = Boolean(answer.committed);
  return answer;
}

function getNancyStepName(id) {
  return getCollectionField(NANCY_STEPS, id);
}

function isNancyStepReady(answer) {
  return Boolean(answer.step && answer.pace && answer.microStep.trim() && answer.when.trim() && answer.committed);
}

function createEmptyShepherdPeople() {
  return Array.from({length:4}, () => ({name:'', threats: [], support: '', action: ''}));
}

function normalizeShepherdAnswer() {
  if (!state.answers.day15) state.answers.day15 = { people: createEmptyShepherdPeople(), boundary: '' };
  const answer = state.answers.day15;
  const allowedThreats = SHEPHERD_THREATS.map(threat => threat.id);
  const allowedSupport = SHEPHERD_SUPPORT_STYLES.map(style => style.id);
  if (!Array.isArray(answer.people)) answer.people = createEmptyShepherdPeople();
  while (answer.people.length < 4) answer.people.push({name:'', threats: [], support: '', action: ''});
  answer.people = answer.people.slice(0, 4).map(person => {
    const threats = Array.isArray(person && person.threats) ? person.threats : [];
    const support = person && allowedSupport.includes(person.support) ? person.support : '';
    return {
      name: person && person.name ? person.name : '',
      threats: threats.filter((id, index, ids) => allowedThreats.includes(id) && ids.indexOf(id) === index),
      support,
      action: person && person.action ? person.action : ''
    };
  });
  answer.boundary = answer.boundary || '';
  return answer;
}

function getFilledShepherdCount(answer) {
  return answer.people.filter(person => person.name.trim() && person.threats.length && person.support && person.action.trim()).length;
}

function isShepherdReady(answer) {
  return getFilledShepherdCount(answer) >= 2 && answer.boundary.trim();
}

function getShepherdThreatName(id) {
  return getCollectionField(SHEPHERD_THREATS, id);
}

function getShepherdSupportName(id) {
  return getCollectionField(SHEPHERD_SUPPORT_STYLES, id);
}

function normalizeBrainStartAnswer() {
  if (!state.answers.day16) {
    state.answers.day16 = {
      decision: '',
      customDecision: '',
      awkward: [],
      horizon: 60,
      support: '',
      nextStep: '',
      restart: '',
      committed: false
    };
  }
  const answer = state.answers.day16;
  const allowedDecisions = BRAIN_START_DECISIONS.map(item => item.id);
  const allowedAwkward = BRAIN_START_AWKWARD.map(item => item.id);
  if (!allowedDecisions.includes(answer.decision)) answer.decision = '';
  answer.customDecision = answer.customDecision || '';
  if (!Array.isArray(answer.awkward)) answer.awkward = [];
  answer.awkward = answer.awkward.filter((id, index, ids) => allowedAwkward.includes(id) && ids.indexOf(id) === index);
  answer.horizon = [30, 60, 90].includes(Number(answer.horizon)) ? Number(answer.horizon) : 60;
  answer.support = answer.support || '';
  answer.nextStep = answer.nextStep || '';
  answer.restart = answer.restart || '';
  answer.committed = Boolean(answer.committed);
  return answer;
}

function getBrainStartDecisionName(id, customDecision) {
  if (id === 'other' && customDecision && customDecision.trim()) return customDecision.trim();
  return getCollectionField(BRAIN_START_DECISIONS, id);
}

function getBrainStartAwkwardName(id) {
  return getCollectionField(BRAIN_START_AWKWARD, id);
}

function isBrainStartReady(answer) {
  const hasDecision = answer.decision && (answer.decision !== 'other' || answer.customDecision.trim());
  return Boolean(
    hasDecision &&
    answer.awkward.length &&
    answer.support.trim() &&
    answer.nextStep.trim() &&
    answer.restart.trim() &&
    answer.committed
  );
}

function normalizeHealthyRhythmAnswer() {
  if (!state.answers.day17) {
    state.answers.day17 = {
      changes: [],
      changed: '',
      support: '',
      returnMode: '',
      returnStep: ''
    };
  }
  const answer = state.answers.day17;
  const allowedChanges = HEALTHY_RHYTHM_CHANGES.map(item => item.id);
  const allowedReturns = HEALTHY_RHYTHM_RETURNS.map(item => item.id);
  if (!Array.isArray(answer.changes)) answer.changes = [];
  answer.changes = answer.changes
    .filter((id, index, ids) => allowedChanges.includes(id) && ids.indexOf(id) === index)
    .slice(0, 5);
  answer.changed = answer.changed || '';
  answer.support = answer.support || '';
  answer.returnMode = allowedReturns.includes(answer.returnMode) ? answer.returnMode : '';
  answer.returnStep = answer.returnStep || '';
  return answer;
}

function getHealthyRhythmChangeName(id) {
  return getCollectionField(HEALTHY_RHYTHM_CHANGES, id);
}

function getHealthyRhythmReturnName(id) {
  return getCollectionField(HEALTHY_RHYTHM_RETURNS, id);
}

function isHealthyRhythmReady(answer) {
  return Boolean(
    answer.changes.length >= 2 &&
    answer.changed.trim() &&
    answer.support.trim() &&
    answer.returnMode &&
    answer.returnStep.trim()
  );
}

function createEmptyAutomaticWays() {
  return Array.from({length:3}, () => ({text:'', impact:3}));
}

function normalizeAutomaticPhaseAnswer() {
  if (!state.answers.day18) {
    state.answers.day18 = {
      habits: [],
      ways: createEmptyAutomaticWays(),
      returnMode: '',
      returnPhrase: ''
    };
  }
  const answer = state.answers.day18;
  const allowedHabits = AUTOMATIC_HABITS.map(item => item.id);
  const allowedReturns = AUTOMATIC_RETURNS.map(item => item.id);
  if (!Array.isArray(answer.habits)) answer.habits = [];
  answer.habits = answer.habits
    .filter((id, index, ids) => allowedHabits.includes(id) && ids.indexOf(id) === index)
    .slice(0, 6);
  if (!Array.isArray(answer.ways)) answer.ways = createEmptyAutomaticWays();
  while (answer.ways.length < 3) answer.ways.push({text:'', impact:3});
  answer.ways = answer.ways.slice(0, 3).map(item => {
    const impact = Number(item && item.impact);
    return {
      text: item && item.text ? item.text : '',
      impact: impact >= 1 && impact <= 5 ? impact : 3
    };
  });
  answer.returnMode = allowedReturns.includes(answer.returnMode) ? answer.returnMode : '';
  answer.returnPhrase = answer.returnPhrase || '';
  return answer;
}

function getAutomaticHabitName(id) {
  return getCollectionField(AUTOMATIC_HABITS, id);
}

function getAutomaticReturnName(id) {
  return getCollectionField(AUTOMATIC_RETURNS, id);
}

function getFilledAutomaticWaysCount(answer) {
  return answer.ways.filter(item => item.text.trim()).length;
}

function isAutomaticPhaseReady(answer) {
  return Boolean(
    answer.habits.length >= 3 &&
    getFilledAutomaticWaysCount(answer) === 3 &&
    answer.returnMode &&
    answer.returnPhrase.trim()
  );
}

function normalizeHealthMetricsAnswer() {
  if (!state.answers.day19) {
    state.answers.day19 = {
      statuses: {},
      values: {},
      risks: [],
      specialist: '',
      contactWhen: '',
      request: '',
      committed: false
    };
  }
  const answer = state.answers.day19;
  const allowedMetricIds = HEALTH_METRICS.map(item => item.id);
  const allowedStatuses = HEALTH_METRIC_STATUSES.map(item => item.id);
  const allowedRisks = MODIFIABLE_RISKS.map(item => item.id);
  if (!answer.statuses || typeof answer.statuses !== 'object' || Array.isArray(answer.statuses)) answer.statuses = {};
  if (!answer.values || typeof answer.values !== 'object' || Array.isArray(answer.values)) answer.values = {};
  Object.keys(answer.statuses).forEach(metricId => {
    if (!allowedMetricIds.includes(metricId) || !allowedStatuses.includes(answer.statuses[metricId])) delete answer.statuses[metricId];
  });
  Object.keys(answer.values).forEach(metricId => {
    if (!allowedMetricIds.includes(metricId)) delete answer.values[metricId];
    else answer.values[metricId] = answer.values[metricId] || '';
  });
  if (!Array.isArray(answer.risks)) answer.risks = [];
  answer.risks = answer.risks.filter((id, index, ids) => allowedRisks.includes(id) && ids.indexOf(id) === index);
  answer.specialist = answer.specialist || '';
  answer.contactWhen = answer.contactWhen || '';
  answer.request = answer.request || '';
  answer.committed = Boolean(answer.committed);
  return answer;
}

function getHealthMetricStatusName(id) {
  return getCollectionField(HEALTH_METRIC_STATUSES, id);
}

function getHealthMetricName(id) {
  return getCollectionField(HEALTH_METRICS, id);
}

function getModifiableRiskName(id) {
  return getCollectionField(MODIFIABLE_RISKS, id);
}

function isHealthMetricsReady(answer) {
  return Boolean(
    Object.keys(answer.statuses).length >= 3 &&
    answer.specialist.trim() &&
    answer.contactWhen.trim() &&
    answer.request.trim() &&
    answer.committed
  );
}

function normalizeFourCirclesAnswer() {
  if (!state.answers.day20) {
    state.answers.day20 = {
      ratings: {},
      strengths: {},
      vulnerabilities: {},
      focus: '',
      action: '',
      committed: false
    };
  }
  const answer = state.answers.day20;
  const allowedCircleIds = FOUR_CIRCLES.map(item => item.id);
  if (!answer.ratings || typeof answer.ratings !== 'object' || Array.isArray(answer.ratings)) answer.ratings = {};
  if (!answer.strengths || typeof answer.strengths !== 'object' || Array.isArray(answer.strengths)) answer.strengths = {};
  if (!answer.vulnerabilities || typeof answer.vulnerabilities !== 'object' || Array.isArray(answer.vulnerabilities)) answer.vulnerabilities = {};
  FOUR_CIRCLES.forEach(circle => {
    const rating = Number(answer.ratings[circle.id]);
    answer.ratings[circle.id] = rating >= 1 && rating <= 5 ? rating : 3;
    answer.strengths[circle.id] = answer.strengths[circle.id] || '';
    answer.vulnerabilities[circle.id] = answer.vulnerabilities[circle.id] || '';
  });
  Object.keys(answer.ratings).forEach(id => { if (!allowedCircleIds.includes(id)) delete answer.ratings[id]; });
  Object.keys(answer.strengths).forEach(id => { if (!allowedCircleIds.includes(id)) delete answer.strengths[id]; });
  Object.keys(answer.vulnerabilities).forEach(id => { if (!allowedCircleIds.includes(id)) delete answer.vulnerabilities[id]; });
  answer.focus = allowedCircleIds.includes(answer.focus) ? answer.focus : '';
  answer.action = answer.action || '';
  answer.committed = Boolean(answer.committed);
  return answer;
}

function getFourCircleName(id) {
  return getCollectionField(FOUR_CIRCLES, id);
}

function getFourCirclesFilledCount(answer) {
  return FOUR_CIRCLES.filter(circle => (
    answer.strengths[circle.id] &&
    answer.strengths[circle.id].trim() &&
    answer.vulnerabilities[circle.id] &&
    answer.vulnerabilities[circle.id].trim()
  )).length;
}

function isFourCirclesReady(answer) {
  return Boolean(
    getFourCirclesFilledCount(answer) === FOUR_CIRCLES.length &&
    answer.focus &&
    answer.action.trim() &&
    answer.committed
  );
}

function createEmptySeahorseItems() {
  return ['', '', ''];
}

function normalizeSeahorseReserveAnswer() {
  if (!state.answers.day21) {
    state.answers.day21 = {
      nourish: createEmptySeahorseItems(),
      toxic: createEmptySeahorseItems(),
      focusToxic: '',
      protection: '',
      committed: false
    };
  }
  const answer = state.answers.day21;
  if (!Array.isArray(answer.nourish)) answer.nourish = createEmptySeahorseItems();
  if (!Array.isArray(answer.toxic)) answer.toxic = createEmptySeahorseItems();
  while (answer.nourish.length < 3) answer.nourish.push('');
  while (answer.toxic.length < 3) answer.toxic.push('');
  answer.nourish = answer.nourish.slice(0, 3).map(item => item || '');
  answer.toxic = answer.toxic.slice(0, 3).map(item => item || '');
  answer.focusToxic = answer.toxic.includes(answer.focusToxic) ? answer.focusToxic : '';
  answer.protection = answer.protection || '';
  answer.committed = Boolean(answer.committed);
  return answer;
}

function getFilledSeahorseCount(answer, key) {
  return answer[key].filter(item => item.trim()).length;
}

function isSeahorseReserveReady(answer) {
  return Boolean(
    getFilledSeahorseCount(answer, 'nourish') === 3 &&
    getFilledSeahorseCount(answer, 'toxic') === 3 &&
    answer.focusToxic &&
    answer.protection.trim() &&
    answer.committed
  );
}

function createEmptyAntThoughts() {
  return Array.from({length:3}, () => ({text:'', type:''}));
}

function normalizeAntPopulationAnswer() {
  if (!state.answers.day22) {
    state.answers.day22 = {
      population: 0,
      populationSet: false,
      areas: [],
      thoughts: createEmptyAntThoughts(),
      observation: '',
      committed: false
    };
  }
  const answer = state.answers.day22;
  const allowedAreas = ANT_AREAS.map(item => item.id);
  const allowedTypes = ANT_THOUGHT_TYPES.map(item => item.id);
  const population = Number(answer.population);
  answer.population = population >= 0 && population <= 10 ? population : 0;
  answer.populationSet = Boolean(answer.populationSet);
  if (!Array.isArray(answer.areas)) answer.areas = [];
  answer.areas = answer.areas
    .filter((id, index, ids) => allowedAreas.includes(id) && ids.indexOf(id) === index)
    .slice(0, 3);
  if (!Array.isArray(answer.thoughts)) answer.thoughts = createEmptyAntThoughts();
  while (answer.thoughts.length < 3) answer.thoughts.push({text:'', type:''});
  answer.thoughts = answer.thoughts.slice(0, 3).map(thought => ({
    text: thought && thought.text ? thought.text : '',
    type: thought && allowedTypes.includes(thought.type) ? thought.type : ''
  }));
  answer.observation = answer.observation || '';
  answer.committed = Boolean(answer.committed);
  return answer;
}

function getRequiredAntThoughtCount(answer) {
  if (!answer.populationSet) return 1;
  if (answer.population <= 3) return 1;
  if (answer.population <= 6) return 2;
  return 3;
}

function getFilledAntThoughtCount(answer) {
  return answer.thoughts.filter(thought => thought.text.trim() && thought.type).length;
}

function getAntPopulationLabel(answer) {
  if (!answer.populationSet) return 'Передвиньте шкалу, чтобы оценить популяцию АНТов.';
  if (answer.population <= 3) return 'Сейчас АНТов немного. Достаточно поймать хотя бы одну мысль.';
  if (answer.population <= 6) return 'АНТы заметны. Запишите две автоматические мысли.';
  return 'Популяция велика. Начните дневник с трёх негативных мыслей.';
}

function getAntAreaName(id) {
  return getCollectionField(ANT_AREAS, id);
}

function getAntThoughtTypeName(id) {
  return getCollectionField(ANT_THOUGHT_TYPES, id);
}

function isAntPopulationReady(answer) {
  return Boolean(
    answer.populationSet &&
    answer.areas.length &&
    getFilledAntThoughtCount(answer) >= getRequiredAntThoughtCount(answer) &&
    answer.observation.trim() &&
    answer.committed
  );
}

function createEmptyPenguinPeople() {
  return Array.from({length:2}, () => ({name:'', quality:'', method:'', action:''}));
}

function normalizePenguinPraiseAnswer() {
  if (!state.answers.day23) {
    state.answers.day23 = {
      people: createEmptyPenguinPeople(),
      rule: '',
      committed: false
    };
  }
  const answer = state.answers.day23;
  const allowedMethods = PENGUIN_ATTENTION_METHODS.map(item => item.id);
  const allowedRules = PENGUIN_ATTENTION_RULES.map(item => item.id);
  if (!Array.isArray(answer.people)) answer.people = createEmptyPenguinPeople();
  while (answer.people.length < 2) answer.people.push({name:'', quality:'', method:'', action:''});
  answer.people = answer.people.slice(0, 2).map(person => ({
    name: person && person.name ? person.name : '',
    quality: person && person.quality ? person.quality : '',
    method: person && allowedMethods.includes(person.method) ? person.method : '',
    action: person && person.action ? person.action : ''
  }));
  answer.rule = allowedRules.includes(answer.rule) ? answer.rule : '';
  answer.committed = Boolean(answer.committed);
  return answer;
}

function isPenguinPersonStarted(person) {
  return Boolean(person.name.trim() || person.quality.trim() || person.method || person.action.trim());
}

function isPenguinPersonComplete(person) {
  return Boolean(person.name.trim() && person.quality.trim() && person.method && person.action.trim());
}

function getPenguinCompleteCount(answer) {
  return answer.people.filter(isPenguinPersonComplete).length;
}

function hasIncompletePenguinPerson(answer) {
  return answer.people.some(person => isPenguinPersonStarted(person) && !isPenguinPersonComplete(person));
}

function getPenguinMethodName(id) {
  return getCollectionField(PENGUIN_ATTENTION_METHODS, id);
}

function getPenguinRuleName(id) {
  return getCollectionField(PENGUIN_ATTENTION_RULES, id);
}

function isPenguinPraiseReady(answer) {
  return Boolean(
    getPenguinCompleteCount(answer) >= 1 &&
    !hasIncompletePenguinPerson(answer) &&
    answer.rule &&
    answer.committed
  );
}

function normalizeButterflyPurposeAnswer() {
  if (!state.answers.day24) {
    state.answers.day24 = {
      questions: [],
      responses: {},
      values: [],
      action: '',
      committed: false
    };
  }
  const answer = state.answers.day24;
  const allowedQuestionIds = BUTTERFLY_PURPOSE_QUESTIONS.map(item => item.id);
  const allowedValueIds = BUTTERFLY_VALUES.map(item => item.id);
  if (!Array.isArray(answer.questions)) answer.questions = [];
  if (!answer.responses || typeof answer.responses !== 'object' || Array.isArray(answer.responses)) answer.responses = {};
  if (!Array.isArray(answer.values)) answer.values = [];
  answer.questions = answer.questions
    .filter((id, index, ids) => allowedQuestionIds.includes(id) && ids.indexOf(id) === index);
  answer.values = answer.values
    .filter((id, index, ids) => allowedValueIds.includes(id) && ids.indexOf(id) === index)
    .slice(0, 4);
  answer.questions.forEach(questionId => {
    answer.responses[questionId] = answer.responses[questionId] || '';
  });
  Object.keys(answer.responses).forEach(questionId => {
    if (!answer.questions.includes(questionId)) delete answer.responses[questionId];
  });
  answer.action = answer.action || '';
  answer.committed = Boolean(answer.committed);
  return answer;
}

function getButterflyFilledCount(answer) {
  return answer.questions.filter(questionId => answer.responses[questionId] && answer.responses[questionId].trim()).length;
}

function getButterflyQuestionText(id) {
  return getCollectionField(BUTTERFLY_PURPOSE_QUESTIONS, id, 'text');
}

function getButterflyValueName(id) {
  return getCollectionField(BUTTERFLY_VALUES, id);
}

function isButterflyPurposeReady(answer) {
  return Boolean(
    answer.questions.length >= 3 &&
    getButterflyFilledCount(answer) === answer.questions.length &&
    answer.values.length >= 1 &&
    answer.action.trim() &&
    answer.committed
  );
}

function normalizeBiologicalRulerAnswer() {
  if (!state.answers.day25) {
    state.answers.day25 = {
      supports: [],
      harms: [],
      focusHarm: '',
      decree: '',
      sharedAction: '',
      committed: false
    };
  }
  const answer = state.answers.day25;
  const allowedSupportIds = BIOLOGICAL_SUPPORT_POLICIES.map(item => item.id);
  const allowedHarmIds = BIOLOGICAL_HARM_POLICIES.map(item => item.id);
  if (!Array.isArray(answer.supports)) answer.supports = [];
  if (!Array.isArray(answer.harms)) answer.harms = [];
  answer.supports = answer.supports
    .filter((id, index, ids) => allowedSupportIds.includes(id) && ids.indexOf(id) === index);
  answer.harms = answer.harms
    .filter((id, index, ids) => allowedHarmIds.includes(id) && ids.indexOf(id) === index);
  answer.focusHarm = allowedHarmIds.includes(answer.focusHarm) && answer.harms.includes(answer.focusHarm)
    ? answer.focusHarm
    : (answer.harms[0] || '');
  answer.decree = answer.decree || '';
  answer.sharedAction = answer.sharedAction || '';
  answer.committed = Boolean(answer.committed);
  return answer;
}

function getBiologicalPolicyName(collection, id) {
  const policy = collection.find(item => item.id === id);
  return policy ? policy.name : id;
}

function isBiologicalRulerReady(answer) {
  return Boolean(
    answer.supports.length >= 2 &&
    answer.harms.length >= 2 &&
    answer.focusHarm &&
    answer.decree.trim() &&
    answer.sharedAction.trim() &&
    answer.committed
  );
}

function normalizePsychologicalRulerAnswer() {
  if (!state.answers.day26) {
    state.answers.day26 = {
      supports: [],
      harms: [],
      focusHarm: '',
      decree: '',
      newMessage: '',
      committed: false
    };
  }
  const answer = state.answers.day26;
  const allowedSupportIds = PSYCHOLOGICAL_SUPPORT_POLICIES.map(item => item.id);
  const allowedHarmIds = PSYCHOLOGICAL_HARM_POLICIES.map(item => item.id);
  if (!Array.isArray(answer.supports)) answer.supports = [];
  if (!Array.isArray(answer.harms)) answer.harms = [];
  answer.supports = answer.supports
    .filter((id, index, ids) => allowedSupportIds.includes(id) && ids.indexOf(id) === index);
  answer.harms = answer.harms
    .filter((id, index, ids) => allowedHarmIds.includes(id) && ids.indexOf(id) === index);
  answer.focusHarm = allowedHarmIds.includes(answer.focusHarm) && answer.harms.includes(answer.focusHarm)
    ? answer.focusHarm
    : (answer.harms[0] || '');
  answer.decree = answer.decree || '';
  answer.newMessage = answer.newMessage || '';
  answer.committed = Boolean(answer.committed);
  return answer;
}

function getPsychologicalPolicyName(collection, id) {
  const policy = collection.find(item => item.id === id);
  return policy ? policy.name : id;
}

function isPsychologicalRulerReady(answer) {
  return Boolean(
    answer.supports.length >= 2 &&
    answer.harms.length >= 2 &&
    answer.focusHarm &&
    answer.decree.trim() &&
    answer.newMessage.trim() &&
    answer.committed
  );
}

function normalizeSocialRulerAnswer() {
  if (!state.answers.day27) {
    state.answers.day27 = {
      supports: [],
      stressors: [],
      relationships: [{name:'', impact:''}, {name:'', impact:''}],
      focusStress: '',
      stressStep: '',
      connectionAction: '',
      committed: false
    };
  }
  const answer = state.answers.day27;
  const allowedSupportIds = SOCIAL_SUPPORT_ACTIONS.map(item => item.id);
  const allowedStressIds = SOCIAL_STRESSORS.map(item => item.id);
  if (!Array.isArray(answer.supports)) answer.supports = [];
  if (!Array.isArray(answer.stressors)) answer.stressors = [];
  if (!Array.isArray(answer.relationships)) answer.relationships = [];
  answer.supports = answer.supports
    .filter((id, index, ids) => allowedSupportIds.includes(id) && ids.indexOf(id) === index);
  answer.stressors = answer.stressors
    .filter((id, index, ids) => allowedStressIds.includes(id) && ids.indexOf(id) === index);
  while (answer.relationships.length < 2) answer.relationships.push({name:'', impact:''});
  answer.relationships = answer.relationships.slice(0, 2).map(item => ({
    name: item && item.name ? item.name : '',
    impact: item && item.impact ? item.impact : ''
  }));
  answer.focusStress = allowedStressIds.includes(answer.focusStress) && answer.stressors.includes(answer.focusStress)
    ? answer.focusStress
    : (answer.stressors[0] || '');
  answer.stressStep = answer.stressStep || '';
  answer.connectionAction = answer.connectionAction || '';
  answer.committed = Boolean(answer.committed);
  return answer;
}

function isSocialRelationshipStarted(relationship) {
  return Boolean(relationship.name.trim() || relationship.impact.trim());
}

function isSocialRelationshipComplete(relationship) {
  return Boolean(relationship.name.trim() && relationship.impact.trim());
}

function getSocialRelationshipCount(answer) {
  return answer.relationships.filter(isSocialRelationshipComplete).length;
}

function hasIncompleteSocialRelationship(answer) {
  return answer.relationships.some(item => isSocialRelationshipStarted(item) && !isSocialRelationshipComplete(item));
}

function getSocialItemName(collection, id) {
  return getCollectionField(collection, id);
}

function isSocialRulerReady(answer) {
  return Boolean(
    answer.supports.length >= 2 &&
    answer.stressors.length >= 2 &&
    getSocialRelationshipCount(answer) >= 1 &&
    !hasIncompleteSocialRelationship(answer) &&
    answer.focusStress &&
    answer.stressStep.trim() &&
    answer.connectionAction.trim() &&
    answer.committed
  );
}

function normalizeSpiritualRulerAnswer() {
  if (!state.answers.day28) {
    state.answers.day28 = {
      anchor: '',
      connection: '',
      action: '',
      when: '',
      added: false,
      committed: false
    };
  }
  const answer = state.answers.day28;
  const allowedAnchors = SPIRITUAL_MEANING_ANCHORS.map(item => item.id);
  const allowedConnections = SPIRITUAL_CONNECTIONS.map(item => item.id);
  answer.anchor = allowedAnchors.includes(answer.anchor) ? answer.anchor : '';
  answer.connection = allowedConnections.includes(answer.connection) ? answer.connection : '';
  answer.action = answer.action || '';
  answer.when = answer.when || '';
  answer.added = Boolean(answer.added);
  answer.committed = Boolean(answer.committed);
  return answer;
}

function getSpiritualAnchorName(id) {
  return getCollectionField(SPIRITUAL_MEANING_ANCHORS, id);
}

function getSpiritualConnectionName(id) {
  return getCollectionField(SPIRITUAL_CONNECTIONS, id);
}

function isSpiritualRulerReady(answer) {
  return Boolean(
    answer.anchor &&
    answer.connection &&
    answer.action.trim() &&
    answer.when.trim() &&
    answer.added &&
    answer.committed
  );
}

function normalizeMultiCauseMapAnswer() {
  if (!state.answers.day29) {
    state.answers.day29 = {
      concern: '',
      causes: [],
      focusCause: '',
      why: '',
      nextStep: '',
      planned: false,
      committed: false
    };
  }
  const answer = state.answers.day29;
  const allowedCauseIds = MULTI_CAUSE_FACTORS.map(item => item.id);
  const allowedStepIds = MULTI_CAUSE_NEXT_STEPS.map(item => item.id);
  if (!Array.isArray(answer.causes)) answer.causes = [];
  answer.concern = answer.concern || '';
  answer.causes = answer.causes
    .filter((id, index, ids) => allowedCauseIds.includes(id) && ids.indexOf(id) === index);
  answer.focusCause = allowedCauseIds.includes(answer.focusCause) && answer.causes.includes(answer.focusCause)
    ? answer.focusCause
    : (answer.causes[0] || '');
  answer.why = answer.why || '';
  answer.nextStep = allowedStepIds.includes(answer.nextStep) ? answer.nextStep : '';
  answer.planned = Boolean(answer.planned);
  answer.committed = Boolean(answer.committed);
  return answer;
}

function getMultiCauseName(id) {
  return getCollectionField(MULTI_CAUSE_FACTORS, id);
}

function getMultiCauseStepName(id) {
  return getCollectionField(MULTI_CAUSE_NEXT_STEPS, id);
}

function getBrainMessageAngleName(id) {
  return getCollectionField(BRAIN_HEALTH_MESSAGE_ANGLES, id);
}

function getBrainMessageChannelName(id) {
  return getCollectionField(BRAIN_HEALTH_MESSAGE_CHANNELS, id);
}

function getAlternativeReasonCauseName(id) {
  return getCollectionField(ALTERNATIVE_REASON_CAUSES, id);
}

function getAlternativeReasonStepName(id) {
  return getCollectionField(ALTERNATIVE_REASON_STEPS, id);
}

function getLabelPauseCauseName(id) {
  return getCollectionField(LABEL_PAUSE_CAUSES, id);
}

function getLabelPauseStepName(id) {
  return getCollectionField(LABEL_PAUSE_STEPS, id);
}

function getRevolutionStageName(id) {
  return getCollectionField(REVOLUTION_STAGES, id);
}

function getRevolutionMotivatorName(id) {
  return getCollectionField(REVOLUTION_MOTIVATORS, id);
}

function isMultiCauseMapReady(answer) {
  return Boolean(
    answer.concern.trim() &&
    answer.causes.length >= 3 &&
    answer.focusCause &&
    answer.why.trim() &&
    answer.nextStep &&
    answer.planned &&
    answer.committed
  );
}

function normalizeBrainHealthMessageAnswer() {
  if (!state.answers.day30) {
    state.answers.day30 = {
      person: '',
      reason: '',
      angle: '',
      message: 'С лучшим мозгом всегда приходит лучшая жизнь. Давайте вместе улучшим наш мозг.',
      channel: '',
      sent: false,
      committed: false
    };
  }
  const answer = state.answers.day30;
  const allowedAngles = BRAIN_HEALTH_MESSAGE_ANGLES.map(item => item.id);
  const allowedChannels = BRAIN_HEALTH_MESSAGE_CHANNELS.map(item => item.id);
  answer.person = answer.person || '';
  answer.reason = answer.reason || '';
  answer.angle = allowedAngles.includes(answer.angle) ? answer.angle : '';
  answer.message = answer.message || '';
  answer.channel = allowedChannels.includes(answer.channel) ? answer.channel : '';
  answer.sent = Boolean(answer.sent);
  answer.committed = Boolean(answer.committed);
  return answer;
}

function isBrainHealthMessageReady(answer) {
  return Boolean(
    answer.person.trim() &&
    answer.reason.trim() &&
    answer.angle &&
    answer.message.trim() &&
    answer.channel &&
    answer.sent &&
    answer.committed
  );
}

function normalizeAlternativeReasonAnswer() {
  if (!state.answers.day31) {
    state.answers.day31 = {
      person: '',
      behavior: '',
      causes: [],
      focusCause: '',
      reframe: '',
      nextStep: '',
      bounded: false,
      committed: false
    };
  }
  const answer = state.answers.day31;
  const allowedCauseIds = ALTERNATIVE_REASON_CAUSES.map(item => item.id);
  const allowedStepIds = ALTERNATIVE_REASON_STEPS.map(item => item.id);
  if (!Array.isArray(answer.causes)) answer.causes = [];
  answer.person = answer.person || '';
  answer.behavior = answer.behavior || '';
  answer.causes = answer.causes
    .filter((id, index, ids) => allowedCauseIds.includes(id) && ids.indexOf(id) === index);
  answer.focusCause = allowedCauseIds.includes(answer.focusCause) && answer.causes.includes(answer.focusCause)
    ? answer.focusCause
    : (answer.causes[0] || '');
  answer.reframe = answer.reframe || '';
  answer.nextStep = allowedStepIds.includes(answer.nextStep) ? answer.nextStep : '';
  answer.bounded = Boolean(answer.bounded);
  answer.committed = Boolean(answer.committed);
  return answer;
}

function isAlternativeReasonReady(answer) {
  return Boolean(
    answer.person.trim() &&
    answer.behavior.trim() &&
    answer.causes.length >= 2 &&
    answer.focusCause &&
    answer.reframe.trim() &&
    answer.nextStep &&
    answer.bounded &&
    answer.committed
  );
}

function normalizeLabelPauseAnswer() {
  if (!state.answers.day32) {
    state.answers.day32 = {
      behavior: '',
      label: '',
      causes: [],
      focusCause: '',
      question: '',
      nextStep: '',
      bounded: false,
      committed: false
    };
  }
  const answer = state.answers.day32;
  const allowedCauseIds = LABEL_PAUSE_CAUSES.map(item => item.id);
  const allowedStepIds = LABEL_PAUSE_STEPS.map(item => item.id);
  if (!Array.isArray(answer.causes)) answer.causes = [];
  answer.behavior = answer.behavior || '';
  answer.label = answer.label || '';
  answer.causes = answer.causes
    .filter((id, index, ids) => allowedCauseIds.includes(id) && ids.indexOf(id) === index);
  answer.focusCause = allowedCauseIds.includes(answer.focusCause) && answer.causes.includes(answer.focusCause)
    ? answer.focusCause
    : (answer.causes[0] || '');
  answer.question = answer.question || '';
  answer.nextStep = allowedStepIds.includes(answer.nextStep) ? answer.nextStep : '';
  answer.bounded = Boolean(answer.bounded);
  answer.committed = Boolean(answer.committed);
  return answer;
}

function isLabelPauseReady(answer) {
  return Boolean(
    answer.behavior.trim() &&
    answer.label.trim() &&
    answer.causes.length >= 2 &&
    answer.focusCause &&
    answer.question.trim() &&
    answer.nextStep &&
    answer.bounded &&
    answer.committed
  );
}

function normalizeRevolutionStageAnswer() {
  if (!state.answers.day33) {
    state.answers.day33 = {
      idea: '',
      rejection: '',
      stage: '',
      motivator: '',
      reason: '',
      nextStep: '',
      balanced: false,
      committed: false
    };
  }
  const answer = state.answers.day33;
  const allowedStages = REVOLUTION_STAGES.map(item => item.id);
  const allowedMotivators = REVOLUTION_MOTIVATORS.map(item => item.id);
  answer.idea = answer.idea || '';
  answer.rejection = answer.rejection || '';
  answer.stage = allowedStages.includes(answer.stage) ? answer.stage : '';
  answer.motivator = allowedMotivators.includes(answer.motivator) ? answer.motivator : '';
  answer.reason = answer.reason || '';
  answer.nextStep = answer.nextStep || '';
  answer.balanced = Boolean(answer.balanced);
  answer.committed = Boolean(answer.committed);
  return answer;
}

function isRevolutionStageReady(answer) {
  return Boolean(
    answer.idea.trim() &&
    answer.rejection.trim() &&
    answer.stage &&
    answer.motivator &&
    answer.reason.trim() &&
    answer.nextStep.trim() &&
    answer.balanced &&
    answer.committed
  );
}

function normalizeWeeklyExperimentAnswer() {
  if (!state.answers.day34 || typeof state.answers.day34 !== 'object' || Array.isArray(state.answers.day34)) {
    state.answers.day34 = {};
  }
  const answer = state.answers.day34;
  ['harmfulAction', 'helpfulAction', 'feeling'].forEach(field => {
    if (typeof answer[field] !== 'string') answer[field] = '';
  });
  answer.pauseWeek = answer.pauseWeek === true;
  answer.helpfulDone = answer.helpfulDone === true;
  answer.committed = answer.committed === true && isWeeklyExperimentFilled(answer);
  return answer;
}

function isWeeklyExperimentFilled(answer) {
  return Boolean(answer.harmfulAction.trim() && answer.helpfulAction.trim() && answer.pauseWeek && answer.helpfulDone);
}

function normalizeThoughtPauseAnswer() {
  if (!state.answers.day35 || typeof state.answers.day35 !== 'object' || Array.isArray(state.answers.day35)) {
    state.answers.day35 = {};
  }
  const answer = state.answers.day35;
  ['noticedCount', 'heldBackCount', 'support'].forEach(field => {
    if (typeof answer[field] !== 'string') answer[field] = '';
  });
  answer.observed = answer.observed === true;
  return answer;
}

function isThoughtPauseReady(answer) {
  const noticed = Number(answer.noticedCount);
  const heldBack = Number(answer.heldBackCount);
  return Boolean(answer.observed && answer.noticedCount.trim() && answer.heldBackCount.trim() &&
    Number.isSafeInteger(noticed) && Number.isSafeInteger(heldBack) &&
    noticed >= 0 && heldBack >= 0 && heldBack <= noticed);
}

function normalizeBrainScansTalkAnswer() {
  if (!state.answers.day36 || typeof state.answers.day36 !== 'object' || Array.isArray(state.answers.day36)) {
    state.answers.day36 = {};
  }
  const answer = state.answers.day36;
  if (typeof answer.takeaway !== 'string') answer.takeaway = '';
  answer.watched = answer.watched === true;
  return answer;
}

function normalizeHopeReflectionAnswer() {
  if (!state.answers.day37 || typeof state.answers.day37 !== 'object' || Array.isArray(state.answers.day37)) {
    state.answers.day37 = {};
  }
  const answer = state.answers.day37;
  ['situation', 'connection', 'support'].forEach(field => {
    if (typeof answer[field] !== 'string') answer[field] = '';
  });
  return answer;
}

function normalizeMemoryRescueAnswer() {
  const previous = state.answers.day7;
  if (!state.answers.day38 && previous && Array.isArray(previous.part1) && Array.isArray(previous.part2)) {
    state.answers.day38 = { part1: previous.part1.slice(), part2: previous.part2.slice() };
  }
  const answer = normalizeBrightMindsAnswer(38);
  answer.reviewed = answer.reviewed === true;
  return answer;
}

function normalizeBriskWalkAnswer() {
  if (!state.answers.day39 || typeof state.answers.day39 !== 'object' || Array.isArray(state.answers.day39)) {
    state.answers.day39 = {};
  }
  const answer = state.answers.day39;
  ['minutes', 'note'].forEach(field => {
    if (typeof answer[field] !== 'string') answer[field] = '';
  });
  answer.walked = answer.walked === true;
  return answer;
}

function isBriskWalkReady(answer) {
  const minutes = Number(answer.minutes);
  return answer.walked && (!answer.minutes.trim() || (Number.isFinite(minutes) && minutes > 0));
}

function normalizeBrainSportAnswer() {
  if (!state.answers.day40 || typeof state.answers.day40 !== 'object' || Array.isArray(state.answers.day40)) {
    state.answers.day40 = {};
  }
  const answer = state.answers.day40;
  if (!BRAIN_SPORTS.includes(answer.sport)) answer.sport = '';
  ['place', 'details'].forEach(field => {
    if (typeof answer[field] !== 'string') answer[field] = '';
  });
  answer.found = answer.found === true;
  return answer;
}

/* --- День 1: Конверты --- */
function renderReasons() {
  const answer = normalizeReasonsAnswer();
  if (answer.sealed) {
    let html = '<div style="margin-top:12px">';
    for (let i = 0; i < 3; i++) {
      html += `<div class="envelope-wrap"><div class="envelope flipped sealed-envelope"><div class="env-front"></div><div class="env-back"><i class="fa-solid fa-lock"></i><span>Причина ${i+1} запечатана</span></div></div></div>`;
    }
    html += '<div class="sealed-reasons">';
    answer.reasons.forEach((reason, i) => {
      if (reason) html += `<div><strong>Причина ${i+1}</strong><span>${escapeHtml(reason)}</span></div>`;
    });
    html += '</div>';
    html += '</div>';
    return html;
  }
  let html = '<div style="margin-top:12px">';
  for (let i = 0; i < 3; i++) {
    html += `<div class="envelope-wrap reason-reveal" style="animation-delay:${i * 0.12}s"><div class="envelope" id="env${i}">
      <div class="env-front"><label class="field-label">Причина ${i+1}</label><input class="input-field reason-input" data-idx="${i}" placeholder="Напишите причину..." value="${escapeHtml(answer.reasons[i] || '')}"></div>
      <div class="env-back"><i class="fa-solid fa-lock"></i><span>Запечатано</span></div>
    </div></div>`;
  }
  const canSeal = answer.reasons.every(reason => reason.trim());
  html += `<div style="margin-top:12px"><button class="btn btn-secondary" id="btnSeal" ${canSeal ? '' : 'disabled'}><i class="fa-solid fa-lock"></i> Зафиксировать намерение</button></div>`;
  html += '</div>';
  return html;
}

/* --- День 2: Друзья --- */
function renderFriends() {
  const answer = normalizeFriendsAnswer();
  const total = answer.friends.filter(friend => friend.name.trim()).length;
  const progress = Math.round((total / 10) * 100);
  const circumference = 113;
  const offset = circumference - (circumference * total / 10);
  let html = '<div style="margin-top:12px">';
  html += `<div class="friends-progress">
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="18"></circle>
      <circle class="progress" cx="22" cy="22" r="18" style="stroke-dashoffset:${offset}"></circle>
    </svg>
    <div><strong>${total} из 10 друзей</strong><span>${progress}% списка заполнено</span></div>
  </div>`;
  for (let i = 0; i < 10; i++) {
    const friend = answer.friends[i];
    const hasName = Boolean(friend.name.trim());
    const isHelped = hasName && friend.helped;
    html += `<div class="friend-slot">
      <div class="num">${i+1}</div>
      <input class="input-field friend-name" data-idx="${i}" aria-label="Имя друга ${i+1}" placeholder="Имя друга..." value="${escapeHtml(friend.name)}">
      <div class="toggle-wrap">
        <span class="toggle-label">Нуждался в помощи</span>
        <button class="toggle friend-toggle ${isHelped ? 'on' : ''}" data-idx="${i}" aria-label="Друг ${i+1} нуждался в помощи" ${hasName ? '' : 'disabled'}></button>
      </div>
    </div>
    <select class="input-field friend-type ${isHelped ? 'show' : ''}" data-idx="${i}" aria-label="Тип трудности друга ${i+1}">
      <option value="">Тип проблемы...</option>
      <option value="Тревога" ${friend.type==='Тревога'?'selected':''}>Тревога</option>
      <option value="Депрессия" ${friend.type==='Депрессия'?'selected':''}>Депрессия</option>
      <option value="Проблемы со вниманием" ${friend.type==='Проблемы со вниманием'?'selected':''}>Проблемы со вниманием</option>
      <option value="Проблемы с памятью" ${friend.type==='Проблемы с памятью'?'selected':''}>Проблемы с памятью</option>
      <option value="Другое" ${friend.type==='Другое'?'selected':''}>Другое</option>
    </select>`;
  }
  html += `<div class="insight-box" id="friendInsight"></div>`;
  html += '</div>';
  return html;
}

/* --- День 3: Суждения --- */
function renderJudgment() {
  const answer = normalizeJudgmentAnswer();
  const canFlip = answer.people.every(person => person.name.trim() && person.judgment.trim() && (!person.hasBrainIssue || person.how.trim()));
  let html = '<div style="margin-top:12px">';
  for (let i = 0; i < answer.people.length; i++) {
    const p = answer.people[i];
    if (answer.flipped) {
      html += `<div class="judgment-card"><div class="judgment-inner flipped">
        <div class="judgment-front"></div>
        <div class="judgment-back"><div class="new-view"><strong>${escapeHtml(p.name || 'Этот человек')}</strong> — не плохой человек. Возможно, его мозг нуждается в помощи.</div></div>
      </div></div>`;
    } else {
      html += `<div class="judgment-card" data-jidx="${i}"><div class="judgment-inner" id="jcard${i}">
        <div class="judgment-front">
          <input class="input-field j-name" data-idx="${i}" placeholder="Кто это?" value="${escapeHtml(p.name)}" style="margin-bottom:8px">
          <input class="input-field j-judgment" data-idx="${i}" placeholder="В чём вы его осуждаете?" value="${escapeHtml(p.judgment)}" style="margin-bottom:8px">
          <div class="judgment-toggle-row">
            <span class="judgment-toggle-label">Может ли это быть связано с работой мозга?</span>
            <button class="toggle ${p.hasBrainIssue?'on':''}" data-idx="${i}" aria-label="Проблема с мозгом"></button>
          </div>
          <div class="j-how-wrap ${p.hasBrainIssue ? 'show' : ''}">
            <input class="input-field j-how" data-idx="${i}" placeholder="Как именно?" value="${escapeHtml(p.how)}">
          </div>
          ${answer.people.length > 3 ? `<button class="btn-back" style="margin-top:6px;margin-bottom:0;font-size:0.78rem" data-remove="${i}"><i class="fa-solid fa-xmark"></i> Убрать</button>` : ''}
        </div>
        <div class="judgment-back"><div class="new-view"><strong>${escapeHtml(p.name || 'Этот человек')}</strong> — не плохой человек. Возможно, его мозг нуждается в помощи.</div></div>
      </div></div>`;
    }
  }
  if (!answer.flipped) {
    html += `<div style="margin-top:12px"><button class="btn btn-secondary" id="btnFlipJudgment" ${canFlip ? '' : 'disabled'}><i class="fa-solid fa-arrows-rotate"></i> Посмотреть с новой стороны</button></div>`;
  }
  html += '</div>';
  return html;
}

/* --- День 4: Достижения --- */
function renderAchievements() {
  const answer = normalizeAchievementsAnswer();
  const allAlive = answer.achievements.every(a => a.achievement && a.who);
  let html = '<div style="margin-top:12px">';
  for (let i = 0; i < 3; i++) {
    const a = answer.achievements[i];
    const alive = a.achievement && a.who;
    html += `<div class="achievement-card ${alive ? 'alive' : ''}" id="ach${i}">
      <div class="achievement-brain"><i class="fa-solid fa-brain"></i></div>
      <input class="input-field ach-what" data-idx="${i}" placeholder="Достижение, изменившее мир..." value="${escapeHtml(a.achievement)}">
      <input class="input-field ach-who" data-idx="${i}" placeholder="Чей мозг это создал?" value="${escapeHtml(a.who)}">
      <div class="achievement-creator ${alive ? 'show' : ''}">Мозг <strong>${escapeHtml(a.who)}</strong> создал это</div>
    </div>`;
  }
  html += `<div class="achievement-insight ${allAlive ? 'show' : ''}" id="achievementInsight">
    <button class="btn btn-primary achievement-cta" id="btnAchievementInsight" type="button"><i class="fa-solid fa-brain"></i> Все эти достижения совершил мозг. Ваш мозг — такого же масштаба</button>
    <p>Человеческий мозг содержит около 100 миллиардов нейронов и около 100 триллионов связей.</p>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 5: Письмо --- */
function renderLetter() {
  const answer = state.answers.day5 || { letter: '', sent: false };
  if (answer.sent) {
    return `<div style="margin-top:12px"><div class="letter-sent"><div class="heart"><i class="fa-solid fa-heart"></i></div><p>Письмо доставлено вашему мозгу</p></div>
    <div class="letter-card" style="margin-top:16px"><div class="letter-brain"><i class="fa-solid fa-brain"></i></div><p style="font-family:'Caveat',cursive;font-size:1.1rem;line-height:1.8;color:rgba(236,236,236,0.8)">${escapeHtml(answer.letter)}</p></div></div>`;
  }
  return `<div style="margin-top:12px"><div class="letter-card" id="letterCard">
    <div class="letter-brain"><i class="fa-solid fa-brain"></i></div>
    <textarea placeholder="Дорогой мой мозг..." id="letterText">${escapeHtml(answer.letter)}</textarea>
  </div>
  <div style="margin-top:12px;text-align:center"><button class="btn btn-primary" id="btnSendLetter"><i class="fa-solid fa-paper-plane"></i> Отправить своему мозгу ♡</button></div></div>`;
}

/* --- День 6: Слайдеры --- */
function renderLoveScale() {
  const answer = state.answers.day6 || { loveOthers: 5, loveBrain: 5, reflection: '' };
  const diff = answer.loveOthers - answer.loveBrain;
  const isBad = diff >= 3;
  let html = `<div style="margin-top:12px">
    <div class="slider-group"><label>Насколько сильно вы любите важных людей в жизни?</label>
      <div class="slider-row"><input type="range" min="0" max="10" value="${answer.loveOthers}" id="sliderOthers"><div class="slider-val" id="valOthers">${answer.loveOthers}</div></div>
    </div>
    <div class="diff-result ${isBad ? 'bad' : 'good'} show" id="diffResult">
      ${isBad ? 'Ваш мозг получает меньше любви, чем он заслуживает' : 'Вы относитесь к своему мозгу с заботой'}
    </div>
    <div class="slider-group"><label>Насколько сильно вы любите свой мозг?</label>
      <div class="slider-row"><input type="range" min="0" max="10" value="${answer.loveBrain}" id="sliderBrain"><div class="slider-val" id="valBrain">${answer.loveBrain}</div></div>
    </div>
    <textarea class="input-field" id="loveReflection" placeholder="${isBad ? 'Почему возникает эта разница?' : 'Что помогает вам так заботиться о мозге?'}">${escapeHtml(answer.reflection)}</textarea>
  </div>`;
  return html;
}

/* --- День 7: Тест ранних признаков и факторов риска --- */
function renderBrightMinds(dayId = 7) {
  const answer = normalizeBrightMindsAnswer(dayId);
  let html = '<div class="bright-quiz" style="margin-top:12px">';
  html += `<details class="quiz-part" open>
    <summary>Часть 1. Ранние тревожные признаки</summary>
    <div class="quiz-list">`;
  const brightFactors = BRIGHT_MINDS_FACTORS.slice(0, 6);
  EARLY_WARNING_QUESTIONS.forEach((question, index) => {
    html += renderBrightQuizQuestion('part1', index, index + 1, question.text, EARLY_WARNING_OPTIONS, answer.part1[index], question.factorIndex, brightFactors);
  });
  html += '</div></details>';
  html += `<details class="quiz-part" open>
    <summary>Часть 2. Факторы риска BRIGHT MINDS</summary>
    <div class="quiz-list">`;
  RISK_FACTOR_QUESTIONS.forEach((question, index) => {
    html += renderBrightQuizQuestion('part2', index, index + 16, question.text, RISK_FACTOR_OPTIONS, answer.part2[index], question.factorIndex, BRIGHT_MINDS_FACTORS);
  });
  html += '</div></details>';
  html += renderBrightMindsSummary(answer);
  html += '</div>';
  return html;
}

function renderBrightQuizQuestion(part, index, number, text, options, selected, factorIndex, factors) {
  const factorBadge = Number.isInteger(factorIndex) ? renderBrightMindsLetters(factorIndex, factors) : '';
  let html = `<fieldset class="quiz-question">
    <legend>${factorBadge}<span>${number}. ${escapeHtml(text)}</span></legend>
    <div class="quiz-options">`;
  options.forEach(option => {
    const inputId = `bright-${part}-${index}-${option.id}`;
    html += `<label class="quiz-option" for="${inputId}">
      <input type="radio" id="${inputId}" name="bright-${part}-${index}" value="${option.id}" data-bright-part="${part}" data-bright-index="${index}" ${selected === option.id ? 'checked' : ''}>
      <span>${option.label}</span>
    </label>`;
  });
  html += '</div></fieldset>';
  return html;
}

function renderBrightMindsLetters(activeIndex, factors) {
  const label = factors.map(factor => factor.letter).join('');
  return `<span class="quiz-factor" aria-label="${label}">${factors.map((factor, index) => (
    `<span class="${index === activeIndex ? 'active' : ''}" title="${escapeHtml(factor.name)}">${factor.letter}</span>`
  )).join('')}</span>`;
}

function renderBrightMindsSummary(answer) {
  const answeredPart1 = answer.part1.filter(Boolean).length;
  const answeredPart2 = answer.part2.filter(Boolean).length;
  const isComplete = answeredPart1 === EARLY_WARNING_QUESTIONS.length && answeredPart2 === RISK_FACTOR_QUESTIONS.length;
  if (!isComplete) {
    return `<div class="risk-summary quiz-progress" id="brightQuizSummary">
      Заполнено ${answeredPart1 + answeredPart2} из ${EARLY_WARNING_QUESTIONS.length + RISK_FACTOR_QUESTIONS.length}. Ответьте на все вопросы, чтобы увидеть результаты.
    </div>`;
  }
  const result = getDay7QuizResults(answer);
  return `<div class="quiz-results" id="brightQuizSummary">
    ${renderBrightQuizResult('Уровень ранних тревожных признаков', result.early, getEarlyWarningResultText(result.early))}
    ${renderBrightQuizResult('Оценка факторов риска', result.risk, getRiskFactorResultText(result.risk))}
  </div>`;
}

function renderBrightQuizResult(title, level, text) {
  const levelClass = level.toLowerCase();
  return `<div class="quiz-result ${levelClass}">
    <div class="quiz-result-head"><span>${title}</span><strong>${level}</strong></div>
    <p>${text}</p>
  </div>`;
}

function getEarlyWarningResultText(level) {
  if (level === 'LOW') {
    return 'Согласно вашим ответам в тесте, ваш уровень ранних тревожных признаков низкий. Поздравляем! У вас все хорошо. Продолжайте поддерживать привычки, полезные для здоровья мозга. Примечание: этот тест не заменяет медицинское обследование, поэтому мы все равно рекомендуем обратиться к врачу, чтобы проверить важные показатели здоровья. Чтобы сохранять здоровье, продолжайте следовать рекомендациям образа жизни BRIGHT MINDS.';
  }
  return 'Ваши ответы показывают, что стоит внимательнее отнестись к памяти, ясности мышления и повседневным признакам. Этот тест не заменяет медицинскую оценку: обсудите результат со специалистом и проверьте важные показатели здоровья.';
}

function getRiskFactorResultText(level) {
  if (level === 'LOW') {
    return 'Согласно вашим ответам в тесте, ваша оценка факторов риска низкая. Вы отлично справляетесь. Чтобы факторы риска оставались низкими, рекомендуем поддерживать регулярные здоровые привычки и помнить обо всех факторах риска BRIGHT MINDS, которые влияют на мозг и память.';
  }
  return 'Ваши ответы отмечают факторы риска, которые могут влиять на мозг и память. Используйте список BRIGHT MINDS как карту для обсуждения с врачом и выбора следующих здоровых привычек.';
}

/* --- День 8: Теги --- */
function renderHabits() {
  const answer = normalizeHabitsAnswer();
  let html = '<div style="margin-top:12px">';
  html += '<div class="habits-board"><div class="habits-panel tags-section"><h4>Вредные привычки</h4><div class="tags-wrap">';
  HARMFUL_HABITS.forEach(h => {
    html += `<button type="button" class="tag danger ${answer.habits.includes(h) ? 'selected' : ''}" data-habit="${escapeHtml(h)}">${h}</button>`;
  });
  html += '</div></div>';
  html += '<div class="habits-panel consequences-panel"><h4>Последствия</h4><div class="habit-links" id="habitLinks">';
  html += renderHabitLinks(answer);
  html += '</div></div></div>';
  html += renderHabitsTable(answer);
  html += `<textarea class="input-field" id="worstAspect" placeholder="Какой аспект страдает больше всего?" style="margin-top:12px">${escapeHtml(answer.worst)}</textarea>`;
  html += '</div>';
  return html;
}

function renderHabitLinks(answer) {
  let html = '';
  if (!answer.habits.length) {
    html += '<div class="empty-hint">Выберите привычку слева, а затем отметьте, что именно она затрагивает.</div>';
  } else {
    html += '<div class="habit-focus-list">';
    answer.habits.forEach(habit => {
      html += `<button type="button" class="habit-focus-chip ${answer.activeHabit === habit ? 'selected' : ''}" data-active-habit="${escapeHtml(habit)}">${escapeHtml(habit)}</button>`;
    });
    html += '</div>';
    html += `<div class="habit-active-title">Последствия для: <strong>${escapeHtml(answer.activeHabit)}</strong></div>`;
    html += '<div class="tags-wrap consequence-tags">';
    LIFE_CONSEQUENCES.forEach(c => {
      const selected = answer.links[answer.activeHabit] && answer.links[answer.activeHabit].includes(c);
      html += `<button type="button" class="tag ${selected ? 'selected' : ''}" data-link-habit="${escapeHtml(answer.activeHabit)}" data-consequence="${escapeHtml(c)}">${c}</button>`;
    });
    html += '</div>';
  }
  return html;
}

function renderHabitsTable(answer) {
  const rows = answer.habits
    .filter(habit => answer.links[habit] && answer.links[habit].length)
    .map(habit => `<tr><td>${escapeHtml(habit)}</td><td>${answer.links[habit].map(escapeHtml).join(', ')}</td></tr>`)
    .join('');
  return `<div class="habit-table-wrap ${rows ? 'show' : ''}" id="habitTableWrap">
    <h4>Таблица связей</h4>
    <table class="habit-table"><thead><tr><th>Привычка</th><th>Последствия</th></tr></thead><tbody>${rows}</tbody></table>
  </div>`;
}

/* --- День 9: Стратегии --- */
function renderPromiseBadge(answer) {
  if (!answer.promised || answer.strategy === null) return '';
  const strategy = BRAIN_STRATEGIES[answer.strategy];
  const frequency = answer.frequency === 'Другое' ? answer.frequencyOther : answer.frequency;
  const schedule = [answer.date, answer.time, frequency].filter(Boolean).map(escapeHtml).join(', ');
  return `<div class="promise-badge"><i class="fa-solid fa-certificate"></i><div><strong>Обещание мозгу активно</strong><span>${strategy.name}: ${strategy.desc}</span>${schedule ? `<span>${schedule}</span>` : ''}</div></div>`;
}

function renderStrategy() {
  const answer = normalizeStrategyAnswer();
  let html = '<div style="margin-top:12px">';
  html += '<div class="strategy-carousel" aria-label="Стратегии BRIGHT MINDS">';
  BRAIN_STRATEGIES.forEach((s, i) => {
    html += `<button type="button" class="strategy-card ${answer.strategy === i ? 'selected' : ''}" data-sidx="${i}">
      <div class="strategy-icon"><i class="fa-solid ${s.icon}"></i></div>
      <div class="strategy-info"><h4>${s.name}</h4><p>${s.desc}</p></div>
    </button>`;
  });
  html += '</div>';
  html += `<div class="planner ${answer.strategy !== null ? 'show' : ''}" id="planner">
    <label>Когда я начну?</label><input type="date" id="planDate" value="${answer.date}">
    <label>В какое время?</label><input type="time" id="planTime" value="${answer.time}">
    <label>Как часто?</label><select id="planFreq">
      <option value="">Выберите...</option>
      <option value="Каждый день" ${answer.frequency==='Каждый день'?'selected':''}>Каждый день</option>
      <option value="4 раза в неделю" ${answer.frequency==='4 раза в неделю'?'selected':''}>4 раза в неделю</option>
      <option value="Другое" ${answer.frequency==='Другое'?'selected':''}>Другое</option>
    </select>
    <input type="text" id="planFreqOther" class="${answer.frequency==='Другое' ? 'show' : ''}" placeholder="Укажите частоту..." value="${escapeHtml(answer.frequencyOther)}">
    <button class="btn btn-primary promise-button" id="btnPromise"><i class="fa-solid fa-hand-holding-heart"></i> Дать обещание своему мозгу</button>
  </div>`;
  html += renderPromiseBadge(answer);
  html += '</div>';
  return html;
}

/* --- День 10: Весы --- */
function renderScales() {
  const answer = normalizeScalesAnswer();
  const sCount = answer.steals.filter(item => item.trim()).length;
  const stCount = answer.strengthens.filter(item => item.trim()).length;
  const balance = sCount - stCount;
  const angle = Math.max(-30, Math.min(30, (stCount - sCount) * 10));
  const leftPanOffset = Math.max(-12, Math.min(12, balance * 4));
  const rightPanOffset = Math.max(-12, Math.min(12, -balance * 4));
  let html = `<div style="margin-top:12px">
    <svg class="scales-svg" viewBox="0 0 200 140">
      <line x1="100" y1="18" x2="100" y2="120" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
      <line x1="72" y1="120" x2="128" y2="120" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
      <g id="scalesBeam" style="transform-origin:100px 42px;transform:rotate(${angle}deg);transition:transform 0.6s ease">
        <line x1="28" y1="42" x2="172" y2="42" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round"/>
        <g id="scalesLeftPan" class="scale-pan" style="transform:translateY(${leftPanOffset}px)">
          <line x1="28" y1="42" x2="28" y2="72" stroke="var(--accent)" stroke-width="1.5"/>
          <ellipse cx="28" cy="80" rx="22" ry="7" fill="none" stroke="var(--danger)" stroke-width="1.5" opacity="0.7"/>
        </g>
        <g id="scalesRightPan" class="scale-pan" style="transform:translateY(${rightPanOffset}px)">
          <line x1="172" y1="42" x2="172" y2="72" stroke="var(--accent)" stroke-width="1.5"/>
          <ellipse cx="172" cy="80" rx="22" ry="7" fill="none" stroke="var(--success)" stroke-width="1.5" opacity="0.7"/>
        </g>
      </g>
      <circle cx="100" cy="42" r="4" fill="var(--accent)"/>
      <text x="28" y="100" text-anchor="middle" fill="var(--danger)" font-size="7" font-weight="700" opacity="0.7">КРАДУТ</text>
      <text x="172" y="100" text-anchor="middle" fill="var(--success)" font-size="7" font-weight="700" opacity="0.7">УКРЕПЛЯЮТ</text>
    </svg>
    <div class="scales-columns">
      <div class="scales-col steals">
        <h4><i class="fa-solid fa-minus-circle"></i> Крадут резерв</h4>
        ${[0,1,2].map(i => `<input class="input-field scale-steal" data-idx="${i}" placeholder="Фактор ${i+1}..." value="${escapeHtml(answer.steals[i])}">`).join('')}
      </div>
      <div class="scales-col strengthens">
        <h4><i class="fa-solid fa-plus-circle"></i> Укрепляют резерв</h4>
        ${[0,1,2].map(i => `<input class="input-field scale-strengthen" data-idx="${i}" placeholder="Фактор ${i+1}..." value="${escapeHtml(answer.strengthens[i])}">`).join('')}
      </div>
      <div class="scales-result ${sCount + stCount === 6 ? 'show' : ''}" id="scalesResult" style="${sCount > stCount ? 'background:rgba(229,84,84,0.08);border:1px solid rgba(229,84,84,0.15);color:var(--danger)' : sCount < stCount ? 'background:rgba(74,232,138,0.08);border:1px solid rgba(74,232,138,0.15);color:var(--success)' : 'background:rgba(212,148,58,0.08);border:1px solid rgba(212,148,58,0.15);color:var(--accent)'}">
        ${sCount > stCount ? 'Ваши весы склоняются в сторону разрушения — пора действовать' : sCount < stCount ? 'Ваши весы склоняются в сторону укрепления — отличный баланс' : 'Ваши весы в равновесии'}
      </div>
    </div>
  </div>`;
  return html;
}

/* --- День 11: Потенциал --- */
function renderPotentialCards(answer) {
  if (!answer.areas.length) {
    return '<div class="empty-hint">Выберите сферы, где более здоровый мозг мог бы дать вам больше свободы и эффективности.</div>';
  }
  return answer.areas.map(areaId => {
    const area = POTENTIAL_AREAS.find(item => item.id === areaId);
    const value = answer.improvements[areaId] || '';
    const score = answer.importance[areaId] || 3;
    return `<div class="potential-card" data-potential-card="${area.id}">
      <div class="potential-card-header">
        <span><i class="fa-solid ${area.icon}"></i></span>
        <strong>${area.name}</strong>
      </div>
      <textarea class="input-field potential-note" data-potential-note="${area.id}" placeholder="Что станет легче, лучше или эффективнее?">${escapeHtml(value)}</textarea>
      <div class="potential-importance">
        <label>Насколько это важно?</label>
        <div class="slider-row">
          <input type="range" min="1" max="5" value="${score}" data-potential-score="${area.id}">
          <div class="slider-val" data-potential-score-val="${area.id}">${score}</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function renderPotential() {
  const answer = normalizePotentialAnswer();
  const filledCount = getFilledPotentialCount(answer);
  let html = '<div class="potential-task" style="margin-top:12px">';
  html += `<div class="potential-chain" aria-label="Прогресс освобождения потенциала">
    ${[0,1,2,3,4].map(index => `<span class="chain-link ${index < filledCount ? 'open' : ''}"><i class="fa-solid ${index < filledCount ? 'fa-link-slash' : 'fa-link'}"></i></span>`).join('')}
  </div>`;
  html += `<div class="potential-progress"><strong id="potentialFilled">${filledCount}</strong> сфер описано. Минимум для итогового шага — 3.</div>`;
  html += '<div class="potential-picker"><div class="tags-wrap">';
  POTENTIAL_AREAS.forEach(area => {
    html += `<button type="button" class="potential-tag ${answer.areas.includes(area.id) ? 'selected' : ''}" data-potential-area="${area.id}">
      <i class="fa-solid ${area.icon}"></i><span>${area.name}</span>
    </button>`;
  });
  html += '</div></div>';
  html += '<div class="potential-cards">';
  html += renderPotentialCards(answer);
  html += '</div>';
  html += `<div class="potential-result ${filledCount >= 3 ? 'show' : ''}" id="potentialResult">
    <strong>Более здоровый мозг — это больше свободы.</strong>
    <span>Не только меньше проблем, но и больше способности действовать, выбирать и раскрывать потенциал.</span>
    <textarea class="input-field" id="potentialFirstStep" placeholder="Первый маленький шаг к этому потенциалу...">${escapeHtml(answer.firstStep)}</textarea>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 12: Поле влияний --- */
function renderBrainBattle() {
  const answer = normalizeBrainBattleAnswer();
  const threatPower = Math.min(1, answer.threats.length / 4).toFixed(2);
  const allyPower = Math.min(1, answer.allies.length / 4).toFixed(2);
  const canPlan = answer.threats.length > 0 && answer.allies.length > 0;
  let html = `<div class="brain-battle" style="--threat-power:${threatPower};--ally-power:${allyPower};margin-top:12px">`;
  html += `<div class="battle-map" aria-label="Карта влияний">
    <div class="battle-pulse threat-pulse"></div>
    <div class="battle-pulse ally-pulse"></div>
    <div class="battle-brain"><i class="fa-solid fa-brain"></i></div>
    <div class="battle-count threat-count"><strong>${answer.threats.length}</strong><span>атакуют</span></div>
    <div class="battle-count ally-count"><strong>${answer.allies.length}</strong><span>защищают</span></div>
  </div>`;
  html += '<div class="battle-columns">';
  html += '<div class="battle-panel threats"><h4><i class="fa-solid fa-triangle-exclamation"></i> Атакуют мозг</h4><div class="battle-chip-wrap">';
  BRAIN_BATTLE_THREATS.forEach(item => {
    html += `<button type="button" class="battle-chip threat ${answer.threats.includes(item.id) ? 'selected' : ''}" data-battle-threat="${item.id}">
      <i class="fa-solid ${item.icon}"></i><span>${item.name}</span>
    </button>`;
  });
  html += '</div></div>';
  html += '<div class="battle-panel allies"><h4><i class="fa-solid fa-shield-halved"></i> Защищают мозг</h4><div class="battle-chip-wrap">';
  BRAIN_BATTLE_ALLIES.forEach(item => {
    html += `<button type="button" class="battle-chip ally ${answer.allies.includes(item.id) ? 'selected' : ''}" data-battle-ally="${item.id}">
      <i class="fa-solid ${item.icon}"></i><span>${item.name}</span>
    </button>`;
  });
  html += '</div></div></div>';
  html += `<div class="battle-plan ${canPlan ? 'show' : ''}" id="brainBattlePlan">
    <strong>Мой ход воина мозга</strong>
    <label for="battleFocus">Главная атака на сегодня</label>
    <select class="input-field" id="battleFocus" ${canPlan ? '' : 'disabled'}>
      ${answer.threats.map(id => `<option value="${id}" ${answer.focusThreat === id ? 'selected' : ''}>${escapeHtml(getBrainBattleName(BRAIN_BATTLE_THREATS, id))}</option>`).join('')}
    </select>
    <textarea class="input-field" id="battleShieldAction" placeholder="Как я защищу мозг от этого влияния?">${escapeHtml(answer.shieldAction)}</textarea>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 13: Цепочка вдохновения --- */
function renderInspiration() {
  const answer = normalizeInspirationAnswer();
  const filledCount = getFilledInspirationCount(answer);
  let html = `<div class="inspiration-task" style="margin-top:12px">`;
  html += `<div class="inspiration-map" aria-label="Цепочка вдохновения">
    <div class="inspiration-center"><i class="fa-solid fa-seedling"></i><span>Моё настоящее<br>выздоровление</span></div>
    ${[0,1,2].map(index => `<div class="inspiration-ray ray-${index + 1} ${index < filledCount ? 'active' : ''}">
      <span>${index + 1}</span>
    </div>`).join('')}
  </div>`;
  html += `<div class="inspiration-progress"><strong id="inspirationFilled">${filledCount}</strong> человека описано. Минимум для завершения — 2.</div>`;
  html += '<div class="inspiration-signs"><div class="answer-label">Что во мне может стать заметным примером?</div><div class="tags-wrap">';
  RECOVERY_SIGNS.forEach(sign => {
    html += `<button type="button" class="inspiration-sign ${answer.signs.includes(sign.id) ? 'selected' : ''}" data-recovery-sign="${sign.id}">
      <i class="fa-solid ${sign.icon}"></i><span>${sign.name}</span>
    </button>`;
  });
  html += '</div></div>';
  html += '<div class="inspiration-people">';
  answer.people.forEach((person, index) => {
    const complete = person.name.trim() && person.visibleChange.trim() && person.firstSignal.trim();
    html += `<div class="inspiration-card ${complete ? 'complete' : ''}">
      <div class="inspiration-card-head">
        <span>${index + 1}</span>
        <strong>${index < 2 ? 'Человек, которого может вдохновить мой пример' : 'Ещё один человек, если он приходит на ум'}</strong>
      </div>
      <input class="input-field inspiration-name" data-inspiration-idx="${index}" placeholder="Кто это?" value="${escapeHtml(person.name)}">
      <textarea class="input-field inspiration-change" data-inspiration-change="${index}" placeholder="Что именно в моём восстановлении может его/её вдохновить?">${escapeHtml(person.visibleChange)}</textarea>
      <input class="input-field inspiration-signal" data-inspiration-signal="${index}" placeholder="Какой мягкий первый сигнал я могу подать?" value="${escapeHtml(person.firstSignal)}">
    </div>`;
  });
  html += '</div>';
  html += `<div class="inspiration-result ${filledCount >= 2 ? 'show' : ''}" id="inspirationResult">
    <strong>Выздоровление одного человека может стать разрешением для другого начать свой путь.</strong>
    <textarea class="input-field" id="inspirationFirstStep" placeholder="С чего я начну без давления и проповедей?">${escapeHtml(answer.firstStep)}</textarea>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 14: Лестница Нэнси --- */
function renderNancyStep() {
  const answer = normalizeNancyStepAnswer();
  const selectedIndex = NANCY_STEPS.findIndex(step => step.id === answer.step);
  const selectedStep = NANCY_STEPS[selectedIndex];
  let html = `<div class="nancy-task" style="margin-top:12px">`;
  html += '<div class="nancy-stairs" aria-label="Лестница маленьких шагов Нэнси">';
  NANCY_STEPS.forEach((step, index) => {
    const isSelected = answer.step === step.id;
    const isPassed = selectedIndex >= 0 && index < selectedIndex;
    html += `<div class="nancy-stair ${isSelected ? 'selected' : ''} ${isPassed ? 'passed' : ''}" style="--stair-height:${54 + index * 8}px">
      <span class="nancy-stair-icon"><i class="fa-solid ${step.icon}"></i></span>
      <span>${step.name}</span>
    </div>`;
  });
  html += '</div>';
  html += `<div class="nancy-progress">${selectedStep ? `Выбрана ступень: <strong>${escapeHtml(selectedStep.name)}</strong>` : 'Выберите одну ступень, с которой реально начать сегодня.'}</div>`;
  html += '<div class="nancy-step-grid">';
  NANCY_STEPS.forEach(step => {
    html += `<button type="button" class="nancy-step-card ${answer.step === step.id ? 'selected' : ''}" data-nancy-step="${step.id}">
      <span><i class="fa-solid ${step.icon}"></i></span>
      <strong>${step.name}</strong>
      <em>${step.desc}</em>
    </button>`;
  });
  html += '</div>';
  html += `<div class="nancy-plan ${answer.step ? 'show' : ''}" id="nancyPlan">
    <div class="answer-label">Какой темп даст мне больше шансов?</div>
    <div class="pace-toggle" role="group" aria-label="Темп движения">
      <button type="button" class="${answer.pace === 'fast' ? 'selected' : ''}" data-nancy-pace="fast"><i class="fa-solid fa-bolt"></i> Быстрый рывок</button>
      <button type="button" class="${answer.pace === 'gradual' ? 'selected' : ''}" data-nancy-pace="gradual"><i class="fa-solid fa-shoe-prints"></i> Постепенно</button>
    </div>
    <textarea class="input-field" id="nancyMicroStep" placeholder="Мой первый микрошаг сегодня...">${escapeHtml(answer.microStep)}</textarea>
    <input class="input-field" id="nancyWhen" placeholder="Когда именно сегодня?" value="${escapeHtml(answer.when)}">
    <button class="btn btn-secondary nancy-commit" id="btnNancyCommit" ${answer.step && answer.pace && answer.microStep.trim() && answer.when.trim() ? '' : 'disabled'}>
      <i class="fa-solid fa-shoe-prints"></i> Поставить первый шаг
    </button>
  </div>`;
  html += `<div class="nancy-result ${answer.committed ? 'show' : ''}" id="nancyResult">
    <strong>Первый шаг поставлен.</strong>
    <span>Большие изменения начинаются не с идеального плана, а с первого повторяемого шага.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 15: Овчарка для близких --- */
function renderShepherd() {
  const answer = normalizeShepherdAnswer();
  const filledCount = getFilledShepherdCount(answer);
  let html = `<div class="shepherd-task" style="margin-top:12px">`;
  html += `<div class="shepherd-role-map" aria-label="Моя роль сегодня">
    <div class="shepherd-role muted"><i class="fa-solid fa-triangle-exclamation"></i><span>Волк</span></div>
    <div class="shepherd-role muted"><i class="fa-solid fa-user-group"></i><span>Овца</span></div>
    <div class="shepherd-role active"><i class="fa-solid fa-shield-halved"></i><span>Овчарка</span></div>
  </div>`;
  html += `<div class="shepherd-progress">
    <div class="shepherd-shields" aria-label="Прогресс карты защиты">
      ${[0,1,2,3].map(index => `<span class="${index < filledCount ? 'active' : ''}"><i class="fa-solid fa-shield-halved"></i></span>`).join('')}
    </div>
    <p><strong id="shepherdFilled">${filledCount}</strong> человека описано. Минимум для завершения — 2.</p>
  </div>`;
  html += '<div class="shepherd-people">';
  answer.people.forEach((person, index) => {
    const complete = person.name.trim() && person.threats.length && person.support && person.action.trim();
    html += `<div class="shepherd-card ${complete ? 'complete' : ''}">
      <div class="shepherd-card-head">
        <span>${index + 1}</span>
        <strong>${index < 2 ? 'Человек, которому нужна моя защита' : 'Ещё один человек, если он приходит на ум'}</strong>
      </div>
      <input class="input-field shepherd-name" data-shepherd-idx="${index}" placeholder="Кому нужна моя защита?" value="${escapeHtml(person.name)}">
      <div class="answer-label">От чего я хочу его/её защитить?</div>
      <div class="shepherd-threats tags-wrap">
        ${SHEPHERD_THREATS.map(threat => `<button type="button" class="shepherd-chip threat ${person.threats.includes(threat.id) ? 'selected' : ''}" data-shepherd-threat="${threat.id}" data-shepherd-threat-idx="${index}">
          <i class="fa-solid ${threat.icon}"></i><span>${threat.name}</span>
        </button>`).join('')}
      </div>
      <div class="answer-label">Как я поддержу?</div>
      <div class="shepherd-support">
        ${SHEPHERD_SUPPORT_STYLES.map(style => `<button type="button" class="${person.support === style.id ? 'selected' : ''}" data-shepherd-support="${style.id}" data-shepherd-support-idx="${index}">
          <i class="fa-solid ${style.icon}"></i><span>${style.name}</span>
        </button>`).join('')}
      </div>
      <textarea class="input-field shepherd-action" data-shepherd-action="${index}" placeholder="Один мягкий защитный шаг...">${escapeHtml(person.action)}</textarea>
    </div>`;
  });
  html += '</div>';
  html += `<div class="shepherd-result ${filledCount >= 2 ? 'show' : ''}" id="shepherdResult">
    <strong>Быть овчаркой — значит защищать тех, кого любишь, не нападая и не управляя ими.</strong>
    <textarea class="input-field" id="shepherdBoundary" placeholder="Моя граница: как я помогу без давления?">${escapeHtml(answer.boundary)}</textarea>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 16: Неловкий старт --- */
function renderBrainStart() {
  const answer = normalizeBrainStartAnswer();
  const hasDecision = Boolean(answer.decision);
  const canCommit = answer.decision &&
    (answer.decision !== 'other' || answer.customDecision.trim()) &&
    answer.awkward.length &&
    answer.support.trim() &&
    answer.nextStep.trim() &&
    answer.restart.trim();
  const horizonFill = answer.horizon === 30 ? 33 : answer.horizon === 60 ? 66 : 100;

  let html = `<div class="brain-start-task" style="--horizon-fill:${horizonFill}%;margin-top:12px">`;
  html += `<div class="brain-start-timeline" aria-label="Горизонт адаптации">
    <div class="timeline-line"></div>
    ${[30, 60, 90].map(days => `<button type="button" class="timeline-step ${answer.horizon === days ? 'selected' : ''}" data-start-horizon="${days}">
      <strong>${days}</strong><span>дней</span>
    </button>`).join('')}
  </div>`;
  html += '<div class="brain-start-note"><i class="fa-solid fa-seedling"></i><span>Сначала неловко — это не провал, это мозг строит новые пути.</span></div>';

  html += '<div class="answer-label">Одно решение ради здоровья мозга</div>';
  html += '<div class="brain-start-decisions">';
  BRAIN_START_DECISIONS.forEach(decision => {
    html += `<button type="button" class="brain-start-card ${answer.decision === decision.id ? 'selected' : ''}" data-start-decision="${decision.id}">
      <span><i class="fa-solid ${decision.icon}"></i></span>
      <strong>${decision.name}</strong>
      <em>${decision.desc}</em>
    </button>`;
  });
  html += '</div>';

  html += `<div class="brain-start-plan ${hasDecision ? 'show' : ''}" id="brainStartPlan">
    <input class="input-field ${answer.decision === 'other' ? 'show' : ''}" id="brainStartCustom" placeholder="Сформулируйте своё одно решение..." value="${escapeHtml(answer.customDecision)}">
    <div class="answer-label">Что может быть неловко в начале?</div>
    <div class="brain-start-awkward tags-wrap">
      ${BRAIN_START_AWKWARD.map(item => `<button type="button" class="brain-start-chip ${answer.awkward.includes(item.id) ? 'selected' : ''}" data-start-awkward="${item.id}">
        <i class="fa-solid ${item.icon}"></i><span>${item.name}</span>
      </button>`).join('')}
    </div>
    <textarea class="input-field" id="brainStartSupport" placeholder="Как я буду мягче к себе, когда будет трудно?">${escapeHtml(answer.support)}</textarea>
    <textarea class="input-field" id="brainStartNextStep" placeholder="Первый маленький шаг в ближайшие 24 часа...">${escapeHtml(answer.nextStep)}</textarea>
    <input class="input-field" id="brainStartRestart" placeholder="Если я ошибусь, я начну снова с..." value="${escapeHtml(answer.restart)}">
    <button class="btn btn-secondary brain-start-commit" id="btnBrainStartCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-check"></i> Зафиксировать решение
    </button>
  </div>`;
  html += `<div class="brain-start-result ${answer.committed ? 'show' : ''}" id="brainStartResult">
    <strong>Моё решение принято.</strong>
    <span>Ошибки ожидаемы, настойчивость важнее идеального старта.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 17: Здоровый ритм --- */
function renderHealthyRhythm() {
  const answer = normalizeHealthyRhythmAnswer();
  const canAnswerQuestions = answer.changes.length >= 2;
  const rhythmFill = Math.min(100, Math.max(22, answer.changes.length * 18 + (answer.changed.trim() ? 12 : 0) + (answer.support.trim() ? 12 : 0)));

  let html = `<div class="healthy-rhythm-task" style="--rhythm-fill:${rhythmFill}%;margin-top:12px">`;
  html += `<div class="rhythm-timeline" aria-label="Линия здорового ритма">
    <div class="rhythm-line"></div>
    <div class="rhythm-stage">
      <span>1–3</span>
      <strong>начало</strong>
    </div>
    <div class="rhythm-stage active">
      <span>2–6</span>
      <strong>ритм</strong>
    </div>
    <div class="rhythm-stage">
      <span>∞</span>
      <strong>образ жизни</strong>
    </div>
  </div>`;
  html += `<div class="rhythm-wave" aria-label="Волна ритма">
    ${[0,1,2,3,4].map(index => `<span class="${index < answer.changes.length ? 'active' : ''}" style="--wave-delay:${index * 0.08}s"></span>`).join('')}
  </div>`;
  html += '<div class="answer-label">Что уже изменилось с начала программы?</div>';
  html += '<div class="rhythm-changes tags-wrap">';
  HEALTHY_RHYTHM_CHANGES.forEach(change => {
    html += `<button type="button" class="rhythm-chip ${answer.changes.includes(change.id) ? 'selected' : ''}" data-rhythm-change="${change.id}">
      <i class="fa-solid ${change.icon}"></i><span>${change.name}</span>
    </button>`;
  });
  html += '</div>';
  html += `<div class="rhythm-progress"><strong id="rhythmChangeCount">${answer.changes.length}</strong> изменения выбрано. Для завершения нужно минимум 2.</div>`;
  html += `<div class="rhythm-questions ${canAnswerQuestions ? 'show' : ''}" id="rhythmQuestions">
    <textarea class="input-field" id="healthyRhythmChanged" placeholder="Как я изменился с тех пор, как начал программу, полезную для мозга?">${escapeHtml(answer.changed)}</textarea>
    <textarea class="input-field" id="healthyRhythmSupport" placeholder="Что помогает мне продолжать?">${escapeHtml(answer.support)}</textarea>
  </div>`;
  html += `<div class="rhythm-return ${canAnswerQuestions ? 'show' : ''}" id="rhythmReturn">
    <div class="answer-label">Если будет плохой день</div>
    <div class="rhythm-return-options">
      ${HEALTHY_RHYTHM_RETURNS.map(item => `<button type="button" class="${answer.returnMode === item.id ? 'selected' : ''}" data-rhythm-return="${item.id}">
        <i class="fa-solid ${item.icon}"></i><span>${item.name}</span>
      </button>`).join('')}
    </div>
    <input class="input-field" id="healthyRhythmReturnStep" placeholder="Мой первый шаг возвращения..." value="${escapeHtml(answer.returnStep)}">
  </div>`;
  html += `<div class="rhythm-result ${isHealthyRhythmReady(answer) ? 'show' : ''}" id="healthyRhythmResult">
    <strong>Я нахожу свой ритм.</strong>
    <span>Ошибки становятся реже, а возвращение — быстрее.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 18: Автоматическая фаза --- */
function renderAutomaticPhase() {
  const answer = normalizeAutomaticPhaseAnswer();
  const canFillWays = answer.habits.length >= 3;
  const filledWays = getFilledAutomaticWaysCount(answer);
  const pilotFill = Math.min(100, Math.max(18, answer.habits.length * 11 + filledWays * 16 + (answer.returnMode ? 10 : 0)));

  let html = `<div class="automatic-task" style="--pilot-fill:${pilotFill}%;margin-top:12px">`;
  html += `<div class="automatic-timeline" aria-label="Автоматическая фаза">
    <div class="automatic-line"></div>
    ${[6, 9, 12].map(month => `<div class="automatic-stage ${month === 9 ? 'active' : ''}">
      <span>${month}</span><strong>мес.</strong>
    </div>`).join('')}
  </div>`;
  html += `<div class="automatic-nature" aria-label="Вторая натура">
    <div><i class="fa-solid fa-infinity"></i><span>Вторая натура</span></div>
    <div class="automatic-dots">
      ${[0,1,2].map(index => `<span class="${index < Math.min(3, answer.habits.length) ? 'active' : ''}"></span>`).join('')}
    </div>
  </div>`;

  html += '<div class="answer-label">Что стало бы естественным для меня?</div>';
  html += '<div class="automatic-habits tags-wrap">';
  AUTOMATIC_HABITS.forEach(habit => {
    html += `<button type="button" class="automatic-chip ${answer.habits.includes(habit.id) ? 'selected' : ''}" data-auto-habit="${habit.id}">
      <i class="fa-solid ${habit.icon}"></i><span>${habit.name}</span>
    </button>`;
  });
  html += '</div>';
  html += `<div class="automatic-progress"><strong id="automaticHabitCount">${answer.habits.length}</strong> привычки выбрано. Для завершения нужно минимум 3.</div>`;

  html += `<div class="automatic-ways ${canFillWays ? 'show' : ''}" id="automaticWays">
    ${answer.ways.map((way, index) => `<div class="automatic-way-card ${way.text.trim() ? 'complete' : ''}">
      <div class="automatic-way-head">
        <span>${index + 1}</span>
        <strong>Способ, которым моя жизнь станет лучше</strong>
      </div>
      <textarea class="input-field automatic-way-text" data-auto-way="${index}" placeholder="Например: больше энергии к вечеру, меньше внутренней борьбы, больше уверенности...">${escapeHtml(way.text)}</textarea>
      <div class="automatic-impact">
        <label>Насколько это изменит мой обычный день?</label>
        <div class="slider-row">
          <input type="range" min="1" max="5" value="${way.impact}" data-auto-impact="${index}">
          <div class="slider-val" data-auto-impact-val="${index}">${way.impact}</div>
        </div>
      </div>
    </div>`).join('')}
  </div>`;

  html += `<div class="automatic-return ${canFillWays ? 'show' : ''}" id="automaticReturn">
    <div class="answer-label">Если привычка прервётся</div>
    <div class="automatic-return-options">
      ${AUTOMATIC_RETURNS.map(item => `<button type="button" class="${answer.returnMode === item.id ? 'selected' : ''}" data-auto-return="${item.id}">
        <i class="fa-solid ${item.icon}"></i><span>${item.name}</span>
      </button>`).join('')}
    </div>
    <input class="input-field" id="automaticReturnPhrase" placeholder="Моя фраза возвращения..." value="${escapeHtml(answer.returnPhrase)}">
  </div>`;
  html += `<div class="automatic-result ${isAutomaticPhaseReady(answer) ? 'show' : ''}" id="automaticResult">
    <strong>Автопилот настроен.</strong>
    <span>Я строю не идеальную неделю, а образ жизни, к которому возвращаюсь автоматически.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 19: Панель показателей здоровья --- */
function renderKnownMetrics(answer) {
  const knownMetricIds = Object.keys(answer.statuses).filter(id => answer.statuses[id] === 'know');
  return `<div class="known-metrics ${knownMetricIds.length ? 'show' : ''}" id="knownMetrics">
    <div class="answer-label">Что я уже знаю</div>
    ${knownMetricIds.length ? knownMetricIds.map(metricId => {
      const metric = HEALTH_METRICS.find(item => item.id === metricId);
      return `<label class="known-metric-row">
        <span>${escapeHtml(metric.name)}</span>
        <input class="input-field metric-value" data-metric-value="${metric.id}" placeholder="Значение или заметка..." value="${escapeHtml(answer.values[metric.id] || '')}">
        <em>${escapeHtml(metric.guide)}</em>
      </label>`;
    }).join('') : '<div class="empty-hint">Отметьте показатели как «Уже знаю», чтобы записать значения или заметки.</div>'}
  </div>`;
}

function renderHealthMetrics() {
  const answer = normalizeHealthMetricsAnswer();
  const selectedMetricIds = Object.keys(answer.statuses);
  const canCommit = selectedMetricIds.length >= 3 && answer.specialist.trim() && answer.contactWhen.trim() && answer.request.trim();
  const fill = Math.min(100, Math.round((selectedMetricIds.length / HEALTH_METRICS.length) * 100));
  const ringOffset = 301.6 - (301.6 * selectedMetricIds.length / HEALTH_METRICS.length);

  let html = `<div class="health-metrics-task" style="--metrics-fill:${fill}%;margin-top:12px">`;
  html += `<div class="metrics-dashboard" aria-label="Панель показателей здоровья">
    <div class="metrics-ring">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="48"></circle>
        <circle class="metrics-ring-fill" cx="60" cy="60" r="48" style="stroke-dashoffset:${ringOffset}"></circle>
      </svg>
      <div><strong>${selectedMetricIds.length}</strong><span>из 12</span></div>
    </div>
    <div class="metrics-dashboard-copy">
      <strong>Показатели взяты в работу</strong>
      <span>Выберите минимум 3 показателя и зафиксируйте следующий шаг к специалисту.</span>
    </div>
  </div>`;

  html += '<div class="metrics-grid">';
  HEALTH_METRICS.forEach(metric => {
    const status = answer.statuses[metric.id] || '';
    html += `<div class="metric-card ${status ? 'selected' : ''}" data-metric-card="${metric.id}">
      <div class="metric-card-head">
        <span><i class="fa-solid ${metric.icon}"></i></span>
        <div><strong>${metric.name}</strong><em>${metric.guide}</em></div>
      </div>
      <div class="metric-statuses" role="group" aria-label="${escapeHtml(metric.name)}">
        ${HEALTH_METRIC_STATUSES.map(item => `<button type="button" class="${status === item.id ? 'selected' : ''}" data-metric-status="${item.id}" data-metric-id="${metric.id}">
          <i class="fa-solid ${item.icon}"></i><span>${item.name}</span>
        </button>`).join('')}
      </div>
    </div>`;
  });
  html += '</div>';

  html += renderKnownMetrics(answer);

  html += '<div class="modifiable-risks"><div class="answer-label">Какие изменяемые риски важно обсудить?</div><div class="tags-wrap">';
  MODIFIABLE_RISKS.forEach(risk => {
    html += `<button type="button" class="risk-chip ${answer.risks.includes(risk.id) ? 'selected' : ''}" data-health-risk="${risk.id}">
      <i class="fa-solid ${risk.icon}"></i><span>${risk.name}</span>
    </button>`;
  });
  html += `</div><div class="metrics-progress"><strong id="healthRiskCount">${answer.risks.length}</strong> рисков отмечено для внимания.</div></div>`;

  html += `<div class="metrics-plan">
    <strong><i class="fa-solid fa-user-doctor"></i> Мой следующий шаг</strong>
    <input class="input-field" id="metricsSpecialist" placeholder="К кому я обращусь? Врач, клиника, лаборатория..." value="${escapeHtml(answer.specialist)}">
    <input class="input-field" id="metricsWhen" placeholder="Когда я свяжусь?" value="${escapeHtml(answer.contactWhen)}">
    <textarea class="input-field" id="metricsRequest" placeholder="Что я попрошу измерить или проверить?">${escapeHtml(answer.request)}</textarea>
    <button class="btn btn-secondary metrics-commit" id="btnMetricsCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-clipboard-check"></i> Зафиксировать план измерений
    </button>
  </div>`;

  html += `<div class="metrics-result ${answer.committed ? 'show' : ''}" id="metricsResult">
    <strong>План измерений зафиксирован.</strong>
    <span>Я не гадаю — я измеряю и улучшаю вместе со специалистом.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 20: Четыре круга --- */
function renderFourCircles() {
  const answer = normalizeFourCirclesAnswer();
  const filledCount = getFourCirclesFilledCount(answer);
  const canFocus = filledCount === FOUR_CIRCLES.length;
  const averageRating = Math.round(FOUR_CIRCLES.reduce((sum, circle) => sum + answer.ratings[circle.id], 0) / FOUR_CIRCLES.length * 10) / 10;

  let html = `<div class="four-circles-task" style="--circle-fill:${filledCount * 25}%;margin-top:12px">`;
  html += `<div class="four-circles-map" aria-label="Карта четырёх кругов">
    <div class="four-circles-center">
      <i class="fa-solid fa-circle-nodes"></i>
      <span>Целостное<br>здоровье</span>
    </div>
    ${FOUR_CIRCLES.map((circle, index) => {
      const complete = answer.strengths[circle.id].trim() && answer.vulnerabilities[circle.id].trim();
      return `<div class="four-circle-node node-${index + 1} ${complete ? 'complete' : ''}">
        <i class="fa-solid ${circle.icon}"></i>
        <span>${circle.name}</span>
      </div>`;
    }).join('')}
  </div>`;

  html += `<div class="four-circles-progress">
    <strong id="fourCirclesFilled">${filledCount}</strong> из 4 кругов описано
    <span>Средняя самооценка: <b id="fourCirclesAverage">${averageRating}</b>/5</span>
  </div>`;

  html += '<div class="four-circles-grid">';
  FOUR_CIRCLES.forEach(circle => {
    const rating = answer.ratings[circle.id];
    const complete = answer.strengths[circle.id].trim() && answer.vulnerabilities[circle.id].trim();
    html += `<div class="four-circle-card ${complete ? 'complete' : ''}" data-four-circle-card="${circle.id}">
      <div class="four-circle-card-head">
        <span><i class="fa-solid ${circle.icon}"></i></span>
        <div>
          <strong>${circle.name}</strong>
          <em>${circle.desc}</em>
        </div>
      </div>
      <div class="four-circle-hint">${circle.hint}</div>
      <div class="four-circle-rating">
        <label>Как я оцениваю этот круг сейчас?</label>
        <div class="slider-row">
          <input type="range" min="1" max="5" value="${rating}" data-four-rating="${circle.id}">
          <div class="slider-val" data-four-rating-val="${circle.id}">${rating}</div>
        </div>
      </div>
      <textarea class="input-field four-strength" data-four-strength="${circle.id}" placeholder="Моя сильная сторона в этом круге...">${escapeHtml(answer.strengths[circle.id])}</textarea>
      <textarea class="input-field four-vulnerability" data-four-vulnerability="${circle.id}" placeholder="Моя уязвимость в этом круге...">${escapeHtml(answer.vulnerabilities[circle.id])}</textarea>
    </div>`;
  });
  html += '</div>';

  html += `<div class="four-circles-focus ${canFocus ? 'show' : ''}" id="fourCirclesFocus">
    <strong><i class="fa-solid fa-location-dot"></i> Один балансирующий шаг</strong>
    <div class="four-focus-options" role="group" aria-label="Круг для фокуса">
      ${FOUR_CIRCLES.map(circle => `<button type="button" class="${answer.focus === circle.id ? 'selected' : ''}" data-four-focus="${circle.id}">
        <i class="fa-solid ${circle.icon}"></i><span>${circle.name}</span>
      </button>`).join('')}
    </div>
    <textarea class="input-field" id="fourCirclesAction" placeholder="Один бережный шаг, который поддержит выбранный круг...">${escapeHtml(answer.action)}</textarea>
    <button class="btn btn-secondary four-circles-commit" id="btnFourCirclesCommit" ${canFocus && answer.focus && answer.action.trim() ? '' : 'disabled'}>
      <i class="fa-solid fa-circle-nodes"></i> Собрать карту четырёх кругов
    </button>
  </div>`;

  html += `<div class="four-circles-result ${answer.committed ? 'show' : ''}" id="fourCirclesResult">
    <strong>Карта четырёх кругов собрана.</strong>
    <span>Я смотрю на себя целиком. Маленький шаг в одном круге поддерживает всю систему.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 21: Заповедник морских коньков --- */
function renderSeahorseReserve() {
  const answer = normalizeSeahorseReserveAnswer();
  const nourishCount = getFilledSeahorseCount(answer, 'nourish');
  const toxicCount = getFilledSeahorseCount(answer, 'toxic');
  const canPlan = nourishCount === 3 && toxicCount === 3;
  const canCommit = canPlan && answer.focusToxic && answer.protection.trim();
  const habitatFill = Math.round(((nourishCount + (3 - toxicCount)) / 6) * 100);

  let html = `<div class="seahorse-task" style="--habitat-fill:${habitatFill}%;--nourish-level:${nourishCount};--toxic-level:${toxicCount};margin-top:12px">`;
  html += `<div class="seahorse-habitat" aria-label="Заповедник гиппокампа">
    <div class="seahorse-water"></div>
    <div class="seahorse-bubbles">
      ${[0,1,2,3,4,5].map(index => `<span class="${index < nourishCount * 2 ? 'active' : ''}" style="--bubble-delay:${index * 0.12}s"></span>`).join('')}
    </div>
    <div class="seahorse-pair" aria-hidden="true">
      <svg viewBox="0 0 220 120" role="img">
        <path class="seahorse-shape left" d="M82 18c-21 0-34 15-34 32 0 13 8 22 20 25-6 7-7 17-1 25 8 11 27 9 31-5 3-10-4-17-13-17-6 0-10 3-13 7-1-9 5-16 16-20 14-5 22-15 22-30 0-11-10-17-28-17zm4 18c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7z"/>
        <path class="seahorse-shape right" d="M138 18c21 0 34 15 34 32 0 13-8 22-20 25 6 7 7 17 1 25-8 11-27 9-31-5-3-10 4-17 13-17 6 0 10 3 13 7 1-9-5-16-16-20-14-5-22-15-22-30 0-11 10-17 28-17zm-4 18c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z"/>
      </svg>
    </div>
    <div class="seahorse-counter">
      <strong>700</strong>
      <span>новых клеток гиппокампа сегодня</span>
    </div>
  </div>`;

  html += `<div class="seahorse-progress">
    <span><strong id="seahorseNourishCount">${nourishCount}</strong>/3 питают</span>
    <span><strong id="seahorseToxicCount">${toxicCount}</strong>/3 уменьшают</span>
  </div>`;

  html += '<div class="seahorse-columns">';
  html += `<div class="seahorse-column nourish">
    <h4><i class="fa-solid fa-seedling"></i> Питают мои гиппокампы</h4>
    ${[0,1,2].map(index => `<input class="input-field seahorse-input" data-seahorse-kind="nourish" data-seahorse-idx="${index}" placeholder="Действие ${index + 1}..." value="${escapeHtml(answer.nourish[index])}">`).join('')}
    <div class="seahorse-suggestions tags-wrap">
      ${HIPPOCAMPUS_NOURISHING_ACTIONS.map(item => `<button type="button" class="seahorse-chip nourish" data-seahorse-suggestion-kind="nourish" data-seahorse-suggestion="${escapeHtml(item.name)}">
        <i class="fa-solid ${item.icon}"></i><span>${item.name}</span>
      </button>`).join('')}
    </div>
  </div>`;
  html += `<div class="seahorse-column toxic">
    <h4><i class="fa-solid fa-triangle-exclamation"></i> Уменьшают их</h4>
    ${[0,1,2].map(index => `<input class="input-field seahorse-input" data-seahorse-kind="toxic" data-seahorse-idx="${index}" placeholder="Токсичное действие ${index + 1}..." value="${escapeHtml(answer.toxic[index])}">`).join('')}
    <div class="seahorse-suggestions tags-wrap">
      ${HIPPOCAMPUS_TOXIC_ACTIONS.map(item => `<button type="button" class="seahorse-chip toxic" data-seahorse-suggestion-kind="toxic" data-seahorse-suggestion="${escapeHtml(item.name)}">
        <i class="fa-solid ${item.icon}"></i><span>${item.name}</span>
      </button>`).join('')}
    </div>
  </div>`;
  html += '</div>';

  html += `<div class="seahorse-plan ${canPlan ? 'show' : ''}" id="seahorsePlan">
    <strong><i class="fa-solid fa-shield-halved"></i> Мой выбор на сегодня</strong>
    <label for="seahorseFocus">Какое токсичное действие я ослаблю первым?</label>
    <select class="input-field" id="seahorseFocus" ${canPlan ? '' : 'disabled'}>
      <option value="">Выберите из своего списка...</option>
      ${answer.toxic.filter(item => item.trim()).map(item => `<option value="${escapeHtml(item)}" ${answer.focusToxic === item ? 'selected' : ''}>${escapeHtml(item)}</option>`).join('')}
    </select>
    <textarea class="input-field" id="seahorseProtection" placeholder="Чем я заменю это действие или как ослаблю его сегодня?">${escapeHtml(answer.protection)}</textarea>
    <button class="btn btn-secondary seahorse-commit" id="btnSeahorseCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-shield-halved"></i> Защитить новых морских коньков
    </button>
  </div>`;

  html += `<div class="seahorse-result ${answer.committed ? 'show' : ''}" id="seahorseResult">
    <strong>Заповедник защищён.</strong>
    <span>Сегодня я создаю среду, где новым клеткам гиппокампа легче вырасти.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 22: Популяция АНТов --- */
function renderAntPopulation() {
  const answer = normalizeAntPopulationAnswer();
  const requiredThoughts = getRequiredAntThoughtCount(answer);
  const filledThoughts = getFilledAntThoughtCount(answer);
  const canJournal = answer.populationSet && answer.areas.length > 0;
  const canCommit = canJournal && filledThoughts >= requiredThoughts && answer.observation.trim();

  let html = `<div class="ant-task" style="--ant-level:${answer.population};margin-top:12px">`;
  html += `<div class="ant-habitat" aria-label="Популяция автоматических негативных мыслей">
    <div class="anteater-mark" aria-hidden="true">
      <svg viewBox="0 0 240 120" role="img">
        <path class="anteater-body" d="M42 70c8-27 37-43 70-39 20 2 37 10 50 24l50 4c11 1 17 7 17 15 0 7-6 12-16 12h-46c-13 14-32 22-54 22-37 0-64-15-71-38z"/>
        <path class="anteater-nose" d="M158 56c22-21 48-29 70-25 7 1 10 8 5 13-13 13-38 21-70 24z"/>
        <circle class="anteater-eye" cx="123" cy="52" r="4"/>
        <path class="anteater-leg" d="M76 91v17M122 94v17" />
      </svg>
    </div>
    <div class="ant-field" aria-hidden="true">
      ${Array.from({length:10}, (_, index) => `<span class="${index < answer.population ? 'active' : ''}" style="--ant-i:${index}"></span>`).join('')}
    </div>
    <div class="ant-counter">
      <strong id="antPopulationValue">${answer.population}</strong>
      <span>из 10 АНТов сейчас</span>
    </div>
  </div>`;

  html += `<div class="ant-slider-panel">
    <label for="antPopulationSlider">Какова популяция АНТов в моей голове?</label>
    <div class="slider-row">
      <input type="range" id="antPopulationSlider" min="0" max="10" value="${answer.population}">
      <div class="slider-val" id="antPopulationNumber">${answer.population}</div>
    </div>
    <div class="ant-population-note" id="antPopulationNote">${escapeHtml(getAntPopulationLabel(answer))}</div>
  </div>`;

  html += '<div class="ant-areas"><div class="answer-label">Где АНТы появляются чаще?</div><div class="tags-wrap">';
  ANT_AREAS.forEach(area => {
    html += `<button type="button" class="ant-area-chip ${answer.areas.includes(area.id) ? 'selected' : ''}" data-ant-area="${area.id}">
      <i class="fa-solid ${area.icon}"></i><span>${area.name}</span>
    </button>`;
  });
  html += `</div><div class="ant-progress"><strong id="antAreaCount">${answer.areas.length}</strong> области выбрано. Можно выбрать до 3.</div></div>`;

  html += `<div class="ant-journal ${canJournal ? 'show' : ''}" id="antJournal">
    <div class="ant-journal-head">
      <strong><i class="fa-solid fa-pen"></i> Дневник АНТов</strong>
      <span>Нужно записать <b id="antRequiredCount">${requiredThoughts}</b>; готово <b id="antFilledCount">${filledThoughts}</b></span>
    </div>
    ${answer.thoughts.map((thought, index) => `<div class="ant-thought-card ${thought.text.trim() && thought.type ? 'complete' : ''}">
      <div class="ant-thought-title">
        <span>${index + 1}</span>
        <strong>Автоматическая негативная мысль</strong>
      </div>
      <textarea class="input-field ant-thought-text" data-ant-thought="${index}" placeholder="Запишите мысль так, как она пришла...">${escapeHtml(thought.text)}</textarea>
      <div class="ant-type-options" role="group" aria-label="Это факт или мысль?">
        ${ANT_THOUGHT_TYPES.map(type => `<button type="button" class="${thought.type === type.id ? 'selected' : ''}" data-ant-type="${type.id}" data-ant-type-idx="${index}">
          <i class="fa-solid ${type.icon}"></i><span>${type.name}</span>
        </button>`).join('')}
      </div>
    </div>`).join('')}
    <textarea class="input-field" id="antObservation" placeholder="Что я замечаю о своей популяции АНТов?">${escapeHtml(answer.observation)}</textarea>
    <button class="btn btn-secondary ant-commit" id="btnAntCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-magnifying-glass"></i> Позвать муравьеда
    </button>
  </div>`;

  html += `<div class="ant-result ${answer.committed ? 'show' : ''}" id="antResult">
    <strong>Муравьед на месте.</strong>
    <span>Я не обязан верить каждой мысли. Сегодня я начинаю их замечать и записывать.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 23: Пингвин Фредди --- */
function renderPenguinPraise() {
  const answer = normalizePenguinPraiseAnswer();
  const completeCount = getPenguinCompleteCount(answer);
  const hasIncomplete = hasIncompletePenguinPerson(answer);
  const canChooseRule = completeCount > 0;
  const canCommit = canChooseRule && !hasIncomplete && answer.rule;
  const stageLight = 0.38 + completeCount * 0.24;

  let html = `<div class="penguin-task" style="--fish-count:${completeCount};--stage-light:${stageLight};margin-top:12px">`;
  html += `<div class="penguin-stage" aria-label="Пингвин Фредди и рыбки внимания">
    <div class="penguin-spotlight"></div>
    <div class="penguin-mark" aria-hidden="true">
      <svg viewBox="0 0 180 160" role="img">
        <ellipse class="penguin-shadow" cx="90" cy="143" rx="50" ry="9"/>
        <path class="penguin-body" d="M91 18c-31 0-53 28-53 67 0 35 20 62 53 62s53-27 53-62c0-39-22-67-53-67z"/>
        <path class="penguin-belly" d="M91 46c-21 0-35 22-35 52 0 25 13 42 35 42s35-17 35-42c0-30-14-52-35-52z"/>
        <path class="penguin-wing left" d="M45 72c-17 12-25 30-19 41 12-5 22-18 27-37z"/>
        <path class="penguin-wing right" d="M135 72c17 12 25 30 19 41-12-5-22-18-27-37z"/>
        <circle class="penguin-eye" cx="74" cy="47" r="4"/>
        <circle class="penguin-eye" cx="108" cy="47" r="4"/>
        <path class="penguin-beak" d="M86 56h12l-6 8z"/>
        <path class="penguin-foot left" d="M67 143c-10 2-18 6-22 12 12 3 24 1 31-6z"/>
        <path class="penguin-foot right" d="M113 143c10 2 18 6 22 12-12 3-24 1-31-6z"/>
      </svg>
    </div>
    <div class="penguin-fish" aria-hidden="true">
      ${[0,1].map(index => `<span class="${index < completeCount ? 'active' : ''}" style="--fish-i:${index}"><i class="fa-solid fa-fish"></i></span>`).join('')}
    </div>
    <div class="penguin-counter">
      <strong id="penguinFishCount">${completeCount}</strong>
      <span>из 2 рыбок внимания готовы</span>
    </div>
  </div>`;

  html += '<div class="penguin-people">';
  answer.people.forEach((person, index) => {
    const started = isPenguinPersonStarted(person);
    const complete = isPenguinPersonComplete(person);
    html += `<div class="penguin-person-card ${started ? 'started' : ''} ${complete ? 'complete' : ''}" data-penguin-card="${index}">
      <div class="penguin-person-head">
        <span>${index + 1}</span>
        <strong>${index === 0 ? 'Первый человек' : 'Второй человек'}</strong>
        ${index === 1 ? '<em>по желанию</em>' : ''}
      </div>
      <input class="input-field penguin-name" data-penguin-name="${index}" placeholder="Кого я замечу сегодня?" value="${escapeHtml(person.name)}">
      <textarea class="input-field penguin-quality" data-penguin-quality="${index}" placeholder="Что мне в этом человеке нравится?">${escapeHtml(person.quality)}</textarea>
      <div class="penguin-methods" role="group" aria-label="Способ внимания">
        ${PENGUIN_ATTENTION_METHODS.map(method => `<button type="button" class="${person.method === method.id ? 'selected' : ''}" data-penguin-method="${method.id}" data-penguin-method-idx="${index}">
          <i class="fa-solid ${method.icon}"></i><span>${method.name}</span>
        </button>`).join('')}
      </div>
      <textarea class="input-field penguin-action" data-penguin-action="${index}" placeholder="Как именно я это скажу или покажу?">${escapeHtml(person.action)}</textarea>
      ${index === 1 ? '<button type="button" class="btn-back penguin-clear" id="btnPenguinClearSecond"><i class="fa-solid fa-eraser"></i> Очистить вторую карточку</button>' : ''}
    </div>`;
  });
  html += '</div>';

  html += `<div class="penguin-rule ${canChooseRule ? 'show' : ''}" id="penguinRule">
    <strong><i class="fa-solid fa-compass"></i> Правило внимания на день</strong>
    <div class="penguin-rule-options" role="group" aria-label="Правило внимания">
      ${PENGUIN_ATTENTION_RULES.map(rule => `<button type="button" class="${answer.rule === rule.id ? 'selected' : ''}" data-penguin-rule="${rule.id}">
        <i class="fa-solid ${rule.icon}"></i><span>${rule.name}</span>
      </button>`).join('')}
    </div>
    <div class="penguin-hint ${hasIncomplete ? 'show' : ''}" id="penguinHint">Если вы начали вторую карточку, завершите её или очистите поля.</div>
    <button class="btn btn-secondary penguin-commit" id="btnPenguinCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-fish"></i> Покормить хорошее вниманием
    </button>
  </div>`;

  html += `<div class="penguin-result ${answer.committed ? 'show' : ''}" id="penguinResult">
    <strong>Хорошее замечено.</strong>
    <span>Сегодня я тренирую внимание видеть то, что хочу укрепить.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 24: Бабочки смысла --- */
function renderButterflyReflections(answer) {
  if (!answer.questions.length) {
    return '<div class="empty-hint">Выберите вопросы из урока, над которыми хочется остановиться сегодня.</div>';
  }
  return answer.questions.map(questionId => {
    const question = BUTTERFLY_PURPOSE_QUESTIONS.find(item => item.id === questionId);
    const response = answer.responses[questionId] || '';
    return `<div class="butterfly-reflection-card ${response.trim() ? 'complete' : ''}" data-butterfly-card="${question.id}">
      <div class="butterfly-card-head">
        <span><i class="fa-solid ${question.icon}"></i></span>
        <strong>${question.text}</strong>
      </div>
      <textarea class="input-field butterfly-response" data-butterfly-response="${question.id}" placeholder="Мой честный ответ сейчас...">${escapeHtml(response)}</textarea>
    </div>`;
  }).join('');
}

function renderButterflyPurpose() {
  const answer = normalizeButterflyPurposeAnswer();
  const filledCount = getButterflyFilledCount(answer);
  const canChooseValues = filledCount >= 3 && filledCount === answer.questions.length;
  const canCommit = canChooseValues && answer.values.length >= 1 && answer.action.trim();

  let html = `<div class="butterfly-task" style="--butterfly-fill:${filledCount};margin-top:12px">`;
  html += `<div class="butterfly-sky" aria-label="Карта трансформации и смысла">
    <div class="butterfly-sun"></div>
    <div class="butterfly-path"></div>
    <div class="butterflies" aria-hidden="true">
      ${Array.from({length:8}, (_, index) => `<span class="${index < filledCount ? 'active' : ''}" style="--butterfly-i:${index}">
        <i class="fa-solid fa-feather"></i>
      </span>`).join('')}
    </div>
    <div class="butterfly-counter">
      <strong id="butterflyFilledCount">${filledCount}</strong>
      <span>из 3 ответов для карты смысла готовы</span>
    </div>
  </div>`;

  html += `<div class="butterfly-question-picker">
    <div class="answer-label">Какие вопросы сейчас звучат внутри?</div>
    <div class="butterfly-question-grid">
      ${BUTTERFLY_PURPOSE_QUESTIONS.map(question => `<button type="button" class="butterfly-question ${answer.questions.includes(question.id) ? 'selected' : ''}" data-butterfly-question="${question.id}">
        <i class="fa-solid ${question.icon}"></i><span>${question.text}</span>
      </button>`).join('')}
    </div>
    <div class="butterfly-progress"><strong id="butterflyQuestionCount">${answer.questions.length}</strong> вопроса выбрано. Минимум для завершения — 3.</div>
  </div>`;

  html += '<div class="butterfly-reflections">';
  html += renderButterflyReflections(answer);
  html += '</div>';

  html += `<div class="butterfly-values ${canChooseValues ? 'show' : ''}" id="butterflyValues">
    <strong><i class="fa-solid fa-gem"></i> Что проявилось как ценность?</strong>
    <div class="butterfly-value-grid">
      ${BUTTERFLY_VALUES.map(value => `<button type="button" class="${answer.values.includes(value.id) ? 'selected' : ''}" data-butterfly-value="${value.id}">
        <i class="fa-solid ${value.icon}"></i><span>${value.name}</span>
      </button>`).join('')}
    </div>
    <div class="butterfly-progress"><strong id="butterflyValueCount">${answer.values.length}</strong> ценности выбрано. Можно выбрать до 4.</div>
    <textarea class="input-field" id="butterflyAction" placeholder="Один осмысленный поступок сегодня...">${escapeHtml(answer.action)}</textarea>
    <button class="btn btn-secondary butterfly-commit" id="btnButterflyCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-paper-plane"></i> Выпустить бабочку
    </button>
  </div>`;

  html += `<div class="butterfly-result ${answer.committed ? 'show' : ''}" id="butterflyResult">
    <strong>Бабочка выпущена.</strong>
    <span>Я не только думаю о смысле — я делаю один маленький выбор из него сегодня.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 25: Биологический правитель --- */
function renderBiologicalRuler() {
  const answer = normalizeBiologicalRulerAnswer();
  const supportCount = answer.supports.length;
  const harmCount = answer.harms.length;
  const canPlan = supportCount >= 2 && harmCount >= 2;
  const canCommit = canPlan && answer.focusHarm && answer.decree.trim() && answer.sharedAction.trim();
  const balance = Math.max(-3, Math.min(3, supportCount - harmCount));

  let html = `<div class="bio-ruler-task" style="--bio-balance:${balance};margin-top:12px">`;
  html += `<div class="bio-ruler-board" aria-label="Биологический круг доброго и злого правителя">
    <div class="bio-ruler-side good">
      <i class="fa-solid fa-crown"></i>
      <strong id="bioSupportCount">${supportCount}</strong>
      <span>политики поддержки</span>
    </div>
    <div class="bio-ruler-scale" aria-hidden="true">
      <div class="bio-scale-bar"><span></span></div>
      <div class="bio-scale-pivot"><i class="fa-solid fa-heart-pulse"></i></div>
    </div>
    <div class="bio-ruler-side harmful">
      <i class="fa-solid fa-chess-king"></i>
      <strong id="bioHarmCount">${harmCount}</strong>
      <span>политики вреда</span>
    </div>
  </div>`;

  html += '<div class="bio-policy-columns">';
  html += `<div class="bio-policy-column good">
    <h4><i class="fa-solid fa-shield-heart"></i> Что поддерживает мой биологический круг</h4>
    <div class="bio-policy-grid">
      ${BIOLOGICAL_SUPPORT_POLICIES.map(policy => `<button type="button" class="bio-policy-chip ${answer.supports.includes(policy.id) ? 'selected' : ''}" data-bio-support="${policy.id}">
        <i class="fa-solid ${policy.icon}"></i><span>${policy.name}</span>
      </button>`).join('')}
    </div>
  </div>`;
  html += `<div class="bio-policy-column harmful">
    <h4><i class="fa-solid fa-triangle-exclamation"></i> Что сейчас может вредить мозгу</h4>
    <div class="bio-policy-grid">
      ${BIOLOGICAL_HARM_POLICIES.map(policy => `<button type="button" class="bio-policy-chip ${answer.harms.includes(policy.id) ? 'selected' : ''}" data-bio-harm="${policy.id}">
        <i class="fa-solid ${policy.icon}"></i><span>${policy.name}</span>
      </button>`).join('')}
    </div>
  </div>`;
  html += '</div>';

  html += `<div class="bio-ruler-plan ${canPlan ? 'show' : ''}" id="bioRulerPlan">
    <strong><i class="fa-solid fa-scroll"></i> Указ доброго правителя</strong>
    <label for="bioFocusHarm">Какую вредящую политику я ослаблю первой?</label>
    <select class="input-field" id="bioFocusHarm" ${canPlan ? '' : 'disabled'}>
      <option value="">Выберите из отмеченного...</option>
      ${answer.harms.map(id => `<option value="${id}" ${answer.focusHarm === id ? 'selected' : ''}>${escapeHtml(getBiologicalPolicyName(BIOLOGICAL_HARM_POLICIES, id))}</option>`).join('')}
    </select>
    <textarea class="input-field" id="bioDecree" placeholder="Мой конкретный указ на сегодня: что я сделаю вместо этого?">${escapeHtml(answer.decree)}</textarea>
    <textarea class="input-field" id="bioSharedAction" placeholder="Как это поддержит мой мозг или мозг людей рядом?">${escapeHtml(answer.sharedAction)}</textarea>
    <button class="btn btn-secondary bio-ruler-commit" id="btnBioRulerCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-crown"></i> Издать указ доброго правителя
    </button>
  </div>`;

  html += `<div class="bio-ruler-result ${answer.committed ? 'show' : ''}" id="bioRulerResult">
    <strong>Указ принят.</strong>
    <span>Сегодня мои действия в биологическом круге служат здоровью мозга, а не войне против него.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 26: Психологический правитель --- */
function renderPsychologicalRuler() {
  const answer = normalizePsychologicalRulerAnswer();
  const supportCount = answer.supports.length;
  const harmCount = answer.harms.length;
  const canPlan = supportCount >= 2 && harmCount >= 2;
  const canCommit = canPlan && answer.focusHarm && answer.decree.trim() && answer.newMessage.trim();
  const balance = Math.max(-3, Math.min(3, supportCount - harmCount));

  let html = `<div class="bio-ruler-task psychological-ruler-task" style="--bio-balance:${balance};margin-top:12px">`;
  html += `<div class="bio-ruler-board" aria-label="Психологический круг доброго и злого правителя">
    <div class="bio-ruler-side good">
      <i class="fa-solid fa-crown"></i>
      <strong id="psySupportCount">${supportCount}</strong>
      <span>политики поддержки</span>
    </div>
    <div class="bio-ruler-scale" aria-hidden="true">
      <div class="bio-scale-bar"><span></span></div>
      <div class="bio-scale-pivot"><i class="fa-solid fa-brain"></i></div>
    </div>
    <div class="bio-ruler-side harmful">
      <i class="fa-solid fa-chess-king"></i>
      <strong id="psyHarmCount">${harmCount}</strong>
      <span>политики вреда</span>
    </div>
  </div>`;

  html += '<div class="bio-policy-columns">';
  html += `<div class="bio-policy-column good">
    <h4><i class="fa-solid fa-shield-heart"></i> Что поддерживает мой психологический круг</h4>
    <div class="bio-policy-grid">
      ${PSYCHOLOGICAL_SUPPORT_POLICIES.map(policy => `<button type="button" class="bio-policy-chip ${answer.supports.includes(policy.id) ? 'selected' : ''}" data-psy-support="${policy.id}">
        <i class="fa-solid ${policy.icon}"></i><span>${policy.name}</span>
      </button>`).join('')}
    </div>
  </div>`;
  html += `<div class="bio-policy-column harmful">
    <h4><i class="fa-solid fa-triangle-exclamation"></i> Что может вредить психологическому здоровью</h4>
    <div class="bio-policy-grid">
      ${PSYCHOLOGICAL_HARM_POLICIES.map(policy => `<button type="button" class="bio-policy-chip ${answer.harms.includes(policy.id) ? 'selected' : ''}" data-psy-harm="${policy.id}">
        <i class="fa-solid ${policy.icon}"></i><span>${policy.name}</span>
      </button>`).join('')}
    </div>
  </div>`;
  html += '</div>';

  html += `<div class="bio-ruler-plan ${canPlan ? 'show' : ''}" id="psyRulerPlan">
    <strong><i class="fa-solid fa-scroll"></i> Указ доброго правителя</strong>
    <label for="psyFocusHarm">Какую вредящую психологическую политику я ослаблю первой?</label>
    <select class="input-field" id="psyFocusHarm" ${canPlan ? '' : 'disabled'}>
      <option value="">Выберите из отмеченного...</option>
      ${answer.harms.map(id => `<option value="${id}" ${answer.focusHarm === id ? 'selected' : ''}>${escapeHtml(getPsychologicalPolicyName(PSYCHOLOGICAL_HARM_POLICIES, id))}</option>`).join('')}
    </select>
    <textarea class="input-field" id="psyDecree" placeholder="Мой поддерживающий шаг на сегодня...">${escapeHtml(answer.decree)}</textarea>
    <textarea class="input-field" id="psyNewMessage" placeholder="Какую старую фразу из детства или прошлого я заменю более правдивой?">${escapeHtml(answer.newMessage)}</textarea>
    <button class="btn btn-secondary bio-ruler-commit" id="btnPsyRulerCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-crown"></i> Издать психологический указ
    </button>
  </div>`;

  html += `<div class="bio-ruler-result ${answer.committed ? 'show' : ''}" id="psyRulerResult">
    <strong>Психологический указ принят.</strong>
    <span>Сегодня я укрепляю внутреннюю среду, где легче чувствовать: я достаточно хорош.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 27: Социальный правитель --- */
function renderSocialRuler() {
  const answer = normalizeSocialRulerAnswer();
  const supportCount = answer.supports.length;
  const stressCount = answer.stressors.length;
  const relationshipCount = getSocialRelationshipCount(answer);
  const hasIncomplete = hasIncompleteSocialRelationship(answer);
  const canRelationships = supportCount >= 2 && stressCount >= 2;
  const canCommit = canRelationships &&
    relationshipCount >= 1 &&
    !hasIncomplete &&
    answer.focusStress &&
    answer.stressStep.trim() &&
    answer.connectionAction.trim();
  const balance = Math.max(-3, Math.min(3, supportCount - stressCount));

  let html = `<div class="bio-ruler-task social-ruler-task" style="--bio-balance:${balance};margin-top:12px">`;
  html += `<div class="bio-ruler-board" aria-label="Социальный круг: связь и стресс">
    <div class="bio-ruler-side good">
      <i class="fa-solid fa-people-group"></i>
      <strong id="socialSupportCount">${supportCount}</strong>
      <span>действия связи</span>
    </div>
    <div class="bio-ruler-scale" aria-hidden="true">
      <div class="bio-scale-bar"><span></span></div>
      <div class="bio-scale-pivot"><i class="fa-solid fa-heart"></i></div>
    </div>
    <div class="bio-ruler-side harmful">
      <i class="fa-solid fa-bolt"></i>
      <strong id="socialStressCount">${stressCount}</strong>
      <span>стрессоры</span>
    </div>
  </div>`;

  html += '<div class="bio-policy-columns">';
  html += `<div class="bio-policy-column good">
    <h4><i class="fa-solid fa-link"></i> Что поддерживает мои отношения</h4>
    <div class="bio-policy-grid">
      ${SOCIAL_SUPPORT_ACTIONS.map(item => `<button type="button" class="bio-policy-chip ${answer.supports.includes(item.id) ? 'selected' : ''}" data-social-support="${item.id}">
        <i class="fa-solid ${item.icon}"></i><span>${item.name}</span>
      </button>`).join('')}
    </div>
  </div>`;
  html += `<div class="bio-policy-column harmful">
    <h4><i class="fa-solid fa-triangle-exclamation"></i> Что усиливает стресс в отношениях</h4>
    <div class="bio-policy-grid">
      ${SOCIAL_STRESSORS.map(item => `<button type="button" class="bio-policy-chip ${answer.stressors.includes(item.id) ? 'selected' : ''}" data-social-stress="${item.id}">
        <i class="fa-solid ${item.icon}"></i><span>${item.name}</span>
      </button>`).join('')}
    </div>
  </div>`;
  html += '</div>';

  html += `<div class="social-relationships ${canRelationships ? 'show' : ''}" id="socialRelationships">
    <div class="social-relationships-head">
      <strong><i class="fa-solid fa-heart-crack"></i> Какие отношения страдают из-за стресса?</strong>
      <span><b id="socialRelationshipCount">${relationshipCount}</b> из 2 карточек</span>
    </div>
    <div class="social-relationship-grid">
      ${answer.relationships.map((relationship, index) => {
        const started = isSocialRelationshipStarted(relationship);
        const complete = isSocialRelationshipComplete(relationship);
        return `<div class="social-relationship-card ${started ? 'started' : ''} ${complete ? 'complete' : ''}" data-social-relationship-card="${index}">
          <div class="social-relationship-title">
            <span>${index + 1}</span>
            <strong>${index === 0 ? 'Важные отношения' : 'Ещё одни отношения'}</strong>
            ${index === 1 ? '<em>по желанию</em>' : ''}
          </div>
          <input class="input-field social-relationship-name" data-social-relationship-name="${index}" placeholder="Человек, роль или группа..." value="${escapeHtml(relationship.name)}">
          <textarea class="input-field social-relationship-impact" data-social-relationship-impact="${index}" placeholder="Как стресс влияет на эту связь?">${escapeHtml(relationship.impact)}</textarea>
          ${index === 1 ? '<button type="button" class="btn-back social-clear" id="btnSocialClearSecond"><i class="fa-solid fa-eraser"></i> Очистить вторую карточку</button>' : ''}
        </div>`;
      }).join('')}
    </div>
    <div class="penguin-hint ${hasIncomplete ? 'show' : ''}" id="socialRelationshipHint">Если вы начали вторую карточку, завершите её или очистите поля.</div>
  </div>`;

  html += `<div class="bio-ruler-plan ${canRelationships ? 'show' : ''}" id="socialRulerPlan">
    <strong><i class="fa-solid fa-scroll"></i> Социальный указ доброго правителя</strong>
    <label for="socialFocusStress">Какой стрессор я ослаблю первым?</label>
    <select class="input-field" id="socialFocusStress" ${canRelationships ? '' : 'disabled'}>
      <option value="">Выберите из отмеченного...</option>
      ${answer.stressors.map(id => `<option value="${id}" ${answer.focusStress === id ? 'selected' : ''}>${escapeHtml(getSocialItemName(SOCIAL_STRESSORS, id))}</option>`).join('')}
    </select>
    <textarea class="input-field" id="socialStressStep" placeholder="Один конкретный шаг снижения стресса сегодня...">${escapeHtml(answer.stressStep)}</textarea>
    <textarea class="input-field" id="socialConnectionAction" placeholder="Как я поддержу важные отношения сегодня?">${escapeHtml(answer.connectionAction)}</textarea>
    <button class="btn btn-secondary bio-ruler-commit" id="btnSocialRulerCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-people-group"></i> Снизить стресс в социальном круге
    </button>
  </div>`;

  html += `<div class="bio-ruler-result ${answer.committed ? 'show' : ''}" id="socialRulerResult">
    <strong>Социальный указ принят.</strong>
    <span>Сегодня я уменьшаю стресс там, где он разъединяет меня с людьми.</span>
  </div>`;
  html += '</div>';
  return html;
}

function renderSpiritualRuler() {
  const answer = normalizeSpiritualRulerAnswer();
  const canPlan = Boolean(answer.anchor && answer.connection);
  const canCommit = canPlan && answer.action.trim() && answer.when.trim() && answer.added;
  const compassFill = (answer.anchor ? 1 : 0) + (answer.connection ? 1 : 0) + (answer.action.trim() ? 1 : 0) + (answer.added ? 1 : 0);

  let html = `<div class="spiritual-ruler-task" style="--spiritual-fill:${compassFill};margin-top:12px">`;
  html += `<div class="spiritual-compass" aria-label="Компас смысла">
    <div class="spiritual-ring">
      <span class="spiritual-point past"><i class="fa-solid fa-clock-rotate-left"></i><em>Прошлое</em></span>
      <span class="spiritual-point future"><i class="fa-solid fa-route"></i><em>Будущее</em></span>
      <span class="spiritual-point planet"><i class="fa-solid fa-earth-americas"></i><em>Мир</em></span>
      <div class="spiritual-center"><i class="fa-solid fa-compass"></i><strong>${compassFill}/4</strong><span>смысл в действии</span></div>
    </div>
  </div>`;

  html += `<div class="spiritual-section">
    <strong><i class="fa-solid fa-star"></i> Что сегодня придаёт смысл</strong>
    <div class="spiritual-chip-grid">
      ${SPIRITUAL_MEANING_ANCHORS.map(anchor => `<button type="button" class="${answer.anchor === anchor.id ? 'selected' : ''}" data-spiritual-anchor="${anchor.id}">
        <i class="fa-solid ${anchor.icon}"></i><span>${anchor.name}</span>
      </button>`).join('')}
    </div>
  </div>`;

  html += `<div class="spiritual-section">
    <strong><i class="fa-solid fa-link"></i> С чем это соединяет меня сегодня</strong>
    <div class="spiritual-chip-grid">
      ${SPIRITUAL_CONNECTIONS.map(connection => `<button type="button" class="${answer.connection === connection.id ? 'selected' : ''}" data-spiritual-connection="${connection.id}">
        <i class="fa-solid ${connection.icon}"></i><span>${connection.name}</span>
      </button>`).join('')}
    </div>
  </div>`;

  html += `<div class="spiritual-plan ${canPlan ? 'show' : ''}" id="spiritualPlan">
    <label for="spiritualAction">Одно осмысленное дело сегодня</label>
    <textarea class="input-field" id="spiritualAction" placeholder="Например: позвонить близкому, помочь одному человеку, сделать шаг из своих ценностей">${escapeHtml(answer.action)}</textarea>
    <label for="spiritualWhen">Когда я добавлю или выполню это в списке дел</label>
    <input class="input-field" id="spiritualWhen" type="text" placeholder="Например: сегодня в 18:00 или верхняя строка списка задач" value="${escapeHtml(answer.when)}">
    <label class="spiritual-check">
      <input type="checkbox" id="spiritualAdded" ${answer.added ? 'checked' : ''}>
      <span>Я добавил(а) это в свой список дел</span>
    </label>
    <button class="btn btn-secondary spiritual-commit" id="btnSpiritualCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-check"></i> Закрепить осмысленное дело
    </button>
  </div>`;

  html += `<div class="spiritual-result ${answer.committed ? 'show' : ''}" id="spiritualResult">
    <strong>Осмысленное дело закреплено.</strong>
    <span>Сегодня смысл становится действием: одно дело уже есть в моём списке.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 29: Карта множества причин --- */
function renderMultiCauseMap() {
  const answer = normalizeMultiCauseMapAnswer();
  const causeCount = answer.causes.length;
  const canPlan = Boolean(answer.concern.trim() && causeCount >= 3);
  const canCommit = Boolean(canPlan && answer.focusCause && answer.why.trim() && answer.nextStep && answer.planned);
  const progress = Math.min(5, (answer.concern.trim() ? 1 : 0) + Math.min(3, causeCount) + (answer.nextStep ? 1 : 0));

  let html = `<div class="multi-cause-task" style="--multi-cause-progress:${progress};margin-top:12px">`;
  html += `<div class="multi-cause-board" aria-label="Карта множества причин">
    <div class="multi-cause-center">
      <i class="fa-solid fa-magnifying-glass-chart"></i>
      <strong id="multiCauseCount">${causeCount}</strong>
      <span>возможных причин</span>
    </div>
    <div class="multi-cause-note">
      <strong>Не ярлык, а расследование</strong>
      <span>Это не диагноз и не лечение. Это карта вопросов для оценки здоровья мозга и разговора со специалистом.</span>
    </div>
  </div>`;

  html += `<div class="spiritual-section">
    <strong><i class="fa-solid fa-circle-question"></i> Что я хочу понять глубже</strong>
    <textarea class="input-field" id="multiCauseConcern" placeholder="Например: подавленность, тревога, вспышки раздражения, проблемы с вниманием...">${escapeHtml(answer.concern)}</textarea>
  </div>`;

  html += `<div class="spiritual-section">
    <strong><i class="fa-solid fa-diagram-project"></i> Какие причины стоит проверить</strong>
    <div class="bio-policy-grid">
      ${MULTI_CAUSE_FACTORS.map(factor => `<button type="button" class="bio-policy-chip ${answer.causes.includes(factor.id) ? 'selected' : ''}" data-multi-cause="${factor.id}">
        <i class="fa-solid ${factor.icon}"></i><span>${factor.name}</span>
      </button>`).join('')}
    </div>
    <div class="penguin-hint show" id="multiCauseHint">Выберите минимум 3 направления. Чем шире карта, тем меньше риск застрять в одном ярлыке.</div>
  </div>`;

  html += `<div class="bio-ruler-plan ${canPlan ? 'show' : ''}" id="multiCausePlan">
    <strong><i class="fa-solid fa-clipboard-check"></i> Что я проверю первым</strong>
    <label for="multiCauseFocus">Первый фокус</label>
    <select class="input-field" id="multiCauseFocus" ${canPlan ? '' : 'disabled'}>
      <option value="">Выберите из отмеченного...</option>
      ${answer.causes.map(id => `<option value="${id}" ${answer.focusCause === id ? 'selected' : ''}>${escapeHtml(getMultiCauseName(id))}</option>`).join('')}
    </select>
    <textarea class="input-field" id="multiCauseWhy" placeholder="Почему это направление стоит проверить?">${escapeHtml(answer.why)}</textarea>
    <label for="multiCauseNextStep">Следующий шаг</label>
    <select class="input-field" id="multiCauseNextStep">
      <option value="">Выберите следующий шаг...</option>
      ${MULTI_CAUSE_NEXT_STEPS.map(step => `<option value="${step.id}" ${answer.nextStep === step.id ? 'selected' : ''}>${escapeHtml(step.name)}</option>`).join('')}
    </select>
    <a class="btn btn-secondary multi-cause-link" href="https://brainhealthassessment.com/" target="_blank" rel="noopener">
      <i class="fa-solid fa-up-right-from-square"></i> Открыть brainhealthassessment.com
    </a>
    <label class="spiritual-check">
      <input type="checkbox" id="multiCausePlanned" ${answer.planned ? 'checked' : ''}>
      <span>Я запланировал(а) оценку или конкретный следующий шаг</span>
    </label>
    <button class="btn btn-secondary bio-ruler-commit" id="btnMultiCauseCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-check"></i> Зафиксировать карту причин
    </button>
  </div>`;

  html += `<div class="bio-ruler-result ${answer.committed ? 'show' : ''}" id="multiCauseResult">
    <strong>Карта причин зафиксирована.</strong>
    <span>Я не свожу проблему к ярлыку. Я ищу причины и выбираю более точную помощь.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 30: Сообщение о здоровье мозга --- */
function renderBrainHealthMessage() {
  const answer = normalizeBrainHealthMessageAnswer();
  const canDraft = Boolean(answer.person.trim() && answer.reason.trim() && answer.angle);
  const canCommit = Boolean(canDraft && answer.message.trim() && answer.channel && answer.sent);
  const progress = (answer.person.trim() ? 1 : 0) + (answer.reason.trim() ? 1 : 0) + (answer.angle ? 1 : 0) + (answer.channel ? 1 : 0) + (answer.sent ? 1 : 0);

  let html = `<div class="multi-cause-task" style="--multi-cause-progress:${progress};margin-top:12px">`;
  html += `<div class="multi-cause-board" aria-label="Сообщение о здоровье мозга">
    <div class="multi-cause-center">
      <i class="fa-solid fa-brain"></i>
      <strong id="brainMessageProgress">${progress}/5</strong>
      <span>шагов сообщения</span>
    </div>
    <div class="multi-cause-note">
      <strong>Не ярлык, а здоровье мозга</strong>
      <span>Выберите одного человека и отправьте короткое, тёплое сообщение без давления и диагнозов.</span>
    </div>
  </div>`;

  html += `<div class="spiritual-section">
    <strong><i class="fa-solid fa-user"></i> Кому это может быть полезно</strong>
    <input class="input-field" id="brainMessagePerson" type="text" placeholder="Имя или роль человека" value="${escapeHtml(answer.person)}">
    <textarea class="input-field" id="brainMessageReason" placeholder="Почему именно этому человеку может помочь такой взгляд?">${escapeHtml(answer.reason)}</textarea>
  </div>`;

  html += `<div class="spiritual-section">
    <strong><i class="fa-solid fa-message"></i> Главный акцент сообщения</strong>
    <div class="bio-policy-grid">
      ${BRAIN_HEALTH_MESSAGE_ANGLES.map(angle => `<button type="button" class="bio-policy-chip ${answer.angle === angle.id ? 'selected' : ''}" data-brain-message-angle="${angle.id}">
        <i class="fa-solid ${angle.icon}"></i><span>${angle.name}</span>
      </button>`).join('')}
    </div>
  </div>`;

  html += `<div class="bio-ruler-plan ${canDraft ? 'show' : ''}" id="brainMessagePlan">
    <strong><i class="fa-solid fa-paper-plane"></i> Короткое сообщение</strong>
    <textarea class="input-field" id="brainMessageText" placeholder="Напишите короткое сообщение поддержки">${escapeHtml(answer.message)}</textarea>
    <label>Как я передам это человеку</label>
    <div class="spiritual-chip-grid">
      ${BRAIN_HEALTH_MESSAGE_CHANNELS.map(channel => `<button type="button" class="${answer.channel === channel.id ? 'selected' : ''}" data-brain-message-channel="${channel.id}">
        <i class="fa-solid ${channel.icon}"></i><span>${channel.name}</span>
      </button>`).join('')}
    </div>
    <label class="spiritual-check">
      <input type="checkbox" id="brainMessageSent" ${answer.sent ? 'checked' : ''}>
      <span>Я отправил(а) или лично передал(а) это сообщение</span>
    </label>
    <button class="btn btn-secondary bio-ruler-commit" id="btnBrainMessageCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-check"></i> Зафиксировать сообщение
    </button>
  </div>`;

  html += `<div class="bio-ruler-result ${answer.committed ? 'show' : ''}" id="brainMessageResult">
    <strong>Сообщение зафиксировано.</strong>
    <span>Сегодня я уменьшаю стыд и напоминаю: с лучшим мозгом приходит лучшая жизнь.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 31: Альтернативная причина --- */
function renderAlternativeReason() {
  const answer = normalizeAlternativeReasonAnswer();
  const canPlan = Boolean(answer.person.trim() && answer.behavior.trim() && answer.causes.length >= 2);
  const canCommit = Boolean(canPlan && answer.focusCause && answer.reframe.trim() && answer.nextStep && answer.bounded);
  const progress = (answer.person.trim() ? 1 : 0) + (answer.behavior.trim() ? 1 : 0) + (answer.causes.length >= 2 ? 1 : 0) + (answer.nextStep ? 1 : 0) + (answer.bounded ? 1 : 0);

  let html = `<div class="multi-cause-task" style="--multi-cause-progress:${progress};margin-top:12px">`;
  html += `<div class="multi-cause-board" aria-label="Карта альтернативной причины">
    <div class="multi-cause-center">
      <i class="fa-solid fa-eye"></i>
      <strong id="alternativeReasonProgress">${progress}/5</strong>
      <span>шагов переосмысления</span>
    </div>
    <div class="multi-cause-note">
      <strong>Сначала спросить почему</strong>
      <span>Это не диагноз и не оправдание вреда. Это тренировка более точного взгляда с сохранением границ.</span>
    </div>
  </div>`;

  html += `<div class="spiritual-section">
    <strong><i class="fa-solid fa-user"></i> Трудный человек или ситуация</strong>
    <input class="input-field" id="alternativeReasonPerson" type="text" placeholder="Имя, роль или краткое описание ситуации" value="${escapeHtml(answer.person)}">
    <textarea class="input-field" id="alternativeReasonBehavior" placeholder="Какое поведение вызывает напряжение?">${escapeHtml(answer.behavior)}</textarea>
  </div>`;

  html += `<div class="spiritual-section">
    <strong><i class="fa-solid fa-magnifying-glass"></i> Какие ещё причины могут быть возможны</strong>
    <div class="bio-policy-grid">
      ${ALTERNATIVE_REASON_CAUSES.map(cause => `<button type="button" class="bio-policy-chip ${answer.causes.includes(cause.id) ? 'selected' : ''}" data-alternative-cause="${cause.id}">
        <i class="fa-solid ${cause.icon}"></i><span>${cause.name}</span>
      </button>`).join('')}
    </div>
    <div class="penguin-hint show" id="alternativeReasonHint">Выберите минимум 2 возможные причины. Не нужно знать точно — достаточно открыть вопрос.</div>
  </div>`;

  html += `<div class="bio-ruler-plan ${canPlan ? 'show' : ''}" id="alternativeReasonPlan">
    <strong><i class="fa-solid fa-arrows-rotate"></i> Как я посмотрю иначе</strong>
    <label for="alternativeReasonFocus">Главный фокус</label>
    <select class="input-field" id="alternativeReasonFocus" ${canPlan ? '' : 'disabled'}>
      <option value="">Выберите из отмеченного...</option>
      ${answer.causes.map(id => `<option value="${id}" ${answer.focusCause === id ? 'selected' : ''}>${escapeHtml(getAlternativeReasonCauseName(id))}</option>`).join('')}
    </select>
    <textarea class="input-field" id="alternativeReasonReframe" placeholder="Более любопытная фраза вместо ярлыка: например, «Возможно, за этим есть причина, которую я не вижу»">${escapeHtml(answer.reframe)}</textarea>
    <label>Мягкий следующий шаг</label>
    <div class="spiritual-chip-grid">
      ${ALTERNATIVE_REASON_STEPS.map(step => `<button type="button" class="${answer.nextStep === step.id ? 'selected' : ''}" data-alternative-step="${step.id}">
        <i class="fa-solid ${step.icon}"></i><span>${step.name}</span>
      </button>`).join('')}
    </div>
    <label class="spiritual-check">
      <input type="checkbox" id="alternativeReasonBounded" ${answer.bounded ? 'checked' : ''}>
      <span>Я не ставлю диагноз и не оправдываю вредное поведение; я ищу более точное объяснение</span>
    </label>
    <button class="btn btn-secondary bio-ruler-commit" id="btnAlternativeReasonCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-check"></i> Зафиксировать новый взгляд
    </button>
  </div>`;

  html += `<div class="bio-ruler-result ${answer.committed ? 'show' : ''}" id="alternativeReasonResult">
    <strong>Новый взгляд зафиксирован.</strong>
    <span>Я могу держать границы и всё равно спрашивать: что ещё может стоять за этим поведением?</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 32: Пауза перед ярлыком --- */
function renderLabelPause() {
  const answer = normalizeLabelPauseAnswer();
  const canPlan = Boolean(answer.behavior.trim() && answer.label.trim() && answer.causes.length >= 2);
  const canCommit = Boolean(canPlan && answer.focusCause && answer.question.trim() && answer.nextStep && answer.bounded);
  const progress = (answer.behavior.trim() ? 1 : 0) + (answer.label.trim() ? 1 : 0) + (answer.causes.length >= 2 ? 1 : 0) + (answer.nextStep ? 1 : 0) + (answer.bounded ? 1 : 0);

  let html = `<div class="multi-cause-task" style="--multi-cause-progress:${progress};margin-top:12px">`;
  html += `<div class="multi-cause-board" aria-label="Пауза перед ярлыком">
    <div class="multi-cause-center">
      <i class="fa-solid fa-hand"></i>
      <strong id="labelPauseProgress">${progress}/5</strong>
      <span>шагов паузы</span>
    </div>
    <div class="multi-cause-note">
      <strong>Легко назвать плохим; труднее спросить почему</strong>
      <span>Это не диагноз и не оправдание вреда. Это короткая пауза между ярлыком и более точным вопросом.</span>
    </div>
  </div>`;

  html += `<div class="spiritual-section">
    <strong><i class="fa-solid fa-triangle-exclamation"></i> Поступок и первый ярлык</strong>
    <textarea class="input-field" id="labelPauseBehavior" placeholder="Какой поступок хочется назвать плохим?">${escapeHtml(answer.behavior)}</textarea>
    <input class="input-field" id="labelPauseLabel" type="text" placeholder="Какой поспешный ярлык или вывод приходит в голову?" value="${escapeHtml(answer.label)}">
  </div>`;

  html += `<div class="spiritual-section">
    <strong><i class="fa-solid fa-magnifying-glass"></i> Что может стоять за поведением</strong>
    <div class="bio-policy-grid">
      ${LABEL_PAUSE_CAUSES.map(cause => `<button type="button" class="bio-policy-chip ${answer.causes.includes(cause.id) ? 'selected' : ''}" data-label-cause="${cause.id}">
        <i class="fa-solid ${cause.icon}"></i><span>${cause.name}</span>
      </button>`).join('')}
    </div>
    <div class="penguin-hint show" id="labelPauseHint">Выберите минимум 2 гипотезы. Это вопросы для размышления, не выводы и не диагнозы.</div>
  </div>`;

  html += `<div class="bio-ruler-plan ${canPlan ? 'show' : ''}" id="labelPausePlan">
    <strong><i class="fa-solid fa-circle-question"></i> Вопрос вместо ярлыка</strong>
    <label for="labelPauseFocus">Главный фокус вопроса</label>
    <select class="input-field" id="labelPauseFocus" ${canPlan ? '' : 'disabled'}>
      <option value="">Выберите из отмеченного...</option>
      ${answer.causes.map(id => `<option value="${id}" ${answer.focusCause === id ? 'selected' : ''}>${escapeHtml(getLabelPauseCauseName(id))}</option>`).join('')}
    </select>
    <textarea class="input-field" id="labelPauseQuestion" placeholder="Например: «Что могло стоять за этим поступком, кроме того, что он плохой человек?»">${escapeHtml(answer.question)}</textarea>
    <label>Следующий шаг</label>
    <div class="spiritual-chip-grid">
      ${LABEL_PAUSE_STEPS.map(step => `<button type="button" class="${answer.nextStep === step.id ? 'selected' : ''}" data-label-step="${step.id}">
        <i class="fa-solid ${step.icon}"></i><span>${step.name}</span>
      </button>`).join('')}
    </div>
    <label class="spiritual-check">
      <input type="checkbox" id="labelPauseBounded" ${answer.bounded ? 'checked' : ''}>
      <span>Я ищу причины, но не оправдываю вред и не ставлю диагноз</span>
    </label>
    <button class="btn btn-secondary bio-ruler-commit" id="btnLabelPauseCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-check"></i> Зафиксировать паузу перед ярлыком
    </button>
  </div>`;

  html += `<div class="bio-ruler-result ${answer.committed ? 'show' : ''}" id="labelPauseResult">
    <strong>Пауза зафиксирована.</strong>
    <span>Сегодня я выбираю не поспешный ярлык, а более точный вопрос: почему?</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 33: Пять стадий большой идеи --- */
function renderRevolutionStage() {
  const answer = normalizeRevolutionStageAnswer();
  const canPlan = Boolean(answer.idea.trim() && answer.rejection.trim() && answer.stage);
  const canCommit = Boolean(canPlan && answer.motivator && answer.reason.trim() && answer.nextStep.trim() && answer.balanced);
  const progress = (answer.idea.trim() ? 1 : 0) + (answer.rejection.trim() ? 1 : 0) + (answer.stage ? 1 : 0) + (answer.motivator ? 1 : 0) + (answer.balanced ? 1 : 0);
  const stage = REVOLUTION_STAGES.find(item => item.id === answer.stage);

  let html = `<div class="multi-cause-task" style="--multi-cause-progress:${progress};margin-top:12px">`;
  html += `<div class="multi-cause-board" aria-label="Пять стадий большой идеи">
    <div class="multi-cause-center">
      <i class="fa-solid fa-lightbulb"></i>
      <strong id="revolutionProgress">${progress}/5</strong>
      <span>шагов устойчивости</span>
    </div>
    <div class="multi-cause-note">
      <strong>Критика не всегда означает конец</strong>
      <span>Определите стадию идеи и один трезвый следующий шаг, прежде чем сдаться из-за неприятия.</span>
    </div>
  </div>`;

  html += `<div class="spiritual-section">
    <strong><i class="fa-solid fa-lightbulb"></i> Большая идея и неприятие</strong>
    <textarea class="input-field" id="revolutionIdea" placeholder="Какая ваша большая идея была отвергнута или высмеяна?">${escapeHtml(answer.idea)}</textarea>
    <textarea class="input-field" id="revolutionRejection" placeholder="В чём именно было неприятие или критика?">${escapeHtml(answer.rejection)}</textarea>
  </div>`;

  html += `<div class="spiritual-section">
    <strong><i class="fa-solid fa-stairs"></i> На какой стадии находится идея</strong>
    <div class="bio-policy-grid">
      ${REVOLUTION_STAGES.map(item => `<button type="button" class="bio-policy-chip ${answer.stage === item.id ? 'selected' : ''}" title="${escapeHtml(item.desc)}" data-revolution-stage="${item.id}">
        <i class="fa-solid ${item.icon}"></i><span>${item.name}</span>
      </button>`).join('')}
    </div>
    <div class="penguin-hint ${stage ? 'show' : ''}" id="revolutionStageHint">${stage ? escapeHtml(stage.desc) : 'Выберите стадию, которая лучше всего описывает путь идеи сейчас.'}</div>
  </div>`;

  html += `<div class="bio-ruler-plan ${canPlan ? 'show' : ''}" id="revolutionPlan">
    <strong><i class="fa-solid fa-compass"></i> Как сохранить фокус</strong>
    <label>Главный источник мотивации</label>
    <div class="spiritual-chip-grid">
      ${REVOLUTION_MOTIVATORS.map(item => `<button type="button" class="${answer.motivator === item.id ? 'selected' : ''}" data-revolution-motivator="${item.id}">
        <i class="fa-solid ${item.icon}"></i><span>${item.name}</span>
      </button>`).join('')}
    </div>
    <textarea class="input-field" id="revolutionReason" placeholder="Почему эту идею стоит продолжать проверять или развивать?">${escapeHtml(answer.reason)}</textarea>
    <textarea class="input-field" id="revolutionNextStep" placeholder="Один следующий шаг без спора с критиками">${escapeHtml(answer.nextStep)}</textarea>
    <label class="spiritual-check">
      <input type="checkbox" id="revolutionBalanced" ${answer.balanced ? 'checked' : ''}>
      <span>Я учитываю критику, но не отдаю ей право решать, стоит ли продолжать</span>
    </label>
    <button class="btn btn-secondary bio-ruler-commit" id="btnRevolutionCommit" ${canCommit ? '' : 'disabled'}>
      <i class="fa-solid fa-check"></i> Зафиксировать стадию и следующий шаг
    </button>
  </div>`;

  html += `<div class="bio-ruler-result ${answer.committed ? 'show' : ''}" id="revolutionResult">
    <strong>Стадия зафиксирована.</strong>
    <span>Я могу видеть неприятие как стадию пути, а не как окончательный приговор идее.</span>
  </div>`;
  html += '</div>';
  return html;
}

/* --- День 34: Эксперимент на неделю --- */
function renderWeeklyExperiment() {
  const answer = normalizeWeeklyExperimentAnswer();
  return `<div class="multi-cause-task" id="weeklyExperiment" style="--multi-cause-progress:0;margin-top:12px">
    <div class="multi-cause-board" aria-label="Эксперимент на неделю">
      <div class="multi-cause-center">
        <i class="fa-solid fa-seedling" aria-hidden="true"></i>
        <strong id="experimentProgress">0/4</strong>
        <span>шагов заботы о мозге</span>
      </div>
      <div class="multi-cause-note">
        <strong>Одно действие убираю, одно сохраняю</strong>
        <span>Откажитесь от одной вредящей привычки на 7 дней и сделайте что-то полезное уже сегодня.</span>
      </div>
    </div>
    <div class="bio-policy-columns">
      <div class="bio-policy-column harmful spiritual-section">
        <strong><i class="fa-solid fa-pause" aria-hidden="true"></i> Убираю на неделю</strong>
        <label for="experimentHarmful">Какое привычное действие вредит моему мозгу?</label>
        <textarea class="input-field" id="experimentHarmful" data-experiment-field="harmfulAction" placeholder="Например: листаю ленту до поздней ночи">${escapeHtml(answer.harmfulAction)}</textarea>
        <label class="spiritual-check">
          <input type="checkbox" id="experimentPauseWeek" data-experiment-field="pauseWeek" ${answer.pauseWeek ? 'checked' : ''}>
          <span>Я отказываюсь от этого действия на ближайшие 7 дней</span>
        </label>
      </div>
      <div class="bio-policy-column good spiritual-section">
        <strong><i class="fa-solid fa-heart" aria-hidden="true"></i> Делаю сегодня</strong>
        <label for="experimentHelpful">Какое привычное действие помогает моему мозгу?</label>
        <textarea class="input-field" id="experimentHelpful" data-experiment-field="helpfulAction" placeholder="Например: гуляю на свежем воздухе">${escapeHtml(answer.helpfulAction)}</textarea>
        <label class="spiritual-check">
          <input type="checkbox" id="experimentHelpfulDone" data-experiment-field="helpfulDone" ${answer.helpfulDone ? 'checked' : ''}>
          <span>Я уже сделал(а) это полезное действие сегодня</span>
        </label>
      </div>
    </div>
    <div class="spiritual-section">
      <label for="experimentFeeling">Как я чувствую себя перед экспериментом? (необязательно)</label>
      <textarea class="input-field" id="experimentFeeling" data-experiment-field="feeling" placeholder="Сон, энергия, настроение, ясность мыслей...">${escapeHtml(answer.feeling)}</textarea>
      <p class="task-desc">Через неделю вернитесь к этой записи в «Мой путь» и сравните самочувствие.</p>
    </div>
    <button class="btn btn-secondary bio-ruler-commit" id="btnExperimentCommit" ${isWeeklyExperimentFilled(answer) ? '' : 'disabled'}>
      <i class="fa-solid fa-check" aria-hidden="true"></i> Зафиксировать эксперимент
    </button>
    <div class="bio-ruler-result ${answer.committed ? 'show' : ''}" id="experimentResult" role="status">
      <strong>Эксперимент зафиксирован.</strong>
      <span>Я создаю условия для восстановления: убираю одно вредящее действие на неделю и поддерживаю мозг уже сегодня.</span>
    </div>
  </div>`;
}

/* --- День 35: Пауза между мыслью и действием --- */
function renderThoughtPause() {
  const answer = normalizeThoughtPauseAnswer();
  return `<div class="multi-cause-task" id="thoughtPause" style="margin-top:12px">
    <div class="spiritual-section">
      <strong><i class="fa-solid fa-pause" aria-hidden="true"></i> Пауза между мыслью и действием</strong>
      <p class="task-desc" id="thoughtPauseHint">Содержание мыслей записывать не нужно. Укажите целые числа: сколько необычных мыслей вы заметили и сколько из них оставили без слов и действий. Второе число не может быть больше первого. Если сегодня таких мыслей не было, укажите 0 в обоих полях.</p>
      <div class="bio-policy-columns">
        <div class="spiritual-section">
          <label for="thoughtNoticedCount">Сколько необычных мыслей я заметил(а)?</label>
          <input class="input-field" type="number" min="0" step="1" inputmode="numeric" id="thoughtNoticedCount" data-thought-field="noticedCount" aria-describedby="thoughtPauseHint" value="${escapeHtml(answer.noticedCount)}">
        </div>
        <div class="spiritual-section">
          <label for="thoughtHeldBackCount">Сколько из них я не высказал(а) и не воплотил(а)?</label>
          <input class="input-field" type="number" min="0" step="1" inputmode="numeric" id="thoughtHeldBackCount" data-thought-field="heldBackCount" aria-describedby="thoughtPauseHint" value="${escapeHtml(answer.heldBackCount)}">
        </div>
      </div>
    </div>
    <div class="spiritual-section">
      <label for="thoughtSupport">Что помогло сделать паузу? (необязательно)</label>
      <textarea class="input-field" id="thoughtSupport" data-thought-field="support" placeholder="Например: сделал(а) вдох и дал(а) мысли пройти">${escapeHtml(answer.support)}</textarea>
      <label class="spiritual-check">
        <input type="checkbox" id="thoughtObserved" data-thought-field="observed" ${answer.observed ? 'checked' : ''}>
        <span>Я понаблюдал(а) за мыслями и за тем, как выбираю свою реакцию</span>
      </label>
    </div>
  </div>`;
}

/* --- День 36: Самый важный урок из 83 000 сканов --- */
function renderBrainScansTalk() {
  const answer = normalizeBrainScansTalkAnswer();
  return `<div class="multi-cause-task" id="brainScansTalk" style="margin-top:12px">
    <div class="spiritual-section">
      <strong><i class="fa-solid fa-circle-play" aria-hidden="true"></i> Самый важный урок из 83 000 сканов</strong>
      <p class="task-desc">Выступление Дэниела Амена на TEDxOrangeCoast. Откройте видео в новой вкладке, посмотрите его и вернитесь сюда, чтобы отметить просмотр.</p>
      <a class="btn btn-secondary multi-cause-link" id="brainScansTalkLink" href="${BRAIN_SCANS_TALK_URL}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Смотреть TEDx на YouTube (новая вкладка)</a>
      <label class="spiritual-check">
        <input type="checkbox" id="brainScansWatched" ${answer.watched ? 'checked' : ''}>
        <span>Я посмотрел(а) выступление «Самый важный урок из 83 000 сканов»</span>
      </label>
    </div>
    <div class="spiritual-section">
      <label for="brainScansTakeaway">Какая мысль из выступления запомнилась мне? (необязательно)</label>
      <textarea class="input-field" id="brainScansTakeaway" placeholder="Запишите мысль, к которой захотите вернуться">${escapeHtml(answer.takeaway)}</textarea>
    </div>
  </div>`;
}

/* --- День 37: Новый взгляд на трудный период --- */
function renderHopeReflection() {
  const answer = normalizeHopeReflectionAnswer();
  return `<div class="multi-cause-task" id="hopeReflection" style="margin-top:12px">
    <div class="spiritual-section">
      <label for="hopeSituation">Какой трудный период у себя или близкого я вспоминаю?</label>
      <p class="task-desc">Можно описать ситуацию коротко, без имён и личных подробностей.</p>
      <textarea class="input-field" id="hopeSituation" data-hope-field="situation" placeholder="Что тогда казалось безвыходным?">${escapeHtml(answer.situation)}</textarea>
    </div>
    <div class="spiritual-section">
      <label for="hopeConnection">Могло ли здоровье мозга быть связано с происходящим?</label>
      <p class="task-desc">Запишите своё размышление. Если не знаете, так и напишите: «Не знаю».</p>
      <textarea class="input-field" id="hopeConnection" data-hope-field="connection" placeholder="Что я вижу в этой ситуации сегодня?">${escapeHtml(answer.connection)}</textarea>
    </div>
    <div class="spiritual-section">
      <label for="hopeSupport">Какая поддержка могла бы помочь? (необязательно)</label>
      <textarea class="input-field" id="hopeSupport" data-hope-field="support" placeholder="Мысль, к которой хочется вернуться">${escapeHtml(answer.support)}</textarea>
    </div>
  </div>`;
}

/* --- День 38: Сохранить воспоминания --- */
function renderMemoryRescue() {
  const answer = normalizeMemoryRescueAnswer();
  return `<div class="multi-cause-task" id="memoryRescue" style="margin-top:12px">
    <div class="spiritual-section">
      <strong><i class="fa-solid fa-brain" aria-hidden="true"></i> Спаси свою память</strong>
      <p class="task-desc">Это опросник BRIGHT MINDS из дня 7. При первом открытии сюда переносятся сохранённые ответы того дня. Проверьте их или заполните тест сейчас; прежняя запись останется в «Мой путь».</p>
    </div>
    ${renderBrightMinds(38)}
    <label class="spiritual-check">
      <input type="checkbox" id="memoryReviewed" ${answer.reviewed ? 'checked' : ''}>
      <span>Я проверил(а) все ответы и ознакомился(лась) с результатом</span>
    </label>
  </div>`;
}

/* --- День 39: Быстрая ходьба --- */
function renderBriskWalk() {
  const answer = normalizeBriskWalkAnswer();
  return `<div class="multi-cause-task" id="briskWalk" style="margin-top:12px">
    <div class="spiritual-section">
      <strong><i class="fa-solid fa-person-walking" aria-hidden="true"></i> Быстрый шаг сегодня</strong>
      <p class="task-desc">После прогулки или привычного пути быстрым шагом вернитесь и отметьте выполнение.</p>
      <label class="spiritual-check">
        <input type="checkbox" id="briskWalkDone" data-walk-field="walked" ${answer.walked ? 'checked' : ''}>
        <span>Сегодня я прошёл(ла) быстрым шагом</span>
      </label>
    </div>
    <div class="spiritual-section">
      <label for="briskWalkMinutes">Сколько минут я шёл(шла) быстрым шагом? (необязательно)</label>
      <input class="input-field" type="number" min="0" step="any" inputmode="decimal" id="briskWalkMinutes" data-walk-field="minutes" aria-describedby="briskWalkHint" value="${escapeHtml(answer.minutes)}">
      <p class="task-desc" id="briskWalkHint">Если указываете время, оно должно быть больше нуля.</p>
      <label for="briskWalkNote">Где удалось пройти быстрее и как я себя чувствую? (необязательно)</label>
      <textarea class="input-field" id="briskWalkNote" data-walk-field="note" placeholder="Маршрут, самочувствие, впечатление">${escapeHtml(answer.note)}</textarea>
    </div>
  </div>`;
}

/* --- День 40: Место для игры --- */
function renderBrainSport() {
  const answer = normalizeBrainSportAnswer();
  return `<div class="multi-cause-task" id="brainSport" style="margin-top:12px">
    <div class="spiritual-section">
      <label for="brainSportChoice">Во что я хочу сыграть?</label>
      <select class="input-field" id="brainSportChoice" data-sport-field="sport">
        <option value="">Выберите игру</option>
        ${BRAIN_SPORTS.map(sport => `<option value="${sport}" ${answer.sport === sport ? 'selected' : ''}>${sport}</option>`).join('')}
      </select>
      <label for="brainSportPlace">Где можно сыграть хотя бы одну партию?</label>
      <textarea class="input-field" id="brainSportPlace" data-sport-field="place" placeholder="Название клуба, адрес площадки или место со столом">${escapeHtml(answer.place)}</textarea>
      <label for="brainSportDetails">Что поможет начать? (необязательно)</label>
      <textarea class="input-field" id="brainSportDetails" data-sport-field="details" placeholder="С кем сыграть, часы работы, как записаться или где взять ракетки">${escapeHtml(answer.details)}</textarea>
      <label class="spiritual-check">
        <input type="checkbox" id="brainSportFound" data-sport-field="found" ${answer.found ? 'checked' : ''}>
        <span>Я нашёл(ла) место, где можно сыграть</span>
      </label>
    </div>
  </div>`;
}

/* =========================================
   ИНИЦИАЛИЗАЦИЯ ЗАДАНИЙ (ПРИВЯЗКА СОБЫТИЙ)
   ========================================= */
function isDayTaskReady(dayId) {
  const answer = state.answers['day' + dayId];
  if (!answer) return false;
  switch (dayId) {
    case 1: return answer.sealed && answer.reasons.every(reason => reason.trim());
    case 2: return answer.friends.every(friend => friend.name.trim());
    case 3: return answer.flipped && answer.people.every(person => person.name.trim() && person.judgment.trim() && (!person.hasBrainIssue || person.how.trim()));
    case 4: return answer.achievements.every(item => item.achievement.trim() && item.who.trim());
    case 5: return answer.sent && answer.letter.trim();
    case 6: return Boolean(answer.reflection.trim());
    case 7: return answer.part1.every(Boolean) && answer.part2.every(Boolean);
    case 8: return answer.habits.length > 0 && answer.habits.every(habit => answer.links[habit].length > 0) && answer.worst.trim();
    case 9: return answer.promised && answer.strategy !== null && answer.date && answer.time && answer.frequency && (answer.frequency !== 'Другое' || answer.frequencyOther.trim());
    case 10: return answer.steals.every(item => item.trim()) && answer.strengthens.every(item => item.trim());
    case 11: return getFilledPotentialCount(answer) >= 3;
    case 12: return isBrainBattleReady(answer);
    case 13: return isInspirationReady(answer);
    case 14: return isNancyStepReady(answer);
    case 15: return isShepherdReady(answer);
    case 16: return isBrainStartReady(answer);
    case 17: return isHealthyRhythmReady(answer);
    case 18: return isAutomaticPhaseReady(answer);
    case 19: return isHealthMetricsReady(answer);
    case 20: return isFourCirclesReady(answer);
    case 21: return isSeahorseReserveReady(answer);
    case 22: return isAntPopulationReady(answer);
    case 23: return isPenguinPraiseReady(answer);
    case 24: return isButterflyPurposeReady(answer);
    case 25: return isBiologicalRulerReady(answer);
    case 26: return isPsychologicalRulerReady(answer);
    case 27: return isSocialRulerReady(answer);
    case 28: return isSpiritualRulerReady(answer);
    case 29: return isMultiCauseMapReady(answer);
    case 30: return isBrainHealthMessageReady(answer);
    case 31: return isAlternativeReasonReady(answer);
    case 32: return isLabelPauseReady(answer);
    case 33: return isRevolutionStageReady(answer);
    case 34: return answer.committed && isWeeklyExperimentFilled(answer);
    case 35: return isThoughtPauseReady(answer);
    case 36: return answer.watched === true;
    case 37: return Boolean(answer.situation.trim() && answer.connection.trim());
    case 38: return answer.reviewed && answer.part1.every(Boolean) && answer.part2.every(Boolean);
    case 39: return isBriskWalkReady(answer);
    case 40: return Boolean(answer.found && BRAIN_SPORTS.includes(answer.sport) && answer.place.trim());
    default: return false;
  }
}

let taskFieldId = 0;

function updateTaskCompletion(dayId) {
  if (activeDay !== dayId) return;
  const ready = Boolean(isDayTaskReady(dayId));
  const completeButton = document.getElementById('btnCompleteDay');
  if (completeButton) completeButton.disabled = !ready;
  const hint = document.getElementById('completionHint');
  if (hint) hint.hidden = ready;
  const task = document.getElementById('dayPractice');
  if (!task) return;
  task.querySelectorAll('button:not(.btn):not(.btn-back)').forEach(button => {
    button.setAttribute('aria-pressed', button.classList.contains('selected') || button.classList.contains('on'));
  });
  task.querySelectorAll('label:not([for])').forEach(label => {
    const sibling = label.nextElementSibling;
    if (!sibling || label.querySelector('input, textarea, select')) return;
    const input = sibling.matches('input, textarea, select') ? sibling : sibling.querySelector('input, textarea, select');
    if (!input) return;
    if (!input.id) input.id = `day${dayId}Field${++taskFieldId}`;
    label.htmlFor = input.id;
  });
  task.querySelectorAll('input:not([aria-label]), textarea:not([aria-label]), select:not([aria-label])').forEach(input => {
    if (!input.labels.length && input.placeholder) input.setAttribute('aria-label', input.placeholder);
  });
}

function initDayTask(dayId, mode) {
  // Кнопка "Назад"
  const backButton = document.getElementById('btnBack');
  if (backButton) backButton.addEventListener('click', () => {
    if (activeTab === 'today') activeTab = 'days';
    activeDay = null;
    updateNav();
    render();
  });

  if (mode === 'readonly') return;

  // Кнопка "Я прочитал"
  const markReadButton = document.getElementById('btnMarkRead');
  if (markReadButton) markReadButton.addEventListener('click', () => {
    unlockDayTask(dayId);
    saveState();
    showToast('Задание открыто');
    render();
    document.getElementById('dayPractice').scrollIntoView({ block: 'start' });
  });

  // Кнопка "Завершить день"
  const completeButton = document.getElementById('btnCompleteDay');
  if (completeButton) completeButton.addEventListener('click', () => {
    if (!isDayTaskReady(dayId) || isDayCompleted(dayId)) return;
    const previousDate = state.lastCompletedDate;
    completeDay(dayId);
    if (!saveState()) {
      state.completed = state.completed.filter(id => id !== dayId);
      state.lastCompletedDate = previousDate;
      return;
    }
    completeButton.disabled = true;
    showToast('День выполнен');
    activeDay = state.allUnlocked ? getCurrentDay() : null;
    render();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });

  // Подключает обработчики только для открытого и ещё не завершённого задания.
  if (isDayUnlocked(dayId) && !isDayCompleted(dayId)) {
    switch(DAYS[dayId-1].taskType) {
      case 'reasons': initReasons(); break;
      case 'friends': initFriends(); break;
      case 'judgment': initJudgment(dayId); break;
      case 'achievements': initAchievements(); break;
      case 'letter': initLetter(dayId); break;
      case 'loveScale': initLoveScale(); break;
      case 'brightMinds': initBrightMinds(dayId); break;
      case 'habits': initHabits(); break;
      case 'strategy': initStrategy(); break;
      case 'scales': initScales(dayId); break;
      case 'potential': initPotential(); break;
      case 'brainBattle': initBrainBattle(); break;
      case 'inspiration': initInspiration(); break;
      case 'nancyStep': initNancyStep(); break;
      case 'shepherd': initShepherd(); break;
      case 'brainStart': initBrainStart(); break;
      case 'healthyRhythm': initHealthyRhythm(); break;
      case 'automaticPhase': initAutomaticPhase(); break;
      case 'healthMetrics': initHealthMetrics(); break;
      case 'fourCircles': initFourCircles(); break;
      case 'seahorseReserve': initSeahorseReserve(); break;
      case 'antPopulation': initAntPopulation(); break;
      case 'penguinPraise': initPenguinPraise(); break;
      case 'butterflyPurpose': initButterflyPurpose(); break;
      case 'biologicalRuler': initBiologicalRuler(); break;
      case 'psychologicalRuler': initPsychologicalRuler(); break;
      case 'socialRuler': initSocialRuler(); break;
      case 'spiritualRuler': initSpiritualRuler(); break;
      case 'multiCauseMap': initMultiCauseMap(); break;
      case 'brainHealthMessage': initBrainHealthMessage(); break;
      case 'alternativeReason': initAlternativeReason(); break;
      case 'labelPause': initLabelPause(); break;
      case 'revolutionStage': initRevolutionStage(); break;
      case 'weeklyExperiment': initWeeklyExperiment(); break;
      case 'thoughtPause': initThoughtPause(); break;
      case 'brainScansTalk': initBrainScansTalk(); break;
      case 'hopeReflection': initHopeReflection(); break;
      case 'memoryRescue': initMemoryRescue(); break;
      case 'briskWalk': initBriskWalk(); break;
      case 'brainSport': initBrainSport(); break;
    }
    const task = document.getElementById('dayPractice');
    ['input', 'change', 'click'].forEach(event => task.addEventListener(event, () => updateTaskCompletion(dayId)));
    updateTaskCompletion(dayId);
  }
}

/* --- Инициализаторы --- */

function initReasons() {
  normalizeReasonsAnswer();
  function updateSealButton() {
    const sealButton = document.getElementById('btnSeal');
    if (!sealButton) return;
    sealButton.disabled = !state.answers.day1.reasons.every(reason => reason.trim());
  }
  document.querySelectorAll('.reason-input').forEach(input => {
    input.addEventListener('input', e => {
      state.answers.day1.reasons[+e.target.dataset.idx] = e.target.value;
      saveState();
      updateSealButton();
    });
  });
  const sealButton = document.getElementById('btnSeal');
  if (sealButton) sealButton.addEventListener('click', () => {
    const filled = state.answers.day1.reasons.filter(r => r.trim()).length;
    if (filled < 3) { showToast('Напишите все три причины', 'info'); return; }
    state.answers.day1.sealed = true;
    saveState();
    document.querySelectorAll('.envelope').forEach((env, i) => {
      setTimeout(() => env.classList.add('flipped'), i * 200);
    });
    setTimeout(() => { if (sealButton.isConnected) render(); }, 1100);
    showToast('Намерения зафиксированы');
  });
  updateSealButton();
}

function initFriends() {
  normalizeFriendsAnswer();
  function updateFriendRow(idx) {
    const friend = state.answers.day2.friends[idx];
    const hasName = Boolean(friend.name.trim());
    if (!hasName) {
      friend.helped = false;
      friend.type = '';
    }
    const button = document.querySelector(`.friend-toggle[data-idx="${idx}"]`);
    if (button) {
      button.disabled = !hasName;
      button.classList.toggle('on', hasName && friend.helped);
    }
    const select = document.querySelector(`.friend-type[data-idx="${idx}"]`);
    if (select) {
      select.value = friend.type;
      select.classList.toggle('show', hasName && friend.helped);
    }
  }
  document.querySelectorAll('.friend-name').forEach(input => {
    input.addEventListener('input', e => {
      const idx = +e.target.dataset.idx;
      state.answers.day2.friends[idx].name = e.target.value;
      updateFriendRow(idx);
      saveState();
      updateFriendInsight();
    });
  });
  document.querySelectorAll('.friend-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const idx = +button.dataset.idx;
      if (!state.answers.day2.friends[idx].name.trim()) {
        showToast('Сначала укажите имя друга', 'info');
        return;
      }
      state.answers.day2.friends[idx].helped = !state.answers.day2.friends[idx].helped;
      if (!state.answers.day2.friends[idx].helped) state.answers.day2.friends[idx].type = '';
      updateFriendRow(idx);
      const sel = document.querySelector(`.friend-type[data-idx="${idx}"]`);
      if (sel) sel.classList.toggle('show', state.answers.day2.friends[idx].helped);
      saveState(); updateFriendInsight();
    });
  });
  document.querySelectorAll('.friend-type').forEach(sel => {
    sel.addEventListener('change', e => { state.answers.day2.friends[+e.target.dataset.idx].type = e.target.value; saveState(); });
  });
  updateFriendInsight();
}

function updateFriendInsight() {
  const box = document.getElementById('friendInsight');
  if (!box) return;
  const progressText = document.querySelector('.friends-progress strong');
  const progressSubtext = document.querySelector('.friends-progress span');
  const progressCircle = document.querySelector('.friends-progress .progress');
  const total = state.answers.day2.friends.filter(f => f.name.trim()).length;
  const helped = state.answers.day2.friends.filter(f => f.name.trim() && f.helped).length;
  const progress = Math.round((total / 10) * 100);
  if (progressText) progressText.textContent = `${total} из 10 друзей`;
  if (progressSubtext) progressSubtext.textContent = `${progress}% списка заполнено`;
  if (progressCircle) progressCircle.style.strokeDashoffset = 113 - (113 * total / 10);
  if (total === 10) {
    const pct = Math.round((helped / 10) * 100);
    box.textContent = `Более 50% людей сталкиваются с проблемами психического здоровья. Ваш круг: ${pct}% — вы не одиноки.`;
    box.classList.add('show');
  } else {
    box.classList.remove('show');
  }
}

function initJudgment(dayId) {
  normalizeJudgmentAnswer();
  function updateFlipButton() {
    const flipButton = document.getElementById('btnFlipJudgment');
    if (!flipButton) return;
    const canFlip = state.answers.day3.people.every(person => person.name.trim() && person.judgment.trim() && (!person.hasBrainIssue || person.how.trim()));
    flipButton.disabled = !canFlip;
  }
  document.querySelectorAll('.j-name').forEach(input => {
    input.addEventListener('input', e => { state.answers.day3.people[+e.target.dataset.idx].name = e.target.value; saveState(); updateFlipButton(); });
  });
  document.querySelectorAll('.j-judgment').forEach(input => {
    input.addEventListener('input', e => { state.answers.day3.people[+e.target.dataset.idx].judgment = e.target.value; saveState(); updateFlipButton(); });
  });
  document.querySelectorAll('.judgment-card .toggle').forEach(button => {
    button.addEventListener('click', () => {
      const idx = +button.dataset.idx;
      state.answers.day3.people[idx].hasBrainIssue = !state.answers.day3.people[idx].hasBrainIssue;
      button.classList.toggle('on');
      const how = document.querySelector(`.j-how[data-idx="${idx}"]`);
      if (how) how.closest('.j-how-wrap').classList.toggle('show', state.answers.day3.people[idx].hasBrainIssue);
      saveState();
      updateFlipButton();
    });
  });
  document.querySelectorAll('.j-how').forEach(input => {
    input.addEventListener('input', e => { state.answers.day3.people[+e.target.dataset.idx].how = e.target.value; saveState(); updateFlipButton(); });
  });
  document.querySelectorAll('[data-remove]').forEach(button => {
    button.addEventListener('click', e => {
      e.stopPropagation();
      const idx = +button.dataset.remove;
      state.answers.day3.people.splice(idx, 1);
      saveState();
      render(); // перерендерим день
    });
  });
  const flipButton = document.getElementById('btnFlipJudgment');
  if (flipButton) flipButton.addEventListener('click', () => {
    const canFlip = state.answers.day3.people.every(person => person.name.trim() && person.judgment.trim() && (!person.hasBrainIssue || person.how.trim()));
    if (!canFlip) {
      showToast('Заполните все оставшиеся карточки', 'info');
      return;
    }
    state.answers.day3.flipped = true;
    saveState();
    document.querySelectorAll('.judgment-inner').forEach((el, i) => {
      setTimeout(() => el.classList.add('flipped'), i * 150);
    });
    flipButton.style.display = 'none';
    showToast('Посмотрите на них с новой стороны', 'info');
  });
}

function initAchievements() {
  normalizeAchievementsAnswer();
  document.querySelectorAll('.ach-what').forEach(input => {
    input.addEventListener('input', e => {
      const idx = +e.target.dataset.idx;
      state.answers.day4.achievements[idx].achievement = e.target.value;
      updateAlive(idx);
      saveState();
    });
  });
  document.querySelectorAll('.ach-who').forEach(input => {
    input.addEventListener('input', e => {
      const idx = +e.target.dataset.idx;
      state.answers.day4.achievements[idx].who = e.target.value;
      updateAlive(idx);
      saveState();
    });
  });
  function updateAlive(idx) {
    const a = state.answers.day4.achievements[idx];
    const card = document.getElementById('ach' + idx);
    if (card) {
      const alive = !!(a.achievement && a.who);
      card.classList.toggle('alive', alive);
      const creator = card.querySelector('.achievement-creator');
      if (creator) {
        creator.classList.toggle('show', alive);
        creator.innerHTML = `Мозг <strong>${escapeHtml(a.who)}</strong> создал это`;
      }
    }
    const insight = document.getElementById('achievementInsight');
    if (insight) insight.classList.toggle('show', state.answers.day4.achievements.every(item => item.achievement && item.who));
  }
  const insightButton = document.getElementById('btnAchievementInsight');
  if (insightButton) insightButton.addEventListener('click', () => {
    const insight = document.getElementById('achievementInsight');
    if (insight) insight.classList.add('celebrated');
    showToast('Ваш мозг — такого же масштаба', 'info');
  });
}

function initLetter(dayId) {
  if (!state.answers.day5) state.answers.day5 = { letter: '', sent: false };
  const textarea = document.getElementById('letterText');
  if (textarea) textarea.addEventListener('input', e => { state.answers.day5.letter = e.target.value; saveState(); });
  const sendButton = document.getElementById('btnSendLetter');
  if (sendButton) sendButton.addEventListener('click', () => {
    if (!state.answers.day5.letter.trim()) { showToast('Напишите хотя бы пару строк', 'info'); return; }
    state.answers.day5.sent = true;
    saveState();
    const card = document.getElementById('letterCard');
    if (card) { card.style.animation = 'flyUp 0.6s ease forwards'; }
    setTimeout(() => { if (sendButton.isConnected) render(); }, 700);
    showToast('Письмо доставлено');
  });
}

function initLoveScale() {
  if (!state.answers.day6) state.answers.day6 = { loveOthers: 5, loveBrain: 5, reflection: '' };
  const othersLoveSlider = document.getElementById('sliderOthers');
  const brainLoveSlider = document.getElementById('sliderBrain');
  const othersLoveValue = document.getElementById('valOthers');
  const brainLoveValue = document.getElementById('valBrain');

  function updateDiff() {
    const diff = state.answers.day6.loveOthers - state.answers.day6.loveBrain;
    const box = document.getElementById('diffResult');
    if (!box) return;
    const isBad = diff >= 3;
    box.className = `diff-result ${isBad ? 'bad' : 'good'} show`;
    box.textContent = isBad ? 'Ваш мозг получает меньше любви, чем он заслуживает' : 'Вы относитесь к своему мозгу с заботой';
    const textarea = document.getElementById('loveReflection');
    if (textarea) textarea.placeholder = isBad ? 'Почему возникает эта разница?' : 'Что помогает вам так заботиться о мозге?';
  }

  if (othersLoveSlider) othersLoveSlider.addEventListener('input', e => {
    state.answers.day6.loveOthers = +e.target.value;
    othersLoveValue.textContent = e.target.value;
    saveState(); updateDiff();
  });
  if (brainLoveSlider) brainLoveSlider.addEventListener('input', e => {
    state.answers.day6.loveBrain = +e.target.value;
    brainLoveValue.textContent = e.target.value;
    saveState(); updateDiff();
  });
  const textarea = document.getElementById('loveReflection');
  if (textarea) textarea.addEventListener('input', e => { state.answers.day6.reflection = e.target.value; saveState(); });
}

function initBrightMinds(dayId) {
  const answer = normalizeBrightMindsAnswer(dayId);
  const quiz = document.querySelector('.bright-quiz');
  function updateBrightMindsView() {
    const summary = document.querySelector('.risk-summary');
    const results = document.getElementById('brightQuizSummary');
    const target = results || summary;
    if (target) target.outerHTML = renderBrightMindsSummary(answer);
  }

  if (quiz) quiz.addEventListener('change', e => {
    const input = e.target.closest('[data-bright-part]');
    if (!input) return;
    const index = +input.dataset.brightIndex;
    if (input.dataset.brightPart === 'part1') answer.part1[index] = input.value;
    if (input.dataset.brightPart === 'part2') answer.part2[index] = input.value;
    if (dayId === 38) {
      answer.reviewed = false;
      document.getElementById('memoryReviewed').checked = false;
    }
    saveState();
    updateBrightMindsView();
  });
}

function initHabits() {
  const answer = normalizeHabitsAnswer();
  function updateHabitsView() {
    document.querySelectorAll('[data-habit]').forEach(tag => {
      tag.classList.toggle('selected', answer.habits.includes(tag.dataset.habit));
    });

    const links = document.getElementById('habitLinks');
    if (links) links.innerHTML = renderHabitLinks(answer);

    const table = document.getElementById('habitTableWrap');
    if (table) table.outerHTML = renderHabitsTable(answer);
  }

  const board = document.querySelector('.habits-board');
  if (board) board.addEventListener('click', e => {
    const habitTag = e.target.closest('[data-habit]');
    if (habitTag) {
      const tag = habitTag;
      const val = tag.dataset.habit;
      const arr = answer.habits;
      const idx = arr.indexOf(val);
      if (idx >= 0) {
        arr.splice(idx, 1);
        delete answer.links[val];
        if (answer.activeHabit === val) answer.activeHabit = arr[0] || '';
      } else {
        arr.push(val);
        answer.links[val] = [];
        answer.activeHabit = val;
      }
      syncHabitConsequences(answer);
      saveState();
      updateHabitsView();
      return;
    }

    const activeButton = e.target.closest('[data-active-habit]');
    if (activeButton) {
      answer.activeHabit = activeButton.dataset.activeHabit;
      saveState();
      updateHabitsView();
      return;
    }

    const consequenceTag = e.target.closest('[data-link-habit]');
    if (consequenceTag) {
      const habit = consequenceTag.dataset.linkHabit;
      const consequence = consequenceTag.dataset.consequence;
      if (!answer.links[habit]) answer.links[habit] = [];
      const arr = answer.links[habit];
      const idx = arr.indexOf(consequence);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(consequence);
      syncHabitConsequences(answer);
      saveState();
      updateHabitsView();
    }
  });

  const wa = document.getElementById('worstAspect');
  if (wa) wa.addEventListener('input', e => { answer.worst = e.target.value; saveState(); });
}

function initStrategy() {
  normalizeStrategyAnswer();
  function clearPromiseBadge() {
    state.answers.day9.promised = false;
    const badge = document.querySelector('.promise-badge');
    if (badge) badge.remove();
  }
  document.querySelectorAll('.strategy-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = +card.dataset.sidx;
      state.answers.day9.strategy = idx;
      clearPromiseBadge();
      saveState();
      document.querySelectorAll('.strategy-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const pl = document.getElementById('planner');
      if (pl) pl.classList.add('show');
    });
  });
  const pd = document.getElementById('planDate');
  if (pd) pd.addEventListener('change', e => { state.answers.day9.date = e.target.value; clearPromiseBadge(); saveState(); });
  const pt = document.getElementById('planTime');
  if (pt) pt.addEventListener('change', e => { state.answers.day9.time = e.target.value; clearPromiseBadge(); saveState(); });
  const pf = document.getElementById('planFreq');
  if (pf) pf.addEventListener('change', e => {
    state.answers.day9.frequency = e.target.value;
    if (state.answers.day9.frequency !== 'Другое') state.answers.day9.frequencyOther = '';
    const other = document.getElementById('planFreqOther');
    if (other) other.classList.toggle('show', state.answers.day9.frequency === 'Другое');
    clearPromiseBadge();
    saveState();
  });
  const pfo = document.getElementById('planFreqOther');
  if (pfo) pfo.addEventListener('input', e => { state.answers.day9.frequencyOther = e.target.value; clearPromiseBadge(); saveState(); });
  const promiseButton = document.getElementById('btnPromise');
  if (promiseButton) promiseButton.addEventListener('click', () => {
    if (state.answers.day9.strategy === null) {
      showToast('Сначала выберите стратегию', 'info');
      return;
    }
    const hasCustomFrequency = state.answers.day9.frequency !== 'Другое' || state.answers.day9.frequencyOther.trim();
    if (!state.answers.day9.date || !state.answers.day9.time || !state.answers.day9.frequency || !hasCustomFrequency) {
      showToast('Укажите дату, время и частоту', 'info');
      return;
    }
    state.answers.day9.promised = true;
    saveState();
    showToast('Обещание зафиксировано');
    const currentBadge = document.querySelector('.promise-badge');
    if (currentBadge) currentBadge.outerHTML = renderPromiseBadge(state.answers.day9);
    else promiseButton.closest('#planner').insertAdjacentHTML('afterend', renderPromiseBadge(state.answers.day9));
  });
}

function initScales(dayId) {
  normalizeScalesAnswer();
  function updateScales() {
    const sCount = state.answers.day10.steals.filter(item => item.trim()).length;
    const stCount = state.answers.day10.strengthens.filter(item => item.trim()).length;
    const balance = sCount - stCount;
    const angle = Math.max(-30, Math.min(30, (stCount - sCount) * 10));
    const leftPanOffset = Math.max(-12, Math.min(12, balance * 4));
    const rightPanOffset = Math.max(-12, Math.min(12, -balance * 4));
    const beam = document.getElementById('scalesBeam');
    if (beam) beam.style.transform = `rotate(${angle}deg)`;
    const leftPan = document.getElementById('scalesLeftPan');
    if (leftPan) leftPan.style.transform = `translateY(${leftPanOffset}px)`;
    const rightPan = document.getElementById('scalesRightPan');
    if (rightPan) rightPan.style.transform = `translateY(${rightPanOffset}px)`;
    const res = document.getElementById('scalesResult');
    if (res) {
      if (sCount + stCount === 6) {
        res.classList.add('show');
        if (sCount > stCount) {
          res.style.cssText = 'background:rgba(229,84,84,0.08);border:1px solid rgba(229,84,84,0.15);color:var(--danger)';
          res.textContent = 'Ваши весы склоняются в сторону разрушения — пора действовать';
        } else if (sCount < stCount) {
          res.style.cssText = 'background:rgba(74,232,138,0.08);border:1px solid rgba(74,232,138,0.15);color:var(--success)';
          res.textContent = 'Ваши весы склоняются в сторону укрепления — отличный баланс';
        } else {
          res.style.cssText = 'background:rgba(212,148,58,0.08);border:1px solid rgba(212,148,58,0.15);color:var(--accent)';
          res.textContent = 'Ваши весы в равновесии';
        }
      } else {
        res.classList.remove('show');
      }
    }
  }
  document.querySelectorAll('.scale-steal').forEach(input => {
    input.addEventListener('input', e => { state.answers.day10.steals[+e.target.dataset.idx] = e.target.value; saveState(); updateScales(); });
  });
  document.querySelectorAll('.scale-strengthen').forEach(input => {
    input.addEventListener('input', e => { state.answers.day10.strengthens[+e.target.dataset.idx] = e.target.value; saveState(); updateScales(); });
  });
}

function initPotential() {
  normalizePotentialAnswer();
  const task = document.querySelector('.potential-task');

  function updatePotentialCards() {
    const cards = document.querySelector('.potential-cards');
    if (cards) cards.innerHTML = renderPotentialCards(state.answers.day11);
  }

  function updatePotentialProgress() {
    const answer = state.answers.day11;
    const filledCount = getFilledPotentialCount(answer);
    document.querySelectorAll('.chain-link').forEach((link, index) => {
      const isOpen = index < filledCount;
      link.classList.toggle('open', isOpen);
      const icon = link.querySelector('i');
      if (icon) icon.className = `fa-solid ${isOpen ? 'fa-link-slash' : 'fa-link'}`;
    });
    const filled = document.getElementById('potentialFilled');
    if (filled) filled.textContent = filledCount;
    const result = document.getElementById('potentialResult');
    if (result) result.classList.toggle('show', filledCount >= 3);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = filledCount < 3;
  }

  if (task) {
    task.addEventListener('click', e => {
      const button = e.target.closest('[data-potential-area]');
      if (!button) return;
      const areaId = button.dataset.potentialArea;
      const index = state.answers.day11.areas.indexOf(areaId);
      if (index >= 0) {
        state.answers.day11.areas.splice(index, 1);
        delete state.answers.day11.improvements[areaId];
        delete state.answers.day11.importance[areaId];
      } else {
        state.answers.day11.areas.push(areaId);
        state.answers.day11.improvements[areaId] = '';
        state.answers.day11.importance[areaId] = 3;
      }
      saveState();
      button.classList.toggle('selected', index < 0);
      updatePotentialCards();
      updatePotentialProgress();
    });

    task.addEventListener('input', e => {
      if (e.target.matches('[data-potential-note]')) {
        state.answers.day11.improvements[e.target.dataset.potentialNote] = e.target.value;
        saveState();
        updatePotentialProgress();
        return;
      }
      if (e.target.matches('[data-potential-score]')) {
        const areaId = e.target.dataset.potentialScore;
        state.answers.day11.importance[areaId] = Number(e.target.value);
        const value = document.querySelector(`[data-potential-score-val="${areaId}"]`);
        if (value) value.textContent = e.target.value;
        saveState();
      }
    });
  }
  const firstStep = document.getElementById('potentialFirstStep');
  if (firstStep) firstStep.addEventListener('input', e => {
    state.answers.day11.firstStep = e.target.value;
    saveState();
  });
  updatePotentialProgress();
}

function initBrainBattle() {
  normalizeBrainBattleAnswer();
  function updateBrainBattleState() {
    const answer = state.answers.day12;
    const battle = document.querySelector('.brain-battle');
    if (battle) {
      battle.style.setProperty('--threat-power', Math.min(1, answer.threats.length / 4).toFixed(2));
      battle.style.setProperty('--ally-power', Math.min(1, answer.allies.length / 4).toFixed(2));
    }
    const threatCount = document.querySelector('.threat-count strong');
    if (threatCount) threatCount.textContent = answer.threats.length;
    const allyCount = document.querySelector('.ally-count strong');
    if (allyCount) allyCount.textContent = answer.allies.length;
    document.querySelectorAll('[data-battle-threat]').forEach(button => {
      button.classList.toggle('selected', answer.threats.includes(button.dataset.battleThreat));
    });
    document.querySelectorAll('[data-battle-ally]').forEach(button => {
      button.classList.toggle('selected', answer.allies.includes(button.dataset.battleAlly));
    });
    const canPlan = answer.threats.length > 0 && answer.allies.length > 0;
    const plan = document.getElementById('brainBattlePlan');
    if (plan) plan.classList.toggle('show', canPlan);
    const focus = document.getElementById('battleFocus');
    if (focus) {
      focus.disabled = !canPlan;
      focus.innerHTML = answer.threats.map(id => `<option value="${id}" ${answer.focusThreat === id ? 'selected' : ''}>${escapeHtml(getBrainBattleName(BRAIN_BATTLE_THREATS, id))}</option>`).join('');
    }
    updateBattleCompleteButton();
  }

  function updateBattleCompleteButton() {
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isBrainBattleReady(state.answers.day12);
  }

  document.querySelectorAll('[data-battle-threat]').forEach(button => {
    button.addEventListener('click', () => {
      const threatId = button.dataset.battleThreat;
      const index = state.answers.day12.threats.indexOf(threatId);
      if (index >= 0) {
        state.answers.day12.threats.splice(index, 1);
        if (state.answers.day12.focusThreat === threatId) state.answers.day12.focusThreat = state.answers.day12.threats[0] || '';
      } else {
        state.answers.day12.threats.push(threatId);
        if (!state.answers.day12.focusThreat) state.answers.day12.focusThreat = threatId;
      }
      saveState();
      updateBrainBattleState();
    });
  });
  document.querySelectorAll('[data-battle-ally]').forEach(button => {
    button.addEventListener('click', () => {
      const allyId = button.dataset.battleAlly;
      const index = state.answers.day12.allies.indexOf(allyId);
      if (index >= 0) state.answers.day12.allies.splice(index, 1);
      else state.answers.day12.allies.push(allyId);
      saveState();
      updateBrainBattleState();
    });
  });
  const focus = document.getElementById('battleFocus');
  if (focus) focus.addEventListener('change', e => {
    state.answers.day12.focusThreat = e.target.value;
    saveState();
    updateBattleCompleteButton();
  });
  const shieldAction = document.getElementById('battleShieldAction');
  if (shieldAction) shieldAction.addEventListener('input', e => {
    state.answers.day12.shieldAction = e.target.value;
    saveState();
    updateBattleCompleteButton();
  });
  updateBattleCompleteButton();
}

function initInspiration() {
  normalizeInspirationAnswer();
  function updateInspirationProgress() {
    const answer = state.answers.day13;
    const filledCount = getFilledInspirationCount(answer);
    document.querySelectorAll('.inspiration-ray').forEach((ray, index) => {
      ray.classList.toggle('active', index < filledCount);
    });
    document.querySelectorAll('.inspiration-card').forEach((card, index) => {
      const person = answer.people[index];
      card.classList.toggle('complete', Boolean(person && person.name.trim() && person.visibleChange.trim() && person.firstSignal.trim()));
    });
    const filled = document.getElementById('inspirationFilled');
    if (filled) filled.textContent = filledCount;
    const result = document.getElementById('inspirationResult');
    if (result) result.classList.toggle('show', filledCount >= 2);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isInspirationReady(answer);
  }

  document.querySelectorAll('[data-recovery-sign]').forEach(button => {
    button.addEventListener('click', () => {
      const signId = button.dataset.recoverySign;
      const index = state.answers.day13.signs.indexOf(signId);
      if (index >= 0) {
        state.answers.day13.signs.splice(index, 1);
      } else if (state.answers.day13.signs.length < 3) {
        state.answers.day13.signs.push(signId);
      } else {
        showToast('Выберите до трёх заметных признаков', 'info');
        return;
      }
      button.classList.toggle('selected', state.answers.day13.signs.includes(signId));
      saveState();
      updateInspirationProgress();
    });
  });
  document.querySelectorAll('.inspiration-name').forEach(input => {
    input.addEventListener('input', e => {
      state.answers.day13.people[+e.target.dataset.inspirationIdx].name = e.target.value;
      saveState();
      updateInspirationProgress();
    });
  });
  document.querySelectorAll('.inspiration-change').forEach(textarea => {
    textarea.addEventListener('input', e => {
      state.answers.day13.people[+e.target.dataset.inspirationChange].visibleChange = e.target.value;
      saveState();
      updateInspirationProgress();
    });
  });
  document.querySelectorAll('.inspiration-signal').forEach(input => {
    input.addEventListener('input', e => {
      state.answers.day13.people[+e.target.dataset.inspirationSignal].firstSignal = e.target.value;
      saveState();
      updateInspirationProgress();
    });
  });
  const firstStep = document.getElementById('inspirationFirstStep');
  if (firstStep) firstStep.addEventListener('input', e => {
    state.answers.day13.firstStep = e.target.value;
    saveState();
    updateInspirationProgress();
  });
  updateInspirationProgress();
}

function initNancyStep() {
  normalizeNancyStepAnswer();

  function clearNancyCommit() {
    state.answers.day14.committed = false;
    const result = document.getElementById('nancyResult');
    if (result) result.classList.remove('show');
  }

  function updateNancyState() {
    const answer = state.answers.day14;
    const selectedIndex = NANCY_STEPS.findIndex(step => step.id === answer.step);
    document.querySelectorAll('.nancy-stair').forEach((stair, index) => {
      stair.classList.toggle('selected', selectedIndex === index);
      stair.classList.toggle('passed', selectedIndex >= 0 && index < selectedIndex);
    });
    document.querySelectorAll('[data-nancy-step]').forEach(button => {
      button.classList.toggle('selected', button.dataset.nancyStep === answer.step);
    });
    document.querySelectorAll('[data-nancy-pace]').forEach(button => {
      button.classList.toggle('selected', button.dataset.nancyPace === answer.pace);
    });
    const progress = document.querySelector('.nancy-progress');
    if (progress) {
      progress.innerHTML = answer.step
        ? `Выбрана ступень: <strong>${escapeHtml(getNancyStepName(answer.step))}</strong>`
        : 'Выберите одну ступень, с которой реально начать сегодня.';
    }
    const plan = document.getElementById('nancyPlan');
    if (plan) plan.classList.toggle('show', Boolean(answer.step));
    const commitButton = document.getElementById('btnNancyCommit');
    if (commitButton) commitButton.disabled = !(answer.step && answer.pace && answer.microStep.trim() && answer.when.trim());
    const result = document.getElementById('nancyResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isNancyStepReady(answer);
  }

  document.querySelectorAll('[data-nancy-step]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day14.step = button.dataset.nancyStep;
      clearNancyCommit();
      saveState();
      updateNancyState();
    });
  });
  document.querySelectorAll('[data-nancy-pace]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day14.pace = button.dataset.nancyPace;
      clearNancyCommit();
      saveState();
      updateNancyState();
    });
  });
  const microStep = document.getElementById('nancyMicroStep');
  if (microStep) microStep.addEventListener('input', e => {
    state.answers.day14.microStep = e.target.value;
    clearNancyCommit();
    saveState();
    updateNancyState();
  });
  const when = document.getElementById('nancyWhen');
  if (when) when.addEventListener('input', e => {
    state.answers.day14.when = e.target.value;
    clearNancyCommit();
    saveState();
    updateNancyState();
  });
  const commitButton = document.getElementById('btnNancyCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    if (!(state.answers.day14.step && state.answers.day14.pace && state.answers.day14.microStep.trim() && state.answers.day14.when.trim())) {
      showToast('Выберите шаг и заполните план на сегодня', 'info');
      return;
    }
    state.answers.day14.committed = true;
    saveState();
    updateNancyState();
    showToast('Первый шаг зафиксирован');
  });
  updateNancyState();
}

function initShepherd() {
  normalizeShepherdAnswer();

  function updateShepherdState() {
    const answer = state.answers.day15;
    const filledCount = getFilledShepherdCount(answer);
    document.querySelectorAll('.shepherd-shields span').forEach((shield, index) => {
      shield.classList.toggle('active', index < filledCount);
    });
    document.querySelectorAll('.shepherd-card').forEach((card, index) => {
      const person = answer.people[index];
      card.classList.toggle('complete', Boolean(person && person.name.trim() && person.threats.length && person.support && person.action.trim()));
    });
    const filled = document.getElementById('shepherdFilled');
    if (filled) filled.textContent = filledCount;
    const result = document.getElementById('shepherdResult');
    if (result) result.classList.toggle('show', filledCount >= 2);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isShepherdReady(answer);
  }

  document.querySelectorAll('.shepherd-name').forEach(input => {
    input.addEventListener('input', e => {
      state.answers.day15.people[+e.target.dataset.shepherdIdx].name = e.target.value;
      saveState();
      updateShepherdState();
    });
  });
  document.querySelectorAll('[data-shepherd-threat]').forEach(button => {
    button.addEventListener('click', () => {
      const personIndex = +button.dataset.shepherdThreatIdx;
      const threatId = button.dataset.shepherdThreat;
      const threats = state.answers.day15.people[personIndex].threats;
      const index = threats.indexOf(threatId);
      if (index >= 0) threats.splice(index, 1);
      else threats.push(threatId);
      button.classList.toggle('selected', threats.includes(threatId));
      saveState();
      updateShepherdState();
    });
  });
  document.querySelectorAll('[data-shepherd-support]').forEach(button => {
    button.addEventListener('click', () => {
      const personIndex = +button.dataset.shepherdSupportIdx;
      state.answers.day15.people[personIndex].support = button.dataset.shepherdSupport;
      document.querySelectorAll(`[data-shepherd-support-idx="${personIndex}"]`).forEach(item => {
        item.classList.toggle('selected', item === button);
      });
      saveState();
      updateShepherdState();
    });
  });
  document.querySelectorAll('.shepherd-action').forEach(textarea => {
    textarea.addEventListener('input', e => {
      state.answers.day15.people[+e.target.dataset.shepherdAction].action = e.target.value;
      saveState();
      updateShepherdState();
    });
  });
  const boundary = document.getElementById('shepherdBoundary');
  if (boundary) boundary.addEventListener('input', e => {
    state.answers.day15.boundary = e.target.value;
    saveState();
    updateShepherdState();
  });
  updateShepherdState();
}

function initBrainStart() {
  normalizeBrainStartAnswer();

  function clearBrainStartCommit() {
    state.answers.day16.committed = false;
    const result = document.getElementById('brainStartResult');
    if (result) result.classList.remove('show');
  }

  function updateBrainStartState() {
    const answer = state.answers.day16;
    const hasDecision = Boolean(answer.decision);
    const canCommit = answer.decision &&
      (answer.decision !== 'other' || answer.customDecision.trim()) &&
      answer.awkward.length &&
      answer.support.trim() &&
      answer.nextStep.trim() &&
      answer.restart.trim();

    document.querySelectorAll('[data-start-horizon]').forEach(button => {
      button.classList.toggle('selected', Number(button.dataset.startHorizon) === answer.horizon);
    });
    const task = document.querySelector('.brain-start-task');
    if (task) {
      const horizonFill = answer.horizon === 30 ? 33 : answer.horizon === 60 ? 66 : 100;
      task.style.setProperty('--horizon-fill', `${horizonFill}%`);
    }
    document.querySelectorAll('[data-start-decision]').forEach(button => {
      button.classList.toggle('selected', button.dataset.startDecision === answer.decision);
    });
    document.querySelectorAll('[data-start-awkward]').forEach(button => {
      button.classList.toggle('selected', answer.awkward.includes(button.dataset.startAwkward));
    });
    const custom = document.getElementById('brainStartCustom');
    if (custom) custom.classList.toggle('show', answer.decision === 'other');
    const plan = document.getElementById('brainStartPlan');
    if (plan) plan.classList.toggle('show', hasDecision);
    const commitButton = document.getElementById('btnBrainStartCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('brainStartResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isBrainStartReady(answer);
  }

  document.querySelectorAll('[data-start-horizon]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day16.horizon = Number(button.dataset.startHorizon);
      clearBrainStartCommit();
      saveState();
      updateBrainStartState();
    });
  });
  document.querySelectorAll('[data-start-decision]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day16.decision = button.dataset.startDecision;
      clearBrainStartCommit();
      saveState();
      updateBrainStartState();
    });
  });
  const custom = document.getElementById('brainStartCustom');
  if (custom) custom.addEventListener('input', e => {
    state.answers.day16.customDecision = e.target.value;
    clearBrainStartCommit();
    saveState();
    updateBrainStartState();
  });
  document.querySelectorAll('[data-start-awkward]').forEach(button => {
    button.addEventListener('click', () => {
      const awkwardId = button.dataset.startAwkward;
      const index = state.answers.day16.awkward.indexOf(awkwardId);
      if (index >= 0) state.answers.day16.awkward.splice(index, 1);
      else state.answers.day16.awkward.push(awkwardId);
      clearBrainStartCommit();
      saveState();
      updateBrainStartState();
    });
  });
  const support = document.getElementById('brainStartSupport');
  if (support) support.addEventListener('input', e => {
    state.answers.day16.support = e.target.value;
    clearBrainStartCommit();
    saveState();
    updateBrainStartState();
  });
  const nextStep = document.getElementById('brainStartNextStep');
  if (nextStep) nextStep.addEventListener('input', e => {
    state.answers.day16.nextStep = e.target.value;
    clearBrainStartCommit();
    saveState();
    updateBrainStartState();
  });
  const restart = document.getElementById('brainStartRestart');
  if (restart) restart.addEventListener('input', e => {
    state.answers.day16.restart = e.target.value;
    clearBrainStartCommit();
    saveState();
    updateBrainStartState();
  });
  const commitButton = document.getElementById('btnBrainStartCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day16;
    const canCommit = answer.decision &&
      (answer.decision !== 'other' || answer.customDecision.trim()) &&
      answer.awkward.length &&
      answer.support.trim() &&
      answer.nextStep.trim() &&
      answer.restart.trim();
    if (!canCommit) {
      showToast('Выберите решение и заполните карту адаптации', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateBrainStartState();
    showToast('Решение зафиксировано');
  });
  updateBrainStartState();
}

function initHealthyRhythm() {
  normalizeHealthyRhythmAnswer();

  function updateHealthyRhythmState() {
    const answer = state.answers.day17;
    const canAnswerQuestions = answer.changes.length >= 2;
    const rhythmFill = Math.min(100, Math.max(22, answer.changes.length * 18 + (answer.changed.trim() ? 12 : 0) + (answer.support.trim() ? 12 : 0)));
    const task = document.querySelector('.healthy-rhythm-task');
    if (task) task.style.setProperty('--rhythm-fill', `${rhythmFill}%`);
    document.querySelectorAll('[data-rhythm-change]').forEach(button => {
      button.classList.toggle('selected', answer.changes.includes(button.dataset.rhythmChange));
    });
    document.querySelectorAll('.rhythm-wave span').forEach((segment, index) => {
      segment.classList.toggle('active', index < answer.changes.length);
    });
    document.querySelectorAll('[data-rhythm-return]').forEach(button => {
      button.classList.toggle('selected', button.dataset.rhythmReturn === answer.returnMode);
    });
    const count = document.getElementById('rhythmChangeCount');
    if (count) count.textContent = answer.changes.length;
    const questions = document.getElementById('rhythmQuestions');
    if (questions) questions.classList.toggle('show', canAnswerQuestions);
    const returnBlock = document.getElementById('rhythmReturn');
    if (returnBlock) returnBlock.classList.toggle('show', canAnswerQuestions);
    const result = document.getElementById('healthyRhythmResult');
    if (result) result.classList.toggle('show', isHealthyRhythmReady(answer));
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isHealthyRhythmReady(answer);
  }

  document.querySelectorAll('[data-rhythm-change]').forEach(button => {
    button.addEventListener('click', () => {
      const changeId = button.dataset.rhythmChange;
      const index = state.answers.day17.changes.indexOf(changeId);
      if (index >= 0) {
        state.answers.day17.changes.splice(index, 1);
      } else if (state.answers.day17.changes.length < 5) {
        state.answers.day17.changes.push(changeId);
      } else {
        showToast('Выберите до пяти заметных изменений', 'info');
        return;
      }
      saveState();
      updateHealthyRhythmState();
    });
  });

  const changed = document.getElementById('healthyRhythmChanged');
  if (changed) changed.addEventListener('input', e => {
    state.answers.day17.changed = e.target.value;
    saveState();
    updateHealthyRhythmState();
  });
  const support = document.getElementById('healthyRhythmSupport');
  if (support) support.addEventListener('input', e => {
    state.answers.day17.support = e.target.value;
    saveState();
    updateHealthyRhythmState();
  });
  document.querySelectorAll('[data-rhythm-return]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day17.returnMode = button.dataset.rhythmReturn;
      saveState();
      updateHealthyRhythmState();
    });
  });
  const returnStep = document.getElementById('healthyRhythmReturnStep');
  if (returnStep) returnStep.addEventListener('input', e => {
    state.answers.day17.returnStep = e.target.value;
    saveState();
    updateHealthyRhythmState();
  });
  updateHealthyRhythmState();
}

function initAutomaticPhase() {
  normalizeAutomaticPhaseAnswer();

  function updateAutomaticPhaseState() {
    const answer = state.answers.day18;
    const canFillWays = answer.habits.length >= 3;
    const filledWays = getFilledAutomaticWaysCount(answer);
    const pilotFill = Math.min(100, Math.max(18, answer.habits.length * 11 + filledWays * 16 + (answer.returnMode ? 10 : 0)));
    const task = document.querySelector('.automatic-task');
    if (task) task.style.setProperty('--pilot-fill', `${pilotFill}%`);
    document.querySelectorAll('[data-auto-habit]').forEach(button => {
      button.classList.toggle('selected', answer.habits.includes(button.dataset.autoHabit));
    });
    document.querySelectorAll('.automatic-dots span').forEach((dot, index) => {
      dot.classList.toggle('active', index < Math.min(3, answer.habits.length));
    });
    const count = document.getElementById('automaticHabitCount');
    if (count) count.textContent = answer.habits.length;
    const ways = document.getElementById('automaticWays');
    if (ways) ways.classList.toggle('show', canFillWays);
    const returnBlock = document.getElementById('automaticReturn');
    if (returnBlock) returnBlock.classList.toggle('show', canFillWays);
    document.querySelectorAll('.automatic-way-card').forEach((card, index) => {
      const way = answer.ways[index];
      card.classList.toggle('complete', Boolean(way && way.text.trim()));
    });
    document.querySelectorAll('[data-auto-impact-val]').forEach(value => {
      const index = Number(value.dataset.autoImpactVal);
      value.textContent = answer.ways[index] ? answer.ways[index].impact : 3;
    });
    document.querySelectorAll('[data-auto-return]').forEach(button => {
      button.classList.toggle('selected', button.dataset.autoReturn === answer.returnMode);
    });
    const result = document.getElementById('automaticResult');
    if (result) result.classList.toggle('show', isAutomaticPhaseReady(answer));
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isAutomaticPhaseReady(answer);
  }

  document.querySelectorAll('[data-auto-habit]').forEach(button => {
    button.addEventListener('click', () => {
      const habitId = button.dataset.autoHabit;
      const index = state.answers.day18.habits.indexOf(habitId);
      if (index >= 0) {
        state.answers.day18.habits.splice(index, 1);
      } else if (state.answers.day18.habits.length < 6) {
        state.answers.day18.habits.push(habitId);
      } else {
        showToast('Выберите до шести привычек для автопилота', 'info');
        return;
      }
      saveState();
      updateAutomaticPhaseState();
    });
  });

  document.querySelectorAll('.automatic-way-text').forEach(textarea => {
    textarea.addEventListener('input', e => {
      state.answers.day18.ways[+e.target.dataset.autoWay].text = e.target.value;
      saveState();
      updateAutomaticPhaseState();
    });
  });

  document.querySelectorAll('[data-auto-impact]').forEach(slider => {
    slider.addEventListener('input', e => {
      const index = +e.target.dataset.autoImpact;
      state.answers.day18.ways[index].impact = Number(e.target.value);
      saveState();
      updateAutomaticPhaseState();
    });
  });

  document.querySelectorAll('[data-auto-return]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day18.returnMode = button.dataset.autoReturn;
      saveState();
      updateAutomaticPhaseState();
    });
  });

  const returnPhrase = document.getElementById('automaticReturnPhrase');
  if (returnPhrase) returnPhrase.addEventListener('input', e => {
    state.answers.day18.returnPhrase = e.target.value;
    saveState();
    updateAutomaticPhaseState();
  });

  updateAutomaticPhaseState();
}

function initHealthMetrics() {
  normalizeHealthMetricsAnswer();

  function clearMetricsCommit() {
    state.answers.day19.committed = false;
    const result = document.getElementById('metricsResult');
    if (result) result.classList.remove('show');
  }

  function updateHealthMetricsState() {
    const answer = state.answers.day19;
    const selectedMetricIds = Object.keys(answer.statuses);
    const fill = Math.min(100, Math.round((selectedMetricIds.length / HEALTH_METRICS.length) * 100));
    const task = document.querySelector('.health-metrics-task');
    if (task) task.style.setProperty('--metrics-fill', `${fill}%`);
    const ringCount = document.querySelector('.metrics-ring strong');
    if (ringCount) ringCount.textContent = selectedMetricIds.length;
    const ringFill = document.querySelector('.metrics-ring-fill');
    if (ringFill) ringFill.style.strokeDashoffset = 301.6 - (301.6 * selectedMetricIds.length / HEALTH_METRICS.length);
    document.querySelectorAll('.metric-card').forEach(card => {
      const metricId = card.dataset.metricCard;
      card.classList.toggle('selected', Boolean(answer.statuses[metricId]));
    });
    document.querySelectorAll('[data-metric-status]').forEach(button => {
      const metricId = button.dataset.metricId;
      button.classList.toggle('selected', answer.statuses[metricId] === button.dataset.metricStatus);
    });
    const riskCount = document.getElementById('healthRiskCount');
    if (riskCount) riskCount.textContent = answer.risks.length;
    document.querySelectorAll('[data-health-risk]').forEach(button => {
      button.classList.toggle('selected', answer.risks.includes(button.dataset.healthRisk));
    });
    const commitButton = document.getElementById('btnMetricsCommit');
    if (commitButton) {
      commitButton.disabled = !(selectedMetricIds.length >= 3 && answer.specialist.trim() && answer.contactWhen.trim() && answer.request.trim());
    }
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isHealthMetricsReady(answer);
  }

  const task = document.querySelector('.health-metrics-task');
  if (task) {
    task.addEventListener('click', e => {
      const button = e.target.closest('[data-metric-status]');
      if (!button) return;
      const metricId = button.dataset.metricId;
      const status = button.dataset.metricStatus;
      if (state.answers.day19.statuses[metricId] === status) {
        delete state.answers.day19.statuses[metricId];
        delete state.answers.day19.values[metricId];
      } else {
        state.answers.day19.statuses[metricId] = status;
        if (status !== 'know') delete state.answers.day19.values[metricId];
      }
      clearMetricsCommit();
      saveState();
      const knownMetrics = document.getElementById('knownMetrics');
      if (knownMetrics) knownMetrics.outerHTML = renderKnownMetrics(state.answers.day19);
      updateHealthMetricsState();
    });

    task.addEventListener('input', e => {
      if (!e.target.matches('.metric-value')) return;
      state.answers.day19.values[e.target.dataset.metricValue] = e.target.value;
      saveState();
    });
  }

  document.querySelectorAll('[data-health-risk]').forEach(button => {
    button.addEventListener('click', () => {
      const riskId = button.dataset.healthRisk;
      const index = state.answers.day19.risks.indexOf(riskId);
      if (index >= 0) state.answers.day19.risks.splice(index, 1);
      else state.answers.day19.risks.push(riskId);
      saveState();
      updateHealthMetricsState();
    });
  });

  const specialist = document.getElementById('metricsSpecialist');
  if (specialist) specialist.addEventListener('input', e => {
    state.answers.day19.specialist = e.target.value;
    clearMetricsCommit();
    saveState();
    updateHealthMetricsState();
  });
  const when = document.getElementById('metricsWhen');
  if (when) when.addEventListener('input', e => {
    state.answers.day19.contactWhen = e.target.value;
    clearMetricsCommit();
    saveState();
    updateHealthMetricsState();
  });
  const request = document.getElementById('metricsRequest');
  if (request) request.addEventListener('input', e => {
    state.answers.day19.request = e.target.value;
    clearMetricsCommit();
    saveState();
    updateHealthMetricsState();
  });

  const commitButton = document.getElementById('btnMetricsCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day19;
    const canCommit = Object.keys(answer.statuses).length >= 3 && answer.specialist.trim() && answer.contactWhen.trim() && answer.request.trim();
    if (!canCommit) {
      showToast('Выберите минимум три показателя и заполните следующий шаг', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateHealthMetricsState();
    const result = document.getElementById('metricsResult');
    if (result) result.classList.add('show');
    showToast('План измерений зафиксирован');
  });

  updateHealthMetricsState();
}

function initFourCircles() {
  normalizeFourCirclesAnswer();

  function clearFourCirclesCommit() {
    state.answers.day20.committed = false;
    const result = document.getElementById('fourCirclesResult');
    if (result) result.classList.remove('show');
  }

  function updateFourCirclesState() {
    const answer = state.answers.day20;
    const filledCount = getFourCirclesFilledCount(answer);
    const canFocus = filledCount === FOUR_CIRCLES.length;
    const averageRating = Math.round(FOUR_CIRCLES.reduce((sum, circle) => sum + answer.ratings[circle.id], 0) / FOUR_CIRCLES.length * 10) / 10;
    const task = document.querySelector('.four-circles-task');
    if (task) task.style.setProperty('--circle-fill', `${filledCount * 25}%`);
    document.querySelectorAll('.four-circle-card').forEach(card => {
      const circleId = card.dataset.fourCircleCard;
      const complete = answer.strengths[circleId].trim() && answer.vulnerabilities[circleId].trim();
      card.classList.toggle('complete', complete);
    });
    document.querySelectorAll('.four-circle-node').forEach((node, index) => {
      const circle = FOUR_CIRCLES[index];
      const complete = answer.strengths[circle.id].trim() && answer.vulnerabilities[circle.id].trim();
      node.classList.toggle('complete', complete);
    });
    document.querySelectorAll('[data-four-rating-val]').forEach(value => {
      value.textContent = answer.ratings[value.dataset.fourRatingVal] || 3;
    });
    document.querySelectorAll('[data-four-focus]').forEach(button => {
      button.classList.toggle('selected', button.dataset.fourFocus === answer.focus);
    });
    const filled = document.getElementById('fourCirclesFilled');
    if (filled) filled.textContent = filledCount;
    const average = document.getElementById('fourCirclesAverage');
    if (average) average.textContent = averageRating;
    const focusBlock = document.getElementById('fourCirclesFocus');
    if (focusBlock) focusBlock.classList.toggle('show', canFocus);
    const commitButton = document.getElementById('btnFourCirclesCommit');
    if (commitButton) commitButton.disabled = !(canFocus && answer.focus && answer.action.trim());
    const result = document.getElementById('fourCirclesResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isFourCirclesReady(answer);
  }

  document.querySelectorAll('[data-four-rating]').forEach(slider => {
    slider.addEventListener('input', e => {
      state.answers.day20.ratings[e.target.dataset.fourRating] = Number(e.target.value);
      clearFourCirclesCommit();
      saveState();
      updateFourCirclesState();
    });
  });

  document.querySelectorAll('.four-strength').forEach(textarea => {
    textarea.addEventListener('input', e => {
      state.answers.day20.strengths[e.target.dataset.fourStrength] = e.target.value;
      clearFourCirclesCommit();
      saveState();
      updateFourCirclesState();
    });
  });

  document.querySelectorAll('.four-vulnerability').forEach(textarea => {
    textarea.addEventListener('input', e => {
      state.answers.day20.vulnerabilities[e.target.dataset.fourVulnerability] = e.target.value;
      clearFourCirclesCommit();
      saveState();
      updateFourCirclesState();
    });
  });

  document.querySelectorAll('[data-four-focus]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day20.focus = button.dataset.fourFocus;
      clearFourCirclesCommit();
      saveState();
      updateFourCirclesState();
    });
  });

  const action = document.getElementById('fourCirclesAction');
  if (action) action.addEventListener('input', e => {
    state.answers.day20.action = e.target.value;
    clearFourCirclesCommit();
    saveState();
    updateFourCirclesState();
  });

  const commitButton = document.getElementById('btnFourCirclesCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day20;
    const canCommit = getFourCirclesFilledCount(answer) === FOUR_CIRCLES.length && answer.focus && answer.action.trim();
    if (!canCommit) {
      showToast('Заполните четыре круга и один балансирующий шаг', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateFourCirclesState();
    showToast('Карта четырёх кругов собрана');
  });

  updateFourCirclesState();
}

function initSeahorseReserve() {
  normalizeSeahorseReserveAnswer();

  function clearSeahorseCommit() {
    state.answers.day21.committed = false;
    const result = document.getElementById('seahorseResult');
    if (result) result.classList.remove('show');
  }

  function updateSeahorseState() {
    const answer = state.answers.day21;
    const nourishCount = getFilledSeahorseCount(answer, 'nourish');
    const toxicCount = getFilledSeahorseCount(answer, 'toxic');
    const canPlan = nourishCount === 3 && toxicCount === 3;
    const canCommit = canPlan && answer.focusToxic && answer.protection.trim();
    const habitatFill = Math.round(((nourishCount + (3 - toxicCount)) / 6) * 100);
    const task = document.querySelector('.seahorse-task');
    if (task) {
      task.style.setProperty('--habitat-fill', `${habitatFill}%`);
      task.style.setProperty('--nourish-level', nourishCount);
      task.style.setProperty('--toxic-level', toxicCount);
    }
    document.querySelectorAll('.seahorse-bubbles span').forEach((bubble, index) => {
      bubble.classList.toggle('active', index < nourishCount * 2);
    });
    const nourishCounter = document.getElementById('seahorseNourishCount');
    if (nourishCounter) nourishCounter.textContent = nourishCount;
    const toxicCounter = document.getElementById('seahorseToxicCount');
    if (toxicCounter) toxicCounter.textContent = toxicCount;
    const plan = document.getElementById('seahorsePlan');
    if (plan) plan.classList.toggle('show', canPlan);
    const focus = document.getElementById('seahorseFocus');
    if (focus) {
      focus.innerHTML = '<option value="">Выберите из своего списка...</option>' +
        answer.toxic
          .filter(item => item.trim())
          .map(item => `<option value="${escapeHtml(item)}" ${answer.focusToxic === item ? 'selected' : ''}>${escapeHtml(item)}</option>`)
          .join('');
      focus.disabled = !canPlan;
      focus.value = answer.focusToxic;
    }
    const commitButton = document.getElementById('btnSeahorseCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('seahorseResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isSeahorseReserveReady(answer);
  }

  document.querySelectorAll('.seahorse-input').forEach(input => {
    input.addEventListener('input', e => {
      const kind = e.target.dataset.seahorseKind;
      const index = +e.target.dataset.seahorseIdx;
      state.answers.day21[kind][index] = e.target.value;
      if (kind === 'toxic' && !state.answers.day21.toxic.includes(state.answers.day21.focusToxic)) {
        state.answers.day21.focusToxic = '';
      }
      clearSeahorseCommit();
      saveState();
      updateSeahorseState();
    });
  });

  document.querySelectorAll('[data-seahorse-suggestion]').forEach(button => {
    button.addEventListener('click', () => {
      const kind = button.dataset.seahorseSuggestionKind;
      const value = button.dataset.seahorseSuggestion;
      const answer = state.answers.day21;
      if (answer[kind].includes(value)) {
        showToast('Это действие уже есть в списке', 'info');
        return;
      }
      const emptyIndex = answer[kind].findIndex(item => !item.trim());
      if (emptyIndex === -1) {
        showToast('Все три поля уже заполнены', 'info');
        return;
      }
      answer[kind][emptyIndex] = value;
      const input = document.querySelector(`.seahorse-input[data-seahorse-kind="${kind}"][data-seahorse-idx="${emptyIndex}"]`);
      if (input) input.value = value;
      clearSeahorseCommit();
      saveState();
      updateSeahorseState();
    });
  });

  const focus = document.getElementById('seahorseFocus');
  if (focus) focus.addEventListener('change', e => {
    state.answers.day21.focusToxic = e.target.value;
    clearSeahorseCommit();
    saveState();
    updateSeahorseState();
  });

  const protection = document.getElementById('seahorseProtection');
  if (protection) protection.addEventListener('input', e => {
    state.answers.day21.protection = e.target.value;
    clearSeahorseCommit();
    saveState();
    updateSeahorseState();
  });

  const commitButton = document.getElementById('btnSeahorseCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day21;
    const canCommit = getFilledSeahorseCount(answer, 'nourish') === 3 &&
      getFilledSeahorseCount(answer, 'toxic') === 3 &&
      answer.focusToxic &&
      answer.protection.trim();
    if (!canCommit) {
      showToast('Заполните оба списка и защитный шаг', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateSeahorseState();
    showToast('Новые морские коньки защищены');
  });

  updateSeahorseState();
}

function initAntPopulation() {
  normalizeAntPopulationAnswer();

  function clearAntCommit() {
    state.answers.day22.committed = false;
    const result = document.getElementById('antResult');
    if (result) result.classList.remove('show');
  }

  function updateAntState() {
    const answer = state.answers.day22;
    const requiredThoughts = getRequiredAntThoughtCount(answer);
    const filledThoughts = getFilledAntThoughtCount(answer);
    const canJournal = answer.populationSet && answer.areas.length > 0;
    const canCommit = canJournal && filledThoughts >= requiredThoughts && answer.observation.trim();
    const task = document.querySelector('.ant-task');
    if (task) task.style.setProperty('--ant-level', answer.population);
    const value = document.getElementById('antPopulationValue');
    if (value) value.textContent = answer.population;
    const number = document.getElementById('antPopulationNumber');
    if (number) number.textContent = answer.population;
    const note = document.getElementById('antPopulationNote');
    if (note) note.textContent = getAntPopulationLabel(answer);
    document.querySelectorAll('.ant-field span').forEach((ant, index) => {
      ant.classList.toggle('active', index < answer.population);
    });
    document.querySelectorAll('[data-ant-area]').forEach(button => {
      button.classList.toggle('selected', answer.areas.includes(button.dataset.antArea));
    });
    const areaCount = document.getElementById('antAreaCount');
    if (areaCount) areaCount.textContent = answer.areas.length;
    const journal = document.getElementById('antJournal');
    if (journal) journal.classList.toggle('show', canJournal);
    const required = document.getElementById('antRequiredCount');
    if (required) required.textContent = requiredThoughts;
    const filled = document.getElementById('antFilledCount');
    if (filled) filled.textContent = filledThoughts;
    document.querySelectorAll('.ant-thought-card').forEach((card, index) => {
      const thought = answer.thoughts[index];
      card.classList.toggle('complete', Boolean(thought && thought.text.trim() && thought.type));
    });
    document.querySelectorAll('[data-ant-type]').forEach(button => {
      const index = Number(button.dataset.antTypeIdx);
      button.classList.toggle('selected', answer.thoughts[index] && answer.thoughts[index].type === button.dataset.antType);
    });
    const commitButton = document.getElementById('btnAntCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('antResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isAntPopulationReady(answer);
  }

  const populationSlider = document.getElementById('antPopulationSlider');
  if (populationSlider) populationSlider.addEventListener('input', e => {
    state.answers.day22.population = Number(e.target.value);
    state.answers.day22.populationSet = true;
    clearAntCommit();
    saveState();
    updateAntState();
  });

  document.querySelectorAll('[data-ant-area]').forEach(button => {
    button.addEventListener('click', () => {
      const areaId = button.dataset.antArea;
      const areas = state.answers.day22.areas;
      const index = areas.indexOf(areaId);
      if (index >= 0) {
        areas.splice(index, 1);
      } else if (areas.length < 3) {
        areas.push(areaId);
      } else {
        showToast('Выберите до трёх областей', 'info');
        return;
      }
      clearAntCommit();
      saveState();
      updateAntState();
    });
  });

  document.querySelectorAll('.ant-thought-text').forEach(textarea => {
    textarea.addEventListener('input', e => {
      state.answers.day22.thoughts[+e.target.dataset.antThought].text = e.target.value;
      clearAntCommit();
      saveState();
      updateAntState();
    });
  });

  document.querySelectorAll('[data-ant-type]').forEach(button => {
    button.addEventListener('click', () => {
      const index = +button.dataset.antTypeIdx;
      state.answers.day22.thoughts[index].type = button.dataset.antType;
      clearAntCommit();
      saveState();
      updateAntState();
    });
  });

  const observation = document.getElementById('antObservation');
  if (observation) observation.addEventListener('input', e => {
    state.answers.day22.observation = e.target.value;
    clearAntCommit();
    saveState();
    updateAntState();
  });

  const commitButton = document.getElementById('btnAntCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day22;
    const canCommit = answer.populationSet &&
      answer.areas.length &&
      getFilledAntThoughtCount(answer) >= getRequiredAntThoughtCount(answer) &&
      answer.observation.trim();
    if (!canCommit) {
      showToast('Оцените популяцию, выберите области и заполните дневник', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateAntState();
    showToast('Популяция АНТов записана');
  });

  updateAntState();
}

function initPenguinPraise() {
  normalizePenguinPraiseAnswer();

  function clearPenguinCommit() {
    state.answers.day23.committed = false;
    const result = document.getElementById('penguinResult');
    if (result) result.classList.remove('show');
  }

  function updatePenguinState() {
    const answer = state.answers.day23;
    const completeCount = getPenguinCompleteCount(answer);
    const hasIncomplete = hasIncompletePenguinPerson(answer);
    const canChooseRule = completeCount > 0;
    const canCommit = canChooseRule && !hasIncomplete && answer.rule;
    const task = document.querySelector('.penguin-task');
    if (task) {
      task.style.setProperty('--fish-count', completeCount);
      task.style.setProperty('--stage-light', 0.38 + completeCount * 0.24);
    }
    const fishCount = document.getElementById('penguinFishCount');
    if (fishCount) fishCount.textContent = completeCount;
    document.querySelectorAll('.penguin-fish span').forEach((fish, index) => {
      fish.classList.toggle('active', index < completeCount);
    });
    document.querySelectorAll('.penguin-person-card').forEach((card, index) => {
      const person = answer.people[index];
      card.classList.toggle('started', isPenguinPersonStarted(person));
      card.classList.toggle('complete', isPenguinPersonComplete(person));
    });
    document.querySelectorAll('[data-penguin-method]').forEach(button => {
      const index = Number(button.dataset.penguinMethodIdx);
      button.classList.toggle('selected', answer.people[index].method === button.dataset.penguinMethod);
    });
    const rule = document.getElementById('penguinRule');
    if (rule) rule.classList.toggle('show', canChooseRule);
    document.querySelectorAll('[data-penguin-rule]').forEach(button => {
      button.classList.toggle('selected', answer.rule === button.dataset.penguinRule);
    });
    const hint = document.getElementById('penguinHint');
    if (hint) hint.classList.toggle('show', hasIncomplete);
    const commitButton = document.getElementById('btnPenguinCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('penguinResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isPenguinPraiseReady(answer);
  }

  document.querySelectorAll('.penguin-name').forEach(input => {
    input.addEventListener('input', e => {
      state.answers.day23.people[+e.target.dataset.penguinName].name = e.target.value;
      clearPenguinCommit();
      saveState();
      updatePenguinState();
    });
  });

  document.querySelectorAll('.penguin-quality').forEach(textarea => {
    textarea.addEventListener('input', e => {
      state.answers.day23.people[+e.target.dataset.penguinQuality].quality = e.target.value;
      clearPenguinCommit();
      saveState();
      updatePenguinState();
    });
  });

  document.querySelectorAll('[data-penguin-method]').forEach(button => {
    button.addEventListener('click', () => {
      const index = +button.dataset.penguinMethodIdx;
      state.answers.day23.people[index].method = button.dataset.penguinMethod;
      clearPenguinCommit();
      saveState();
      updatePenguinState();
    });
  });

  document.querySelectorAll('.penguin-action').forEach(textarea => {
    textarea.addEventListener('input', e => {
      state.answers.day23.people[+e.target.dataset.penguinAction].action = e.target.value;
      clearPenguinCommit();
      saveState();
      updatePenguinState();
    });
  });

  const clearSecond = document.getElementById('btnPenguinClearSecond');
  if (clearSecond) clearSecond.addEventListener('click', () => {
    state.answers.day23.people[1] = {name:'', quality:'', method:'', action:''};
    const name = document.querySelector('.penguin-name[data-penguin-name="1"]');
    const quality = document.querySelector('.penguin-quality[data-penguin-quality="1"]');
    const action = document.querySelector('.penguin-action[data-penguin-action="1"]');
    if (name) name.value = '';
    if (quality) quality.value = '';
    if (action) action.value = '';
    clearPenguinCommit();
    saveState();
    updatePenguinState();
  });

  document.querySelectorAll('[data-penguin-rule]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day23.rule = button.dataset.penguinRule;
      clearPenguinCommit();
      saveState();
      updatePenguinState();
    });
  });

  const commitButton = document.getElementById('btnPenguinCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day23;
    const canCommit = getPenguinCompleteCount(answer) >= 1 && !hasIncompletePenguinPerson(answer) && answer.rule;
    if (!canCommit) {
      showToast('Заполните хотя бы одного человека, способ внимания и правило дня', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updatePenguinState();
    showToast('Хорошее внимание зафиксировано');
  });

  updatePenguinState();
}

function initButterflyPurpose() {
  normalizeButterflyPurposeAnswer();

  function clearButterflyCommit() {
    state.answers.day24.committed = false;
    const result = document.getElementById('butterflyResult');
    if (result) result.classList.remove('show');
  }

  function updateButterflyState() {
    const answer = state.answers.day24;
    const filledCount = getButterflyFilledCount(answer);
    const canChooseValues = filledCount >= 3 && filledCount === answer.questions.length;
    const canCommit = canChooseValues && answer.values.length >= 1 && answer.action.trim();
    const task = document.querySelector('.butterfly-task');
    if (task) task.style.setProperty('--butterfly-fill', filledCount);
    const filled = document.getElementById('butterflyFilledCount');
    if (filled) filled.textContent = filledCount;
    const questionCount = document.getElementById('butterflyQuestionCount');
    if (questionCount) questionCount.textContent = answer.questions.length;
    document.querySelectorAll('.butterflies span').forEach((butterfly, index) => {
      butterfly.classList.toggle('active', index < filledCount);
    });
    document.querySelectorAll('[data-butterfly-question]').forEach(button => {
      button.classList.toggle('selected', answer.questions.includes(button.dataset.butterflyQuestion));
    });
    document.querySelectorAll('.butterfly-reflection-card').forEach(card => {
      const questionId = card.dataset.butterflyCard;
      card.classList.toggle('complete', Boolean(answer.responses[questionId] && answer.responses[questionId].trim()));
    });
    const values = document.getElementById('butterflyValues');
    if (values) values.classList.toggle('show', canChooseValues);
    document.querySelectorAll('[data-butterfly-value]').forEach(button => {
      button.classList.toggle('selected', answer.values.includes(button.dataset.butterflyValue));
    });
    const valueCount = document.getElementById('butterflyValueCount');
    if (valueCount) valueCount.textContent = answer.values.length;
    const commitButton = document.getElementById('btnButterflyCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('butterflyResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isButterflyPurposeReady(answer);
  }

  const task = document.querySelector('.butterfly-task');
  if (task) {
    task.addEventListener('click', e => {
      const questionButton = e.target.closest('[data-butterfly-question]');
      if (questionButton) {
        const questionId = questionButton.dataset.butterflyQuestion;
        const questions = state.answers.day24.questions;
        const index = questions.indexOf(questionId);
        if (index >= 0) {
          questions.splice(index, 1);
          delete state.answers.day24.responses[questionId];
        } else {
          questions.push(questionId);
          state.answers.day24.responses[questionId] = '';
        }
        clearButterflyCommit();
        saveState();
        const reflections = document.querySelector('.butterfly-reflections');
        if (reflections) reflections.innerHTML = renderButterflyReflections(state.answers.day24);
        updateButterflyState();
        return;
      }

      const valueButton = e.target.closest('[data-butterfly-value]');
      if (!valueButton) return;
      const valueId = valueButton.dataset.butterflyValue;
      const values = state.answers.day24.values;
      const index = values.indexOf(valueId);
      if (index >= 0) {
        values.splice(index, 1);
      } else if (values.length < 4) {
        values.push(valueId);
      } else {
        showToast('Выберите до четырёх ценностей', 'info');
        return;
      }
      clearButterflyCommit();
      saveState();
      updateButterflyState();
    });

    task.addEventListener('input', e => {
      if (e.target.matches('.butterfly-response')) {
        state.answers.day24.responses[e.target.dataset.butterflyResponse] = e.target.value;
        clearButterflyCommit();
        saveState();
        updateButterflyState();
        return;
      }
      if (e.target.id === 'butterflyAction') {
        state.answers.day24.action = e.target.value;
        clearButterflyCommit();
        saveState();
        updateButterflyState();
      }
    });
  }

  const commitButton = document.getElementById('btnButterflyCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day24;
    const canCommit = answer.questions.length >= 3 &&
      getButterflyFilledCount(answer) === answer.questions.length &&
      answer.values.length >= 1 &&
      answer.action.trim();
    if (!canCommit) {
      showToast('Ответьте минимум на три вопроса, выберите ценность и поступок', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateButterflyState();
    showToast('Осмысленный поступок зафиксирован');
  });

  updateButterflyState();
}

function initBiologicalRuler() {
  normalizeBiologicalRulerAnswer();

  function clearBiologicalCommit() {
    state.answers.day25.committed = false;
    const result = document.getElementById('bioRulerResult');
    if (result) result.classList.remove('show');
  }

  function updateBiologicalState() {
    const answer = state.answers.day25;
    const supportCount = answer.supports.length;
    const harmCount = answer.harms.length;
    const canPlan = supportCount >= 2 && harmCount >= 2;
    const canCommit = canPlan && answer.focusHarm && answer.decree.trim() && answer.sharedAction.trim();
    const task = document.querySelector('.bio-ruler-task');
    if (task) task.style.setProperty('--bio-balance', Math.max(-3, Math.min(3, supportCount - harmCount)));
    const supportCounter = document.getElementById('bioSupportCount');
    if (supportCounter) supportCounter.textContent = supportCount;
    const harmCounter = document.getElementById('bioHarmCount');
    if (harmCounter) harmCounter.textContent = harmCount;
    document.querySelectorAll('[data-bio-support]').forEach(button => {
      button.classList.toggle('selected', answer.supports.includes(button.dataset.bioSupport));
    });
    document.querySelectorAll('[data-bio-harm]').forEach(button => {
      button.classList.toggle('selected', answer.harms.includes(button.dataset.bioHarm));
    });
    const plan = document.getElementById('bioRulerPlan');
    if (plan) plan.classList.toggle('show', canPlan);
    const focus = document.getElementById('bioFocusHarm');
    if (focus) {
      focus.innerHTML = '<option value="">Выберите из отмеченного...</option>' +
        answer.harms
          .map(id => `<option value="${id}" ${answer.focusHarm === id ? 'selected' : ''}>${escapeHtml(getBiologicalPolicyName(BIOLOGICAL_HARM_POLICIES, id))}</option>`)
          .join('');
      focus.disabled = !canPlan;
      focus.value = answer.focusHarm;
    }
    const commitButton = document.getElementById('btnBioRulerCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('bioRulerResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isBiologicalRulerReady(answer);
  }

  function togglePolicy(key, value) {
    const list = state.answers.day25[key];
    const index = list.indexOf(value);
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(value);
    }
    if (!state.answers.day25.harms.includes(state.answers.day25.focusHarm)) {
      state.answers.day25.focusHarm = state.answers.day25.harms[0] || '';
    }
    clearBiologicalCommit();
    saveState();
    updateBiologicalState();
  }

  document.querySelectorAll('[data-bio-support]').forEach(button => {
    button.addEventListener('click', () => togglePolicy('supports', button.dataset.bioSupport));
  });

  document.querySelectorAll('[data-bio-harm]').forEach(button => {
    button.addEventListener('click', () => togglePolicy('harms', button.dataset.bioHarm));
  });

  const focus = document.getElementById('bioFocusHarm');
  if (focus) focus.addEventListener('change', e => {
    state.answers.day25.focusHarm = e.target.value;
    clearBiologicalCommit();
    saveState();
    updateBiologicalState();
  });

  const decree = document.getElementById('bioDecree');
  if (decree) decree.addEventListener('input', e => {
    state.answers.day25.decree = e.target.value;
    clearBiologicalCommit();
    saveState();
    updateBiologicalState();
  });

  const sharedAction = document.getElementById('bioSharedAction');
  if (sharedAction) sharedAction.addEventListener('input', e => {
    state.answers.day25.sharedAction = e.target.value;
    clearBiologicalCommit();
    saveState();
    updateBiologicalState();
  });

  const commitButton = document.getElementById('btnBioRulerCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day25;
    const canCommit = answer.supports.length >= 2 &&
      answer.harms.length >= 2 &&
      answer.focusHarm &&
      answer.decree.trim() &&
      answer.sharedAction.trim();
    if (!canCommit) {
      showToast('Отметьте действия с обеих сторон и заполните указ', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateBiologicalState();
    showToast('Указ доброго правителя принят');
  });

  updateBiologicalState();
}

function initPsychologicalRuler() {
  normalizePsychologicalRulerAnswer();

  function clearPsychologicalCommit() {
    state.answers.day26.committed = false;
    const result = document.getElementById('psyRulerResult');
    if (result) result.classList.remove('show');
  }

  function updatePsychologicalState() {
    const answer = state.answers.day26;
    const supportCount = answer.supports.length;
    const harmCount = answer.harms.length;
    const canPlan = supportCount >= 2 && harmCount >= 2;
    const canCommit = canPlan && answer.focusHarm && answer.decree.trim() && answer.newMessage.trim();
    const task = document.querySelector('.psychological-ruler-task');
    if (task) task.style.setProperty('--bio-balance', Math.max(-3, Math.min(3, supportCount - harmCount)));
    const supportCounter = document.getElementById('psySupportCount');
    if (supportCounter) supportCounter.textContent = supportCount;
    const harmCounter = document.getElementById('psyHarmCount');
    if (harmCounter) harmCounter.textContent = harmCount;
    document.querySelectorAll('[data-psy-support]').forEach(button => {
      button.classList.toggle('selected', answer.supports.includes(button.dataset.psySupport));
    });
    document.querySelectorAll('[data-psy-harm]').forEach(button => {
      button.classList.toggle('selected', answer.harms.includes(button.dataset.psyHarm));
    });
    const plan = document.getElementById('psyRulerPlan');
    if (plan) plan.classList.toggle('show', canPlan);
    const focus = document.getElementById('psyFocusHarm');
    if (focus) {
      focus.innerHTML = '<option value="">Выберите из отмеченного...</option>' +
        answer.harms
          .map(id => `<option value="${id}" ${answer.focusHarm === id ? 'selected' : ''}>${escapeHtml(getPsychologicalPolicyName(PSYCHOLOGICAL_HARM_POLICIES, id))}</option>`)
          .join('');
      focus.disabled = !canPlan;
      focus.value = answer.focusHarm;
    }
    const commitButton = document.getElementById('btnPsyRulerCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('psyRulerResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isPsychologicalRulerReady(answer);
  }

  function togglePolicy(key, value) {
    const list = state.answers.day26[key];
    const index = list.indexOf(value);
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(value);
    }
    if (!state.answers.day26.harms.includes(state.answers.day26.focusHarm)) {
      state.answers.day26.focusHarm = state.answers.day26.harms[0] || '';
    }
    clearPsychologicalCommit();
    saveState();
    updatePsychologicalState();
  }

  document.querySelectorAll('[data-psy-support]').forEach(button => {
    button.addEventListener('click', () => togglePolicy('supports', button.dataset.psySupport));
  });

  document.querySelectorAll('[data-psy-harm]').forEach(button => {
    button.addEventListener('click', () => togglePolicy('harms', button.dataset.psyHarm));
  });

  const focus = document.getElementById('psyFocusHarm');
  if (focus) focus.addEventListener('change', e => {
    state.answers.day26.focusHarm = e.target.value;
    clearPsychologicalCommit();
    saveState();
    updatePsychologicalState();
  });

  const decree = document.getElementById('psyDecree');
  if (decree) decree.addEventListener('input', e => {
    state.answers.day26.decree = e.target.value;
    clearPsychologicalCommit();
    saveState();
    updatePsychologicalState();
  });

  const newMessage = document.getElementById('psyNewMessage');
  if (newMessage) newMessage.addEventListener('input', e => {
    state.answers.day26.newMessage = e.target.value;
    clearPsychologicalCommit();
    saveState();
    updatePsychologicalState();
  });

  const commitButton = document.getElementById('btnPsyRulerCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day26;
    const canCommit = answer.supports.length >= 2 &&
      answer.harms.length >= 2 &&
      answer.focusHarm &&
      answer.decree.trim() &&
      answer.newMessage.trim();
    if (!canCommit) {
      showToast('Отметьте обе стороны, поддерживающий шаг и новую фразу', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updatePsychologicalState();
    showToast('Психологический указ принят');
  });

  updatePsychologicalState();
}

function initSocialRuler() {
  normalizeSocialRulerAnswer();

  function clearSocialCommit() {
    state.answers.day27.committed = false;
    const result = document.getElementById('socialRulerResult');
    if (result) result.classList.remove('show');
  }

  function updateSocialState() {
    const answer = state.answers.day27;
    const supportCount = answer.supports.length;
    const stressCount = answer.stressors.length;
    const relationshipCount = getSocialRelationshipCount(answer);
    const hasIncomplete = hasIncompleteSocialRelationship(answer);
    const canRelationships = supportCount >= 2 && stressCount >= 2;
    const canCommit = canRelationships &&
      relationshipCount >= 1 &&
      !hasIncomplete &&
      answer.focusStress &&
      answer.stressStep.trim() &&
      answer.connectionAction.trim();
    const task = document.querySelector('.social-ruler-task');
    if (task) task.style.setProperty('--bio-balance', Math.max(-3, Math.min(3, supportCount - stressCount)));
    const supportCounter = document.getElementById('socialSupportCount');
    if (supportCounter) supportCounter.textContent = supportCount;
    const stressCounter = document.getElementById('socialStressCount');
    if (stressCounter) stressCounter.textContent = stressCount;
    document.querySelectorAll('[data-social-support]').forEach(button => {
      button.classList.toggle('selected', answer.supports.includes(button.dataset.socialSupport));
    });
    document.querySelectorAll('[data-social-stress]').forEach(button => {
      button.classList.toggle('selected', answer.stressors.includes(button.dataset.socialStress));
    });
    const relationships = document.getElementById('socialRelationships');
    if (relationships) relationships.classList.toggle('show', canRelationships);
    document.querySelectorAll('.social-relationship-card').forEach(card => {
      const relationship = answer.relationships[+card.dataset.socialRelationshipCard];
      card.classList.toggle('started', isSocialRelationshipStarted(relationship));
      card.classList.toggle('complete', isSocialRelationshipComplete(relationship));
    });
    const relationshipCounter = document.getElementById('socialRelationshipCount');
    if (relationshipCounter) relationshipCounter.textContent = relationshipCount;
    const hint = document.getElementById('socialRelationshipHint');
    if (hint) hint.classList.toggle('show', hasIncomplete);
    const plan = document.getElementById('socialRulerPlan');
    if (plan) plan.classList.toggle('show', canRelationships);
    const focus = document.getElementById('socialFocusStress');
    if (focus) {
      focus.innerHTML = '<option value="">Выберите из отмеченного...</option>' +
        answer.stressors
          .map(id => `<option value="${id}" ${answer.focusStress === id ? 'selected' : ''}>${escapeHtml(getSocialItemName(SOCIAL_STRESSORS, id))}</option>`)
          .join('');
      focus.disabled = !canRelationships;
      focus.value = answer.focusStress;
    }
    const commitButton = document.getElementById('btnSocialRulerCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('socialRulerResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isSocialRulerReady(answer);
  }

  function toggleSocialList(key, value) {
    const list = state.answers.day27[key];
    const index = list.indexOf(value);
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(value);
    }
    if (!state.answers.day27.stressors.includes(state.answers.day27.focusStress)) {
      state.answers.day27.focusStress = state.answers.day27.stressors[0] || '';
    }
    clearSocialCommit();
    saveState();
    updateSocialState();
  }

  document.querySelectorAll('[data-social-support]').forEach(button => {
    button.addEventListener('click', () => toggleSocialList('supports', button.dataset.socialSupport));
  });

  document.querySelectorAll('[data-social-stress]').forEach(button => {
    button.addEventListener('click', () => toggleSocialList('stressors', button.dataset.socialStress));
  });

  document.querySelectorAll('.social-relationship-name').forEach(input => {
    input.addEventListener('input', e => {
      state.answers.day27.relationships[+e.target.dataset.socialRelationshipName].name = e.target.value;
      clearSocialCommit();
      saveState();
      updateSocialState();
    });
  });

  document.querySelectorAll('.social-relationship-impact').forEach(textarea => {
    textarea.addEventListener('input', e => {
      state.answers.day27.relationships[+e.target.dataset.socialRelationshipImpact].impact = e.target.value;
      clearSocialCommit();
      saveState();
      updateSocialState();
    });
  });

  const clearSecond = document.getElementById('btnSocialClearSecond');
  if (clearSecond) clearSecond.addEventListener('click', () => {
    state.answers.day27.relationships[1] = {name:'', impact:''};
    clearSocialCommit();
    saveState();
    render();
  });

  const focus = document.getElementById('socialFocusStress');
  if (focus) focus.addEventListener('change', e => {
    state.answers.day27.focusStress = e.target.value;
    clearSocialCommit();
    saveState();
    updateSocialState();
  });

  const stressStep = document.getElementById('socialStressStep');
  if (stressStep) stressStep.addEventListener('input', e => {
    state.answers.day27.stressStep = e.target.value;
    clearSocialCommit();
    saveState();
    updateSocialState();
  });

  const connectionAction = document.getElementById('socialConnectionAction');
  if (connectionAction) connectionAction.addEventListener('input', e => {
    state.answers.day27.connectionAction = e.target.value;
    clearSocialCommit();
    saveState();
    updateSocialState();
  });

  const commitButton = document.getElementById('btnSocialRulerCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day27;
    const canCommit = answer.supports.length >= 2 &&
      answer.stressors.length >= 2 &&
      getSocialRelationshipCount(answer) >= 1 &&
      !hasIncompleteSocialRelationship(answer) &&
      answer.focusStress &&
      answer.stressStep.trim() &&
      answer.connectionAction.trim();
    if (!canCommit) {
      showToast('Отметьте стрессоры, заполните отношения и социальный указ', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateSocialState();
    showToast('Социальный указ принят');
  });

  updateSocialState();
}

function initSpiritualRuler() {
  normalizeSpiritualRulerAnswer();

  function clearSpiritualCommit() {
    state.answers.day28.committed = false;
    const result = document.getElementById('spiritualResult');
    if (result) result.classList.remove('show');
  }

  function updateSpiritualState() {
    const answer = state.answers.day28;
    const canPlan = Boolean(answer.anchor && answer.connection);
    const canCommit = canPlan && answer.action.trim() && answer.when.trim() && answer.added;
    const compassFill = (answer.anchor ? 1 : 0) + (answer.connection ? 1 : 0) + (answer.action.trim() ? 1 : 0) + (answer.added ? 1 : 0);
    const task = document.querySelector('.spiritual-ruler-task');
    if (task) task.style.setProperty('--spiritual-fill', compassFill);
    const center = document.querySelector('.spiritual-center strong');
    if (center) center.textContent = `${compassFill}/4`;
    document.querySelectorAll('[data-spiritual-anchor]').forEach(button => {
      button.classList.toggle('selected', answer.anchor === button.dataset.spiritualAnchor);
    });
    document.querySelectorAll('[data-spiritual-connection]').forEach(button => {
      button.classList.toggle('selected', answer.connection === button.dataset.spiritualConnection);
    });
    const plan = document.getElementById('spiritualPlan');
    if (plan) plan.classList.toggle('show', canPlan);
    const commitButton = document.getElementById('btnSpiritualCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('spiritualResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isSpiritualRulerReady(answer);
  }

  document.querySelectorAll('[data-spiritual-anchor]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day28.anchor = button.dataset.spiritualAnchor;
      clearSpiritualCommit();
      saveState();
      updateSpiritualState();
    });
  });

  document.querySelectorAll('[data-spiritual-connection]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day28.connection = button.dataset.spiritualConnection;
      clearSpiritualCommit();
      saveState();
      updateSpiritualState();
    });
  });

  const action = document.getElementById('spiritualAction');
  if (action) action.addEventListener('input', e => {
    state.answers.day28.action = e.target.value;
    clearSpiritualCommit();
    saveState();
    updateSpiritualState();
  });

  const when = document.getElementById('spiritualWhen');
  if (when) when.addEventListener('input', e => {
    state.answers.day28.when = e.target.value;
    clearSpiritualCommit();
    saveState();
    updateSpiritualState();
  });

  const added = document.getElementById('spiritualAdded');
  if (added) added.addEventListener('change', e => {
    state.answers.day28.added = e.target.checked;
    clearSpiritualCommit();
    saveState();
    updateSpiritualState();
  });

  const commitButton = document.getElementById('btnSpiritualCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day28;
    const canCommit = answer.anchor && answer.connection && answer.action.trim() && answer.when.trim() && answer.added;
    if (!canCommit) {
      showToast('Выберите опору, связь и добавьте одно дело в список', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateSpiritualState();
    showToast('Осмысленное дело закреплено');
  });

  updateSpiritualState();
}

function initMultiCauseMap() {
  normalizeMultiCauseMapAnswer();

  function clearMultiCauseCommit() {
    state.answers.day29.committed = false;
    const result = document.getElementById('multiCauseResult');
    if (result) result.classList.remove('show');
  }

  function updateMultiCauseState() {
    const answer = state.answers.day29;
    const causeCount = answer.causes.length;
    const canPlan = Boolean(answer.concern.trim() && causeCount >= 3);
    const canCommit = Boolean(canPlan && answer.focusCause && answer.why.trim() && answer.nextStep && answer.planned);
    const progress = Math.min(5, (answer.concern.trim() ? 1 : 0) + Math.min(3, causeCount) + (answer.nextStep ? 1 : 0));
    const task = document.querySelector('.multi-cause-task');
    if (task) task.style.setProperty('--multi-cause-progress', progress);
    const counter = document.getElementById('multiCauseCount');
    if (counter) counter.textContent = causeCount;
    document.querySelectorAll('[data-multi-cause]').forEach(button => {
      button.classList.toggle('selected', answer.causes.includes(button.dataset.multiCause));
    });
    const plan = document.getElementById('multiCausePlan');
    if (plan) plan.classList.toggle('show', canPlan);
    const focus = document.getElementById('multiCauseFocus');
    if (focus) {
      focus.innerHTML = '<option value="">Выберите из отмеченного...</option>' +
        answer.causes
          .map(id => `<option value="${id}" ${answer.focusCause === id ? 'selected' : ''}>${escapeHtml(getMultiCauseName(id))}</option>`)
          .join('');
      focus.disabled = !canPlan;
      focus.value = answer.focusCause;
    }
    const commitButton = document.getElementById('btnMultiCauseCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('multiCauseResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isMultiCauseMapReady(answer);
  }

  document.querySelectorAll('[data-multi-cause]').forEach(button => {
    button.addEventListener('click', () => {
      const answer = state.answers.day29;
      const causeId = button.dataset.multiCause;
      const index = answer.causes.indexOf(causeId);
      if (index >= 0) {
        answer.causes.splice(index, 1);
      } else {
        answer.causes.push(causeId);
      }
      if (!answer.causes.includes(answer.focusCause)) answer.focusCause = answer.causes[0] || '';
      clearMultiCauseCommit();
      saveState();
      updateMultiCauseState();
    });
  });

  const concern = document.getElementById('multiCauseConcern');
  if (concern) concern.addEventListener('input', e => {
    state.answers.day29.concern = e.target.value;
    clearMultiCauseCommit();
    saveState();
    updateMultiCauseState();
  });

  const focus = document.getElementById('multiCauseFocus');
  if (focus) focus.addEventListener('change', e => {
    state.answers.day29.focusCause = e.target.value;
    clearMultiCauseCommit();
    saveState();
    updateMultiCauseState();
  });

  const why = document.getElementById('multiCauseWhy');
  if (why) why.addEventListener('input', e => {
    state.answers.day29.why = e.target.value;
    clearMultiCauseCommit();
    saveState();
    updateMultiCauseState();
  });

  const nextStep = document.getElementById('multiCauseNextStep');
  if (nextStep) nextStep.addEventListener('change', e => {
    state.answers.day29.nextStep = e.target.value;
    clearMultiCauseCommit();
    saveState();
    updateMultiCauseState();
  });

  const planned = document.getElementById('multiCausePlanned');
  if (planned) planned.addEventListener('change', e => {
    state.answers.day29.planned = e.target.checked;
    clearMultiCauseCommit();
    saveState();
    updateMultiCauseState();
  });

  const commitButton = document.getElementById('btnMultiCauseCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day29;
    const canCommit = answer.concern.trim() &&
      answer.causes.length >= 3 &&
      answer.focusCause &&
      answer.why.trim() &&
      answer.nextStep &&
      answer.planned;
    if (!canCommit) {
      showToast('Заполните карту причин и следующий шаг', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateMultiCauseState();
    showToast('Карта причин зафиксирована');
  });

  updateMultiCauseState();
}

function initBrainHealthMessage() {
  normalizeBrainHealthMessageAnswer();

  function clearBrainMessageCommit() {
    state.answers.day30.committed = false;
    const result = document.getElementById('brainMessageResult');
    if (result) result.classList.remove('show');
  }

  function updateBrainMessageState() {
    const answer = state.answers.day30;
    const canDraft = Boolean(answer.person.trim() && answer.reason.trim() && answer.angle);
    const canCommit = Boolean(canDraft && answer.message.trim() && answer.channel && answer.sent);
    const progress = (answer.person.trim() ? 1 : 0) + (answer.reason.trim() ? 1 : 0) + (answer.angle ? 1 : 0) + (answer.channel ? 1 : 0) + (answer.sent ? 1 : 0);
    const task = document.querySelector('.multi-cause-task');
    if (task) task.style.setProperty('--multi-cause-progress', progress);
    const counter = document.getElementById('brainMessageProgress');
    if (counter) counter.textContent = `${progress}/5`;
    document.querySelectorAll('[data-brain-message-angle]').forEach(button => {
      button.classList.toggle('selected', answer.angle === button.dataset.brainMessageAngle);
    });
    document.querySelectorAll('[data-brain-message-channel]').forEach(button => {
      button.classList.toggle('selected', answer.channel === button.dataset.brainMessageChannel);
    });
    const plan = document.getElementById('brainMessagePlan');
    if (plan) plan.classList.toggle('show', canDraft);
    const commitButton = document.getElementById('btnBrainMessageCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('brainMessageResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isBrainHealthMessageReady(answer);
  }

  const person = document.getElementById('brainMessagePerson');
  if (person) person.addEventListener('input', e => {
    state.answers.day30.person = e.target.value;
    clearBrainMessageCommit();
    saveState();
    updateBrainMessageState();
  });

  const reason = document.getElementById('brainMessageReason');
  if (reason) reason.addEventListener('input', e => {
    state.answers.day30.reason = e.target.value;
    clearBrainMessageCommit();
    saveState();
    updateBrainMessageState();
  });

  document.querySelectorAll('[data-brain-message-angle]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day30.angle = button.dataset.brainMessageAngle;
      clearBrainMessageCommit();
      saveState();
      updateBrainMessageState();
    });
  });

  const message = document.getElementById('brainMessageText');
  if (message) message.addEventListener('input', e => {
    state.answers.day30.message = e.target.value;
    clearBrainMessageCommit();
    saveState();
    updateBrainMessageState();
  });

  document.querySelectorAll('[data-brain-message-channel]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day30.channel = button.dataset.brainMessageChannel;
      clearBrainMessageCommit();
      saveState();
      updateBrainMessageState();
    });
  });

  const sent = document.getElementById('brainMessageSent');
  if (sent) sent.addEventListener('change', e => {
    state.answers.day30.sent = e.target.checked;
    clearBrainMessageCommit();
    saveState();
    updateBrainMessageState();
  });

  const commitButton = document.getElementById('btnBrainMessageCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day30;
    const canCommit = answer.person.trim() &&
      answer.reason.trim() &&
      answer.angle &&
      answer.message.trim() &&
      answer.channel &&
      answer.sent;
    if (!canCommit) {
      showToast('Выберите человека, напишите и отправьте короткое сообщение', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateBrainMessageState();
    showToast('Сообщение зафиксировано');
  });

  updateBrainMessageState();
}

function initAlternativeReason() {
  normalizeAlternativeReasonAnswer();

  function clearAlternativeReasonCommit() {
    state.answers.day31.committed = false;
    const result = document.getElementById('alternativeReasonResult');
    if (result) result.classList.remove('show');
  }

  function updateAlternativeReasonState() {
    const answer = state.answers.day31;
    const canPlan = Boolean(answer.person.trim() && answer.behavior.trim() && answer.causes.length >= 2);
    const canCommit = Boolean(canPlan && answer.focusCause && answer.reframe.trim() && answer.nextStep && answer.bounded);
    const progress = (answer.person.trim() ? 1 : 0) + (answer.behavior.trim() ? 1 : 0) + (answer.causes.length >= 2 ? 1 : 0) + (answer.nextStep ? 1 : 0) + (answer.bounded ? 1 : 0);
    const task = document.querySelector('.multi-cause-task');
    if (task) task.style.setProperty('--multi-cause-progress', progress);
    const counter = document.getElementById('alternativeReasonProgress');
    if (counter) counter.textContent = `${progress}/5`;
    document.querySelectorAll('[data-alternative-cause]').forEach(button => {
      button.classList.toggle('selected', answer.causes.includes(button.dataset.alternativeCause));
    });
    document.querySelectorAll('[data-alternative-step]').forEach(button => {
      button.classList.toggle('selected', answer.nextStep === button.dataset.alternativeStep);
    });
    const plan = document.getElementById('alternativeReasonPlan');
    if (plan) plan.classList.toggle('show', canPlan);
    const focus = document.getElementById('alternativeReasonFocus');
    if (focus) {
      focus.innerHTML = '<option value="">Выберите из отмеченного...</option>' +
        answer.causes
          .map(id => `<option value="${id}" ${answer.focusCause === id ? 'selected' : ''}>${escapeHtml(getAlternativeReasonCauseName(id))}</option>`)
          .join('');
      focus.disabled = !canPlan;
      focus.value = answer.focusCause;
    }
    const commitButton = document.getElementById('btnAlternativeReasonCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('alternativeReasonResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isAlternativeReasonReady(answer);
  }

  const person = document.getElementById('alternativeReasonPerson');
  if (person) person.addEventListener('input', e => {
    state.answers.day31.person = e.target.value;
    clearAlternativeReasonCommit();
    saveState();
    updateAlternativeReasonState();
  });

  const behavior = document.getElementById('alternativeReasonBehavior');
  if (behavior) behavior.addEventListener('input', e => {
    state.answers.day31.behavior = e.target.value;
    clearAlternativeReasonCommit();
    saveState();
    updateAlternativeReasonState();
  });

  document.querySelectorAll('[data-alternative-cause]').forEach(button => {
    button.addEventListener('click', () => {
      const answer = state.answers.day31;
      const causeId = button.dataset.alternativeCause;
      const index = answer.causes.indexOf(causeId);
      if (index >= 0) {
        answer.causes.splice(index, 1);
      } else {
        answer.causes.push(causeId);
      }
      if (!answer.causes.includes(answer.focusCause)) answer.focusCause = answer.causes[0] || '';
      clearAlternativeReasonCommit();
      saveState();
      updateAlternativeReasonState();
    });
  });

  const focus = document.getElementById('alternativeReasonFocus');
  if (focus) focus.addEventListener('change', e => {
    state.answers.day31.focusCause = e.target.value;
    clearAlternativeReasonCommit();
    saveState();
    updateAlternativeReasonState();
  });

  const reframe = document.getElementById('alternativeReasonReframe');
  if (reframe) reframe.addEventListener('input', e => {
    state.answers.day31.reframe = e.target.value;
    clearAlternativeReasonCommit();
    saveState();
    updateAlternativeReasonState();
  });

  document.querySelectorAll('[data-alternative-step]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day31.nextStep = button.dataset.alternativeStep;
      clearAlternativeReasonCommit();
      saveState();
      updateAlternativeReasonState();
    });
  });

  const bounded = document.getElementById('alternativeReasonBounded');
  if (bounded) bounded.addEventListener('change', e => {
    state.answers.day31.bounded = e.target.checked;
    clearAlternativeReasonCommit();
    saveState();
    updateAlternativeReasonState();
  });

  const commitButton = document.getElementById('btnAlternativeReasonCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day31;
    const canCommit = answer.person.trim() &&
      answer.behavior.trim() &&
      answer.causes.length >= 2 &&
      answer.focusCause &&
      answer.reframe.trim() &&
      answer.nextStep &&
      answer.bounded;
    if (!canCommit) {
      showToast('Заполните карту альтернативной причины и следующий шаг', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateAlternativeReasonState();
    showToast('Новый взгляд зафиксирован');
  });

  updateAlternativeReasonState();
}

function initLabelPause() {
  normalizeLabelPauseAnswer();

  function clearLabelPauseCommit() {
    state.answers.day32.committed = false;
    const result = document.getElementById('labelPauseResult');
    if (result) result.classList.remove('show');
  }

  function updateLabelPauseState() {
    const answer = state.answers.day32;
    const canPlan = Boolean(answer.behavior.trim() && answer.label.trim() && answer.causes.length >= 2);
    const canCommit = Boolean(canPlan && answer.focusCause && answer.question.trim() && answer.nextStep && answer.bounded);
    const progress = (answer.behavior.trim() ? 1 : 0) + (answer.label.trim() ? 1 : 0) + (answer.causes.length >= 2 ? 1 : 0) + (answer.nextStep ? 1 : 0) + (answer.bounded ? 1 : 0);
    const task = document.querySelector('.multi-cause-task');
    if (task) task.style.setProperty('--multi-cause-progress', progress);
    const counter = document.getElementById('labelPauseProgress');
    if (counter) counter.textContent = `${progress}/5`;
    document.querySelectorAll('[data-label-cause]').forEach(button => {
      button.classList.toggle('selected', answer.causes.includes(button.dataset.labelCause));
    });
    document.querySelectorAll('[data-label-step]').forEach(button => {
      button.classList.toggle('selected', answer.nextStep === button.dataset.labelStep);
    });
    const plan = document.getElementById('labelPausePlan');
    if (plan) plan.classList.toggle('show', canPlan);
    const focus = document.getElementById('labelPauseFocus');
    if (focus) {
      focus.innerHTML = '<option value="">Выберите из отмеченного...</option>' +
        answer.causes
          .map(id => `<option value="${id}" ${answer.focusCause === id ? 'selected' : ''}>${escapeHtml(getLabelPauseCauseName(id))}</option>`)
          .join('');
      focus.disabled = !canPlan;
      focus.value = answer.focusCause;
    }
    const commitButton = document.getElementById('btnLabelPauseCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('labelPauseResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isLabelPauseReady(answer);
  }

  const behavior = document.getElementById('labelPauseBehavior');
  if (behavior) behavior.addEventListener('input', e => {
    state.answers.day32.behavior = e.target.value;
    clearLabelPauseCommit();
    saveState();
    updateLabelPauseState();
  });

  const label = document.getElementById('labelPauseLabel');
  if (label) label.addEventListener('input', e => {
    state.answers.day32.label = e.target.value;
    clearLabelPauseCommit();
    saveState();
    updateLabelPauseState();
  });

  document.querySelectorAll('[data-label-cause]').forEach(button => {
    button.addEventListener('click', () => {
      const answer = state.answers.day32;
      const causeId = button.dataset.labelCause;
      const index = answer.causes.indexOf(causeId);
      if (index >= 0) {
        answer.causes.splice(index, 1);
      } else {
        answer.causes.push(causeId);
      }
      if (!answer.causes.includes(answer.focusCause)) answer.focusCause = answer.causes[0] || '';
      clearLabelPauseCommit();
      saveState();
      updateLabelPauseState();
    });
  });

  const focus = document.getElementById('labelPauseFocus');
  if (focus) focus.addEventListener('change', e => {
    state.answers.day32.focusCause = e.target.value;
    clearLabelPauseCommit();
    saveState();
    updateLabelPauseState();
  });

  const question = document.getElementById('labelPauseQuestion');
  if (question) question.addEventListener('input', e => {
    state.answers.day32.question = e.target.value;
    clearLabelPauseCommit();
    saveState();
    updateLabelPauseState();
  });

  document.querySelectorAll('[data-label-step]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day32.nextStep = button.dataset.labelStep;
      clearLabelPauseCommit();
      saveState();
      updateLabelPauseState();
    });
  });

  const bounded = document.getElementById('labelPauseBounded');
  if (bounded) bounded.addEventListener('change', e => {
    state.answers.day32.bounded = e.target.checked;
    clearLabelPauseCommit();
    saveState();
    updateLabelPauseState();
  });

  const commitButton = document.getElementById('btnLabelPauseCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day32;
    const canCommit = answer.behavior.trim() &&
      answer.label.trim() &&
      answer.causes.length >= 2 &&
      answer.focusCause &&
      answer.question.trim() &&
      answer.nextStep &&
      answer.bounded;
    if (!canCommit) {
      showToast('Заполните паузу перед ярлыком и следующий шаг', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateLabelPauseState();
    showToast('Пауза зафиксирована');
  });

  updateLabelPauseState();
}

function initRevolutionStage() {
  normalizeRevolutionStageAnswer();

  function clearRevolutionCommit() {
    state.answers.day33.committed = false;
    const result = document.getElementById('revolutionResult');
    if (result) result.classList.remove('show');
  }

  function updateRevolutionState() {
    const answer = state.answers.day33;
    const canPlan = Boolean(answer.idea.trim() && answer.rejection.trim() && answer.stage);
    const canCommit = Boolean(canPlan && answer.motivator && answer.reason.trim() && answer.nextStep.trim() && answer.balanced);
    const progress = (answer.idea.trim() ? 1 : 0) + (answer.rejection.trim() ? 1 : 0) + (answer.stage ? 1 : 0) + (answer.motivator ? 1 : 0) + (answer.balanced ? 1 : 0);
    const selectedStage = REVOLUTION_STAGES.find(item => item.id === answer.stage);
    const task = document.querySelector('.multi-cause-task');
    if (task) task.style.setProperty('--multi-cause-progress', progress);
    const counter = document.getElementById('revolutionProgress');
    if (counter) counter.textContent = `${progress}/5`;
    document.querySelectorAll('[data-revolution-stage]').forEach(button => {
      button.classList.toggle('selected', answer.stage === button.dataset.revolutionStage);
    });
    document.querySelectorAll('[data-revolution-motivator]').forEach(button => {
      button.classList.toggle('selected', answer.motivator === button.dataset.revolutionMotivator);
    });
    const hint = document.getElementById('revolutionStageHint');
    if (hint) {
      hint.classList.toggle('show', Boolean(selectedStage));
      hint.textContent = selectedStage ? selectedStage.desc : 'Выберите стадию, которая лучше всего описывает путь идеи сейчас.';
    }
    const plan = document.getElementById('revolutionPlan');
    if (plan) plan.classList.toggle('show', canPlan);
    const commitButton = document.getElementById('btnRevolutionCommit');
    if (commitButton) commitButton.disabled = !canCommit;
    const result = document.getElementById('revolutionResult');
    if (result) result.classList.toggle('show', answer.committed);
    const completeButton = document.getElementById('btnCompleteDay');
    if (completeButton) completeButton.disabled = !isRevolutionStageReady(answer);
  }

  const idea = document.getElementById('revolutionIdea');
  if (idea) idea.addEventListener('input', e => {
    state.answers.day33.idea = e.target.value;
    clearRevolutionCommit();
    saveState();
    updateRevolutionState();
  });

  const rejection = document.getElementById('revolutionRejection');
  if (rejection) rejection.addEventListener('input', e => {
    state.answers.day33.rejection = e.target.value;
    clearRevolutionCommit();
    saveState();
    updateRevolutionState();
  });

  document.querySelectorAll('[data-revolution-stage]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day33.stage = button.dataset.revolutionStage;
      clearRevolutionCommit();
      saveState();
      updateRevolutionState();
    });
  });

  document.querySelectorAll('[data-revolution-motivator]').forEach(button => {
    button.addEventListener('click', () => {
      state.answers.day33.motivator = button.dataset.revolutionMotivator;
      clearRevolutionCommit();
      saveState();
      updateRevolutionState();
    });
  });

  const reason = document.getElementById('revolutionReason');
  if (reason) reason.addEventListener('input', e => {
    state.answers.day33.reason = e.target.value;
    clearRevolutionCommit();
    saveState();
    updateRevolutionState();
  });

  const nextStep = document.getElementById('revolutionNextStep');
  if (nextStep) nextStep.addEventListener('input', e => {
    state.answers.day33.nextStep = e.target.value;
    clearRevolutionCommit();
    saveState();
    updateRevolutionState();
  });

  const balanced = document.getElementById('revolutionBalanced');
  if (balanced) balanced.addEventListener('change', e => {
    state.answers.day33.balanced = e.target.checked;
    clearRevolutionCommit();
    saveState();
    updateRevolutionState();
  });

  const commitButton = document.getElementById('btnRevolutionCommit');
  if (commitButton) commitButton.addEventListener('click', () => {
    const answer = state.answers.day33;
    const canCommit = answer.idea.trim() &&
      answer.rejection.trim() &&
      answer.stage &&
      answer.motivator &&
      answer.reason.trim() &&
      answer.nextStep.trim() &&
      answer.balanced;
    if (!canCommit) {
      showToast('Заполните идею, стадию и следующий шаг', 'info');
      return;
    }
    answer.committed = true;
    saveState();
    updateRevolutionState();
    showToast('Стадия зафиксирована');
  });

  updateRevolutionState();
}

function initWeeklyExperiment() {
  const answer = normalizeWeeklyExperimentAnswer();
  const task = document.getElementById('weeklyExperiment');
  const commitButton = document.getElementById('btnExperimentCommit');

  function updateExperimentState() {
    const progress = (answer.harmfulAction.trim() ? 1 : 0) + (answer.helpfulAction.trim() ? 1 : 0) + (answer.pauseWeek ? 1 : 0) + (answer.helpfulDone ? 1 : 0);
    task.style.setProperty('--multi-cause-progress', progress);
    document.getElementById('experimentProgress').textContent = `${progress}/4`;
    commitButton.disabled = !isWeeklyExperimentFilled(answer);
    document.getElementById('experimentResult').classList.toggle('show', answer.committed);
  }

  task.querySelectorAll('[data-experiment-field]').forEach(input => {
    input.addEventListener(input.type === 'checkbox' ? 'change' : 'input', () => {
      answer[input.dataset.experimentField] = input.type === 'checkbox' ? input.checked : input.value;
      answer.committed = false;
      saveState();
      updateExperimentState();
    });
  });

  commitButton.addEventListener('click', () => {
    if (!isWeeklyExperimentFilled(answer)) return;
    answer.committed = true;
    saveState();
    updateExperimentState();
    showToast('Эксперимент зафиксирован');
  });

  updateExperimentState();
}

function initThoughtPause() {
  const answer = normalizeThoughtPauseAnswer();
  document.querySelectorAll('[data-thought-field]').forEach(input => {
    input.addEventListener(input.type === 'checkbox' ? 'change' : 'input', () => {
      answer[input.dataset.thoughtField] = input.type === 'checkbox' ? input.checked : input.value;
      saveState();
    });
  });
}

function initBrainScansTalk() {
  const answer = normalizeBrainScansTalkAnswer();
  document.getElementById('brainScansWatched').addEventListener('change', event => {
    answer.watched = event.target.checked;
    saveState();
  });
  document.getElementById('brainScansTakeaway').addEventListener('input', event => {
    answer.takeaway = event.target.value;
    saveState();
  });
}

function initHopeReflection() {
  const answer = normalizeHopeReflectionAnswer();
  document.querySelectorAll('[data-hope-field]').forEach(input => {
    input.addEventListener('input', () => {
      answer[input.dataset.hopeField] = input.value;
      saveState();
    });
  });
}

function initMemoryRescue() {
  const answer = normalizeMemoryRescueAnswer();
  initBrightMinds(38);
  document.getElementById('memoryReviewed').addEventListener('change', event => {
    answer.reviewed = event.target.checked;
    saveState();
  });
}

function initBriskWalk() {
  const answer = normalizeBriskWalkAnswer();
  document.querySelectorAll('[data-walk-field]').forEach(input => {
    input.addEventListener(input.type === 'checkbox' ? 'change' : 'input', () => {
      answer[input.dataset.walkField] = input.type === 'checkbox' ? input.checked : input.value;
      saveState();
    });
  });
}

function initBrainSport() {
  const answer = normalizeBrainSportAnswer();
  document.querySelectorAll('[data-sport-field]').forEach(input => {
    input.addEventListener(input.matches('select, [type="checkbox"]') ? 'change' : 'input', () => {
      answer[input.dataset.sportField] = input.type === 'checkbox' ? input.checked : input.value;
      if (input.dataset.sportField === 'sport' || input.dataset.sportField === 'place') {
        answer.found = false;
        document.getElementById('brainSportFound').checked = false;
      }
      saveState();
    });
  });
}
