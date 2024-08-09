export const does_array_contains_array = (
  arrParent: unknown[],
  arrChild: unknown[]
) => {
  let res = true;
  arrChild.forEach((item) => {
    if (!arrParent.includes(item)) {
      res = false;
    }
  });

  return res;
};

export const does_arrays_have_intersecting_elems = (
  arrParent: unknown[],
  arrChild: unknown[]
) => {
  let res = false;

  arrChild.forEach((item) => {
    if (arrParent.includes(item)) {
      res = true;
    }
  });

  return res;
};

export const remove_array_from_array = (
  arrParent: string[],
  arrChild: string[]
) => {
  return arrParent.filter((item) => !arrChild.includes(item));
};
