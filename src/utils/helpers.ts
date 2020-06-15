export const genRegex = (query: string) => {
  return new RegExp(query.replace(/\W/g, ''), 'gi')
}

export const radiusToZoom = (radius: number) => {
  if (radius > 39) {
      return 9;
  } else if (radius > 24) {
      return 10;
  } else if (radius > 15) {
      return 11;
  } else if (radius > 9) {
      return 12;
  } else {
      return 13;
  }
}

export const filterOptionsData = (data: any, query: string) => {
  return data.filter(({value}: { value: string}) => {
      return value.match(genRegex(query))
  });
}