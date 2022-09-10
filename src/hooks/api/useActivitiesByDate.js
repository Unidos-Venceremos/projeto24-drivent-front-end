import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesByDateApi from '../../services/activitiesDaysApi.js';

export default function useActivitiesByDate() {
  const token = useToken();

  const {
    data: activitiesByDate,
    loading: activitiesByDateLoading,
    error: activitiesByDateError,
    act: getActivitiesByDate,
  } = useAsync((date) => activitiesByDateApi.getAvailableActivitiesByDate(token, date), false);

  return {
    activitiesByDate,
    activitiesByDateLoading,
    activitiesByDateError,
    getActivitiesByDate,
  };
}
