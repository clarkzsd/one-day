const TASK_STATUS_READY = 0;
const TASK_STATUS_TODO = 1;
const TASK_STATUS_ARCHIVE = 2;

const taskStatus = {
  [TASK_STATUS_READY]: 'ready',
  [TASK_STATUS_TODO]: 'todo',
  [TASK_STATUS_ARCHIVE]: 'archive'
};

const todayTaskStatus = {
  [TASK_STATUS_TODO]: 'todo',
  [TASK_STATUS_ARCHIVE]: 'archive'
};

const taskStatusList = [
  {
    key: TASK_STATUS_READY,
    value: 'ready'
  }, {
    key: TASK_STATUS_TODO,
    value: 'todo'
  }, {
    key: TASK_STATUS_ARCHIVE,
    value: 'archive'
  }
];

const todayTaskStatusList = [
  {
    key: TASK_STATUS_TODO,
    value: 'todo'
  }, {
    key: TASK_STATUS_ARCHIVE,
    value: 'archive'
  }
];

const TASK_DEGREE_URGENT = 0;
const TASK_DEGREE_PRIMARY = 1;
const TASK_DEGREE_SECONDARY = 2;

const taskDegree = {
  [TASK_DEGREE_URGENT]: 'urgent',
  [TASK_DEGREE_PRIMARY]: 'primary',
  [TASK_DEGREE_SECONDARY]: 'secondary'
};

const taskDegreeList = [
  {
    key: TASK_DEGREE_URGENT,
    value: 'urgent'
  }, {
    key: TASK_DEGREE_PRIMARY,
    value: 'primary'
  }, {
    key: TASK_DEGREE_SECONDARY,
    value: 'secondary'
  }
];

const taskStatisticsStatusList = [
  {
    key: 0,
    value: 'unfinished'
  }, {
    key: 1,
    value: 'finished'
  }, {
    key: 2,
    value: 'created'
  }
];

export default {
  taskStatus,
  taskStatusList,
  todayTaskStatus,
  todayTaskStatusList,
  taskStatisticsStatusList,
  taskDegree,
  taskDegreeList
};
