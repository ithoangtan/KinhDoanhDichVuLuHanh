import * as tourConstants from "../_constants/tour.module";
import {
   toastError,
   toastPatchSuccess,
   toastCreateSuccess,
} from "../_helper/toastify.helper";
import { message } from "antd";
const initialState = {
   listTour: [],
   listImageTour: [],
   tourById: {},
   delete: [],
   patch: [],
   create: [],
   putTagsAndServices: [],
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case tourConstants.FETCH_TOUR:
         return {
            ...state,
            listTour: [],
         };
      case tourConstants.FETCH_TOUR_SUCCESS: {
         const { data } = action.payload;
         return {
            ...state,
            listTour: data,
         };
      }
      case tourConstants.FETCH_TOUR_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            listTour: error,
         };
      }

      //Get Schedule By  Id Tour
      case tourConstants.FETCH_TOUR_GET_BYID_SUCCESS: {
         const { data } = action.payload;
         return {
            ...state,
            tourById: data,
         };
      }
      case tourConstants.FETCH_TOUR_GET_BYID_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            tourById: error,
         };
      }

      //Post - Create
      case tourConstants.FETCH_TOUR_CREATE_SUCCESS: {
         const { data } = action.payload;
         const { newRecord } = action.newRecord;
         toastCreateSuccess(newRecord);
         return {
            ...state,
            create: data,
         };
      }
      case tourConstants.FETCH_TOUR_CREATE_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            create: error,
         };
      }

      //Delete
      case tourConstants.FETCH_TOUR_DELETE_SUCCESS: {
         const { data } = action.payload;
         const { record } = action;
         message.warning(`${record.name} --- deleted!`);
         return {
            ...state,
            delete: data,
         };
      }
      case tourConstants.FETCH_TOUR_DELETE_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            delete: error,
         };
      }

      //Patch - update
      case tourConstants.FETCH_TOUR_PATCH_SUCCESS: {
         const { data } = action.payload;
         const { newRecord } = action.newRecord;
         toastPatchSuccess(newRecord);
         return {
            ...state,
            patch: data,
         };
      }
      case tourConstants.FETCH_TOUR_PATCH_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            patch: error,
         };
      }

      //Image Tour
      case tourConstants.FETCH_TOUR_IMAGE:
         return {
            ...state,
            listImageTour: [],
         };
      case tourConstants.FETCH_TOUR_IMAGE_SUCCESS: {
         const { data } = action.payload;
         return {
            ...state,
            listImageTour: data,
         };
      }
      case tourConstants.FETCH_TOUR_IMAGE_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            listImageTour: error,
         };
      }
      // Put - tags and services
      case tourConstants.FETCH_TAGS_AND_SERVICES_SUCCESS: {
         const { data } = action.payload;
         const { newRecord } = action.newRecord;
         message.success(newRecord.titleTour + " --- saved!");
         return {
            ...state,
            putTagsAndServices: data,
         };
      }
      case tourConstants.FETCH_TAGS_AND_SERVICES_FAILED: {
         const { error } = action.payload;
         toastError(error);
         return {
            ...state,
            putTagsAndServices: error,
         };
      }
      default:
         return state;
   }
};

export default reducer;
