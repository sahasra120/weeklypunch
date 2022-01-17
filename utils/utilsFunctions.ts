export const validateEmail = (email: string): boolean => {
  var mailformat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (mailformat.test(email)) return true;
  else return false;
};

export const setStorage = (slug: string) => {
  window.localStorage.setItem(slug, 'liked');
};

export const getStorage = (slug: string): boolean => {
  const data = window.localStorage.getItem(slug);
  return data != null;
};
