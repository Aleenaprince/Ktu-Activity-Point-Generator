import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pypskdxuaaoliptuzwxc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cHNrZHh1YWFvbGlwdHV6d3hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwNTU2ODMsImV4cCI6MjAxNTYzMTY4M30.evlbOaPTQXyOdo_kLiuhTbm7gNqtywWreDFADXeGLyc'
export const supabase = createClient(supabaseUrl, supabaseKey)