import { configureStore } from "@reduxjs/toolkit";

import registrationReducer from "./slices/registrationSlice";

// import registrationDraftReducer from "./slices/registrationDraftSlice";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    // registrationDraft: registrationDraftReducer,
    
  },
});