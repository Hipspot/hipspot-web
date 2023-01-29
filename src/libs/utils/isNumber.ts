export const isNumber = (key: string | number) => Number.isNaN(Number(key));

export const isNotNumber = (key: string | number) => !Number.isNaN(Number(key));
