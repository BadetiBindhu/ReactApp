import 'src/global.css';
import { collection, onSnapshot } from 'firebase/firestore';

import { useEffect } from 'react';
import Fab from '@mui/material/Fab';

import { AppRouter } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';
import {db} from "./firestore";

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  useEffect(()=>{
    onSnapshot(collection(db,"studentlist"),(snapshot)=>{
      console.log("docs",snapshot.docs.map(doc=>doc.data()));
    });
  })

  const githubButton = (
    <Fab
      size="medium"
      aria-label="Github"
      href="https://github.com/minimal-ui-kit/material-kit-react"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'fixed',
        bgcolor: 'grey.800',
        color: 'common.white',
      }}
    >
      <Iconify width={24} icon="eva:github-fill" />
    </Fab>
  );

  return (
    <ThemeProvider>
      <AppRouter />
      {githubButton}
    </ThemeProvider>
  );
}
