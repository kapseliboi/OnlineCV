import { GET_CV_DATA, CV_HEADER, ADD_TECHNOLOGY, MOVE_TECH_UP, MOVE_TECH_DOWN,
SAVE_TECH_CLIENT, DELETE_TECH_CLIENT, ADD_LANGUAGE, MOVE_LANG_UP, MOVE_LANG_DOWN,
SAVE_LANG_CLIENT, DELETE_LANG_CLIENT, ADD_EXPERIENCE, MOVE_EXP_UP, MOVE_EXP_DOWN,
SAVE_EXP_CLIENT, DELETE_EXP_CLIENT, ADD_EDUCATION, MOVE_EDU_UP, MOVE_EDU_DOWN,
SAVE_EDU_CLIENT, DELETE_EDU_CLIENT, UPDATE_AVATAR, UPDATE_PERSONAL }
from "../actions/types";

const initialState = {
  phone: "",
  email: "",
  interests: "",
  avatar: "",
  description: "",
  experience: [],
  education: [],
  languages: [],
  technologies: [],
  header: "",
  expID: 0,
  eduID: 0,
  langID: 0,
  techID: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_AVATAR:
      return {
        ...state,
        avatar: action.payload
      };
    case UPDATE_PERSONAL:
      return {
        ...state,
        phone: action.payload.phone,
        email: action.payload.email,
        description: action.payload.description
      };
    case GET_CV_DATA:
      var expID = state.expID;
      var eduID = state.eduID;
      var langID = state.langID;
      var techID = state.techID;
      if (action.payload) {
        if (action.payload.experience) {
          for(var i=0; i<action.payload.experience.length; i++) {
            action.payload.experience[i].id = expID;
            expID++;
          }
        }
        if (action.payload.education) {
          for(var j=0; j<action.payload.education.length; j++) {
            action.payload.education[j].id = eduID;
            eduID++;
          }
        }
        if (action.payload.languages) {
          for(var k=0; k<action.payload.languages.length; k++) {
            action.payload.languages[k].id = langID;
            langID++;
          }
        }
        if (action.payload.technologies) {
          for (var l=0; l<action.payload.technologies.length; l++) {
            action.payload.technologies[l].id = techID;
            techID++;
          }
        }
        return {
          ...state,
          phone: action.payload.phone,
          email: action.payload.email,
          interests: action.payload.interests,
          avatar: action.payload.avatar,
          description: action.payload.description,
          experience: action.payload.experience,
          education: action.payload.education,
          languages: action.payload.languages,
          technologies: action.payload.technologies,
          expID: expID,
          eduID: eduID,
          langID: langID,
          techID: techID
        };
      }
      else {
        return state;
      }
    case CV_HEADER:
      return {
        ...state,
        header: action.payload
      }
    case ADD_TECHNOLOGY:
      return {
        ...state,
        technologies: state.technologies.concat({
          name: "",
          description: "",
          id: state.techID
        }),
        techID: state.techID + 1
      };
    case MOVE_TECH_UP:
      const tempTechUp = state.technologies[action.payload - 1];
      var copyUpTechs = state.technologies.slice();
      copyUpTechs[action.payload - 1] = copyUpTechs[action.payload];
      copyUpTechs[action.payload] = tempTechUp;
      return {
        ...state,
        technologies: copyUpTechs
      };
    case MOVE_TECH_DOWN:
      const tempTechDown = state.technologies[action.payload + 1];
      var copyDownTechs = state.technologies.slice();
      copyDownTechs[action.payload + 1] = copyDownTechs[action.payload];
      copyDownTechs[action.payload] = tempTechDown;
      return {
        ...state,
        technologies: copyDownTechs
      };
    case SAVE_TECH_CLIENT:
      var editedTech = state.technologies.slice();
      editedTech[action.payload.index].name = action.payload.name;
      editedTech[action.payload.index].description = action.payload.description;
      return {
        ...state,
        technologies: editedTech
      };
    case DELETE_TECH_CLIENT:
      var deletedTech = state.technologies.slice();
      deletedTech.splice(action.payload, 1);
      return {
        ...state,
        technologies: deletedTech
      };

    case ADD_LANGUAGE:
      return {
        ...state,
        languages: state.languages.concat({
          name: "",
          description: "",
          id: state.langID
        }),
        langID: state.langID + 1
      };
    case MOVE_LANG_UP:
      const tempLangUp = state.languages[action.payload - 1];
      var copyUpLangs = state.languages.slice();
      copyUpLangs[action.payload - 1] = copyUpLangs[action.payload];
      copyUpLangs[action.payload] = tempLangUp;
      return {
        ...state,
        languages: copyUpLangs
      };
    case MOVE_LANG_DOWN:
      const tempLangDown = state.languages[action.payload + 1];
      var copyDownLangs = state.languages.slice();
      copyDownLangs[action.payload + 1] = copyDownLangs[action.payload];
      copyDownLangs[action.payload] = tempLangDown;
      return {
        ...state,
        languages: copyDownLangs
      };
    case SAVE_LANG_CLIENT:
      var editedLang = state.languages.slice();
      editedLang[action.payload.index].name = action.payload.name;
      editedLang[action.payload.index].description = action.payload.description;
      return {
        ...state,
        languages: editedLang
      };
    case DELETE_LANG_CLIENT:
      var deletedLang = state.languages.slice();
      deletedLang.splice(action.payload, 1);
      return {
        ...state,
        languages: deletedLang
      };
    case ADD_EXPERIENCE:
      return {
        ...state,
        experience: state.experience.concat({
          title: "",
          employer: "",
          description: "",
          start: "",
          end: "",
          id: state.expID
        }),
        expID: state.expID + 1
      };
    case MOVE_EXP_UP:
      const tempExpUp = state.experience[action.payload - 1];
      var copyUpExp = state.experience.slice();
      copyUpExp[action.payload - 1] = copyUpExp[action.payload];
      copyUpExp[action.payload] = tempExpUp;
      return {
        ...state,
        experience: copyUpExp
      };
    case MOVE_EXP_DOWN:
      const tempExpDown = state.experience[action.payload + 1];
      var copyDownExp = state.experience.slice();
      copyDownExp[action.payload + 1] = copyDownExp[action.payload];
      copyDownExp[action.payload] = tempExpDown;
      return {
        ...state,
        experience: copyDownExp
      };
    case SAVE_EXP_CLIENT:
      var editedExp = state.experience.slice();
      editedExp[action.payload.index].title = action.payload.title;
      editedExp[action.payload.index].employer = action.payload.employer;
      editedExp[action.payload.index].description = action.payload.description;
      editedExp[action.payload.index].start = action.payload.start;
      editedExp[action.payload.index].end = action.payload.end;
      return {
        ...state,
        experience: editedExp
      };
    case DELETE_EXP_CLIENT:
      var deletedExp = state.experience.slice();
      deletedExp.splice(action.payload, 1);
      return {
        ...state,
        experience: deletedExp
      };
    case ADD_EDUCATION:
      return {
        ...state,
        education: state.education.concat({
          title: "",
          school: "",
          description: "",
          start: "",
          end: "",
          id: state.eduID
        }),
        eduID: state.eduID + 1
      };
    case MOVE_EDU_UP:
      const tempEduUp = state.education[action.payload - 1];
      var copyUpEdu = state.education.slice();
      copyUpEdu[action.payload - 1] = copyUpEdu[action.payload];
      copyUpEdu[action.payload] = tempEduUp;
      return {
        ...state,
        education: copyUpEdu
      };
    case MOVE_EDU_DOWN:
      const tempEduDown = state.education[action.payload + 1];
      var copyDownEdu = state.education.slice();
      copyDownEdu[action.payload + 1] = copyDownEdu[action.payload];
      copyDownEdu[action.payload] = tempEduDown;
      return {
        ...state,
        education: copyDownEdu
      };
    case SAVE_EDU_CLIENT:
      var editedEdu = state.education.slice();
      editedEdu[action.payload.index].title = action.payload.title;
      editedEdu[action.payload.index].school = action.payload.school;
      editedEdu[action.payload.index].description = action.payload.description;
      editedEdu[action.payload.index].start = action.payload.start;
      editedEdu[action.payload.index].end = action.payload.end;
      return {
        ...state,
        education: editedEdu
      };
    case DELETE_EDU_CLIENT:
      var deletedEdu = state.education.slice();
      deletedEdu.splice(action.payload, 1);
      return {
        ...state,
        education: deletedEdu
      };
    default:
      return state;
  }
};
