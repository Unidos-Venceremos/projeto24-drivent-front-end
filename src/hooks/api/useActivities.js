import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi.js';

export default function useActivity() {
  const token = useToken();

  const {
    data: activitiesDays,
    loading: activitiesDaysLoading,
    error: activitiesDaysError,
    act: getActivitiesDays,
  } = useAsync(() => activitiesApi.getAvailableDaysOfActivities(token));

  return {
    activitiesDays,
    activitiesDaysLoading,
    activitiesDaysError,
    getActivitiesDays,
  };
}
