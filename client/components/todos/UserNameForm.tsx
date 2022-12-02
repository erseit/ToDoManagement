import Input from '../global/Input';
import Button from '../global/Button';

export default function UserNameForm({ state, setState }: { state: any; setState: any }) {
  return (
    <form className="space-y-4 items-center">
      <div className="space-y-2">
        <div className="w-full">
          <div className="sm:grid sm:grid-cols-3 sm:pt-2">
            <Input
              classes="col-span-3"
              defaultValue={state.userName}
              label="User Name"
              onChange={(event: any) =>
                setState({
                  ...state,
                  userName: event.target.value,
                })
              }
              required
            />
          </div>

          <div className="flex justify-end">
              <div className="mt-4">
                <Button
                  className="primary"
                  onClick={(event:any) => {
                    event.preventDefault();
                    setState({
                      ...state,
                      showUserNameForm: false,
                    });
         
                  }}
                >
                  Save
                </Button>
              </div>
          </div>
        </div>
      </div>
    </form>
  );
}
