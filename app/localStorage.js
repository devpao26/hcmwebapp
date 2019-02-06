
export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return undefined;
    }
    // console.log(serializedState);
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const saveState = (key, state) => {
  try {
    const globalState = state.get('global');
    const serializedState = JSON.stringify({global: globalState});
    // console.log(serializedState);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error(err);
  }
}
