export function getFromLocalStorage(key, defaultValue = null) {
  const item = localStorage.getItem(key, defaultValue);
  return item;
}

export function setFromLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
export function deleteFromLocalStorage(key) {
  localStorage.removeItem(key);
}
