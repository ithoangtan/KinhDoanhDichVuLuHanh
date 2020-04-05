import { toast } from "react-toastify";

//FOR ALL
export const toastError = (error) => {
   let message = null;
   if (typeof error === "object" && error.message) ({ message } = error);
   if (message !== null && typeof message !== "undefined" && message !== "") {
      toast.error(error.message);
   }
};

// FOR OPTIONS
export const toastOptions = (type, prefix, content, suffix) => {
   if (type === "sucess") toast.success(prefix + content + suffix);
   if (type === "info") toast.info(prefix + content + suffix);
   if (type === "warn") toast.warn(prefix + content + suffix);
   if (type === "error") toast.error(prefix + content + suffix);
};

// FOR TOUR
export const toastSuccess = (data) => {
   if (data !== null && data !== "") {
      toast(`${data.length} record loaded!`, {
         position: toast.POSITION.BOTTOM_RIGHT,
         className: "notice-load-data",
      });
      // toast.done(`${data.length} record loaded!`);
   }
};

export const toastCreateSuccess = (newData) => {
   if (newData !== null && newData !== "") {
      toast.success(`ID: ${newData.idTour}, ${newData.titleTour} created!`);
   }
};

export const toastDeleteSuccess = (record) => {
   if (record !== null && record !== "") {
      toast.warn(`ID: ${record.idTour}, ${record.titleTour} deleted!`);
   }
};

export const toastDeleteImageSuccess = (file) => {
   if (file !== null && file !== "") {
      toast.warn(`ID: ${file.idImage}, ${file.name} deleted!`);
   }
};

export const toastPatchSuccess = (newRecord) => {
   if (newRecord !== null && newRecord !== "") {
      toast.info(`ID: ${newRecord.idTour}, ${newRecord.titleTour} updated!`);
   }
};

export const toastGetByIdSuccess = (data) => {
   if (data !== null && data !== "") {
      toast.success(`ID: ${data.idTour}, ${data.titleTour} got!`);
   }
};

//For SCHEDULE
export const toastScheduleSuccess = (data) => {
   if (data !== null && data !== "") {
      toast(`${data.length} record loaded!`, {
         position: toast.POSITION.BOTTOM_RIGHT,
         className: "notice-load-data",
      });
      // toast.done(`${data.length} record loaded!`);
   }
};

export const toastCreateScheduleSuccess = (newData) => {
   if (newData !== null && newData !== "") {
      toast.success(`ID: ${newData.idTour}, ${newData.titleTour} created!`);
   }
};

export const toastDeleteScheduleSuccess = (record) => {
   if (record !== null && record !== "") {
      toast.warn(`ID: ${record.idTour}, ${record.titleTour} deleted!`);
   }
};

export const toastPatchScheduleSuccess = (prefix, newRecord, suffix) => {
   if (newRecord !== null && newRecord !== "") {
      toast.info(`${prefix} | ID: ${newRecord.titleTour} ${suffix} updated!`);
   }
};

export const toastScheduleGetByIdTourSuccess = (data) => {
   if (data !== null && data !== "") {
      toast(`ID: ${data.idTour} got!`, {
         position: toast.POSITION.BOTTOM_RIGHT,
         className: "notice-load-data",
      });
   }
};

export const toastScheduleGetByIdSuccess = (data) => {
   if (data !== null && data !== "") {
      toast(`ID: ${data.idTour} got!`, {
         position: toast.POSITION.BOTTOM_RIGHT,
         className: "notice-load-data",
      });
   }
};

//FOR IMAGES
export const toastListImageGetByIdTourSuccess = (data) => {
   if (data !== null && data !== "") {
      toast(`ID: ${data.idTour} got!`, {
         position: toast.POSITION.BOTTOM_RIGHT,
         className: "notice-load-data",
      });
   }
};

//FOR LOGIN
export const toastLoginSuccess = (data) => {
   if (data !== null && data !== "") {
      toast(`$Welcome ${data.name} come back!!!`, {
         position: toast.POSITION.BOTTOM_RIGHT,
         className: "notice-load-data",
      });
   }
};
