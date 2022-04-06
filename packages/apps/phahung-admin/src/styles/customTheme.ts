// importing the required chakra libraries
import { extendTheme } from '@chakra-ui/react';

// declare a variable for fonts and set our fonts. I am using Inter with various backups but you can use `Times New Roman`. Note we can set different fonts for the body and heading.
const fonts = {
  body: `Noto Sans Thai,Prompt, Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
};

// declare a variable for our theme and pass our overrides in the e`xtendTheme` method from chakra
const customTheme = extendTheme({
  fonts,
});

// export our theme
export default customTheme;
