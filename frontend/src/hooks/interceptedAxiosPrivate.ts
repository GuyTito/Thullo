import { useEffect } from "react";
import axios, { axiosPrivate } from "../api/axios";
import { getAuth, getNewAccessToken } from "../store/authSlice";
import { useAppSelector } from "../store/hooks";

export default function interceptedAxiosPrivate() {
  const { accessToken } = useAppSelector(getAuth);


  useEffect(() => {
    // attach accessToken to this instance before sending request
    const requestIntercept = axiosPrivate.interceptors.request.use((config) => {
      // @ts-expect-error
      if (!config.headers?.Authorization) {
        // @ts-expect-error
        config.headers!.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response, // if no error, return response
      async (error) => { 
        const prevRequest = error?.config; // get the previous request, the one above
        if (error?.response?.status === 403 && !prevRequest?.sent) { // check if request failed due to expired access token and check it sent is false(it has not been sent) to prevent endless loop of 403
          prevRequest.sent = true;
          const response = await axios.get('/auth/refresh', {
            withCredentials: true,
          })
          const newAccessToken = response?.data?.accessToken;
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest); // make the request again
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [accessToken, getNewAccessToken])

  return axiosPrivate;
}

/*
This code is setting up two interceptors for the request and response of an HTTP request made with axios. The useEffect hook is being used to run this code when the accessToken or getNewAccessToken dependencies change.

For the request interceptor, the code is checking if there is no Authorization header on the request. If this is the case, it sets the Authorization header to include the accessToken. If the Authorization header is already present, it simply returns the request. If there is an error with the request, it returns a rejected promise with the error.

For the response interceptor, the code is checking if the error is a 403 status code (forbidden) and the sent property on the previous request is false, indicating that the request has not yet been sent. If this is the case, it sets the sent property to true, dispatches an action to get a new access token, sets the Authorization header on the previous request to include the new access token, and then resends the previous request. If the sent property is true or the error is not a 403 status code, it simply rejects the error.

Finally, the return statement at the end of the useEffect hook is defining a cleanup function that removes the two interceptors when the useEffect hook is unmounted. This is important to prevent memory leaks and other potential issues.

*/