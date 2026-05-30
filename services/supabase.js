import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ahdplrfikrisebpahryl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZHBscmZpa3Jpc2VicGFocnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0ODY0NDQsImV4cCI6MjA5NTA2MjQ0NH0.383yar8f5gcxkuzDF23LV61c1BOIfHNNjYvXD2QBlQk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
