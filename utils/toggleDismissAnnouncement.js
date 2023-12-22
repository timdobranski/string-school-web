import { supabase } from './supabase';

export default async function toggleDismissAnnouncement(userId) {

  const { data: getStatusData, error: getStatusError } = await supabase
    .from('users')
    .select('announcement_dismissed')
    .eq('id', userId)
    .single();

  if (getStatusError) { throw getStatusError }

  const status = !getStatusData.announcement_dismissed;

  const { data, error } = await supabase
    .from('users')
    .update({ announcement_dismissed: status })
    .eq('id', userId);

  if (error) { throw error }

  return data;
}