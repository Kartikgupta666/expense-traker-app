import React, { useEffect, useState } from "react";
import Graph from "../components/Graph"; // Import the Graph component
import { addExpense, retriveExpense, updateExpense } from "../Backend/Expense";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
const Dashboard = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [editAmount, setEditAmount] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [id, setId] = useState("");
    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    const closeEditDialog = () => setIsEditDialogOpen(false);
    const editDialogBox = (id, amount, description) => {
        setIsEditDialogOpen(true)
        setEditAmount(amount)
        setEditDescription(description)
        setId(id)
    }


    async function getExpenses() {
        const data = await retriveExpense()
        setExpenses(data)
    }

    const handelupdateExpense = (id, amount, description) => {
        // console.log({ id: id, amount: amount, description: description }) for debugging purpose
        updateExpense(id, amount, description)
        closeEditDialog()
        getExpenses()
    }

    useEffect(() => {
        setIsLoading(true)
        const user_id = localStorage.getItem('userId')
        if (!user_id) {

            navigate('/')
        }
        getExpenses()
        setIsLoading(false)
    }, [])

    const dates = expenses.map(expense => expense.date);
    const amounts = expenses.map(expense => expense.amount);


    const handleAddExpense = async () => {
        if ((amount.trim() === "" && amount > 0) || description.trim() === "") {
            alert("Please enter both amount and description.");
            return;
        }
        await addExpense(amount, description)

        setAmount("");
        setDescription("");
        closeDialog();
        getExpenses()

    };

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">Expense Tracker Dashboard</h2>

                {/* Add Expense Button */}
                <div className="text-center mb-6">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                        onClick={openDialog}
                    >
                        Add Expense
                    </button>
                </div>

                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-start">
                    {/* Expense Table */}
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[600px] mx-auto">
                        <h3 className="text-xl font-semibold mb-4 text-center">Expense Table</h3>
                        <div className=" w-full">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-700">
                                        <th className="border p-3 whitespace-nowrap">Date</th>
                                        <th className="border p-3 whitespace-nowrap">Amount (₹)</th>
                                        <th className="border p-3 whitespace-nowrap">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map((expense) => (
                                        <tr key={expense.id} onClick={() => { editDialogBox(expense.id, expense.amount, expense.description) }} className="text-center hover:bg-gray-100">
                                            <td className="border p-3 whitespace-nowrap">{expense.date}</td>
                                            <td className="border p-3 whitespace-nowrap text-green-600 font-semibold">₹ {expense.amount}</td>
                                            <td className="border p-3 whitespace-nowrap">{expense.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>



                    {/* Graph Component */}
                    <div className="w-full max-w-[600px] mx-auto">
                        <Graph amount={amounts} date={dates} />
                    </div>
                </div>
            </div>

            {/* Expense Dialog Box */}
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-lg bg-opacity-90 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        {/* Close Button (Top-Right) */}
                        <button
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
                            onClick={closeDialog}
                        >
                            &times;
                        </button>

                        <h3 className="text-xl font-semibold mb-4 text-center">Add Expense</h3>

                        {/* Amount Input */}
                        <label className="block text-gray-700 mb-2">Amount ($)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border rounded-md mb-4"
                            placeholder="Enter amount"
                        />

                        {/* Description Input */}
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded-md mb-4"
                            placeholder="Enter description"
                        ></textarea>

                        {/* Add Button */}
                        <button
                            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
                            onClick={handleAddExpense}
                        >
                            ADD
                        </button>
                    </div>
                </div>
            )}
            {/* edit Expense Dialog Box */}
            {
                isEditDialogOpen && (
                    <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-lg bg-opacity-90 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                            {/* Close Button (Top-Right) */}
                            <button
                                className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
                                onClick={closeEditDialog}
                            >
                                &times;
                            </button>

                            <h3 className="text-xl font-semibold mb-4 text-center">Edit Expense</h3>

                            {/* Amount Input */}
                            <label className="block text-gray-700 mb-2">Amount ($)</label>
                            <input
                                type="number"
                                value={editAmount}
                                onChange={(e) => setEditAmount(e.target.value)}
                                className="w-full p-2 border rounded-md mb-4"
                                placeholder="Enter amount"
                            />

                            {/* Description Input */}
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full p-2 border rounded-md mb-4"
                                placeholder="Enter description"
                            ></textarea>

                            {/* Add Button */}
                            <button
                                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
                                onClick={() => handelupdateExpense(id, editAmount, editDescription)}
                            >
                                UPDATE
                            </button>
                        </div>
                    </div>
                )
            }
        </div>




    );
};





export default Dashboard;
