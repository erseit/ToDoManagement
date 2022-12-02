import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSWRConfig } from 'swr';
import { CheckIcon } from '@heroicons/react/20/solid';
import Button from '../global/Button';

export default function DoneTodo({ state, setState, todo }: any) {
  const [showLoading, setShowLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const url = process.env.HOST;
  return (
    <div className="text-center rounded-lg mt-2 mb-1">
      <Button
        type="submit"
        className="secondary"
        onClick={async (event: any) => {
          console.log(state);
          setShowLoading(true);
          event.preventDefault();
          await fetch(url + '/todos/' + `${todo.id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              todo: todo.todo,
              priority: todo.priority,
              isClosed: true,
            }),
            method: 'PUT',
          }).then((res) => {
            if (res.status >= 200 && res.status < 300) {
              mutate(url + '/todos/');
              setState({
                ...state,
                name: '',
                priority: 2,
                showForm: false,
                showPriorities: false,
                selectedTodoID: '',
                alertObj: {
                  show: true,
                  type: 'success',
                  message: `Todo is successfully done`,
                },
              });
            } else {
              setShowLoading(false);
              setState({
                ...state,
                alertObj: {
                  show: true,
                  type: 'warning',
                  message:
                    (res.status === 404 && 'Item not found.') ||
                    'Sorry, something went wrong. We are dealing with this situation. Please later try again',
                },
              });
            }
          });
        }}
      >
        {showLoading && (
          <div>
            <CircularProgress className="mt-1 mr-3 ml-1" style={{ color: 'white', width: '1rem', height: '1rem' }} />
          </div>
        )}
        <CheckIcon className='h-5 w-5 text-white mr-1' />
        Done
      </Button>
    </div>
  );
}
