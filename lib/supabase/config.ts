/**
 * Supabase configuration guard.
 *
 * The site is designed to run WITHOUT Supabase configured (auth features show a
 * friendly setup message instead of crashing). Set the env vars in .env.local to
 * enable real authentication — see README for instructions.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    supabaseAnonKey.length > 20
);
