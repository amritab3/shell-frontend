export const objectExists = (object: any) => {
  return Object.keys(object).length > 0;
};

export function removeObjectsWithEmptyKeys(array: Array<any>): Array<any> {
  return array.filter((obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== "") {
        return true;
      }
    }
    return false;
  });
}

// Function to delete object from array
export function deleteObjectFromArray(
  array: any[],
  objectToDelete: any,
): any[] {
  return array.filter((obj) => !isObjectEqual(obj, objectToDelete));
}

// Utility function to check object equality
export function isObjectEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

export const objectExistsInArray = (arr: any[], obj: any): boolean => {
  return arr.some((item) => JSON.stringify(item) === JSON.stringify(obj));
};

export function objectExistsWithTwoSameKeyValues(
  arr: any[],
  key1: string,
  value1: any,
  key2: string,
  value2: any,
): boolean {
  return arr.some((obj) => obj[key1] === value1 && obj[key2] === value2);
}
