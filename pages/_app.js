import '@/styles/globals.css'
import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import constants from '../styles/constants'
import NavBar from '@/components/NavBar'
import UserProvider from '@/components/context/UserProvider'

const GlobalStyles = createGlobalStyle`
  :root {

    //new

  --shadow-elevation-low:
    1px 0.2px 1.2px hsl(var(--shadow-color) / 0.49),
    4.1px 0.8px 4.9px -2.2px hsl(var(--shadow-color) / 0.54);
  --shadow-elevation-medium:
    1px 0.2px 1.2px hsl(var(--shadow-color) / 0.46),
    5.4px 1.1px 6.4px -1.1px hsl(var(--shadow-color) / 0.49),
    20.5px 4.2px 24.3px -2.2px hsl(var(--shadow-color) / 0.52);
    
  
    --black30: ${constants.black30};
    --black40: ${constants.black40};
    --black50: ${constants.black50};
    --black60: ${constants.black60};
    --blackMain: ${constants.blackMain};
    --white: ${constants.white};
    --green: ${constants.green};
    --blue: ${constants.blue};
    --orange: ${constants.orange};
    --yellow: ${constants.yellow};
    
  }

  /*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;

}

/*
  2. Remove default margin
*/
* {
  margin: 0;
  padding: 0;
  line-height: calc(1em + 0.5rem);
  
}

/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: auto;

  ${'' /* background-color: var(--primary80);
   */}
 
  font-family: 'Vollkorn', serif;
}


/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;  
}

/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg, iframe, object {
  display: block;
  max-width: 100%;
}

/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}

/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6, li, dl, dt, blockquote {
  overflow-wrap: break-word;
}

/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

a {
  color: var(--black30);
  text-decoration: none;
}

p {
  padding: 5px;
}
article {
  width: 85vw;
  margin: 0 0 0 5vw;
  display:flex;
  flex-direction: column;
  justify-content: center;
}
fieldset {
  border-radius: 23pt;
  padding: 25px ;
  margin: 40px;
 background: rgba(256,256,256,.45);
 border: 3px solid var(--black30);
  box-shadow:
    var(--shadow-elevation-medium);


}
fieldset>div>form>fieldset {
    box-shadow:
    var(--shadow-elevation-low);
 
}

fieldset>legend {
background-color: #fbebe0;
  border: 3px solid var(--black30);
  border-radius: 23pt;
  padding: 0 5px;
}

fieldset>h2 {
  text-decoration: underline 2pt var(--black30) dotted
}

input {
    border: 1px solid var(--black30);
  border-radius: 5pt;
  margin: 5px;
  padding-left: 5px;
}

fieldset>label {
  display: flex;
  flex-direction: column;
 
}

ol, ul {
  padding-left: 32px;
}

header>a, header>div {
  color: var(--black30);
  font-weight: 700;
}

button {
  border-radius: 23pt;
  border: 1px solid var(--black30);
  background-color: var(--teaAccent);
  padding: 0px 7px;
  font-weight: 700;
}

@media only screen and (max-width: 600px) {

  article {
  width: 100vw;
  margin: 0 0 0 0 ;
  display:flex;
  flex-direction: column;
  justify-content: center;
}
 fieldset {
  width: 95vw;
  margin: 0 2% 0 ;
 }

.adder {
  min-width: 95%;
  
}

.adderField {
min-width: fit-content;
max-width: 100%;
}
#add {
  max-width: 100vw;
  margin: 15px 0 0 0;
  
}

.bigAdder {
  min-width: 95vw;
}

}
.bucket {
  
}
.adder {
width: 75vw;
}
.bigAdder {
  width: 85vw;
}
.adderField {
min-width: fit-content;
}

main {
overflow: scroll;
height: 100vh;
padding: 20px 0;
margin: -20px 0;

          background-image: linear-gradient(
  180deg,
  hsl(151deg 24% 60%) 0%,
  hsl(117deg 23% 66%) 35%,
  hsl(80deg 31% 66%) 54%,
  hsl(53deg 43% 68%) 66%,
  hsl(37deg 79% 75%) 74%,
  hsl(31deg 77% 71%) 80%,
  hsl(25deg 75% 68%) 84%,
  hsl(19deg 72% 65%) 87%,
  hsl(13deg 68% 63%) 96%
);
}
main>h3 {
  text-align: center;
  margin: 10px;
}

main>div {
  align-self: center;
  flex-basis: 4rem;
  flex-grow: 5;
  min-width: 85vw;
}

.tag>button {
    font-size: 11px;
  padding: 0px 5px;
  margin-left: 5px;
  line-height: 1.5;
}


`


export default function App({ Component, pageProps }) {
  return (
    <UserProvider>

      <GlobalStyles />
      <Head>
        <title>NostrFic</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </UserProvider>
  )
}
