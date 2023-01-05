import { PencilSquareIcon } from '@heroicons/react/20/solid';
import DoneTodo from './DoneTodo';

interface typeObject {
  [key: string]: any;
}

function findOpenTodos(todos: typeObject) {
  return todos?.filter((todo: any) => todo.isClosed === false);
}

export default function ShowList({ state, setState, todos }: any) {
  return (
    <ul role="list" className="grid grid-cols-1 my-2 sm:grid-cols-2 md:grid-cols-4  rounded-lg">
      {findOpenTodos(todos)
        ?.sort(function (a: any, b: any) {
          return a.priority - b.priority;
        })
        .map((todo: typeObject) => (
          <li
            key={todo.todo + todo.id}
            className="col-span-1 flex flex-col rounded-lg bg-sky-900 shadow m-2 px-3 py-1 border border-sky-300"
          >
            <div className="flex justify-between pb-1 mb-1  border-b border-gray-200">
              <div className="flex items-center w-52">
                <h3 className="text-lg truncate">{todo.todo}</h3>
              </div>
              <PencilSquareIcon
                className="h-6 w-6 ml-2 -mr-2 cursor-pointer duration-300 hover:scale-125"
                onClick={() => {
                  setState({
                    ...state,
                    name: todo.todo,
                    priority: todo.priority,
                    showForm: true,
                    showPriorities: true,
                    selectedTodoID: todo.id,
                  });
                }}
              />
            </div>
            <dl className="flex flex-grow flex-col">
              <div className="flex flex-col">
                <dd className="text-base">
                  {'Priority : '} {todo.priority}
                </dd>
                <DoneTodo state={state} setState={setState} todo={todo} />
              </div>
            </dl>
            <></>
          </li>
        ))}
    </ul>
  );
}
