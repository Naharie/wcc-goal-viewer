export const list = (...values: (string | undefined | null)[]) =>
    values.filter(value => value !== "" && value !== null && value !== undefined).join(" ");