import supabase from './Supabase'


const addExpense = async (amount, description) => {
    const date = new Date

    try {
        const { error } = await supabase.from('expenses').insert(
            {
                user_id: localStorage.getItem('userId'),
                description: description,
                amount: amount,
                date: date.getFullYear() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getDate()
            }
        )
        if (error) {
            console.log(error)
            return null;
        }
    }
    catch (error) {
        console.log(error)
    }
}

const retriveExpense = async () => {
    try {
        const userId = localStorage.getItem('userId')
        const { data, error } = await supabase.from('expenses').select('*').eq('user_id', userId)
        if (error) {
            console.log(error);
            return error;
        }
        else {
            return data
        }
    } catch (error) {
        console.log(error)
    }
}







export { addExpense, retriveExpense  }