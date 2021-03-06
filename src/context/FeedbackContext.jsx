import { createContext, useEffect, useState } from 'react'
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    // Set item to be updated
    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit: false,
    })
    // Delete Feeback Function
    const deleteFeedback = async (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            await fetch(`https://3001-vaib215-feedbackapp-aigkla28xpe.ws-us43.gitpod.io/feedback/${id}`,{method:'DELETE'})
            setFeedback(feedback.filter(item => item.id !== id))
        }
    }
    // Add Feedback Function
    const addFeedback = async (newFeedback) => {
        const response = await fetch(`https://3001-vaib215-feedbackapp-aigkla28xpe.ws-us43.gitpod.io/feedback`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        const data = await response.json()

        setFeedback([data, ...feedback])
    }
    // Edit Feeback Function
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit:true
        })
    }
    const updateFeedback = async (id,updItem) => {
        const response = await fetch(`https://3001-vaib215-feedbackapp-aigkla28xpe.ws-us43.gitpod.io/feedback/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })
        const data = await response.json()
        setFeedback(feedback.map((item)=>(item.id===id? {...item, ...data}:item)))
    }
    useEffect(() => {
      fetchFeedback()
    }, [])
    
    const fetchFeedback = async () => {
        const response = await fetch(`https://3001-vaib215-feedbackapp-aigkla28xpe.ws-us43.gitpod.io/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                feedbackEdit,
                isLoading,
                deleteFeedback,
                addFeedback,
                editFeedback,
                updateFeedback
            }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext