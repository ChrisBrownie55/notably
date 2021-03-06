import React, { memo, useCallback, useEffect, useState } from 'react';
import { RouteChildrenProps } from 'react-router';
import Header from '../../components/Header';
import Hx from '../../components/Hx';
import { setActiveNoteID, useStore } from '../../store';

import { MdClose } from 'react-icons/md';
import DarkModeToggle from '../../components/DarkModeToggle';
import Editor from '../../components/Editor';
import IconButton from '../../components/IconButton';
import NotesList from '../../components/NotesList';
import NoteTitle from '../../components/NoteTitle';

import { SavedContext } from '../../contexts';

import classNames from '@chbphone55/classnames';
import './style.css';

const HeaderStyles = { boxShadow: 'none', backgroundColor: 'transparent' };

interface INoteProps {
  id: string;
  history: RouteChildrenProps['history'];
}
const Note = memo(({ id, history }: INoteProps) => {
  const goToHome = useCallback(() => history.push('/'), [history]);
  const [saved, setSaved] = useState(true);

  return (
    <div className="Note">
      <section className="Note__sidebar">
        <Header className="Note__sidebar-header">
          <Hx size={1}>Notes</Hx>
        </Header>
        <NotesList activeID={id} />
      </section>
      <div className="Note__main">
        <Header style={HeaderStyles}>
          <SavedContext.Provider value={setSaved}>
            <NoteTitle activeID={id} />
          </SavedContext.Provider>
          <div className="Note__header-actions">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className={classNames('Note__saved-indicator', {
                'Note__saved-indicator--saved': saved
              })}
            >
              <title>{saved ? 'Note is saved' : 'Note is unsaved'}</title>
              <circle r="44" cx="50" cy="50" />
            </svg>
            <DarkModeToggle className="Note__dark-mode-toggle" />
            <IconButton title="Close" onClick={goToHome}>
              <MdClose size={24} />
            </IconButton>
          </div>
        </Header>
        <SavedContext.Provider value={setSaved}>
          <Editor activeID={id} />
        </SavedContext.Provider>
      </div>
    </div>
  );
});

interface INotePageParams {
  id: string;
}
function NotePage({ match, history }: RouteChildrenProps<INotePageParams>) {
  const [state, dispatch] = useStore();

  match = match!;
  const id = match.params.id;
  useEffect(() => {
    if (state.activeNoteID !== id) {
      dispatch(setActiveNoteID(id));
    }
  }, [dispatch, id, state.activeNoteID]);

  if (!state.activeNoteID || !state.notes[state.activeNoteID]) {
    return null;
  }

  if (state.loadedFromDB && !(id in state.notes)) {
    return (
      // TODO: replace `<main>` with a new component named `<Center>`
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Hx size={1}>Note not found</Hx>
        {/* TODO: Replace with styled component button */}
        <button onClick={() => history.push('/')}>Return to home page</button>
      </main>
    );
  }

  if (!state.loadedFromDB) {
    return (
      // TODO: replace `<div>` with `<Center>`
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Hx size={2}>Loading...</Hx>
      </div>
    );
  }

  return <Note id={match.params.id} history={history} />;
}

export default NotePage;
