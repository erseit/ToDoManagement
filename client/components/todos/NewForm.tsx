import CloseButton from '../global/CloseButton';
import Input from '../global/Input';
import AddPriority from './AddPriority';
import Toggle from '../global/Toggle';
import SaveTodo from './SaveTodo';
import Button from '../global/Button';
import { TrashIcon } from '@heroicons/react/24/outline';
import DeleteTodo from './DeleteTodo';

export default function NewForm({ state, setState }: { state: any; setState: any }) {
  return (
    <form className="space-y-4 items-center">
      {state.showDeleteAlert && (
        <DeleteTodo state={state} setState={setState}></DeleteTodo>
      )}
      <div className="space-y-2">
        <div className="flex justify-between border-b border-gray-500 pb-2">
          <h3 className="text-lg font-medium leading-6 pb-5">ToDo Information</h3>
          <CloseButton
            onClick={() => {
              setState({
                ...state,
                showForm: false,
                showPriorities: false,
                name: '',
                priority: 2,
                selectedTodoID: '',
              });
            }}
          />
        </div>

        <div className="w-full">
          <div className="sm:grid sm:grid-cols-3 sm:pt-2">
            <Input
              classes="col-span-3"
              defaultValue={state.name}
              label="Name"
              onChange={(event: any) =>
                setState({
                  ...state,
                  name: event.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex items-center mt-2">
            <Toggle
              enabled={state.showPriorities}
              onChange={() => {
                setState({
                  ...state,
                  showPriorities: !state.showPriorities,
                });
              }}
            />
            <p className="text-base ml-2 mt-2">Select a priority</p>
          </div>
          {state.showPriorities && (
            <div className="w-full mt-4">
              <AddPriority state={state} setState={setState} />
            </div>
          )}
          <div className="flex justify-end">
            {state.selectedTodoID.length > 0 && (
              <div className="mt-11 mr-4">
                <Button
                  className="delete"
                  onClick={(event:any) => {
                    event.preventDefault();
                    setState({
                      ...state,
                      showDeleteAlert: true,
                    });
         
                  }}
                >
                  <TrashIcon className="w-6 h-6 text-red mr-2" />
                  Delete
                </Button>
              </div>
            )}
            <div className="mb-2 pt-6 text-right">
              <SaveTodo state={state} setState={setState} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
