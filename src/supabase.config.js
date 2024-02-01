// Import the necessary function from the supabase library
import { createClient } from "@supabase/supabase-js";

// Your Supabase URL and API key
const supabaseUrl = "https://nhgheoiccbmykckowsom.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZ2hlb2ljY2JteWtja293c29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0NjUzOTMsImV4cCI6MjAyMjA0MTM5M30.IIxxIONUubJSeQo4U_V9AK1vmTBJZK-6vVg3eGJ-5ek";

  // Create a Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

// Export the supabase instance
export { supabase };