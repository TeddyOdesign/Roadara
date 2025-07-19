import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://mlziawtvixchkephqjge.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1semlhd3R2aXhjaGtlcGhxamdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NDU4MTksImV4cCI6MjA2ODUyMTgxOX0._TrGUcKvWO_X0_kMUWLiPxBWcM_1dMAagZNIgkgDE-U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
