/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function ExternalQuiz({ dbExternal }) {
/*   const [db, setDb] = React.useState({});
  React.useEffect(() => {

  }); */
  return (
    <ThemeProvider theme={dbExternal.theme}>
      <QuizScreen
        externalQuestions={dbExternal.questions}
        externalBg={dbExternal.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, gitUserName] = context.query.id.split('___');
  try {
    const dbExternal = await fetch(`https://${projectName}.${gitUserName}.vercel.app/api/db`)
      .then((serverRes) => {
        if (serverRes.ok) {
          return serverRes.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((convertedServerRes) => convertedServerRes);
    return {
      props: {
        dbExternal,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
