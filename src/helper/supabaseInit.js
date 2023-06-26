import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import {SUPABASE_BASE_URL, SUPABASE_PUBLIC_KEY} from '@env';

export default createClient(SUPABASE_BASE_URL, SUPABASE_PUBLIC_KEY);
