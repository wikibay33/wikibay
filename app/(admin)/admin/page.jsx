
import AddSoftware from '@/components/add-software/AddSoftware';
import AdminComponents from '@/components/adminComponents/AdminComponents'
import { checkRole } from "@/utils/roles";
import { redirect } from 'next/navigation';

export default async function page() {
  const isAdmin = await checkRole('admin');
  // if (!isAdmin) {
  //   redirect('/');
  // }
  console.log(isAdmin);
  return (
    <div>
      
  <AdminComponents />    </div>
  )
}
