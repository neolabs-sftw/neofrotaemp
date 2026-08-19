import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cdn.neofrota.com";
const supabaseKey = "sb_publishable_QbaV5_ZAB_CiKUk841Jxxy_nEyyWaWp";

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL ou Anon Key não foram encontradas. Verifique seu arquivo .env",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
