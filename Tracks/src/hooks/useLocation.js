import { useEffect, useState } from "react";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy
} from "expo-location";

export default (shouldTrack, callback) => {
  const [error, setError] = useState(null);
  const [subscriber, setSubscriber] = useState(null);
  var sub;
  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        },
        location => {
          callback(location);
        }
      );
      setSubscriber(sub);
      return sub;
    } catch (error) {
      setError(error);
    }
  };

  // useEffect(() => {
  //   console.log("Subs:", subscriber);
  // }, [shouldTrack, callback]);

  useEffect(() => {
    if (shouldTrack) {
      const sub = startWatching();
    } else {
      subscriber.remove();
      setSubscriber(null);
    }
    return () => {
      if (sub) {
        sub.remove();
      }
    };
  }, [shouldTrack, callback]);
  return { error };
};
