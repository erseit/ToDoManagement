const priorities = [
    {
        level: "(Highest)",
        value: 1
    },
    {
        level: "(Higher)",
        value: 2
    },
    {
        level: "(Low)",
        value: 3
    },
    {
        level: "(Lower)",
        value: 4
    },{
        level: "(Lowest)",
        value: 5
    }

]

export function findPriority(priority : number) {
  return priorities.find((p) => p.value === priority)
}
export default function AddPriority({state, setState}:any) {
    return(
        <fieldset>
            <label className="block text-base font-medium py-2">Priorities</label>
        <div
          className=
            ' border-sky-900 border-2 grid grid-cols-5 border rounded-lg p-1'
        >
          {priorities
            .map((priority: any, index: number) => (
              <div key={priority.value + index} className="relative flex items-start py-2">
                <div className="ml-1 flex h-5 items-center">
                  <input
                    id={`side-${priority}`}
                    name={`side-${priority}`}
                    type="radio"
                    className="h-4 w-4 mr-2 cursor-pointer"
                    defaultChecked={priority.value == state.priority}
                    onClick={() => {
                      setState({
                        ...state,
                        priority : priority.value
                      })
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1 text-body">
                  <label htmlFor={`side-${priority}`} className="block text-sm font-medium">
                    {priority.value}{' '}{priority.level}
                  </label>
                </div>
              </div>
            ))}
        </div>
      </fieldset>
    )
}