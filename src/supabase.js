import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ezbqqgaxqluiuqxswxfy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6YnFxZ2F4cWx1aXVxeHN3eGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzYxNjksImV4cCI6MjA4NzQxMjE2OX0.yQiPdt0neZtPtYTeq4UlcbfbKRzuNfCc11AF5KkY5bE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)