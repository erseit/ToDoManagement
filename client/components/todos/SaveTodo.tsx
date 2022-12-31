import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSWRConfig } from 'swr';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import Button from '../global/Button';

export default function SaveTodo({ state, setState }: any) {
  const [showLoading, setShowLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const url = process.env.BACKEND_ENDPOINT;
  return (
    <div className="py-3 mt-2 text-right">
      <Button
        type="submit"
        className="primary"
        onClick={
          state.name.length > 0
            ? async (event: any) => {
                setShowLoading(true);
                event.preventDefault();
                await fetch(state.selectedTodoID.length > 0 ? `${url}/todos/${state.selectedTodoID}`: `${url}/todos/`, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    todo: state.name,
                    priority: state.priority,
                  }),
                  method: state.selectedTodoID.length > 0 ? 'PUT' : 'POST',
                }).then((res) => {
                  console.log(res)
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
                        message:
                          state.selectedTodoID.length > 0
                            ? `${state.name} is successfully updated`
                            : `${state.name} is successfully created `,
                      },
                    });
                  } 
                  else {
                    setShowLoading(false);
                    setState({
                      ...state,
                      alertObj: {
                        show: true,
                        type: 'warning',
                        message: res.status === 400 && "ToDo couldn\'t created. Check your input values!" ||
                                 res.status === 403 && "There is already a ToDo with this name! Change the name and try again" ||
                                 "Sorry, something went wrong. We are dealing with this situation. Please later try again"
                      },
                    });
                  }
                });
              
                
              }
            : () => {}
        }
      >
        {showLoading && (
          <div>
            <CircularProgress className="mt-1 mr-3 ml-1" style={{ color: 'white', width: '1rem', height: '1rem' }} />
          </div>
        )}
        {state.selectedTodoID.length > 0 && !showLoading && <ArrowPathIcon className="w-5 h-5 mr-1 text-white" />}
        {state.selectedTodoID.length > 0 ? 'Update ToDo' : 'Save ToDo'}
      </Button>
    </div>
  );
}
