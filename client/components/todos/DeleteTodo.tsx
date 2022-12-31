import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import CircularProgress from '@mui/material/CircularProgress';
import { useSWRConfig } from 'swr';
import Button from '../global/Button';
import Transition from '../global/Transition';

export default function DeleteTodo({ state, setState }: any) {
  const [showLoading, setShowLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const url = process.env.BACKEND_ENDPOINT;

  return (
    <Transition show={state.showDeleteAlert} maxLength="max-w-lg">
      <div className="sm:flex sm:items-start">
        <ExclamationCircleIcon className="hidden md:flex md:h-10 md:w-10 mx-2" aria-hidden="true" />
        <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title className="text-base font-medium leading-6">
            {`Are you sure to delete the "${state.name}"?`}
          </Dialog.Title>
          <div className="mt-1">
            <p className="text-base text-gray-200">You can not undo this action!</p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <div className="ml-4">
          <Button
            className="delete"
            onClick={async (event: any) => {
              setShowLoading(true);
              event.preventDefault();

              await fetch(`${url}/todos/${state.selectedTodoID}`, {
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'DELETE',
              }).then((res) => {
                if (res.status >= 200 && res.status < 300) {
                  mutate(url + '/todos/');
                  setState({
                    ...state,
                    name: '',
                    priority: 2,
                    showForm: false,
                    showFormValidation: false,
                    showPriorities: false,
                    selectedTodoID: '',
                    alertObj: {
                      show: true,
                      type: 'success',
                      message: 'Todo is sucessfully deleted',
                    },
                    showDeleteAlert: false,
                  });
                } else {
                  setShowLoading(false);
                  setState({
                    ...state,
                    alertObj: {
                      show: true,
                      type: 'warning',
                      message:
                        (res.status === 404 && "ToDo couldn't deleted. Item not found") ||
                        'Sorry, something went wrong. We are dealing with this situation. Please later try again',
                    },
                  });
                }
              });
            }}
          >
            {showLoading ? (
              <div>
                <CircularProgress
                  className="text-white mr-2"
                  style={{ color: 'white', width: '1rem', height: '1rem' }}
                />
              </div>
            ) : (
              <TrashIcon className="w-5 h-5 text-white mr-2" />
            )}
            OK
          </Button>
        </div>
        <Button
          className="primary"
          onClick={() => {
            setState({
              ...state,
              showDeleteAlert: false,
            });
          }}
        >
          Cancel
        </Button>
      </div>
    </Transition>
  );
}
