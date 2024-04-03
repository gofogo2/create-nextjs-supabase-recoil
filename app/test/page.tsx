import { createClient } from "@/utils/supabase/server";


export default async function ProtectedPage() {
  const supabase = createClient();
   await supabase.from("notes").insert({"title":"gofogo"});
  return (
    <div>
     Helloworld
    </div>
  );
}
