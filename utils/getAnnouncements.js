import { supabase } from './supabase';

export default async function getAnnouncements() {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) { throw error }

  return data;
}

