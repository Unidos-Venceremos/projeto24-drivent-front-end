import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activitiesApi.js';

export default function useUserActivities() {
  const token = useToken();

  const {
    data: userActivities,
    loading: userActivitiesLoading,
    error: userActivitiesError,
    act: postUserActivities,
  } = useAsync((activityId) => activityApi.postUserActivity(token, activityId), false);

  return {
    userActivities,
    userActivitiesLoading,
    userActivitiesError,
    postUserActivities,
  };
}
