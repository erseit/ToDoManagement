import Button from "../global/Button";
import { PlusIcon } from '@heroicons/react/20/solid';

export default function AddButton({state, setState}:any) {
    return(
        <Button
            className="primary"
            onClick={() => {
                setState({
                    ...state,
                    showForm: true
                })
            }}
        >
            <PlusIcon className="w-5 h-5 mr-1 text-white" />
            Create ToDo</Button>
    )
}