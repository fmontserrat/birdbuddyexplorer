export const cleanKey = (value: string) =>
    value.replaceAll(' ', '_').replace(/[^a-zA-Z ]/g, '')
