import { useState, ChangeEvent, Dispatch } from "react";
import { useAtomValue } from "jotai";
import PocketBaseAtom from "../state/PocketBaseAtom";
import { SetStateAction } from "jotai";

export default function MakePostAuth({ setLoggedIn }: { setLoggedIn: Dispatch<SetStateAction<boolean>> }) {
  const [errMessage, setErrMessage] = useState<string>("");
  const [form, setForm] = useState({ email: "", password: "" });
  const pb = useAtomValue(PocketBaseAtom);

  function handleEmail(event: ChangeEvent<HTMLInputElement>) {
    const newForm = form;
    newForm.email = event.target.value;
    setForm({ ...newForm });
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>) {
    const newForm = form;
    newForm.password = event.target.value;
    setForm({ ...newForm });
  }

  function handleSubmit() {
    pb.admins.authWithPassword(form.email, form.password)
      .then((_) => {
        setLoggedIn(pb.authStore.isValid);
      })
      .catch((err: Error) => {
        setErrMessage(err.message);
        setForm({ email: "", password: "" });
      });
  }

  return (
    <form>
      <label htmlFor="email" >Email: </label>
      <input value={form.email} onChange={handleEmail} />
      <br />
      <label htmlFor="password">Password: </label>
      <input type="password" value={form.password} onChange={handlePassword} />
      <br />
      <button onClick={handleSubmit} type="button">Submit</button>
      <br />
      <p>{errMessage.length > 2 ? errMessage.toString() : ""}</p>
    </form>
  );
}
