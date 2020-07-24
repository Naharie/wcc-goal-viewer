export const list = (...values: string[]) =>
    values.filter(value => value !== "" && value !== null && value !== undefined).join(" ");