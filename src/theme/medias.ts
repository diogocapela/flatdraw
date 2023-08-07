export const xs = 0;
export const sm = 600;
export const md = 900;
export const lg = 1200;
export const xl = 1536;

export const extraSmall = `@media (max-width: ${sm - 1}px)`;
export const small = `@media (min-width: ${sm}px) and (max-width: ${md - 1}px)`;
export const medium = `@media (min-width: ${md}px) and (max-width: ${lg - 1}px)`;
export const large = `@media (min-width: ${lg}px) and (max-width: ${xl - 1}px)`;
export const extraLarge = `@media (min-width: ${xl}px)`;

export const gteSmall = `@media (min-width: ${sm}px)`;
export const gteMedium = `@media (min-width: ${md}px)`;
export const gteLarge = `@media (min-width: ${lg}px)`;

export const lteSmall = `@media (max-width: ${md - 1}px)`;
export const lteMedium = `@media (max-width: ${lg - 1}px)`;
export const lteLarge = `@media (max-width: ${xl - 1}px)`;
