import {useState} from 'react'
// you may come come across the use of useState() in the wild
// State is an object that keeps track of variables that will update
// based on user input. When state changes, the component NOT the page
// updates, refreshes, and re-renders. The changes are reflected on the screen

const Counter = () => {
    // when we call useState, we need to name our piece of state and the function to update it
    // and also declare an initial value for that state
    // state = {
    //     count: 0,
    // } // the function to update the count: setCount(1)
    const [count, setCount] = useState(0)

    const handlePlusClick = () => {
        // never do this: count = count - 1
        // use setter
        setCount(count + 1)
    }

    const handleMinusClick = () => {
        if (count <= 0) return
        setCount(count - 1)
    }

    // this is where we return JSX
    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={handleMinusClick}>[-]</button>
            <button onClick={handlePlusClick}>[+]</button>
        </div>
    )
}

export default Counter