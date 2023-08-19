// Serialize state data for saving to Local Storage
const serializeState = (state) => {
  return JSON.stringify(state);
};

// Deserialize state data when loading from Local Storage
const deserializeState = (serializedState) => {
  return JSON.parse(serializedState);
};

// Save state data to Local Storage
export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = serializeState(state);
    localStorage.setItem("todoState", serializedState);
  } catch (error) {
    console.error("Error saving state to Local Storage:", error);
  }
};

// Load state data from Local Storage
export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("todoState");
    return serializedState ? deserializeState(serializedState) : undefined;
  } catch (error) {
    console.error("Error loading state from Local Storage:", error);
    return undefined;
  }
};
