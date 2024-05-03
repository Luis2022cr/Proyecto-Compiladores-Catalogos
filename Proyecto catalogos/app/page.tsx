
import { RedirectType, redirect } from 'next/navigation';
export default function Page() {
  redirect('/home')
  return (
    <div>HOLA MUNDO</div>
  );
}
