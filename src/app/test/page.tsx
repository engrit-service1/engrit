
import { createClient } from '@/util/supabase/server';
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('youtube').select('*')

  return (
    <ul>11
      {/* {todos?.map((todo, key) => (
        <li key={key}>{todo}</li>
      ))} */}
    </ul>
  )
}
