import {useState} from 'react'
import {ReactComponent as Favorite} from '@material-design-icons/svg/filled/favorite.svg';

export const UserRating = () => {
    const [count, setCount] = useState(0)

    const handlePlusClick = () => {
        if (count >= 5) return
        setCount(count + 1)
        // conditional rendering - make button disappear when count is 5
    }

    const handleMinusClick = () => {
        if (count <= 0) return
        setCount(count - 1)
        // conditional rendering - make button disappear when count is 0
    }

    return (
        <div>
            <button onClick={handleMinusClick}>[-]</button>
            {count}
            <Favorite />
            {
                [...Array(count)].map((heart, index) => {
                    return <span key={index}> <Favorite /></span>
                })
            }

            <button onClick={handlePlusClick}>[+]</button>
        </div>
    )
}

export default UserRating