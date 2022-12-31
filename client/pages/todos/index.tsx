import { useState } from 'react';
import useSWR from 'swr';
import Head from 'next/head';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../../styles/Home.module.css';
import AddButton from '../../components/todos/AddButton';
import Transiton from '../../components/global/Transition';
import NewForm from '../../components/todos/NewForm';
import Alert from '../../components/global/Alert';
import ShowList from "../../components/todos/ShowList";
import UserNameForm from '../../components/todos/UserNameForm'

interface typeObject {
  [key: string]: any;
}

type httpError = {
  error: Error;
  info: string;
  status: number;
};

function HttpError({ error }: { error: httpError }) {
  return (
    <div className="bg-white h-screen w-full flex items-center justify-center">
      <main className="mb-48 flex flex-row ">
        <p className="text-h2 font-bold text-rose-500">{error.status}</p>
        <div className="text-h2 pl-2 font-bold text-rose-500">Error</div>
        <div className="ml-4">
          <div className="flex items-center border-l border-gray-200 pl-4 h-12">
            <h1 className="text-gray-500 text-h3 pt-1">{error.info}</h1>
          </div>
        </div>
      </main>
    </div>
  );
}

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  if (!res.ok) {
    const httpError: httpError = {
      error: new Error('An error occured while fetching data.'),
      info: res.statusText,
      status: res.status,
    };
    throw httpError;
  }
  return res.json();
};

export function useTodos(url:any) {
  const { data, error } = useSWR(url + '/todos/', fetcher, { dedupingInterval: 60000, revalidateOnFocus: false });
  return {
    todos: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function findClosedTodos(todos:typeObject) {
  return todos.filter((todo:any) => todo.isClosed === true)
}

export default function Todos() {
  const url = process.env.BACKEND_ENDPOINT;
  const { todos, isLoading, isError } = useTodos(url);
  const [state, setState] = useState({
    name: '',
    priority: 2,
    showForm: false,
    showPriorities: false,
    selectedTodoID: '',
    alertObj: {
      show: false,
      type: '',
      message: '',
    },
    showDeleteAlert: false,
    userName: '',
    showUserNameForm: true,
  });

  return (
    <div className="w-full flex items-center justify-center">
      {state.alertObj.show && (
        <Alert
          message={state.alertObj?.message}
          type={state.alertObj?.type}
          onClick={() => {
            setState({
              ...state,
              alertObj: {
                show: !state.alertObj.show,
                type: '',
                message: '',
              },
            });
          }}
        />
      )}
      {!state.showUserNameForm && isError && <HttpError error={isError} />}
      {isLoading && (
        <div className="absolute inset-1/2">
          <CircularProgress className="text-primary" style={{ color: 'primary' }} />
        </div>
      )}
      {state.showUserNameForm && (
        <Transiton show={state.showUserNameForm}>
        <UserNameForm state={state} setState={setState} />
      </Transiton>
      )}
      {!isLoading && !isError && !state.showUserNameForm && (
        <>
          {state.showForm && (
            <Transiton show={state.showForm}>
              <NewForm state={state} setState={setState}></NewForm>
            </Transiton>
          )}
          <Head>
            <title>ToDo Management</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="p-8 flex flex-col">
          <h1 className={styles.title}>
              Welcome, <span className="text-sky-500">{state.userName}{" !"}</span>
            </h1>
            {todos?.length > 0 && (
              <p className="text-2xl text-center">
              Completed <span className="text-sky-500">ToDos </span>until today:  <span className="text-pink-400">{findClosedTodos(todos).length} {" of "} {todos.length}</span>
            </p>
            )}
            <div className="flex justify-end my-4">
              <AddButton state={state} setState={setState} />
            </div>
            <ShowList state={state} setState={setState} todos={todos}/>
          </main>
        </>
      )}
    </div>
  );
}
