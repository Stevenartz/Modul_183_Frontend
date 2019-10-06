// Constants for RegEx validation.

export const SONG_GENRE_REGEX = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
export const SONG_TITLE_REGEX = "^[a-zA-ZäöüÄÖÜ0-9]+(([',. -][a-zA-ZäöüÄÖÜ 0-9])?[a-zA-ZäöüÄÖÜ0-9]*)*$";
export const SONG_ARTIST_REGEX = "^[a-zA-ZäöüÄÖÜ0-9]+(([',. -][a-zA-ZäöüÄÖÜ 0-9])?[a-zA-ZäöüÄÖÜ0-9]*)*$";
export const SONG_LENGTH_REGEX = "^([0-1][0-9]|[2][0-3]):([0-5][0-9])$";