import axios from "axios";

import { ADD_TECHNOLOGY, MOVE_TECH_UP, MOVE_TECH_DOWN, SAVE_TECH_CLIENT,
DELETE_TECH_CLIENT, ADD_LANGUAGE, MOVE_LANG_UP, MOVE_LANG_DOWN, SAVE_LANG_CLIENT,
DELETE_LANG_CLIENT }
from "./types";

export const addTechnology = () => dispatch => {
  dispatch({
    type: ADD_TECHNOLOGY
  });
};

export const moveTechUp = index => dispatch => {
  dispatch({
    type: MOVE_TECH_UP,
    payload: index
  });
};

export const moveTechDown = index => dispatch => {
  dispatch({
    type: MOVE_TECH_DOWN,
    payload: index
  });
};

export const saveTechClient = info => dispatch => {
  dispatch({
    type: SAVE_TECH_CLIENT,
    payload: info
  });
};

export const updateTechServer = () => dispatch => {

};

export const deleteTechClient = index => dispatch => {
  dispatch({
    type: DELETE_TECH_CLIENT,
    payload: index
  });
};

export const addLanguage = () => dispatch => {
  dispatch({
    type: ADD_LANGUAGE
  });
};

export const moveLangUp = index => dispatch => {
  dispatch({
    type: MOVE_LANG_UP,
    payload: index
  });
};

export const moveLangDown = index => dispatch => {
  dispatch({
    type: MOVE_LANG_DOWN,
    payload: index
  });
};

export const saveLangClient = info => dispatch => {
  dispatch({
    type: SAVE_LANG_CLIENT,
    payload: info
  });
};

export const updateLangServer = () => dispatch => {

};

export const deleteLangClient = index => dispatch => {
  dispatch({
    type: DELETE_LANG_CLIENT,
    payload: index
  });
};
