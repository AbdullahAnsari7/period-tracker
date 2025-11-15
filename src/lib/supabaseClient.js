import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lkprszqngwntspiropqrdd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcHJzenFnbnd0c3Bpcm9xcmRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMzI3OTIsImV4cCI6MjA3ODcwODc5Mn0.buvlwxM-Vyg43t74Pyo63nAZ_KWwA6i-6hRYCWGWRzE'
export const supabase = createClient(supabaseUrl, supabaseKey);
