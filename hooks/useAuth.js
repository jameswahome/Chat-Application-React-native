import React, { useReducer, useMemo, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAction } from "../utils/createAction";
import { sleep } from "../utils/sleep";

export function useAuth() {
  const key = "user";

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_USER":
          return {
            ...state,
            loading: false,
            user: { ...action.payload },
          };
        case "REMOVE_USER":
          return {
            ...state,
            user: undefined,
          };
        case "SET_LOADING":
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    }
  );

  const auth = useMemo(
    () => ({
      login: async (token, username) => {
        const user = {
          token: token,
          username: username,
        };
        try {
          await AsyncStorage.setItem(key, JSON.stringify(user));
          dispatch(createAction("SET_USER", user));
        } catch (e) {
          // saving error
          console.log(e);
        }
      },
      logout: async () => {
        console.log("loggedout");
        await AsyncStorage.removeItem(key);
        dispatch(createAction("REMOVE_USER"));
      },
      signUp: async (email, password) => {
        console.log(`the email is ${email} and password ${password}`);
      },
    }),
    []
  );
  useEffect(() => {
    sleep(2000).then(() => {
      AsyncStorage.getItem(key).then((user) => {
        if (user) {
          dispatch(createAction("SET_USER", JSON.parse(user)));
        }

        dispatch(createAction("SET_LOADING", false));
      });
    });
  }, []);
  return { auth, state };
}
