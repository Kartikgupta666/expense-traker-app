import supabase from './Supabase'

const login = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Sign-in error:', error.message);
            return null;
        }

        console.log('User signed in:', data);
        return data.user.id ;
    } catch (err) {
        console.error('Unexpected error during sign-in:', err);
        return null;
    }
};

const signIn = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error('Sign-up error:', error.message);
            return null;
        }

        console.log('User signed up:', data);
        return data.user.id || null;
    } catch (err) {
        console.error('Unexpected error during sign-up:', err);
        return null;
    }
};

const fetchUser = async () => {
    try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Sign-up error:', error.message);
            return null;
        }
        else {
            return data.user.user_metadata.email;
        }
    } catch (err) {
        console.error('Unexpected error during sign-up:', err);
        return null;
    }
}


export { signIn, login , fetchUser};
